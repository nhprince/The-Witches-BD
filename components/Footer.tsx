import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="bg-primary dark:bg-slate-950 overflow-x-hidden">

      {/* ── Main grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-8 sm:py-12 lg:py-14">

        {/* Mobile: brand row + links row stacked tightly */}
        {/* Desktop: 4-col grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-12">

          {/* Brand */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-4 sm:gap-8 lg:gap-4">
            <div className="shrink-0">
              <Link href="/" className="flex items-center gap-2 mb-3 w-fit">
                <div className="relative w-8 h-8 shrink-0 rounded-full overflow-hidden">
                  <Image src="/logo.webp" alt="The Witches BD" fill className="object-contain" />
                </div>
                <span className="font-serif text-base font-black tracking-wide text-cream">
                  The Witches BD
                </span>
              </Link>
              <p className="text-xs text-cream/50 leading-relaxed max-w-[200px] hidden sm:block lg:block">
                Handcrafted crochet from Bangladesh, made with love.
              </p>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-2">
              {[
                { label: 'Facebook',  icon: 'public' },
                { label: 'Instagram', icon: 'photo_camera' },
                { label: 'WhatsApp',  icon: 'chat' },
                { label: 'Email',     icon: 'mail' },
              ].map(({ label, icon }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-8 h-8 rounded-md bg-white/10 hover:bg-secondary flex items-center justify-center text-cream/60 hover:text-primary transition-all"
                >
                  <span className="material-symbols-outlined text-sm">{icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links — on mobile: 3 columns side by side */}
          <div className="lg:col-span-3 grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8">

            {/* Shop */}
            <div>
              <h4 className="font-bold mb-2 sm:mb-3 uppercase text-[10px] tracking-widest text-secondary">Shop</h4>
              <ul className="space-y-1.5 sm:space-y-2">
                {[
                  { label: 'All',         href: '/shop' },
                  { label: 'Bags',        href: '/shop?category=bags' },
                  { label: 'Apparel',     href: '/shop?category=apparel' },
                  { label: 'Accessories', href: '/shop?category=accessories' },
                  { label: 'Home Decor',  href: '/shop?category=decor' },
                  { label: 'Gifts',       href: '/shop?category=gifts' },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className="text-xs sm:text-sm text-cream/55 hover:text-cream transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Help */}
            <div>
              <h4 className="font-bold mb-2 sm:mb-3 uppercase text-[10px] tracking-widest text-secondary">Help</h4>
              <ul className="space-y-1.5 sm:space-y-2">
                {[
                  { label: 'About',    href: '/about' },
                  { label: 'Track',    href: '/track' },
                  { label: 'Contact',  href: '/contact' },
                  { label: 'Shipping', href: '/shipping' },
                  { label: 'Returns',  href: '/returns' },
                  { label: 'FAQ',      href: '/faq' },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className="text-xs sm:text-sm text-cream/55 hover:text-cream transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="min-w-0">
              <h4 className="font-bold mb-2 sm:mb-3 uppercase text-[10px] tracking-widest text-secondary">Contact</h4>
              <ul className="space-y-1.5 sm:space-y-2">
                <li>
                  <a href="tel:+8801234567890" className="text-xs sm:text-sm text-cream/55 hover:text-cream transition-colors flex items-center gap-1.5 min-w-0">
                    <span className="material-symbols-outlined text-xs text-secondary shrink-0">phone</span>
                    <span className="truncate">+880 1234-567890</span>
                  </a>
                </li>
                <li>
                  <a href="mailto:hello@witchesbd.com" className="text-xs sm:text-sm text-cream/55 hover:text-cream transition-colors flex items-center gap-1.5 min-w-0">
                    <span className="material-symbols-outlined text-xs text-secondary shrink-0">mail</span>
                    <span className="truncate">hello@witchesbd.com</span>
                  </a>
                </li>
                <li className="text-xs sm:text-sm text-cream/55 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-xs text-secondary shrink-0">location_on</span>
                  Dhaka, BD
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-3 flex flex-col sm:flex-row items-center justify-between gap-1.5">
          <p className="text-[11px] text-cream/35">
            © {new Date().getFullYear()} The Witches BD. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <Link href="/terms"   className="text-[11px] text-cream/35 hover:text-cream/60 transition-colors">Terms</Link>
            <Link href="/privacy" className="text-[11px] text-cream/35 hover:text-cream/60 transition-colors">Privacy</Link>
            <span className="flex items-center gap-1 text-[11px] text-cream/35">
              Made with
              <svg viewBox="0 0 24 24" fill="#D4A5A5" className="w-2.5 h-2.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              in BD
            </span>
          </div>
        </div>
      </div>

    </footer>
  );
}