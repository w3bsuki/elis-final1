"use client";

import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";
import { useCart } from "@/lib/CartContext";
import { ShoppingCart, Trash2, Plus, Minus, X, Clock, Download, ArrowRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { SafeComponent } from "./error-fallback";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export function CartDrawer() {
  const [mounted, setMounted] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const { language } = useLanguage();
  const cartContext = useCart();
  const translate = (bg: string, en: string) => language === 'bg' ? bg : en;
  
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
      <SheetContent 
        side="right"
        className="flex flex-col h-full p-0 w-full sm:max-w-md border-l border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/40"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <SheetHeader className="p-6 border-b border-border/40 bg-background/60 backdrop-blur-sm supports-[backdrop-filter]:bg-background/40 sticky top-0 z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SheetTitle className="text-xl font-medium">
                  {translate("Кошница", "Cart")}
                </SheetTitle>
                {hasItems && (
                  <Badge 
                    variant="secondary" 
                    className="rounded-full px-2.5 py-0.5 text-xs font-medium bg-primary/10 text-primary border-primary/20"
                  >
                    {cartItems.length}
                  </Badge>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleSetIsCartOpen(false)}
                className="rounded-full hover:bg-primary/10 transition-colors"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </SheetHeader>

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            {!hasItems ? (
              <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                <div className="rounded-full bg-primary/10 p-6 mb-4 ring-8 ring-primary/5">
                  <ShoppingCart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-medium text-lg mb-2">
                  {translate("Кошницата е празна", "Your cart is empty")}
                </h3>
                <p className="text-muted-foreground text-sm mb-6 max-w-[250px]">
                  {translate(
                    "Добавете продукти, за да продължите с поръчката",
                    "Add items to proceed with your order"
                  )}
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    handleSetIsCartOpen(false);
                    router.push('/shop');
                  }}
                  className="gap-2 rounded-full hover:bg-primary/10 hover:text-primary transition-colors duration-300"
                >
                  <ArrowRight className="h-4 w-4" />
                  {translate("Към магазина", "Continue Shopping")}
                </Button>
              </div>
            ) : (
              <ScrollArea className="h-full">
                <div className="divide-y divide-border/40">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-6 hover:bg-muted/40 transition-colors">
                      <div className="flex gap-4">
                        {/* Image */}
                        <div className="relative aspect-[3/4] w-20 overflow-hidden rounded-2xl border border-border/40 bg-muted/40 shadow-sm">
                          <Image
                            src={item.coverImage || item.image || "/placeholder.jpg"}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-300 hover:scale-105"
                            sizes="80px"
                          />
                          {item.type === 'service' && (
                            <div className="absolute inset-0 bg-blue-500/10 backdrop-blur-sm flex items-center justify-center">
                              <Clock className="h-5 w-5 text-blue-600" />
                            </div>
                          )}
                          {item.type === 'book' && item.itemData?.digital && (
                            <div className="absolute inset-0 bg-green-500/10 backdrop-blur-sm flex items-center justify-center">
                              <Download className="h-5 w-5 text-green-600" />
                            </div>
                          )}
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="font-medium leading-tight mb-1.5 truncate">
                                {item.title}
                              </h3>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Badge 
                                  variant="secondary" 
                                  className="rounded-full px-2.5 py-0.5 text-xs bg-muted"
                                >
                                  {item.type === 'book' 
                                    ? translate("Книга", "Book")
                                    : translate("Услуга", "Service")
                                  }
                                </Badge>
                                <span className="text-xs">•</span>
                                <span className="font-medium">{item.price.toFixed(2)} BGN</span>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                              onClick={() => handleRemoveItem(item)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>

                          {/* Quantity controls */}
                          <div className="flex items-center gap-2 mt-4">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary hover:border-primary/20 transition-colors"
                              onClick={() => item.quantity > 1 && handleUpdateQuantity(item, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary hover:border-primary/20 transition-colors"
                              onClick={() => handleUpdateQuantity(item, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>

          {/* Footer */}
          {hasItems && (
            <div className="border-t border-border/40 bg-background/60 backdrop-blur-sm supports-[backdrop-filter]:bg-background/40 sticky bottom-0 z-10">
              <div className="p-6">
                {/* Subtotal */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-muted-foreground">
                    {translate("Междинна сума", "Subtotal")}
                  </span>
                  <span className="font-medium text-lg">
                    {subtotal.toFixed(2)} BGN
                  </span>
                </div>

                {/* Error message */}
                {paymentError && (
                  <div className="mb-4 p-3 rounded-full bg-destructive/10 text-destructive text-sm">
                    {paymentError}
                  </div>
                )}

                {/* Checkout button */}
                <SafeComponent
                  fallback={
                    <Button variant="outline" className="w-full rounded-full" disabled>
                      {translate("Грешка в плащането", "Payment Error")}
                    </Button>
                  }
                >
                  <Button
                    size="lg"
                    onClick={() => {
                      handleSetIsCartOpen(false);
                      router.push("/checkout");
                    }}
                    className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {translate("Продължи към плащане", "Proceed to Checkout")}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </SafeComponent>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
} 