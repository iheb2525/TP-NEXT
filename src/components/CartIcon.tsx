'use client';

import React from 'react';
import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '@/contexts/CartContext';

export default function CartIcon() {
  const { itemCount } = useCart();

  return (
    <Link href="/cart" className="relative p-2 rounded-full hover:bg-indigo-700 transition-colors duration-200">
      <FaShoppingCart className="text-xl" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
          {itemCount}
        </span>
      )}
    </Link>
  );
}
