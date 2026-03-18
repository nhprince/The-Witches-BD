'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useCart } from '@/components/CartProvider';
import { mockProducts, categories } from '@/lib/mock-data';

// Inline category icons — no shared component needed
function CategoryIcon({ id, className }: { id: string; className?: string }) {
  const s = '#c97b5a';
  const f1 = 'rgba(201,123,90,0.18)';
  const f2 = 'rgba(201,123,90,0.22)';
  const f3 = 'rgba(201,123,90,0.25)';
  const cls = className || 'w-4 h-4';

  if (id === 'bags') return (
    <svg viewBox="0 0 38 38" fill="none" className={cls}>
      <path d="M7 15h24l-2 18H9L7 15z" fill={f1} stroke={s} strokeWidth="1.5" strokeLinejoin="round"/>
      <rect x="9" y="13" width="20" height="4" rx="2" fill={f2} stroke={s} strokeWidth="1.3"/>
      <path d="M13 13C13 10 14.5 7 19 7" stroke={s} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M25 13C25 10 23.5 7 19 7" stroke={s} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <rect x="16.5" y="18" width="5" height="4" rx="1" stroke={s} strokeWidth="1.2" fill={f3}/>
      <circle cx="19" cy="20" r="0.9" fill={s}/>
      <path d="M11 24h16" stroke={s} strokeWidth="0.9" strokeLinecap="round" opacity="0.5"/>
    </svg>
  );
  if (id === 'apparel') return (
    <svg viewBox="0 0 38 38" fill="none" className={cls}>
      <path d="M14 5l2 5h-2l-3 5H7V14l2-4h5z" fill={f2} stroke={s} strokeWidth="1.3" strokeLinejoin="round"/>
      <path d="M24 5l-2 5h2l3 5h4V14l-2-4h-5z" fill={f2} stroke={s} strokeWidth="1.3" strokeLinejoin="round"/>
      <path d="M7 15h24v16H7z" fill="rgba(201,123,90,0.10)" stroke={s} strokeWidth="1.3" strokeLinejoin="round"/>
      <path d="M15 5Q19 11 23 5" stroke={s} strokeWidth="1.3" strokeLinecap="round" fill="none"/>
      <path d="M9 22h20" stroke={s} strokeWidth="0.9" strokeLinecap="round" opacity="0.5"/>
      <circle cx="19" cy="17" r="0.8" fill={s} opacity="0.7"/>
    </svg>
  );
  if (id === 'accessories') return (
    <svg viewBox="0 0 38 38" fill="none" className={cls}>
      <path d="M16 17h6" stroke={s} strokeWidth="1.4" strokeLinecap="round"/>
      <rect x="5" y="13" width="11" height="9" rx="4.5" fill={f1} stroke={s} strokeWidth="1.4"/>
      <rect x="22" y="13" width="11" height="9" rx="4.5" fill={f1} stroke={s} strokeWidth="1.4"/>
      <path d="M5 17L3 15" stroke={s} strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M33 17L35 15" stroke={s} strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M11 27C11 27 13 24 19 24C25 24 27 27 27 27" stroke={s} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.7"/>
      <circle cx="19" cy="29" r="2" fill="rgba(201,123,90,0.3)" stroke={s} strokeWidth="1.1"/>
    </svg>
  );
  if (id === 'decor') return (
    <svg viewBox="0 0 38 38" fill="none" className={cls}>
      <path d="M5 18L19 7l14 11" stroke={s} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <rect x="8" y="18" width="22" height="14" rx="1.5" fill="rgba(201,123,90,0.15)" stroke={s} strokeWidth="1.4"/>
      <path d="M16 32V25a3 3 0 0 1 6 0v7" fill={f3} stroke={s} strokeWidth="1.2"/>
      <rect x="10" y="21" width="5" height="4.5" rx="1" fill="rgba(201,123,90,0.2)" stroke={s} strokeWidth="1.1"/>
      <rect x="23" y="21" width="5" height="4.5" rx="1" fill="rgba(201,123,90,0.2)" stroke={s} strokeWidth="1.1"/>
    </svg>
  );
  if (id === 'gifts') return (
    <svg viewBox="0 0 38 38" fill="none" className={cls}>
      <rect x="6" y="19" width="26" height="14" rx="2" fill={f1} stroke={s} strokeWidth="1.4"/>
      <rect x="4" y="14" width="30" height="7" rx="2" fill={f2} stroke={s} strokeWidth="1.4"/>
      <line x1="19" y1="14" x2="19" y2="21" stroke={s} strokeWidth="1.3"/>
      <line x1="19" y1="21" x2="19" y2="33" stroke={s} strokeWidth="1.1" opacity="0.55"/>
      <path d="M19 14C16 12 12 9 14 7C16 5 18 8 19 11" fill={f3} stroke={s} strokeWidth="1.3" strokeLinejoin="round"/>
      <path d="M19 14C22 12 26 9 24 7C22 5 20 8 19 11" fill={f3} stroke={s} strokeWidth="1.3" strokeLinejoin="round"/>
      <circle cx="19" cy="13" r="2" fill="rgba(201,123,90,0.4)" stroke={s} strokeWidth="1.1"/>
    </svg>
  );
  return null;
}

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


