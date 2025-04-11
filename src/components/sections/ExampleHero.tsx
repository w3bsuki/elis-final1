"use client";

import React from "react";
import { HeroSection } from "@/components/ui/hero-section";
import { HeroContent } from "@/components/ui/hero-content";
import { useLanguage } from "@/lib/LanguageContext";

export function ExampleHero() {
  const { language } = useLanguage();
  
  // Translations based on the language
  const content = {
    badge: language === 'en' ? 'Transform Your Journey' : 'Трансформирайте Вашето Пътуване',
    title: language === 'en' ? 'Unleash Your Creative' : 'Отключете Вашия Творчески',
    titleHighlight: language === 'en' ? 'Writing Potential' : 'Писателски Потенциал',
    description: language === 'en' 
      ? 'Join an inspiring community of writers, where creativity meets craft. Get personalized guidance, expert insights, and the tools you need to bring your stories to life.'
      : 'Присъединете се към вдъхновяваща общност от писатели, където творчеството се среща с уменията. Получете персонализирани насоки, експертни съвети и инструментите, от които се нуждаете, за да вдъхнете живот на вашите истории.',
    primaryCta: {
      text: language === 'en' ? 'Start Your Journey' : 'Започнете Вашето Пътуване',
      href: '/get-started'
    },
    secondaryCta: {
      text: language === 'en' ? 'Meet Your Mentor' : 'Запознайте се с Вашия Ментор',
      href: '/about'
    }
  };

  return (
    <HeroSection
      withPattern
      withGradient
      backgroundImage="/images/hero-bg.jpg"
      className="mt-16" // Space for the header
    >
      <HeroContent
        badge={{ text: content.badge }}
        title={`${content.title} ${content.titleHighlight}`}
        titleHighlight={content.titleHighlight}
        description={content.description}
        primaryCta={content.primaryCta}
        secondaryCta={content.secondaryCta}
        image={{
          src: "/images/author-portrait.jpg",
          alt: language === 'en' ? "Author portrait" : "Портрет на автора",
        }}
        alignment="left"
      />
    </HeroSection>
  );
} 