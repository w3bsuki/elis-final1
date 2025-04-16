"use client";

import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";
import { useCart } from "@/lib/CartContext";
import { useSafeLanguage } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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
    setIsCartOpen(true);
  };

  return (
    <div className="flex items-center space-x-3">
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        <Button 
          onClick={handleShopClick}
          className={cn(
            "rounded-full h-11 pl-5 pr-6",
            "bg-gradient-to-r from-green-600 to-emerald-600",
            "text-white font-medium",
            "border border-green-500/40 dark:border-green-400/30",
            "shadow-md hover:shadow-lg"
          )}
        >
          <ShoppingBag className="h-5 w-5 mr-2.5" />
          <span className="text-base">
            {language === 'en' ? 'Shop' : 'Магазин'}
          </span>
        </Button>
      </motion.div>
      
      <motion.div
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={handleCartClick}
          variant="outline" 
          size="icon"
          className={cn(
            "rounded-full h-11 w-11",
            "border border-gray-200 dark:border-gray-700",
            "relative",
            "shadow-sm hover:shadow"
          )}
          aria-label={language === 'en' ? 'Cart' : 'Количка'}
        >
          <ShoppingBag className="h-5 w-5" />
          
          {totalQuantity > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1.5 -right-1.5 flex items-center justify-center h-5 min-w-5 px-1 
                rounded-full bg-green-500 text-white text-xs font-bold shadow-sm"
            >
              {totalQuantity}
            </motion.div>
          )}
        </Button>
      </motion.div>
    </div>
  );
} 