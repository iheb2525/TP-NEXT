'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { FaArrowLeft, FaShoppingCart } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import { useCart } from '@/contexts/CartContext';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string | null;
  stock: number;
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/products/${params.id}`);
        setProduct(response.data);
        setError(null);
      } catch (err) {
        console.error('Erreur lors du chargement du produit:', err);
        setError('Impossible de charger les détails du produit. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <Link 
          href="/products" 
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6 transition-colors duration-200 font-medium"
        >
          <FaArrowLeft className="mr-2" /> Retour aux produits
        </Link>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        ) : product ? (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <div className="relative h-80 md:h-full w-full bg-gray-100 overflow-hidden group">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        // Afficher un message d'erreur si l'image ne peut pas être chargée
                        const target = e.target as HTMLImageElement;
                        target.onerror = null; // Éviter les boucles infinies
                        target.src = 'https://via.placeholder.com/600x600?text=Image+non+disponible';
                      }}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gray-100 text-gray-400">
                      <svg className="w-24 h-24 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="md:w-1/2 p-6 md:p-10">
                
                <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
                
                <div className="text-2xl font-bold text-indigo-600 mb-6">
                  {product.price.toFixed(2)} €
                </div>
                
                <div className="mb-8">
                  <h2 className="text-lg font-semibold mb-3 text-gray-700">Description</h2>
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-lg font-semibold mb-3 text-gray-700">Disponibilité</h2>
                  <div className="flex items-center">
                    {product.stock > 0 ? (
                      <>
                        <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
                        <span className="text-emerald-700 font-medium">
                          En stock ({product.stock} {product.stock > 1 ? 'unités' : 'unité'})
                        </span>
                      </>
                    ) : (
                      <>
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                        <span className="text-red-700 font-medium">
                          Rupture de stock
                        </span>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <button 
                    className={`w-full ${addedToCart ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-indigo-600 hover:bg-indigo-700'} text-white py-3.5 px-6 rounded-lg font-medium flex items-center justify-center transition-colors duration-200 shadow-sm ${
                      product.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={product.stock === 0}
                    onClick={() => {
                      if (product && product.stock > 0) {
                        addToCart({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          imageUrl: product.imageUrl
                        });
                        setAddedToCart(true);
                        
                        // Réinitialiser l'état après 2 secondes
                        setTimeout(() => {
                          setAddedToCart(false);
                        }, 2000);
                      }
                    }}
                  >
                    <FaShoppingCart className="mr-2 text-lg" /> 
                    {addedToCart ? 'Ajouté au panier !' : 'Ajouter au panier'}
                  </button>
                  
                  {addedToCart && (
                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-lg text-sm flex items-center justify-center animate-pulse">
                      Produit ajouté à votre panier avec succès !
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">Produit non trouvé.</p>
          </div>
        )}
      </main>
      
      <footer className="bg-gray-800 text-white py-8 mt-auto">
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
