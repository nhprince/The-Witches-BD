import Link from 'next/link';
import Image from 'next/image';

export default function AdminLogin() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="size-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 overflow-hidden">
            <div className="relative size-12">
              <Image src="/logo.webp" alt="The Witches BD" fill className="object-contain" />
            </div>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl mb-2">Witches' Coven</h1>
          <p className="font-body text-slate-500">Enter your magical credentials to access the dashboard.</p>
        </div>

        <div className="pearl-card rounded-3xl p-8 shadow-sm">
          <form className="flex flex-col gap-6 font-body">
            <div>
              <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">Email Address</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">mail</span>
                <input 
                  type="email" 
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-transparent focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all" 
                  placeholder="supreme@thewitchesbd.com" 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">Password</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">lock</span>
                <input 
                  type="password" 
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-transparent focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all" 
                  placeholder="••••••••" 
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-primary focus:ring-primary rounded border-slate-300" />
                <span className="text-slate-600 dark:text-slate-400">Remember me</span>
              </label>
              <a href="#" className="text-primary font-bold hover:underline">Forgot spell?</a>
            </div>

            <Link href="/admin" className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 mt-2">
              Enter Coven
              <span className="material-symbols-outlined text-sm">login</span>
            </Link>
          </form>
        </div>

        <p className="text-center text-sm text-slate-500 mt-8 font-body">
          <Link href="/" className="hover:text-primary transition-colors flex items-center justify-center gap-1">
            <span className="material-symbols-outlined text-xs">arrow_back</span>
            Back to Storefront
          </Link>
        </p>
      </div>
    </div>
  );
}
