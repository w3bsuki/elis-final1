"use client";

import React, { useState, useEffect, useRef, memo, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Briefcase, Eye, Package, ChevronRight, HeartHandshake, Check } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FlipCard } from "@/components/ui/flip-card";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';
import { ServiceDetailsDialog } from '@/components/ui/service-details-dialog';

// Fix the decorative background elements
const BackgroundDecorations = () => (
  <>
    <div 
      className="absolute right-[10%] top-[10%] w-[400px] h-[400px] 
        bg-gradient-to-br from-purple-300/40 via-indigo-200/40 to-blue-300/40 
        rounded-full blur-[120px] -z-10"
    />
    <div 
      className="absolute left-[5%] bottom-[20%] w-[300px] h-[300px] 
        bg-gradient-to-tr from-indigo-200/40 via-purple-300/40 to-blue-200/40 
        rounded-full blur-[120px] -z-10"
    />
  </>
);

// Sample services data - would come from API or CMS
const allServices = [
  {
    id: "individual-therapy",
    title: "Индивидуална",
    description: "Персонализирани сесии, фокусирани върху вашите специфични нужди и цели. Заедно работим за преодоляване на предизвикателства и развитие на стратегии за по-здравословен и удовлетворяващ живот.",
    coverImage: "/images/services/therapy.jpg",
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
    coverImage: "/images/services/therapy.jpg",
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
    description: "Творчески подход за изследване на емоции чрез различни арт форми. Не се изисква художествен опит - процесът е насочен към себеоткриване.",
    coverImage: "/images/services/coaching.jpg",
    includes: [
      "Включени арт материали",
      "Творчески техники",
      "За всички възрасти",
      "Седмични сесии"
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
    coverImage: "/images/services/workshop.jpg",
    includes: [
      "Малки групи до 10 души",
      "Практически упражнения",
      "Онлайн и присъствено",
      "Сертификат за участие"
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
  // Monitor performance
  usePerformanceMonitor('ServicesSection');
  
  const { language } = useLanguage();
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  
  // Add dialog state
  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Translate function - memoized
  const translate = useCallback((bg: string, en: string) => language === 'en' ? en : bg, [language]);
  
  // Handle opening service details dialog
  const handleOpenServiceDialog = useCallback((service: any) => {
    setSelectedService(service);
    setDialogOpen(true);
  }, []);
  
  // Container ref for visibility detection
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Memoize the service cards for better performance
  const renderServiceCards = useCallback(() => {
    return allServices.map((service, index) => (
      <motion.div 
        key={service.id}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { 
              type: "spring", 
              stiffness: 80, 
              damping: 12,
              mass: 0.5 
            }
          }
        }}
        className="h-full group"
        onMouseEnter={() => setHoveredService(service.id)}
        onMouseLeave={() => setHoveredService(null)}
      >
        {/* Card with glass morphism styling */}
        <div className="rounded-xl overflow-hidden h-[380px]
          bg-white/50 dark:bg-gray-800/50
          backdrop-blur-md
          border border-white/40 dark:border-gray-700/60
          shadow-[0_10px_20px_rgba(0,0,0,0.1)]
          dark:shadow-[0_10px_20px_rgba(0,0,0,0.3)]
          group-hover:shadow-[0_15px_30px_rgba(0,0,0,0.15)] 
          dark:group-hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)]
          transition-all duration-500 ease-out relative">
          
          {/* Badge positioned correctly inside the card */}
          <div className="absolute top-3 right-3 z-20">
            <div className={cn(
              "flex items-center gap-1.5 px-2.5 py-1",
              "rounded-full",
              `bg-gradient-to-r ${service.badge.bgClass}`,
              service.badge.textClass,
              "border",
              service.badge.borderClass,
              "shadow-md text-xs font-semibold backdrop-blur-sm"
            )}>
              {service.badge.icon}
              <span className="whitespace-nowrap">{translate(service.badge.text.bg, service.badge.text.en)}</span>
            </div>
          </div>
          
          {/* Service image with overlay on hover */}
          <div className="relative h-full w-full overflow-hidden">
            {/* Image */}
            <div className="absolute inset-0 z-0 transition-transform duration-700 ease-out group-hover:scale-105">
              <Image
                src={service.coverImage}
                alt={service.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
            </div>
            
            {/* Info overlay (always visible at bottom) */}
            <div className="absolute bottom-0 left-0 right-0 p-4 z-10 flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <div className="p-1.5 rounded-full bg-white/20 backdrop-blur-sm">
                  <Briefcase className="h-3.5 w-3.5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  {service.title}
                </h3>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-base font-semibold text-white">{service.price} лв.</span>
              </div>
            </div>
            
            {/* Hover content overlay */}
            <div className={`absolute inset-0 bg-white/95 dark:bg-gray-800/95 p-5 flex flex-col backdrop-blur-md
                          transition-all duration-300 ease-in-out z-10
                          ${hoveredService === service.id ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-300/40 via-indigo-200/30 to-transparent dark:from-purple-700/40 dark:via-indigo-800/30 rounded-bl-3xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-300/40 via-indigo-200/30 to-transparent dark:from-purple-700/40 dark:via-indigo-800/30 rounded-tr-3xl" />
              
              {/* Service info section */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {service.title}
              </h3>
              
              {/* Description */}
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                {service.description}
              </p>
              
              {/* Features list */}
              <div className="flex-1 mb-4 overflow-y-auto custom-scrollbar">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  {translate("Включва", "Includes")}:
                </h4>
                <ul className="space-y-1.5">
                  {service.includes.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Action button */}
              <div className="mt-auto pt-3 border-t border-gray-200/50 dark:border-gray-700/50">
                <div className="flex justify-between items-center">
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">{service.price} лв.</span>
                  </div>
                  
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleOpenServiceDialog({
                        id: service.id,
                        title: service.title,
                        description: service.description,
                        coverImage: service.coverImage,
                        price: parseFloat(service.price),
                        duration: "60",
                        category: "service",
                        badges: service.includes,
                        benefits: service.includes
                      });
                    }}
                    className="py-2 px-3 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 
                      hover:from-purple-600 hover:to-indigo-600 text-white text-sm font-medium 
                      transition-all duration-300 shadow-md hover:shadow-lg transform hover:translate-y-[-1px]
                      cursor-pointer"
                  >
                    {translate("Детайли", "Details")}
                    <ArrowRight className="ml-1 h-3 w-3 inline" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    ));
  }, [hoveredService, translate, handleOpenServiceDialog]);
  
  return (
    <div className="relative z-0 py-6 md:py-8" ref={containerRef}>
      <BackgroundDecorations />
      
      {/* Main container */}
      <div className="w-full h-full flex flex-col rounded-xl sm:rounded-2xl
          bg-gradient-to-br from-white/80 via-white/90 to-white/80 
          dark:from-gray-900/80 dark:via-gray-900/85 dark:to-gray-900/80
          border border-white/40 dark:border-white/10
          shadow-[0_15px_40px_-10px_rgba(0,0,0,0.25)]
          dark:shadow-[0_15px_40px_-10px_rgba(0,0,0,0.5)]
          overflow-hidden
          max-w-[1600px] mx-auto">
        
        {/* Inner container with enhanced gradients */}
        <div className="bg-gradient-to-br from-purple-50/40 via-transparent to-indigo-50/40 
            dark:from-purple-900/20 dark:via-transparent dark:to-indigo-900/20 
            px-3 sm:px-4 md:px-5 lg:px-6 py-4 md:py-5 lg:py-6 relative flex-grow flex flex-col">
          
          {/* Replace radial gradients with simpler accent boxes for better performance */}
          <div className="absolute top-[20%] left-[30%] w-[300px] h-[300px] rounded-full bg-purple-300/10 dark:bg-purple-900/10 blur-[80px] pointer-events-none"></div>
          <div className="absolute bottom-[30%] right-[20%] w-[250px] h-[250px] rounded-full bg-indigo-300/10 dark:bg-indigo-900/10 blur-[60px] pointer-events-none"></div>
          
          {/* Content Container */}
          <div className="relative z-10 w-full">
            {/* Section header - matching Books section style */}
            <div className="text-center mb-4 md:mb-5 relative z-10">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex flex-col items-center justify-center"
              >
                {/* Section badge with improved styling - matched to Books section */}
                <div className="flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-purple-100 to-purple-50 dark:from-purple-900/50 dark:to-purple-900/30 rounded-full mb-3 border border-purple-200/60 dark:border-purple-800/40 shadow-md backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
                  <Briefcase className="h-4.5 w-4.5 text-purple-700 dark:text-purple-300" />
                  <span className="text-sm font-medium text-purple-800 dark:text-purple-200">
                    {language === 'en' ? "Services" : "Услуги"}
                  </span>
                </div>
                
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 
                  bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400
                  bg-clip-text text-transparent drop-shadow-sm">
                  {language === 'en' ? "Professional Services" : "Професионални Услуги"}
                </h2>
                
                <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  {translate(
                    "Предлагам разнообразни услуги, фокусирани върху личностно развитие, творческо писане и професионални умения.",
                    "I offer a variety of services focused on personal development, creative writing, and professional skills."
                  )}
                </p>
              </motion.div>
            </div>

            {/* Services Grid */}
            <motion.div 
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { 
                    staggerChildren: 0.08, // Reduced for better performance
                    delayChildren: 0.1
                  }
                }
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }} // Increased margin for earlier loading
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 relative z-10 mb-5 md:mb-6"
            >
              {renderServiceCards()}
            </motion.div>
            
            {/* Pricing Section with optimized animations */}
            <div className="relative z-10 mt-6 pt-8 border-t border-purple-200/30 dark:border-purple-800/20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Pricing header - made more compact like Books section */}
                <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full p-2 bg-gradient-to-br from-purple-400 to-indigo-500 text-white shadow-md">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                      {translate("Ценова информация", "Pricing Information")}
                    </h3>
                  </div>
                  
                  <Link 
                    href="/services" 
                    className="inline-flex items-center justify-center px-4 py-2 rounded-full
                      bg-gradient-to-r from-gray-800 via-gray-900 to-black dark:from-gray-900 dark:via-gray-800 dark:to-black
                      text-white text-sm font-medium
                      shadow-md hover:shadow-lg transition-all duration-300 transform hover:translate-y-[-1px]
                      border border-gray-700/20 dark:border-gray-700/40"
                  >
                    {translate("Разгледай всички услуги", "View All Services")}
                    <ChevronRight className="ml-1 w-3.5 h-3.5" />
                  </Link>
                </div>
            
                {/* Pricing cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {[
                    { 
                      id: "individual",
                      name: translate("Индивидуална", "Individual"), 
                      price: "85", 
                      duration: "50 мин.", 
                      icon: "👤", 
                      color: "purple",
                      description: "Персонализирани сесии, фокусирани върху вашите специфични нужди и цели."
                    },
                    { 
                      id: "couples",
                      name: translate("Двойки", "Couples"), 
                      price: "120", 
                      duration: "90 мин.", 
                      icon: "👥", 
                      color: "indigo",
                      description: "Подкрепа за двойки, които искат да подобрят комуникацията и да разрешат конфликти."
                    },
                    { 
                      id: "art-therapy",
                      name: translate("Арт Терапия", "Art Therapy"), 
                      price: "75", 
                      duration: "60 мин.", 
                      icon: "🎨", 
                      color: "fuchsia",
                      description: "Творчески подход за изследване на емоции чрез различни арт форми."
                    }
                  ].map((option, index) => (
                    <motion.div 
                      key={option.name}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { 
                          opacity: 1, 
                          y: 0,
                          transition: { 
                            type: "spring", 
                            stiffness: 80, 
                            damping: 12,
                            delay: 0.1 * index 
                          }
                        }
                      }}
                    >
                      <div className={`rounded-xl overflow-hidden
                        bg-white/90 dark:bg-gray-800/90
                        backdrop-blur-md
                        border border-white/40 dark:border-gray-700/60
                        shadow-[0_10px_20px_rgba(0,0,0,0.1)]
                        dark:shadow-[0_10px_20px_rgba(0,0,0,0.3)]
                        transition-all duration-300 ease-out py-6 px-4 text-center`}
                      >
                        {/* Price display */}
                        <div className="mb-4 text-center">
                          <div className={`mx-auto w-12 h-12 rounded-full mb-3 
                                         ${option.color === 'indigo' 
                                         ? 'bg-gradient-to-br from-blue-100 to-white dark:from-blue-900/50 dark:to-gray-800/80'
                                         : option.color === 'fuchsia'
                                           ? 'bg-gradient-to-br from-pink-100 to-white dark:from-pink-900/50 dark:to-gray-800/80'
                                           : `bg-gradient-to-br from-${option.color}-100 to-white dark:from-${option.color}-900/50 dark:to-gray-800/80`}
                                         flex items-center justify-center shadow-md 
                                         ${option.color === 'indigo'
                                         ? 'border border-blue-100/70 dark:border-blue-700/50'
                                         : option.color === 'fuchsia'
                                           ? 'border border-pink-100/70 dark:border-pink-700/50'
                                           : `border border-${option.color}-100/70 dark:border-${option.color}-800/50`}`}>
                            <span className="text-xl">{option.icon}</span>
                          </div>
                          <h4 className="text-base font-bold text-gray-900 dark:text-white mb-1">{option.name}</h4>
                          <div className="flex items-baseline justify-center gap-1 mb-1">
                            <span className={`text-2xl font-bold ${
                              option.color === 'indigo'
                              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400'
                              : option.color === 'fuchsia' 
                                ? 'bg-gradient-to-r from-pink-600 to-purple-600 dark:from-pink-400 dark:to-purple-400'
                                : `bg-gradient-to-r from-${option.color}-600 to-${option.color}-500 dark:from-${option.color}-400 dark:to-${option.color}-500`} 
                              bg-clip-text text-transparent`}>
                              {option.price}
                            </span>
                            <span className="text-gray-600 dark:text-gray-400 text-sm">лв.</span>
                          </div>
                          <span className="text-xs text-gray-600 dark:text-gray-400">{option.duration}</span>
                        </div>
                        
                        {/* Button - standardized to match Books section */}
                        <Button 
                          onClick={() => handleOpenServiceDialog({
                            id: option.id,
                            title: option.name,
                            description: option.description,
                            coverImage: `/images/services/${option.id}.jpg`,
                            price: parseFloat(option.price),
                            duration: option.duration,
                            category: "service",
                            badges: [translate("Сесия", "Session"), translate("Професионална", "Professional")],
                            benefits: [
                              translate("Персонализиран подход", "Personalized approach"),
                              translate("Професионална подкрепа", "Professional support"),
                              translate("Проследяване на прогреса", "Progress tracking")
                            ]
                          })}
                          className={`w-full rounded-lg px-4 py-2 h-8 text-xs cursor-pointer
                                    ${option.color === 'indigo'
                                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                                    : option.color === 'fuchsia' 
                                      ? 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700' 
                                      : `bg-gradient-to-r from-${option.color}-600 to-${option.color}-500 hover:from-${option.color}-700 hover:to-${option.color}-600`}
                                    text-white border-0 shadow-md hover:shadow-lg 
                                    transition-all duration-300`}
                        >
                          {translate("Детайли", "Details")}
                          <ArrowRight className="ml-1 w-3 h-3" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              {/* CTA Button - standardized to match Books section */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="flex justify-center mt-8"
              >
                <Link 
                  href="/booking"
                  className="group relative px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium text-sm shadow-md 
                    hover:shadow-lg transition-all duration-300 overflow-hidden flex items-center gap-2"
                >
                  <span className="relative z-10">{translate("Запази час сега", "Book Appointment Now")}</span>
                  <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add dialog to the component */}
      <ServiceDetailsDialog
        service={selectedService}
        translate={translate}
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </div>
  );
} 