import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  url: string;
  color: string;
  index: number;
}

export function FeatureCard({ icon, title, description, url, color, index }: FeatureCardProps) {
  // Individual card animation
  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1
      }
    }
  };

  return (
    <motion.div
      variants={itemAnimation}
      className="group relative overflow-hidden rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md"
    >
      <div className="flex flex-col space-y-4">
        <div className={`rounded-full p-2 w-10 h-10 flex items-center justify-center ${color} bg-opacity-10`}>
          {icon}
        </div>
        
        <h3 className="text-lg font-semibold">{title}</h3>
        
        <p className="text-sm text-muted-foreground">{description}</p>
        
        <Link 
          href={url}
          className="mt-auto inline-flex items-center text-sm font-medium text-primary hover:underline"
        >
          Learn more
          <ChevronRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  );
} 