"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { Timeline } from "@/components/sections/Timeline";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function ServicesPage() {
  const { language } = useLanguage();
  const translate = (bg: string, en: string) => (language === "bg" ? bg : en);

  const serviceTimelineItems = [
    {
      id: "mindful-eating-coaching",
      date: translate("2024 - Сега", "2024 - Present"),
      title: translate("Коучинг за Осъзнато Хранене", "Mindful Eating Coaching"),
      description: translate(
        "Персонализирани сесии за трансформиране на връзката с храната и създаване на здравословни навици. Включва индивидуален план и постоянна подкрепа.",
        "Personalized sessions for transforming your relationship with food and creating healthy habits. Includes individual plan and ongoing support."
      ),
      image: "/images/services/mindful-eating-coaching.jpg",
      link: "/services/mindful-eating-coaching",
      badges: [
        translate("Онлайн Сесии", "Online Sessions"),
        translate("Индивидуален План", "Individual Plan"),
        translate("Постоянна Подкрепа", "Ongoing Support"),
      ],
      featured: true,
      buttonText: translate("Запишете Консултация", "Book Consultation"),
    },
    {
      id: "group-workshops",
      date: translate("2023 - Сега", "2023 - Present"),
      title: translate("Групови Уъркшопове", "Group Workshops"),
      description: translate(
        "Интерактивни семинари за малки групи, фокусирани върху осъзнато хранене, емоционално хранене и създаване на здравословни навици.",
        "Interactive seminars for small groups, focused on mindful eating, emotional eating, and creating healthy habits."
      ),
      image: "/images/services/group-workshops.jpg",
      link: "/services/group-workshops",
      badges: [
        translate("Групови Сесии", "Group Sessions"),
        translate("Интерактивно Обучение", "Interactive Learning"),
        translate("Практически Упражнения", "Practical Exercises"),
      ],
      buttonText: translate("Вижте Предстоящите Дати", "See Upcoming Dates"),
    },
    {
      id: "corporate-programs",
      date: translate("2023 - Сега", "2023 - Present"),
      title: translate("Корпоративни Програми", "Corporate Programs"),
      description: translate(
        "Специализирани програми за компании, фокусирани върху здравословен начин на живот и баланс работа-живот за служителите.",
        "Specialized programs for companies, focused on healthy lifestyle and work-life balance for employees."
      ),
      image: "/images/services/corporate-programs.jpg",
      link: "/services/corporate-programs",
      badges: [
        translate("Корпоративно Обучение", "Corporate Training"),
        translate("Екипни Семинари", "Team Workshops"),
        translate("Персонализирани Програми", "Custom Programs"),
      ],
      buttonText: translate("Поискайте Оферта", "Request Quote"),
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
              <Sparkles className="size-4" />
              <span>{translate("Моите Услуги", "My Services")}</span>
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {translate(
                "Път към По-добър Живот",
                "Path to a Better Life"
              )}
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8">
              {translate(
                "Открийте моите специализирани услуги - от индивидуален коучинг до групови уъркшопове, всяка програма е създадена да ви помогне да постигнете вашите цели.",
                "Discover my specialized services - from individual coaching to group workshops, each program is designed to help you achieve your goals."
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
      <Timeline items={serviceTimelineItems} type="services" />
    </main>
  );
} 