"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/LanguageContext";
import { ArrowRight, Trophy, User, Clock, Calendar, Package, Star } from "lucide-react";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Component for the diagonal pattern background
const DiagonalPattern = ({
  className,
  patternColor = "hsl(var(--foreground))",
  patternOpacity = 0.15,
}: {
  className?: string;
  patternColor?: string;
  patternOpacity?: number;
}) => {
  const svgPattern = `url("data:image/svg+xml,%3Csvg width='7' height='7' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23${patternColor}' fill-opacity='${patternOpacity}' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`;

  return (
    <div
      className={cn("h-full w-full border-2 border-dashed", className)}
      style={{
        backgroundImage: svgPattern,
      }}
    />
  );
};

// Service Card Component
const ServiceCard = ({ service, delay = 0 }) => {
  const { language } = useLanguage();
  const translate = (bg: string, en: string) => language === 'bg' ? bg : en;
  
  const serviceImage = service?.image || service?.coverImage || '/images/placeholder-service.jpg';
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md border border-primary/10 dark:border-primary/20 w-64 h-[360px] mb-8"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="flex flex-col h-full">
        {/* Service Header */}
        <div className="relative">
          <div className="aspect-[4/3] w-full relative">
            <Image
              src={serviceImage}
              alt={service.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
          </div>
          
          {/* Category Badge */}
          <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1 shadow-md">
            {service.category === 'individual' ? (
              <>
                <User className="h-3 w-3" />
                {translate("Индивидуална", "Individual")}
              </>
            ) : (
              <>
                <Package className="h-3 w-3" />
                {translate("Пакет", "Package")}
              </>
            )}
          </div>
          
          {/* MVP or Popular Badge */}
          {(service.mvp || service.popular) && (
            <div className="absolute top-3 right-3 bg-yellow-500 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1 shadow-md">
              {service.mvp ? (
                <>
                  <Trophy className="h-3 w-3" />
                  {translate("MVP", "MVP")}
                </>
              ) : (
                <>
                  <Star className="h-3 w-3" />
                  {translate("Популярна", "Popular")}
                </>
              )}
            </div>
          )}
          
          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <h3 className="text-base font-bold text-white leading-tight">
              {service.title}
            </h3>
          </div>
        </div>
        
        {/* Service Info */}
        <div className="p-4 flex-grow flex flex-col">
          <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 mb-2">
            <div className="flex items-center gap-1">
              {service.category === 'individual' ? (
                <Clock className="h-3.5 w-3.5" />
              ) : (
                <Calendar className="h-3.5 w-3.5" />
              )}
              <span>{service.duration}</span>
            </div>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-3">
            {service.description}
          </p>
          
          <div className="flex justify-between items-center mt-auto">
            <div className="font-bold text-base text-primary dark:text-primary">
              {service.price.toFixed(2)} лв.
            </div>
            
            <Button
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-md shadow-md hover:shadow-lg transition-all duration-200 text-xs h-8"
              asChild
            >
              <Link href={`/services/${service.id}`} className="flex items-center gap-1">
                {translate("Разгледай", "View")}
                <ArrowRight className="h-3 w-3" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export function FeaturedServices() {
  const { language } = useLanguage();
  const translate = (bg: string, en: string) => language === 'bg' ? bg : en;
  
  // Get MVP services - one individual and one package
  const mvpIndividualService = services.find(service => service.mvp && service.category === 'individual');
  const mvpPackageService = services.find(service => service.mvp && service.category === 'package');
  
  // Get a popular service that is different from the MVP ones
  const popularService = services.find(service => 
    service.popular && 
    service.id !== mvpIndividualService?.id && 
    service.id !== mvpPackageService?.id
  );

  if (!mvpIndividualService || !mvpPackageService) return null;

  return (
    <section className="py-16 md:py-20 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('/images/pattern-light.svg')] dark:bg-[url('/images/pattern-dark.svg')] opacity-5 bg-repeat bg-[length:20px_20px] pointer-events-none"></div>
      
      {/* Header section with border - centered */}
      <div className="border-y relative z-10">
        <div className="container flex flex-col gap-6 border-x py-4 max-lg:border-x lg:py-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <Badge
              variant="outline"
              className="w-fit gap-1 bg-primary/5 text-primary border-primary/20 dark:border-primary/30 px-3 text-sm font-normal tracking-tight shadow-sm"
            >
              <Trophy className="size-4 text-primary" />
              <span className="text-primary dark:text-primary">{translate("Премиум Услуги", "Premium Services")}</span>
            </Badge>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl leading-tight tracking-tight md:text-4xl lg:text-5xl font-bold font-playfair text-center mx-auto max-w-[800px]"
          >
            {translate("Най-Ценни Услуги", "Most Valuable Services")}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="tracking-[-0.32px] text-muted-foreground text-center mx-auto max-w-[600px]"
          >
            {translate(
              "Открийте нашите най-търсени услуги, създадени специално за вас, за да ви помогнат да постигнете вашите цели.",
              "Discover our most sought-after services, specially designed to help you achieve your goals."
            )}
          </motion.p>
        </div>
      </div>

      <div className="container border-x py-8 md:py-12 lg:py-16 relative z-10">
        {/* Add diagonal pattern background for the services section */}
        <div className="absolute inset-0 z-0">
          <DiagonalPattern 
            className="border-primary/30 dark:border-primary/40 rounded-lg" 
            patternColor="var(--primary-hex-code)"
            patternOpacity={0.07}
          />
        </div>
        
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-16 relative z-10">
          {/* MVP Individual Service Card */}
          <ServiceCard service={mvpIndividualService} delay={0} />
          
          {/* MVP Package Service Card */}
          <ServiceCard service={mvpPackageService} delay={0.2} />
          
          {/* Popular Service Card */}
          {popularService && (
            <ServiceCard service={popularService} delay={0.4} />
          )}
        </div>
      </div>
      
      <div className="h-8 w-full border-y md:h-12 lg:h-16 relative z-10">
        <div className="container h-full w-full border-x flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Button
              className="relative overflow-hidden bg-primary text-primary-foreground h-auto px-6 py-2.5 border-2 border-primary/80 dark:border-primary/70 font-medium rounded-xl shadow-md transition-all duration-300 group hover:border-primary hover:bg-primary/90 dark:hover:bg-primary/80"
              asChild
            >
              <Link href="/services" className="flex items-center gap-2 z-10">
                <span className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary dark:from-primary/80 dark:to-primary/90 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                <User className="h-4 w-4 text-primary-foreground relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
                <span className="relative z-10">{translate("Всички услуги", "All services")}</span>
                <ArrowRight className="h-4 w-4 text-primary-foreground relative z-10 transition-all duration-300 group-hover:translate-x-1 group-hover:text-green-100" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 