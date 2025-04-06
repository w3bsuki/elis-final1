"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Calendar, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface TimelineItem {
  id: string;
  date: string;
  title: string;
  description: string;
  image?: string;
  link?: string;
  badges?: string[];
  featured?: boolean;
  buttonText?: string;
}

interface TimelineProps {
  items: TimelineItem[];
  type: "books" | "services";
}

export function Timeline({ items, type }: TimelineProps) {
  const { language } = useLanguage();
  const translate = (bg: string, en: string) => (language === "bg" ? bg : en);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative py-20">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-16"
        >
          {items.map((timelineItem, index) => (
            <motion.div
              key={timelineItem.id}
              variants={item}
              className={cn(
                "relative grid gap-8 items-center",
                index % 2 === 0
                  ? "md:grid-cols-[1fr,100px,1fr]"
                  : "md:grid-cols-[1fr,100px,1fr] md:[&>*:first-child]:col-start-3 md:[&>*:last-child]:col-start-1"
              )}
            >
              {/* Content */}
              <Card className={cn(
                "relative p-6 rounded-xl border border-border/40 bg-card/30 backdrop-blur supports-[backdrop-filter]:bg-background/60",
                timelineItem.featured && "ring-2 ring-primary/20"
              )}>
                <div className="flex flex-col gap-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="bg-primary/5">
                          <Calendar className="mr-1 size-3" />
                          {timelineItem.date}
                        </Badge>
                        {timelineItem.featured && (
                          <Badge className="bg-primary/10 text-primary border-0">
                            <Sparkles className="mr-1 size-3" />
                            {translate("Най-ново", "Latest")}
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-xl font-semibold">{timelineItem.title}</h3>
                    </div>
                    {type === "books" && (
                      <BookOpen className="size-5 text-muted-foreground" />
                    )}
                  </div>

                  {timelineItem.image && (
                    <div className="relative aspect-[3/2] overflow-hidden rounded-lg">
                      <Image
                        src={timelineItem.image}
                        alt={timelineItem.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  <p className="text-muted-foreground">{timelineItem.description}</p>

                  {timelineItem.badges && (
                    <div className="flex flex-wrap gap-2">
                      {timelineItem.badges.map((badge) => (
                        <Badge
                          key={badge}
                          variant="secondary"
                          className="bg-secondary/10"
                        >
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {timelineItem.link && (
                    <Button
                      asChild
                      className="self-start group"
                    >
                      <Link href={timelineItem.link}>
                        {timelineItem.buttonText || translate("Научете повече", "Learn more")}
                        <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  )}
                </div>
              </Card>

              {/* Timeline line and dot */}
              <div className="relative hidden md:flex flex-col items-center">
                <div className="h-full w-px bg-border/60" />
                <div className="absolute top-1/2 -translate-y-1/2 size-3 rounded-full bg-primary" />
              </div>

              {/* Empty column for layout */}
              <div className="hidden md:block" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 