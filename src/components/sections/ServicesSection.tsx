"use client";

import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Eye, Package, ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FlipCard } from "@/components/ui/flip-card";
import Link from "next/link";

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
    popular: true
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
    popular: false
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
    popular: true
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
    popular: false
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
      <div className="rounded-2xl p-[3px] mb-10
          bg-gradient-to-br from-gray-200/80 via-white/90 to-gray-100/80 
          dark:from-gray-800/80 dark:via-gray-900/90 dark:to-gray-800/80
          shadow-[6px_6px_12px_rgba(0,0,0,0.1),-6px_-6px_12px_rgba(255,255,255,0.9)]
          dark:shadow-[6px_6px_12px_rgba(0,0,0,0.3),-6px_-6px_12px_rgba(30,30,30,0.2)]
          overflow-hidden">
        
        {/* Inner container with gradient and shadow effects */}
        <div className="bg-gradient-to-br from-purple-50/30 via-white/40 to-purple-50/30 dark:from-purple-900/20 dark:via-gray-900/20 dark:to-purple-900/20 p-6 rounded-xl relative">
          {/* Inner shadow effect */}
          <div className="absolute inset-1 bg-white/30 dark:bg-gray-900/30 rounded-lg backdrop-blur-sm shadow-inner pointer-events-none"></div>
          
          {/* Section header - now nested inside the main container */}
          <div className="text-center mb-10 relative z-10">
            {/* Header with icon and title */}
            <div className="flex items-center justify-center gap-3 mb-2">
              {/* Icon with neumorphic style */}
              <div className="rounded-full p-2
                bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/30 dark:to-gray-800
                shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8)]
                dark:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1)]
                border border-purple-100/50 dark:border-purple-800/30 relative">
                <Briefcase className="w-5 h-5 text-purple-600 dark:text-purple-400" aria-hidden="true" />
              </div>
              
              <h2 className="text-xl md:text-2xl font-bold font-serif text-black dark:text-white antialiased relative">
                {translate("Професионални услуги", "Professional Services")}
              </h2>
            </div>
            
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-400 rounded-full mx-auto mb-4"></div>
            
            {/* Description text */}
            <div className="max-w-2xl mx-auto mb-5">
              <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base antialiased">
                {translate(
                  "Предлагам разнообразни услуги, фокусирани върху личностно развитие, творческо писане и професионални умения.",
                  "I offer a variety of services focused on personal development, creative writing, and professional skills."
                )}
              </p>
            </div>
            
            {/* Instruction badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2
              rounded-full bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-800
              text-sm text-purple-700 dark:text-purple-400 
              border border-purple-100/50 dark:border-purple-800/30 
              shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8)]
              dark:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1)]">
              <Eye className="w-3.5 h-3.5 text-purple-500" />
              {translate(
                "Задръжте върху услуга, за да видите повече детайли",
                "Hover over a service to see more details"
              )}
            </div>
          </div>
          
          {/* Services Grid */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {allServices.slice(0, 4).map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-[360px]"
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
              >
                {/* Service Card with enhanced nested container*/}
                <div className="h-full relative group rounded-xl p-[3px]
                    bg-gradient-to-br from-gray-200/60 via-white/70 to-gray-100/60 
                    dark:from-gray-800/60 dark:via-gray-900/70 dark:to-gray-800/60
                    shadow-[4px_4px_8px_rgba(0,0,0,0.1),-4px_-4px_8px_rgba(255,255,255,0.8)]
                    dark:shadow-[4px_4px_8px_rgba(0,0,0,0.3),-4px_-4px_8px_rgba(30,30,30,0.15)]
                    group-hover:shadow-[3px_3px_6px_rgba(0,0,0,0.08),-3px_-3px_6px_rgba(255,255,255,0.7)]
                    dark:group-hover:shadow-[3px_3px_6px_rgba(0,0,0,0.25),-3px_-3px_6px_rgba(30,30,30,0.12)]
                    transition-all duration-300">
                  
                  {/* Group hover glow effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-purple-400/0 to-primary/0 rounded-xl opacity-0 group-hover:opacity-100 group-hover:from-purple-400/20 group-hover:to-primary/20 blur-md transition-all duration-500"></div>
                  
                  {/* Inner container with glass effect */}
                  <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-lg border border-purple-100/50 dark:border-purple-800/30 shadow-inner h-full relative overflow-hidden">
                    {/* Glass panel effect */}
                    <div className="absolute inset-0 bg-white/30 dark:bg-gray-900/30 rounded-lg backdrop-blur-sm shadow-inner pointer-events-none"></div>
                    
                    <FlipCard
                      frontImage={service.coverImage}
                      frontTitle={service.title}
                      frontSubtitle={service.description.split('.')[0] + '.'}
                      frontIcon={<Package className="h-4 w-4" />}
                      backTitle={service.title}
                      backDescription={service.description}
                      backFeatures={service.includes || []}
                      backCta={translate("Научи повече", "Learn More")}
                      onCtaClick={() => window.location.href = `/services/${service.id}`}
                      popular={(service as any).popular}
                      className="h-full relative z-0"
                      triggerMode="hover"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Add header for pricing section with View All Services button */}
          <div className="mt-8 pt-6 border-t border-purple-200/30 dark:border-purple-800/30 relative z-10">
            <div className="mb-4 flex justify-between items-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5
                rounded-full bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-800
                text-sm text-purple-700 dark:text-purple-400 
                border border-purple-100/50 dark:border-purple-800/30 
                shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8)]
                dark:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                <span>{translate("Ценова информация", "Pricing Information")}</span>
              </div>
              
              <Link 
                href="/services" 
                className="px-5 py-2 rounded-full 
                  bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-800
                  text-purple-700 dark:text-purple-400 font-medium
                  border border-purple-100/50 dark:border-purple-800/30 
                  shadow-[3px_3px_6px_rgba(0,0,0,0.1),-3px_-3px_6px_rgba(255,255,255,0.8)]
                  dark:shadow-[3px_3px_6px_rgba(0,0,0,0.3),-3px_-3px_6px_rgba(30,30,30,0.15)]
                  hover:shadow-[1px_1px_3px_rgba(0,0,0,0.05),-1px_-1px_3px_rgba(255,255,255,0.8),inset_1px_1px_3px_rgba(0,0,0,0.05),inset_-1px_-1px_3px_rgba(255,255,255,0.8)]
                  dark:hover:shadow-[1px_1px_3px_rgba(0,0,0,0.2),-1px_-1px_3px_rgba(30,30,30,0.1),inset_1px_1px_3px_rgba(0,0,0,0.1),inset_-1px_-1px_3px_rgba(30,30,30,0.05)]
                  transition-all duration-300 flex items-center gap-2 text-sm"
                >
                {translate("Разгледай всички услуги", "View All Services")}
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { name: translate("Индивидуална", "Individual"), price: "85", duration: "50 мин." },
                { name: translate("Двойки", "Couples"), price: "120", duration: "90 мин." },
                { name: translate("Арт Терапия", "Art Therapy"), price: "75", duration: "60 мин." }
              ].map((option) => (
                <div 
                  key={option.name}
                  className="rounded-xl p-[2px]
                    bg-gradient-to-br from-gray-200/60 via-white/70 to-gray-100/60 
                    dark:from-gray-800/60 dark:via-gray-900/70 dark:to-gray-800/60
                    shadow-[3px_3px_6px_rgba(0,0,0,0.08),-3px_-3px_6px_rgba(255,255,255,0.7)]
                    dark:shadow-[3px_3px_6px_rgba(0,0,0,0.25),-3px_-3px_6px_rgba(30,30,30,0.12)]
                    hover:shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8)]
                    dark:hover:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1)]
                    transition-all duration-300"
                >
                  <div className="px-5 py-3 rounded-lg
                    bg-white/80 dark:bg-gray-800/80
                    backdrop-blur-sm shadow-inner 
                    border border-purple-100/50 dark:border-purple-800/30">
                    <div className="flex flex-col items-center">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{option.name}</span>
                      <div className="flex items-baseline gap-1 mt-1">
                        <span className="text-xl font-bold text-purple-600 dark:text-purple-400">{option.price}</span>
                        <span className="text-xs text-gray-500">лв. / {option.duration}</span>
                      </div>
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