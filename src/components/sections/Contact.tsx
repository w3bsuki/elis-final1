"use client";

import { useState } from "react";
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

export function Contact() {
  const { language } = useLanguage();
  const { toast } = useToast();
  const translate = (bg, en) => language === 'bg' ? bg : en;
  
  // Form states
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [contactStatus, setContactStatus] = useState("idle");
  const [formErrors, setFormErrors] = useState({});
  
  // Contact form handling
  const handleContactSubmit = async (e) => {
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
        const errors = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0]] = err.message;
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
  const handleContactInputChange = (e) => {
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
  const handleBookingComplete = (bookingData) => {
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
    <div className="relative z-0 py-12 pb-6 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute -top-1/2 -right-1/4 w-3/4 h-1/2 rounded-full bg-green-200/30 dark:bg-green-900/10 blur-3xl -z-10"></div>
      <div className="absolute -bottom-1/2 -left-1/4 w-1/2 h-1/2 rounded-full bg-green-200/20 dark:bg-green-900/10 blur-3xl -z-10"></div>
      
      {/* Enhanced Contact Container with nested neumorphic styling */}
      <div className="rounded-2xl p-[5px] mb-4
          bg-gradient-to-br from-gray-200/80 via-white/90 to-gray-100/80 
          dark:from-gray-800/80 dark:via-gray-900/90 dark:to-gray-800/80
          shadow-[6px_6px_12px_rgba(0,0,0,0.1),-6px_-6px_12px_rgba(255,255,255,0.9)]
          dark:shadow-[6px_6px_12px_rgba(0,0,0,0.3),-6px_-6px_12px_rgba(30,30,30,0.2)]
          overflow-hidden">
        
        {/* Inner container with gradient and shadow effects */}
        <div className="bg-gradient-to-br from-green-50/30 via-white/40 to-green-50/30 dark:from-green-900/20 dark:via-gray-900/20 dark:to-green-900/20 p-8 rounded-xl relative">
          {/* Inner shadow effect */}
          <div className="absolute inset-1 bg-white/30 dark:bg-gray-900/30 rounded-lg backdrop-blur-sm shadow-inner pointer-events-none"></div>
          
          {/* Section header with badge headline style */}
          <div className="text-center mb-8 relative z-10">
            {/* Enhanced header with special badge styling */}
            <div className="inline-flex flex-col items-center justify-center">
              {/* Main title with badge-like appearance */}
              <div className="relative inline-flex items-center justify-center mb-4">
                {/* Decorative gradient blob behind the title */}
                <div className="absolute -z-10 w-full h-full scale-150 bg-gradient-to-br from-green-400/20 via-green-300/10 to-green-400/5 dark:from-green-400/10 dark:via-green-300/5 dark:to-green-400/5 blur-2xl rounded-full"></div>
                
                {/* Badge container */}
                <div className="bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900
                  px-5 py-3 rounded-xl
                  shadow-[4px_4px_10px_rgba(0,0,0,0.1),-4px_-4px_10px_rgba(255,255,255,0.9),inset_1px_1px_1px_rgba(255,255,255,0.8),inset_-1px_-1px_1px_rgba(0,0,0,0.05)]
                  dark:shadow-[4px_4px_10px_rgba(0,0,0,0.3),-4px_-4px_10px_rgba(30,30,30,0.2),inset_1px_1px_1px_rgba(50,50,50,0.1),inset_-1px_-1px_1px_rgba(0,0,0,0.1)]
                  flex items-center gap-3 border border-green-200/50 dark:border-green-800/30">
                  
                  {/* Left icon with enhanced styling - smaller */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-green-300/20 blur-xl rounded-full"></div>
                    <div className="rounded-full p-2
                      bg-gradient-to-br from-green-50 to-white dark:from-green-900/30 dark:to-gray-800
                      shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8),inset_1px_1px_1px_rgba(255,255,255,0.8),inset_-1px_-1px_1px_rgba(0,0,0,0.05)]
                      dark:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1),inset_1px_1px_1px_rgba(50,50,50,0.1),inset_-1px_-1px_1px_rgba(0,0,0,0.1)]
                      border border-green-100/50 dark:border-green-800/30 relative">
                      <Mail className="w-5 h-5 text-green-600 dark:text-green-400" aria-hidden="true" />
                    </div>
                  </div>
                  
                  {/* Title with text color changed to black - smaller */}
                  <div className="flex flex-col items-start">
                    <h2 className="text-xl md:text-2xl font-bold font-serif antialiased relative
                      text-gray-900 dark:text-white
                      flex items-center gap-2">
                      {translate("Връзка с автора", "Connect with Author")}
                      {/* Add second icon */}
                      <div className="rounded-full p-2
                        bg-gradient-to-br from-green-50 to-white dark:from-green-900/30 dark:to-gray-800
                        shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8),inset_1px_1px_1px_rgba(255,255,255,0.8),inset_-1px_-1px_1px_rgba(0,0,0,0.05)]
                        dark:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1),inset_1px_1px_1px_rgba(50,50,50,0.1),inset_-1px_-1px_1px_rgba(0,0,0,0.1)]
                        border border-green-100/50 dark:border-green-800/30 relative">
                        <MessageSquare className="w-5 h-5 text-green-600 dark:text-green-400" aria-hidden="true" />
                      </div>
                    </h2>
                    {/* Remove underline */}
                  </div>
                </div>
              </div>
              
              {/* Description text */}
              <div className="max-w-2xl mx-auto mb-5">
                <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg antialiased leading-relaxed">
                  {translate(
                    "Имате въпрос, предложение или искате да организирате събитие? Моля, свържете се с мен или запазете консултация.",
                    "Have a question, suggestion, or want to organize an event? Please reach out or book a consultation."
                  )}
                </p>
              </div>
            </div>
          </div>
          
          {/* Tabs for Contact/Booking */}
          <div className="relative z-10 max-w-4xl mx-auto mb-2">
            <Tabs defaultValue="booking" className="w-full">
              <TabsList className="flex w-full max-w-md mx-auto bg-white/60 dark:bg-gray-800/60 border-0 p-1 rounded-full shadow-md overflow-hidden focus-within:ring-0 focus-within:ring-offset-0">
                <TabsTrigger 
                  value="booking" 
                  className="flex-1 text-sm font-medium flex items-center justify-center gap-2 py-3 px-4 rounded-full
                    data-[state=active]:bg-gradient-to-br data-[state=active]:from-green-500 data-[state=active]:to-green-700
                    data-[state=active]:text-white data-[state=active]:shadow-md
                    data-[state=inactive]:text-gray-700 data-[state=inactive]:dark:text-gray-300
                    data-[state=inactive]:hover:bg-gray-100/80 data-[state=inactive]:dark:hover:bg-gray-700/40
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
                    data-[state=inactive]:hover:bg-gray-100/80 data-[state=inactive]:dark:hover:bg-gray-700/40
                    border-0 transition-all duration-300 focus:ring-0 focus:outline-none focus-visible:ring-0"
                >
                  <MessageSquare className="h-4 w-4" />
                  {translate("Контакт", "Contact")}
                </TabsTrigger>
              </TabsList>
              
              {/* Booking Calendar */}
              <TabsContent value="booking" className="mt-6">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-white/90 dark:bg-gray-800/90 border border-green-200/40 dark:border-green-800/30 rounded-xl p-5 shadow-md">
                    <BookingCalendar onBookingComplete={handleBookingComplete} />
                  </div>
                </motion.div>
              </TabsContent>
              
              {/* Contact Form */}
              <TabsContent value="contact" className="mt-6">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                >
                  {/* Left Column - Newsletter & Contact Info */}
                  <div className="flex flex-col gap-6">
                    {/* Newsletter Card */}
                    <div className="rounded-xl border border-green-200/50 dark:border-green-700/30 shadow-md overflow-hidden bg-white/90 dark:bg-gray-800/90 p-[3px]">
                      <div className="p-5 bg-gradient-to-br from-white/95 to-green-50/50 dark:from-gray-800/95 dark:to-green-950/30 rounded-lg border border-green-100/30 dark:border-green-900/30">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-full p-2.5 shadow-md">
                            <BookOpen className="h-5 w-5 text-white" />
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                            {translate("Абонирайте се за новини", "Subscribe to Newsletter")}
                          </h3>
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                          {translate(
                            "Получавайте известия за нови книги, събития и специални оферти директно във вашата пощенска кутия.",
                            "Get notified about new books, events, and special offers directly to your inbox."
                          )}
                        </p>
                        
                        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg border border-green-200/50 dark:border-green-700/30 p-3 shadow-inner">
                          <NewsletterSignup 
                            variant="card"
                            showIcon={true}
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Contact Information */}
                    <div className="rounded-xl border border-green-200/50 dark:border-green-700/30 shadow-md overflow-hidden bg-white/90 dark:bg-gray-800/90 p-[3px]">
                      <div className="p-5 bg-gradient-to-br from-white/95 to-green-50/50 dark:from-gray-800/95 dark:to-green-950/30 rounded-lg border border-green-100/30 dark:border-green-900/30">
                        <h3 className="text-lg font-bold mb-4 flex items-center">
                          <div className="bg-green-100 dark:bg-green-800/40 p-2 rounded-full shadow-sm mr-2">
                            <MessageSquare className="h-4 w-4 text-green-600 dark:text-green-400" />
                          </div>
                          {translate("Информация за контакт", "Contact Information")}
                        </h3>
                        
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <div className="mt-1 bg-green-100 dark:bg-green-800/40 p-2 rounded-full shadow-sm">
                              <Mail className="h-4 w-4 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                                {translate("Имейл", "Email")}
                              </h4>
                              <a href="mailto:contact@elis-author.com" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 text-sm transition-colors">
                                contact@elis-author.com
                              </a>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <div className="mt-1 bg-green-100 dark:bg-green-800/40 p-2 rounded-full shadow-sm">
                              <MapPin className="h-4 w-4 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                                {translate("Локация", "Location")}
                              </h4>
                              <p className="text-gray-600 dark:text-gray-300 text-sm">
                                {translate("София, България", "Sofia, Bulgaria")}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <div className="mt-1 bg-green-100 dark:bg-green-800/40 p-2 rounded-full shadow-sm">
                              <Calendar className="h-4 w-4 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                                {translate("Работно време", "Working Hours")}
                              </h4>
                              <p className="text-gray-600 dark:text-gray-300 text-sm">
                                {translate("Понеделник - Петък: 9:00 - 17:00", "Monday - Friday: 9:00 - 17:00")}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Social Media Links */}
                        <div className="mt-4 bg-white/60 dark:bg-gray-800/60 rounded-lg border border-green-200/40 dark:border-green-700/20 p-3 shadow-inner">
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2 text-sm">
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
                                  "w-9 h-9 rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1",
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
                    <div className="rounded-xl border border-green-200/50 dark:border-green-700/30 shadow-md overflow-hidden bg-white/90 dark:bg-gray-800/90 p-[3px]">
                      <div className="p-5 bg-gradient-to-br from-white/95 to-green-50/50 dark:from-gray-800/95 dark:to-green-950/30 rounded-lg border border-green-100/30 dark:border-green-900/30">
                        <h3 className="text-lg font-bold mb-4 flex items-center">
                          <div className="bg-green-100 dark:bg-green-800/40 p-2 rounded-full shadow-sm mr-2">
                            <Send className="h-4 w-4 text-green-600 dark:text-green-400" />
                          </div>
                          {translate("Изпратете съобщение", "Send a Message")}
                        </h3>
                        
                        {contactStatus === "success" ? (
                          <div className="text-center py-6">
                            <div className="mx-auto w-16 h-16 mb-3 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center shadow-inner">
                              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                            </div>
                            <h4 className="text-lg font-bold text-green-600 dark:text-green-400 mb-2">
                              {translate("Съобщението е изпратено!", "Message Sent Successfully!")}
                            </h4>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">
                              {translate(
                                "Благодаря за съобщението! Ще се свържа с вас възможно най-скоро.",
                                "Thanks for reaching out! I'll get back to you as soon as possible."
                              )}
                            </p>
                          </div>
                        ) : (
                          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg border border-green-200/50 dark:border-green-700/30 p-4 shadow-inner">
                            <form onSubmit={handleContactSubmit} className="space-y-3">
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
                                        : "border-green-200/60 dark:border-green-800/30 focus:border-green-400"
                                    )}
                                  />
                                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500/70">
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
                                        : "border-green-200/60 dark:border-green-800/30 focus:border-green-400"
                                    )}
                                  />
                                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500/70">
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
                                    className="pl-10 h-11 border-2 border-green-200/60 dark:border-green-800/30 focus:border-green-400 rounded-lg shadow-sm bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm"
                                  />
                                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500/70">
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
                                      "pl-10 pt-8 border-2 h-28 rounded-lg shadow-sm bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm",
                                      formErrors.message 
                                        ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
                                        : "border-green-200/60 dark:border-green-800/30 focus:border-green-400"
                                    )}
                                  />
                                  <div className="absolute left-3 top-8 text-green-500/70">
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
                                className="w-full rounded-full bg-gradient-to-br from-green-600 to-green-800 dark:from-green-500 dark:to-green-700
                                hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5
                                text-white font-medium flex items-center justify-center gap-2 h-12
                                border border-green-400/30 dark:border-green-400/20 shadow-lg"
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
  );
} 