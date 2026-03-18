import Link from 'next/link';
import Image from 'next/image';

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 hidden md:flex flex-col sticky top-0 h-screen">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="relative size-10 shrink-0 rounded-full overflow-hidden">
              <Image src="/logo.webp" alt="The Witches BD" fill className="object-contain" />
            </div>
            <h2 className="text-xl font-black tracking-wide font-serif text-primary dark:text-cream">The Witches BD</h2>
          </Link>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-2 font-body font-semibold text-sm">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary">
            <span className="material-symbols-outlined text-lg">dashboard</span>
            Dashboard
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
            <span className="material-symbols-outlined text-lg">shopping_cart</span>
            Orders
            <span className="ml-auto bg-primary text-white text-[10px] px-2 py-0.5 rounded-full">12</span>
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
            <span className="material-symbols-outlined text-lg">inventory_2</span>
            Products
          </Link>
          <Link href="/admin/customers" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
            <span className="material-symbols-outlined text-lg">group</span>
            Customers
          </Link>
          <Link href="/admin/analytics" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
            <span className="material-symbols-outlined text-lg">analytics</span>
            Analytics
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors mt-auto">
            <span className="material-symbols-outlined text-lg">settings</span>
            Settings
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="size-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">
              A
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold truncate">Admin User</p>
              <p className="text-xs text-slate-500 truncate">admin@thewitchesbd.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-slate-500 hover:text-primary">
              <span className="material-symbols-outlined">menu</span>
            </button>
            <div className="relative hidden sm:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
              <input type="text" placeholder="Search orders, products..." className="pl-9 pr-4 py-1.5 rounded-full border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all font-body text-sm w-64" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-slate-500 hover:text-primary relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-0 right-0 size-2 bg-red-500 rounded-full"></span>
            </button>
            <Link href="/" className="text-sm font-bold text-primary hover:underline font-body hidden sm:block">View Store</Link>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-6 lg:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
