'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function AdminOrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchOrder() {
      if (!id) return;
      try {
        const docRef = doc(db, 'orders', id as string);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setOrder({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError("Order not found");
        }
      } catch (err: any) {
        console.error("Error fetching order:", err);
        setError("Failed to fetch order details");
      } finally {
        setLoading(false);
      }
    }
    fetchOrder();
  }, [id]);

  const handleStatusChange = async (newStatus: string) => {
    try {
      await updateDoc(doc(db, 'orders', id as string), { status: newStatus });
      setOrder({ ...order, status: newStatus });
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-red-50 text-red-600 rounded-2xl border border-red-200">
        {error || "Order not found"}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 flex items-center gap-2 text-sm font-body text-slate-500">
        <Link href="/admin/orders" className="hover:text-primary transition-colors">Orders</Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="text-slate-900 dark:text-slate-100 font-bold">#{order.id.slice(-6).toUpperCase()}</span>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="font-serif text-3xl mb-1">Order #{order.id.slice(-6).toUpperCase()}</h1>
          <p className="font-body text-slate-500">
            Placed on {order.createdAt?.toDate ? order.createdAt.toDate().toLocaleString() : 'N/A'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={order.status} 
            onChange={(e) => handleStatusChange(e.target.value)}
            className={`px-4 py-2.5 rounded-xl text-sm font-bold outline-none cursor-pointer border ${
              order.status === 'delivered' ? 'bg-green-100 text-green-700 border-green-200' :
              order.status === 'shipped' ? 'bg-blue-100 text-blue-700 border-blue-200' :
              order.status === 'processing' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
              'bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* Order Items */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
            <h2 className="font-serif text-xl mb-6">Items</h2>
            <div className="flex flex-col gap-4">
              {order.items?.map((item: any, index: number) => (
                <div key={index} className="flex items-center justify-between py-4 border-b border-slate-100 dark:border-slate-700 last:border-0 last:pb-0">
                  <div className="flex items-center gap-4">
                    <div className="size-16 rounded-lg bg-slate-100 dark:bg-slate-700 overflow-hidden shrink-0">
                      <img src={item.image || 'https://via.placeholder.com/64'} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold font-body text-sm">{item.name}</h4>
                      <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="font-bold text-sm">৳ {item.price * item.quantity}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-700">
              <div className="flex justify-between items-center mb-2 font-body text-sm text-slate-500">
                <span>Subtotal</span>
                <span>৳ {order.totalAmount - (order.shippingMethod === 'inside' ? 60 : 120)}</span>
              </div>
              <div className="flex justify-between items-center mb-4 font-body text-sm text-slate-500">
                <span>Shipping ({order.shippingMethod === 'inside' ? 'Inside Dhaka' : 'Outside Dhaka'})</span>
                <span>৳ {order.shippingMethod === 'inside' ? 60 : 120}</span>
              </div>
              <div className="flex justify-between items-center font-bold text-lg">
                <span>Total</span>
                <span>৳ {order.totalAmount}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          {/* Customer Info */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
            <h2 className="font-serif text-xl mb-6">Customer</h2>
            <div className="flex flex-col gap-4 font-body text-sm">
              <div>
                <p className="font-bold">{order.shippingAddress?.firstName} {order.shippingAddress?.lastName}</p>
                <p className="text-slate-500">{order.shippingAddress?.email}</p>
                <p className="text-slate-500">{order.shippingAddress?.phone}</p>
              </div>
              <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
                <h3 className="font-bold mb-2">Shipping Address</h3>
                <p className="text-slate-500">
                  {order.shippingAddress?.address}<br />
                  {order.shippingAddress?.city}, {order.shippingAddress?.postalCode}
                </p>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
            <h2 className="font-serif text-xl mb-6">Payment</h2>
            <div className="flex flex-col gap-4 font-body text-sm">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Method</span>
                <span className="font-bold capitalize">{order.paymentMethod?.replace('_', ' ')}</span>
              </div>
              {order.paymentMethod !== 'cod' && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Transaction ID</span>
                    <span className="font-bold">{order.transactionId || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Account Number</span>
                    <span className="font-bold">{order.accountNumber || 'N/A'}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
