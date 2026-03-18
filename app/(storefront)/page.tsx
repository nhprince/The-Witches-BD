'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/components/CartProvider';
import { mockProducts, categories, getFeaturedProducts, getNewArrivals, getBestsellers } from '@/lib/mock-data';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  images?: string[];
  category: string;
  stock: number;
  tags?: string[];
  featured?: boolean;
}

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [bestsellers, setBestsellers] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const timer = setTimeout(() => {
      setFeaturedProducts(getFeaturedProducts());
      setNewArrivals(getNewArrivals(4));
      setBestsellers(getBestsellers(4));
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images?.[0] || 'https://via.placeholder.com/400',
    });
    alert('Added to cart!');
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-cream dark:bg-background-dark">
      <div className="absolute inset-0 floral-pattern pointer-events-none"></div>

      {/* ── Hero ── */}
      <main className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-20 pt-2 sm:pt-4 pb-4 sm:pb-10 lg:pb-16 overflow-x-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-12 items-center">

          {/* Left copy — below image on mobile */}
          <div className="flex flex-col gap-3 sm:gap-5 lg:gap-6 max-w-2xl order-2 lg:order-1">
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-primary dark:text-cream leading-tight sm:leading-[1.1]">
              Beautiful Crochet
              <span className="block mt-2 text-secondary dark:text-dusty-rose">Made for You</span>
            </h1>

            <p className="font-body text-base sm:text-lg md:text-xl text-text-secondary dark:text-slate-400 leading-relaxed">
              Discover unique handcrafted crochet pieces made with love & intention in Bangladesh. Each item tells a story of tradition and artistry.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-1 sm:pt-4">
              <Link href="/shop" className="px-5 sm:px-8 py-3 sm:py-4 bg-primary hover:bg-primary-light text-cream font-bold rounded-full shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 text-sm sm:text-lg">
                Shop Collection
                <span className="material-symbols-outlined text-base sm:text-lg">arrow_forward</span>
              </Link>
              <Link href="/about" className="px-5 sm:px-8 py-3 sm:py-4 border-2 border-primary text-primary dark:text-secondary font-bold rounded-full hover:bg-primary hover:text-cream dark:hover:bg-secondary dark:hover:text-primary transition-all text-center text-sm sm:text-lg">
                Our Story
              </Link>
            </div>

            <div className="flex items-center gap-8 mt-4">
              <div className="flex -space-x-3">
                {[
                  'AB6AXuAyWY_u-P16skxz1UrHYSFAuduaTuO4_vNCTb612UOy6XpnABj7N0wq_54XIe7CC7uq0sZ79l8RHUhdf_-57_GUrKzRdCcqe8avmqfSIeSuS-a0_mhmW_3ri_8fo1sfMJOIaGp7s4mQ-Zds4vF1OdnCKpka_TtPkcYtXh281PbrGlyLhC_G27XDONdI-UOTBqZwvfDBWfvewIxn1XgQqdVin9JOIpbS-kwq5bMeoR5EHKspvnt-WCcbdSn6qqD8Z2vaspa5MWUhUb5l',
                  'AB6AXuDpwFpXXXG4RYbjxGw5R35TTsS9R5kkx9BddB_zFm-nYYG6yv1r6gMV7wUdO_3p3E281s2DKlaa7QuMXqU5_r7aCaKmhILdqyV0mJbyy8XpzPs_FRmYWRbxOxXsdPy4LRJCqTo5BNDZE_K0NWkJPa3m3Pkcz2X8e7iKekjamNclU6ED1YwLJip2elhoDbMod5HS2Ok_1rCSOXQvOfBSfBPUDVUopxirwW9s_-gqdrOLUyK6M0fYRprD1S8_M-2TUQ3nV5AZJXyq0m-n',
                  'AB6AXuAs14f4NElaVxT6MreghmqX_06MMl9FhhCSvVoB6hdUvSb3TIoM6tscZZ46ooOOPDA-Sc85C60jIrZbWS48vyM5phBdhMa8X7JAO2JcVGyqhJiLwkg5uXVtqkvyi56wyGU-oQGxZ3zV80Ap_v-b2643E59t5P7-D0tiUwBAcvoYQtUNJ78uQPXqElNZqZOmeUqwJFSRSQt8IQstT8bt5G8GA3rhMbUUQaNm881iYdImlTP1DeLhFWUNc6IsHeY3wIFsZviO61wWNHC9',
                ].map((id, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white bg-cover bg-center shadow-sm"
                    style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/${id}')` }}
                  />
                ))}
              </div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Trusted by <span className="text-slate-900 dark:text-secondary font-bold">2,000+</span> magical souls
              </p>
            </div>
          </div>

          {/* Right image — above text on mobile */}
          <div className="relative flex flex-col items-center lg:flex lg:justify-end order-1 lg:order-2">

            {/* Badges: horizontal row above image on mobile only */}
            <div className="flex sm:hidden flex-row gap-2 mb-2 flex-wrap justify-start w-full max-w-[340px]">
              {[
                { label: '✨ Handmade', rotate: '-rotate-2' },
                { label: '🌸 Unique',   rotate: 'rotate-1'  },
                { label: '🧶 Crochet',  rotate: '-rotate-1' },
              ].map(({ label, rotate }) => (
                <div key={label} className={`bg-white/95 shadow-md px-3 py-1.5 rounded-full border border-secondary/20 font-handwritten text-sm text-primary ${rotate}`}>
                  {label}
                </div>
              ))}
            </div>

            {/* Image — slightly tilted clockwise */}
            <div className="relative w-full max-w-[340px] sm:max-w-[500px] aspect-square lg:aspect-auto lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl border-4 sm:border-[12px] border-secondary/20 rotate-2">
              <img
                alt="Handcrafted crochet products"
                className="w-full h-full object-cover"
                src="/products/decor-bouquet.jpeg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>

            {/* Badges: desktop — exact positions from reference */}
            <div className="hidden sm:flex absolute -top-6 -left-6 md:-left-12 flex-col gap-4 z-10">
              {[
                { label: '✨ Handmade', rotate: '-rotate-12', ml: '' },
                { label: '🌸 Unique',   rotate: 'rotate-6',   ml: 'ml-8' },
                { label: '🧶 Crochet',  rotate: '-rotate-6',  ml: 'ml-4' },
              ].map(({ label, rotate, ml }) => (
                <div key={label} className={`bg-white/90 backdrop-blur-sm shadow-md px-6 py-2 rounded-full border border-secondary/20 font-handwritten text-xl text-primary ${rotate} ${ml} w-fit`}>
                  {label}
                </div>
              ))}
            </div>

            {/* Made with Love badge */}
            <div
              className="flex absolute bottom-2 right-2 sm:-bottom-6 sm:-right-6 p-2 sm:p-5 rounded shadow-xl flex-col items-center justify-center rotate-6 sm:rotate-12 bg-secondary text-white"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)' }}
            >
              <span className="material-symbols-outlined text-xl sm:text-3xl mb-0.5 sm:mb-1">favorite</span>
              <p className="font-handwritten text-[9px] sm:text-xs uppercase tracking-widest">Made with</p>
              <p className="font-handwritten text-[9px] sm:text-xs uppercase tracking-widest">Love</p>
            </div>
          </div>
        </div>
      </main>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg className="relative block w-full h-[80px]" preserveAspectRatio="none" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.43,147.3,126.35,220,114.7,252.3,109.58,287,97.31,321.39,56.44Z" fill="#D4A5A5" fillOpacity="0.1" />
        </svg>
      </div>

      {/* ── Featured Products ── */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-20 bg-soft-pink/30 dark:bg-background-dark">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8 sm:mb-12">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-primary dark:text-cream mb-2 sm:mb-4">Featured Collection</h2>
              <p className="font-body text-sm sm:text-base text-text-secondary dark:text-slate-400 max-w-md">
                Handpicked favorites from our collection, crafted with intention and care.
              </p>
            </div>
            <Link href="/shop" className="flex items-center gap-2 font-bold text-primary dark:text-secondary hover:text-secondary transition-colors text-sm sm:text-base shrink-0">
              View All <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12 sm:py-20">
              <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-b-2 border-primary" />
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
              {featuredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group flex flex-col bg-white dark:bg-slate-800 rounded-md overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 dark:border-slate-700"
                >
                  <Link href={`/product/${product.id}`} className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-900">
                    <img
                      alt={product.name}
                      className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${product.stock <= 0 ? 'grayscale' : ''}`}
                      src={product.images?.[0] || '/products/gift-box.jpeg'}
                    />
                    {product.tags?.[0] && (
                      <span className="absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-secondary text-primary">
                        {product.tags[0]}
                      </span>
                    )}
                    {product.stock <= 0 && (
                      <div className="absolute inset-0 bg-primary/40 flex items-center justify-center">
                        <span className="bg-cream text-primary text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-sm">Sold Out</span>
                      </div>
                    )}
                  </Link>
                  <div className="p-3 sm:p-5 flex flex-col flex-grow">
                    <Link href={`/product/${product.id}`}>
                      <h3 className="font-serif text-base sm:text-lg font-bold text-primary dark:text-cream group-hover:text-secondary transition-colors line-clamp-2 mb-1.5">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="hidden sm:block text-xs sm:text-sm text-text-muted dark:text-slate-400 line-clamp-2 mb-3">
                      {product.description}
                    </p>
                    <div className="flex items-center gap-2 mb-3 mt-auto">
                      <span className="font-bold text-base sm:text-lg text-primary dark:text-cream">৳{product.price}</span>
                      {product.compareAtPrice && product.compareAtPrice > product.price && (
                        <span className="text-xs sm:text-sm text-text-muted line-through">৳{product.compareAtPrice}</span>
                      )}
                    </div>
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock <= 0}
                      className={`w-full py-2 sm:py-2.5 rounded-md font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 min-h-[40px] ${
                        product.stock <= 0
                          ? 'bg-slate-100 text-text-muted cursor-not-allowed dark:bg-slate-700'
                          : 'bg-primary text-cream hover:bg-primary-light'
                      }`}
                    >
                      <span className="material-symbols-outlined text-sm">
                        {product.stock <= 0 ? 'remove_shopping_cart' : 'shopping_bag'}
                      </span>
                      {product.stock <= 0 ? 'Sold Out' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 sm:py-20">
              <p className="text-text-muted">No featured products found.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Shop by Category ── */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-20 bg-cream dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-primary dark:text-cream mb-8 sm:mb-12 text-center">Shop by Category</h2>
          <div className="grid grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4 lg:gap-5">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/shop?category=${category.slug}`}
                className="group relative overflow-hidden rounded-lg bg-[#f0e4d8] dark:bg-slate-800 hover:bg-[#ecddd1] dark:hover:bg-slate-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:shadow-[#c97b5a]/10"
              >
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#c97b5a]/8 to-transparent pointer-events-none" />
                <div className="flex flex-col items-center justify-center px-2 py-4 sm:p-5 sm:py-7 gap-2 sm:gap-3">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-[#c97b5a]/12 group-hover:bg-[#c97b5a]/22 flex items-center justify-center transition-colors duration-300 shrink-0">
                    <span className="w-5 h-5 sm:w-7 sm:h-7 lg:w-8 lg:h-8 block transition-transform duration-300 group-hover:scale-110">

                      {category.id === 'bags' && (
                        <svg viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                          <path d="M7 15h24l-2 18H9L7 15z" fill="rgba(201,123,90,0.18)" stroke="#c97b5a" strokeWidth="1.5" strokeLinejoin="round"/>
                          <rect x="9" y="13" width="20" height="4" rx="2" fill="rgba(201,123,90,0.22)" stroke="#c97b5a" strokeWidth="1.3"/>
                          <path d="M13 13C13 10 14.5 7 19 7" stroke="#c97b5a" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                          <path d="M25 13C25 10 23.5 7 19 7" stroke="#c97b5a" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                          <rect x="16.5" y="18" width="5" height="4" rx="1" stroke="#c97b5a" strokeWidth="1.2" fill="rgba(201,123,90,0.25)"/>
                          <circle cx="19" cy="20" r="0.9" fill="#c97b5a"/>
                          <path d="M11 24h16" stroke="#c97b5a" strokeWidth="0.9" strokeLinecap="round" opacity="0.5"/>
                          <path d="M11 27h12" stroke="#c97b5a" strokeWidth="0.9" strokeLinecap="round" opacity="0.35"/>
                        </svg>
                      )}

                      {category.id === 'apparel' && (
                        <svg viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                          <path d="M14 5l2 5h-2l-3 5H7V14l2-4h5z" fill="rgba(201,123,90,0.22)" stroke="#c97b5a" strokeWidth="1.3" strokeLinejoin="round"/>
                          <path d="M24 5l-2 5h2l3 5h4V14l-2-4h-5z" fill="rgba(201,123,90,0.22)" stroke="#c97b5a" strokeWidth="1.3" strokeLinejoin="round"/>
                          <path d="M7 15h24v16H7z" fill="rgba(201,123,90,0.10)" stroke="#c97b5a" strokeWidth="1.3" strokeLinejoin="round"/>
                          <path d="M15 5Q19 11 23 5" stroke="#c97b5a" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
                          <path d="M9 22h20" stroke="#c97b5a" strokeWidth="0.9" strokeLinecap="round" opacity="0.5"/>
                          <circle cx="19" cy="17" r="0.8" fill="#c97b5a" opacity="0.7"/>
                          <circle cx="19" cy="19.5" r="0.8" fill="#c97b5a" opacity="0.7"/>
                        </svg>
                      )}

                      {category.id === 'accessories' && (
                        <svg viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                          <path d="M16 17h6" stroke="#c97b5a" strokeWidth="1.4" strokeLinecap="round"/>
                          <rect x="5" y="13" width="11" height="9" rx="4.5" fill="rgba(201,123,90,0.18)" stroke="#c97b5a" strokeWidth="1.4"/>
                          <rect x="22" y="13" width="11" height="9" rx="4.5" fill="rgba(201,123,90,0.18)" stroke="#c97b5a" strokeWidth="1.4"/>
                          <path d="M5 17L3 15" stroke="#c97b5a" strokeWidth="1.4" strokeLinecap="round"/>
                          <path d="M33 17L35 15" stroke="#c97b5a" strokeWidth="1.4" strokeLinecap="round"/>
                          <path d="M8 15.5C9 14.8 10.5 14.5 11.5 15" stroke="rgba(201,123,90,0.55)" strokeWidth="0.9" strokeLinecap="round"/>
                          <path d="M25 15.5C26 14.8 27.5 14.5 28.5 15" stroke="rgba(201,123,90,0.55)" strokeWidth="0.9" strokeLinecap="round"/>
                          <path d="M11 27C11 27 13 24 19 24C25 24 27 27 27 27" stroke="#c97b5a" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.7"/>
                          <circle cx="19" cy="29" r="2" fill="rgba(201,123,90,0.3)" stroke="#c97b5a" strokeWidth="1.1"/>
                          <circle cx="19" cy="29" r="0.7" fill="#c97b5a"/>
                        </svg>
                      )}

                      {category.id === 'decor' && (
                        <svg viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                          <path d="M5 18L19 7l14 11" stroke="#c97b5a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                          <rect x="8" y="18" width="22" height="14" rx="1.5" fill="rgba(201,123,90,0.15)" stroke="#c97b5a" strokeWidth="1.4"/>
                          <path d="M16 32V25a3 3 0 0 1 6 0v7" fill="rgba(201,123,90,0.25)" stroke="#c97b5a" strokeWidth="1.2"/>
                          <rect x="10" y="21" width="5" height="4.5" rx="1" fill="rgba(201,123,90,0.2)" stroke="#c97b5a" strokeWidth="1.1"/>
                          <line x1="12.5" y1="21" x2="12.5" y2="25.5" stroke="#c97b5a" strokeWidth="0.7" opacity="0.5"/>
                          <rect x="23" y="21" width="5" height="4.5" rx="1" fill="rgba(201,123,90,0.2)" stroke="#c97b5a" strokeWidth="1.1"/>
                          <line x1="25.5" y1="21" x2="25.5" y2="25.5" stroke="#c97b5a" strokeWidth="0.7" opacity="0.5"/>
                          <rect x="21" y="9" width="4" height="6" rx="1" fill="rgba(201,123,90,0.2)" stroke="#c97b5a" strokeWidth="1.1"/>
                          <path d="M22 9C22 7.5 23.5 7 23 5.5" stroke="#c97b5a" strokeWidth="0.9" strokeLinecap="round" fill="none" opacity="0.45"/>
                          <path d="M24 9C24 7 25 6.5 24.5 5" stroke="#c97b5a" strokeWidth="0.9" strokeLinecap="round" fill="none" opacity="0.3"/>
                        </svg>
                      )}

                      {category.id === 'gifts' && (
                        <svg viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                          <rect x="6" y="19" width="26" height="14" rx="2" fill="rgba(201,123,90,0.18)" stroke="#c97b5a" strokeWidth="1.4"/>
                          <rect x="4" y="14" width="30" height="7" rx="2" fill="rgba(201,123,90,0.25)" stroke="#c97b5a" strokeWidth="1.4"/>
                          <line x1="19" y1="14" x2="19" y2="21" stroke="#c97b5a" strokeWidth="1.3"/>
                          <line x1="19" y1="21" x2="19" y2="33" stroke="#c97b5a" strokeWidth="1.1" opacity="0.55"/>
                          <path d="M19 14C16 12 12 9 14 7C16 5 18 8 19 11" fill="rgba(201,123,90,0.25)" stroke="#c97b5a" strokeWidth="1.3" strokeLinejoin="round"/>
                          <path d="M19 14C22 12 26 9 24 7C22 5 20 8 19 11" fill="rgba(201,123,90,0.25)" stroke="#c97b5a" strokeWidth="1.3" strokeLinejoin="round"/>
                          <circle cx="19" cy="13" r="2" fill="rgba(201,123,90,0.4)" stroke="#c97b5a" strokeWidth="1.1"/>
                          <path d="M17 14L15 17" stroke="#c97b5a" strokeWidth="1.1" strokeLinecap="round"/>
                          <path d="M21 14L23 17" stroke="#c97b5a" strokeWidth="1.1" strokeLinecap="round"/>
                          <path d="M29 11l0.5 1.5 1.5 0.5-1.5 0.5L29 15l-0.5-1.5L27 13l1.5-0.5z" fill="#c97b5a" opacity="0.5"/>
                          <path d="M9 8l0.4 1.1 1.1 0.4-1.1 0.4L9 11l-0.4-1.1L7.5 9.5l1.1-0.4z" fill="#c97b5a" opacity="0.4"/>
                        </svg>
                      )}

                    </span>
                  </div>
                  <h3 className="font-serif text-[11px] sm:text-sm lg:text-base font-bold text-primary dark:text-cream text-center leading-tight">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── New Arrivals ── */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-20 bg-white dark:bg-background-dark">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8 sm:mb-12">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-primary dark:text-cream mb-2 sm:mb-4">New Arrivals</h2>
              <p className="font-body text-sm sm:text-base text-text-secondary dark:text-slate-400 max-w-md">
                Fresh additions to our collection, just in time for the season.
              </p>
            </div>
            <Link href="/shop?sort=newest" className="flex items-center gap-2 font-bold text-primary dark:text-secondary hover:text-secondary transition-colors text-sm sm:text-base shrink-0">
              Shop All New <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
            </div>
          ) : newArrivals.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
              {newArrivals.map((product) => (
                <div
                  key={product.id}
                  className="group flex flex-col bg-soft-pink/20 dark:bg-slate-800 rounded-md overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100/60 dark:border-slate-700"
                >
                  <Link href={`/product/${product.id}`} className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-900">
                    <img
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      src={product.images?.[0] || '/products/gift-box.jpeg'}
                    />
                  </Link>
                  <div className="p-3 sm:p-4 flex flex-col flex-grow">
                    <h3 className="font-serif text-sm sm:text-base font-bold text-primary dark:text-cream line-clamp-2 mb-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-auto">
                      <span className="font-bold text-sm sm:text-base text-primary dark:text-cream">৳{product.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {/* ── About ── */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-20 bg-secondary/10 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-primary dark:text-cream mb-4 sm:mb-6">
                Made with Love,<br />Delivered with Care
              </h2>
              <p className="font-body text-sm sm:text-base lg:text-lg text-text-secondary dark:text-slate-400 mb-6 leading-relaxed">
                Every piece in our collection is handcrafted by skilled artisans in Bangladesh. We use premium materials and traditional techniques to create unique crochet items that bring warmth and joy to your everyday life.
              </p>
              <div className="grid grid-cols-2 gap-3 sm:gap-5">
                {[
                  { icon: 'auto_awesome', color: 'text-secondary', title: 'Handcrafted', sub: 'Every piece unique' },
                  { icon: 'eco', color: 'text-accent', title: 'Sustainable', sub: 'Eco-friendly materials' },
                  { icon: 'local_shipping', color: 'text-primary', title: 'Fast Delivery', sub: 'All over Bangladesh' },
                  { icon: 'favorite', color: 'text-dusty-rose', title: 'Made with Love', sub: 'Crafted with care' },
                ].map(({ icon, color, title, sub }) => (
                  <div key={title} className="bg-white dark:bg-slate-700 rounded-lg p-3 sm:p-5">
                    <span className={`material-symbols-outlined text-2xl sm:text-3xl ${color} mb-2 block`}>{icon}</span>
                    <h4 className="font-bold text-primary dark:text-cream text-sm sm:text-base">{title}</h4>
                    <p className="text-xs sm:text-sm text-text-muted dark:text-slate-400">{sub}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="w-full max-w-sm mx-auto lg:max-w-none aspect-square rounded-lg overflow-hidden shadow-lg">
                <img
                  alt="Artisan at work"
                  className="w-full h-full object-cover"
                  src="/products/apparel-cardigan.jpeg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}