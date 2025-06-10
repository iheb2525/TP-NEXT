// Script de vérification d'authentification
(function() {
    // Vérifier si l'utilisateur est connecté
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
    if (isLoggedIn !== 'true') {
        // Obtenir le chemin actuel pour pouvoir y revenir après connexion
        const currentPath = window.location.pathname;
        localStorage.setItem('redirectAfterLogin', currentPath);
        
        // Rediriger vers la page de connexion
        window.location.href = '/login-protection.html';
    }
})();
