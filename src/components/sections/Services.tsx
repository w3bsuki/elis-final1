"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";
import { FlipCard } from "@/components/ui/flip-card";

// UI Components
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Icons
import { 
  Award,
  BookOpen, 
  Briefcase,
  Calendar, 
  ChevronRight,
  Clock,
  Eye,
  Gift,
  MessageCircle,
  Package,
  Pen, 
  Presentation, 
  School,
  Shield,
  Sparkles, 
  Star,
  User,
  Users,
  ArrowRight,
  CalendarDays
} from "lucide-react";

// Import services
import { services as allServices, filterServicesByCategory } from "@/data/services";

// Service interface 
interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  imageUrl: string;
  features: string[];
  cta: string;
  popular?: boolean;
  // Additional properties needed for ServiceCard
  category?: string;
  duration?: string;
  price?: number;
  featured?: boolean;
  includes?: string[];
  image?: string;
}

// Helper functions for package tiers
const getPackageTier = (title: string): { mainTitle: string, tier: string | null } => {
  // Check for typical package tier indicators
  const tierWords = ["Основен", "Среден", "Премиум", "Basic", "Standard", "Premium"];
  
  // Clean up the title
  let mainTitle = title;
  let tier: string | null = null;
  
  for (const word of tierWords) {
    if (title.includes(word)) {
      tier = word;
      // Remove the tier word and any colons or "пакет" word from the title
      mainTitle = title.replace(`${word} пакет:`, '')
                       .replace(`${word} пакет`, '')
                       .replace(`${word}:`, '')
                       .replace(`${word} `, '')
                       .replace(`:`, '')
                       .replace(`Пакет "`, '"')
                       .replace(`Пакет:`, '')
                       .replace(`Пакет `, '')
                       .replace(`Пакет`, '')
                       .trim();
      break;
    }
  }
  
  return { mainTitle, tier };
};

// Get tier badge color
const getTierBadgeColor = (tier: string | null): string => {
  if (!tier) return "";
  
  switch(tier) {
    case "Основен":
    case "Basic":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border-blue-200 dark:border-blue-800/30";
    case "Среден":
    case "Standard":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300 border-purple-200 dark:border-purple-800/30";
    case "Премиум":
    case "Premium":
      return "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 border-amber-200 dark:border-amber-800/30";
    default:
      return "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300 border-green-200 dark:border-green-800/30";
  }
};

