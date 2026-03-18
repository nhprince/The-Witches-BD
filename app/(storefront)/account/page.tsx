'use client';

import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/components/AuthProvider';
import Link from 'next/link';

interface Order {
  id: string;
  items: any[];
  totalAmount: number;
  status: string;
  createdAt: any;
}

export default function AccountPage() {
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserOrders() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const q = query(
          collection(db, 'orders'),
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const ordersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Order[];
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching user orders:", error);
      } finally {
        setLoading(false);
      }
    }

    if (!authLoading) {
      fetchUserOrders();
    }
  }, [user, authLoading]);

  if (authLoading || loading) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col justify-center items-center px-4">
        <h1 className="font-serif text-3xl mb-4">My Account</h1>
        <p className="text-slate-500 mb-8 text-center max-w-md">Please log in to view your order history and account details.</p>
        <button className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-full shadow-sm transition-all">
          Log In
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="font-serif text-4xl mb-2">My Account</h1>
        <p className="text-slate-500 font-body">Welcome back, {user.displayName || user.email}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
            <h2 className="font-bold font-body mb-4">Account Details</h2>
            <div className="space-y-4 text-sm font-body">
              <div>
                <p className="text-slate-500 mb-1">Name</p>
                <p className="font-medium">{user.displayName || 'N/A'}</p>
              </div>
              <div>
                <p className="text-slate-500 mb-1">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
              <button className="text-primary hover:underline font-bold mt-4">Edit Profile</button>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <h2 className="font-serif text-2xl mb-6">Order History</h2>
          
          {orders.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
              <span className="material-symbols-outlined text-4xl text-slate-300 mb-4">shopping_bag</span>
              <p className="font-body text-slate-500 mb-4">You haven't placed any orders yet.</p>
              <Link href="/shop" className="text-primary font-bold hover:underline">
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 pb-4 border-b border-slate-100 dark:border-slate-700 gap-4">
                    <div>
                      <p className="font-bold font-body text-sm mb-1">Order #{order.id.slice(-6).toUpperCase()}</p>
                      <p className="text-xs text-slate-500">
                        {order.createdAt?.toDate ? order.createdAt.toDate().toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                        order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                        order.status === 'processing' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                      <span className="font-bold">৳ {order.totalAmount}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    {order.items?.map((item: any, index: number) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="size-12 rounded-lg bg-slate-100 dark:bg-slate-700 overflow-hidden shrink-0">
                          <img src={item.image || 'https://via.placeholder.com/48'} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold font-body text-sm truncate">{item.name}</p>
                          <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-end">
                    <Link href={`/track?id=${order.id}`} className="text-sm font-bold text-primary hover:underline">
                      Track Order
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
