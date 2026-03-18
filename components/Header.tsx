'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { useCart } from '@/components/CartProvider';

const navLinks = [
  { href: '/',       label: 'Home',        icon: 'home' },
  { href: '/shop',   label: 'Shop',        icon: 'shopping_bag' },
  { href: '/track',  label: 'Track Order', icon: 'local_shipping' },
  { href: '/about',  label: 'About',       icon: 'info' },
];

const categoryLinks = [
  { href: '/shop?category=bags',        label: 'Bags & Purses',  id: 'bags' },
  { href: '/shop?category=apparel',     label: 'Apparel',        id: 'apparel' },
  { href: '/shop?category=accessories', label: 'Accessories',    id: 'accessories' },
  { href: '/shop?category=decor',       label: 'Home Decor',     id: 'decor' },
  { href: '/shop?category=gifts',       label: 'Gifts',          id: 'gifts' },
];

function DrawerCategoryIcon({ id }: { id: string }) {
  const s = '#c97b5a';
  const f1 = 'rgba(201,123,90,0.18)';
  const f2 = 'rgba(201,123,90,0.22)';
  const f3 = 'rgba(201,123,90,0.25)';
  const cls = 'w-5 h-5 shrink-0';

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

export function Header() {
  const { user } = useAuth();
  const { items } = useCart();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  // Tighten header on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b border-secondary/20 px-4 sm:px-6 lg:px-20 transition-all duration-200
          bg-cream/95 dark:bg-background-dark/95 backdrop-blur-md
          ${scrolled ? 'py-2 shadow-sm shadow-primary/5' : 'py-3 sm:py-4'}`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2 sm:gap-2.5 shrink-0 group">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-full overflow-hidden ring-2 ring-secondary/20 group-hover:ring-secondary/50 transition-all">
              <Image src="/logo.webp" alt="The Witches BD" fill className="object-contain" priority />
            </div>
            <span className="text-lg sm:text-xl font-black tracking-wide font-serif text-primary dark:text-cream group-hover:text-secondary transition-colors">
              The Witches BD
            </span>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-1 font-body font-semibold text-sm lg:text-base">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`relative px-3 lg:px-4 py-1.5 rounded-full transition-colors
                  ${isActive(href)
                    ? 'text-primary dark:text-cream bg-secondary/15'
                    : 'text-primary/70 dark:text-cream/70 hover:text-primary dark:hover:text-cream hover:bg-secondary/10'
                  }`}
              >
                {label}
                {isActive(href) && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-secondary" />
                )}
              </Link>
            ))}
          </nav>

          {/* ── Right Actions ── */}
          <div className="flex items-center gap-1 sm:gap-1.5">

            {/* Search — expands inline on desktop */}
            <div className="hidden lg:flex items-center">
              {searchOpen ? (
                <div className="flex items-center gap-2 bg-secondary/10 rounded-full px-3 py-1.5 border border-secondary/20">
                  <span className="material-symbols-outlined text-base text-primary/60">search</span>
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search products…"
                    className="bg-transparent text-sm text-primary dark:text-cream placeholder:text-primary/40 focus:outline-none w-40"
                    onBlur={() => setSearchOpen(false)}
                  />
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 hover:bg-secondary/10 rounded-full transition-colors text-primary/70 dark:text-cream/70 hover:text-primary dark:hover:text-cream"
                  aria-label="Search"
                >
                  <span className="material-symbols-outlined text-[20px]">search</span>
                </button>
              )}
            </div>

            {/* Wishlist */}
            <button className="hidden sm:flex p-2 hover:bg-secondary/10 rounded-full transition-colors text-primary/70 dark:text-cream/70 hover:text-primary dark:hover:text-cream" aria-label="Wishlist">
              <span className="material-symbols-outlined text-[20px]">favorite</span>
            </button>

            {/* Cart */}
            <Link
              href="/cart"
              className="flex items-center gap-1.5 bg-primary hover:bg-primary-light text-cream px-3 sm:px-4 py-2 rounded-full font-bold text-xs sm:text-sm transition-colors min-h-[38px] relative"
            >
              <span className="material-symbols-outlined text-base">shopping_bag</span>
              <span>{cartItemCount}</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-secondary text-primary text-[10px] font-black flex items-center justify-center leading-none">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Account */}
            <Link
              href={user ? '/account' : '/login'}
              className="hidden sm:flex w-9 h-9 rounded-full bg-secondary/15 border border-secondary/25 overflow-hidden items-center justify-center text-primary hover:bg-secondary hover:text-cream hover:border-secondary transition-all"
              aria-label="Account"
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 hover:bg-secondary/10 rounded-full transition-colors text-primary dark:text-cream min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Open menu"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile overlay ── */}
      <div
        className={`fixed inset-0 z-40 bg-primary/30 backdrop-blur-sm md:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* ── Mobile Drawer ── */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-[300px] bg-cream dark:bg-background-dark shadow-2xl flex flex-col md:hidden transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-secondary/15">
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-secondary/20">
              <Image src="/logo.webp" alt="The Witches BD" fill className="object-contain" />
            </div>
            <span className="font-serif text-base font-bold text-primary dark:text-cream">The Witches BD</span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 hover:bg-secondary/10 rounded-full transition-colors text-primary dark:text-cream"
            aria-label="Close menu"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Search bar in drawer */}
        <div className="px-5 py-3 border-b border-secondary/10">
          <div className="flex items-center gap-2 bg-secondary/10 rounded-lg px-3 py-2.5 border border-secondary/15">
            <span className="material-symbols-outlined text-base text-primary/50">search</span>
            <input
              type="text"
              placeholder="Search products…"
              className="bg-transparent text-sm text-primary dark:text-cream placeholder:text-primary/40 focus:outline-none flex-1"
            />
          </div>
        </div>

        {/* Scrollable nav area */}
        <nav className="flex-1 overflow-y-auto px-3 py-3">

          {/* Main links */}
          <div className="flex flex-col gap-0.5">
            {navLinks.map(({ href, label, icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors min-h-[48px] text-sm
                  ${isActive(href)
                    ? 'bg-primary text-cream'
                    : 'text-primary dark:text-cream hover:bg-secondary/10'
                  }`}
              >
                <span className="material-symbols-outlined text-[18px]">{icon}</span>
                {label}
                {isActive(href) && (
                  <span className="material-symbols-outlined text-[16px] ml-auto opacity-70">chevron_right</span>
                )}
              </Link>
            ))}
          </div>

          {/* Divider + Categories */}
          <div className="mt-4 pt-4 border-t border-secondary/15">
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary/40 dark:text-cream/40 mb-2 px-4">Categories</p>
            <div className="flex flex-col gap-0.5">
              {categoryLinks.map(({ href, label, id }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-primary dark:text-cream hover:bg-secondary/10 transition-colors text-sm min-h-[44px]"
                >
                  <DrawerCategoryIcon id={id} />
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Drawer footer */}
        <div className="px-4 py-4 border-t border-secondary/15 space-y-2">
          {user ? (
            <Link
              href="/account"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-secondary/10 text-primary dark:text-cream font-medium text-sm min-h-[48px]"
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
              My Account
            </Link>
          ) : (
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary text-cream font-bold text-sm min-h-[48px]"
            >
              <span className="material-symbols-outlined text-[18px]">login</span>
              Sign In
            </Link>
          )}
          <Link
            href="/cart"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between px-4 py-3 rounded-lg border border-secondary/20 text-primary dark:text-cream text-sm min-h-[48px]"
          >
            <div className="flex items-center gap-3 font-medium">
              <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
              My Cart
            </div>
            {cartItemCount > 0 && (
              <span className="bg-primary text-cream text-xs font-bold px-2 py-0.5 rounded-full">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </>
  );
}