import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';

// Schéma de validation
const productSchema = z.object({
  name: z.string().min(3, { message: 'Le nom doit contenir au moins 3 caractères' }),
  description: z.string().min(10, { message: 'La description doit contenir au moins 10 caractères' }),
  price: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: 'Le prix doit être un nombre positif',
  }),
  imageUrl: z.string().optional(),
  stock: z.string().refine((val) => !isNaN(parseInt(val)) && parseInt(val) >= 0, {
    message: 'Le stock doit être un nombre positif ou zéro',
  }),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  productId?: string;
  onSuccess: () => void;
}

export default function ProductForm({ productId, onSuccess }: ProductFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      description: '',
      price: '',
      imageUrl: '',
      stock: '0',
    },
  });



  // Charger les données du produit si en mode édition
  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        try {
          setIsLoading(true);
          const response = await axios.get(`/api/products/${productId}`);
          const product = response.data;
          
          reset({
            name: product.name,
            description: product.description,
            price: product.price.toString(),
            imageUrl: product.imageUrl || '',
            stock: product.stock.toString(),
          });
          
          setIsLoading(false);
        } catch (error) {
          console.error('Erreur lors du chargement du produit:', error);
          setError('Impossible de charger les données du produit');
          setIsLoading(false);
        }
      };

      fetchProduct();
    }
  }, [productId, reset]);

  // Gérer le téléchargement d'image
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Vérifier le type de fichier
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert('Type de fichier non autorisé. Seules les images sont acceptées.');
      return;
    }

    // Créer un aperçu de l'image
    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);

    setImageFile(file);
  };

  const onSubmit = async (data: ProductFormData) => {
    try {
      setIsLoading(true);
      setError(null);

      // Télécharger l'image si elle existe
      let imageUrlToUse = data.imageUrl;
      
      if (imageFile) {
        setUploadProgress(10);
        const uploadFormData = new FormData();
        uploadFormData.append('file', imageFile);
        
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: uploadFormData
        });
        
        setUploadProgress(70);
        
        if (!uploadResponse.ok) {
          const errorData = await uploadResponse.json();
          throw new Error(errorData.error || 'Erreur lors du téléchargement de l\'image');
        }
        
        const uploadResult = await uploadResponse.json();
        imageUrlToUse = uploadResult.imageUrl;
        setUploadProgress(100);
      }

      // Convertir les données pour s'assurer que les types sont corrects
      // Utiliser des conversions explicites pour éviter les problèmes de type
      const formattedData = {
        name: data.name.trim(),
        description: data.description.trim(),
        price: data.price,
        imageUrl: imageUrlToUse ? imageUrlToUse.trim() : null,
        stock: data.stock
      };

      console.log('Données du formulaire à envoyer:', formattedData);

      let response;
      
      if (productId) {
        // Mode édition
        console.log(`Mise à jour du produit avec l'ID: ${productId}`);
        
        // Utiliser une requête fetch directe pour plus de contrôle
        const fetchResponse = await fetch(`/api/products/${productId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formattedData),
        });
        
        if (!fetchResponse.ok) {
          const errorData = await fetchResponse.json();
          throw new Error(errorData.error || 'Erreur lors de la mise à jour du produit');
        }
        
        response = await fetchResponse.json();
        console.log('Réponse de mise à jour:', response);
      } else {
        // Mode création
        console.log('Création d\'un nouveau produit');
        response = await axios.post('/api/products', formattedData);
        console.log('Réponse de création:', response.data);
      }

      // Afficher un message de succès
      alert(productId ? 'Produit mis à jour avec succès' : 'Produit créé avec succès');
      
      // Réinitialiser le formulaire et l'image
      reset();
      setImageFile(null);
      setImagePreview(null);
      setUploadProgress(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      onSuccess();
    } catch (error: any) {
      console.error('Erreur lors de l\'enregistrement du produit:', error);
      
      // Afficher un message d'erreur plus détaillé si disponible
      if (error.response && error.response.data && error.response.data.error) {
        setError(`Erreur: ${error.response.data.error}`);
      } else {
        setError(error.message || 'Une erreur est survenue lors de l\'enregistrement du produit');
      }
    } finally {
      setIsLoading(false);
      setUploadProgress(0);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Nom du produit*
        </label>
        <input
          id="name"
          type="text"
          {...register('name')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description*
        </label>
        <textarea
          id="description"
          rows={4}
          {...register('description')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
            Prix (€)*
          </label>
          <input
            id="price"
            type="text"
            {...register('price')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
            Stock*
          </label>
          <input
            id="stock"
            type="number"
            min="0"
            {...register('stock')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.stock && (
            <p className="mt-1 text-sm text-red-600">{errors.stock.message}</p>
          )}
        </div>
      </div>



      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
          Image du produit
        </label>
        
        <div className="mb-2">
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        )}
        
        {/* Aperçu de l'image */}
        {imagePreview ? (
          <div className="mt-2 relative w-full h-40 bg-gray-100 rounded-md overflow-hidden">
            <img 
              src={imagePreview} 
              alt="Aperçu" 
              className="w-full h-full object-contain"
            />
          </div>
        ) : (
          // Afficher l'image existante si disponible (pour le mode édition)
          productId && (
            <div className="mt-2 relative w-full h-40 bg-gray-100 rounded-md overflow-hidden">
              {/* Utiliser la valeur du formulaire pour vérifier si une image existe */}
              <img 
                src={watch('imageUrl') || 'https://via.placeholder.com/400x300?text=Aucune+image'} 
                alt="Image existante" 
                className="w-full h-full object-contain"
                onError={(e) => {
                  // Afficher un message d'erreur si l'image ne peut pas être chargée
                  const target = e.target as HTMLImageElement;
                  target.onerror = null; // Éviter les boucles infinies
                  target.src = 'https://via.placeholder.com/400x300?text=Image+non+disponible';
                }}
              />
            </div>
          )
        )}
        
        <div className="mt-2">
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
            Ou URL de l'image (optionnel)
          </label>
          <input
            id="imageUrl"
            type="text"
            {...register('imageUrl')}
            placeholder="Laisser vide pour utiliser l'image téléchargée"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.imageUrl && (
            <p className="mt-1 text-sm text-red-600">{errors.imageUrl.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? 'Chargement...' : productId ? 'Mettre à jour' : 'Créer'}
        </button>
      </div>
    </form>
  );
}
