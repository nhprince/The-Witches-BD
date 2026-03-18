'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { collection, getDocs, query, orderBy, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Order {
  id: string;
  userId: string;
  items: any[];
  totalAmount: number;
  status: string;
  shippingAddress: any;
  createdAt: any;
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    setLoading(true);
    try {
      const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const ordersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Order[];
      setOrders(ordersData);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), { status: newStatus });
      setOrders(orders.map(order => order.id === orderId ? { ...order, status: newStatus } : order));
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="font-serif text-3xl mb-1">Orders</h1>
          <p className="font-body text-slate-500">Manage customer orders and fulfillment.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
              <input type="text" placeholder="Search orders..." className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all font-body text-sm" />
            </div>
            <button className="p-2 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-500 hover:text-primary hover:border-primary transition-colors bg-slate-50 dark:bg-slate-900">
              <span className="material-symbols-outlined text-xl">filter_list</span>
            </button>
          </div>
          <div className="flex items-center gap-2 text-sm font-body font-semibold text-slate-500 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
            <button className="px-4 py-1.5 rounded-full bg-primary/10 text-primary whitespace-nowrap">All ({orders.length})</button>
            <button className="px-4 py-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors whitespace-nowrap">Pending ({orders.filter(o => o.status === 'pending').length})</button>
            <button className="px-4 py-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors whitespace-nowrap">Processing ({orders.filter(o => o.status === 'processing').length})</button>
            <button className="px-4 py-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors whitespace-nowrap">Shipped ({orders.filter(o => o.status === 'shipped').length})</button>
            <button className="px-4 py-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors whitespace-nowrap">Delivered ({orders.filter(o => o.status === 'delivered').length})</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-body text-sm">
            <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500">
              <tr>
                <th className="px-6 py-4 font-semibold">Order ID</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Customer</th>
                <th className="px-6 py-4 font-semibold">Total</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                    </div>
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                    No orders found.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                    <td className="px-6 py-4 font-bold">#{order.id.slice(-6).toUpperCase()}</td>
                    <td className="px-6 py-4 text-slate-500">
                      {order.createdAt?.toDate ? order.createdAt.toDate().toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold">{order.shippingAddress?.firstName} {order.shippingAddress?.lastName}</div>
                      <div className="text-xs text-slate-500">{order.shippingAddress?.email}</div>
                    </td>
                    <td className="px-6 py-4 font-bold">৳ {order.totalAmount}</td>
                    <td className="px-6 py-4">
                      <select 
                        value={order.status} 
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className={`px-2.5 py-1 rounded-full text-xs font-bold outline-none cursor-pointer ${
                          order.status === 'delivered' ? 'bg-green-100 text-green-700 border border-green-200' :
                          order.status === 'shipped' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                          order.status === 'processing' ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' :
                          'bg-slate-100 text-slate-700 border border-slate-200'
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/admin/orders/${order.id}`} className="text-primary hover:underline font-bold text-xs">
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-sm font-body text-slate-500">
          <span>Showing {orders.length} orders</span>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border border-slate-200 dark:border-slate-600 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 border border-slate-200 dark:border-slate-600 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50" disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
