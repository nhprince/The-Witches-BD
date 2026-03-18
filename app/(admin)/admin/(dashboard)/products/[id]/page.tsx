'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function AdminEditProduct() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    compareAtPrice: '',
    sku: '',
    stock: '',
    status: 'Active',
    category: 'Crochet',
    tags: '',
    images: ''
  });

  useEffect(() => {
    async function fetchProduct() {
      if (!id) return;
      try {
        const docRef = doc(db, 'products', id as string);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormData({
            name: data.name || '',
            description: data.description || '',
            price: data.price?.toString() || '',
            compareAtPrice: data.compareAtPrice?.toString() || '',
            sku: data.sku || '',
            stock: data.stock?.toString() || '',
            status: data.status ? data.status.charAt(0).toUpperCase() + data.status.slice(1) : 'Active',
            category: data.category || 'Crochet',
            tags: data.tags ? data.tags.join(', ') : '',
            images: data.images ? data.images.join(', ') : ''
          });
        } else {
          setError("Product not found");
        }
      } catch (err: any) {
        console.error("Error fetching product:", err);
        setError("Failed to fetch product details");
      } finally {
        setFetching(false);
      }
    }
    fetchProduct();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price) || 0,
        compareAtPrice: formData.compareAtPrice ? Number(formData.compareAtPrice) : null,
        sku: formData.sku,
        stock: Number(formData.stock) || 0,
        status: formData.status.toLowerCase(),
        category: formData.category,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
        images: formData.images.split(',').map(img => img.trim()).filter(img => img !== ''),
      };

      await updateDoc(doc(db, 'products', id as string), productData);
      router.push('/admin/products');
    } catch (err: any) {
      console.error("Error updating product:", err);
      setError(err.message || "Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
      <div className="mb-8 flex items-center gap-2 text-sm font-body text-slate-500">
        <Link href="/admin/products" className="hover:text-primary transition-colors">Products</Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="text-slate-900 dark:text-slate-100 font-bold">Edit Product</span>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="font-serif text-3xl mb-1">Edit Product</h1>
        <div className="flex items-center gap-3">
          <Link href="/admin/products" className="px-6 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 font-bold font-body text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            Discard
          </Link>
          <button type="submit" disabled={loading} className="bg-primary hover:bg-primary/90 text-white font-bold py-2.5 px-6 rounded-xl shadow-sm transition-all text-sm disabled:opacity-50">
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 border border-red-200 rounded-xl font-body text-sm">
          {error}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* General Information */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
            <h2 className="font-serif text-xl mb-6">General Information</h2>
            <div className="flex flex-col gap-4 font-body">
              <div>
                <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">Product Name *</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-transparent focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all" placeholder="e.g. Lavender Dream Scrub" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows={5} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-transparent focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all resize-none" placeholder="Describe the magic inside..."></textarea>
              </div>
            </div>
          </div>

          {/* Media */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
            <h2 className="font-serif text-xl mb-6">Media (URLs)</h2>
            <div className="font-body">
                <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">Image URLs (comma separated)</label>
                <textarea name="images" value={formData.images} onChange={handleChange} rows={3} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-transparent focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all resize-none" placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"></textarea>
            </div>
          </div>

          {/* Pricing & Inventory */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
            <h2 className="font-serif text-xl mb-6">Pricing & Inventory</h2>
            <div className="grid grid-cols-2 gap-4 font-body">
              <div>
                <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">Price (৳) *</label>
                <input required type="number" name="price" value={formData.price} onChange={handleChange} min="0" step="0.01" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-transparent focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all" placeholder="0.00" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">Compare at Price (৳)</label>
                <input type="number" name="compareAtPrice" value={formData.compareAtPrice} onChange={handleChange} min="0" step="0.01" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-transparent focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all" placeholder="0.00" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">SKU</label>
                <input type="text" name="sku" value={formData.sku} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-transparent focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all" placeholder="e.g. WBD-SCRUB-01" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">Quantity in Stock *</label>
                <input required type="number" name="stock" value={formData.stock} onChange={handleChange} min="0" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-transparent focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all" placeholder="0" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          {/* Status */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
            <h2 className="font-serif text-xl mb-6">Status</h2>
            <div className="font-body">
              <select name="status" value={formData.status} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-transparent focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all appearance-none">
                <option value="Active">Active</option>
                <option value="Draft">Draft</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
          </div>

          {/* Organization */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
            <h2 className="font-serif text-xl mb-6">Organization</h2>
            <div className="flex flex-col gap-4 font-body">
              <div>
                <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">Category</label>
                <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-transparent focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all appearance-none">
                  <option value="Crochet">Crochet</option>
                  <option value="Herbal">Herbal</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Crystals">Crystals</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">Tags</label>
                <input type="text" name="tags" value={formData.tags} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-transparent focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all" placeholder="e.g. handmade, organic, new" />
                <p className="text-xs text-slate-500 mt-2">Separate tags with commas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
