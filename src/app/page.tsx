import Image from "next/image";
import Link from "next/link";
import { FaShoppingBag, FaArrowRight } from "react-icons/fa";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-blue-50 py-16 md:py-24">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Découvrez notre collection de produits exceptionnels
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Notre boutique e-commerce propose des produits de qualité à des prix compétitifs.
                Parcourez notre catalogue et trouvez ce que vous cherchez.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/products" 
                  className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium flex items-center justify-center hover:bg-blue-700 transition"
                >
                  <FaShoppingBag className="mr-2" /> Voir les produits
                </Link>
                <Link 
                  href="/admin/products" 
                  className="bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-md font-medium flex items-center justify-center hover:bg-blue-50 transition"
                >
                  Administration <FaArrowRight className="ml-2" />
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md h-[400px] bg-gray-200 rounded-lg overflow-hidden">
                <Image
                  src="/ecommerce-hero.jpg"
                  alt="E-commerce products"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Pourquoi nous choisir ?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Qualité garantie</h3>
                <p className="text-gray-600">Tous nos produits sont soigneusement sélectionnés pour leur qualité exceptionnelle.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Livraison rapide</h3>
                <p className="text-gray-600">Nous expédions vos commandes dans les 24 heures suivant votre achat.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Paiement sécurisé</h3>
                <p className="text-gray-600">Vos transactions sont protégées par les dernières technologies de sécurité.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold mb-2">E-Commerce CRUD</h3>
              <p className="text-gray-400">© 2025 Tous droits réservés</p>
            </div>
            <div className="flex space-x-4">
              <Link href="/products" className="hover:text-blue-300 transition">Produits</Link>
              <Link href="/admin/products" className="hover:text-blue-300 transition">Administration</Link>
              <Link href="/" className="hover:text-blue-300 transition">Accueil</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
