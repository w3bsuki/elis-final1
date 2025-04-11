"use client";

import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";
import { useCart } from "@/lib/CartContext";
import { useSafeLanguage } from "@/hooks/useSafeLanguage";
import { cn } from "@/lib/utils";

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
        variant="ghost"
        size="sm"
        className={cn(
          "rounded-full px-5 py-2 h-10 group relative overflow-hidden",
          "bg-gradient-to-r from-green-600/90 to-emerald-600/90",
          "hover:from-green-500 hover:to-emerald-500",
          "text-white font-medium",
          "border border-green-500/50 dark:border-green-400/30", 
          "shadow-[0_2px_10px_rgba(0,128,0,0.25)] hover:shadow-[0_4px_15px_rgba(0,128,0,0.35)]",
          "transition-all duration-300 ease-in-out",
          totalQuantity > 0 && "animate-subtle-pulse"
        )}
      >
        {/* Glow effect */}
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        
        <ShoppingBag className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
        <span className="text-sm font-medium">
          {language === 'en' ? 'Shop' : 'Магазин'}
        </span>
        {totalQuantity > 0 && (
          <span className="ml-2 flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-white text-green-700 text-xs font-bold shadow-sm">
            {totalQuantity}
          </span>
        )}
      </Button>
    </div>
  );
} 