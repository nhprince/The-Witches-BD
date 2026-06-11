'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Success() {
  const [orderId, setOrderId] = useState('ORD-001');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('orderId');
    if (id) setOrderId(id);
  }, []);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12 bg-cream dark:bg-background-dark">
      <div className="max-w-md w-full text-center">
        <div className="size-16 sm:size-20 lg:size-24 bg-secondary/20 text-primary dark:text-secondary rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8">
          <span className="material-symbols-outlined text-3xl sm:text-4xl lg:text-5xl">check_circle</span>
        </div>
        
        <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-primary dark:text-cream mb-3 sm:mb-4">Order Placed!</h1>
        <p className="font-body text-base sm:text-lg text-text-secondary dark:text-slate-400 mb-1 sm:mb-2">
          Thank you for your purchase.
        </p>
        <p className="font-body text-sm sm:text-base text-text-muted mb-6 sm:mb-8">
          Your order number is <span className="font-bold text-primary dark:text-cream">#{orderId}</span>.
        </p>

        <div className="flex flex-col gap-3 sm:gap-4">
          <Link 
            href={`/track?id=${orderId}`} 
            className="w-full bg-primary hover:bg-primary-light text-cream font-bold py-3 sm:py-4 rounded-full shadow-lg shadow-primary/20 transition-all text-sm sm:text-base min-h-[48px]"
          >
            Track Order
          </Link>
          <Link 
            href="/shop" 
            className="w-full border-2 border-primary text-primary dark:text-secondary font-bold py-3 sm:py-4 rounded-full hover:bg-primary/5 dark:hover:bg-secondary/10 transition-all text-sm sm:text-base min-h-[48px]"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
