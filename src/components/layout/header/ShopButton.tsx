"use client";

import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";
import { useCart } from "@/lib/CartContext";
import { useSafeLanguage } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";

export function ShopButton() {
  const router = useRouter();
  const pathname = usePathname();
  const { language } = useSafeLanguage();
  const { cartItems, setIsCartOpen } = useCart();
  
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  const handleShopClick = () => {
    if (pathname !== '/shop' && pathname !== '/shop/') {
      router.push('/shop');
    }
  };
  
  const handleCartClick = () => {
    // Open the cart drawer instead of navigating to checkout
    setIsCartOpen(true);
  };
  
  return (
    <div className="flex items-center space-x-2">
      <Button 
        onClick={handleShopClick}
        variant="ghost"
        size="sm"
        className={cn(
          "rounded-full px-4 py-1.5 h-9 group relative overflow-hidden",
          "bg-gradient-to-r from-green-600/90 to-emerald-600/90",
          "hover:from-green-500 hover:to-emerald-500",
          "text-white font-medium",
          "border border-green-500/50 dark:border-green-400/30", 
          "shadow-[0_2px_10px_rgba(0,128,0,0.25)] hover:shadow-[0_4px_15px_rgba(0,128,0,0.35)]",
          "transition-all duration-300 ease-in-out"
        )}
      >
        {/* Glow effect */}
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        
        <ShoppingBag className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
        <span className="text-sm font-medium">
          {language === 'en' ? 'Shop' : 'Магазин'}
        </span>
      </Button>
      
      {/* Cart Button */}
      <Button
        onClick={handleCartClick}
        variant="outline" 
        size="sm"
        className={cn(
          "rounded-full w-9 h-9 p-0 flex items-center justify-center group relative",
          "bg-background/80 hover:bg-background",
          "border border-gray-200 dark:border-gray-700",
          "text-gray-700 dark:text-gray-300",
          "hover:text-green-600 dark:hover:text-green-400",
          "transition-all duration-200 ease-in-out",
          totalQuantity > 0 && "animate-subtle-pulse"
        )}
        aria-label={language === 'en' ? 'Cart' : 'Количка'}
      >
        <ShoppingBag className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
        {totalQuantity > 0 && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-4 h-4 px-1 rounded-full 
            bg-green-500 text-white text-xs font-bold shadow-sm">
            {totalQuantity}
          </span>
        )}
      </Button>
    </div>
  );
} 