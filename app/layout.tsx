import type { Metadata } from 'next';
import { Work_Sans, Playfair_Display, Nunito, Caveat } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/components/AuthProvider';
import { CartProvider } from '@/components/CartProvider';

const workSans = Work_Sans({ subsets: ['latin'], variable: '--font-work-sans' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair-display' });
const nunito = Nunito({ subsets: ['latin'], variable: '--font-nunito' });
const caveat = Caveat({ subsets: ['latin'], variable: '--font-caveat' });

export const metadata: Metadata = {
  title: 'The Witches BD',
  description: 'Handcrafted crochet pieces made with love & intention in Bangladesh',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${workSans.variable} ${playfair.variable} ${nunito.variable} ${caveat.variable}`}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </head>
      <body className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased selection:bg-primary/30" suppressHydrationWarning>
        <AuthProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
