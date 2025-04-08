"use client";

import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";
import { useCart } from "@/lib/CartContext";
import { useSafeLanguage } from "@/hooks/useSafeLanguage";
import { cn } from "@/lib/utils";

const nestedGlassStyle = cn(
  "border border-border/70", 
  "shadow-inner", 
  "bg-clip-padding backdrop-filter backdrop-blur-sm bg-background/75", 
  "text-foreground", 
  "transition-all duration-200 ease-in-out", 
  "hover:bg-background/85 hover:shadow-sm hover:border-border", 
  "active:bg-background/95 active:scale-[0.98] active:shadow-inner",
  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 dark:focus-visible:ring-offset-background"
);

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
        className={cn(nestedGlassStyle, "rounded-lg px-4 py-2 h-10")}
      >
        <ShoppingBag className="h-5 w-5 mr-2" />
        <span className="text-sm font-medium">
          {language === 'en' ? 'Shop' : 'Магазин'}
        </span>
        {totalQuantity > 0 && (
          <span className="ml-2 flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-primary text-primary-foreground text-xs font-bold">
            {totalQuantity}
          </span>
        )}
      </Button>
    </div>
  );
} 