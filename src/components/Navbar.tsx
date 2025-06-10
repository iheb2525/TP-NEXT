'use client';

import Link from 'next/link';
import { FaStore, FaUserCircle, FaSearch } from 'react-icons/fa';
import CartIcon from './CartIcon';

export default function Navbar() {
  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2 text-xl font-bold">
            <FaStore className="text-2xl" />
            <span className="hidden sm:inline">E-Commerce</span>
          </Link>
          
          {/* Barre de recherche */}
          <div className="hidden md:flex relative mx-4 flex-1 max-w-xl">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-indigo-300" />
            </div>
            <input 
              type="text" 
              className="w-full pl-10 pr-4 py-2 rounded-full bg-indigo-700 text-white placeholder-indigo-300 border border-indigo-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-white"
              placeholder="Rechercher un produit..."
            />
          </div>
          
          {/* Navigation */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex space-x-4">
              <Link href="/" className="px-3 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200">
                Accueil
              </Link>
              <Link href="/products" className="px-3 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200">
                Produits
              </Link>
              <Link href="/admin/products" className="px-3 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200">
                Admin
              </Link>
            </div>
            
            <div className="flex items-center space-x-3">
              <CartIcon />
              <Link href="/account" className="text-xl hover:text-indigo-200 transition-colors duration-200">
                <FaUserCircle />
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Menu mobile */}
      <div className="md:hidden border-t border-indigo-500 mt-2 pt-2 pb-1">
        <div className="flex justify-between px-2">
          <Link href="/" className="px-3 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200">
            Accueil
          </Link>
          <Link href="/products" className="px-3 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200">
            Produits
          </Link>
          <Link href="/admin/products" className="px-3 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200">
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}
