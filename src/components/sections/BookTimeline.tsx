"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";
import { 
  ArrowRight, 
  BookOpen, 
  Star, 
  Award, 
  Calendar,
  Sparkles,
  Tag,
  Users,
  Clock,
  Presentation,
  Briefcase
} from "lucide-react";
import { shopBooks } from "@/lib/shop-data";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { BookExcerptDialog } from "@/components/ui/book-excerpt-dialog";
import { useState } from "react";

// Component for the diagonal pattern background
const DiagonalPattern = ({
  className,
  patternColor = "hsl(var(--foreground))",
  patternOpacity = 0.15,
}: {
  className?: string;
  patternColor?: string;
  patternOpacity?: number;
}) => {
  const svgPattern = `url("data:image/svg+xml,%3Csvg width='7' height='7' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23${patternColor}' fill-opacity='${patternOpacity}' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`;

  return (
    <div
      className={cn("h-full w-full border-2 border-dashed", className)}
      style={{
        backgroundImage: svgPattern,
      }}
    />
  );
};

export function BookTimeline() {
  const { language } = useLanguage();
  const translate = (bg: string, en: string) => language === 'bg' ? bg : en;
  
  // State for excerpt dialog
  const [openExcerpt, setOpenExcerpt] = useState(false);
  const [selectedBook, setSelectedBook] = useState<typeof shopBooks[0] | null>(null);
  
  // Function to open the excerpt dialog
  const handleOpenExcerpt = (book: typeof shopBooks[0]) => {
    setSelectedBook(book);
    setOpenExcerpt(true);
  };
  
  // Function to check if a book is a new release (less than 3 months old)
  const isNewRelease = (publishDate: string) => {
    const bookDate = new Date(publishDate);
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    return bookDate > threeMonthsAgo;
  };

  // Get the newest and featured books
  const newestBook = [...shopBooks].sort((a, b) => 
    new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  )[0];

  const featuredBook = shopBooks.find(book => book.featured);

  // Get featured services
  const featuredServices = services.filter(service => service.featured).slice(0, 2);

  // Combine books and services into timeline items
  const timelineItems = [
    // Newest Book
    {
      type: 'book',
      data: newestBook,
      badges: [
        {
          text: translate("Ново", "New"),
          icon: Star,
          className: "bg-blue-500/10 text-blue-600 dark:text-blue-400"
        }
      ]
    },
    // Featured Services
    ...featuredServices.map(service => ({
      type: 'service',
      data: service,
      badges: [
        {
          text: translate("Популярна Услуга", "Popular Service"),
          icon: Users,
          className: "bg-purple-500/10 text-purple-600 dark:text-purple-400"
        }
      ]
    })),
    // Featured Book
    featuredBook && {
      type: 'book',
      data: featuredBook,
      badges: [
        {
          text: translate("Бестселър", "Bestseller"),
          icon: Award,
          className: "bg-amber-500/10 text-amber-600 dark:text-amber-400"
        }
      ]
    }
  ].filter(Boolean);

  return (
    <section className="py-32 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('/images/pattern-light.svg')] dark:bg-[url('/images/pattern-dark.svg')] opacity-5 bg-repeat bg-[length:20px_20px] pointer-events-none"></div>
      
      <div className="container relative">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-6 mb-16">
          <Badge 
            variant="outline" 
            className="px-3 py-1 bg-primary/5 text-primary border-primary/20 inline-flex items-center gap-1.5"
          >
            <Sparkles className="size-4" />
            <span>{translate("Акценти", "Highlights")}</span>
          </Badge>
          
          <h2 className="text-4xl font-bold lg:text-5xl">
            {translate("Най-новото от мен", "Latest from Me")}
          </h2>
          
          <p className="max-w-[600px] text-muted-foreground">
            {translate(
              "Открийте моите най-нови книги и услуги. Всяко ново начинание е създадено с мисъл за вашето развитие и благополучие.",
              "Discover my latest books and services. Each new venture is created with your growth and well-being in mind."
            )}
          </p>
        </div>

        {/* Timeline Items */}
        <div className="space-y-24">
          {timelineItems.map((item, index) => (
            <motion.div
              key={item.data.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className={cn(
                "grid items-center gap-8 lg:gap-12",
                index % 2 === 0 ? "lg:grid-cols-[1fr,auto,1fr]" : "lg:grid-cols-[1fr,auto,1fr]"
              )}>
                {/* Text Content */}
                <div className={cn(
                  "flex flex-col gap-4",
                  index % 2 === 0 ? "lg:order-1" : "lg:order-3"
                )}>
                  {/* Header */}
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <Badge variant="outline" className="bg-primary/5">
                        <Calendar className="mr-1 size-3" />
                        {item.type === 'book' 
                          ? item.data.publishDate
                          : translate("Достъпно сега", "Available now")}
                      </Badge>
                      {item.badges.map((badge, i) => (
                        <Badge key={i} className={badge.className}>
                          <badge.icon className="mr-1 size-3" />
                          {badge.text}
                        </Badge>
                      ))}
                    </div>
                    <h3 className="text-2xl font-semibold mb-3">{item.data.title}</h3>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground max-w-xl">{item.data.description}</p>

                  {/* Tags/Categories */}
                  {item.type === 'book' && item.data.categories && (
                    <div className="flex flex-wrap gap-2">
                      {item.data.categories.map((category) => (
                        <Badge
                          key={category}
                          variant="secondary"
                          className="bg-secondary/10"
                        >
                          <Tag className="mr-1 size-3" />
                          {category}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3 mt-2">
                    {item.type === 'book' ? (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-md"
                          onClick={() => handleOpenExcerpt(item.data)}
                        >
                          <Clock className="mr-1.5 h-3.5 w-3.5" />
                          {translate("Кратко Четиво", "Short Read")}
                        </Button>
                        <Button asChild>
                          <a href={`/shop/${item.data.id}`} className="flex items-center gap-1.5">
                            {translate("Прочети повече", "Read More")}
                            <ArrowRight className="h-3.5 w-3.5" />
                          </a>
                        </Button>
                      </>
                    ) : (
                      <Button asChild>
                        <a href={`/services/${item.data.id}`} className="flex items-center gap-1.5">
                          {translate("Научете повече", "Learn More")}
                          <ArrowRight className="h-3.5 w-3.5" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>

                {/* Timeline line and dot */}
                <div className="relative hidden lg:flex flex-col items-center order-2">
                  <div className="absolute top-0 bottom-0 w-px bg-border/60" />
                  <div className="absolute top-1/2 -translate-y-1/2 size-3 rounded-full bg-primary" />
                </div>

                {/* Image Content */}
                <div className={cn(
                  "relative",
                  index % 2 === 0 ? "lg:order-3" : "lg:order-1"
                )}>
                  <div className="px-6 lg:px-10">
                    <DiagonalPattern className="h-6 lg:h-10" patternColor="var(--primary)" patternOpacity={0.1} />
                  </div>
                  <div className="relative">
                    <DiagonalPattern className="absolute inset-0 -m-3" patternColor="var(--primary)" patternOpacity={0.1} />
                    <div className="relative aspect-[3/2] overflow-hidden rounded-lg">
                      <Image
                        src={item.data.coverImage || item.data.image || "/images/placeholder.jpg"}
                        alt={item.data.title}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                  <div className="px-6 lg:px-10">
                    <DiagonalPattern className="h-6 lg:h-10" patternColor="var(--primary)" patternOpacity={0.1} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-24 flex flex-col items-center gap-6">
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              variant="outline"
              size="lg"
              className="group"
              asChild
            >
              <a href="/books" className="flex items-center gap-2">
                <BookOpen className="size-5" />
                {translate("Всички Книги", "All Books")}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="group"
              asChild
            >
              <a href="/services" className="flex items-center gap-2">
                <Briefcase className="size-5" />
                {translate("Всички Услуги", "All Services")}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Book Excerpt Dialog */}
      {selectedBook && (
        <BookExcerptDialog
          book={{
            id: selectedBook.id,
            title: selectedBook.title,
            coverImage: selectedBook.coverImage,
            excerpt: selectedBook.excerpt
          }}
          open={openExcerpt}
          onOpenChange={setOpenExcerpt}
        />
      )}
    </section>
  );
} 