export const Services = () => {
  const { language } = useLanguage();
  
  const translate = (bgText: string, enText: string) => language === 'en' ? enText : bgText;

  // Services data
  const services: Service[] = [
    {
      id: "workshops",
      title: translate("Творчески Работилници", "Creative Workshops"),
      description: translate(
        "Интерактивни сесии, фокусирани върху личностно развитие, писане и развиване на творчески умения в малки групи.",
        "Interactive sessions focused on personal development, writing, and creative skills in small groups."
      ),
      icon: <School className="h-6 w-6 text-amber-500" />,
      imageUrl: "https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=600&auto=format&fit=crop",
      features: [
        translate("Персонализирано съдържание", "Customized content"),
        translate("Практически упражнения", "Practical exercises"),
        translate("Материали включени", "Materials included"),
        translate("Сертификат за участие", "Participation certificate")
      ],
      cta: translate("Запази място", "Book a Spot"),
      popular: true
    },
    {
      id: "speaking",
      title: translate("Лекции и Презентации", "Speaking Engagements"),
      description: translate(
        "Вдъхновяващи речи и презентации за корпоративни събития, образователни институции и конференции.",
        "Inspiring talks and presentations for corporate events, educational institutions, and conferences."
      ),
      icon: <Presentation className="h-6 w-6 text-blue-500" />,
      imageUrl: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=600&auto=format&fit=crop",
      features: [
        translate("Теми по избор", "Custom topics"),
        translate("Мултимедийни презентации", "Multimedia presentations"),
        translate("Q&A сесии", "Q&A sessions"),
        translate("Гъвкаво времетраене", "Flexible duration")
      ],
      cta: translate("Запитване", "Inquire")
    },
    {
      id: "consultations",
      title: translate("Персонални Консултации", "Personal Consultations"),
      description: translate(
        "Индивидуални сесии за личностно развитие, кариерно ориентиране или работа върху конкретни творчески проекти.",
        "One-on-one sessions for personal development, career guidance, or work on specific creative projects."
      ),
      icon: <MessageCircle className="h-6 w-6 text-green-500" />,
      imageUrl: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=600&auto=format&fit=crop",
      features: [
        translate("Видео или лични срещи", "Video or in-person meetings"),
        translate("Индивидуален подход", "Personalized approach"),
        translate("Последващи материали", "Follow-up materials"),
        translate("Гъвкаво планиране", "Flexible scheduling")
      ],
      cta: translate("Резервирай час", "Book a Session")
    },
    {
      id: "writing",
      title: translate("Писателски Услуги", "Writing Services"),
      description: translate(
        "Професионални услуги за писане, редактиране и консултиране за публикации, книги и други писмени материали.",
        "Professional writing, editing, and consulting services for publications, books, and other written materials."
      ),
      icon: <Pen className="h-6 w-6 text-purple-500" />,
      imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=600&auto=format&fit=crop",
      features: [
        translate("Създаване на съдържание", "Content creation"),
        translate("Редакция и корекция", "Editing and proofreading"),
        translate("Консултация за публикуване", "Publication consultation"),
        translate("Писане по поръчка", "Ghost writing")
      ],
      cta: translate("Запитване", "Inquire")
    }
  ];

  return (
    <section className="bg-background relative pt-16 pb-24" id="services">
      {/* Enhanced background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-1/4 h-1/4 bg-gradient-to-br from-purple-500/5 to-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-amber-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute right-10 top-40 size-60 border border-dashed border-purple-500/10 rounded-full opacity-60 animate-spin-slow"></div>
        <div className="absolute left-10 bottom-40 size-60 border border-dashed border-primary/10 rounded-full opacity-60 animate-spin-slow"></div>
        <div className="absolute left-1/3 top-1/4 opacity-10 dark:opacity-5">
          <Briefcase className="h-20 w-20 text-purple-400" />
        </div>
        <div className="absolute right-1/3 bottom-1/4 opacity-10 dark:opacity-5">
          <Presentation className="h-20 w-20 text-primary" />
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        {/* Modern nested container */}
        <div className="max-w-7xl mx-auto relative">
          {/* Top decorative badge */}
          <motion.div
            className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-full border border-gray-200 dark:border-gray-800 shadow-lg z-10 px-5 py-2"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2">
              <div className="size-1.5 rounded-full bg-purple-500"></div>
              <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
                {translate("Професионални услуги", "Professional services")}
              </div>
              <div className="size-1.5 rounded-full bg-purple-500"></div>
            </div>
          </motion.div>
          
          {/* Main content container with nested card design */}
          <motion.div
            className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-800 shadow-2xl p-0.5 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Decorative top border - gradient line */}
            <div className="absolute top-0 left-10 right-10 h-0.5 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
            
            {/* Main content inner container with gradient outline */}
            <div className="bg-gradient-to-br from-gray-100/50 via-white/50 to-gray-100/50 dark:from-gray-900/50 dark:via-gray-950/50 dark:to-gray-900/50 rounded-lg p-5 sm:p-6 md:p-8 relative overflow-hidden">
              {/* Glass panel effect with inner shadow */}
              <div className="absolute inset-1 bg-white/30 dark:bg-gray-900/30 rounded-lg backdrop-blur-sm shadow-inner pointer-events-none"></div>
              
              {/* Decorative Elements */}
              <div className="absolute top-20 left-20 size-40 bg-purple-500/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 right-20 size-40 bg-primary/5 rounded-full blur-3xl"></div>
              <div className="absolute top-40 right-40 size-60 bg-amber-500/5 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                {/* Section Header */}
                <div className="max-w-3xl mx-auto text-center mb-12 px-4 md:px-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <Badge 
                      variant="outline" 
                      className="mb-4 px-3 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-700/50 inline-flex items-center gap-1.5"
                    >
                      <Briefcase className="h-4 w-4" />
                      <span>{translate("Експертни Решения", "Expert Solutions")}</span>
                    </Badge>
                    
                    <motion.h2 
                      className="text-3xl md:text-4xl font-bold font-playfair mb-5 inline-block bg-gradient-to-r from-purple-800 via-purple-600 to-primary bg-clip-text text-transparent dark:from-purple-400 dark:via-purple-300 dark:to-primary"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                    >
                      {translate("Как Мога Да Помогна", "How I Can Help")}
                    </motion.h2>
                    
                    <motion.div 
                      className="w-16 h-1 bg-gradient-to-r from-purple-500 to-primary rounded-full mx-auto mb-6"
                      initial={{ width: 0, opacity: 0 }}
                      whileInView={{ width: 64, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    ></motion.div>
                    
                    <motion.p 
                      className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      {translate(
                        "Предлагам разнообразни услуги, фокусирани върху личностно развитие, творческо писане и професионални умения за трансформация и израстване.",
                        "I offer a variety of services focused on personal development, creative writing, and professional skills for transformation and growth."
                      )}
                    </motion.p>
                    
                    <motion.p 
                      className="text-sm text-muted-foreground"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      <span className="inline-flex items-center gap-1 text-purple-600 dark:text-purple-400">
                        <Eye className="h-4 w-4" />
                        {translate("Разгледайте всеки раздел за повече информация", "Hover or click on each card to see more details")}
                      </span>
                    </motion.p>
                  </motion.div>
                </div>
                
                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 px-4 md:px-6 lg:px-8">
                  {services.map((service, index) => (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="h-[450px]"
                      whileHover={{ 
                        y: -5,
                        transition: { duration: 0.2 }
                      }}
                    >
                      {/* Subtle background glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-primary/5 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      <FlipCard
                        frontImage={service.imageUrl}
                        frontTitle={service.title}
                        frontSubtitle={service.description.split('.')[0] + '.'}
                        frontIcon={service.icon}
                        backTitle={service.title}
                        backDescription={service.description}
                        backFeatures={service.features}
                        backCta={service.cta}
                        onCtaClick={() => window.location.href = `/services/${service.id}`}
                        popular={service.popular}
                        className="h-full relative z-10"
                      />
                    </motion.div>
                  ))}
                </div>
                
                {/* View All Services CTA */}
                <motion.div 
                  className="flex justify-center mt-16"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <div className="relative group">
                    {/* Button glow effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-primary rounded-full opacity-30 group-hover:opacity-50 blur-md transition-all duration-300 group-hover:blur-lg"></div>
                    
                    <Button
                      variant="outline"
                      size="default"
                      rounded="full"
                      className="relative shadow-md border-2 border-purple-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800"
                      onClick={() => window.location.href = '/services'}
                    >
                      <span className="flex items-center">
                        <span className="mr-2">{translate("Разгледай всички услуги", "View All Services")}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                    </Button>
                  </div>
                </motion.div>
                
                {/* Bottom decorative element */}
                <div className="mt-16 flex justify-center">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-px bg-purple-200 dark:bg-purple-800/30"></div>
                    <div className="text-purple-500 opacity-60">
                      <Sparkle className="h-4 w-4" />
                    </div>
                    <div className="w-12 h-px bg-purple-200 dark:bg-purple-800/30"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Services; 