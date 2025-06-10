import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes qui nécessitent une authentification
const protectedRoutes = ['/admin', '/admin/products', '/account'];

export function middleware(request: NextRequest) {
  // Vérifier si l'utilisateur tente d'accéder à une route protégée
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));

  // Récupérer le cookie d'authentification
  const isLoggedIn = request.cookies.get('isLoggedIn')?.value === 'true';

  // Si la route est protégée et l'utilisateur n'est pas connecté, rediriger vers la page de connexion
  if (isProtectedRoute && !isLoggedIn) {
    const loginUrl = new URL('/login', request.url);
    // Ajouter l'URL de redirection après connexion
    loginUrl.searchParams.set('callbackUrl', path);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Configuration des routes à intercepter par le middleware
export const config = {
  matcher: [
    // Intercepter toutes les routes commençant par /admin
    '/admin/:path*',
    // Intercepter la route /account
    '/account',
  ],
};
