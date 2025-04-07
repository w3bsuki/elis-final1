"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { HelpCircle, Mail, PlusCircle, MinusCircle } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

export default function FAQ() {
  const { language } = useLanguage();
  
  // Get the FAQ questions directly from translations
  const faqQuestions = language === 'en' 
    ? translations.en.faq.questions 
    : translations.bg.faq.questions;
  
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-1/2 -left-1/4 w-3/4 h-1/2 rounded-full bg-green-100/30 dark:bg-green-900/10 blur-3xl"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_400px_at_50%_300px,rgba(34,197,94,0.05),transparent)]"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main container with neumorphic styling */}
        <div className="rounded-2xl 
          bg-gradient-to-br from-white/80 to-green-50/50 dark:from-gray-900/80 dark:to-green-950/30 
          border border-green-100/60 dark:border-green-900/40 
          shadow-[-10px_-10px_30px_rgba(255,255,255,0.8),_10px_10px_30px_rgba(0,0,0,0.1)] 
          dark:shadow-[-10px_-10px_30px_rgba(15,15,15,0.1),_10px_10px_30px_rgba(0,0,0,0.2)]
          backdrop-blur-md 
          p-6 sm:p-12">
          <div className="absolute inset-0 bg-pattern-dots opacity-5"></div>
          
          {/* Modern heading with accent */}
          <div className="text-center mb-16 max-w-3xl mx-auto relative">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full 
              bg-gradient-to-br from-green-50 to-white/90 dark:from-green-900/40 dark:to-green-950/20
              text-sm font-medium text-green-600 dark:text-green-400 
              mb-4 
              border border-green-200/50 dark:border-green-800/30 
              shadow-[-3px_-3px_6px_rgba(255,255,255,0.8),_3px_3px_6px_rgba(0,0,0,0.1)] 
              dark:shadow-[-2px_-2px_4px_rgba(40,40,40,0.25),_2px_2px_4px_rgba(0,0,0,0.3)]">
              <div className="p-1.5 rounded-full 
                bg-gradient-to-br from-green-100 to-green-50 dark:from-green-800/30 dark:to-green-900/20
                shadow-[0_1px_3px_rgba(0,0,0,0.1)]
                dark:shadow-[0_1px_3px_rgba(0,0,0,0.2)]">
                <HelpCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
              {language === 'en' ? 'Frequently Asked Questions' : 'Често Задавани Въпроси'}
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold font-playfair mb-4 text-gray-900 dark:text-white">
              {language === 'en' ? "Got Questions? We've Got Answers" : 'Имате Въпроси? Ние Имаме Отговори'}
            </h2>
            
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full mx-auto mb-4"></div>
            
            <div className="max-w-2xl mx-auto px-6 py-4 rounded-xl
              bg-gradient-to-br from-white/80 to-green-50/50 dark:from-gray-800/80 dark:to-green-950/20
              shadow-[inset_2px_2px_5px_rgba(0,0,0,0.03),_inset_-2px_-2px_5px_rgba(255,255,255,0.7)] 
              dark:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-2px_-2px_5px_rgba(255,255,255,0.05)]
              backdrop-blur-sm">
              <p className="text-gray-600 dark:text-gray-300 text-base">
                {language === 'en' 
                  ? 'Everything you need to know about our book platform and services'
                  : 'Всичко, което трябва да знаете за нашата книжна платформа и услуги'}
              </p>
            </div>
          </div>

          {/* FAQ accordion with neumorphic styling */}
          <div className="max-w-3xl mx-auto rounded-xl p-6 sm:p-8
            bg-gradient-to-br from-white/70 to-green-50/30 dark:from-gray-900/70 dark:to-green-950/20 
            border border-green-100/40 dark:border-green-900/20 
            shadow-[inset_2px_2px_5px_rgba(0,0,0,0.03),_inset_-2px_-2px_5px_rgba(255,255,255,0.7)] 
            dark:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-2px_-2px_5px_rgba(255,255,255,0.05)]
            backdrop-blur-sm">
            <Accordion type="single" collapsible className="w-full">
              {faqQuestions.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border-b-2 border-gray-200 dark:border-gray-700 last:border-0"
                >
                  <AccordionTrigger className="text-left py-5 text-lg font-medium text-gray-900 dark:text-white hover:text-green-600 dark:hover:text-green-400 transition-colors">
                    <div className="flex items-center gap-3 justify-between w-full">
                      <span>{faq.question}</span>
                      <div className="flex items-center justify-center size-8 rounded-full 
                        bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-gray-900
                        border border-green-500/30 dark:border-green-400/30 
                        shadow-[-2px_-2px_4px_rgba(255,255,255,0.8),_2px_2px_4px_rgba(0,0,0,0.1)] 
                        dark:shadow-[-2px_-2px_4px_rgba(40,40,40,0.25),_2px_2px_4px_rgba(0,0,0,0.3)]
                        text-green-500 dark:text-green-400 
                        group-data-[state=open]:hidden 
                        flex-shrink-0">
                        <PlusCircle className="h-4 w-4" />
                      </div>
                      <div className="hidden size-8 rounded-full 
                        bg-gradient-to-br from-green-50 to-white dark:from-green-900/30 dark:to-gray-800
                        border border-green-500/30 dark:border-green-400/30 
                        shadow-[inset_2px_2px_5px_rgba(0,0,0,0.03),_inset_-2px_-2px_5px_rgba(255,255,255,0.8)] 
                        dark:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-2px_-2px_5px_rgba(255,255,255,0.05)]
                        text-green-500 dark:text-green-400 
                        group-data-[state=open]:flex 
                        items-center justify-center
                        flex-shrink-0">
                        <MinusCircle className="h-4 w-4" />
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="py-4 px-6 rounded-xl
                    bg-gradient-to-br from-white/60 to-green-50/20 dark:from-gray-800/60 dark:to-green-950/10
                    shadow-[inset_2px_2px_5px_rgba(0,0,0,0.02),_inset_-2px_-2px_5px_rgba(255,255,255,0.5)] 
                    dark:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.08),_inset_-2px_-2px_5px_rgba(255,255,255,0.02)]
                    backdrop-blur-sm
                    text-gray-600 dark:text-gray-300 text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Call to action with neumorphic styling */}
          <div className="text-center mt-16 max-w-2xl mx-auto">
            <div className="px-6 py-8 rounded-xl
              bg-gradient-to-br from-white/70 to-green-50/30 dark:from-gray-900/70 dark:to-green-950/20 
              border border-green-100/40 dark:border-green-900/20 
              shadow-[0_10px_20px_rgba(0,0,0,0.03)]
              backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {language === 'en' ? 'Still have questions?' : 'Все още имате въпроси?'}
              </h3>
              <div className="h-0.5 w-16 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full mx-auto my-3"></div>
              <p className="text-gray-600 dark:text-gray-300 mb-8 px-4 py-3 rounded-lg
                bg-gradient-to-br from-white/60 to-green-50/20 dark:from-gray-800/60 dark:to-green-950/10
                shadow-[inset_1px_1px_2px_rgba(0,0,0,0.02),_inset_-1px_-1px_2px_rgba(255,255,255,0.6)] 
                dark:shadow-[inset_1px_1px_2px_rgba(0,0,0,0.08),_inset_-1px_-1px_2px_rgba(255,255,255,0.03)]">
                {language === 'en' 
                  ? "Can't find the answer you're looking for? Feel free to reach out to our support team."
                  : 'Не можете да намерите отговора, който търсите? Не се колебайте да се свържете с нашия екип за поддръжка.'}
              </p>
              <Button 
                className="
                  bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 
                  text-white text-lg 
                  px-8 py-4 h-14 
                  rounded-xl 
                  border border-green-400/20
                  shadow-[-5px_-5px_10px_rgba(255,255,255,0.8),_5px_5px_10px_rgba(0,0,0,0.15),_0_5px_15px_rgba(0,170,80,0.15)] 
                  dark:shadow-[-5px_-5px_10px_rgba(40,40,40,0.15),_5px_5px_10px_rgba(0,0,0,0.35),_0_5px_15px_rgba(0,170,80,0.25)]
                  hover:shadow-[-1px_-1px_5px_rgba(255,255,255,0.6),_1px_1px_5px_rgba(0,0,0,0.2),inset_-2px_-2px_5px_rgba(255,255,255,0.1),inset_2px_2px_4px_rgba(0,0,0,0.15)]
                  dark:hover:shadow-[-1px_-1px_5px_rgba(40,40,40,0.2),_1px_1px_5px_rgba(0,0,0,0.3),inset_-2px_-2px_5px_rgba(255,255,255,0.05),inset_2px_2px_4px_rgba(0,0,0,0.3)]
                  transition-all duration-300
                  hover:translate-y-0.5
                  group
                " 
                asChild
              >
                <a href="#contact" className="flex items-center justify-center">
                  <div className="mr-2 p-1.5 rounded-full 
                    bg-green-400/20 
                    shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.1)]
                    transition-transform group-hover:scale-110">
                    <Mail className="h-5 w-5" />
                  </div>
                  {language === 'en' ? 'Contact Support' : 'Свържете се с Поддръжка'}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 