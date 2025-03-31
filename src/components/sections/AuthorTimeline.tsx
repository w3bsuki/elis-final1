"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";
import { Pen, Award, Users, BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const DATA = [
  {
    year: "2012",
    title: "Първи стихове",
    description:
      "Началото на моето творческо пътуване. Започнах да пиша първите си стихове, вдъхновени от личните ми преживявания.",
    icon: Pen,
    image: "/images/placeholder-1.jpg",
  },
  {
    title: "Литературна награда",
    year: "2015",
    description:
      "Получих първото си литературно признание - награда за млад автор в националния поетичен конкурс.",
    icon: Award,
    image: "/images/placeholder-2.jpg",
  },
  {
    title: "Творчески работилници",
    year: "2017",
    description:
      "Започнах да водя творчески работилници, споделяйки своя опит и техники за писане.",
    icon: Users,
    image: "/images/placeholder-3.jpg",
  },
];

export function AuthorTimeline() {
  const { language } = useLanguage();
  const translate = (bg: string, en: string) => language === 'bg' ? bg : en;
  
  // Translate the data based on current language
  const translatedData = DATA.map(item => ({
    ...item,
    title: translate(item.title, item.title === "Първи стихове" ? "First Poems" : 
                    item.title === "Литературна награда" ? "Literary Award" : 
                    "Creative Workshops"),
    description: translate(item.description, 
                    item.title === "Първи стихове" ? 
                    "The beginning of my creative journey. I started writing my first poems, inspired by my personal experiences." : 
                    item.title === "Литературна награда" ? 
                    "I received my first literary recognition - a young author award in the national poetry competition." : 
                    "I began leading creative workshops, sharing my experience and writing techniques.")
  }));

  return (
    <section className="relative py-16 bg-gray-50 dark:bg-gray-900/50 border-y border-green-100/30 dark:border-green-800/30">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[url('/images/pattern-light.svg')] dark:bg-[url('/images/pattern-dark.svg')] opacity-5 bg-repeat"></div>
      
      {/* Content container */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl leading-tight md:text-4xl lg:text-5xl font-bold font-playfair mb-4">
            {translate("Пътят на Автора", "The Author's Journey")}
          </h2>
          
          <p className="text-lg text-muted-foreground">
            {translate(
              "От първите ми стихове до публикуваните книги, моето писателско пътуване е отражение на опит и вдъхновение.",
              "From my first poems to published books, my writing journey reflects experience and inspiration."
            )}
          </p>
        </motion.div>

        {/* Modern boxed timeline layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {translatedData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="aspect-[16/9] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                <div className="absolute top-4 left-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-3 py-1 rounded-full font-medium text-sm z-20">
                  {item.year}
                </div>
                <Image 
                  src={item.image}
                  alt={item.title}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/50 mr-3">
                    <item.icon className="h-5 w-5 text-green-700 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold font-playfair">{item.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center mt-12"
        >
          <Button
            className="bg-green-600 text-white h-auto px-8 py-3 rounded-full shadow-md transition-colors duration-300 hover:bg-green-700 dark:hover:bg-green-800 group"
            asChild
          >
            <a href="#books" className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              <span>{translate("Разгледайте моите книги", "Explore My Books")}</span>
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
} 