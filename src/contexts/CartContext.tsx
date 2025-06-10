'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, getCart, saveCart, getCartTotal, getCartItemCount } from '@/lib/cart';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: { id: string; name: string; price: number; imageUrl: string | null }) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);

  // Charger le panier depuis le stockage local au montage du composant
  useEffect(() => {
    const storedCart = getCart();
    setCart(storedCart);
    setTotal(getCartTotal());
    setItemCount(getCartItemCount());
  }, []);

  // Mettre à jour le stockage local lorsque le panier change
  useEffect(() => {
    saveCart(cart);
    setTotal(cart.reduce((sum, item) => sum + item.price * item.quantity, 0));
    setItemCount(cart.reduce((count, item) => count + item.quantity, 0));
  }, [cart]);

  const addToCart = (product: { id: string; name: string; price: number; imageUrl: string | null }) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(item => item.id === product.id);
      
      if (existingItemIndex !== -1) {
        // Si le produit existe déjà, augmenter la quantité
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += 1;
        return updatedCart;
      } else {
        // Sinon, ajouter le produit avec une quantité de 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      return removeFromCart(productId);
    }
    
    setCart(prevCart => {
      const updatedCart = [...prevCart];
      const itemIndex = updatedCart.findIndex(item => item.id === productId);
      
      if (itemIndex !== -1) {
        updatedCart[itemIndex].quantity = quantity;
      }
      
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
        itemCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
