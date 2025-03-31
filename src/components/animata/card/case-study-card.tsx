import React, { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";

interface CaseStudyCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  category?: string;
  image?: string;
  logo?: string;
  link?: string;
  type?: "content" | "simple-image"; // Decides between text or image
}

// ContentCard Component for rendering text + image
const ContentCard: React.FC<CaseStudyCardProps> = ({ title, category, image, logo }) => {
  const [imageError, setImageError] = useState(false);
  const fallbackImage = "/images/placeholder-service.jpg";
  
  const imageToUse = imageError ? fallbackImage : (image || fallbackImage);
  
  return (
    <div
      className="relative flex h-full w-full flex-col items-start justify-between rounded-lg p-0 overflow-hidden"
    >
      {/* Actual image instead of background */}
      <img 
        src={imageToUse} 
        alt={title}
        className="absolute inset-0 w-full h-full object-cover object-center"
        onError={() => setImageError(true)}
      />
      
      {/* Category badge positioned at the top */}
      <div className="absolute top-3 left-3 z-20 bg-green-600 text-white text-xs font-medium px-2 py-1 rounded-full">
        {category}
      </div>
      
      {/* Title at the bottom with subtle gradient background */}
      {title && (
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent z-10">
          <div className="text-sm font-medium leading-tight tracking-wide text-white">
            {title}
          </div>
        </div>
      )}
      
      {logo && (
        <img src={logo} alt={title} className="z-10 h-9 absolute bottom-3 right-3 rounded-lg" />
      )}
    </div>
  );
};

// SimpleImageCard component for rendering only image
const SimpleImageCard: React.FC<CaseStudyCardProps> = ({ image, title }) => {
  const [imageError, setImageError] = useState(false);
  const fallbackImage = "/images/placeholder-service.jpg";
  
  const imageToUse = imageError ? fallbackImage : (image || fallbackImage);
  
  return (
    <div
      className="relative flex w-full h-full flex-col items-start justify-between rounded-lg p-0 overflow-hidden"
    >
      {/* Actual image instead of background */}
      <img 
        src={imageToUse} 
        alt={title}
        className="w-full h-full object-cover object-center"
        onError={() => setImageError(true)}
      />
    </div>
  );
};

const HoverRevealSlip = ({ show }: { show: React.ReactNode }) => {
  const { language } = useLanguage();
  const translate = (bg: string, en: string) => language === 'bg' ? bg : en;
  const common = "absolute flex w-full h-full [backface-visibility:hidden]";

  return (
    <div className={cn("group relative h-72 w-56 [perspective:1000px]")}>
      {/* Book spine effect */}
      <div className={cn("absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-gray-600 to-gray-400 rounded-l-sm z-30")}></div>
      
      {/* Back cover - static */}
      <div className={cn("absolute inset-0 h-full w-56 rounded-r-lg bg-gray-100 dark:bg-gray-800 shadow-md")}></div>

      {/* Card container with book opening effect on hover */}
      <div
        className={cn(
          "relative z-50 h-full w-56 origin-left transition-transform duration-500 ease-out [transform-style:preserve-3d] group-hover:[transform:rotateY(-30deg)]",
        )}
      >
        {/* Front side of the card - book cover */}
        <div className={cn("h-full w-full rounded-r-lg shadow-md overflow-hidden", common)}>{show}</div>
      </div>

      {/* Sliding link/tab coming out from behind */}
      <div
        className={cn(
          "z-1 absolute bottom-0 right-0 flex h-48 w-16 -translate-x-10 transform items-start justify-start rounded-r-lg bg-green-600 pl-2 pt-2 text-xs font-bold text-white transition-transform duration-300 ease-in-out [backface-visibility:hidden] group-hover:translate-x-0 group-hover:rotate-[5deg]",
        )}
      >
        <div className="-rotate-90 whitespace-nowrap pb-16 pr-9">{translate("Прочети повече", "Read more")}</div>
      </div>
    </div>
  );
};

// Main CaseStudyCard Component
export default function CaseStudyCard({
  title,
  category,
  link,
  image,
  logo,
  type,
}: CaseStudyCardProps) {
  return (
    <div className="flex gap-12 mx-3">
      <a href={link} className="block">
        <HoverRevealSlip
          show={
            type === "content" ? (
              <ContentCard title={title} category={category} image={image} logo={logo} />
            ) : (
              <SimpleImageCard image={image} title={title} />
            )
          }
        />
      </a>
    </div>
  );
}