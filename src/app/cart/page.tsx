'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import { useCart } from '@/contexts/CartContext';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, total } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    
    // Simuler un processus de paiement
    setTimeout(() => {
      alert('Commande passée avec succès !');
      clearCart();
      setIsCheckingOut(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <Link 
          href="/products" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <FaArrowLeft className="mr-2" /> Continuer mes achats
        </Link>
        
        <h1 className="text-3xl font-bold mb-8">Mon Panier</h1>
        
        {cart.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-xl text-gray-600 mb-4">Votre panier est vide</p>
            <Link 
              href="/products" 
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
            >
              Découvrir nos produits
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 border-b">
                  <h2 className="text-lg font-semibold">Articles ({cart.reduce((acc, item) => acc + item.quantity, 0)})</h2>
                </div>
                
                <ul className="divide-y divide-gray-200">
                  {cart.map((item) => (
                    <li key={item.id} className="p-4 flex flex-col sm:flex-row sm:items-center">
                      <div className="flex-shrink-0 w-24 h-24 bg-gray-200 rounded-md overflow-hidden mb-4 sm:mb-0">
                        {item.imageUrl ? (
                          <img 
                            src={item.imageUrl} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.onerror = null;
                              target.src = 'https://via.placeholder.com/100?text=Image+non+disponible';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-500">
                            Pas d'image
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-grow sm:ml-6">
                        <h3 className="text-lg font-medium">{item.name}</h3>
                        <p className="text-blue-600 font-bold mt-1">{item.price.toFixed(2)} dt</p>
                      </div>
                      
                      <div className="flex items-center mt-4 sm:mt-0">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                        >
                          <FaMinus className="text-gray-600" />
                        </button>
                        
                        <span className="mx-3 w-8 text-center">{item.quantity}</span>
                        
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                        >
                          <FaPlus className="text-gray-600" />
                        </button>
                        
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="ml-4 p-2 text-red-500 hover:text-red-700 transition"
                          aria-label="Supprimer"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h2 className="text-lg font-semibold mb-4">Récapitulatif</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sous-total</span>
                    <span>{total.toFixed(2)} dt</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Livraison</span>
                    <span>Gratuite</span>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>{total.toFixed(2)} dt</span>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {isCheckingOut ? 'Traitement en cours...' : 'Passer la commande'}
                </button>
                
                <button 
                  onClick={clearCart}
                  className="w-full mt-3 text-red-600 py-2 px-4 rounded-md font-medium hover:text-red-700 transition"
                >
                  Vider le panier
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <footer className="bg-gray-800 text-white py-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold mb-2">E-Commerce iheb</h3>
              <p className="text-gray-400">© 2025 Tous droits réservés</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
