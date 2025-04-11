"use client";

import React from 'react';
import { useLanguage } from "@/lib/LanguageContext";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Clock, Download, Package, Truck, ShoppingBag } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { OptimizedImage } from '../ui/optimized-image';
import { CartItem } from '@/lib/CartContext';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderSummaryProps {
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  className?: string;
}

// Animation variants
const itemVariants = {
  hidden: { opacity: 0, y: 5 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 100 }
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

export default function OrderSummary({
  items,
  subtotal,
  shipping,
  tax,
  total,
  className,
}: OrderSummaryProps) {
  const { language } = useLanguage();
  const translate = (bg: string, en: string) => language === 'bg' ? bg : en;

  if (items.length === 0) {
    return (
      <div className={cn("space-y-4", className)}>
        <h3 className="font-semibold text-lg mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400">
          {translate("Резюме на поръчката", "Order Summary")}
        </h3>
        
        <div className="rounded-xl p-[2px]
          bg-gradient-to-br from-gray-200/80 via-white/90 to-gray-100/80 
          dark:from-gray-800/80 dark:via-gray-900/90 dark:to-gray-800/80
          shadow-[4px_4px_8px_rgba(0,0,0,0.05),-4px_-4px_8px_rgba(255,255,255,0.7)]
          dark:shadow-[4px_4px_8px_rgba(0,0,0,0.2),-4px_-4px_8px_rgba(30,30,30,0.1)]
          overflow-hidden">
          <div className="bg-gradient-to-br from-gray-50/50 via-white/50 to-gray-50/50 dark:from-gray-900/50 dark:via-gray-900/30 dark:to-gray-900/50 p-6 rounded-xl relative">
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                <ShoppingBag className="h-8 w-8 text-gray-400 dark:text-gray-500" />
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {translate("Вашата кошница е празна", "Your cart is empty")}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn("space-y-3", className)}
    >
      <h3 className="font-semibold text-base mb-3 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400">
        {translate("Резюме на поръчката", "Order Summary")}
      </h3>
      
      {/* Items */}
      <div className="space-y-3 mb-4">
        {items.slice(0, 3).map((item) => (
          <motion.div 
            key={item.id} 
            variants={itemVariants}
            className="flex items-center gap-3 group"
          >
            <div className="relative h-16 w-16 rounded-xl overflow-hidden flex-shrink-0
              bg-gradient-to-br from-gray-100 to-white dark:from-gray-800 dark:to-gray-900
              shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.7)]
              dark:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1)]">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 64px, 64px"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLUEwLi0tLTAtQFBGRjpLPUA0SGFFXVVXZ2dnZ4KLgpCNl5eX/2wBDARVFx4eIB8gHx8gLSgtIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-600">
                  <Package className="h-6 w-6" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0 flex justify-between items-center">
              <div>
                <h4 className="font-medium text-sm truncate text-gray-900 dark:text-gray-100 mb-1">
                  {item.name}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {translate("Кол.", "Qty")}: {item.quantity} × ${item.price.toFixed(2)}
                </p>
              </div>
              <div className="text-sm font-medium text-gray-900 dark:text-gray-100 pl-4">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          </motion.div>
        ))}
        {items.length > 3 && (
          <div className="text-xs text-center text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-800">
            + {items.length - 3} {translate("още", "more")} {translate("артикула", "items")}
          </div>
        )}
      </div>
      
      {/* Summary */}
      <div className="rounded-lg p-4
        bg-gradient-to-br from-gray-50/50 via-white/50 to-gray-50/50 
        dark:from-gray-900/50 dark:via-gray-900/30 dark:to-gray-900/50
        shadow-[inset_2px_2px_4px_rgba(0,0,0,0.03),inset_-2px_-2px_4px_rgba(255,255,255,0.3)]
        dark:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.15),inset_-2px_-2px_4px_rgba(30,30,30,0.1)]">
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600 dark:text-gray-400">{translate("Междинна сума", "Subtotal")}</span>
            <span className="font-medium text-gray-900 dark:text-gray-100">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600 dark:text-gray-400">{translate("Доставка", "Shipping")}</span>
            <span className="font-medium text-gray-900 dark:text-gray-100">${shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600 dark:text-gray-400">{translate("Данъци", "Tax")}</span>
            <span className="font-medium text-gray-900 dark:text-gray-100">${tax.toFixed(2)}</span>
          </div>
          <div className="pt-2 mt-2 border-t border-gray-100 dark:border-gray-800">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-900 dark:text-gray-100">{translate("Обща сума", "Total")}</span>
              <span className="font-semibold text-lg bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Delivery Estimate */}
      <motion.div variants={itemVariants} className="pt-2">
        <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
          <Truck className="h-3.5 w-3.5" />
          <span>
            {translate("Доставка", "Delivery")}: 2-4 {translate("дни", "days")}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
} 