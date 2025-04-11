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
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('/images/pattern-light.svg')] dark:bg-[url('/images/pattern-dark.svg')] opacity-5 bg-repeat bg-[length:20px_20px] pointer-events-none"></div>
      
      {/* Header section with border */}
      <div className="border-y relative z-10">
        <div className="container flex flex-col gap-6 border-x py-4 max-lg:border-x lg:py-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              variant="outline"
              className="w-fit gap-1 bg-card px-3 text-sm font-normal tracking-tight shadow-sm"
            >
              <Package className="size-4 text-green-600" />
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
                className="text-3xl leading-tight tracking-tight md:text-4xl lg:text-5xl font-bold font-playfair"
              >
                {translate("Персонализирани Услуги", "Personalized Services")}
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="max-w-[600px] tracking-[-0.32px] text-muted-foreground"
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
            >
              <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="bg-card border shadow-sm mb-2">
                  <TabsTrigger value="all" className="text-sm">
                    {translate("Всички", "All")}
                  </TabsTrigger>
                  <TabsTrigger value="individual" className="text-sm">
                    <User className="h-3.5 w-3.5 mr-1.5" />
                    {translate("Индивидуални", "Individual")}
                  </TabsTrigger>
                  <TabsTrigger value="package" className="text-sm">
                    <Package className="h-3.5 w-3.5 mr-1.5" />
                    {translate("Пакети", "Packages")}
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Services carousel */}
      <div className="container relative border-x pb-16 overflow-hidden relative z-10 mt-8">
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="hidden md:flex absolute -left-4 top-1/2 transform -translate-y-1/2 z-20">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full bg-white dark:bg-gray-800 shadow-md" 
              onClick={() => scroll('left')}
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">{translate("Предишни", "Previous")}</span>
            </Button>
          </div>
          
          <div className="hidden md:flex absolute -right-4 top-1/2 transform -translate-y-1/2 z-20">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full bg-white dark:bg-gray-800 shadow-md" 
              onClick={() => scroll('right')}
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">{translate("Следващи", "Next")}</span>
            </Button>
          </div>
          
          {/* Scroll Container */}
          <div 
            id="services-container" 
            className="flex space-x-6 pb-8 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory"
          >
            {displayedServices.map((service, index) => {
              const { mainTitle, tier } = service.category === 'package' 
                ? getPackageTier(service.title) 
                : { mainTitle: service.title, tier: null };
                
              return (
                <motion.div 
                  key={service.id} 
                  className="snap-start flex-shrink-0 w-[320px] bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600 flex flex-col transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  {/* Service Header */}
                  <div className="relative h-44 bg-gray-100 dark:bg-gray-700 overflow-hidden">
                    {service.image ? (
                      <Image 
                        src={service.image} 
                        alt={service.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/40 dark:to-green-800/40">
                        {service.category === 'individual' ? (
                          <User className="h-16 w-16 text-green-600/50 dark:text-green-400/50" />
                        ) : (
                          <Package className="h-16 w-16 text-green-600/50 dark:text-green-400/50" />
                        )}
                      </div>
                    )}
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge className={`px-2 py-1 text-xs font-medium ${
                        service.category === 'individual' 
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300' 
                          : 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300'
                      }`}>
                        {service.category === 'individual' 
                          ? (language === 'en' ? 'Individual' : 'Индивидуална')
                          : (language === 'en' ? 'Package' : 'Пакет')}
                      </Badge>
                    </div>
                    
                    {/* Featured Badge */}
                    {service.featured && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300 px-2 py-1 flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          {language === 'en' ? 'Featured' : 'Популярна'}
                        </Badge>
                      </div>
                    )}
                    
                    {/* Duration */}
                    <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center gap-1.5 text-xs font-medium shadow-sm">
                      <Clock className="h-3 w-3 text-green-600 dark:text-green-400" />
                      {service.duration}
                    </div>
                  </div>
                  
                  {/* Service Content */}
                  <div className="flex-1 flex flex-col p-5">
                    {/* Title */}
                    <div className="mb-2">
                      {tier && service.category === 'package' && (
                        <Badge 
                          variant="outline" 
                          className={`mb-1.5 text-xs font-medium ${getTierBadgeColor(tier)}`}
                        >
                          {tier}
                        </Badge>
                      )}
                      <h3 className="font-bold text-xl tracking-tight line-clamp-2">
                        {mainTitle}
                      </h3>
                    </div>
                    
                    {/* Description */}
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
                      {service.description}
                    </p>
                    
                    {/* Included Items (if package) */}
                    {service.category === 'package' && service.includes && service.includes.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                          {language === 'en' ? 'Includes:' : 'Включва:'}
                        </p>
                        <ul className="text-xs space-y-1">
                          {service.includes.slice(0, 3).map((item, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-green-600 dark:text-green-400 font-bold leading-5">✓</span>
                              <span className="text-gray-700 dark:text-gray-300 line-clamp-1">{item}</span>
                            </li>
                          ))}
                          {service.includes.length > 3 && (
                            <li className="text-xs text-gray-500 dark:text-gray-400 italic">
                              {language === 'en' 
                                ? `+ ${service.includes.length - 3} more...` 
                                : `+ още ${service.includes.length - 3}...`}
                            </li>
                          )}
                        </ul>
                      </div>
                    )}
                    
                    {/* Price & Actions */}
                    <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                      <div className="font-bold text-green-600 dark:text-green-400">
                        {service.price?.toFixed(2)} лв.
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="rounded-md text-xs px-3 h-8 border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800"
                          asChild
                        >
                          <a href={`/services/${service.id}`}>
                            {language === 'en' ? 'Details' : 'Детайли'}
                          </a>
                        </Button>
                        <Button 
                          variant="default" 
                          size="sm" 
                          className="rounded-md bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg transition-all duration-200 text-xs h-8"
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
                          {language === 'en' ? 'Add' : 'Добави'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
            
            {/* Add View All card at the end */}
            <motion.div 
              className="snap-start flex-shrink-0 w-[320px] bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600 flex flex-col transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center justify-center h-full p-8">
                <div className="text-center space-y-4">
                  <div className="mx-auto bg-green-50 dark:bg-green-900/30 rounded-full p-4 w-16 h-16 flex items-center justify-center">
                    <ArrowRight className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-bold text-xl">
                    {language === 'en' ? 'View All Services' : 'Всички Услуги'}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {language === 'en' 
                      ? 'Explore our complete range of services and packages' 
                      : 'Разгледайте пълната ни гама от услуги и пакети'}
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-4 border-green-600 dark:border-green-500 text-green-600 dark:text-green-400 rounded-md shadow-md hover:shadow-lg transition-all duration-200"
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
        
        {/* Scroll indication (mobile only) */}
        <div className="flex justify-center mt-4 md:hidden">
          <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
            <ChevronLeft className="h-4 w-4 mr-1" />
            {translate("Плъзнете за повече", "Swipe for more")}
            <ChevronRight className="h-4 w-4 ml-1" />
          </p>
        </div>
      </div>
      
      <div className="container border-x pb-8 flex justify-center relative z-10 mt-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="transition-all duration-300 hover:scale-[1.02]"
        >
          <Button
            variant="outline"
            className="rounded-full border-2 border-green-600 dark:border-green-500 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-950/50"
            asChild
          >
            <a href="/services" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              {translate("Вижте всички услуги", "View All Services")}
            </a>
          </Button>
        </motion.div>
      </div>

      <div className="h-8 w-full border-y md:h-12 lg:h-16 relative z-10">
        <div className="container h-full w-full border-x"></div>
      </div>
    </section>
  );
} 