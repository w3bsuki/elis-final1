"use client";

import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Eye, Package } from "lucide-react";
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
      
      {/* Updated Section header with larger badge headline */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-3 mb-4 px-6 py-3 
          bg-gradient-to-br from-white/80 to-purple-50/60 dark:from-gray-800/80 dark:to-purple-900/30
          border border-purple-200/50 dark:border-purple-800/30
          rounded-full 
          shadow-[-5px_-5px_10px_rgba(255,255,255,0.8),_5px_5px_10px_rgba(0,0,0,0.1)] 
          dark:shadow-[-2px_-2px_5px_rgba(40,40,40,0.25),_2px_2px_5px_rgba(0,0,0,0.3)]
          backdrop-blur-sm
        ">
          <Briefcase className="w-6 h-6 text-purple-600 dark:text-purple-400" aria-hidden="true" />
          <h2 className="text-xl md:text-2xl font-bold font-serif text-black dark:text-white antialiased">
            {translate("Професионални услуги", "Professional Services")}
          </h2>
        </div>
        
        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-400 rounded-full mx-auto mb-4"></div>
        
        <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto text-sm sm:text-base antialiased">
          {translate(
            "Предлагам разнообразни услуги, фокусирани върху личностно развитие, творческо писане и професионални умения.",
            "I offer a variety of services focused on personal development, creative writing, and professional skills."
          )}
        </p>
        
        {/* Enhanced instruction text with neumorphic badge */}
        <div className="mt-4 flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 dark:bg-purple-900/30 text-sm text-purple-700 dark:text-purple-400 border border-purple-200/50 dark:border-purple-800/30 shadow-sm">
            <Eye className="w-3.5 h-3.5 text-purple-500" />
            {translate(
              "Задръжте върху услуга, за да видите повече детайли",
              "Hover over a service to see more details"
            )}
          </div>
        </div>
      </div>
      
      {/* Enhanced Services Container with nested container styling */}
      <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-800 shadow-lg overflow-hidden mb-8">
        {/* Inner container with gradient and shadow effects */}
        <div className="bg-gradient-to-br from-purple-50/30 via-white/40 to-purple-50/30 dark:from-purple-900/20 dark:via-gray-900/20 dark:to-purple-900/20 p-6 rounded-lg relative">
          {/* Inner shadow effect */}
          <div className="absolute inset-1 bg-white/30 dark:bg-gray-900/30 rounded-lg backdrop-blur-sm shadow-inner pointer-events-none"></div>
          
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
                <div className="h-full relative group">
                  {/* Group hover glow effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-purple-400/0 to-primary/0 rounded-xl opacity-0 group-hover:opacity-100 group-hover:from-purple-400/20 group-hover:to-primary/20 blur-md transition-all duration-500"></div>
                  
                  {/* Inner container with glass effect */}
                  <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl border border-purple-100/50 dark:border-purple-800/30 shadow-lg p-0.5 h-full relative overflow-hidden">
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
          
          {/* Pricing preview - new nested section */}
          <div className="mt-8 pt-4 border-t border-purple-200/30 dark:border-purple-800/30 relative z-10">
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { name: translate("Индивидуална", "Individual"), price: "85", duration: "50 мин." },
                { name: translate("Двойки", "Couples"), price: "120", duration: "90 мин." },
                { name: translate("Арт Терапия", "Art Therapy"), price: "75", duration: "60 мин." }
              ].map((option) => (
                <div 
                  key={option.name}
                  className="px-5 py-3 rounded-lg bg-white/80 dark:bg-gray-800/80 border border-purple-200/50 dark:border-purple-800/30 shadow-sm"
                >
                  <div className="flex flex-col items-center">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{option.name}</span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-xl font-bold text-purple-600 dark:text-purple-400">{option.price}</span>
                      <span className="text-xs text-gray-500">лв. / {option.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* View All Services CTA with enhanced neumorphic button */}
      <div className="flex justify-center mb-4">
        <Link 
          href="/services" 
          className={`
            px-6 py-3 rounded-full 
            flex items-center justify-center gap-2 
            text-purple-700 dark:text-purple-400 font-medium
            bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-800
            shadow-[-5px_-5px_10px_rgba(255,255,255,0.8),_5px_5px_10px_rgba(0,0,0,0.15)] 
            dark:shadow-[-5px_-5px_10px_rgba(40,40,40,0.15),_5px_5px_10px_rgba(0,0,0,0.35)]
            border border-purple-200/50 dark:border-purple-800/30
            transition-all duration-300

            hover:shadow-[-1px_-1px_5px_rgba(255,255,255,0.6),_1px_1px_5px_rgba(0,0,0,0.2),inset_-2px_-2px_5px_rgba(255,255,255,1),inset_2px_2px_4px_rgba(0,0,0,0.15)]
            dark:hover:shadow-[-1px_-1px_5px_rgba(40,40,40,0.2),_1px_1px_5px_rgba(0,0,0,0.3),inset_-2px_-2px_5px_rgba(40,40,40,0.2),inset_2px_2px_4px_rgba(0,0,0,0.3)]
            hover:text-purple-600 dark:hover:text-purple-300
          `}
        >
          {translate("Разгледай всички услуги", "View All Services")}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
} 