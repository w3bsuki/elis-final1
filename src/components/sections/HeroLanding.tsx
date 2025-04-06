"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Feather, Heart, Sparkle } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";

export default function HeroLanding() {
  const { language } = useLanguage();
  
  // Translate function
  const translate = (bg: string, en: string) => language === 'en' ? en : bg;
  
  return (
    <div className="relative z-0">
      {/* Main hero content with two columns */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
        {/* Left column - Text content */}
        <div className="w-full lg:w-1/2 space-y-6">
          <Badge variant="outline" className="px-4 py-1.5 text-sm rounded-full bg-primary/5 backdrop-blur-sm">
            <Heart className="w-4 h-4 mr-2 text-primary" />
            {translate("Психолог & Арт Терапевт", "Psychologist & Art Therapist")}
          </Badge>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-serif !leading-tight bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent">
            {translate(
              "Трансформирайте Живота Си с Професионална Подкрепа",
              "Transform Your Life with Professional Support"
            )}
          </h1>
          
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-xl">
            {translate(
              "Специализирам в предоставянето на персонализирана психологическа подкрепа и творчески подходи за личностно развитие. Книгите и семинарите ми предлагат допълнителни ресурси за трансформация.",
              "I specialize in providing personalized psychological support and creative approaches for personal growth. My books and workshops offer additional resources for transformation."
            )}
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="rounded-full gap-2 text-base">
              {translate("Започнете Сега", "Get Started")}
              <ArrowRight className="w-4 h-4" />
            </Button>
            
            <Button variant="outline" size="lg" className="rounded-full gap-2 text-base">
              {translate("Научете Повече", "Learn More")}
            </Button>
          </div>
          
          {/* Client stats */}
          <div className="grid grid-cols-3 gap-4 pt-6">
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-primary">500+</p>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                {translate("Клиенти", "Clients")}
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-primary">50+</p>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                {translate("Семинари", "Workshops")}
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-primary">5</p>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                {translate("Книги", "Books")}
              </p>
            </div>
          </div>
        </div>
        
        {/* Right column - Hero image */}
        <div className="w-full lg:w-1/2 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-amber-500/10 rounded-2xl blur-3xl -z-10 transform scale-95"></div>
          
          <motion.div
            className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 shadow-xl rounded-2xl p-2 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden">
              <Image
                src="/images/hero.jpg"
                alt={translate("Елиса Иванова, Психолог и Арт Терапевт", "Elisa Ivanova, Psychologist and Art Therapist")}
                fill
                className="object-cover"
                priority
              />
              
              {/* Floating accent */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-lg p-3 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="size-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                      <Sparkle className="size-6" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {translate("Елиса Иванова", "Elisa Ivanova")}
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {translate("15+ години опит", "15+ years of experience")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Bottom decoration */}
          <div className="absolute -bottom-6 inset-x-0 h-10 bg-gradient-to-t from-white dark:from-gray-950 to-transparent -z-10"></div>
        </div>
      </div>
    </div>
  );
} 