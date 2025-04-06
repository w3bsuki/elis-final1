"use client";

import React from 'react';
import { ToastDemo } from '@/components/ToastDemo';
import { Toaster } from '@/components/ui/toaster';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  ChevronRight, 
  ArrowRight, 
  Home, 
  BookOpen, 
  Download,
  ShoppingCart,
  Heart,
  Share2
} from 'lucide-react';

export default function ComponentsPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="py-8 border-b">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-shimmer">
            Enhanced UI Components
          </h1>
          <p className="text-center text-muted-foreground mt-2">
            A showcase of our newly enhanced UI components with improved styling and animations
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Button Showcase */}
        <section className="mb-20 paper-texture p-8 rounded-xl border">
          <h2 className="text-2xl font-bold mb-6 gradient-text">Enhanced Button System</h2>
          
          <div className="space-y-8">
            {/* Button Variants */}
            <div>
              <h3 className="text-lg font-medium mb-4">Button Variants</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="default">Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="success">Success</Button>
                <Button variant="info">Info</Button>
                <Button variant="warning">Warning</Button>
                <Button variant="premium">Premium</Button>
                <Button variant="accent">Accent</Button>
                <Button variant="dotted">Dotted</Button>
              </div>
            </div>

            {/* Button Sizes */}
            <div>
              <h3 className="text-lg font-medium mb-4">Button Sizes</h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="xl">Extra Large</Button>
                <Button size="2xl">2XL</Button>
                <Button size="icon"><Home /></Button>
              </div>
            </div>

            {/* Button Rounded Variants */}
            <div>
              <h3 className="text-lg font-medium mb-4">Button Rounded Variants</h3>
              <div className="flex flex-wrap gap-4">
                <Button rounded="none">None</Button>
                <Button rounded="default">Default</Button>
                <Button rounded="lg">Large</Button>
                <Button rounded="xl">Extra Large</Button>
                <Button rounded="full">Full</Button>
              </div>
            </div>

            {/* Button Animations */}
            <div>
              <h3 className="text-lg font-medium mb-4">Button Animations</h3>
              <div className="flex flex-wrap gap-4">
                <Button animation="none">No Animation</Button>
                <Button animation="pulse" variant="success">Pulse</Button>
                <Button animation="bounce" variant="premium">Bounce</Button>
                <Button animation="glow" variant="premium">Glow</Button>
                <Button animation="ripple" variant="info">Ripple</Button>
              </div>
            </div>

            {/* Button with Icons */}
            <div>
              <h3 className="text-lg font-medium mb-4">Button with Icons</h3>
              <div className="flex flex-wrap gap-4">
                <Button icon={<Home />}>Home</Button>
                <Button icon={<ArrowRight />} iconPosition="right">Next</Button>
                <Button variant="success" icon={<Download />}>Download</Button>
                <Button variant="premium" icon={<Sparkles />}>Premium</Button>
                <Button variant="dotted" rounded="full" icon={<Heart />}>Favorite</Button>
                <Button variant="outline" icon={<Share2 />}>Share</Button>
              </div>
            </div>

            {/* Loading Buttons */}
            <div>
              <h3 className="text-lg font-medium mb-4">Loading State</h3>
              <div className="flex flex-wrap gap-4">
                <Button loading>Loading</Button>
                <Button variant="premium" loading>Processing</Button>
                <Button variant="success" loading>Saving</Button>
                <Button variant="outline" loading>Please wait</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Badge Showcase */}
        <section className="mb-20 paper-texture p-8 rounded-xl border">
          <h2 className="text-2xl font-bold mb-6 gradient-text">Enhanced Badge System</h2>
          
          <div className="space-y-8">
            {/* Badge Variants */}
            <div>
              <h3 className="text-lg font-medium mb-4">Badge Variants</h3>
              <div className="flex flex-wrap gap-4">
                <Badge variant="default">Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="info">Info</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="premium">Premium</Badge>
                <Badge variant="accent">Accent</Badge>
              </div>
            </div>

            {/* Badges with Icons */}
            <div>
              <h3 className="text-lg font-medium mb-4">Badges with Icons</h3>
              <div className="flex flex-wrap gap-4">
                <Badge variant="default" className="flex items-center gap-1">
                  <Home className="h-3 w-3" />
                  <span>Home</span>
                </Badge>
                <Badge variant="success" className="flex items-center gap-1">
                  <Download className="h-3 w-3" />
                  <span>Downloaded</span>
                </Badge>
                <Badge variant="premium" className="flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  <span>Premium</span>
                </Badge>
                <Badge variant="info" className="flex items-center gap-1">
                  <BookOpen className="h-3 w-3" />
                  <span>New</span>
                </Badge>
                <Badge variant="warning" className="flex items-center gap-1">
                  <ShoppingCart className="h-3 w-3" />
                  <span>In Cart</span>
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Toast System */}
        <section className="mb-20">
          <ToastDemo />
        </section>
      </main>

      <Toaster />
    </div>
  );
} 