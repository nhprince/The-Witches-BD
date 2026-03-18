'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { collection, getDocs, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  status: string;
  images?: string[];
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    try {
      const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteDoc(doc(db, 'products', id));
        setProducts(products.filter(p => p.id !== id));
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product.");
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="font-serif text-3xl mb-1">Products</h1>
          <p className="font-body text-slate-500">Manage your magical inventory.</p>
        </div>
        <Link href="/admin/products/new" className="bg-primary hover:bg-primary/90 text-white font-bold py-2.5 px-5 rounded-xl shadow-sm transition-all flex items-center gap-2 text-sm">
          <span className="material-symbols-outlined text-sm">add</span>
          Add Product
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
              <input type="text" placeholder="Search products..." className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all font-body text-sm" />
            </div>
            <button className="p-2 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-500 hover:text-primary hover:border-primary transition-colors bg-slate-50 dark:bg-slate-900">
              <span className="material-symbols-outlined text-xl">filter_list</span>
            </button>
          </div>
          <div className="flex items-center gap-2 text-sm font-body font-semibold text-slate-500 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
            <button className="px-4 py-1.5 rounded-full bg-primary/10 text-primary whitespace-nowrap">All ({products.length})</button>
            <button className="px-4 py-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors whitespace-nowrap">Active ({products.filter(p => p.status === 'active').length})</button>
            <button className="px-4 py-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors whitespace-nowrap">Drafts ({products.filter(p => p.status === 'draft').length})</button>
            <button className="px-4 py-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors whitespace-nowrap">Archived ({products.filter(p => p.status === 'archived').length})</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-body text-sm">
            <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500">
              <tr>
                <th className="px-6 py-4 font-semibold w-10">
                  <input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-primary" />
                </th>
                <th className="px-6 py-4 font-semibold">Product</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Inventory</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold">Price</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-slate-500">
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                    </div>
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-slate-500">
                    No products found.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                    <td className="px-6 py-4">
                      <input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-primary" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-lg bg-slate-100 dark:bg-slate-700 overflow-hidden shrink-0">
                          <img src={product.images?.[0] || 'https://via.placeholder.com/40'} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <span className="font-bold">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        product.status === 'active' ? 'bg-green-100 text-green-700 border border-green-200' :
                        product.status === 'draft' ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' :
                        'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}>
                        {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={product.stock <= 0 ? 'text-red-500 font-bold' : ''}>
                        {product.stock} in stock
                      </span>
                    </td>
                    <td className="px-6 py-4">{product.category}</td>
                    <td className="px-6 py-4 font-bold">৳ {product.price}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href={`/admin/products/${product.id}`} className="p-1.5 text-slate-400 hover:text-primary transition-colors rounded-md hover:bg-primary/10">
                          <span className="material-symbols-outlined text-sm">edit</span>
                        </Link>
                        <button onClick={() => handleDelete(product.id)} className="p-1.5 text-slate-400 hover:text-red-500 transition-colors rounded-md hover:bg-red-50 dark:hover:bg-red-500/10">
                          <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-sm font-body text-slate-500">
          <span>Showing {products.length} products</span>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border border-slate-200 dark:border-slate-600 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 border border-slate-200 dark:border-slate-600 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50" disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
