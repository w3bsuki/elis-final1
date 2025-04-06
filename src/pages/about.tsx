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

// Featured services for showcase
const featuredServices = services.filter(service => service.mvp || service.popular).slice(0, 3);

const AboutPage: NextPage = () => {
  const { language } = useLanguage();
  const translate = (bg: string, en: string) => language === 'en' ? en : bg;

  return (
    <>
      <Head>
        <title>{translate("За Елис | Автор и Поет", "About Elis | Author & Poet")}</title>
        <meta name="description" content={translate(
          "Запознайте се с Елис - психолог, учител и автор на книги, статии и приказки за деца и възрастни",
          "Meet Elis - psychologist, teacher, and author of books, articles, and tales for children and adults"
        )} />
      </Head>

      <section className="min-h-screen flex items-center overflow-hidden relative bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Pattern background */}
          <div className="absolute inset-0 bg-[url('/images/pattern-light.svg')] dark:bg-[url('/images/pattern-dark.svg')] opacity-[0.03] bg-repeat bg-[length:24px_24px]"></div>
          
          {/* Top/Bottom decorative lines */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent"></div>
          
          {/* Decorative blobs */}
          <div className="absolute top-1/4 right-0 w-[40%] h-[40%] bg-green-200/30 dark:bg-green-900/20 rounded-full blur-3xl opacity-60 transform -translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-green-200/30 dark:bg-green-800/20 rounded-full blur-3xl opacity-50"></div>
          
          {/* Animated circles */}
          <motion.div 
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/3 right-[5%] w-64 h-64 border border-green-200/40 dark:border-green-800/30 rounded-full"
          />
          <motion.div 
            initial={{ rotate: 0 }}
            animate={{ rotate: -360 }}
            transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/3 right-[5%] w-48 h-48 border border-green-200/30 dark:border-green-800/20 rounded-full"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Page title */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6"
          >
            <Badge variant="outline" className="inline-flex items-center px-4 py-1.5 bg-green-100/70 dark:bg-green-900/40 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800 mb-4 backdrop-blur-sm">
              <User className="h-3.5 w-3.5 mr-2" />
              {translate("Запознайте се с автора", "Meet The Writer")}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold font-playfair mb-4 text-gray-900 dark:text-white">
              <span className="relative inline-block">
                {translate("За", "About")}
                <span className="absolute -bottom-2 left-0 w-full h-3 bg-green-300 dark:bg-green-600/60 -z-10 transform -rotate-1 rounded-sm"></span>
              </span>
              {' '}
              <span className="text-green-600 dark:text-green-400">
                {translate("Елис", "Elis")}
              </span>
            </h1>
          </motion.div>
          
          {/* Author image below the title */}
          <div className="relative flex justify-center mb-8">
            <div className="relative w-28 h-28 md:w-32 md:h-32">
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-green-500 dark:border-green-700 shadow-[4px_4px_0px_0px_rgba(34,197,94,0.4)] dark:shadow-[4px_4px_0px_0px_rgba(22,163,74,0.3)] z-20">
                <Image 
                  src="/images/books/vdahnovenia-kniga-1.png"
                  alt={translate("Елис - Автор", "Elis - Author")}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 128px"
                  priority
                />
              </div>
              
              {/* Award badge */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                className="absolute -right-4 -bottom-2 bg-white dark:bg-gray-800 p-1.5 rounded-full shadow-md border border-green-200 dark:border-green-800 z-30"
              >
                <Award className="h-4 w-4 text-green-600 dark:text-green-400" />
              </motion.div>
            </div>
          </div>
          
          {/* Main content grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-y relative z-10">
            {/* Diagonal pattern background */}
            <div className="absolute inset-0 z-0">
              <DiagonalPattern 
                className="border-green-300/60 dark:border-green-600/40 rounded-lg" 
                patternColor="22c55e" 
                patternOpacity={0.07}
              />
            </div>
            
            {/* Author Bio Section */}
            <div className="md:col-span-8 py-8 px-4 md:px-6 relative z-10">
              <div className="bg-white/90 dark:bg-gray-800/90 p-6 rounded-lg shadow-md border border-green-200 dark:border-green-800 backdrop-blur-sm">
                <div className="prose prose-green dark:prose-invert max-w-none">
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                      <User className="h-5 w-5 text-green-600" />
                      {translate("За мен", "About Me")}
                    </h2>
                    <div className="space-y-6 text-gray-700 dark:text-gray-300">
                      <p>
                        {translate(
                          "Аз съм Елис - дипломиран психолог и автор на книги, статии, приказки за деца и възрастни. С множество сертификати от различни сфери, аз съм специалист с богат професионален опит. През годините съм преборила успешно множество предизвикателства – от зависимости и семейни драми до провал в бизнеса и паник атаки. Тези трудности ме направиха по-силна и по-осъзната, и сега съм готова да помогна на всеки, който търси подкрепа и насоки в областта на осъзнатото хранене, за да промени живота си към по-добро.",
                          "I am Elis - a certified psychologist and author of books, articles, and stories for both children and adults. With multiple certifications in various fields, I am a specialist with rich professional experience. Over the years, I have successfully overcome many challenges - from dependencies and family dramas to business failure and panic attacks. These difficulties made me stronger and more mindful, and now I am ready to help anyone seeking support and guidance in the field of mindful eating to change their life for the better."
                        )}
                      </p>
                      <p>
                        {translate(
                          "Моето призвание е да творя и да споделям знанията си чрез писане. Книгите и статиите ми са плодовете на моя труд и страст. Вярвам, че съм тук на земята, за да раздавам тези плодове и да помагам на хората да открият своята истина и път към щастието. Независимо от успехите или неуспехите в личния и професионалния ми живот, знам, че най-важното е да продължавам да творя и да вдъхновявам другите.",
                          "My calling is to create and share my knowledge through writing. My books and articles are the fruits of my labor and passion. I believe I am here on earth to share these fruits and help people discover their truth and path to happiness. Regardless of successes or failures in my personal and professional life, I know that the most important thing is to continue creating and inspiring others."
                        )}
                      </p>
                      <p>
                        {translate(
                          "Освен че съм майка на три прекрасни момчета, аз съм също така магистър по иновации в началното образование и притежавам множество сертификати в различни области. Това ми позволява да бъда гъвкава и адаптивна, както в личен, така и в професионален план.",
                          "Besides being a mother of three wonderful boys, I am also a Master's degree holder in Primary Education Innovation and possess numerous certificates in various fields. This allows me to be flexible and adaptive, both personally and professionally."
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Left column - Books info */}
            <div className="md:col-span-4 flex flex-col justify-center relative z-10 py-8">
              <div className="bg-white/90 dark:bg-gray-800/90 p-5 rounded-lg shadow-md border border-green-200 dark:border-green-800 backdrop-blur-sm">
                <div className="inline-flex items-center space-x-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <BookOpen className="h-3.5 w-3.5 text-green-700 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {translate("Моите Книги", "My Books")}
                  </h3>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                  {translate(
                    "Моите книги са съчетание на поезия, вдъхновение и практически съвети. Всяка създадена с цел да помогне на читателите да открият своя път към по-щастлив и осъзнат живот.",
                    "My books are a combination of poetry, inspiration, and practical advice. Each created to help readers find their path to a happier and more mindful life."
                  )}
                </p>
                
                <div className="space-y-3 mt-4">
                  <div className="flex items-center bg-gray-50 dark:bg-gray-700/50 p-2 rounded-lg border border-gray-100 dark:border-gray-700 group hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-300">
                    <div className="w-10 h-10 rounded-md overflow-hidden mr-3">
                      <div className="relative w-full h-full">
                        <Image 
                          src="/images/books/vdahnovenia-kniga-1.png" 
                          alt="Book" 
                          fill 
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-medium text-gray-900 dark:text-white">Вдъхновения</h4>
                      <Badge variant="outline" className="text-xs px-1 py-0 mt-0.5 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800">
                        {translate("Поезия", "Poetry")}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center bg-gray-50 dark:bg-gray-700/50 p-2 rounded-lg border border-gray-100 dark:border-gray-700 group hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-300">
                    <div className="w-10 h-10 rounded-md overflow-hidden mr-3">
                      <div className="relative w-full h-full">
                        <Image 
                          src="/images/books/osaznato-hranene.jpg" 
                          alt="Book" 
                          fill 
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-medium text-gray-900 dark:text-white">Осъзнато Хранене</h4>
                      <Badge variant="outline" className="text-xs px-1 py-0 mt-0.5 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800">
                        {translate("Здраве", "Health")}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <Button
                    className={cn(
                      "relative overflow-hidden group bg-transparent border-2 border-green-500 dark:border-green-400 text-green-600 dark:text-green-400 w-full",
                      "hover:text-white hover:border-green-600 dark:hover:border-green-500",
                      "shadow-sm shadow-green-500/10 dark:shadow-green-400/10",
                      "hover:shadow-md hover:shadow-green-500/20 dark:hover:shadow-green-400/20",
                      "transition-all duration-300 rounded-full px-4 py-1 text-sm"
                    )}
                    asChild
                  >
                    <Link href="/shop" className="inline-flex items-center justify-center gap-2">
                      <span className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 dark:from-green-400 dark:to-green-500 
                            transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                      <span className="relative z-10">{translate("Всички Книги", "All Books")}</span>
                      <ArrowRight className="h-3 w-3 relative z-10" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Middle column - Bio */}
            <div className="md:col-span-4 flex flex-col justify-center relative z-10 py-8">
              <div className="space-y-4 bg-white/90 dark:bg-gray-800/90 p-5 rounded-lg shadow-md border border-green-200 dark:border-green-800 backdrop-blur-sm">
                <div className="inline-flex items-center space-x-2 mb-1">
                  <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <User className="h-3.5 w-3.5 text-green-700 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {translate("За Мен", "About Me")}
                  </h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  {translate(
                    "Като дипломиран психолог, учител и автор на книги, статии и приказки за деца и възрастни, преодолях множество житейски предизвикателства, които формираха това, което съм днес.",
                    "As a psychologist, teacher, and author of books, articles, and tales for both children and adults, I've overcome numerous life challenges that have shaped who I am today."
                  )}
                </p>
                
                <div className="pt-2">
                  <Quote className="h-5 w-5 text-green-500 mb-2" />
                  <p className="text-sm italic text-gray-700 dark:text-gray-300">
                    {translate(
                      "Ако аз съм дърво, моите плодове са моите книги. Аз съм дошла тук на земята, за да раздавам от своите плодове.",
                      "If I am a tree, my fruits are my books. I came to this earth to share my fruits."
                    )}
                  </p>
                </div>
                
                <div className="flex gap-4 pt-3">
                  <div className="flex-1 bg-white dark:bg-gray-800/80 p-3 rounded-lg shadow-sm border border-green-200 dark:border-green-800">
                    <div className="flex flex-col items-center justify-center text-center">
                      <BookOpen className="h-4 w-4 text-green-600 dark:text-green-400 mb-1" />
                      <p className="font-bold text-gray-900 dark:text-white text-base">6+</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{translate("Книги", "Books")}</p>
                    </div>
                  </div>
                  <div className="flex-1 bg-white dark:bg-gray-800/80 p-3 rounded-lg shadow-sm border border-green-200 dark:border-green-800">
                    <div className="flex flex-col items-center justify-center text-center">
                      <Heart className="h-4 w-4 text-green-600 dark:text-green-400 mb-1" />
                      <p className="font-bold text-gray-900 dark:text-white text-base">10+</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{translate("Услуги", "Services")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right column - Featured Services */}
            <div className="md:col-span-4 flex flex-col justify-center relative z-10 py-8">
              <div className="bg-white/90 dark:bg-gray-800/90 p-5 rounded-lg shadow-md border border-green-200 dark:border-green-800 backdrop-blur-sm">
                <div className="inline-flex items-center space-x-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <Package className="h-3.5 w-3.5 text-green-700 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {translate("Топ Услуги", "Top Services")}
                  </h3>
                </div>
                
                <div className="space-y-3">
                  {featuredServices.map((service) => (
                    <div 
                      key={service.id}
                      className="flex items-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg group transition-all duration-300 hover:translate-x-1 hover:bg-green-50 dark:hover:bg-green-900/20 border border-gray-100 dark:border-gray-700"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/10 dark:bg-green-500/20 flex items-center justify-center">
                        {service.category === 'individual' ? (
                          <Clock className="h-4 w-4 text-green-600 dark:text-green-400" />
                        ) : (
                          <Package className="h-4 w-4 text-green-600 dark:text-green-400" />
                        )}
                      </div>
                      <div className="ml-3 flex-1">
                        <h5 className="text-xs font-medium text-gray-900 dark:text-white">
                          {service.title}
                        </h5>
                        <div className="flex items-center">
                          <Badge variant="outline" className="text-xs px-1 py-0 mt-0.5 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800">
                            {service.price} лв.
                          </Badge>
                        </div>
                      </div>
                      <ArrowRight className="h-3 w-3 text-gray-400 dark:text-gray-500 group-hover:text-green-500 dark:group-hover:text-green-400 transition-colors duration-200" />
                    </div>
                  ))}
                </div>
                
                <div className="mt-4">
                  <Button
                    className={cn(
                      "relative overflow-hidden group bg-transparent border-2 border-green-500 dark:border-green-400 text-green-600 dark:text-green-400 w-full",
                      "hover:text-white hover:border-green-600 dark:hover:border-green-500",
                      "shadow-sm shadow-green-500/10 dark:shadow-green-400/10",
                      "hover:shadow-md hover:shadow-green-500/20 dark:hover:shadow-green-400/20",
                      "transition-all duration-300 rounded-full px-4 py-1 text-sm"
                    )}
                    asChild
                  >
                    <Link href="/services" className="inline-flex items-center justify-center gap-2">
                      <span className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 dark:from-green-400 dark:to-green-500 
                            transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                      <span className="relative z-10">{translate("Всички Услуги", "All Services")}</span>
                      <ArrowRight className="h-3 w-3 relative z-10" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage; 