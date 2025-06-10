"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { setCookie, getCookie } from 'cookies-next';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const router = useRouter();
  
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  
  useEffect(() => {
    // Vérifier si l'utilisateur a déjà été connecté
    const savedUsername = getCookie('rememberedUser') as string;
    if (savedUsername) {
      setUsername(savedUsername);
      setRememberMe(true);
    }
    
    // Vérifier si l'utilisateur est déjà connecté
    const isLoggedIn = getCookie('isLoggedIn') === 'true';
    if (isLoggedIn) {
      router.push(callbackUrl);
    }
  }, [router, callbackUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simuler un délai de chargement pour montrer l'animation
    await new Promise(resolve => setTimeout(resolve, 800));

    // Vérification des identifiants statiques
    if (username === "iheb" && password === "iheb") {
      // Enregistrer l'état de connexion dans les cookies
      setCookie('isLoggedIn', 'true', { maxAge: 60 * 60 * 24 * 7 }); // 7 jours
      setCookie('username', username, { maxAge: 60 * 60 * 24 * 7 });
      
      // Si "Se souvenir de moi" est coché
      if (rememberMe) {
        setCookie('rememberedUser', username, { maxAge: 60 * 60 * 24 * 30 }); // 30 jours
      } else {
        setCookie('rememberedUser', '', { maxAge: 0 }); // Supprimer le cookie
      }
      
      // Afficher un message de bienvenue
      setWelcomeMessage(`Bienvenue, ${username}!`);
      
      // Attendre un peu avant de rediriger
      setTimeout(() => {
        // Rediriger vers la page d'origine ou la page d'accueil
        router.push(callbackUrl);
      }, 1000);
    } else {
      setError('Nom d\'utilisateur ou mot de passe incorrect');
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Connexion</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Nom d'utilisateur
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          {error && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm mb-2"
            >
              {error}
            </motion.div>
          )}
          
          {welcomeMessage && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-500 text-sm mb-2 text-center font-medium"
            >
              {welcomeMessage}
            </motion.div>
          )}
          
          <div className="flex items-center my-4">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
              Se souvenir de moi
            </label>
          </div>
          
          <div className="pt-2">
            <p className="text-sm text-gray-500 mb-4 text-center">
              Utilisez <span className="font-medium">iheb</span> comme nom d'utilisateur et mot de passe
            </p>
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 relative ${loading ? 'opacity-80' : ''}`}
            >
              {loading ? (
                <>
                  <span className="opacity-0">Se connecter</span>
                  <span className="absolute inset-0 flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </span>
                </>
              ) : 'Se connecter'}
            </button>
          </div>
        </form>
        
        <div className="mt-4 text-center text-sm">
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            Retour à l'accueil
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
