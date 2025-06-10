// Script de protection pour toutes les pages du site
// À inclure dans toutes les pages que vous souhaitez protéger

(function() {
    // Vérifier si l'utilisateur est connecté
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
    if (isLoggedIn !== 'true') {
        // Sauvegarder l'URL actuelle pour y revenir après connexion
        const currentPath = window.location.pathname;
        localStorage.setItem('redirectAfterLogin', currentPath);
        
        // Rediriger vers la page de connexion sécurisée
        window.location.href = '/secure-login.html';
    }
})();
