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
  
  // Custom animation classes
  const styles = {
    animatePulseSlow: "animate-[pulse_6s_ease-in-out_infinite]",
    animateFloat: "animate-[float_8s_ease-in-out_infinite]"
  };
  
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
          
          {/* Animated circles - decorative elements */}
          <div className="absolute top-20 left-10 w-64 h-64 bg-pink-200/10 dark:bg-pink-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-40 right-10 w-72 h-72 bg-blue-200/10 dark:bg-blue-500/5 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-purple-200/10 dark:bg-purple-500/5 rounded-full blur-3xl animate-pulse-slow delay-2000"></div>
        </div>

        {/* Container with max width and centered */}
        <div className={CONTAINER_WIDTH_CLASSES + " flex-1 flex flex-col"}>
          {/* Single main container for the page - increased width */}
          <div className="max-w-full mx-auto w-full bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden mb-8">
            <div className="bg-gradient-to-br from-gray-100/50 via-white/50 to-gray-100/50 dark:from-gray-900/50 dark:via-gray-950/50 dark:to-gray-900/50 p-5 sm:p-6 md:p-8 relative">
              {/* Glass panel effect with inner shadow */}
              <div className="absolute inset-1 bg-white/30 dark:bg-gray-900/30 rounded-lg backdrop-blur-sm shadow-inner pointer-events-none"></div>
              
              {/* Main content wrapper */}
              <div className="relative z-0">
                {/* Section header - nested inside the main container */}
                <div className="text-center mb-8 relative z-10">
                  {/* Header with icon and title */}
                  <div className="flex items-center justify-center gap-3 mb-3">
                    {/* Icon with neumorphic style */}
                    <div className="rounded-full p-3
                      bg-gradient-to-br from-gray-50 to-white dark:from-gray-800/30 dark:to-gray-800
                      shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8)]
                      dark:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1)]
                      border border-gray-100/50 dark:border-gray-700/30 relative">
                      <User className="w-6 h-6 text-gray-600 dark:text-gray-400" aria-hidden="true" />
                    </div>
                    
                    <h1 className="text-2xl md:text-3xl font-bold font-serif text-black dark:text-white antialiased relative">
                      {translate("За Елис", "About Elis")}
                    </h1>
                  </div>
                  
                  <div className="w-32 h-1 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full mx-auto mb-6"></div>
                  
                  {/* Author image inside central container */}
                  <div className="flex justify-center mb-6">
                    <div className="relative w-28 h-28">
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
                          sizes="(max-width: 768px) 112px, 112px"
                          priority
                        />
                      </div>
                    </div>
                  </div>
                </div>
              
                {/* Bio & Information Section */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10">
                  {/* Main Bio Section */}
                  <div className="md:col-span-8 p-6 rounded-xl
                    bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm
                    shadow-inner border border-gray-100/50 dark:border-gray-800/50">
                    <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white flex items-center">
                      <User className="h-5 w-5 mr-2 text-gray-700 dark:text-gray-400" />
                      {translate("За мен", "About Me")}
                    </h2>
                    
                    {/* Added decorative element */}
                    <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent mb-5 opacity-50"></div>
                    
                    <div className="space-y-4 text-gray-700 dark:text-gray-300 text-base">
                      {/* First paragraph with highlight */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <p className="relative pl-4 border-l-2 border-gray-300 dark:border-gray-600">
                          <span className="absolute -left-1 top-0 w-2 h-8 bg-gray-400 dark:bg-gray-500 rounded opacity-50"></span>
                          {translate(
                            "Аз съм Елис - дипломиран психолог, учител и духовен лечител, майка на три прекрасни момчета. Автор на книги, статии и приказки за деца и възрастни. С множество сертификати в различни области, аз съм специалист с богат професионален опит.",
                            "I am Elis - a certified psychologist, teacher and spiritual healer, mother of three wonderful boys. Author of books, articles, and stories for both children and adults. With multiple certifications in various fields, I am a specialist with rich professional experience."
                          )}
                        </p>
                      </motion.div>
                      
                      {/* Second paragraph with highlight box */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      >
                        <div className="bg-gradient-to-r from-gray-50/70 to-white/70 dark:from-gray-800/40 dark:to-gray-700/40 p-4 rounded-lg border-l-4 border-gray-400 dark:border-gray-500 shadow-sm">
                          {translate(
                            "Моето призвание е да творя и да споделям знанията си чрез писане. Интересувам се от здравословно хранене и съм разработила цялостна концепция за психично, емоционално и физическо здраве. През годините съм преборила успешно множество предизвикателства – от зависимости и семейни драми до провал в бизнеса, паник атаки и депресия.",
                            "My calling is to create and share my knowledge through writing. I'm passionate about healthy eating and have developed a holistic concept for mental, emotional, and physical health. Over the years, I've successfully overcome many challenges - from addictions and family dramas to business failure, panic attacks, and depression."
                          )}
                        </div>
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <p>
                          {translate(
                            "От над 13 години се интересувам от здравословно хранене, като съм пробвала различни режими - веганство, вегетарианство, суровоядство и други. Благодарение на всичко това съм разработила цялостна концепция за психично, емоционално и физическо здраве, защото храната не е пречка, а психологическите бариери пред нас.",
                            "For over 13 years, I've been interested in healthy eating, having tried various diets - veganism, vegetarianism, raw food diet, and others. Thanks to all this, I've developed a holistic concept for mental, emotional, and physical health, because food isn't the obstacle - it's the psychological barriers we face."
                          )}
                        </p>
                      </motion.div>
                      
                      {/* Quote with enhanced styling */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="my-6"
                      >
                        <div className="p-5 mt-3 rounded-lg
                          bg-gradient-to-br from-gray-50/80 via-white/90 to-gray-50/80 
                          dark:from-gray-700/50 dark:via-gray-800/50 dark:to-gray-700/50
                          border border-gray-100/80 dark:border-gray-700/50
                          shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8)]
                          dark:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1)]
                          relative">
                          {/* Quotation mark decorations */}
                          <div className="absolute top-2 left-3 text-4xl font-serif text-gray-200 dark:text-gray-700">&#8220;</div>
                          <div className="absolute bottom-2 right-3 text-4xl font-serif text-gray-200 dark:text-gray-700">&#8221;</div>
                          
                          <div className="flex items-start relative z-10">
                            <div className="mr-4 mt-1 rounded-full p-2.5
                              bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-800
                              shadow-[1px_1px_2px_rgba(0,0,0,0.05),-1px_-1px_2px_rgba(255,255,255,0.8)]
                              dark:shadow-[1px_1px_2px_rgba(0,0,0,0.2),-1px_-1px_2px_rgba(30,30,30,0.1)]">
                              <Quote className="h-5 w-5 text-gray-500" />
                            </div>
                            <p className="italic text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                              {translate(
                                "Ако аз съм дърво, моите плодове са моите книги. Аз съм дошла тук на земята, за да раздавам от своите плодове. Това дали ще имам успех, дали ще имам семейство, кариера, статус в обществото – всичко е без значение, защото аз съм тук, за да творя.",
                                "If I am a tree, my fruits are my books. I came to this earth to share my fruits. Whether I have success, family, career, social status - none of it matters, because I am here to create."
                              )}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                      
                      {/* Remaining paragraphs with animation */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      >
                        <p>
                          {translate(
                            "Моята страст към ученето и преподаването ме кара постоянно да търся нови знания. Обичам разходки сред природата, чета книги за психология и личностно развитие, и пиша собствени произведения от 12-годишна възраст. Моите книги носят послания, които могат да променят живота на читателя към по-добро.",
                            "My passion for learning and teaching drives me to constantly seek new knowledge. I love walks in nature, reading books on psychology and personal development, and I've been writing my own works since I was 12. My books carry messages that can change readers' lives for the better."
                          )}
                        </p>
                      </motion.div>
                      
                      {/* Interests section with icons */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="mt-6 p-4 bg-gray-50/70 dark:bg-gray-800/40 rounded-lg border border-gray-100/80 dark:border-gray-700/50"
                      >
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                          <Heart className="h-4 w-4 mr-2 text-rose-500" />
                          {translate("Интереси и хобита", "Interests & Hobbies")}
                        </h3>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          <div className="flex items-center bg-white/60 dark:bg-gray-700/40 rounded-md p-2 border border-gray-100 dark:border-gray-600/30">
                            <BookOpen className="h-3.5 w-3.5 text-blue-500 mr-2" />
                            <span className="text-xs">{translate("Четене", "Reading")}</span>
                          </div>
                          <div className="flex items-center bg-white/60 dark:bg-gray-700/40 rounded-md p-2 border border-gray-100 dark:border-gray-600/30">
                            <MessageCircle className="h-3.5 w-3.5 text-green-500 mr-2" />
                            <span className="text-xs">{translate("Писане", "Writing")}</span>
                          </div>
                          <div className="flex items-center bg-white/60 dark:bg-gray-700/40 rounded-md p-2 border border-gray-100 dark:border-gray-600/30">
                            <Award className="h-3.5 w-3.5 text-amber-500 mr-2" />
                            <span className="text-xs">{translate("Преподаване", "Teaching")}</span>
                          </div>
                          <div className="flex items-center bg-white/60 dark:bg-gray-700/40 rounded-md p-2 border border-gray-100 dark:border-gray-600/30">
                            <Calendar className="h-3.5 w-3.5 text-indigo-500 mr-2" />
                            <span className="text-xs">{translate("Природа", "Nature")}</span>
                          </div>
                        </div>
                      </motion.div>
                      
                      {/* Final paragraph */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                      >
                        <p>
                          {translate(
                            "Аз съм усмихната, силна и адаптивна жена, която винаги намира начин да преодолее предизвикателствата и да продължи напред с оптимизъм и вяра в бъдещето. Моята мотивация е да помагам на хората около мен да подобрят качеството си на живот, като се погрижат за своето физическо, психическо и емоционално здраве.",
                            "I am a smiling, strong and adaptive woman who always finds a way to overcome challenges and move forward with optimism and faith in the future. My motivation is to help people around me improve their quality of life by taking care of their physical, mental, and emotional health."
                          )}
                        </p>
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                      >
                        <p>
                          {translate(
                            "Вярвам, че образованието и личностното развитие са ключови за успеха и щастието на всеки човек. Затова се стремя да бъда пример за всеки, който е готов да се докосне до моя свят, чрез развитие, ценности, морал и постоянство.",
                            "I believe that education and personal development are key to the success and happiness of every person. That's why I strive to be an example for everyone who is ready to touch my world through development, values, morals, and perseverance."
                          )}
                        </p>
                      </motion.div>
                    </div>
                  </div>
                  
                  {/* Sidebar with Books and Services */}
                  <div className="md:col-span-4 space-y-6">
                    {/* Books Section */}
                    <div className="p-5 rounded-xl
                      bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm
                      shadow-inner border border-gray-100/50 dark:border-gray-800/50">
                      <div className="flex items-center mb-4">
                        <div className="rounded-full p-2.5 mr-3
                          bg-gradient-to-br from-gray-50 to-white dark:from-gray-800/30 dark:to-gray-800
                          shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8)]
                          dark:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1)]
                          border border-gray-100/50 dark:border-gray-700/30">
                          <BookOpen className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                        </div>
                        <h3 className="text-base font-bold text-gray-900 dark:text-white">
                          {translate("Моите Книги", "My Books")}
                        </h3>
                      </div>
                      
                      <div className="space-y-3">
                        {/* Book 1 */}
                        <div className="flex items-center p-3 rounded-lg
                          bg-gradient-to-br from-gray-50/80 via-white/90 to-gray-50/80 
                          dark:from-gray-700/50 dark:via-gray-800/50 dark:to-gray-700/50
                          border border-gray-100 dark:border-gray-700
                          shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8)]
                          dark:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1)]
                          group hover:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.05),inset_-2px_-2px_4px_rgba(255,255,255,0.8)]
                          dark:hover:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.2),inset_-2px_-2px_4px_rgba(30,30,30,0.1)]
                          transition-all duration-300">
                          <div className="w-14 h-20 relative rounded mr-3 border border-gray-100 dark:border-gray-700 overflow-hidden">
                            <Image 
                              src="/images/books/vdahnovenia-kniga-1.png" 
                              alt="Вдъхновения" 
                              fill 
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white text-sm">Вдъхновения</h4>
                            <Badge variant="outline" className="mt-1.5 text-xs px-2 py-0.5 h-5 text-gray-700 dark:text-gray-300">
                              {translate("Поезия", "Poetry")}
                            </Badge>
                          </div>
                        </div>
                        
                        {/* Book 2 */}
                        <div className="flex items-center p-3 rounded-lg
                          bg-gradient-to-br from-gray-50/80 via-white/90 to-gray-50/80 
                          dark:from-gray-700/50 dark:via-gray-800/50 dark:to-gray-700/50
                          border border-gray-100 dark:border-gray-700
                          shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8)]
                          dark:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1)]
                          group hover:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.05),inset_-2px_-2px_4px_rgba(255,255,255,0.8)]
                          dark:hover:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.2),inset_-2px_-2px_4px_rgba(30,30,30,0.1)]
                          transition-all duration-300">
                          <div className="w-14 h-20 relative rounded mr-3 border border-gray-100 dark:border-gray-700 overflow-hidden">
                            <Image 
                              src="/images/books/osaznato-hranene.jpg" 
                              alt={translate("Осъзнато хранене", "Mindful Eating")}
                              fill 
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                              {translate("Осъзнато хранене", "Mindful Eating")}
                            </h4>
                            <Badge variant="outline" className="mt-1.5 text-xs px-2 py-0.5 h-5 text-gray-700 dark:text-gray-300">
                              {translate("Самопомощ", "Self-help")}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-2 border-t border-gray-200/50 dark:border-gray-700/50">
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full text-sm h-9 mt-2"
                          asChild
                        >
                          <Link href="/shop" className="flex items-center justify-center">
                            {translate("Всички Книги", "All Books")}
                            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                    
                    {/* Top Services Section */}
                    <div className="p-5 rounded-xl
                      bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm
                      shadow-inner border border-gray-100/50 dark:border-gray-800/50">
                      <div className="flex items-center mb-4">
                        <div className="rounded-full p-2.5 mr-3
                          bg-gradient-to-br from-gray-50 to-white dark:from-gray-800/30 dark:to-gray-800
                          shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8)]
                          dark:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1)]
                          border border-gray-100/50 dark:border-gray-700/30">
                          <Heart className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                        </div>
                        <h3 className="text-base font-bold text-gray-900 dark:text-white">
                          {translate("Топ Услуги", "Top Services")}
                        </h3>
                      </div>
                      
                      <div className="space-y-3">
                        {featuredServices.map((service) => (
                          <div key={service.id} className="p-3 rounded-lg
                            bg-gradient-to-br from-gray-50/80 via-white/90 to-gray-50/80 
                            dark:from-gray-700/50 dark:via-gray-800/50 dark:to-gray-700/50
                            border border-gray-100 dark:border-gray-700
                            shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8)]
                            dark:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1)]
                            group hover:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.05),inset_-2px_-2px_4px_rgba(255,255,255,0.8)]
                            dark:hover:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.2),inset_-2px_-2px_4px_rgba(30,30,30,0.1)]
                            transition-all duration-300">
                            <div className="flex items-center">
                              <div className="rounded-full p-2 mr-3
                                bg-white dark:bg-gray-800
                                shadow-[1px_1px_2px_rgba(0,0,0,0.05),-1px_-1px_2px_rgba(255,255,255,0.8)]
                                dark:shadow-[1px_1px_2px_rgba(0,0,0,0.2),-1px_-1px_2px_rgba(30,30,30,0.1)]">
                                <div className="w-6 h-6 flex items-center justify-center text-gray-500 dark:text-gray-400">
                                  {
                                    service.id === "individual" ? <User className="w-3.5 h-3.5" /> :
                                    service.id === "couple" ? <Heart className="w-3.5 h-3.5" /> :
                                    service.id === "family" ? <User className="w-3.5 h-3.5" /> :
                                    <MessageCircle className="w-3.5 h-3.5" />
                                  }
                                </div>
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900 dark:text-white text-sm">{service.title}</h4>
                                <div className="flex items-center mt-1.5">
                                  <Badge variant="outline" className="text-xs px-2 py-0.5 h-5 text-gray-600 dark:text-gray-400 mr-2">
                                    {service.price.toFixed(2)} лв
                                  </Badge>
                                  <span className="text-xs flex items-center text-gray-500 dark:text-gray-500">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {service.duration} {translate("мин.", "min.")}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-4 pt-2 border-t border-gray-200/50 dark:border-gray-700/50">
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full text-sm h-9 mt-2"
                          asChild
                        >
                          <Link href="/shop?tab=services" className="flex items-center justify-center">
                            {translate("Всички Услуги", "All Services")}
                            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Back to top button */}
                <div className="relative mt-8 flex justify-center">
                  <button 
                    onClick={scrollToTop}
                    className="h-10 w-10 rounded-full bg-gray-600 text-white shadow-md flex items-center justify-center hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all"
                    aria-label="Scroll to top"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                  </button>
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