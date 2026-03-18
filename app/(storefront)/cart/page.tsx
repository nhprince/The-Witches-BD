'use client';

import Link from 'next/link';
import { useCart } from '@/components/CartProvider';

export default function Cart() {
  const { items, updateQuantity, removeFromCart, total, itemCount } = useCart();

  return (
    <div className="min-h-screen bg-cream dark:bg-background-dark">
      {/* Header */}
      <div className="bg-secondary/10 dark:bg-slate-800/50 py-6 sm:py-8 lg:py-10 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-primary dark:text-cream">Shopping Cart</h1>
          {items.length > 0 && (
            <p className="font-body text-sm sm:text-base text-text-secondary dark:text-slate-400 mt-1 sm:mt-2">
              {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
            </p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-6 sm:py-8 lg:py-12">
        {items.length === 0 ? (
          <div className="text-center py-12 sm:py-16 lg:py-20">
            <span className="material-symbols-outlined text-5xl sm:text-6xl text-text-muted mb-4">shopping_bag</span>
            <h2 className="font-serif text-xl sm:text-2xl text-primary dark:text-cream mb-2">Your cart is empty</h2>
            <p className="font-body text-sm sm:text-base text-text-muted mb-6 sm:mb-8">Looks like you haven't added any items yet.</p>
            <Link 
              href="/shop" 
              className="inline-flex items-center gap-2 bg-primary text-cream px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-base hover:bg-primary-light transition-colors min-h-[48px]"
            >
              Start Shopping
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 flex flex-col gap-3 sm:gap-4">
              {items.map((item) => (
                <div 
                  key={item.productId} 
                  className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 flex gap-3 sm:gap-6 items-center relative shadow-sm"
                >
                  <button 
                    onClick={() => removeFromCart(item.productId)}
                    className="absolute top-2 right-2 sm:top-4 sm:right-4 p-1 sm:p-2 text-text-muted hover:text-primary dark:hover:text-secondary transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                    aria-label="Remove item"
                  >
                    <span className="material-symbols-outlined text-lg sm:text-xl">close</span>
                  </button>
                  
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg sm:rounded-xl overflow-hidden bg-secondary/10 shrink-0">
                    <img alt={item.name} className="w-full h-full object-cover" src={item.image} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-base sm:text-lg lg:text-xl text-primary dark:text-cream truncate pr-6 sm:pr-8">{item.name}</h3>
                    <p className="font-bold text-sm sm:text-base text-primary dark:text-cream mt-1">৳{item.price}</p>
                    
                    <div className="flex items-center justify-between mt-3 sm:mt-4">
                      <div className="flex items-center border border-secondary/30 rounded-full bg-secondary/5 dark:bg-slate-700 h-9 sm:h-10">
                        <button 
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="w-9 sm:w-10 flex items-center justify-center text-text-muted hover:text-primary transition-colors min-h-[36px] min-w-[36px]"
                        >
                          <span className="material-symbols-outlined text-sm">remove</span>
                        </button>
                        <span className="w-6 sm:w-8 text-center font-bold font-body text-xs sm:text-sm">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="w-9 sm:w-10 flex items-center justify-center text-text-muted hover:text-primary transition-colors min-h-[36px] min-w-[36px]"
                        >
                          <span className="material-symbols-outlined text-sm">add</span>
                        </button>
                      </div>
                      <span className="font-bold text-base sm:text-lg text-primary dark:text-cream">৳{item.price * item.quantity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 shadow-sm border border-secondary/10">
                <h3 className="font-serif text-xl sm:text-2xl text-primary dark:text-cream mb-4 sm:mb-6">Order Summary</h3>
                
                <div className="flex flex-col gap-3 sm:gap-4 font-body text-sm sm:text-base mb-4 sm:mb-6">
                  <div className="flex justify-between text-text-secondary dark:text-slate-400">
                    <span>Subtotal ({itemCount} items)</span>
                    <span>৳{total}</span>
                  </div>
                  <div className="flex justify-between text-text-secondary dark:text-slate-400">
                    <span>Delivery Fee</span>
                    <span className="text-xs sm:text-sm">Calculated at checkout</span>
                  </div>
                </div>

                <div className="border-t border-secondary/20 pt-4 sm:pt-6 mb-4 sm:mb-6">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-base sm:text-lg text-primary dark:text-cream">Total</span>
                    <span className="font-bold text-xl sm:text-2xl lg:text-3xl text-primary dark:text-cream">৳{total}</span>
                  </div>
                  <p className="text-[10px] sm:text-xs text-text-muted mt-1 text-right">VAT included</p>
                </div>

                <Link 
                  href="/checkout" 
                  className="w-full bg-primary hover:bg-primary-light text-cream font-bold py-3 sm:py-4 rounded-full shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 text-sm sm:text-base min-h-[48px]"
                >
                  Proceed to Checkout
                  <span className="material-symbols-outlined text-base sm:text-lg">arrow_forward</span>
                </Link>

                <div className="mt-4 sm:mt-6 flex items-center justify-center gap-2 text-xs sm:text-sm text-text-muted">
                  <span className="material-symbols-outlined text-base sm:text-lg">lock</span>
                  <span>Secure Checkout</span>
                </div>

                {/* Continue Shopping - Mobile */}
                <Link 
                  href="/shop" 
                  className="mt-4 w-full flex items-center justify-center gap-2 text-primary dark:text-secondary font-bold text-sm sm:text-base lg:hidden"
                >
                  <span className="material-symbols-outlined text-base sm:text-lg">arrow_back</span>
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
