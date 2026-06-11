'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/components/CartProvider';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  sku?: string;
  stock: number;
  category: string;
  tags?: string[];
  images?: string[];
  status: string;
  createdAt: any;
}

interface ProductDetailsProps {
  id: string;
  product: Product | null;
  relatedProducts: Product[];
}

export default function ProductDetails({ id, product: initialProduct, relatedProducts: initialRelated }: ProductDetailsProps) {
  const [product] = useState(initialProduct);
  const [relatedProducts] = useState(initialRelated);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setInitialImage] = useState(0);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.images?.[0] || '/products/gift-box.jpeg',
      });
    }
  };

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-12 sm:py-20 text-center">
        <span className="material-symbols-outlined text-5xl sm:text-6xl text-text-muted mb-4">search_off</span>
        <h1 className="font-serif text-2xl sm:text-3xl text-primary dark:text-cream mb-4">Product not found</h1>
        <Link href="/shop" className="text-primary dark:text-secondary hover:underline">Go back to shop</Link>
      </div>
    );
  }

  const isSoldOut = product.stock <= 0;
  const images = product.images?.length ? product.images : ['/products/gift-box.jpeg'];
  const tag = product.tags?.[0];

  return (
    <div className="min-h-screen bg-cream dark:bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-4 sm:py-6">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-body text-text-muted overflow-x-auto">
          <Link href="/" className="hover:text-primary dark:hover:text-secondary transition-colors whitespace-nowrap">Home</Link>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <Link href="/shop" className="hover:text-primary dark:hover:text-secondary transition-colors whitespace-nowrap">Shop</Link>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="text-primary dark:text-cream whitespace-nowrap">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 pb-12 sm:pb-16">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-white shadow-sm">
              <img 
                alt={product.name} 
                className={`w-full h-full object-cover transition-transform duration-500 ${isSoldOut ? 'grayscale' : ''}`} 
                src={images[selectedImage]} 
              />
              {tag && (
                <span className="absolute top-3 left-3 sm:top-6 sm:left-6 bg-secondary text-primary text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 sm:px-4 py-1 sm:py-1.5 rounded-full">
                  {tag}
                </span>
              )}
              {isSoldOut && (
                <div className="absolute inset-0 bg-primary/40 flex items-center justify-center">
                  <span className="bg-cream text-primary text-xs sm:text-sm font-bold uppercase tracking-wider px-6 sm:px-8 py-2 sm:py-3 rounded-full">Sold Out</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-primary dark:text-cream mb-3 sm:mb-4">{product.name}</h1>
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <p className="font-bold text-xl sm:text-2xl lg:text-3xl text-primary dark:text-cream">৳{product.price}</p>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <p className="text-base sm:text-lg lg:text-xl text-text-muted line-through">৳{product.compareAtPrice}</p>
              )}
            </div>

            <p className="font-body text-sm sm:text-base text-text-secondary dark:text-slate-400 mb-6 sm:mb-8 leading-relaxed whitespace-pre-wrap">
              {product.description}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="flex items-center justify-between border border-secondary/30 rounded-full bg-white dark:bg-slate-800 px-2">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="size-10 sm:size-12 flex items-center justify-center text-text-muted hover:text-primary transition-colors min-h-[44px] min-w-[44px]"
                  disabled={isSoldOut}
                >
                  <span className="material-symbols-outlined">remove</span>
                </button>
                <span className="w-12 text-center font-bold font-body text-sm sm:text-base">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="size-10 sm:size-12 flex items-center justify-center text-text-muted hover:text-primary transition-colors min-h-[44px] min-w-[44px]"
                  disabled={isSoldOut}
                >
                  <span className="material-symbols-outlined">add</span>
                </button>
              </div>
              <button 
                onClick={handleAddToCart}
                disabled={isSoldOut}
                className={`flex-1 font-bold py-3 sm:py-4 rounded-full shadow-lg transition-all flex items-center justify-center gap-2 min-h-[48px] ${
                  isSoldOut 
                    ? 'bg-slate-100 text-text-muted cursor-not-allowed dark:bg-slate-700 shadow-none' 
                    : 'bg-primary hover:bg-primary-light text-cream shadow-primary/20'
                }`}
              >
                <span className="material-symbols-outlined">
                  {isSoldOut ? 'remove_shopping_cart' : 'shopping_bag'}
                </span>
                {isSoldOut ? 'Sold Out' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-12 sm:mt-16 lg:mt-20">
            <h2 className="font-serif text-2xl sm:text-3xl text-primary dark:text-cream mb-6 sm:mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              {relatedProducts.map((item) => (
                <Link key={item.id} href={`/product/${item.id}`} className="group">
                  <div className="aspect-square rounded-xl overflow-hidden bg-white shadow-sm mb-2 sm:mb-3">
                    <img 
                      alt={item.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                      src={item.images?.[0] || '/products/gift-box.jpeg'} 
                    />
                  </div>
                  <h3 className="font-serif text-sm sm:text-base font-bold text-primary dark:text-cream line-clamp-2 mb-1">
                    {item.name}
                  </h3>
                  <p className="text-sm sm:text-base font-bold text-primary dark:text-cream">৳{item.price}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
