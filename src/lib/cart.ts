// Types pour le panier
export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string | null;
  quantity: number;
}

// Clé pour le stockage local
const CART_STORAGE_KEY = 'ecommerce_cart';

// Fonction pour récupérer le panier depuis le stockage local
export function getCart(): CartItem[] {
  if (typeof window === 'undefined') {
    return [];
  }
  
  const cartJson = localStorage.getItem(CART_STORAGE_KEY);
  if (!cartJson) {
    return [];
  }
  
  try {
    return JSON.parse(cartJson);
  } catch (error) {
    console.error('Erreur lors de la récupération du panier:', error);
    return [];
  }
}

// Fonction pour sauvegarder le panier dans le stockage local
export function saveCart(cart: CartItem[]): void {
  if (typeof window === 'undefined') {
    return;
  }
  
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

// Fonction pour ajouter un produit au panier
export function addToCart(product: {
  id: string;
  name: string;
  price: number;
  imageUrl: string | null;
}): void {
  const cart = getCart();
  
  // Vérifier si le produit existe déjà dans le panier
  const existingItemIndex = cart.findIndex(item => item.id === product.id);
  
  if (existingItemIndex !== -1) {
    // Si le produit existe déjà, augmenter la quantité
    cart[existingItemIndex].quantity += 1;
  } else {
    // Sinon, ajouter le produit avec une quantité de 1
    cart.push({
      ...product,
      quantity: 1
    });
  }
  
  // Sauvegarder le panier mis à jour
  saveCart(cart);
}

// Fonction pour supprimer un produit du panier
export function removeFromCart(productId: string): void {
  const cart = getCart();
  const updatedCart = cart.filter(item => item.id !== productId);
  saveCart(updatedCart);
}

// Fonction pour mettre à jour la quantité d'un produit dans le panier
export function updateCartItemQuantity(productId: string, quantity: number): void {
  if (quantity < 1) {
    return removeFromCart(productId);
  }
  
  const cart = getCart();
  const itemIndex = cart.findIndex(item => item.id === productId);
  
  if (itemIndex !== -1) {
    cart[itemIndex].quantity = quantity;
    saveCart(cart);
  }
}

// Fonction pour vider le panier
export function clearCart(): void {
  saveCart([]);
}

// Fonction pour calculer le total du panier
export function getCartTotal(): number {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Fonction pour obtenir le nombre total d'articles dans le panier
export function getCartItemCount(): number {
  const cart = getCart();
  return cart.reduce((count, item) => count + item.quantity, 0);
}
