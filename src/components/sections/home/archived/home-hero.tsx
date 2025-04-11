"use client";

import React from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, BookOpen, ArrowRight } from "lucide-react";
import { HeroSection } from "@/components/ui/hero-section";
import { ProfileCard } from "@/components/ui/profile-card";
import { Avatar, AvatarImage, AvatarFallback, AvatarBadge } from "@/components/ui/avatar";

export interface HomeHeroProps {
  className?: string;
}

/**
 * HomeHero component - Main hero section for the homepage
 * This is a simplified version of the previous HeroSection/index.tsx
 */
export function HomeHero({ className }: HomeHeroProps) {
  const { language } = useLanguage();
  const translate = (bg: string, en: string) => language === 'bg' ? bg : en;
  
  // Author profile data
  const profile = {
    imageSrc: "/images/avatar/avatar.jpg",
    name: translate("Елиса Иванова", "Elisa Ivanova"),
    title: translate("Писател & Психолог", "Author & Psychologist"),
    altText: translate("Профилна снимка на Елиса Иванова", "Profile photo of Elisa Ivanova"),
    description: translate(
      "Дипломиран психолог и автор, помагащ ви да създадете осъзнат, мечтан живот, изпълнен с любов и хармония.",
      "Certified psychologist and author helping you create a conscious, dream life filled with love and harmony."
    )
  };
  
  // UI text translations
  const ui = {
    welcomeBadge: translate("Добре дошли", "Welcome"),
    transformHeading: translate("Трансформирай Живота Си", "Transform Your Life"),
    bookCta: translate("Разгледай книгите", "Browse Books"),
    serviceCta: translate("Виж услугите", "View Services"),
    featuredContent: translate("Препоръчано съдържание", "Featured Content"),
  };
  
  return (
    <HeroSection className={cn("py-2 px-4 md:py-4 md:px-6", className)}>
      <div className="bg-gradient-to-br from-white/90 via-white/80 to-green-50/70 dark:from-gray-900/90 dark:via-gray-900/80 dark:to-green-900/20 backdrop-blur-sm rounded-xl p-4 relative min-h-[calc(60vh-80px)] flex flex-col justify-start shadow-md border border-green-100/50 dark:border-green-900/30">
        {/* Subtle decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-green-100/30 to-transparent dark:from-green-800/10 dark:to-transparent rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tl from-green-100/30 to-transparent dark:from-green-800/10 dark:to-transparent rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Left column - Text content */}
          <div className="flex flex-col space-y-6">
            <Badge variant="outline" className="w-fit px-3 py-1 text-sm bg-white/70 dark:bg-gray-800/70 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 backdrop-blur-sm">
              {ui.welcomeBadge}
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-playfair bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-800 dark:from-white dark:via-gray-200 dark:to-gray-100">
              {ui.transformHeading}
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 font-medium">
              {profile.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button asChild className="group rounded-full shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 border-0">
                <Link href="/shop">
                  <BookOpen className="mr-2 h-4 w-4" />
                  {ui.bookCta}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="group rounded-full shadow-sm hover:shadow-md border-2 border-green-300 dark:border-green-700 text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/20">
                <Link href="/services">
                  <Heart className="mr-2 h-4 w-4" />
                  {ui.serviceCta}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Right column - Profile card with enhanced styling */}
          <div className="flex justify-center md:justify-end">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-100 to-green-50 dark:from-green-900/40 dark:to-green-800/30 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-500"></div>
              <ProfileCard
                imageSrc={profile.imageSrc}
                name={profile.name}
                title={profile.title}
                altText={profile.altText}
                badgeText={ui.welcomeBadge}
                badgePosition="top-right"
                className="relative rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-[1.01]"
              />
            </div>
          </div>
        </div>
      </div>
    </HeroSection>
  );
}

export default HomeHero; 