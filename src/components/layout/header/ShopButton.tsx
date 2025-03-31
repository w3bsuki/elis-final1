"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingBag, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";
import { useCart } from "@/lib/CartContext";
import { cn } from "@/lib/utils";

export function ShopButton() {
  const { language } = useLanguage();
  const { totalItems, setIsCartOpen } = useCart();
  const pathname = usePathname();
  const router = useRouter();
  
  const handleShopClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Prevent navigating to the current page
    if (pathname === '/shop' || pathname === '/shop/') {
      e.preventDefault();
    }
  };
  
  return (
    <div className="flex items-center gap-2">
      <Button 
        className="bg-white hover:bg-gray-100 text-gray-900 text-sm px-4 py-1 h-9 rounded-md border border-gray-300 dark:border-gray-700 shadow-sm transition-all duration-200 font-medium group dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700" 
        asChild
      >
        <Link 
          href="/shop" 
          className="flex items-center"
          onClick={handleShopClick}
        >
          <ShoppingBag className="mr-1.5 h-4 w-4 text-green-600 dark:text-green-400" />
          {language === "en" ? "Shop" : "Магазин"}
        </Link>
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "relative rounded-full h-9 w-9 transition-colors",
          "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
        )}
        onClick={() => setIsCartOpen(true)}
        aria-label="Open cart"
      >
        <ShoppingCart className="h-5 w-5" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
            {totalItems > 99 ? '99+' : totalItems}
          </span>
        )}
      </Button>
    </div>
  );
} 