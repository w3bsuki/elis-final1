"use client";

import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/lib/LanguageContext";
import { CartProvider } from "@/lib/CartContext";
import { Toaster } from "@/components/ui/toaster";
import { useEffect, useState } from "react";
import { SafeComponent } from "@/components/ui/error-fallback";
import { DatabaseErrorManager } from '@/components/DatabaseErrorManager';

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  // Wait until component is mounted to render children
  // This prevents hydration errors with theme/cart providers
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a placeholder with the same structure to prevent layout shift
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow"></div>
      </div>
    );
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      forcedTheme="light"
      disableTransitionOnChange
    >
      <LanguageProvider>
        <CartProvider>
          {children}
          <Toaster />
          <DatabaseErrorManager />
        </CartProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
} 