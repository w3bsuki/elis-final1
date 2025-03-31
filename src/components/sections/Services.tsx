"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, Clock, Package, User, ChevronRight, Eye, Star, Shield, Sparkles, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Service } from "@/types";

// Import services directly to avoid potential issues with dynamic imports
import { services as allServices, filterServicesByCategory } from "@/data/services";

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

export default function Services() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const { language } = useLanguage();
  
  // Use useEffect to handle the filtering after component mount
  useEffect(() => {
    // Filter services based on active tab
    const services = activeTab === "all" 
      ? allServices 
      : filterServicesByCategory(allServices, activeTab);
    
    setFilteredServices(services || []);
  }, [activeTab]);

  // Get featured services for the hero section
  const featuredServices = allServices.filter(service => service.featured).slice(0, 1);
  
  return (
    <section id="services" className="py-24 bg-gradient-to-b from-green-50 to-white dark:from-green-900/20 dark:to-gray-800 relative overflow-hidden">
      {/* Background gradient elements - enhanced for more subtle effect */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-green-200/20 dark:bg-green-900/20 rounded-full blur-3xl"></div>
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-green-200/20 dark:bg-green-900/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-[10%] left-[30%] w-[40%] h-[40%] bg-green-100/10 dark:bg-green-900/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Modern heading with accent */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <Badge variant="outline" className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800 mb-4">
            <Calendar className="h-3.5 w-3.5 mr-1" />
            {language === 'en' ? 'Exclusive Services' : 'Ексклузивни Услуги'}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold font-playfair mb-4 text-gray-900 dark:text-white">
            <span className="relative inline-block">
              {language === 'en' ? 'All' : 'Всички'}
              <span className="absolute -bottom-2 left-0 w-full h-4 bg-green-300 dark:bg-green-600/60 -z-10 transform -rotate-1 rounded-sm"></span>
            </span>{" "}
            {language === 'en' ? 'Services' : 'Услуги'}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {language === 'en' 
              ? 'Discover our personalized services designed to help you achieve your health and wellness goals.'
              : 'Открийте нашите персонализирани услуги, създадени да ви помогнат да постигнете вашите цели за здраве и благополучие.'}
          </p>
        </div>

        {/* Featured Service Hero Section */}
        {featuredServices.length > 0 && (
          <div className="mb-12 max-w-6xl mx-auto">
            <div className="relative overflow-hidden rounded-2xl border-2 border-black dark:border-gray-700 shadow-[8px_8px_0px_0px_rgba(22,163,74,0.5)] dark:shadow-[8px_8px_0px_0px_rgba(22,163,74,0.3)] bg-white dark:bg-gray-800/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                {/* Image Section */}
                <div className="relative h-64 md:h-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                    <div className="relative z-10 p-8 text-center">
                      <div className="w-20 h-20 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-4">
                        {featuredServices[0]?.category === 'individual' 
                          ? <User className="h-10 w-10 text-white" /> 
                          : <Package className="h-10 w-10 text-white" />}
                      </div>
                      
                      {/* Process the title for the image section */}
                      {(() => {
                        if (!featuredServices[0]) return null;
                        const { mainTitle, tier } = getPackageTier(featuredServices[0].title);
                        return (
                          <>
                            <h3 className="text-xl font-bold text-white mb-2">{mainTitle}</h3>
                            {tier && featuredServices[0].category === 'package' && (
                              <Badge className="bg-white/30 text-white border-0 mb-2">
                                {tier}
                              </Badge>
                            )}
                          </>
                        );
                      })()}
                      
                      <Badge className="bg-yellow-400 text-black border-0">
                        <Star className="h-3 w-3 mr-1" />
                        {language === 'en' ? 'Featured Service' : 'Препоръчана Услуга'}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="p-6 flex flex-col">
                  <div className="mb-3 flex items-center">
                    <Badge className="mr-2 bg-green-100 dark:bg-green-900/70 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800">
                      {featuredServices[0]?.category === 'individual' 
                        ? (language === 'en' ? 'Individual' : 'Индивидуална') 
                        : (language === 'en' ? '' : '')}
                    </Badge>
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{featuredServices[0]?.duration}</span>
                    </div>
                  </div>
                  
                  {/* Improved title styling for featured service */}
                  {(() => {
                    if (!featuredServices[0]) return null;
                    const { mainTitle, tier } = getPackageTier(featuredServices[0].title);
                    return (
                      <div className="mb-3">
                        {tier && featuredServices[0].category === 'package' && (
                          <Badge 
                            variant="outline" 
                            className={`mb-2 px-2.5 py-0.5 text-sm font-medium ${getTierBadgeColor(tier)}`}
                          >
                            {tier}
                          </Badge>
                        )}
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {mainTitle}
                        </h3>
                      </div>
                    );
                  })()}
                  
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {featuredServices[0]?.description}
                  </p>
                  
                  {featuredServices[0]?.category === 'package' && featuredServices[0]?.includes && (
                    <div className="mb-4 bg-gradient-to-r from-green-50 to-green-100/50 dark:from-green-900/20 dark:to-green-900/10 p-3 rounded-lg border border-green-100 dark:border-green-800/30">
                      <h4 className="font-medium text-sm text-green-800 dark:text-green-300 mb-2">
                        {language === 'en' ? 'Includes:' : 'Включва:'}
                      </h4>
                      <ul className="space-y-1.5 text-xs">
                        {featuredServices[0].includes.slice(0, 3).map((item, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                        {featuredServices[0].includes.length > 3 && (
                          <li className="text-green-600 dark:text-green-400 italic text-xs pt-1 pl-4">
                            +{featuredServices[0].includes.length - 3} {language === 'en' ? 'more' : 'още'}
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                  
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-xl font-bold text-green-600 dark:text-green-400">
                      {featuredServices[0]?.price.toFixed(0)}{language === 'en' ? ' BGN' : 'лв'}
                    </span>
                    <div className="flex gap-3">
                      <Button 
                        variant="outline"
                        className="border-green-600 text-green-600 hover:bg-green-50 dark:border-green-500 dark:text-green-500 dark:hover:bg-green-950/30 border-2 border-black dark:border-gray-700 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-300"
                        asChild
                      >
                        <Link href={`/services/${featuredServices[0]?.id}`}>
                          <Eye className="h-4 w-4 mr-1" />
                          {language === 'en' ? 'Details' : 'Детайли'}
                        </Link>
                      </Button>
                      
                      <Button 
                        className="bg-green-600 hover:bg-green-700 text-white border-2 border-black dark:border-gray-700 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-300"
                        asChild
                      >
                        <Link href={`/services/${featuredServices[0]?.id}/book`}>
                          <Calendar className="h-4 w-4 mr-1" />
                          {language === 'en' ? 'Book Now' : 'Запази'}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Service Benefits - more modern style */}
        <div className="mb-16 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800/50 p-6 rounded-xl border-2 border-black dark:border-gray-700 shadow-[5px_5px_0px_0px_rgba(22,163,74,0.3)] dark:shadow-[5px_5px_0px_0px_rgba(22,163,74,0.2)] text-center transform transition-transform duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {language === 'en' ? 'Expert Guidance' : 'Експертно Ръководство'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {language === 'en' 
                  ? 'Personalized advice from certified professionals with years of experience.'
                  : 'Персонализирани съвети от сертифицирани професионалисти с дългогодишен опит.'}
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800/50 p-6 rounded-xl border-2 border-black dark:border-gray-700 shadow-[5px_5px_0px_0px_rgba(22,163,74,0.3)] dark:shadow-[5px_5px_0px_0px_rgba(22,163,74,0.2)] text-center transform transition-transform duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {language === 'en' ? 'Tailored Approach' : 'Индивидуален Подход'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {language === 'en' 
                  ? 'Services customized to your unique needs, goals, and lifestyle.'
                  : 'Услуги, персонализирани според вашите уникални нужди, цели и начин на живот.'}
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800/50 p-6 rounded-xl border-2 border-black dark:border-gray-700 shadow-[5px_5px_0px_0px_rgba(22,163,74,0.3)] dark:shadow-[5px_5px_0px_0px_rgba(22,163,74,0.2)] text-center transform transition-transform duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-full flex items-center justify-center mb-4">
                <Gift className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {language === 'en' ? 'Exclusive Resources' : 'Ексклузивни Ресурси'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {language === 'en' 
                  ? 'Access to premium materials, tools, and support not available elsewhere.'
                  : 'Достъп до премиум материали, инструменти и подкрепа, които не са достъпни другаде.'}
              </p>
            </div>
          </div>
        </div>
        
        {/* Tabs for filtering - more visually appealing */}
        <div className="mb-12">
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <div className="flex justify-center mb-8">
              <TabsList className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-1.5 rounded-full border-2 border-black dark:border-gray-700 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)]">
                <TabsTrigger 
                  value="all" 
                  className="rounded-full px-6 py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:data-[state=active]:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] data-[state=active]:border-2 data-[state=active]:border-black dark:data-[state=active]:border-gray-700 transition-all duration-200 font-medium"
                >
                  {language === 'en' ? 'All Services' : 'Всички Услуги'}
                </TabsTrigger>
                <TabsTrigger 
                  value="individual" 
                  className="rounded-full px-6 py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:data-[state=active]:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] data-[state=active]:border-2 data-[state=active]:border-black dark:data-[state=active]:border-gray-700 transition-all duration-200 font-medium"
                >
                  <User className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'Individual' : 'Индивидуални'}
                </TabsTrigger>
                <TabsTrigger 
                  value="package" 
                  className="rounded-full px-6 py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:data-[state=active]:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] data-[state=active]:border-2 data-[state=active]:border-black dark:data-[state=active]:border-gray-700 transition-all duration-200 font-medium"
                >
                  <Package className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'Packages' : 'Пакети'}
                </TabsTrigger>
              </TabsList>
            </div>
            
            {/* Services grid - improved layout */}
            <TabsContent value={activeTab} className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {Array.isArray(filteredServices) && filteredServices.length > 0 ? (
                  filteredServices.map((service, index) => (
                    <ServiceCard key={service.id} service={service} index={index} />
                  ))
                ) : (
                  <div className="col-span-3 text-center py-12 px-4 bg-gray-50 dark:bg-gray-800/30 rounded-xl border border-gray-200 dark:border-gray-700">
                    <Package className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
                    <p className="text-gray-600 dark:text-gray-400 font-medium">
                      {language === 'en' ? 'No services found in this category.' : 'Не са намерени услуги в тази категория.'}
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Call to action - enhanced style */}
        <div className="text-center mt-16">
          <Button 
            size="lg"
            className="group bg-green-600 hover:bg-green-700 text-white border-2 border-black dark:border-gray-700 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-300 px-8 py-6 h-auto rounded-xl"
            asChild
          >
            <Link href="/services" className="flex items-center text-lg">
              {language === 'en' ? 'View All Services' : 'Вижте Всички Услуги'}
              <ChevronRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

// Service Card Component
function ServiceCard({ service, index }: { service: Service; index: number }) {
  const { language } = useLanguage();
  
  // Function to determine which image to use based on service type
  const getServiceImage = (service: Service) => {
    // Default placeholder images for different categories
    const placeholders = {
      'consultation': '/images/placeholder-service.jpg',
      'meal-plan': '/images/placeholder-service.jpg',
      'basic-package': '/images/placeholder-service.jpg',
      'coaching': '/images/placeholder-service.jpg',
      'therapy': '/images/placeholder-service.jpg',
      'workshop': '/images/placeholder-service.jpg',
      'default': '/images/placeholder-service.jpg'
    };
    
    // Try to use service-specific image if available
    if (service.image) {
      return service.image;
    }
    
    // Check for category-based naming patterns
    if (service.title.toLowerCase().includes('consultation')) {
      return placeholders['consultation'];
    } else if (service.title.toLowerCase().includes('meal') || 
               service.title.toLowerCase().includes('nutrition') ||
               service.title.toLowerCase().includes('diet')) {
      return placeholders['meal-plan'];
    } else if (service.title.toLowerCase().includes('basic') || 
               service.title.toLowerCase().includes('package')) {
      return placeholders['basic-package'];
    } else if (service.title.toLowerCase().includes('coaching')) {
      return placeholders['coaching'];
    } else if (service.title.toLowerCase().includes('therapy')) {
      return placeholders['therapy'];
    } else if (service.title.toLowerCase().includes('workshop')) {
      return placeholders['workshop'];
    }
    
    // If no specific match, return general placeholder based on category
    return placeholders['default'];
  };
  
  // Get image if available
  const serviceImage = getServiceImage(service);
  
  // Get badge color based on service category
  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'individual':
        return "bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-800 dark:text-blue-300";
      case 'package':
        return "bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 text-green-800 dark:text-green-300";
      default:
        return "bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 text-green-800 dark:text-green-300";
    }
  };
  
  // Process the title
  const { mainTitle, tier } = service.category === 'package' ? getPackageTier(service.title) : { mainTitle: service.title, tier: null };
  
  return (
    <div 
      className="flex flex-col h-full group relative overflow-hidden rounded-xl transition-all duration-300 bg-white dark:bg-gray-800/50 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1)] hover:shadow-[0px_4px_16px_rgba(22,163,74,0.15),_0px_8px_24px_rgba(22,163,74,0.15)] dark:shadow-[0px_4px_16px_rgba(0,0,0,0.2)] border-l-4 border-green-500 dark:border-green-600"
    >
      {/* Featured badge if applicable */}
      {service.featured && (
        <div className="absolute top-4 right-4 z-30">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-3 py-1.5 rounded-full shadow-lg font-medium text-xs flex items-center gap-1.5">
            <Star className="h-3 w-3" />
            {language === 'en' ? 'Featured' : 'Препоръчана'}
          </div>
        </div>
      )}
      
      {/* Category badge - top left */}
      <div className="absolute top-4 left-4 z-30">
        <div className={`${getCategoryColor(service.category)} px-3 py-1.5 rounded-full shadow-lg font-medium text-xs flex items-center gap-1.5`}>
          {service.category === 'individual' 
            ? <User className="h-3 w-3 mr-1" />
            : <Package className="h-3 w-3 mr-1" />
          }
          {service.category === 'individual' 
            ? (language === 'en' ? 'Individual' : 'Индивидуална')
            : (language === 'en' ? '' : '')
          }
        </div>
      </div>
      
      {/* Service image area - reduced height to standardize all cards */}
      <div className="relative p-6 pt-14 pb-2 h-[180px] flex items-center justify-center bg-gradient-to-br from-gray-50/50 to-gray-100/50 dark:from-gray-800/30 dark:to-gray-900/30">
        <div className="absolute inset-0 opacity-50 pointer-events-none"></div>
        
        {/* Image or icon container with fixed dimensions */}
        <div className="w-[140px] h-[110px] relative rounded-lg overflow-hidden shadow-[5px_5px_0px_0px_rgba(0,0,0,0.8)] dark:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.2)]">
          {serviceImage ? (
            // If we have an image, display it
            <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 relative overflow-hidden">
              <img 
                src={serviceImage} 
                alt={mainTitle} 
                className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          ) : (
            // Fallback to colored background with icon
            <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
              {service.category === 'individual' 
                ? <User className="h-12 w-12 text-white/90" /> 
                : <Package className="h-12 w-12 text-white/90" />
              }
            </div>
          )}
        </div>
        
        {/* Quick action button */}
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <Button 
            size="icon" 
            variant="secondary" 
            className="h-8 w-8 rounded-full bg-white/95 dark:bg-gray-800/95 shadow-[0px_8px_16px_rgba(0,0,0,0.1)] hover:bg-white dark:hover:bg-gray-800 backdrop-blur-sm text-gray-700 dark:text-gray-300"
            asChild
          >
            <Link href={`/services/${service.id}`} title={language === 'en' ? 'View details' : 'Виж детайли'}>
              <Eye className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Service details - standardized layout for all card types */}
      <div className="flex flex-col flex-grow p-4 backdrop-blur-sm rounded-b-xl bg-gradient-to-b from-white to-gray-50 dark:from-gray-800/80 dark:to-gray-900/80">
        {/* Title section with consistent height */}
        <div className="mb-2 min-h-[50px]">
          {/* Package tier badge */}
          {tier && service.category === 'package' && (
            <Badge 
              variant="outline" 
              className={`mb-1 px-2 py-0.5 text-xs font-medium ${getTierBadgeColor(tier)}`}
            >
              {tier}
            </Badge>
          )}
          
          {/* Title for all services */}
          <h3 className="font-bold text-gray-900 dark:text-white text-base mt-1 line-clamp-2">
            {mainTitle}
          </h3>
        </div>
        
        {/* Info section - price and duration */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-gray-500" />
            <span className="text-xs text-gray-600 dark:text-gray-300">{service.duration}</span>
          </div>
          <span className="font-bold text-base text-green-600 dark:text-green-400">{service.price.toFixed(0)}{language === 'en' ? ' BGN' : 'лв'}</span>
        </div>
        
        {/* Description with fixed height */}
        <p className="text-xs text-gray-600 dark:text-gray-300 mb-2 line-clamp-2 h-[32px]">
          {service.description}
        </p>
        
        {/* Includes list - more compact for packages */}
        {service.category === 'package' && service.includes && (
          <div className="mb-3 bg-gradient-to-r from-green-50 to-green-100/50 dark:from-green-900/20 dark:to-green-900/10 p-2 rounded-lg border border-green-100 dark:border-green-800/30">
            <p className="text-xs font-medium text-green-800 dark:text-green-300 mb-1">
              {language === 'en' ? 'Includes:' : 'Включва:'}
            </p>
            <ul className="text-[11px] text-gray-700 dark:text-gray-300 space-y-0.5">
              {service.includes.slice(0, 2).map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-1 flex-shrink-0">✓</span>
                  <span className="line-clamp-1">{item}</span>
                </li>
              ))}
              {service.includes.length > 2 && (
                <li className="text-green-600 dark:text-green-400 italic text-[11px] pt-0.5 pl-4">
                  +{service.includes.length - 2} {language === 'en' ? 'more items' : 'още услуги'}
                </li>
              )}
            </ul>
          </div>
        )}
        
        {/* Ensure consistent spacing at the bottom with a spacer if not a package */}
        {service.category !== 'package' && (
          <div className="mb-3 h-[65px]"></div>
        )}
        
        {/* Action buttons at the bottom */}
        <div className="flex gap-2 mt-auto">
          <Button 
            variant="outline"
            size="sm"
            className={cn(
              "flex-1 h-8 text-xs border border-black dark:border-gray-700 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-300 rounded-md",
              "border-green-600 text-green-600 hover:bg-green-50 dark:border-green-500 dark:text-green-500 dark:hover:bg-green-950/30"
            )}
            asChild
          >
            <Link href={`/services/${service.id}`}>
              <Eye className="h-3 w-3 mr-1" />
              {language === 'en' ? 'Details' : 'Детайли'}
            </Link>
          </Button>
          
          <Button 
            size="sm"
            className={cn(
              "flex-1 h-8 text-xs border border-black dark:border-gray-700 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-300 rounded-md text-white",
              "bg-green-600 hover:bg-green-700"
            )}
            asChild
          >
            <Link href={`/services/${service.id}/book`} className="flex items-center justify-center">
              <Calendar className="h-3 w-3 mr-1" />
              {language === 'en' ? 'Book Now' : 'Запази'}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 