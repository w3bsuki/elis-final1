"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { 
  Mail, 
  Send, 
  MessageSquare, 
  Calendar,
  User,
  CheckCircle,
  X,
  AlertCircle,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  BookOpen,
  MapPin,
  Sparkles,
  CalendarClock
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { BookingCalendar, BookingData } from "@/components/ui/booking-calendar";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NewsletterSignup } from "@/components/ui/NewsletterSignup";

// Form validation schemas
const newsletterSchema = z.object({
  email: z.string().email(),
});

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
  subject: z.string().optional(),
});

export function Contact() {
  const { language } = useLanguage();
  const { toast } = useToast();
  const translate = (bg: string, en: string) => language === 'bg' ? bg : en;
  
  // Form states
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [contactStatus, setContactStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  
  // Contact form handling
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});
    
    try {
      setContactStatus("loading");
      
      // Validate all fields
      contactSchema.parse(contactForm);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success
      setContactStatus("success");
      setContactForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      
      // Reset success message after a delay
      setTimeout(() => {
        setContactStatus("idle");
      }, 5000);
    } catch (error) {
      console.error("Contact form error:", error);
      setContactStatus("error");
      
      // Extract and set validation errors
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0] as string] = err.message;
          }
        });
        setFormErrors(errors);
      }
      
      // Reset error state after a delay
      setTimeout(() => {
        setContactStatus("idle");
      }, 5000);
    }
  };
  
  // Helper to handle contact form field changes
  const handleContactInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
    
    // Clear the specific error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  // Handle calendar booking
  const handleBookingComplete = (bookingData: BookingData) => {
    console.log("Booking completed:", bookingData);
    
    // Show success toast via useToast
    toast.success({
      title: translate("Консултацията е запазена", "Consultation Booked"),
      description: translate(
        "Ще получите имейл с потвърждение и детайли за консултацията.",
        "You will receive an email with confirmation and details about the consultation."
      )
    });
  };
  
  // Social media links
  const socialLinks = [
    { 
      name: "Facebook", 
      icon: <Facebook className="h-5 w-5" />, 
      url: "https://facebook.com/authorELIS", 
      color: "bg-blue-500 hover:bg-blue-600" 
    },
    { 
      name: "Instagram", 
      icon: <Instagram className="h-5 w-5" />, 
      url: "https://instagram.com/authorELIS", 
      color: "bg-pink-500 hover:bg-pink-600" 
    },
    { 
      name: "Twitter", 
      icon: <Twitter className="h-5 w-5" />, 
      url: "https://twitter.com/authorELIS", 
      color: "bg-blue-400 hover:bg-blue-500" 
    },
    { 
      name: "Youtube", 
      icon: <Youtube className="h-5 w-5" />, 
      url: "https://youtube.com/authorELIS", 
      color: "bg-red-500 hover:bg-red-600" 
    }
  ];
  
  return (
    <div className="relative z-0">
      {/* Blue-tinted decorative background element */}
      <div className="absolute right-0 top-8 w-48 h-48 bg-gradient-to-br from-blue-400/10 to-indigo-500/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute left-0 bottom-8 w-48 h-48 bg-gradient-to-tr from-blue-500/10 to-sky-400/5 rounded-full blur-3xl -z-10"></div>
      
      {/* Updated Section header with badge headline */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-3 mb-4 px-6 py-3 
          bg-gradient-to-br from-white/80 to-blue-50/60 dark:from-gray-800/80 dark:to-blue-900/30
          border border-blue-200/50 dark:border-blue-800/30
          rounded-full 
          shadow-[-5px_-5px_10px_rgba(255,255,255,0.8),_5px_5px_10px_rgba(0,0,0,0.1)] 
          dark:shadow-[-2px_-2px_5px_rgba(40,40,40,0.25),_2px_2px_5px_rgba(0,0,0,0.3)]
          backdrop-blur-sm
        ">
          <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
          <h2 className="text-xl md:text-2xl font-bold font-serif text-black dark:text-white antialiased">
            {translate("Връзка с автора", "Connect with Author")}
          </h2>
        </div>
        
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-400 rounded-full mx-auto mb-4"></div>
        
        <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto text-sm sm:text-base antialiased">
          {translate(
            "Имате въпрос, предложение или искате да организирате събитие? Моля, свържете се с мен или запазете консултация.",
            "Have a question, suggestion, or want to organize an event? Please reach out or book a consultation."
          )}
        </p>
      </div>
      
      {/* Tabs for Contact/Booking */}
      <div className="max-w-4xl mx-auto mb-8">
        <Tabs defaultValue="booking" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto bg-blue-50/70 dark:bg-gray-800/70 border border-blue-200/50 dark:border-blue-800/20 p-1 rounded-full shadow-inner">
            <TabsTrigger value="booking" className="text-base gap-2 py-3 rounded-full data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400">
              <CalendarClock className="h-4 w-4" />
              {translate("Резервирай", "Book")}
            </TabsTrigger>
            <TabsTrigger value="contact" className="text-base gap-2 py-3 rounded-full data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400">
              <MessageSquare className="h-4 w-4" />
              {translate("Контакт", "Contact")}
            </TabsTrigger>
          </TabsList>
          
          {/* Booking Calendar */}
          <TabsContent value="booking" className="mt-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <BookingCalendar onBookingComplete={handleBookingComplete} />
            </motion.div>
          </TabsContent>
          
          {/* Contact Form */}
          <TabsContent value="contact" className="mt-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {/* Left Column - Newsletter */}
              <div className="flex flex-col gap-8">
                {/* Newsletter Card - Use the new NewsletterSignup component */}
                <div className="flex flex-col gap-4 p-6 rounded-xl border border-blue-200/50 dark:border-blue-700/30 shadow-lg 
                  bg-gradient-to-br from-white/90 to-blue-50/50 dark:from-gray-800/90 dark:to-blue-900/10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-blue-500/90 rounded-full p-2.5 shadow-md">
                      <BookOpen className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white antialiased">
                      {translate("Абонирайте се за новини", "Subscribe to Newsletter")}
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm antialiased">
                    {translate(
                      "Получавайте известия за нови книги, събития и специални оферти директно във вашата пощенска кутия.",
                      "Get notified about new books, events, and special offers directly to your inbox."
                    )}
                  </p>
                  
                  <NewsletterSignup 
                    variant="card"
                    showIcon={true}
                    className="mt-2"
                  />
                </div>
                
                {/* Contact Information */}
                <div className="p-6 rounded-xl border border-blue-200/50 dark:border-blue-700/30 shadow-lg
                  bg-gradient-to-br from-white/90 to-blue-50/50 dark:from-gray-800/90 dark:to-blue-900/10">
                  <h3 className="text-lg font-bold mb-4 antialiased">
                    {translate("Информация за контакт", "Contact Information")}
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 bg-blue-100 dark:bg-blue-800/40 p-2 rounded-full shadow-sm">
                        <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm antialiased">
                          {translate("Имейл", "Email")}
                        </h4>
                        <a href="mailto:contact@elis-author.com" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">
                          contact@elis-author.com
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="mt-1 bg-blue-100 dark:bg-blue-800/40 p-2 rounded-full shadow-sm">
                        <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm antialiased">
                          {translate("Локация", "Location")}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          {translate("София, България", "Sofia, Bulgaria")}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="mt-1 bg-blue-100 dark:bg-blue-800/40 p-2 rounded-full shadow-sm">
                        <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm antialiased">
                          {translate("Работно време", "Working Hours")}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          {translate("Понеделник - Петък: 9:00 - 17:00", "Monday - Friday: 9:00 - 17:00")}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Social Media Links */}
                  <div className="mt-6">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3 text-sm antialiased">
                      {translate("Последвайте ме", "Follow Me")}
                    </h4>
                    
                    <div className="flex gap-3">
                      {socialLinks.map((link, index) => (
                        <a 
                          key={link.name} 
                          href={link.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1",
                            link.color
                          )}
                          aria-label={link.name}
                        >
                          {link.icon}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Column - Contact Form */}
              <div>
                <div className="p-6 rounded-xl border border-blue-200/50 dark:border-blue-700/30 shadow-lg
                  bg-gradient-to-br from-white/90 to-blue-50/50 dark:from-gray-800/90 dark:to-blue-900/10">
                  <h3 className="text-lg font-bold mb-4 antialiased">
                    {translate("Изпратете съобщение", "Send a Message")}
                  </h3>
                  
                  {contactStatus === "success" ? (
                    <div className="text-center py-8">
                      <div className="mx-auto w-16 h-16 mb-4 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center shadow-inner">
                        <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                      </div>
                      <h4 className="text-lg font-bold text-green-600 dark:text-green-400 mb-2 antialiased">
                        {translate("Съобщението е изпратено!", "Message Sent Successfully!")}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm antialiased">
                        {translate(
                          "Благодаря за съобщението! Ще се свържа с вас възможно най-скоро.",
                          "Thanks for reaching out! I'll get back to you as soon as possible."
                        )}
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div>
                        <div className="relative">
                          <Input
                            name="name"
                            value={contactForm.name}
                            onChange={handleContactInputChange}
                            placeholder={translate("Вашето име", "Your name")}
                            className={cn(
                              "pl-10 h-11 border-2 rounded-lg shadow-sm bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm",
                              formErrors.name 
                                ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
                                : "border-blue-200/60 dark:border-blue-800/30 focus:border-blue-400"
                            )}
                          />
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500/70">
                            <User className="h-4 w-4" />
                          </div>
                        </div>
                        {formErrors.name && (
                          <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
                        )}
                      </div>
                      
                      <div>
                        <div className="relative">
                          <Input
                            name="email"
                            type="email"
                            value={contactForm.email}
                            onChange={handleContactInputChange}
                            placeholder={translate("Вашият имейл", "Your email")}
                            className={cn(
                              "pl-10 h-11 border-2 rounded-lg shadow-sm bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm",
                              formErrors.email 
                                ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
                                : "border-blue-200/60 dark:border-blue-800/30 focus:border-blue-400"
                            )}
                          />
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500/70">
                            <Mail className="h-4 w-4" />
                          </div>
                        </div>
                        {formErrors.email && (
                          <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
                        )}
                      </div>
                      
                      <div>
                        <div className="relative">
                          <Input
                            name="subject"
                            value={contactForm.subject}
                            onChange={handleContactInputChange}
                            placeholder={translate("Тема (незадължително)", "Subject (optional)")}
                            className="pl-10 h-11 border-2 border-blue-200/60 dark:border-blue-800/30 focus:border-blue-400 rounded-lg shadow-sm bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm"
                          />
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500/70">
                            <Sparkles className="h-4 w-4" />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="relative">
                          <Textarea
                            name="message"
                            value={contactForm.message}
                            onChange={handleContactInputChange}
                            placeholder={translate("Вашето съобщение", "Your message")}
                            className={cn(
                              "pl-10 pt-8 border-2 h-32 rounded-lg shadow-sm bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm",
                              formErrors.message 
                                ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
                                : "border-blue-200/60 dark:border-blue-800/30 focus:border-blue-400"
                            )}
                          />
                          <div className="absolute left-3 top-8 text-blue-500/70">
                            <MessageSquare className="h-4 w-4" />
                          </div>
                        </div>
                        {formErrors.message && (
                          <p className="mt-1 text-sm text-red-500">{formErrors.message}</p>
                        )}
                      </div>
                      
                      <Button
                        type="submit"
                        disabled={contactStatus === "loading"}
                        className={`
                          w-full py-6 rounded-lg
                          bg-gradient-to-br from-blue-500 to-indigo-600
                          hover:from-blue-600 hover:to-indigo-700
                          text-white font-medium
                          transition-all duration-300
                          shadow-md hover:shadow-lg
                          flex items-center justify-center gap-2
                          h-11
                        `}
                      >
                        {contactStatus === "loading" ? (
                          <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            {translate("Изпращане...", "Sending...")}
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5">
                            <Send className="h-4 w-4" />
                            {translate("Изпрати съобщение", "Send Message")}
                          </span>
                        )}
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 