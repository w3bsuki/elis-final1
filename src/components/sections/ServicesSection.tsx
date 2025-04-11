"use client";

import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Eye, Package, ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FlipCard } from "@/components/ui/flip-card";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Sample services data - would come from API or CMS
const allServices = [
  {
    id: "individual-therapy",
    title: "Индивидуална Терапия",
    description: "Персонализирани сесии, фокусирани върху вашите специфични нужди и цели. Заедно работим за преодоляване на предизвикателства и развитие на стратегии за по-здравословен и удовлетворяващ живот.",
    coverImage: "/images/services/individual-therapy.jpg",
    includes: [
      "50-минутни сесии",
      "Персонализиран подход",
      "Редовна обратна връзка",
      "Практически техники"
    ],
    price: "85",
    popular: true,
    badge: {
      text: { en: "Most Popular", bg: "Най-популярна" },
      icon: <span className="text-lg text-amber-500">⭐</span>,
      bgClass: "from-amber-50 to-white dark:from-amber-900/20 dark:to-gray-800",
      textClass: "text-amber-700 dark:text-amber-400",
      borderClass: "border-amber-100/50 dark:border-amber-800/30"
    }
  },
  {
    id: "couples-therapy",
    title: "Терапия за Двойки",
    description: "Подкрепа за двойки, които искат да подобрят комуникацията, да разрешат конфликти и да задълбочат връзката си. Работим заедно за създаване на по-здрава и по-удовлетворяваща връзка.",
    coverImage: "/images/services/couples-therapy.jpg",
    includes: [
      "90-минутни сесии",
      "Техники за комуникация",
      "Управление на конфликти",
      "Съвместни упражнения"
    ],
    price: "120",
    popular: false,
    badge: {
      text: { en: "Premium", bg: "Премиум" },
      icon: <span className="text-lg text-indigo-500">✦</span>,
      bgClass: "from-indigo-50 to-white dark:from-indigo-900/20 dark:to-gray-800",
      textClass: "text-indigo-700 dark:text-indigo-400",
      borderClass: "border-indigo-100/50 dark:border-indigo-800/30"
    }
  },
  {
    id: "art-therapy",
    title: "Арт Терапия",
    description: "Творчески подход за самоизразяване и изследване на емоции чрез различни арт форми. Не се изисква художествен опит - процесът е насочен към себеоткриване, а не към създаване на изкуство.",
    coverImage: "/images/services/art-therapy.jpg",
    includes: [
      "Включени материали",
      "Кратки упражнения",
      "Подходящо за всички възрасти",
      "Групови сесии"
    ],
    price: "75",
    popular: true,
    badge: {
      text: { en: "Creative", bg: "Креативна" },
      icon: <span className="text-lg text-purple-500">🎨</span>,
      bgClass: "from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-800",
      textClass: "text-purple-700 dark:text-purple-400",
      borderClass: "border-purple-100/50 dark:border-purple-800/30"
    }
  },
  {
    id: "workshops",
    title: "Групови Уъркшопи",
    description: "Интерактивни семинари на различни теми свързани с психичното здраве, личностното развитие и творческо себеизразяване. Възможност за учене, споделяне и израстване в подкрепяща среда.",
    coverImage: "/images/services/workshops.jpg",
    includes: [
      "Малки групи (до 10 човека)",
      "Практически упражнения",
      "Материали и ресурси",
      "Онлайн и присъствено"
    ],
    price: "65",
    popular: false,
    badge: {
      text: { en: "Group", bg: "Групова" },
      icon: <span className="text-lg text-green-500">👥</span>,
      bgClass: "from-green-50 to-white dark:from-green-900/20 dark:to-gray-800",
      textClass: "text-green-700 dark:text-green-400",
      borderClass: "border-green-100/50 dark:border-green-800/30"
    }
  }
];

