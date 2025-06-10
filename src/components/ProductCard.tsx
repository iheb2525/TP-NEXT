import Image from 'next/image';
import Link from 'next/link';
import { FaEdit, FaTrash, FaShoppingCart } from 'react-icons/fa';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl?: string | null;
    stock: number;
  };
  isAdmin?: boolean;
  onDelete?: (id: string) => void;
}

export default function ProductCard({ product, isAdmin = false, onDelete }: ProductCardProps) {
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Empêcher la navigation vers la page de détail
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl || null
    });
    
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  };
  // Vérifier si l'URL de l'image est valide (URL externe ou chemin relatif)
  const isValidImageUrl = (url: string | null) => {
    if (!url) return false;
    // Accepter les URLs externes et les chemins relatifs commençant par "/"
    return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/');
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative h-52 w-full bg-gray-100 overflow-hidden group">
        {product.imageUrl && isValidImageUrl(product.imageUrl) ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = 'https://via.placeholder.com/300x300?text=Image+non+disponible';
            }}
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-100 text-gray-400">
            <svg className="w-12 h-12 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        
        {/* Badge de stock */}
        {product.stock <= 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
            Rupture de stock
          </div>
        )}
        {product.stock > 0 && product.stock <= 5 && (
          <div className="absolute top-2 right-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-md">
            Stock limité
          </div>
        )}
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-semibold mb-1 text-gray-800 line-clamp-1">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex justify-between items-center mb-3">
          <span className="text-indigo-600 font-bold text-lg">{product.price.toFixed(2)} €</span>
          <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded-full text-gray-600">Stock: {product.stock}</span>
        </div>
        

        
        {isAdmin ? (
          <div className="flex space-x-2">
            <Link 
              href={`/admin/products/edit/${product.id}`}
              className="flex-1 bg-indigo-600 text-white py-2 px-3 rounded-lg flex items-center justify-center hover:bg-indigo-700 transition-colors duration-200 shadow-sm"
            >
              <FaEdit className="mr-1" /> Modifier
            </Link>
            <button
              onClick={() => onDelete && onDelete(product.id)}
              className="flex-1 bg-red-500 text-white py-2 px-3 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors duration-200 shadow-sm"
            >
              <FaTrash className="mr-1" /> Supprimer
            </button>
          </div>
        ) : (
          <div className="flex space-x-2">
            <Link 
              href={`/products/${product.id}`}
              className="flex-1 bg-indigo-600 text-white py-2.5 px-3 rounded-lg flex items-center justify-center hover:bg-indigo-700 transition-colors duration-200 shadow-sm font-medium"
            >
              Voir le produit
            </Link>
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0 || addedToCart}
              className={`flex-1 ${addedToCart ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-amber-500 hover:bg-amber-600'} text-white py-2.5 px-3 rounded-lg flex items-center justify-center transition-colors duration-200 shadow-sm font-medium ${product.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <FaShoppingCart className="mr-1" /> {addedToCart ? 'Ajouté !' : 'Ajouter'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
