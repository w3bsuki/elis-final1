"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { Calendar } from 'lucide-react';
import Image from 'next/image';
import { ServiceCard } from '@/components/ui/service-card';

interface TimelineItem {
  id: string;
  date: string;
  title: string;
  description: string;
  image: string;
  link?: string;
  badges?: string[];
  featured?: boolean;
  buttonText?: string;
  category?: string;
  price?: string;
  duration?: string;
  benefits?: string[];
}

interface TimelineProps {
  items: TimelineItem[];
  type?: 'services' | 'courses' | 'events';
}

export function Timeline({ items, type = 'services' }: TimelineProps) {
  const { language } = useLanguage();
  const translate = (bg: string, en: string) => language === 'en' ? en : bg;
  
  return (
    <section className="relative py-10 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10">
          {/* Timeline items */}
          <div className="space-y-12 relative">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {/* Line connecting timeline items */}
                {index < items.length - 1 && (
                  <div className="absolute left-8 top-20 bottom-0 w-px bg-gradient-to-b from-green-500/50 to-green-500/10 dark:from-green-600/50 dark:to-green-600/10"></div>
                )}
                
                {/* Timeline item */}
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Date indicator */}
                  <div className="flex flex-col items-center md:items-end md:w-48 flex-shrink-0">
                    <div className="flex items-center gap-2 rounded-full px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-100 dark:border-green-800">
                      <Calendar className="w-3.5 h-3.5" />
                      <span className="text-sm font-medium">{item.date}</span>
                    </div>
                  </div>
                  
                  {/* Content card */}
                  <div className="flex-1 relative">
                    {/* Convert the timeline item to a service card */}
                    <ServiceCard 
                      service={{
                        id: item.id,
                        title: item.title,
                        description: item.description,
                        coverImage: item.image,
                        price: item.price ? parseFloat(item.price) : undefined,
                        duration: item.duration || "60",
                        category: item.category as any,
                        badges: item.badges || [],
                        featured: item.featured,
                        buttonText: item.buttonText,
                        benefits: item.benefits || [],
                        link: item.link
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-green-200/30 dark:bg-green-900/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-emerald-200/20 dark:bg-emerald-900/10 rounded-full blur-3xl -z-10"></div>
    </section>
  );
} 