export default function ServicesSection() {
  const { language } = useLanguage();
  
  // Translate function
  const translate = (bg: string, en: string) => language === 'en' ? en : bg;
  
  return (
    <div className="relative z-0">
      {/* Purple-tinted decorative background element */}
      <div className="absolute right-0 top-8 w-48 h-48 bg-gradient-to-br from-purple-400/10 to-indigo-500/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute left-0 bottom-8 w-48 h-48 bg-gradient-to-tr from-purple-500/10 to-violet-400/5 rounded-full blur-3xl -z-10"></div>
      
      {/* Enhanced Services Container with nested neumorphic styling - now includes header */}
      <div className="rounded-2xl p-[5px] mb-12
          bg-gradient-to-br from-gray-200/80 via-white/90 to-gray-100/80 
          dark:from-gray-800/80 dark:via-gray-900/90 dark:to-gray-800/80
          shadow-[6px_6px_12px_rgba(0,0,0,0.1),-6px_-6px_12px_rgba(255,255,255,0.9)]
          dark:shadow-[6px_6px_12px_rgba(0,0,0,0.3),-6px_-6px_12px_rgba(30,30,30,0.2)]
          overflow-hidden">
        
        {/* Inner container with gradient and shadow effects */}
        <div className="bg-gradient-to-br from-purple-50/30 via-white/40 to-purple-50/30 dark:from-purple-900/20 dark:via-gray-900/20 dark:to-purple-900/20 p-8 rounded-xl relative">
          {/* Inner shadow effect */}
          <div className="absolute inset-1 bg-white/30 dark:bg-gray-900/30 rounded-lg backdrop-blur-sm shadow-inner pointer-events-none"></div>
          
          {/* Section header - now nested inside the main container */}
          <div className="text-center mb-10 relative z-10">
            {/* Enhanced header with special badge styling */}
            <div className="inline-flex flex-col items-center justify-center">
              {/* Main title with badge-like appearance */}
              <div className="relative inline-flex items-center justify-center mb-4">
                {/* Decorative gradient blob behind the title */}
                <div className="absolute -z-10 w-full h-full scale-150 bg-gradient-to-br from-purple-400/20 via-indigo-300/10 to-blue-400/5 dark:from-purple-400/10 dark:via-indigo-300/5 dark:to-blue-400/5 blur-2xl rounded-full"></div>
                
                {/* Badge container */}
                <div className="bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900
                  px-5 py-3 rounded-xl
                  shadow-[4px_4px_10px_rgba(0,0,0,0.1),-4px_-4px_10px_rgba(255,255,255,0.9),inset_1px_1px_1px_rgba(255,255,255,0.8),inset_-1px_-1px_1px_rgba(0,0,0,0.05)]
                  dark:shadow-[4px_4px_10px_rgba(0,0,0,0.3),-4px_-4px_10px_rgba(30,30,30,0.2),inset_1px_1px_1px_rgba(50,50,50,0.1),inset_-1px_-1px_1px_rgba(0,0,0,0.1)]
                  flex items-center gap-3 border border-purple-200/50 dark:border-purple-800/30">
                  
                  {/* Left icon with enhanced styling - smaller */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-indigo-300/20 blur-xl rounded-full"></div>
                    <div className="rounded-full p-2
                      bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/30 dark:to-gray-800
                      shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8),inset_1px_1px_1px_rgba(255,255,255,0.8),inset_-1px_-1px_1px_rgba(0,0,0,0.05)]
                      dark:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1),inset_1px_1px_1px_rgba(50,50,50,0.1),inset_-1px_-1px_1px_rgba(0,0,0,0.1)]
                      border border-purple-100/50 dark:border-purple-800/30 relative">
                      <Briefcase className="w-5 h-5 text-purple-600 dark:text-purple-400" aria-hidden="true" />
                    </div>
                  </div>
                  
                  {/* Title with text color changed to black - smaller */}
                  <div className="flex flex-col items-start">
                    <h2 className="text-xl md:text-2xl font-bold font-serif antialiased relative
                      text-gray-900 dark:text-white">
                      {translate("Професионални услуги", "Professional Services")}
                    </h2>
                    <div className="h-0.5 w-3/4 mx-auto bg-gradient-to-r from-gray-500 to-gray-400 dark:from-gray-400 dark:to-gray-300 rounded-full mt-1"></div>
                  </div>
                </div>
              </div>
              
              {/* Description text */}
              <div className="max-w-2xl mx-auto mb-5">
                <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg antialiased leading-relaxed">
                  {translate(
                    "Предлагам разнообразни услуги, фокусирани върху личностно развитие, творческо писане и професионални умения.",
                    "I offer a variety of services focused on personal development, creative writing, and professional skills."
                  )}
                </p>
              </div>
              
              {/* Enhanced instruction badge with glow effect */}
              <div className="relative inline-flex">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-indigo-300/20 to-purple-400/20 dark:from-purple-400/10 dark:via-indigo-300/10 dark:to-purple-400/10 blur-xl rounded-full -z-10"></div>
                <div className="inline-flex items-center gap-2 px-6 py-2.5
                  rounded-full bg-gradient-to-br from-purple-50 to-white dark:from-gray-800 dark:to-gray-900
                  text-base text-purple-700 dark:text-purple-400 
                  border border-purple-100/50 dark:border-purple-800/30 
                  shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8),inset_1px_1px_1px_rgba(255,255,255,0.8),inset_-1px_-1px_1px_rgba(0,0,0,0.05)]
                  dark:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1),inset_1px_1px_1px_rgba(50,50,50,0.1),inset_-1px_-1px_1px_rgba(0,0,0,0.1)]">
                  <Eye className="w-5 h-5 text-purple-500" />
                  {translate(
                    "Задръжте върху услуга, за да видите повече детайли",
                    "Hover over a service to see more details"
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Services Grid */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {allServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="transform transition-all duration-300 hover:translate-y-[-8px]"
              >
                {/* Service Card with enhanced nested container*/}
                <div className="relative rounded-xl p-[2px] h-full
                    bg-gradient-to-br from-gray-100 via-white to-gray-50
                    dark:from-gray-800 dark:via-gray-900 dark:to-gray-800
                    shadow-lg hover:shadow-xl transition-all duration-300">
                  
                  {/* Inner content */}
                  <div className="bg-white dark:bg-gray-900 rounded-lg p-5 flex flex-col h-full border border-gray-100 dark:border-gray-800 relative">
                    
                    {/* Badge repositioned to top center for better visual balance */}
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <div className={cn(
                        "flex items-center gap-1.5 px-4 py-2",
                        "rounded-full",
                        `bg-gradient-to-r ${service.badge.bgClass}`,
                        service.badge.textClass,
                        "border",
                        service.badge.borderClass,
                        "shadow-md",
                        "text-sm font-medium"
                      )}>
                        {service.badge.icon}
                        <span className="whitespace-nowrap">{translate(service.badge.text.bg, service.badge.text.en)}</span>
                      </div>
                    </div>
                    
                    <div className="mt-5 h-[300px]">
                      <FlipCard
                        frontImage={service.coverImage}
                        frontTitle={service.title}
                        frontIcon={<Package className="h-4 w-4" />}
                        frontFooter={service.price + " лв."}
                        backTitle={service.title}
                        backDescription={service.description}
                        backFeatures={service.includes || []}
                        backCta={translate("Научи повече", "Learn More")}
                        onCtaClick={() => window.location.href = `/shop/services/${service.id}`}
                        className="h-full"
                        triggerMode="hover"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Add header for pricing section with View All Services button */}
          <div className="mt-12 pt-6 border-t border-purple-200/30 dark:border-purple-800/30 relative z-10">
            <div className="mb-6 flex justify-between items-center">
              <div className="inline-flex items-center gap-2 px-4 py-2
                rounded-full bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-800
                text-base text-purple-700 dark:text-purple-400 
                border border-purple-100/50 dark:border-purple-800/30 
                shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8)]
                dark:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                <span className="font-medium">{translate("Ценова информация", "Pricing Information")}</span>
              </div>
              
              <Link 
                href="/shop?category=services" 
                className="px-5 py-2 rounded-full 
                  bg-gradient-to-br from-gray-800 to-black dark:from-gray-900 dark:to-black
                  text-white font-medium 
                  border border-gray-700 dark:border-gray-800 
                  shadow-[2px_2px_4px_rgba(0,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.8)]
                  dark:shadow-[2px_2px_4px_rgba(0,0,0,0.3),-2px_-2px_4px_rgba(30,30,30,0.15)]
                  hover:shadow-[1px_1px_2px_rgba(0,0,0,0.05),-1px_-1px_2px_rgba(255,255,255,0.8),inset_1px_1px_2px_rgba(0,0,0,0.05),inset_-1px_-1px_2px_rgba(255,255,255,0.8)]
                  dark:hover:shadow-[1px_1px_2px_rgba(0,0,0,0.2),-1px_-1px_2px_rgba(30,30,30,0.1),inset_1px_1px_2px_rgba(0,0,0,0.1),inset_-1px_-1px_2px_rgba(30,30,30,0.05)]
                  transition-all duration-300 flex items-center gap-1.5"
                >
                {translate("Разгледай всички услуги", "View All Services")}
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            
            {/* Pricing cards with improved styling */}
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { name: translate("Индивидуална", "Individual"), price: "85", duration: "50 мин." },
                { name: translate("Двойки", "Couples"), price: "120", duration: "90 мин." },
                { name: translate("Арт Терапия", "Art Therapy"), price: "75", duration: "60 мин." }
              ].map((option, index) => (
                <div 
                  key={option.name}
                  className="rounded-xl p-[2px] flex-1 max-w-[200px]
                    bg-gradient-to-br from-gray-100 via-white to-gray-50 
                    dark:from-gray-800 dark:via-gray-900 dark:to-gray-800
                    shadow-lg hover:shadow-xl transform transition-all duration-300 hover:translate-y-[-4px]"
                >
                  <div className="px-6 py-4 rounded-lg
                    bg-white dark:bg-gray-900
                    shadow-inner 
                    border border-gray-100 dark:border-gray-800">
                    <div className="flex flex-col items-center">
                      <span className="text-base font-medium text-gray-800 dark:text-gray-200 mb-2">{option.name}</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">{option.price}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">лв.</span>
                      </div>
                      <span className="text-xs text-gray-500 mt-1">{option.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 