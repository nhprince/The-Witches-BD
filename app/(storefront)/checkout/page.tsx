'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/components/CartProvider';
import { useAuth } from '@/components/AuthProvider';

export default function Checkout() {
  const router = useRouter();
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    email: user?.email || '',
    phone: '',
    firstName: '',
    lastName: '',
    street: '',
    city: 'Dhaka',
    postalCode: '',
    paymentMethod: 'Cash on Delivery'
  });

  const deliveryFee = formData.city === 'Dhaka' ? 80 : 150;
  const finalTotal = total + deliveryFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      setError('Your cart is empty');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate order processing
    setTimeout(() => {
      clearCart();
      router.push('/success?orderId=ORD-' + Date.now());
    }, 1500);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-cream dark:bg-background-dark flex items-center justify-center px-4">
        <div className="text-center py-12 sm:py-16">
          <span className="material-symbols-outlined text-5xl sm:text-6xl text-text-muted mb-4">shopping_bag</span>
          <h1 className="font-serif text-2xl sm:text-3xl text-primary dark:text-cream mb-4">Your cart is empty</h1>
          <Link 
            href="/shop" 
            className="inline-flex items-center gap-2 bg-primary text-cream px-6 py-3 rounded-full font-bold text-sm hover:bg-primary-light transition-colors min-h-[48px]"
          >
            Start Shopping
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream dark:bg-background-dark">
      {/* Header */}
      <div className="bg-secondary/10 dark:bg-slate-800/50 py-4 sm:py-6 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-body text-text-muted">
            <Link href="/cart" className="hover:text-primary dark:hover:text-secondary transition-colors">Cart</Link>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-primary dark:text-cream font-bold">Checkout</span>
          </div>
          <h1 className="font-serif text-xl sm:text-2xl lg:text-3xl text-primary dark:text-cream mt-2">Checkout</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-6 sm:py-8">
        {error && (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-primary/10 text-primary dark:text-secondary rounded-xl border border-secondary/20 text-sm sm:text-base">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-5 gap-6 sm:gap-8">
          {/* Form Sections */}
          <div className="lg:col-span-3 flex flex-col gap-4 sm:gap-6">
            {/* Contact Information */}
            <div className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-secondary/10">
              <h2 className="font-serif text-lg sm:text-xl lg:text-2xl text-primary dark:text-cream mb-4 sm:mb-6 flex items-center gap-3">
                <span className="bg-secondary/20 text-primary dark:text-secondary size-7 sm:size-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">1</span>
                Contact Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 font-body">
                <div className="sm:col-span-2">
                  <label className="block text-xs sm:text-sm font-bold mb-1.5 sm:mb-2 text-primary dark:text-cream">Email Address</label>
                  <input 
                    required 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleInputChange} 
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-secondary/30 bg-cream dark:bg-slate-700 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-sm sm:text-base min-h-[44px]" 
                    placeholder="you@example.com" 
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs sm:text-sm font-bold mb-1.5 sm:mb-2 text-primary dark:text-cream">Phone Number</label>
                  <input 
                    required 
                    type="tel" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleInputChange} 
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-secondary/30 bg-cream dark:bg-slate-700 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-sm sm:text-base min-h-[44px]" 
                    placeholder="+880 1XXX XXXXXX" 
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-secondary/10">
              <h2 className="font-serif text-lg sm:text-xl lg:text-2xl text-primary dark:text-cream mb-4 sm:mb-6 flex items-center gap-3">
                <span className="bg-secondary/20 text-primary dark:text-secondary size-7 sm:size-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">2</span>
                Shipping Address
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 font-body">
                <div>
                  <label className="block text-xs sm:text-sm font-bold mb-1.5 sm:mb-2 text-primary dark:text-cream">First Name</label>
                  <input 
                    required 
                    type="text" 
                    name="firstName" 
                    value={formData.firstName} 
                    onChange={handleInputChange} 
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-secondary/30 bg-cream dark:bg-slate-700 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-sm sm:text-base min-h-[44px]" 
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-bold mb-1.5 sm:mb-2 text-primary dark:text-cream">Last Name</label>
                  <input 
                    required 
                    type="text" 
                    name="lastName" 
                    value={formData.lastName} 
                    onChange={handleInputChange} 
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-secondary/30 bg-cream dark:bg-slate-700 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-sm sm:text-base min-h-[44px]" 
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs sm:text-sm font-bold mb-1.5 sm:mb-2 text-primary dark:text-cream">Street Address</label>
                  <input 
                    required 
                    type="text" 
                    name="street" 
                    value={formData.street} 
                    onChange={handleInputChange} 
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-secondary/30 bg-cream dark:bg-slate-700 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-sm sm:text-base min-h-[44px]" 
                    placeholder="House, Road, Block/Sector" 
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-bold mb-1.5 sm:mb-2 text-primary dark:text-cream">City</label>
                  <select 
                    name="city" 
                    value={formData.city} 
                    onChange={handleInputChange} 
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-secondary/30 bg-cream dark:bg-slate-700 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all appearance-none text-sm sm:text-base min-h-[44px]"
                  >
                    <option value="Dhaka">Dhaka</option>
                    <option value="Chattogram">Chattogram</option>
                    <option value="Sylhet">Sylhet</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-bold mb-1.5 sm:mb-2 text-primary dark:text-cream">Postal Code</label>
                  <input 
                    required 
                    type="text" 
                    name="postalCode" 
                    value={formData.postalCode} 
                    onChange={handleInputChange} 
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-secondary/30 bg-cream dark:bg-slate-700 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-sm sm:text-base min-h-[44px]" 
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-secondary/10">
              <h2 className="font-serif text-lg sm:text-xl lg:text-2xl text-primary dark:text-cream mb-4 sm:mb-6 flex items-center gap-3">
                <span className="bg-secondary/20 text-primary dark:text-secondary size-7 sm:size-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">3</span>
                Payment Method
              </h2>
              <div className="flex flex-col gap-3 font-body">
                <label className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 border-2 rounded-lg sm:rounded-xl cursor-pointer transition-colors min-h-[48px] ${formData.paymentMethod === 'Cash on Delivery' ? 'border-primary bg-primary/5' : 'border-secondary/30 hover:border-primary/50'}`}>
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="Cash on Delivery" 
                    checked={formData.paymentMethod === 'Cash on Delivery'} 
                    onChange={handleInputChange} 
                    className="w-4 h-4 sm:w-5 sm:h-5 text-primary focus:ring-primary" 
                  />
                  <div className="flex-1">
                    <span className="font-bold block text-sm sm:text-base">Cash on Delivery</span>
                    <span className="text-xs sm:text-sm text-text-muted">Pay when you receive your order</span>
                  </div>
                  <span className="material-symbols-outlined text-primary text-xl sm:text-2xl">local_shipping</span>
                </label>
                <label className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 border-2 rounded-lg sm:rounded-xl cursor-pointer transition-colors min-h-[48px] ${formData.paymentMethod === 'bKash / Nagad' ? 'border-primary bg-primary/5' : 'border-secondary/30 hover:border-primary/50'}`}>
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="bKash / Nagad" 
                    checked={formData.paymentMethod === 'bKash / Nagad'} 
                    onChange={handleInputChange} 
                    className="w-4 h-4 sm:w-5 sm:h-5 text-primary focus:ring-primary" 
                  />
                  <div className="flex-1">
                    <span className="font-bold block text-sm sm:text-base">bKash / Nagad</span>
                    <span className="text-xs sm:text-sm text-text-muted">Mobile financial services</span>
                  </div>
                  <span className="material-symbols-outlined text-text-muted text-xl sm:text-2xl">smartphone</span>
                </label>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-secondary/10 lg:sticky lg:top-24">
              <h3 className="font-serif text-lg sm:text-xl lg:text-2xl text-primary dark:text-cream mb-4 sm:mb-6">Order Summary</h3>
              
              {/* Items */}
              <div className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-6 max-h-[250px] sm:max-h-[300px] overflow-y-auto pr-1 sm:pr-2">
                {items.map((item) => (
                  <div key={item.productId} className="flex gap-3 items-center">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden bg-secondary/10 shrink-0 relative">
                      <img alt={item.name} className="w-full h-full object-cover" src={item.image} />
                      <span className="absolute -top-1 -right-1 bg-primary text-cream text-[10px] size-4 sm:size-5 rounded-full flex items-center justify-center font-bold">{item.quantity}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-xs sm:text-sm text-primary dark:text-cream truncate">{item.name}</h4>
                    </div>
                    <span className="font-bold text-xs sm:text-sm text-primary dark:text-cream">৳{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="flex flex-col gap-2 sm:gap-3 font-body text-xs sm:text-sm mb-4 sm:mb-6 border-t border-secondary/20 pt-4 sm:pt-6">
                <div className="flex justify-between text-text-secondary dark:text-slate-400">
                  <span>Subtotal</span>
                  <span>৳{total}</span>
                </div>
                <div className="flex justify-between text-text-secondary dark:text-slate-400">
                  <span>Delivery ({formData.city})</span>
                  <span>৳{deliveryFee}</span>
                </div>
              </div>

              <div className="border-t border-secondary/20 pt-4 sm:pt-6 mb-4 sm:mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-sm sm:text-base text-primary dark:text-cream">Total</span>
                  <span className="font-bold text-xl sm:text-2xl lg:text-3xl text-primary dark:text-cream">৳{finalTotal}</span>
                </div>
              </div>

              <button 
                disabled={loading} 
                type="submit" 
                className="w-full bg-primary hover:bg-primary-light text-cream font-bold py-3 sm:py-4 rounded-full shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-sm sm:text-base min-h-[48px]"
              >
                {loading ? 'Processing...' : 'Place Order'}
                {!loading && <span className="material-symbols-outlined text-base sm:text-lg">check_circle</span>}
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs sm:text-sm text-text-muted">
                <span className="material-symbols-outlined text-base sm:text-lg">lock</span>
                <span>Secure Checkout</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
