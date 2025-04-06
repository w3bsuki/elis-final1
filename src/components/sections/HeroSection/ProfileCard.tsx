"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Award, Sparkle, GraduationCap, BookOpen, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";
import { ProfileCardProps, ProfileExtendedInfo } from "./types";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription,
  DialogClose
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

// Sample extended profile data (in a real app, this could come from an API or CMS)
const profileExtendedInfo: ProfileExtendedInfo = {
  education: [
    {
      degree: {
        en: "Master's in Psychology",
        bg: "Магистър по Психология"
      },
      institution: {
        en: "Sofia University",
        bg: "Софийски Университет"
      },
      year: "2008"
    },
    {
      degree: {
        en: "Certification in Art Therapy",
        bg: "Сертификат по Арт Терапия"
      },
      institution: {
        en: "European Institute for Creative Arts Therapy",
        bg: "Европейски Институт за Арт Терапия"
      },
      year: "2010"
    }
  ],
  specialties: [
    {
      en: "Anxiety & Depression",
      bg: "Тревожност и депресия"
    },
    {
      en: "Relationship Counseling",
      bg: "Семейно консултиране"
    },
    {
      en: "Creative Expression",
      bg: "Творческо себеизразяване"
    },
    {
      en: "Mindfulness Practices",
      bg: "Практики за осъзнатост"
    }
  ],
  certifications: [
    {
      title: {
        en: "Cognitive Behavioral Therapy",
        bg: "Когнитивно-поведенческа терапия"
      },
      issuer: {
        en: "International CBT Association",
        bg: "Международна асоциация по КПТ"
      },
      year: "2012"
    },
    {
      title: {
        en: "Mindfulness-Based Stress Reduction",
        bg: "Редукция на стреса чрез осъзнатост"
      },
      issuer: {
        en: "Center for Mindfulness",
        bg: "Център за осъзнатост"
      },
      year: "2015"
    }
  ],
  bio: {
    en: "With over 15 years of experience, I've dedicated my career to helping people overcome challenges and discover their true potential. My approach combines traditional psychological methods with creative techniques, allowing for a more holistic healing process. I believe that everyone has the inner resources to create meaningful change in their lives with the right guidance and support. Through individual sessions, couples therapy, workshops, and my books, I aim to provide accessible tools for personal growth and emotional wellbeing.",
    bg: "С над 15 години опит, посветих кариерата си на това да помагам на хората да преодоляват предизвикателства и да открият истинския си потенциал. Моят подход съчетава традиционни психологически методи с творчески техники, позволявайки по-холистичен процес на лечение. Вярвам, че всеки притежава вътрешните ресурси да създаде значима промяна в живота си с правилното ръководство и подкрепа. Чрез индивидуални сесии, терапия за двойки, семинари и моите книги, се стремя да предоставя достъпни инструменти за личностно развитие и емоционално благополучие."
  }
};

export function ProfileCard({ name, title, yearsOfExperience, imageSrc, className }: ProfileCardProps) {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  
  // Translate function
  const translate = (bg: string, en: string) => language === 'en' ? en : bg;
  
  // Prepare translated content
  const currentName = language === 'en' ? name.en : name.bg;
  const currentTitle = language === 'en' ? title.en : title.bg;
  const experienceText = translate(`${yearsOfExperience}+ години опит`, `${yearsOfExperience}+ years of experience`);
  const currentBio = language === 'en' ? profileExtendedInfo.bio.en : profileExtendedInfo.bio.bg;
  
  return (
    <>
      <motion.div
        className={cn("w-full relative", className)}
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-amber-500/10 rounded-2xl blur-3xl -z-10 transform scale-95"></div>
        
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <motion.div
              className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 shadow-xl rounded-2xl p-2 overflow-hidden cursor-pointer"
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden">
                <Image
                  src={imageSrc}
                  alt={currentName}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  priority
                />
                
                {/* Floating accent card */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-lg p-3 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="size-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        <Sparkle className="size-6" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {currentName}
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {experienceText}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Hover overlay with "View Profile" */}
                <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/90 dark:bg-gray-900/90 rounded-lg py-2 px-4 shadow-lg">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center gap-1">
                      {translate("Профил", "View Profile")}
                      <ArrowRight className="w-3 h-3" />
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </DialogTrigger>
          
          <DialogContent className="sm:max-w-[600px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <DialogHeader>
              <DialogTitle className="text-2xl font-serif">{currentName}</DialogTitle>
              <DialogDescription className="text-base text-gray-600 dark:text-gray-400">
                {currentTitle}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 mt-4">
              {/* Left column with image and basic info */}
              <div className="space-y-4">
                <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-md">
                  <Image
                    src={imageSrc}
                    alt={currentName}
                    width={250}
                    height={300}
                    className="w-full object-cover aspect-[3/4]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Badge variant="outline" className="w-full justify-center py-1.5 bg-primary/5 text-primary border-primary/20">
                    <Award className="w-3.5 h-3.5 mr-1" />
                    {translate("Сертифициран психолог", "Certified Psychologist")}
                  </Badge>
                  
                  <Badge variant="outline" className="w-full justify-center py-1.5 bg-amber-500/5 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800/30">
                    <BookOpen className="w-3.5 h-3.5 mr-1" />
                    {translate("Автор на 5 книги", "Author of 5 books")}
                  </Badge>
                </div>
              </div>
              
              {/* Right column with bio and details */}
              <div className="space-y-5">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 flex items-center">
                    <GraduationCap className="w-4 h-4 mr-1" />
                    {translate("Биография", "Biography")}
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    {currentBio}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    {translate("Специалности", "Specialties")}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {profileExtendedInfo.specialties.map((specialty, idx) => (
                      <Badge key={idx} variant="secondary" className="font-normal">
                        <Check className="w-3 h-3 mr-1 text-green-500" />
                        {language === 'en' ? specialty.en : specialty.bg}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    {translate("Образование", "Education")}
                  </h4>
                  <ul className="space-y-2">
                    {profileExtendedInfo.education.map((edu, idx) => (
                      <li key={idx} className="text-sm text-gray-700 dark:text-gray-300">
                        <span className="font-medium">{language === 'en' ? edu.degree.en : edu.degree.bg}</span>
                        <span className="block text-gray-500 dark:text-gray-400">
                          {language === 'en' ? edu.institution.en : edu.institution.bg}, {edu.year}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end gap-2">
              <DialogClose asChild>
                <Button variant="outline">
                  {translate("Затвори", "Close")}
                </Button>
              </DialogClose>
              <Button asChild>
                <a href="/contact">
                  {translate("Запазете час", "Book Consultation")}
                </a>
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>
      
      {/* Bottom decoration */}
      <div className="absolute -bottom-6 inset-x-0 h-10 bg-gradient-to-t from-white dark:from-gray-950 to-transparent -z-10"></div>
    </>
  );
}

// Helper icon component
function ArrowRight({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={cn("size-4", className)}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
} 