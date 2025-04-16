import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";
import { ArrowRight, Clock, Package, User, Star, Filter, ChevronRight, ChevronLeft } from "lucide-react";
import { services as allServices, filterServicesByCategory } from "@/data/services";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/lib/CartContext";

export function ServicesGrid() {
  const { language } = useLanguage();
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [scrollPosition, setScrollPosition] = useState(0);
  
  const translate = (bg: string, en: string) => language === 'bg' ? bg : en;
  
  // Filter services based on active tab
  const displayedServices = activeTab === "all" 
    ? allServices
    : filterServicesByCategory(allServices, activeTab);

  // Helper function for tier badges
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

  // Scroll handlers for the services carousel
  const scroll = (direction: 'left' | 'right') => {
    const container = document.getElementById('services-container');
    if (!container) return;
    
    const scrollAmount = direction === 'left' ? -350 : 350;
    const newPosition = scrollPosition + scrollAmount;
    
    container.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });
    
    setScrollPosition(newPosition);
  };

  return (
    <section className="py-10 md:py-16 lg:py-24 relative overflow-hidden">
      {/* Background pattern with enhanced gradient overlay */}
      <div className="absolute inset-0 bg-[url('/images/pattern-light.svg')] dark:bg-[url('/images/pattern-dark.svg')] opacity-5 bg-repeat bg-[length:20px_20px] pointer-events-none"></div>
      <div className="absolute right-[5%] top-[10%] w-80 h-80 bg-gradient-to-br from-green-300/10 via-emerald-200/5 to-teal-300/10 rounded-full blur-[80px] -z-10 transform rotate-12"></div>
      <div className="absolute left-[5%] bottom-[10%] w-80 h-80 bg-gradient-to-tr from-emerald-200/10 via-green-300/5 to-teal-200/10 rounded-full blur-[80px] -z-10 transform -rotate-12"></div>
      
      {/* Header section with border */}
      <div className="border-y relative z-10 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="container flex flex-col gap-6 border-x py-6 max-lg:border-x-0 lg:py-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              variant="outline"
              className="w-fit gap-1 bg-gradient-to-r from-green-50 to-white dark:from-green-900/20 dark:to-gray-800 
                px-4 py-2 text-sm font-normal tracking-tight shadow-sm border border-green-100 dark:border-green-800/30
                rounded-full"
            >
              <Package className="size-4 text-green-600 dark:text-green-400" />
              <span className="text-green-600 dark:text-green-400">{translate("Услуги и Консултации", "Services & Consultations")}</span>
            </Badge>
          </motion.div>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <motion.div className="space-y-2 md:space-y-4 max-w-xl">
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl leading-tight tracking-tight md:text-4xl lg:text-5xl font-bold 
                  bg-gradient-to-r from-green-700 to-teal-600 dark:from-green-400 dark:to-teal-400
                  bg-clip-text text-transparent"
              >
                {translate("Персонализирани Услуги", "Personalized Services")}
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="max-w-[600px] text-gray-700 dark:text-gray-300 text-lg"
              >
                {translate(
                  "Открийте моите специализирани услуги и консултации, създадени да ви подкрепят по пътя към по-балансиран и осъзнат начин на живот.",
                  "Discover my specialized services and consultations designed to support you on your journey toward a more balanced and mindful way of living."
                )}
              </motion.p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex-shrink-0"
            >
              <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border shadow-sm 
                  rounded-full p-1">
                  <TabsTrigger value="all" className="text-sm rounded-full data-[state=active]:bg-green-100 data-[state=active]:text-green-700 
                    dark:data-[state=active]:bg-green-900/30 dark:data-[state=active]:text-green-400">
                    {translate("Всички", "All")}
                  </TabsTrigger>
                  <TabsTrigger value="individual" className="text-sm rounded-full data-[state=active]:bg-green-100 data-[state=active]:text-green-700
                    dark:data-[state=active]:bg-green-900/30 dark:data-[state=active]:text-green-400 flex items-center">
                    <User className="h-3.5 w-3.5 mr-1.5" />
                    {translate("Индивидуални", "Individual")}
                  </TabsTrigger>
                  <TabsTrigger value="package" className="text-sm rounded-full data-[state=active]:bg-green-100 data-[state=active]:text-green-700
                    dark:data-[state=active]:bg-green-900/30 dark:data-[state=active]:text-green-400 flex items-center">
                    <Package className="h-3.5 w-3.5 mr-1.5" />
                    {translate("Пакети", "Packages")}
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Services carousel with improved styling */}
      <div className="container relative border-x pb-12 overflow-hidden relative z-10 mt-8 max-lg:border-x-0">
        <div className="relative">
          {/* Navigation Buttons - Enhanced design */}
          <div className="hidden md:flex absolute -left-4 top-1/2 transform -translate-y-1/2 z-20">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full bg-white dark:bg-gray-800 hover:bg-green-50 dark:hover:bg-green-900/20 border-green-200 dark:border-green-800/50 shadow-md h-12 w-12" 
              onClick={() => scroll('left')}
            >
              <ChevronLeft className="h-5 w-5 text-green-600 dark:text-green-400" />
              <span className="sr-only">{translate("Предишни", "Previous")}</span>
            </Button>
          </div>
          
          <div className="hidden md:flex absolute -right-4 top-1/2 transform -translate-y-1/2 z-20">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full bg-white dark:bg-gray-800 hover:bg-green-50 dark:hover:bg-green-900/20 border-green-200 dark:border-green-800/50 shadow-md h-12 w-12"
              onClick={() => scroll('right')}
            >
              <ChevronRight className="h-5 w-5 text-green-600 dark:text-green-400" />
              <span className="sr-only">{translate("Следващи", "Next")}</span>
            </Button>
          </div>
          
          {/* Scroll Container with improved card design */}
          <div 
            id="services-container" 
            className="flex space-x-6 pb-8 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory px-2"
          >
            {displayedServices.map((service, index) => {
              const { mainTitle, tier } = service.category === 'package' 
                ? getPackageTier(service.title) 
                : { mainTitle: service.title, tier: null };
                
              return (
                <motion.div 
                  key={service.id} 
                  className="snap-start flex-shrink-0 w-[300px] sm:w-[320px] bg-white dark:bg-gray-800 rounded-xl 
                    shadow-lg hover:shadow-xl overflow-hidden 
                    border border-gray-200 dark:border-gray-700 
                    hover:border-green-300 dark:hover:border-green-600 
                    flex flex-col transition-all duration-300 transform hover:scale-[1.02]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  {/* Service Header with improved visuals */}
                  <div className="relative h-44 bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
                    {service.image ? (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
                        <Image 
                          src={service.image} 
                          alt={service.title}
                          fill
                          className="object-cover"
                        />
                      </>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/40 dark:to-green-800/40">
                        {service.category === 'individual' ? (
                          <User className="h-16 w-16 text-green-600/50 dark:text-green-400/50" />
                        ) : (
                          <Package className="h-16 w-16 text-green-600/50 dark:text-green-400/50" />
                        )}
                      </div>
                    )}
                    
                    {/* Category Badge with improved styling */}
                    <div className="absolute top-4 left-4 z-20">
                      <Badge className={`px-3 py-1 text-xs font-medium rounded-full shadow-sm ${
                        service.category === 'individual' 
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800/30' 
                          : 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300 border border-green-200 dark:border-green-800/30'
                      }`}>
                        {service.category === 'individual' 
                          ? (language === 'en' ? 'Individual' : 'Индивидуална')
                          : (language === 'en' ? 'Package' : 'Пакет')}
                      </Badge>
                    </div>
                    
                    {/* Featured Badge with improved styling */}
                    {service.featured && (
                      <div className="absolute top-4 right-4 z-20">
                        <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300 
                          border border-yellow-200 dark:border-yellow-800/30 px-3 py-1 rounded-full shadow-sm
                          flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          {language === 'en' ? 'Featured' : 'Популярна'}
                        </Badge>
                      </div>
                    )}
                    
                    {/* Duration with improved styling */}
                    <div className="absolute bottom-4 right-4 z-20 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm 
                      rounded-full px-3 py-1 flex items-center gap-1.5 text-xs font-medium shadow-sm
                      border border-gray-200/50 dark:border-gray-700/50">
                      <Clock className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                      {service.duration}
                    </div>
                  </div>
                  
                  {/* Service Content with improved typography */}
                  <div className="flex-1 flex flex-col p-5">
                    {/* Title with enhanced styling */}
                    <div className="mb-2">
                      {tier && service.category === 'package' && (
                        <Badge 
                          variant="outline" 
                          className={`mb-1.5 text-xs font-medium px-2.5 py-0.5 rounded-full ${getTierBadgeColor(tier)}`}
                        >
                          {tier}
                        </Badge>
                      )}
                      <h3 className="font-bold text-xl tracking-tight line-clamp-2 text-gray-800 dark:text-gray-100">
                        {mainTitle}
                      </h3>
                    </div>
                    
                    {/* Description with improved readability */}
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    
                    {/* Included Items with improved visual design */}
                    {service.category === 'package' && service.includes && service.includes.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                          {language === 'en' ? 'Includes:' : 'Включва:'}
                        </p>
                        <ul className="text-xs space-y-1.5">
                          {service.includes.slice(0, 3).map((item, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <div className="h-4 w-4 rounded-full bg-green-100 dark:bg-green-900/30 
                                flex items-center justify-center mt-0.5 flex-shrink-0">
                                <ChevronRight className="h-2.5 w-2.5 text-green-600 dark:text-green-400" />
                              </div>
                              <span className="text-gray-700 dark:text-gray-300 line-clamp-1">{item}</span>
                            </li>
                          ))}
                          {service.includes.length > 3 && (
                            <li className="text-xs text-gray-500 dark:text-gray-400 italic pl-5">
                              {language === 'en' 
                                ? `+ ${service.includes.length - 3} more...` 
                                : `+ още ${service.includes.length - 3}...`}
                            </li>
                          )}
                        </ul>
                      </div>
                    )}
                    
                    {/* Price & Actions with improved buttons */}
                    <div className="mt-auto pt-3 border-t border-gray-100 dark:border-gray-700">
                      <div className="flex justify-between items-center">
                        <div className="font-bold text-green-600 dark:text-green-400 flex items-baseline gap-1">
                          <span className="text-lg">{service.price?.toFixed(2)}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">лв.</span>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="rounded-full text-xs px-3 h-8 
                              border-gray-300 dark:border-gray-600 
                              text-gray-600 dark:text-gray-300
                              hover:bg-gray-50 dark:hover:bg-gray-800
                              hover:text-gray-900 dark:hover:text-white"
                            asChild
                          >
                            <a href={`/services/${service.id}`}>
                              {language === 'en' ? 'Details' : 'Детайли'}
                            </a>
                          </Button>
                          <Button 
                            variant="default" 
                            size="sm" 
                            className="rounded-full bg-green-600 hover:bg-green-700 
                              text-white shadow-sm hover:shadow-md 
                              transition-all duration-200 text-xs h-8"
                            onClick={() => addToCart({
                              id: service.id,
                              title: service.title,
                              type: 'service',
                              price: service.price || 0,
                              quantity: 1,
                              category: service.category,
                              image: service.image
                            })}
                          >
                            {language === 'en' ? 'Add to Cart' : 'Добави'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
            
            {/* View All card with improved design */}
            <motion.div 
              className="snap-start flex-shrink-0 w-[300px] sm:w-[320px] bg-gradient-to-br from-white to-gray-50 
                dark:from-gray-800 dark:to-gray-900 rounded-xl 
                shadow-lg hover:shadow-xl overflow-hidden 
                border border-gray-200 dark:border-gray-700 
                hover:border-green-300 dark:hover:border-green-600 
                flex flex-col transition-all duration-300 transform hover:scale-[1.02]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center justify-center h-full p-8">
                <div className="text-center space-y-4">
                  <div className="mx-auto bg-green-50 dark:bg-green-900/30 rounded-full p-4 w-16 h-16 
                    flex items-center justify-center border border-green-100 dark:border-green-800/30
                    shadow-inner">
                    <ArrowRight className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-bold text-xl text-gray-800 dark:text-gray-100">
                    {language === 'en' ? 'View All Services' : 'Всички Услуги'}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {language === 'en' 
                      ? 'Explore our complete range of services and packages' 
                      : 'Разгледайте пълната ни гама от услуги и пакети'}
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-2 border-green-600 dark:border-green-500 text-green-600 dark:text-green-400 
                      rounded-full shadow-sm hover:shadow-md 
                      transition-all duration-200 hover:bg-green-50 dark:hover:bg-green-950/50"
                    asChild
                  >
                    <a href="/services">
                      {language === 'en' ? 'Browse All' : 'Разгледай'}
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
            
          </div>
        </div>
        
        {/* Scroll indication for mobile with improved visuals */}
        <div className="flex justify-center mt-4 md:hidden">
          <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2 
            px-4 py-2 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm
            border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
            <ChevronLeft className="h-4 w-4" />
            {translate("Плъзнете за повече", "Swipe for more")}
            <ChevronRight className="h-4 w-4" />
          </div>
        </div>
      </div>
      
      {/* Main CTA with improved design */}
      <div className="container border-x pb-8 flex justify-center relative z-10 mt-8 max-lg:border-x-0">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <Button
            variant="outline"
            className="rounded-full border-2 border-green-600 dark:border-green-500 
              text-green-600 dark:text-green-400 
              hover:bg-green-50 dark:hover:bg-green-950/50
              shadow-sm hover:shadow-md transition-all duration-300"
            asChild
          >
            <a href="/services" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              {translate("Всички услуги", "All Services")}
            </a>
          </Button>
          
          <Button
            className="rounded-full bg-gradient-to-r from-green-600 to-green-500 
              hover:from-green-700 hover:to-green-600 
              text-white shadow-md hover:shadow-lg 
              transition-all duration-300"
            asChild
          >
            <a href="/booking" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {translate("Запази час", "Book Appointment")}
            </a>
          </Button>
        </motion.div>
      </div>

      {/* Footer border */}
      <div className="h-8 w-full border-y md:h-12 lg:h-16 relative z-10 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="container h-full w-full border-x max-lg:border-x-0"></div>
      </div>
    </section>
  );
} 