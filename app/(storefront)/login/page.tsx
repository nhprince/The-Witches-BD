'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const { signInWithGoogle, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // If already logged in, redirect to account
  if (user) {
    router.push('/account');
    return null;
  }

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    try {
      await signInWithGoogle();
      router.push('/account');
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || "Failed to log in with Google");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-8 sm:py-12 bg-cream dark:bg-background-dark">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-2xl sm:rounded-3xl shadow-sm border border-secondary/10 p-6 sm:p-8">
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center size-14 sm:size-16 bg-secondary/20 text-primary dark:text-secondary rounded-full mb-3 sm:mb-4">
            <span className="material-symbols-outlined text-2xl sm:text-3xl">auto_awesome</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl text-primary dark:text-cream mb-1 sm:mb-2">Welcome Back</h1>
          <p className="font-body text-sm sm:text-base text-text-muted">Log in to manage your orders and account.</p>
        </div>

        {error && (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-primary/10 text-primary dark:text-secondary border border-secondary/20 rounded-xl sm:rounded-2xl font-body text-xs sm:text-sm text-center">
            {error}
          </div>
        )}

        <div className="space-y-3 sm:space-y-4">
          <button 
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 sm:gap-3 bg-white dark:bg-slate-900 border border-secondary/30 hover:bg-secondary/5 dark:hover:bg-slate-800 text-primary dark:text-cream font-bold py-3 sm:py-3.5 px-4 rounded-xl sm:rounded-2xl transition-colors disabled:opacity-50 text-sm sm:text-base min-h-[48px]"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            {loading ? 'Signing in...' : 'Continue with Google'}
          </button>
        </div>

        <div className="mt-6 sm:mt-8 text-center text-xs sm:text-sm font-body text-text-muted">
          By continuing, you agree to our <Link href="/terms" className="underline hover:text-primary dark:hover:text-secondary">Terms of Service</Link> and <Link href="/privacy" className="underline hover:text-primary dark:hover:text-secondary">Privacy Policy</Link>.
        </div>
      </div>
    </div>
  );
}
