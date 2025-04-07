import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionContainerProps {
  children: ReactNode;
  id?: string;
  className?: string;
  decorationColor?: "green" | "purple" | "blue" | "amber";
}

export function SectionContainer({
  children,
  id,
  className,
  decorationColor = "green"
}: SectionContainerProps) {
  // Map color names to actual color values
  const colorMap = {
    green: {
      decoration1: "bg-green-500/5",
      decoration2: "bg-green-400/5",
    },
    purple: {
      decoration1: "bg-purple-500/5",
      decoration2: "bg-purple-400/5", 
    },
    blue: {
      decoration1: "bg-blue-500/5",
      decoration2: "bg-blue-400/5",
    },
    amber: {
      decoration1: "bg-amber-500/5",
      decoration2: "bg-amber-400/5",
    }
  };
  
  const colors = colorMap[decorationColor];

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={cn(
        "bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-800 shadow-xl p-0.5 overflow-hidden",
        className
      )}
    >
      <div className="bg-gradient-to-br from-gray-100/50 via-white/50 to-gray-100/50 dark:from-gray-900/50 dark:via-gray-950/50 dark:to-gray-900/50 rounded-lg p-5 sm:p-6 md:p-8 relative overflow-hidden">
        {/* Glass panel effect with inner shadow */}
        <div className="absolute inset-1 bg-white/30 dark:bg-gray-900/30 rounded-lg backdrop-blur-sm shadow-inner pointer-events-none"></div>
        
        {/* Decorative elements */}
        <div className={`absolute top-10 left-10 w-40 h-40 ${colors.decoration1} rounded-full blur-3xl`}></div>
        <div className={`absolute bottom-10 right-10 w-40 h-40 ${colors.decoration2} rounded-full blur-3xl`}></div>
        
        <div className="relative z-0">
          {children}
        </div>
      </div>
    </motion.div>
  );
} 