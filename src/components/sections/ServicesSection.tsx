"use client";

import React, { useState } from 'react';
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Eye, Package, ChevronRight, HeartHandshake, Check } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FlipCard } from "@/components/ui/flip-card";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

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
  const { language } = useLanguage();
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  
  // Translate function
  const translate = (bg: string, en: string) => language === 'en' ? en : bg;
  
  return (
    <div className="relative z-0 py-12 md:py-20">
      {/* Decorative background elements */}
      <div className="absolute right-[10%] top-[10%] w-[600px] h-[600px] bg-gradient-to-br from-purple-300/40 via-indigo-200/40 to-blue-300/40 rounded-full blur-[120px] -z-10 animate-pulse-slow"></div>
      <div className="absolute left-[5%] bottom-[20%] w-[500px] h-[500px] bg-gradient-to-tr from-indigo-200/40 via-purple-300/40 to-blue-200/40 rounded-full blur-[120px] -z-10 animate-pulse-slower"></div>
      
      {/* Main container */}
      <div className="w-full h-full flex flex-col rounded-none
          bg-gradient-to-br from-white/85 via-white/90 to-white/85 
          dark:from-gray-900/95 dark:via-gray-900/90 dark:to-gray-900/95
          border border-white/30 dark:border-white/10
          shadow-[0_10px_30px_rgba(0,0,0,0.15)]
          dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)]
          overflow-hidden">
        
        {/* Inner container with enhanced gradients */}
        <div className="bg-gradient-to-br from-purple-50/50 via-transparent to-indigo-50/50 
            dark:from-purple-900/30 dark:via-transparent dark:to-indigo-900/30 
            px-8 py-12 md:py-16 relative flex-grow flex flex-col">
          
          {/* Accent gradients */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.2),transparent_50%)] pointer-events-none"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(79,70,229,0.2),transparent_50%)] pointer-events-none"></div>
          
          {/* Content Container */}
          <div className="relative z-10 max-w-7xl mx-auto w-full">
            {/* Section header */}
            <div className="text-center mb-14 md:mb-20 relative z-10">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex flex-col items-center justify-center"
              >
                {/* Section badge with improved styling */}
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-purple-50 dark:from-purple-900/50 dark:to-purple-900/30 rounded-full mb-5 border border-purple-200/60 dark:border-purple-800/40 shadow-lg backdrop-blur-sm">
                  <Briefcase className="h-4 w-4 text-purple-700 dark:text-purple-300" />
                  <span className="text-sm font-medium text-purple-800 dark:text-purple-200">
                    {language === 'en' ? "Services" : "Услуги"}
                  </span>
                </div>
                
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 
                  bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400
                  bg-clip-text text-transparent drop-shadow-sm">
                  {language === 'en' ? "Professional Services" : "Професионални Услуги"}
                </h2>
                
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  {translate(
                    "Предлагам разнообразни услуги, фокусирани върху личностно развитие, творческо писане и професионални умения.",
                    "I offer a variety of services focused on personal development, creative writing, and professional skills."
                  )}
                </p>
                
                {/* Enhanced instruction badge */}
                <div className="mt-6 flex items-center gap-2 px-5 py-2.5 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-full shadow-md border border-purple-100/60 dark:border-purple-800/40">
                  <Eye className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {translate(
                      "Задръжте върху услуга, за да видите повече детайли",
                      "Hover over a service to see more details"
                    )}
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Services Grid */}
            <motion.div 
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { 
                    staggerChildren: 0.12,
                    delayChildren: 0.1
                  }
                }
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 relative z-10 mb-16"
            >
              {allServices.map((service, index) => (
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
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="h-full group"
                  onMouseEnter={() => setHoveredService(service.id)}
                  onMouseLeave={() => setHoveredService(null)}
                >
                  {/* Card with glass morphism styling */}
                  <div className="rounded-xl overflow-hidden h-[420px]
                    bg-white/50 dark:bg-gray-800/50
                    backdrop-blur-md
                    border border-white/40 dark:border-gray-700/60
                    shadow-[0_15px_30px_rgba(0,0,0,0.1)]
                    dark:shadow-[0_15px_30px_rgba(0,0,0,0.3)]
                    group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] 
                    dark:group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]
                    transition-all duration-500 ease-out relative">
                    
                    {/* Badge repositioned to top-center of the card */}
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30">
                      <div className={cn(
                        "flex items-center gap-2 px-4 py-2",
                        "rounded-full",
                        `bg-gradient-to-r ${service.badge.bgClass}`,
                        service.badge.textClass,
                        "border",
                        service.badge.borderClass,
                        "shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300",
                        "text-sm font-semibold backdrop-blur-sm"
                      )}>
                        {service.badge.icon}
                        <span className="whitespace-nowrap">{translate(service.badge.text.bg, service.badge.text.en)}</span>
                      </div>
                    </div>
                    
                    {/* Front side - visible by default */}
                    <div className="absolute inset-0 p-6 flex flex-col items-center justify-center text-center
                                   bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm
                                   transition-all duration-500 ease-out z-10
                                   group-hover:opacity-0 group-hover:translate-y-[-20px]">
                      
                      {/* Service icon */}
                      <div className="w-20 h-20 rounded-full mb-6 mt-8 
                                    bg-gradient-to-br from-purple-100 to-white dark:from-purple-900/40 dark:to-gray-800/80
                                    flex items-center justify-center shadow-lg border border-purple-100/70 dark:border-purple-800/40">
                        {service.badge.icon}
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                        {service.title}
                      </h3>
                      
                      {/* Price */}
                      <div className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent mb-6">
                        {service.price} лв.
                      </div>
                      
                      {/* Button */}
                      <Button
                        variant="outline"
                        className="rounded-full border-purple-300 dark:border-purple-700/50 text-purple-700 dark:text-purple-400 
                                  hover:bg-purple-50 dark:hover:bg-purple-900/20 mt-4 px-6 shadow-md"
                      >
                        {translate("Детайли", "Details")}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                    
                    {/* Back side - visible on hover */}
                    <div className="absolute inset-0 p-6 flex flex-col 
                                   bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm
                                   transition-all duration-500 ease-out
                                   opacity-0 group-hover:opacity-100 transform translate-y-[20px] group-hover:translate-y-0">
                      
                      {/* Title - adjusted with top margin to avoid badge overlap */}
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 mt-10">
                        {service.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                        {service.description}
                      </p>
                      
                      {/* Features list - adjusted with max-height to prevent overflow */}
                      <div className="mt-2 mb-4">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                          {translate("Включва", "Includes")}:
                        </h4>
                        <ul className="grid grid-cols-1 gap-1.5 max-h-[125px] overflow-y-auto">
                          {service.includes.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <div className="h-5 w-5 rounded-full bg-gradient-to-br from-purple-100 to-white dark:from-purple-900/30 dark:to-gray-800 flex items-center justify-center mt-0.5 flex-shrink-0 shadow-sm border border-purple-100/50 dark:border-purple-800/30">
                                <ChevronRight className="h-3 w-3 text-purple-600 dark:text-purple-400" />
                              </div>
                              <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Footer with price and CTA - adjusted to ensure it's always visible */}
                      <div className="mt-auto pt-3 border-t border-gray-200/50 dark:border-gray-700/50">
                        <div className="flex justify-between items-center">
                          <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">{service.price}</span>
                            <span className="text-gray-600 dark:text-gray-400 text-base">лв.</span>
                          </div>
                          
                          <Link 
                            href={`/services#${service.id}`}
                            className="px-4 py-2 rounded-full 
                              bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700
                              text-white text-sm font-medium 
                              shadow-md hover:shadow-lg transition-all duration-300 transform hover:translate-y-[-2px]
                              border border-purple-500/20"
                          >
                            {translate("Научи повече", "Learn More")}
                            <ArrowRight className="ml-1.5 w-3.5 h-3.5 inline" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Pricing Section */}
            <div className="relative z-10 mt-8 pt-10 border-t border-purple-200/30 dark:border-purple-800/20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Pricing header */}
                <div className="mb-10 flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full p-2.5 bg-gradient-to-br from-purple-400 to-indigo-500 text-white shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                      {translate("Ценова информация", "Pricing Information")}
                    </h3>
                  </div>
                  
                  <Link 
                    href="/services" 
                    className="inline-flex items-center justify-center px-6 py-3 rounded-full 
                      bg-gradient-to-r from-gray-800 via-gray-900 to-black dark:from-gray-900 dark:via-gray-800 dark:to-black
                      text-white font-medium
                      shadow-lg hover:shadow-xl 
                      transition-all duration-300 transform hover:translate-y-[-2px]
                      border border-gray-700/20 dark:border-gray-700/40"
                  >
                    {translate("Разгледай всички услуги", "View All Services")}
                    <ChevronRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
            
                {/* Pricing cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                  {[
                    { name: translate("Индивидуална", "Individual"), price: "85", duration: "50 мин.", icon: "👤", color: "purple" },
                    { name: translate("Двойки", "Couples"), price: "120", duration: "90 мин.", icon: "👥", color: "indigo" },
                    { name: translate("Арт Терапия", "Art Therapy"), price: "75", duration: "60 мин.", icon: "🎨", color: "fuchsia" }
                  ].map((option, index) => (
                    <motion.div 
                      key={option.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 * index + 0.3 }}
                      whileHover={{ y: -10, transition: { duration: 0.3 } }}
                    >
                      <div className={`rounded-xl overflow-hidden
                        bg-white/90 dark:bg-gray-800/90
                        backdrop-blur-md
                        border border-white/40 dark:border-gray-700/60
                        shadow-[0_15px_30px_rgba(0,0,0,0.1)]
                        dark:shadow-[0_15px_30px_rgba(0,0,0,0.3)]
                        transition-all duration-500 ease-out py-8 px-6 text-center`}
                      >
                        {/* Price display */}
                        <div className="mb-4 text-center">
                          <div className={`mx-auto w-16 h-16 rounded-full mb-4 
                                         ${option.color === 'indigo' 
                                         ? 'bg-gradient-to-br from-blue-100 to-white dark:from-blue-900/50 dark:to-gray-800/80'
                                         : option.color === 'fuchsia'
                                           ? 'bg-gradient-to-br from-pink-100 to-white dark:from-pink-900/50 dark:to-gray-800/80'
                                           : `bg-gradient-to-br from-${option.color}-100 to-white dark:from-${option.color}-900/50 dark:to-gray-800/80`}
                                         flex items-center justify-center shadow-lg 
                                         ${option.color === 'indigo'
                                         ? 'border border-blue-100/70 dark:border-blue-700/50'
                                         : option.color === 'fuchsia'
                                           ? 'border border-pink-100/70 dark:border-pink-700/50'
                                           : `border border-${option.color}-100/70 dark:border-${option.color}-800/50`}`}>
                            <span className="text-2xl">{option.icon}</span>
                          </div>
                          <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{option.name}</h4>
                          <div className="flex items-baseline justify-center gap-1 mb-1">
                            <span className={`text-3xl font-bold ${
                              option.color === 'indigo'
                              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400'
                              : option.color === 'fuchsia' 
                                ? 'bg-gradient-to-r from-pink-600 to-purple-600 dark:from-pink-400 dark:to-purple-400'
                                : `bg-gradient-to-r from-${option.color}-600 to-${option.color}-500 dark:from-${option.color}-400 dark:to-${option.color}-500`} 
                              bg-clip-text text-transparent`}>
                              {option.price}
                            </span>
                            <span className="text-gray-600 dark:text-gray-400 text-base">лв.</span>
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">{option.duration}</span>
                        </div>
                        
                        {/* Button - enhanced for all cards */}
                        <Link href="/services" className="block z-10 relative">
                          <Button 
                            className={`w-full rounded-full px-6 py-2 h-auto 
                                      ${option.color === 'indigo'
                                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                                      : option.color === 'fuchsia' 
                                        ? 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700' 
                                        : `bg-gradient-to-r from-${option.color}-600 to-${option.color}-500 hover:from-${option.color}-700 hover:to-${option.color}-600`}
                                      text-white border-0 shadow-md hover:shadow-lg 
                                      transition-all duration-300`}
                          >
                            {translate("Детайли", "Details")}
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              {/* CTA Button - Replaced motion.div with div + CSS transitions for better performance */}
              <div 
                className="mt-14 text-center"
              >
                <Button 
                  asChild
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700
                    text-white font-medium px-8 py-3 h-auto rounded-full shadow-lg hover:shadow-xl
                    transition-all duration-300 transform hover:scale-[1.03] text-lg border-0
                    animate-fade-in-up"
                >
                  <Link href="/booking">
                    {translate("Запази час сега", "Book Appointment Now")}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 