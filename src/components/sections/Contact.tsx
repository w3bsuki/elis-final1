"use client";

import { useState, useMemo, useCallback } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { motion } from "framer-motion";
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
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  BookOpen,
  MapPin,
  Sparkles,
  CalendarClock
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BookingCalendar, BookingData } from "@/components/ui/booking-calendar";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NewsletterSignup } from "@/components/ui/NewsletterSignup";

// Form validation schemas
const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
  subject: z.string().optional(),
});

// Interface for contact form data
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Interface for form errors
interface FormErrors {
  [key: string]: string;
}

// Interface for social media links
interface SocialLink {
  name: string;
  icon: React.ReactNode;
  url: string;
  color: string;
}

export function Contact() {
  const { language } = useLanguage();
  const { toast } = useToast();
  const translate = (bg: string, en: string): string => language === 'en' ? en : bg;
  
  // Form states - combined into single state object to reduce re-renders
  const [contactForm, setContactForm] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formState, setFormState] = useState<{
    status: "idle" | "loading" | "success" | "error";
    errors: FormErrors;
  }>({
    status: "idle",
    errors: {},
  });
  
  // Memoize social links to prevent recreation on re-renders
  const socialLinks: SocialLink[] = useMemo(() => [
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
  ], []);
  
  // Contact form handling with real-time validation
  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      setFormState(prev => ({ ...prev, status: "loading" }));
      
      // Validate all fields
      contactSchema.parse(contactForm);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success
      setFormState({ status: "success", errors: {} });
      setContactForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      
      // Reset success message after a delay
      setTimeout(() => {
        setFormState(prev => ({ ...prev, status: "idle" }));
      }, 5000);
    } catch (error) {
      console.error("Contact form error:", error);
      setFormState(prev => ({ ...prev, status: "error" }));
      
      // Extract and set validation errors
      if (error instanceof z.ZodError) {
        const errors: FormErrors = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0] as string] = err.message;
          }
        });
        setFormState(prev => ({ ...prev, errors }));
      }
      
      // Reset error state after a delay
      setTimeout(() => {
        setFormState(prev => ({ ...prev, status: "idle" }));
      }, 5000);
    }
  };
  
  // Validate field in real-time as user types
  const validateField = (name: string, value: string): string | null => {
    try {
      // Create a partial schema for just this field
      const fieldSchema = z.object({ [name]: contactSchema.shape[name] });
      fieldSchema.parse({ [name]: value });
      return null;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldError = error.errors.find(err => err.path[0] === name);
        return fieldError?.message || null;
      }
      return null;
    }
  };
  
  // Helper to handle contact form field changes with real-time validation
  const handleContactInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
    
    // Only validate if field is not empty (to avoid immediate errors when form first loads)
    if (value.trim()) {
      const error = validateField(name, value);
      
      setFormState(prev => ({
        ...prev,
        errors: {
          ...prev.errors,
          [name]: error || undefined
        }
      }));
    } else {
      // Clear error when field is emptied
      setFormState(prev => {
        const newErrors = { ...prev.errors };
        delete newErrors[name];
        return { ...prev, errors: newErrors };
      });
    }
  };
  
  // Handle calendar booking - memoized to prevent recreation on re-renders
  const handleBookingComplete = useCallback((bookingData: BookingData) => {
    console.log("Booking completed:", bookingData);
    
    // Show success toast via useToast
    toast({
      title: translate("Консултацията е запазена", "Consultation Booked"),
      description: translate(
        "Ще получите имейл с потвърждение и детайли за консултацията.",
        "You will receive an email with confirmation and details about the consultation."
      ),
      variant: "default",
    });
  }, [toast, translate]);
  
  return (
    <div className="relative z-0 py-12 md:py-20 overflow-hidden">
      {/* Enhanced decorative background elements with animation */}
      <div className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-green-300/40 via-teal-200/40 to-blue-300/40 rounded-full blur-[120px] -z-10 animate-pulse-slow"></div>
      <div className="absolute -bottom-1/2 -left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-teal-200/40 via-green-300/40 to-emerald-200/40 rounded-full blur-[120px] -z-10 animate-pulse-slower"></div>
      
      {/* Main container with enhanced glass morphism */}
      <div className="w-full h-full flex flex-col rounded-none
          bg-gradient-to-br from-white/85 via-white/90 to-white/85 
          dark:from-gray-900/95 dark:via-gray-900/90 dark:to-gray-900/95
          border border-white/30 dark:border-white/10
          shadow-[0_10px_30px_rgba(0,0,0,0.15)]
          dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)]
          overflow-hidden">
        
        {/* Inner container with enhanced gradients */}
        <div className="bg-gradient-to-br from-green-50/50 via-transparent to-teal-50/50 
            dark:from-green-900/30 dark:via-transparent dark:to-teal-900/30 
            px-8 py-12 md:py-16 relative flex-grow flex flex-col">
          
          {/* Accent gradients */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.2),transparent_50%)] pointer-events-none"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(5,150,105,0.2),transparent_50%)] pointer-events-none"></div>
          
          {/* Content Container */}
          <div className="relative z-10 max-w-7xl mx-auto w-full">
            {/* Section header */}
            <div className="text-center mb-14 md:mb-20 relative z-10">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex flex-col items-center justify-center"
              >
                {/* Section badge with improved styling */}
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-100 to-green-50 dark:from-green-900/50 dark:to-green-900/30 rounded-full mb-5 border border-green-200/60 dark:border-green-800/40 shadow-lg backdrop-blur-sm">
                  <Mail className="h-4 w-4 text-green-700 dark:text-green-300" />
                  <span className="text-sm font-medium text-green-800 dark:text-green-200">
                    {language === 'bg' ? "Контакти" : "Contact"}
                  </span>
                </div>
                
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 
                  bg-gradient-to-r from-green-600 to-teal-600 dark:from-green-400 dark:to-teal-400
                  bg-clip-text text-transparent drop-shadow-sm">
                  {translate("Свържете се с мен", "Get in Touch")}
                </h2>
                
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  {translate(
                    "Имате въпрос, предложение или искате да организирате събитие? Моля, свържете се с мен или запазете консултация.",
                    "Have a question, suggestion, or want to organize an event? Please reach out or book a consultation."
                  )}
                </p>
              </motion.div>
            </div>
            
            {/* Tabs for Contact/Booking */}
            <div className="relative z-10 max-w-4xl mx-auto mb-2">
              <Tabs defaultValue="booking" className="w-full">
                <TabsList className="flex w-full max-w-md mx-auto bg-white/70 dark:bg-gray-800/60 border border-green-100/30 dark:border-green-900/20 p-1.5 rounded-full shadow-md overflow-hidden focus-within:ring-0 focus-within:ring-offset-0 backdrop-blur-sm">
                  <TabsTrigger 
                    value="booking" 
                    className="flex-1 text-sm font-medium flex items-center justify-center gap-2 py-3 px-4 rounded-full
                      data-[state=active]:bg-gradient-to-br data-[state=active]:from-green-500 data-[state=active]:to-green-700
                      data-[state=active]:text-white data-[state=active]:shadow-md
                      data-[state=inactive]:text-gray-700 data-[state=inactive]:dark:text-gray-300
                      data-[state=inactive]:hover:bg-green-50/80 data-[state=inactive]:dark:hover:bg-green-900/30
                      border-0 transition-all duration-300 focus:ring-0 focus:outline-none focus-visible:ring-0"
                  >
                    <CalendarClock className="h-4 w-4" />
                    {translate("Резервирай", "Book")}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="contact" 
                    className="flex-1 text-sm font-medium flex items-center justify-center gap-2 py-3 px-4 rounded-full
                      data-[state=active]:bg-gradient-to-br data-[state=active]:from-green-500 data-[state=active]:to-green-700
                      data-[state=active]:text-white data-[state=active]:shadow-md
                      data-[state=inactive]:text-gray-700 data-[state=inactive]:dark:text-gray-300
                      data-[state=inactive]:hover:bg-green-50/80 data-[state=inactive]:dark:hover:bg-green-900/30
                      border-0 transition-all duration-300 focus:ring-0 focus:outline-none focus-visible:ring-0"
                  >
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
                    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md 
                      border border-green-200/50 dark:border-green-800/30 
                      rounded-xl p-6 
                      shadow-[0_10px_25px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_25px_rgba(0,0,0,0.3)]
                      hover:shadow-[0_15px_30px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)]
                      transition-all duration-500">
                      <BookingCalendar onBookingComplete={handleBookingComplete} />
                    </div>
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
                    {/* Left Column - Newsletter & Contact Info */}
                    <div className="flex flex-col gap-8">
                      {/* Newsletter Card */}
                      <div className="rounded-xl overflow-hidden 
                        shadow-[0_10px_25px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_25px_rgba(0,0,0,0.3)]
                        hover:shadow-[0_15px_30px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)]
                        transition-all duration-500 transform hover:-translate-y-1
                        bg-white/80 dark:bg-gray-800/80 backdrop-blur-md 
                        border border-green-200/50 dark:border-green-800/30">
                        <div className="bg-gradient-to-br from-white/95 to-green-50/50 dark:from-gray-800/95 dark:to-green-950/30 p-6">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-full p-3 shadow-lg">
                              <BookOpen className="h-5 w-5 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                              {translate("Абонирайте се за новини", "Subscribe to Newsletter")}
                            </h3>
                          </div>
                          
                          <p className="text-gray-600 dark:text-gray-300 text-base mb-4">
                            {translate(
                              "Получавайте известия за нови книги, събития и специални оферти директно във вашата пощенска кутия.",
                              "Get notified about new books, events, and special offers directly to your inbox."
                            )}
                          </p>
                          
                          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg border border-green-200/50 dark:border-green-700/30 p-4 shadow-inner">
                            <NewsletterSignup 
                              variant="card"
                              showIcon={true}
                            />
                          </div>
                        </div>
                      </div>
                      
                      {/* Contact Information */}
                      <div className="rounded-xl overflow-hidden 
                        shadow-[0_10px_25px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_25px_rgba(0,0,0,0.3)]
                        hover:shadow-[0_15px_30px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)]
                        transition-all duration-500 transform hover:-translate-y-1
                        bg-white/80 dark:bg-gray-800/80 backdrop-blur-md 
                        border border-green-200/50 dark:border-green-800/30">
                        <div className="bg-gradient-to-br from-white/95 to-green-50/50 dark:from-gray-800/95 dark:to-green-950/30 p-6">
                          <h3 className="text-xl font-bold mb-5 flex items-center">
                            <div className="bg-green-100 dark:bg-green-800/40 p-2.5 rounded-full shadow-md mr-3">
                              <MessageSquare className="h-5 w-5 text-green-600 dark:text-green-400" />
                            </div>
                            {translate("Информация за контакт", "Contact Information")}
                          </h3>
                          
                          <div className="space-y-4">
                            <div className="flex items-start gap-4 bg-white/60 dark:bg-gray-800/60 rounded-lg p-3 backdrop-blur-sm border border-green-100/30 dark:border-green-900/30 shadow-sm transition-all duration-300 hover:shadow-md hover:border-green-200/50 dark:hover:border-green-800/40">
                              <div className="mt-1 bg-green-100 dark:bg-green-800/40 p-2.5 rounded-full shadow-sm">
                                <Mail className="h-5 w-5 text-green-600 dark:text-green-400" />
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900 dark:text-white text-base">
                                  {translate("Имейл", "Email")}
                                </h4>
                                <a href="mailto:contact@elis-author.com" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 text-base transition-colors">
                                  contact@elis-author.com
                                </a>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-4 bg-white/60 dark:bg-gray-800/60 rounded-lg p-3 backdrop-blur-sm border border-green-100/30 dark:border-green-900/30 shadow-sm transition-all duration-300 hover:shadow-md hover:border-green-200/50 dark:hover:border-green-800/40">
                              <div className="mt-1 bg-green-100 dark:bg-green-800/40 p-2.5 rounded-full shadow-sm">
                                <MapPin className="h-5 w-5 text-green-600 dark:text-green-400" />
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900 dark:text-white text-base">
                                  {translate("Локация", "Location")}
                                </h4>
                                <p className="text-gray-600 dark:text-gray-300 text-base">
                                  {translate("София, България", "Sofia, Bulgaria")}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-4 bg-white/60 dark:bg-gray-800/60 rounded-lg p-3 backdrop-blur-sm border border-green-100/30 dark:border-green-900/30 shadow-sm transition-all duration-300 hover:shadow-md hover:border-green-200/50 dark:hover:border-green-800/40">
                              <div className="mt-1 bg-green-100 dark:bg-green-800/40 p-2.5 rounded-full shadow-sm">
                                <Calendar className="h-5 w-5 text-green-600 dark:text-green-400" />
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900 dark:text-white text-base">
                                  {translate("Работно време", "Working Hours")}
                                </h4>
                                <p className="text-gray-600 dark:text-gray-300 text-base">
                                  {translate("Понеделник - Петък: 9:00 - 17:00", "Monday - Friday: 9:00 - 17:00")}
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          {/* Social Media Links */}
                          <div className="mt-5 bg-white/60 dark:bg-gray-800/60 rounded-lg border border-green-200/40 dark:border-green-700/20 p-4 shadow-inner">
                            <h4 className="font-medium text-gray-900 dark:text-white mb-3 text-base">
                              {translate("Последвайте ме", "Follow Me")}
                            </h4>
                            
                            <div className="flex gap-4">
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
                    </div>
                    
                    {/* Right Column - Contact Form */}
                    <div>
                      <div className="rounded-xl overflow-hidden 
                        shadow-[0_10px_25px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_25px_rgba(0,0,0,0.3)]
                        hover:shadow-[0_15px_30px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)]
                        transition-all duration-500 
                        bg-white/80 dark:bg-gray-800/80 backdrop-blur-md 
                        border border-green-200/50 dark:border-green-800/30">
                        <div className="bg-gradient-to-br from-white/95 to-green-50/50 dark:from-gray-800/95 dark:to-green-950/30 p-6">
                          <h3 className="text-xl font-bold mb-5 flex items-center">
                            <div className="bg-green-100 dark:bg-green-800/40 p-2.5 rounded-full shadow-md mr-3">
                              <Send className="h-5 w-5 text-green-600 dark:text-green-400" />
                            </div>
                            {translate("Изпратете съобщение", "Send a Message")}
                          </h3>
                          
                          {formState.status === "success" ? (
                            <div className="text-center py-8">
                              <div className="mx-auto w-20 h-20 mb-4 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center shadow-inner">
                                <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
                              </div>
                              <h4 className="text-xl font-bold text-green-600 dark:text-green-400 mb-3">
                                {translate("Съобщението е изпратено!", "Message Sent Successfully!")}
                              </h4>
                              <p className="text-gray-600 dark:text-gray-300 text-base">
                                {translate(
                                  "Благодаря за съобщението! Ще се свържа с вас възможно най-скоро.",
                                  "Thanks for reaching out! I'll get back to you as soon as possible."
                                )}
                              </p>
                            </div>
                          ) : (
                            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg border border-green-200/50 dark:border-green-700/30 p-5 shadow-inner">
                              <form onSubmit={handleContactSubmit} className="space-y-4">
                                <div>
                                  <div className="relative">
                                    <Input
                                      name="name"
                                      value={contactForm.name}
                                      onChange={handleContactInputChange}
                                      placeholder={translate("Вашето име", "Your name")}
                                      className={cn(
                                        "pl-11 h-12 border-2 rounded-lg shadow-sm bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm",
                                        formState.errors.name 
                                          ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
                                          : "border-green-200/60 dark:border-green-800/30 focus:border-green-400"
                                      )}
                                    />
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500/70">
                                      <User className="h-5 w-5" />
                                    </div>
                                  </div>
                                  {formState.errors.name && (
                                    <p className="mt-1 text-sm text-red-500">{formState.errors.name}</p>
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
                                        "pl-11 h-12 border-2 rounded-lg shadow-sm bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm",
                                        formState.errors.email 
                                          ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
                                          : "border-green-200/60 dark:border-green-800/30 focus:border-green-400"
                                      )}
                                    />
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500/70">
                                      <Mail className="h-5 w-5" />
                                    </div>
                                  </div>
                                  {formState.errors.email && (
                                    <p className="mt-1 text-sm text-red-500">{formState.errors.email}</p>
                                  )}
                                </div>
                                
                                <div>
                                  <div className="relative">
                                    <Input
                                      name="subject"
                                      value={contactForm.subject}
                                      onChange={handleContactInputChange}
                                      placeholder={translate("Тема (незадължително)", "Subject (optional)")}
                                      className="pl-11 h-12 border-2 border-green-200/60 dark:border-green-800/30 focus:border-green-400 rounded-lg shadow-sm bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm"
                                    />
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500/70">
                                      <Sparkles className="h-5 w-5" />
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
                                        "pl-11 pt-8 border-2 h-32 rounded-lg shadow-sm bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm",
                                        formState.errors.message 
                                          ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
                                          : "border-green-200/60 dark:border-green-800/30 focus:border-green-400"
                                      )}
                                    />
                                    <div className="absolute left-3 top-8 text-green-500/70">
                                      <MessageSquare className="h-5 w-5" />
                                    </div>
                                  </div>
                                  {formState.errors.message && (
                                    <p className="mt-1 text-sm text-red-500">{formState.errors.message}</p>
                                  )}
                                </div>
                                
                                <Button
                                  type="submit"
                                  disabled={formState.status === "loading"}
                                  className="w-full rounded-full bg-gradient-to-br from-green-600 to-teal-700 dark:from-green-500 dark:to-teal-600
                                  hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5
                                  text-white font-medium flex items-center justify-center gap-2 h-14
                                  border border-green-400/30 dark:border-green-400/20 shadow-lg"
                                >
                                  {formState.status === "loading" ? (
                                    <span className="flex items-center">
                                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                      </svg>
                                      {translate("Изпращане...", "Sending...")}
                                    </span>
                                  ) : (
                                    <span className="flex items-center gap-2">
                                      <Send className="h-5 w-5" />
                                      {translate("Изпрати съобщение", "Send Message")}
                                    </span>
                                  )}
                                </Button>
                              </form>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 