"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { Timeline } from "@/components/sections/Timeline";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

export default function BooksPage() {
  const { language } = useLanguage();
  const translate = (bg: string, en: string) => (language === "bg" ? bg : en);

  const bookTimelineItems = [
    {
      id: "mindful-eating",
      date: "2024",
      title: translate("Осъзнато хранене", "Mindful Eating"),
      description: translate(
        "Книга, която ще ви помогне да промените връзката си с храната и да създадете здравословни навици за цял живот.",
        "A book that will help you transform your relationship with food and create healthy habits for life."
      ),
      image: "/images/books/mindful-eating.jpg",
      link: "/books/mindful-eating",
      badges: [
        translate("Най-продавана", "Bestseller"),
        translate("Здравословен живот", "Healthy Living"),
        translate("Психология", "Psychology"),
      ],
      featured: true,
    },
    {
      id: "inspirations",
      date: "2023",
      title: translate("Вдъхновения", "Inspirations"),
      description: translate(
        "Сборник с вдъхновяващи истории и мисли, които ще ви помогнат да откриете своя път към по-добър живот.",
        "A collection of inspiring stories and thoughts that will help you find your path to a better life."
      ),
      image: "/images/books/inspirations.jpg",
      link: "/books/inspirations",
      badges: [
        translate("Мотивация", "Motivation"),
        translate("Лично развитие", "Personal Development"),
      ],
    },
    {
      id: "first-book",
      date: "2022",
      title: translate("Първата ми книга", "My First Book"),
      description: translate(
        "Началото на моето писателско пътешествие - книга за търсенето на себе си и откриването на своето призвание.",
        "The beginning of my writing journey - a book about finding yourself and discovering your calling."
      ),
      image: "/images/books/first-book.jpg",
      link: "/books/first-book",
      badges: [
        translate("Автобиография", "Autobiography"),
        translate("Вдъхновение", "Inspiration"),
      ],
    },
  ];

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Badge 
              variant="outline" 
              className="mb-4 px-3 py-1 bg-primary/5 text-primary border-primary/20 inline-flex items-center gap-1.5"
            >
              <BookOpen className="size-4" />
              <span>{translate("Моите Книги", "My Books")}</span>
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {translate(
                "Пътешествие през Страниците",
                "Journey Through the Pages"
              )}
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8">
              {translate(
                "Открийте моите книги - всяка една е уникално пътешествие към по-добър живот, изпълнено с вдъхновение, мъдрост и практически съвети.",
                "Discover my books - each one is a unique journey towards a better life, filled with inspiration, wisdom, and practical advice."
              )}
            </p>
          </motion.div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 aspect-square w-1/2 bg-primary/5 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Timeline Section */}
      <Timeline items={bookTimelineItems} type="books" />
    </main>
  );
} 