"use client";

import { useState, useEffect } from "react";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";
import { useLanguage } from "@/lib/LanguageContext";
import { useCart } from "@/lib/CartContext";

// Custom hook that safely uses language context
function useSafeLanguage() {
  const [language, setLanguage] = useState('bg'); // Default to Bulgarian
  
  useEffect(() => {
    try {
      const context = useLanguage();
      setLanguage(context.language);
    } catch (e) {
      console.warn("Language context not available in ShopButton", e);
      // Keep using default language
    }
  }, []);
  
  return { language };
}

export function ShopButton() {
  const router = useRouter();
  const pathname = usePathname();
  const { language } = useSafeLanguage();
  const { cartItems } = useCart();
  
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  const handleShopClick = () => {
    if (pathname !== '/shop' && pathname !== '/shop/') {
      router.push('/shop');
    }
  };
  
  return (
    <div className="flex items-center space-x-2">
      <Button 
        onClick={handleShopClick}
        variant="outline"
        size="sm"
        className="bg-background border border-border text-foreground hover:bg-muted rounded-lg h-10 px-4 shadow-sm"
      >
        <ShoppingBag className="h-5 w-5 mr-2" />
        <span className="text-sm font-medium">
          {language === 'en' ? 'Shop' : 'Магазин'}
        </span>
        {totalQuantity > 0 && (
          <span className="ml-2 flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs">
            {totalQuantity}
          </span>
        )}
      </Button>
    </div>
  );
} 