import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";
import { ArrowRight, BookOpen, User, Award, Heart, Quote, Clock, MessageCircle, Calendar, Package } from "lucide-react";
import { services } from "@/data/services";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CONTAINER_WIDTH_CLASSES } from "@/lib/constants";

// Featured services for showcase
const featuredServices = services.slice(0, 3);

const AboutPage: NextPage = () => {
  const { language } = useLanguage();
  const translate = (bg: string, en: string) => language === 'en' ? en : bg;
  const currentYear = new Date().getFullYear();
  
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <Head>
        <title>{translate("За Елис | Автор и Поет", "About Elis | Author & Poet")}</title>
        <meta name="description" content={translate(
          "Запознайте се с Елис - психолог, учител и автор на книги, статии и приказки за деца и възрастни",
          "Meet Elis - psychologist, teacher, and author of books, articles, and tales for children and adults"
        )} />
      </Head>

      <main className="pt-24 pb-8 flex flex-col min-h-screen bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-x-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Pattern background */}
          <div className="absolute inset-0 bg-[url('/images/pattern-light.svg')] dark:bg-[url('/images/pattern-dark.svg')] opacity-[0.03] bg-repeat bg-[length:24px_24px]"></div>
        </div>

        {/* Container with max width and centered */}
        <div className={CONTAINER_WIDTH_CLASSES + " flex-1 flex flex-col"}>
          {/* Single main container for the page */}
          <div className="max-w-7xl mx-auto w-full bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden mb-8">
            <div className="bg-gradient-to-br from-gray-100/50 via-white/50 to-gray-100/50 dark:from-gray-900/50 dark:via-gray-950/50 dark:to-gray-900/50 p-5 sm:p-6 md:p-8 relative">
              {/* Glass panel effect with inner shadow */}
              <div className="absolute inset-1 bg-white/30 dark:bg-gray-900/30 rounded-lg backdrop-blur-sm shadow-inner pointer-events-none"></div>
              
              {/* Main content wrapper */}
              <div className="relative z-0">
                {/* Section header - nested inside the main container */}
                <div className="text-center mb-6 relative z-10">
                  {/* Header with icon and title */}
                  <div className="flex items-center justify-center gap-3 mb-2">
                    {/* Icon with neumorphic style */}
                    <div className="rounded-full p-2
                      bg-gradient-to-br from-gray-50 to-white dark:from-gray-800/30 dark:to-gray-800
                      shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8)]
                      dark:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1)]
                      border border-gray-100/50 dark:border-gray-700/30 relative">
                      <User className="w-5 h-5 text-gray-600 dark:text-gray-400" aria-hidden="true" />
                    </div>
                    
                    <h1 className="text-xl md:text-2xl font-bold font-serif text-black dark:text-white antialiased relative">
                      {translate("За Елис", "About Elis")}
                    </h1>
                  </div>
                  
                  <div className="w-24 h-1 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full mx-auto mb-4"></div>
                  
                  {/* Author image inside central container */}
                  <div className="flex justify-center mb-4">
                    <div className="relative w-20 h-20">
                      <div className="absolute -inset-1 bg-gradient-to-br from-gray-200/30 to-gray-300/20 rounded-full blur-sm opacity-40"></div>
                      <div className="relative w-full h-full rounded-full overflow-hidden 
                        bg-gradient-to-br from-gray-50/90 via-white to-gray-50/90 
                        dark:from-gray-700/90 dark:via-gray-800 dark:to-gray-700/90 
                        border border-white/80 dark:border-gray-700/80
                        shadow-[4px_4px_8px_rgba(0,0,0,0.1),-4px_-4px_8px_rgba(255,255,255,0.9)]
                        dark:shadow-[4px_4px_8px_rgba(0,0,0,0.3),-4px_-4px_8px_rgba(30,30,30,0.2)]
                        z-20">
                        <Image 
                          src="/images/avatar/avatar.jpg"
                          alt={translate("Елис - Автор", "Elis - Author")}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 80px, 80px"
                          priority
                        />
                      </div>
                    </div>
                  </div>
                </div>
              
                {/* Bio & Information Section */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 relative z-10">
                  {/* Main Bio Section */}
                  <div className="md:col-span-8 p-4 rounded-xl
                    bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm
                    shadow-inner border border-gray-100/50 dark:border-gray-800/50">
                    <h2 className="text-base font-bold mb-3 text-gray-900 dark:text-white flex items-center">
                      <User className="h-4 w-4 mr-2 text-gray-700 dark:text-gray-400" />
                      {translate("За мен", "About Me")}
                    </h2>
                    <div className="space-y-3 text-gray-700 dark:text-gray-300 text-sm">
                      <p>
                        {translate(
                          "Аз съм Елис - дипломиран психолог, учител и духовен лечител, майка на три прекрасни момчета. Автор на книги, статии и приказки за деца и възрастни. С множество сертификати в различни области, аз съм специалист с богат професионален опит.",
                          "I am Elis - a certified psychologist, teacher and spiritual healer, mother of three wonderful boys. Author of books, articles, and stories for both children and adults. With multiple certifications in various fields, I am a specialist with rich professional experience."
                        )}
                      </p>
                      <p>
                        {translate(
                          "Моето призвание е да творя и да споделям знанията си чрез писане. Интересувам се от здравословно хранене и съм разработила цялостна концепция за психично, емоционално и физическо здраве. През годините съм преборила успешно множество предизвикателства – от зависимости и семейни драми до провал в бизнеса, паник атаки и депресия.",
                          "My calling is to create and share my knowledge through writing. I'm passionate about healthy eating and have developed a holistic concept for mental, emotional, and physical health. Over the years, I've successfully overcome many challenges - from addictions and family dramas to business failure, panic attacks, and depression."
                        )}
                      </p>
                      <p>
                        {translate(
                          "От над 13 години се интересувам от здравословно хранене, като съм пробвала различни режими - веганство, вегетарианство, суровоядство и други. Благодарение на всичко това съм разработила цялостна концепция за психично, емоционално и физическо здраве, защото храната не е пречка, а психологическите бариери пред нас.",
                          "For over 13 years, I've been interested in healthy eating, having tried various diets - veganism, vegetarianism, raw food diet, and others. Thanks to all this, I've developed a holistic concept for mental, emotional, and physical health, because food isn't the obstacle - it's the psychological barriers we face."
                        )}
                      </p>
                      
                      <div className="p-3 mt-2 rounded-lg
                        bg-gradient-to-br from-gray-50/80 via-white/90 to-gray-50/80 
                        dark:from-gray-700/50 dark:via-gray-800/50 dark:to-gray-700/50
                        border border-gray-100/80 dark:border-gray-700/50
                        shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8)]
                        dark:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1)]">
                        <div className="flex items-start">
                          <div className="mr-3 mt-1 rounded-full p-1.5
                            bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-800
                            shadow-[1px_1px_2px_rgba(0,0,0,0.05),-1px_-1px_2px_rgba(255,255,255,0.8)]
                            dark:shadow-[1px_1px_2px_rgba(0,0,0,0.2),-1px_-1px_2px_rgba(30,30,30,0.1)]">
                            <Quote className="h-3 w-3 text-gray-500" />
                          </div>
                          <p className="italic text-gray-700 dark:text-gray-300 text-xs">
                            {translate(
                              "Ако аз съм дърво, моите плодове са моите книги. Аз съм дошла тук на земята, за да раздавам от своите плодове. Това дали ще имам успех, дали ще имам семейство, кариера, статус в обществото – всичко е без значение, защото аз съм тук, за да творя.",
                              "If I am a tree, my fruits are my books. I came to this earth to share my fruits. Whether I have success, family, career, social status - none of it matters, because I am here to create."
                            )}
                          </p>
                        </div>
                      </div>
                      
                      <p>
                        {translate(
                          "Моята страст към ученето и преподаването ме кара постоянно да търся нови знания. Обичам разходки сред природата, чета книги за психология и личностно развитие, и пиша собствени произведения от 12-годишна възраст. Моите книги носят послания, които могат да променят живота на читателя към по-добро.",
                          "My passion for learning and teaching drives me to constantly seek new knowledge. I love walks in nature, reading books on psychology and personal development, and I've been writing my own works since I was 12. My books carry messages that can change readers' lives for the better."
                        )}
                      </p>
                      
                      <p>
                        {translate(
                          "Аз съм усмихната, силна и адаптивна жена, която винаги намира начин да преодолее предизвикателствата и да продължи напред с оптимизъм и вяра в бъдещето. Моята мотивация е да помагам на хората около мен да подобрят качеството си на живот, като се погрижат за своето физическо, психическо и емоционално здраве.",
                          "I am a smiling, strong and adaptive woman who always finds a way to overcome challenges and move forward with optimism and faith in the future. My motivation is to help people around me improve their quality of life by taking care of their physical, mental, and emotional health."
                        )}
                      </p>
                      
                      <p>
                        {translate(
                          "Вярвам, че образованието и личностното развитие са ключови за успеха и щастието на всеки човек. Затова се стремя да бъда пример за всеки, който е готов да се докосне до моя свят, чрез развитие, ценности, морал и постоянство.",
                          "I believe that education and personal development are key to the success and happiness of every person. That's why I strive to be an example for everyone who is ready to touch my world through development, values, morals, and perseverance."
                        )}
                      </p>
                    </div>
                  </div>
                  
                  {/* Sidebar with Books and Services */}
                  <div className="md:col-span-4 space-y-4">
                    {/* Books Section */}
                    <div className="p-4 rounded-xl
                      bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm
                      shadow-inner border border-gray-100/50 dark:border-gray-800/50">
                      <div className="flex items-center mb-3">
                        <div className="rounded-full p-2 mr-2
                          bg-gradient-to-br from-gray-50 to-white dark:from-gray-800/30 dark:to-gray-800
                          shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8)]
                          dark:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1)]
                          border border-gray-100/50 dark:border-gray-700/30">
                          <BookOpen className="h-3.5 w-3.5 text-gray-600 dark:text-gray-400" />
                        </div>
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                          {translate("Моите Книги", "My Books")}
                        </h3>
                      </div>
                      
                      <div className="space-y-2">
                        {/* Book 1 */}
                        <div className="flex items-center p-2 rounded-lg
                          bg-gradient-to-br from-gray-50/80 via-white/90 to-gray-50/80 
                          dark:from-gray-700/50 dark:via-gray-800/50 dark:to-gray-700/50
                          border border-gray-100 dark:border-gray-700
                          shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8)]
                          dark:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1)]
                          group hover:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.05),inset_-2px_-2px_4px_rgba(255,255,255,0.8)]
                          dark:hover:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.2),inset_-2px_-2px_4px_rgba(30,30,30,0.1)]
                          transition-all duration-300">
                          <div className="w-10 h-14 relative rounded mr-2 border border-gray-100 dark:border-gray-700 overflow-hidden">
                            <Image 
                              src="/images/books/vdahnovenia-kniga-1.png" 
                              alt="Вдъхновения" 
                              fill 
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white text-xs">Вдъхновения</h4>
                            <Badge variant="outline" className="mt-1 text-xs px-1 py-0 h-4 text-gray-700 dark:text-gray-300">
                              {translate("Поезия", "Poetry")}
                            </Badge>
                          </div>
                        </div>
                        
                        {/* Book 2 */}
                        <div className="flex items-center p-2 rounded-lg
                          bg-gradient-to-br from-gray-50/80 via-white/90 to-gray-50/80 
                          dark:from-gray-700/50 dark:via-gray-800/50 dark:to-gray-700/50
                          border border-gray-100 dark:border-gray-700
                          shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8)]
                          dark:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1)]
                          group hover:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.05),inset_-2px_-2px_4px_rgba(255,255,255,0.8)]
                          dark:hover:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.2),inset_-2px_-2px_4px_rgba(30,30,30,0.1)]
                          transition-all duration-300">
                          <div className="w-10 h-14 relative rounded mr-2 border border-gray-100 dark:border-gray-700 overflow-hidden">
                            <Image 
                              src="/images/books/mindful-eating.jpg" 
                              alt="Mindful Eating" 
                              fill 
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white text-xs">
                              {translate("Осъзнато хранене", "Mindful Eating")}
                            </h4>
                            <Badge variant="outline" className="mt-1 text-xs px-1 py-0 h-4 text-gray-700 dark:text-gray-300">
                              {translate("Самопомощ", "Self-help")}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-3 pt-1 border-t border-gray-200/50 dark:border-gray-700/50">
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full text-xs h-7 mt-2"
                          asChild
                        >
                          <Link href="/books" className="flex items-center justify-center">
                            {translate("Всички Книги", "All Books")}
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                    
                    {/* Top Services Section */}
                    <div className="p-4 rounded-xl
                      bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm
                      shadow-inner border border-gray-100/50 dark:border-gray-800/50">
                      <div className="flex items-center mb-3">
                        <div className="rounded-full p-2 mr-2
                          bg-gradient-to-br from-gray-50 to-white dark:from-gray-800/30 dark:to-gray-800
                          shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8)]
                          dark:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1)]
                          border border-gray-100/50 dark:border-gray-700/30">
                          <Heart className="h-3.5 w-3.5 text-gray-600 dark:text-gray-400" />
                        </div>
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                          {translate("Топ Услуги", "Top Services")}
                        </h3>
                      </div>
                      
                      <div className="space-y-2">
                        {featuredServices.map((service) => (
                          <div key={service.id} className="p-2 rounded-lg
                            bg-gradient-to-br from-gray-50/80 via-white/90 to-gray-50/80 
                            dark:from-gray-700/50 dark:via-gray-800/50 dark:to-gray-700/50
                            border border-gray-100 dark:border-gray-700
                            shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8)]
                            dark:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1)]
                            group hover:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.05),inset_-2px_-2px_4px_rgba(255,255,255,0.8)]
                            dark:hover:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.2),inset_-2px_-2px_4px_rgba(30,30,30,0.1)]
                            transition-all duration-300">
                            <div className="flex items-center">
                              <div className="rounded-full p-1.5 mr-2
                                bg-white dark:bg-gray-800
                                shadow-[1px_1px_2px_rgba(0,0,0,0.05),-1px_-1px_2px_rgba(255,255,255,0.8)]
                                dark:shadow-[1px_1px_2px_rgba(0,0,0,0.2),-1px_-1px_2px_rgba(30,30,30,0.1)]">
                                <div className="w-5 h-5 flex items-center justify-center text-gray-500 dark:text-gray-400">
                                  {
                                    service.id === "individual" ? <User className="w-3 h-3" /> :
                                    service.id === "couple" ? <Heart className="w-3 h-3" /> :
                                    service.id === "family" ? <User className="w-3 h-3" /> :
                                    <MessageCircle className="w-3 h-3" />
                                  }
                                </div>
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900 dark:text-white text-xs">{service.title}</h4>
                                <div className="flex items-center mt-0.5">
                                  <Badge variant="outline" className="text-[10px] px-1 py-0 h-4 text-gray-600 dark:text-gray-400 mr-2">
                                    {service.price.toFixed(2)} лв
                                  </Badge>
                                  <span className="text-[10px] flex items-center text-gray-500 dark:text-gray-500">
                                    <Clock className="h-2.5 w-2.5 mr-0.5" />
                                    {service.duration} {translate("мин.", "min.")}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-3 pt-1 border-t border-gray-200/50 dark:border-gray-700/50">
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full text-xs h-7 mt-2"
                          asChild
                        >
                          <Link href="/services" className="flex items-center justify-center">
                            {translate("Всички Услуги", "All Services")}
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Footer section - full version like main page */}
                <div className="relative mt-8 pt-6 border-t border-gray-200/40 dark:border-gray-700/40">
                  {/* Main footer content with neumorphic design */}
                  <div className="relative">
                    {/* Top footer section with grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-8 border-b border-gray-200/40 dark:border-gray-700/40">
                      {/* Column 1: Brand info */}
                      <div className="flex flex-col">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-gray-100/50 dark:border-gray-800/50">
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900"></div>
                            <div className="absolute inset-0 flex items-center justify-center text-base font-playfair text-gray-700 dark:text-gray-300">E</div>
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white font-playfair">ELIS</h3>
                        </div>
                        
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                          {translate(
                            "Автор, философ и вдъхновител, посветен на споделянето на истории и идеи.",
                            "Author, philosopher, and inspirer dedicated to sharing stories and ideas."
                          )}
                        </p>
                        
                        {/* Social links */}
                        <div className="flex items-center gap-3 mt-auto">
                          <a 
                            href="https://facebook.com/authorELIS" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="h-8 w-8 rounded-full bg-gray-200/70 dark:bg-gray-700/70 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                            aria-label="Facebook"
                          >
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                            </svg>
                          </a>
                          <a 
                            href="https://instagram.com/authorELIS" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="h-8 w-8 rounded-full bg-gray-200/70 dark:bg-gray-700/70 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                            aria-label="Instagram"
                          >
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                            </svg>
                          </a>
                          <a 
                            href="https://twitter.com/authorELIS" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="h-8 w-8 rounded-full bg-gray-200/70 dark:bg-gray-700/70 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                            aria-label="Twitter"
                          >
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                            </svg>
                          </a>
                          <a 
                            href="https://youtube.com/authorELIS" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="h-8 w-8 rounded-full bg-gray-200/70 dark:bg-gray-700/70 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                            aria-label="YouTube"
                          >
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                            </svg>
                          </a>
                        </div>
                      </div>
                      
                      {/* Column 2: Quick Links */}
                      <div className="flex flex-col">
                        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
                          {translate("Бързи връзки", "Quick Links")}
                        </h3>
                        
                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                          <li>
                            <a href="/about" className="flex items-center hover:text-gray-900 dark:hover:text-white transition-colors group">
                              <svg className="mr-2 h-3 w-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                              {translate("За автора", "About the Author")}
                            </a>
                          </li>
                          <li>
                            <a href="/books" className="flex items-center hover:text-gray-900 dark:hover:text-white transition-colors group">
                              <svg className="mr-2 h-3 w-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                              {translate("Книги", "Books")}
                            </a>
                          </li>
                          <li>
                            <a href="/events" className="flex items-center hover:text-gray-900 dark:hover:text-white transition-colors group">
                              <svg className="mr-2 h-3 w-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                              {translate("Събития", "Events")}
                            </a>
                          </li>
                          <li>
                            <a href="/blog" className="flex items-center hover:text-gray-900 dark:hover:text-white transition-colors group">
                              <svg className="mr-2 h-3 w-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                              {translate("Блог", "Blog")}
                            </a>
                          </li>
                        </ul>
                      </div>
                      
                      {/* Column 3: Contact Info */}
                      <div className="flex flex-col">
                        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
                          {translate("Контакти", "Contact")}
                        </h3>
                        
                        <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                          <li className="flex items-start">
                            <svg className="mr-2 h-4 w-4 text-gray-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>
                              {translate(
                                "ул. Г. С. Раковски 128, София",
                                "128 G. S. Rakovski St, Sofia"
                              )}
                            </span>
                          </li>
                          <li className="flex items-center">
                            <svg className="mr-2 h-4 w-4 text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <a href="mailto:contact@authorELIS.com" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                              contact@authorELIS.com
                            </a>
                          </li>
                          <li className="flex items-center">
                            <svg className="mr-2 h-4 w-4 text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <a href="tel:+35929876543" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                              +359 2 987 6543
                            </a>
                          </li>
                        </ul>
                      </div>
                      
                      {/* Column 4: Newsletter */}
                      <div className="flex flex-col">
                        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
                          {translate("Бюлетин", "Newsletter")}
                        </h3>
                        
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                          {translate(
                            "Абонирайте се за нашия бюлетин за новини.",
                            "Subscribe to our newsletter for updates."
                          )}
                        </p>
                        
                        <div className="flex">
                          <input
                            type="email"
                            placeholder={translate("Вашият имейл", "Your email")}
                            className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-l-md text-sm flex-grow focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
                          />
                          <button
                            className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-r-md text-sm transition-colors flex-shrink-0"
                            aria-label={translate("Абонирай се", "Subscribe")}
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Footer bottom section */}
                    <div className="pt-6 flex flex-col sm:flex-row justify-between items-center">
                      <div className="text-gray-500 dark:text-gray-400 text-xs mb-3 sm:mb-0">
                        © {currentYear} ELIS. {translate("Всички права запазени.", "All rights reserved.")}
                      </div>
                      
                      <div className="flex gap-x-4 gap-y-2 text-xs text-gray-500 dark:text-gray-400">
                        <a href="/terms" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                          {translate("Условия", "Terms")}
                        </a>
                        <a href="/privacy" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                          {translate("Поверителност", "Privacy")}
                        </a>
                        <a href="/cookies" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                          {translate("Бисквитки", "Cookies")}
                        </a>
                      </div>
                    </div>
                    
                    {/* Scroll to top button */}
                    <button 
                      onClick={scrollToTop}
                      className="absolute -top-3 right-4 h-8 w-8 rounded-full bg-gray-500 text-white shadow-md flex items-center justify-center hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all"
                      aria-label="Scroll to top"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default AboutPage; 