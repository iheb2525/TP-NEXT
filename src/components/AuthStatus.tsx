"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCookie, deleteCookie } from 'cookies-next';
import Link from 'next/link';

export default function AuthStatus() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Vérifier l'état de connexion
    const loggedIn = getCookie('isLoggedIn') === 'true';
    const user = getCookie('username') as string;
    
    setIsLoggedIn(loggedIn);
    if (user) {
      setUsername(user);
    }
  }, []);

  const handleLogout = () => {
    // Supprimer les cookies d'authentification
    deleteCookie('isLoggedIn');
    deleteCookie('username');
    
    // Mettre à jour l'état
    setIsLoggedIn(false);
    setUsername('');
    
    // Rediriger vers la page d'accueil
    router.push('/');
  };

  if (!isLoggedIn) {
    return (
      <div className="flex items-center space-x-2">
        <Link href="/login" className="text-blue-600 hover:text-blue-800">
          Se connecter
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <span className="text-sm text-gray-700">
        Bonjour, <span className="font-medium">{username}</span>
      </span>
      <button
        onClick={handleLogout}
        className="text-sm text-red-600 hover:text-red-800"
      >
        Se déconnecter
      </button>
    </div>
  );
}
