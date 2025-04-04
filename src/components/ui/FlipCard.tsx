import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BadgeCheck, BookOpen, ChevronsRight } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "./badge";

interface FlipCardProps {
  frontImage?: string;
  frontIcon?: React.ElementType;
  frontTitle: string;
  frontSubtitle?: string;
  backTitle: string;
  backDescription: string;
  backFeatures?: string[];
  backCta?: string;
  onCtaClick?: () => void;
  popular?: boolean;
  className?: string;
}

export function FlipCard({
  frontImage,
  frontIcon: Icon,
  frontTitle,
  frontSubtitle,
  backTitle,
  backDescription,
  backFeatures,
  backCta,
  onCtaClick,
  popular,
  className,
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={cn("flip-card-container h-full rounded-xl", className)}>
      <div
        className={cn("flip-card h-full rounded-xl", isFlipped && "is-flipped")}
      >
        {/* Front of card */}
        <motion.div 
          className="flip-card-front flex flex-col overflow-hidden rounded-xl relative border border-gray-200 dark:border-gray-800 shadow-lg"
          whileHover={{ 
            boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)",
            transition: { duration: 0.2 }
          }}
        >
          {/* Card image or icon */}
          {frontImage ? (
            <div className="relative h-48 bg-gray-100 dark:bg-gray-800">
              <img
                src={frontImage}
                alt={frontTitle}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
              
              {popular && (
                <motion.div 
                  className="absolute top-4 right-4 z-10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 400,
                    damping: 10
                  }}
                >
                  <Badge className="bg-purple-600 hover:bg-purple-700 text-white border-0 shadow-md px-2.5 py-1">
                    <BookOpen className="w-3.5 h-3.5 mr-1" /> Popular
                  </Badge>
                </motion.div>
              )}
            </div>
          ) : (
            <div className="h-48 flex items-center justify-center bg-gradient-to-br from-purple-50 to-white dark:from-gray-800 dark:to-gray-900">
              {Icon && (
                <motion.div 
                  className="text-primary dark:text-primary-foreground p-3 rounded-full bg-primary/10 dark:bg-primary/20"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Icon className="h-16 w-16" />
                </motion.div>
              )}
              
              {popular && (
                <motion.div 
                  className="absolute top-4 right-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 400,
                    damping: 10
                  }}
                >
                  <Badge className="bg-purple-600 hover:bg-purple-700 text-white border-0 shadow-md px-2.5 py-1">
                    <BookOpen className="w-3.5 h-3.5 mr-1" /> Popular
                  </Badge>
                </motion.div>
              )}
            </div>
          )}

          {/* Card content */}
          <div className="flex-1 flex flex-col p-5 bg-white dark:bg-gray-950">
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">
              {frontTitle}
            </h3>
            {frontSubtitle && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                {frontSubtitle}
              </p>
            )}
            <div className="mt-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleFlip}
                className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium flex items-center gap-1"
              >
                Learn More <ChevronsRight className="h-4 w-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Back of card */}
        <motion.div 
          className="flip-card-back flex flex-col rounded-xl border border-gray-200 dark:border-gray-800 shadow-lg bg-white dark:bg-gray-950 overflow-auto"
          whileHover={{ 
            boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)",
            transition: { duration: 0.2 }
          }}
        >
          <div className="p-5 flex flex-col h-full">
            <div className="mb-4 pb-4 border-b border-gray-100 dark:border-gray-800">
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                {backTitle}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {backDescription}
              </p>
            </div>

            {backFeatures && backFeatures.length > 0 && (
              <div className="flex-1 mb-4">
                <h4 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
                  Key Benefits:
                </h4>
                <ul className="space-y-2">
                  {backFeatures.map((feature, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-start gap-2 text-sm"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <BadgeCheck className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 dark:text-gray-400">
                        {feature}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-auto space-y-3 pt-2">
              {backCta && (
                <Button
                  onClick={onCtaClick}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white border-0 shadow-md"
                >
                  {backCta}
                </Button>
              )}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleFlip}
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 font-medium flex items-center justify-center w-full gap-1"
              >
                Go Back <ChevronsRight className="h-4 w-4 rotate-180" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 