export default function Shop() {
  return (
    <Suspense fallback={<ShopLoading />}>
      <ShopContent />
    </Suspense>
  );
}

function ShopLoading() {
  return (
    <div className="min-h-screen bg-cream dark:bg-background-dark flex justify-center items-center">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
    </div>
  );
}

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(() => searchParams.get('category') || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const { addToCart } = useCart();

  // Sync activeCategory when URL param changes (e.g. navigating from home/header)
  useEffect(() => {
    const cat = searchParams.get('category') || 'all';
    setActiveCategory(cat);
  }, [searchParams]);

  // Update URL when user clicks a category pill
  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    const params = new URLSearchParams(searchParams.toString());
    if (catId === 'all') {
      params.delete('category');
    } else {
      params.set('category', catId);
    }
    router.replace(`/shop?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setProducts(mockProducts.filter(p => p.status === 'active'));
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let filtered = [...products];
    if (activeCategory !== 'all') {
      filtered = filtered.filter(p =>
        p.category.toLowerCase().includes(activeCategory.toLowerCase())
      );
    }
    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    }
    setFilteredProducts(filtered);
  }, [products, activeCategory, searchQuery, sortBy]);

  const handleAddToCart = (product: Product) => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images?.[0] || '/products/gift-box.jpeg',
    });
  };

  return (
    <div className="min-h-screen bg-cream dark:bg-background-dark">

      {/* ── Page Header — compact, no wasted space ── */}
      <div className="bg-secondary/10 dark:bg-slate-800/50 py-5 sm:py-8 px-4 sm:px-6 lg:px-20 border-b border-secondary/15">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-1">The Witches BD</p>
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-primary dark:text-cream">Shop Collection</h1>
          </div>
          <p className="font-body text-sm text-text-secondary dark:text-slate-400">
            Handcrafted crochet pieces made with love
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-4 sm:py-6">

        {/* ── Sticky Filters Bar ── */}
        <div className="sticky top-[56px] sm:top-[62px] z-30 bg-cream/97 dark:bg-background-dark/97 backdrop-blur-md py-3 mb-5 sm:mb-6 -mx-4 sm:-mx-6 lg:-mx-20 px-4 sm:px-6 lg:px-20 border-b border-secondary/15">

          {/* Row 1: Category pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-4 py-1.5 rounded-md font-bold text-xs whitespace-nowrap transition-all min-h-[34px] shrink-0 ${
                activeCategory === 'all'
                  ? 'bg-primary text-cream shadow-sm'
                  : 'bg-secondary/10 text-primary dark:text-cream hover:bg-secondary/20'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-md font-bold text-xs whitespace-nowrap transition-all min-h-[34px] shrink-0 ${
                  activeCategory === cat.id
                    ? 'bg-primary text-cream shadow-sm'
                    : 'bg-secondary/10 text-primary dark:text-cream hover:bg-secondary/20'
                }`}
              >
                <span className="shrink-0"><CategoryIcon id={cat.id} className="w-4 h-4" /></span>
                {cat.name.split(' ')[0]}
              </button>
            ))}
          </div>

          {/* Row 2: Search + Sort */}
          <div className="flex items-center gap-2 mt-2">
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-base pointer-events-none">search</span>
              <input
                className="w-full pl-9 pr-3 py-2 rounded-md border border-secondary/20 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary/40 text-sm min-h-[36px] transition-colors"
                placeholder="Search products…"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="relative shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white dark:bg-slate-800 pl-3 pr-8 py-2 rounded-md border border-secondary/20 font-semibold text-xs cursor-pointer focus:ring-2 focus:ring-primary/20 min-h-[36px] text-primary dark:text-cream"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price ↑</option>
                <option value="price-high">Price ↓</option>
              </select>
              <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-text-muted text-base pointer-events-none">expand_more</span>
            </div>
          </div>
        </div>

        {/* ── Results count ── */}
        {!loading && (
          <p className="text-xs text-text-muted dark:text-slate-400 mb-4">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            {activeCategory !== 'all' && (
              <button
                onClick={() => handleCategoryChange('all')}
                className="ml-2 text-primary underline underline-offset-2 hover:text-secondary transition-colors"
              >
                Clear filter
              </button>
            )}
          </p>
        )}

        {/* ── Products Grid ── */}
        {loading ? (
          <div className="flex justify-center py-16 sm:py-24">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16 sm:py-24">
            <span className="material-symbols-outlined text-5xl text-text-muted mb-3 block">search_off</span>
            <p className="text-text-muted text-sm">No products found.</p>
            <button
              onClick={() => { setSearchQuery(''); handleCategoryChange('all'); }}
              className="mt-4 px-4 py-2 text-sm font-bold text-primary border border-primary/30 rounded-md hover:bg-primary hover:text-cream transition-colors"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {filteredProducts.map((product) => {
              const isSoldOut = product.stock <= 0;
              const imageUrl = product.images?.[0] || '/products/gift-box.jpeg';
              const tag = product.tags?.[0];

              return (
                <div
                  key={product.id}
                  className={`group flex flex-col bg-white dark:bg-slate-800 rounded-md overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 dark:border-slate-700 ${isSoldOut ? 'opacity-70' : ''}`}
                >
                  {/* Image */}
                  <Link href={`/product/${product.id}`} className="relative aspect-square overflow-hidden block bg-slate-50 dark:bg-slate-900">
                    <img
                      className={`w-full h-full object-cover transition-transform duration-500 ${isSoldOut ? 'grayscale' : 'group-hover:scale-105'}`}
                      src={imageUrl}
                      alt={product.name}
                    />
                    {isSoldOut ? (
                      <div className="absolute inset-0 bg-primary/40 flex items-center justify-center">
                        <span className="bg-cream text-primary text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-sm">Sold Out</span>
                      </div>
                    ) : (
                      <>
                        {tag && (
                          <span className="absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-secondary text-primary">
                            {tag}
                          </span>
                        )}
                        <button
                          className="absolute top-2 right-2 w-7 h-7 bg-white/85 backdrop-blur rounded-full flex items-center justify-center text-primary/60 hover:text-primary hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                          aria-label="Add to wishlist"
                        >
                          <span className="material-symbols-outlined text-sm">favorite</span>
                        </button>
                      </>
                    )}
                  </Link>

                  {/* Info */}
                  <div className="p-3 sm:p-4 flex flex-col flex-1">
                    <Link href={`/product/${product.id}`}>
                      <h3 className="font-serif text-sm sm:text-base font-bold text-primary dark:text-cream line-clamp-2 mb-1 group-hover:text-secondary transition-colors">
                        {product.name}
                      </h3>
                    </Link>

                    <p className="hidden sm:block font-body text-xs text-text-muted dark:text-slate-400 line-clamp-2 mb-3">
                      {product.description}
                    </p>

                    <div className="mt-auto flex items-center justify-between gap-2">
                      {/* Price */}
                      <div>
                        <span className={`font-bold text-sm sm:text-base ${isSoldOut ? 'text-text-muted' : 'text-primary dark:text-cream'}`}>
                          ৳{product.price}
                        </span>
                        {product.compareAtPrice && product.compareAtPrice > product.price && (
                          <span className="block text-[11px] text-text-muted line-through leading-none mt-0.5">
                            ৳{product.compareAtPrice}
                          </span>
                        )}
                      </div>

                      {/* Add to cart */}
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={isSoldOut}
                        className={`flex items-center gap-1 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-md font-bold text-xs transition-all min-h-[34px] shrink-0 ${
                          isSoldOut
                            ? 'bg-slate-100 text-text-muted cursor-not-allowed dark:bg-slate-700'
                            : 'bg-primary text-cream hover:bg-primary-light active:scale-95'
                        }`}
                      >
                        <span className="material-symbols-outlined text-sm">
                          {isSoldOut ? 'remove_shopping_cart' : 'add_shopping_cart'}
                        </span>
                        {/* Label: visible on sm+, icon only on mobile */}
                        <span className="hidden sm:inline">
                          {isSoldOut ? 'Sold Out' : 'Add'}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}