import type { AppProps } from 'next/app';
import { Providers } from '@/lib/providers';
import Header from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/ui/cart-drawer';
import { cn } from '@/lib/utils';
import { geistSans, geistMono, playfair } from '@/lib/fonts';
import { useRouter } from 'next/router';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <div className={cn(
        geistSans.variable, 
        geistMono.variable, 
        playfair.variable, 
        "min-h-screen flex flex-col antialiased bg-white dark:bg-gray-900 text-black dark:text-white relative"
      )}>
        <Header />
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>
        <Footer />
        <CartDrawer />
        <div id="database-error-banner-container" />
      </div>
    </Providers>
  );
} 