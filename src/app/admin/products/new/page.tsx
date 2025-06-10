'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import ProductForm from '@/components/ProductForm';

export default function NewProductPage() {
  const router = useRouter();

  const handleSuccess = () => {
    alert('Produit créé avec succès!');
    router.push('/admin/products');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <Link 
          href="/admin/products" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <FaArrowLeft className="mr-2" /> Retour à la liste des produits
        </Link>
        
        <h1 className="text-3xl font-bold mb-8">Créer un nouveau produit</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <ProductForm onSuccess={handleSuccess} />
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold mb-2">E-Commerce CRUD</h3>
              <p className="text-gray-400">© 2025 Tous droits réservés</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
