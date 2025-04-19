"use client";

import React, { useMemo, memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, DollarSign, Quote, ArrowRight, MessageSquare, CalendarIcon, CheckCircle2, ClockIcon, CreditCard, Calendar as CalendarIcon2 } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Service interface matching the type from src/types/index.ts
interface Service {
  id: string;
  title: string;
  description: string;
  duration?: string;
  price?: number;
  category?: string;
  coverImage?: string;
  featured?: boolean;
  mvp?: boolean;
  popular?: boolean;
  includes?: string[];
  relatedBookId?: string;
  image?: string;
  previewUrl?: string;
  badges?: string[];
  highlight?: string;
  benefits?: string[];
  link?: string;
  buttonText?: string;
  date?: string;
}

interface ServiceDetailsDialogProps {
  service: Service;
  translate: (bg: string, en: string) => string;
  isOpen: boolean;
  onClose: () => void;
}

export const ServiceDetailsDialog = memo(({ 
  service, 
  translate, 
  isOpen, 
  onClose 
}: ServiceDetailsDialogProps) => {
  // Don't render anything if no service is provided
  if (!service) return null;
  
  // Service details for display - updated with proper fallbacks
  const details = useMemo(() => [
    {
      icon: <ClockIcon className="h-3 w-3" />,
      label: translate("Продължителност", "Duration"),
      value: `${service.duration || "60"} ${translate("минути", "minutes")}`
    },
    {
      icon: <CalendarIcon className="h-3 w-3" />,
      label: translate("Достъпност", "Availability"),
      value: translate("По заявка", "On request")
    },
    {
      icon: <CreditCard className="h-3 w-3" />,
      label: translate("Цена", "Price"),
      value: service.price 
        ? `${service.price} ${translate("лв.", "BGN")}` 
        : translate("По заявка", "On request")
    }
  ], [translate, service]);
  
  // Service benefits - use from service or fallback
  const benefits = useMemo(() => 
    service.benefits || [
      translate("Персонализиран подход", "Personalized approach"),
      translate("Професионална подкрепа", "Professional support"),
      translate("Проследяване на прогреса", "Progress tracking"),
      translate("Практически съвети", "Practical tips"),
      translate("Постоянна комуникация", "Continuous communication")
    ]
  , [translate, service.benefits]);

  // Service content with proper fallbacks
  const serviceContent = useMemo(() => ({
    title: `${translate("Какво включва услугата", "What the service includes")}`,
    content: service.description || translate(
      "Услугата включва първоначална консултация, в която обсъждаме вашите цели и текущи предизвикателства. След това разработваме персонализиран план за действие, съобразен с вашите специфични нужди.\n\nПрограмата включва редовни сесии за проследяване на прогреса, практически упражнения и техники, които можете да прилагате в ежедневието си, както и постоянна подкрепа между сесиите.",
      "The service includes an initial consultation where we discuss your goals and current challenges. Then we develop a personalized action plan tailored to your specific needs.\n\nThe program includes regular progress tracking sessions, practical exercises and techniques you can apply in your daily life, as well as ongoing support between sessions."
    )
  }), [translate, service.description]);
  
  // Fallback image for services
  const fallbackImage = "/images/services/coaching.jpg";
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-full sm:rounded-xl overflow-hidden p-0 bg-white dark:bg-gray-900 border-none">
        <DialogHeader className="relative h-52 sm:h-64 md:h-72 overflow-hidden flex items-end bg-green-900 dark:bg-green-950">
          {/* Cover image */}
          <div className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-br from-green-800 to-green-950 dark:from-green-900 dark:to-gray-950">
            <Image
              src={service.coverImage || service.image || fallbackImage}
              alt={service.title}
              fill
              className="opacity-50 dark:opacity-30 object-cover object-center blur-[2px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
          </div>
          
          {/* Service info overlay */}
          <div className="relative z-10 flex w-full p-6 text-white">
            <div className="mr-4 w-24 h-36 sm:w-32 sm:h-48 flex-shrink-0 rounded-md overflow-hidden shadow-lg border border-white/30">
              <Image
                src={service.coverImage || service.image || fallbackImage}
                alt={service.title}
                width={128}
                height={192}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-tight">
                {service.title}
              </h2>
              
              <div className="flex flex-wrap gap-2 text-xs text-white/90 mb-3">
                {details.map((detail, index) => (
                  <div key={index} className="flex items-center gap-1 bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded-full">
                    {detail.icon}
                    <span>{detail.value}</span>
                  </div>
                ))}
              </div>
              
              <p className="text-sm text-white/80 mb-4 line-clamp-3">
                {service.description}
              </p>
              
              {service.badges && service.badges.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {service.badges.map((badge, index) => (
                    <span key={index} className="inline-block px-2 py-0.5 bg-green-800/50 border border-green-600/30 backdrop-blur-sm text-green-50 rounded-full text-xs">
                      {badge}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </DialogHeader>
          
        {/* Service content preview */}
        <div className="p-4 max-h-[50vh] overflow-y-auto" style={{ overscrollBehavior: 'contain' }}>
          <div className="bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/30 dark:to-gray-900 rounded-lg p-4 mb-4 relative">
            {/* Quote mark */}
            <div className="absolute top-3 left-3 text-green-300/20 dark:text-green-700/20">
              <Quote className="h-12 w-12" />
            </div>
            
            <div className="relative pl-4">
              {/* Benefits */}
              <div className="pl-3 border-l-2 border-green-500 dark:border-green-600 mb-3">
                <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                  {translate("Ползи от услугата", "Service Benefits")}
                </h3>
                <ul className="space-y-1.5">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-2 text-xs">
                      <CheckCircle2 className="h-3 w-3 text-green-600 dark:text-green-400 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Service title */}
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">
                {serviceContent.title}
              </h3>
            </div>
          </div>
          
          {/* Service description in a nice reading format with optimized rendering */}
          <div 
            className="relative rounded-lg border border-gray-200 dark:border-gray-700 p-3 mb-3 bg-white dark:bg-gray-800 shadow-inner"
          >
            {/* Reading progress indicator */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gray-100 dark:bg-gray-700">
              <div className="h-full w-[85%] bg-green-500 dark:bg-green-600 rounded-r-full"></div>
            </div>
            
            {/* Service content with content-visibility for performance */}
            <div className="prose dark:prose-invert prose-green max-w-none prose-sm mt-3">
              <p className="whitespace-pre-line leading-relaxed text-gray-800 dark:text-gray-200 text-xs">
                {serviceContent.content}
              </p>
            </div>
          </div>
          
          {/* Next appointment availability */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
            <h4 className="font-medium text-sm text-gray-900 dark:text-white mb-2 flex items-center gap-1.5">
              <CalendarIcon2 className="h-4 w-4 text-green-600 dark:text-green-400" />
              {translate("Следващи свободни часове", "Next Available Slots")}
            </h4>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                {date: "21 Юни", time: "14:00", available: true},
                {date: "22 Юни", time: "10:30", available: true},
                {date: "23 Юни", time: "16:15", available: false},
                {date: "24 Юни", time: "09:00", available: true},
                {date: "25 Юни", time: "15:45", available: true},
                {date: "26 Юни", time: "11:30", available: false}
              ].map((slot, index) => (
                <div 
                  key={index}
                  className={`rounded p-2 text-xs border flex items-center justify-between ${
                    slot.available 
                      ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20 cursor-pointer hover:bg-green-100 dark:hover:bg-green-900/30" 
                      : "border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-800/50 opacity-60"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="font-medium">{slot.date}</span>
                    <span className="text-gray-600 dark:text-gray-400">{slot.time}</span>
                  </div>
                  {slot.available && (
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Footer with actions */}
        <DialogFooter className="flex border-t border-gray-100 dark:border-gray-800 p-2 bg-gray-50 dark:bg-gray-800/50">
          <DialogClose asChild>
            <Button variant="outline" size="sm" className="mr-auto h-8 text-xs">
              {translate("Затвори", "Close")}
            </Button>
          </DialogClose>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1 h-8 text-xs">
              <MessageSquare className="h-3.5 w-3.5" />
              {translate("Запитване", "Inquiry")}
            </Button>
            
            <Link
              href={service.link || "#"}
              className="inline-flex items-center justify-center rounded-md px-3 py-1 text-xs font-medium h-8
                bg-gradient-to-r from-green-500 to-teal-500 
                text-white
                border border-green-400/50 dark:border-green-600/30 
                shadow-md hover:shadow-lg transition-all duration-300
                hover:from-green-600 hover:to-teal-600"
            >
              <span>{service.buttonText || translate("Резервирай", "Book Now")}</span>
              <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});

ServiceDetailsDialog.displayName = "ServiceDetailsDialog"; 