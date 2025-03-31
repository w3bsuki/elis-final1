"use client";

import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";
import { useCart } from "@/lib/CartContext";
import { ShoppingCart, Trash2, Plus, Minus, X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { SafeComponent } from "./error-fallback";
import { PaymentButton } from "./payment-button";

export function CartDrawer() {
  const [mounted, setMounted] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const { language } = useLanguage();
  const cartContext = useCart();
  
  // Safely destructure cart context with default values
  const cartItems = cartContext?.cartItems || [];
  const subtotal = cartContext?.subtotal || 0;
  const isCartOpen = cartContext?.isCartOpen || false;
  const setIsCartOpen = cartContext?.setIsCartOpen;
  const router = useRouter();

  // Safely handle setIsCartOpen which might be undefined
  const handleSetIsCartOpen = (open: boolean) => {
    if (typeof setIsCartOpen === 'function') {
      setIsCartOpen(open);
    }
  };

  // Prevent backdrop click propagation
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleSetIsCartOpen(false);
    }
  };

  // Safely handle item operations
  const handleUpdateQuantity = (item: any, newQuantity: number) => {
    if (typeof item.updateQuantity === 'function') {
      item.updateQuantity(newQuantity);
    } else if (cartContext?.updateQuantity) {
      cartContext.updateQuantity(item.id, newQuantity);
    }
  };

  const handleRemoveItem = (item: any) => {
    if (typeof item.removeFromCart === 'function') {
      item.removeFromCart();
    } else if (cartContext?.removeFromCart) {
      cartContext.removeFromCart(item.id);
    }
  };

  // Guard against undefined items
  const hasItems = cartItems && cartItems.length > 0;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Sheet open={!!isCartOpen} onOpenChange={handleSetIsCartOpen}>
      <SheetContent className="flex flex-col h-full p-0 w-full max-w-md sm:max-w-lg">
        <div 
          className="fixed inset-0 bg-black/40 z-[-1]"
          onClick={handleBackdropClick}
        />
        <div className="p-4 border-b flex justify-between items-center">
          <SheetTitle className="text-xl font-semibold">
            {language === "en" ? "Your Cart" : "Вашата Количка"}
          </SheetTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleSetIsCartOpen(false)}
            aria-label={language === "en" ? "Close cart" : "Затвори количката"}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {!hasItems ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {language === "en"
                  ? "Your cart is empty"
                  : "Вашата количка е празна"}
              </p>
            </div>
          ) : (
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex items-start space-x-4 border-b pb-4"
                >
                  <div className="relative w-16 h-20 overflow-hidden rounded">
                    {(item.coverImage || item.image) && (
                      <Image
                        src={item.coverImage || item.image || "/placeholder.jpg"}
                        alt={item.title || "Product image"}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder.jpg";
                        }}
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {(item.price || 0).toFixed(2)} BGN
                    </p>
                    <div className="flex items-center mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 w-7 p-0"
                        onClick={() => item.quantity > 1 && handleUpdateQuantity(item, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 w-7 p-0"
                        onClick={() => handleUpdateQuantity(item, item.quantity + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleRemoveItem(item)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t p-4">
          <div className="flex justify-between mb-4">
            <span className="font-medium">
              {language === "en" ? "Subtotal" : "Междинна сума"}
            </span>
            <span className="font-medium">{subtotal.toFixed(2)} BGN</span>
          </div>
          {paymentError && (
            <div className="bg-red-100 text-red-700 p-2 rounded text-sm mb-2">
              {paymentError}
            </div>
          )}
          <SafeComponent
            fallback={
              <Button variant="outline" className="w-full" disabled>
                {language === "en" ? "Payment Error" : "Грешка в плащането"}
              </Button>
            }
          >
            <Button
              onClick={() => {
                handleSetIsCartOpen(false);
                router.push("/checkout");
              }}
              disabled={cartItems.length === 0}
              className="w-full"
            >
              {language === "en" ? "Proceed to Checkout" : "Продължи към плащане"}
            </Button>
          </SafeComponent>
        </div>
      </SheetContent>
    </Sheet>
  );
} 