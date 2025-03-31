import React from 'react';
import { Button } from '@/components/ui/button';

export function ShopBanner() {
  return (
    <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))]" />
      <div className="relative flex flex-col items-start gap-2 p-6 md:p-8 lg:flex-row lg:items-center lg:gap-6">
        <div className="space-y-2 lg:space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
            Spring Collection 2024
          </h2>
          <p className="max-w-[600px] text-white/90 md:text-lg">
            Discover our latest releases and bestsellers. Limited time offer: Free shipping on orders over $50.
          </p>
        </div>
        <div className="flex flex-1 justify-end">
          <Button 
            size="lg" 
            className="bg-orange-500 text-white hover:bg-orange-600 text-lg px-8 py-6 h-auto font-medium"
          >
            Explore Collection
          </Button>
        </div>
      </div>
    </div>
  );
} 