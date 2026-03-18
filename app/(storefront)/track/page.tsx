'use client';

import { useState } from 'react';
import { mockOrders } from '@/lib/mock-data';

interface Order {
  id: string;
  status: string;
  createdAt: string | Date;
  total: number;
  items: any[];
}

export default function TrackOrder() {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async () => {
    if (!orderId.trim()) {
      setError('Please enter an order ID');
      return;
    }

    setLoading(true);
    setError('');
    setOrder(null);

    // Simulate search with mock data
    setTimeout(() => {
      const found = mockOrders.find(o => o.id.toLowerCase() === orderId.trim().toLowerCase());
      if (found) {
        setOrder(found as Order);
      } else {
        setError('Order not found. Please check the ID and try again.');
      }
      setLoading(false);
    }, 500);
  };

  const getStatusStep = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 1;
      case 'processing': return 2;
      case 'shipped': return 3;
      case 'delivered': return 4;
      case 'cancelled': return -1;
      default: return 1;
    }
  };

  const currentStep = order ? getStatusStep(order.status) : 0;

  return (
    <div className="min-h-screen bg-cream dark:bg-background-dark">
      {/* Header */}
      <div className="bg-secondary/10 dark:bg-slate-800/50 py-8 sm:py-12 px-4 sm:px-6 lg:px-20 text-center">
        <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-primary dark:text-cream mb-2 sm:mb-4">Track Your Order</h1>
        <p className="font-body text-sm sm:text-base lg:text-lg text-text-secondary dark:text-slate-400">Enter your order ID to see where your package is.</p>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-20 py-6 sm:py-8 lg:py-12">
        {/* Search Box */}
        <div className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-sm border border-secondary/10 mb-6 sm:mb-8 lg:mb-12">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <input 
              type="text" 
              placeholder="Enter Order ID (e.g., ORD-001)" 
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
              className="flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-full border border-secondary/30 bg-cream dark:bg-slate-700 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all font-body text-sm sm:text-base lg:text-lg min-h-[48px]"
            />
            <button 
              onClick={handleTrack}
              disabled={loading}
              className="bg-primary hover:bg-primary-light text-cream font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full shadow-lg shadow-primary/20 transition-all whitespace-nowrap disabled:opacity-70 text-sm sm:text-base min-h-[48px]"
            >
              {loading ? 'Tracking...' : 'Track Now'}
            </button>
          </div>
          {error && <p className="text-primary dark:text-secondary mt-3 sm:mt-4 text-center font-body text-xs sm:text-sm">{error}</p>}
        </div>

        {/* Order Result */}
        {order && (
          <div className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-sm border border-secondary/10">
            {/* Order Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8 lg:mb-10 border-b border-secondary/20 pb-4 sm:pb-6">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl text-primary dark:text-cream mb-1">Order #{order.id}</h2>
                <p className="font-body text-xs sm:text-sm text-text-muted">
                  Placed on {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
              <div className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-bold text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 ${
                order.status === 'Cancelled' ? 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400' :
                order.status === 'Delivered' ? 'bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400' :
                'bg-secondary/20 text-primary dark:text-secondary'
              }`}>
                <span className="material-symbols-outlined text-sm sm:text-base">
                  {order.status === 'Cancelled' ? 'cancel' :
                   order.status === 'Delivered' ? 'check_circle' :
                   order.status === 'Shipped' ? 'local_shipping' :
                   order.status === 'Processing' ? 'auto_awesome' : 'receipt_long'}
                </span>
                <span>{order.status}</span>
              </div>
            </div>

            {/* Progress Steps */}
            {order.status !== 'Cancelled' && (
              <div className="relative">
                {/* Progress Line */}
                <div className="absolute left-5 sm:left-6 top-0 bottom-0 w-0.5 bg-secondary/20 md:left-1/2 md:-ml-[1px]"></div>
                
                <div className="flex flex-col gap-6 sm:gap-8 lg:gap-10 relative z-10">
                  {/* Step 1 - Order Placed */}
                  <div className={`flex flex-row md:flex-row-reverse items-center gap-4 sm:gap-6 lg:gap-12 ${currentStep >= 1 ? '' : 'opacity-50'}`}>
                    <div className="flex-1 md:text-right hidden md:block">
                      <h4 className="font-bold font-body text-sm sm:text-base lg:text-lg text-primary dark:text-cream">Order Placed</h4>
                      <p className="text-text-muted text-xs sm:text-sm">We received your order.</p>
                    </div>
                    <div className={`size-10 sm:size-12 rounded-full flex items-center justify-center shrink-0 border-4 border-cream dark:border-background-dark ${currentStep >= 1 ? 'bg-primary text-cream' : 'bg-secondary/20 text-text-muted'}`}>
                      <span className="material-symbols-outlined text-lg sm:text-xl">receipt_long</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold font-body text-sm sm:text-base text-primary dark:text-cream md:hidden">Order Placed</h4>
                      <p className="text-text-muted text-xs sm:text-sm mt-0.5 md:hidden">We received your order.</p>
                    </div>
                  </div>

                  {/* Step 2 - Processing */}
                  <div className={`flex flex-row items-center gap-4 sm:gap-6 lg:gap-12 ${currentStep >= 2 ? '' : 'opacity-50'}`}>
                    <div className="flex-1 md:text-right hidden md:block">
                      <p className="text-text-muted text-xs sm:text-sm mt-1">Your items are being prepared.</p>
                    </div>
                    <div className={`size-10 sm:size-12 rounded-full flex items-center justify-center shrink-0 border-4 border-cream dark:border-background-dark ${currentStep >= 2 ? 'bg-primary text-cream' : 'bg-secondary/20 text-text-muted'}`}>
                      <span className="material-symbols-outlined text-lg sm:text-xl">auto_awesome</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold font-body text-sm sm:text-base text-primary dark:text-cream">Processing</h4>
                      <p className="text-text-muted text-xs sm:text-sm mt-0.5 md:hidden">Your items are being prepared.</p>
                    </div>
                  </div>

                  {/* Step 3 - Shipped */}
                  <div className={`flex flex-row md:flex-row-reverse items-center gap-4 sm:gap-6 lg:gap-12 ${currentStep >= 3 ? '' : 'opacity-50'}`}>
                    <div className="flex-1 md:text-right hidden md:block">
                      <h4 className="font-bold font-body text-sm sm:text-base lg:text-lg text-primary dark:text-cream">Shipped</h4>
                      <p className="text-text-muted text-xs sm:text-sm">Handed over to delivery partner.</p>
                    </div>
                    <div className={`size-10 sm:size-12 rounded-full flex items-center justify-center shrink-0 border-4 border-cream dark:border-background-dark ${currentStep >= 3 ? 'bg-primary text-cream' : 'bg-secondary/20 text-text-muted'}`}>
                      <span className="material-symbols-outlined text-lg sm:text-xl">local_shipping</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold font-body text-sm sm:text-base text-primary dark:text-cream md:hidden">Shipped</h4>
                      <p className="text-text-muted text-xs sm:text-sm mt-0.5 md:hidden">Handed over to delivery partner.</p>
                    </div>
                  </div>

                  {/* Step 4 - Delivered */}
                  <div className={`flex flex-row items-center gap-4 sm:gap-6 lg:gap-12 ${currentStep >= 4 ? '' : 'opacity-50'}`}>
                    <div className="flex-1 md:text-right hidden md:block">
                      <p className="text-text-muted text-xs sm:text-sm mt-1">Package has arrived.</p>
                    </div>
                    <div className={`size-10 sm:size-12 rounded-full flex items-center justify-center shrink-0 border-4 border-cream dark:border-background-dark ${currentStep >= 4 ? 'bg-primary text-cream' : 'bg-secondary/20 text-text-muted'}`}>
                      <span className="material-symbols-outlined text-lg sm:text-xl">home</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold font-body text-sm sm:text-base text-primary dark:text-cream">Delivered</h4>
                      <p className="text-text-muted text-xs sm:text-sm mt-0.5 md:hidden">Package has arrived.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
