import { ArrowRight, Book, Sparkles, FileText } from "lucide-react";
import { ExpertiseAreaData } from "./types";
import { useLanguage } from "@/lib/LanguageContext";
import { motion } from "framer-motion";
import { FeatureCard } from "./FeatureCard";
import { useTranslation } from "@/lib/hooks";

/**
 * FeatureCardList - Renders a grid of feature cards with animations
 */
export function FeatureCardList() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  
  // Define animations for container and items
  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  // Create expertise areas data from translations
  const expertiseAreas: ExpertiseAreaData[] = [
    {
      icon: <Sparkles className="h-5 w-5 text-blue-500" />,
      title: language === 'en' ? "Writing Services" : "Писателски услуги",
      description: language === 'en' ? "Professional writing services tailored to your unique needs and goals." : "Професионални писателски услуги, съобразени с вашите нужди и цели.",
      url: "#writing-services",
      color: "text-blue-500",
    },
    {
      icon: <Book className="h-5 w-5 text-emerald-500" />,
      title: language === 'en' ? "Editing Services" : "Редакторски услуги",
      description: language === 'en' ? "Expert editing to enhance clarity, flow, and impact of your content." : "Експертна редакция за подобряване на яснотата, плавността и въздействието на вашето съдържание.",
      url: "#editing-services",
      color: "text-emerald-500",
    },
    {
      icon: <FileText className="h-5 w-5 text-amber-500" />,
      title: language === 'en' ? "Research Services" : "Изследователски услуги",
      description: language === 'en' ? "Thorough research to provide solid foundation for your projects." : "Обстойно проучване, което предоставя солидна основа за вашите проекти.",
      url: "#research-services",
      color: "text-amber-500",
    },
  ];

  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={containerAnimation}
      initial="hidden"
      animate="visible"
    >
      {expertiseAreas.map((area, index) => (
        <FeatureCard
          key={index}
          icon={area.icon}
          title={area.title}
          description={area.description}
          url={area.url}
          color={area.color}
          index={index}
        />
      ))}
    </motion.div>
  );
} 