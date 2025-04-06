"use client";

import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Eye, Package } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FlipCard } from "@/components/ui/flip-card";

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
      <div className="text-center mb-14">
        <Badge variant="outline" className="mb-3 px-4 py-1.5 text-sm rounded-full border-purple-400/40 bg-purple-500/5">
          <Briefcase className="w-4 h-4 mr-2 text-purple-500" />
          {translate("Професионални услуги", "Professional services")}
        </Badge>
        
        <h2 className="text-2xl md:text-3xl font-bold mb-3 font-serif">
          {translate("Как Мога Да Помогна", "How I Can Help")}
        </h2>
        
        <div className="w-16 h-1 bg-purple-500/40 rounded-full mx-auto mb-3"></div>
        
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
          {translate(
            "Предлагам разнообразни услуги, фокусирани върху личностно развитие, творческо писане и професионални умения.",
            "I offer a variety of services focused on personal development, creative writing, and professional skills."
          )}
        </p>
      </div>
      
      {/* Instruction text */}
      <div className="flex justify-center mb-10">
        <div className="bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-full py-2 px-4 shadow-sm flex items-center gap-2">
          <Eye className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
            {translate("Разгледайте всеки раздел за повече информация", "Hover over each card to see more details")}
          </span>
        </div>
      </div>
      
      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
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
            {/* Service Card */}
            <div className="h-full relative group">
              {/* Group hover glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-br from-purple-400/0 to-primary/0 rounded-xl opacity-0 group-hover:opacity-100 group-hover:from-purple-400/20 group-hover:to-primary/20 blur-md transition-all duration-500"></div>
              
              {/* Inner container with glass effect */}
              <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-xl border border-gray-100 dark:border-gray-800 shadow-lg p-0.5 h-full relative overflow-hidden">
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
      
      {/* View All Services CTA */}
      <div className="flex justify-center mt-6">
        <Button
          variant="outline"
          size="default"
          className="rounded-full shadow-md border-2 border-purple-200/50 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90"
          onClick={() => window.location.href = '/services'}
        >
          <span className="flex items-center">
            {translate("Разгледай всички услуги", "View All Services")}
            <ArrowRight className="w-4 h-4 ml-2" />
          </span>
        </Button>
      </div>
    </div>
  );
} 