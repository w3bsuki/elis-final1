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
  Sparkles
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

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
  const translate = (bg: string, en: string) => language === 'bg' ? bg : en;
  
  // Form states
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [contactStatus, setContactStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  
  // Newsletter form handling
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setNewsletterStatus("loading");
      
      // Validate input
      newsletterSchema.parse({ email: newsletterEmail });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success
      setNewsletterStatus("success");
      setNewsletterEmail("");
      
      // Reset success message after a delay
      setTimeout(() => {
        setNewsletterStatus("idle");
      }, 3000);
    } catch (error) {
      console.error("Newsletter error:", error);
      setNewsletterStatus("error");
      
      // Reset error state after a delay
      setTimeout(() => {
        setNewsletterStatus("idle");
      }, 3000);
    }
  };
  
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
    <section id="contact" className="py-24 relative bg-white dark:bg-gray-900">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent"></div>
        
        {/* Decorative pattern */}
        <div className="absolute inset-0 bg-[url('/images/pattern-light.svg')] dark:bg-[url('/images/pattern-dark.svg')] opacity-[0.03] bg-repeat bg-[length:24px_24px]"></div>
        
        {/* Decorative blobs */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-green-200/30 dark:bg-green-900/20 rounded-full blur-3xl opacity-70"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-green-200/30 dark:bg-green-900/20 rounded-full blur-3xl opacity-70"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge 
              variant="outline" 
              className="mb-4 px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-700/50 inline-flex items-center gap-1.5"
            >
              <Mail className="h-4 w-4" />
              <span>{translate("Връзка с автора", "Connect with Author")}</span>
            </Badge>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-playfair mb-6">
              {translate("Свържете се с мен", "Get in Touch")}
            </h2>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              {translate(
                "Имате въпрос, предложение или искате да организирате събитие? Моля, свържете се с мен или се абонирайте за моя бюлетин, за да получавате актуална информация за нови книги и събития.",
                "Have a question, suggestion, or want to organize an event? Please reach out or subscribe to my newsletter to receive updates about new books and events."
              )}
            </p>
          </motion.div>
        </div>
        
        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Newsletter + Info */}
          <div className="flex flex-col gap-12">
            {/* Newsletter Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/10 p-8 rounded-xl border border-green-200 dark:border-green-800/50 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-500/90 rounded-full p-3">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {translate("Абонирайте се за новини", "Subscribe to Newsletter")}
                </h3>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {translate(
                  "Получавайте известия за нови книги, събития, специални оферти и ексклузивно съдържание директно във вашата поща.",
                  "Receive notifications about new books, events, special offers, and exclusive content directly to your inbox."
                )}
              </p>
              
              <form onSubmit={handleNewsletterSubmit} className="relative">
                <Input 
                  type="email"
                  placeholder={translate("Вашият имейл адрес", "Your email address")}
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="bg-white dark:bg-gray-800 border-green-200 dark:border-green-700 pr-28 focus:ring-2 focus:ring-green-500 dark:focus:ring-green-600"
                  required
                  disabled={newsletterStatus === "loading" || newsletterStatus === "success"}
                />
                
                <Button 
                  type="submit"
                  className={cn(
                    "absolute right-1.5 top-1.5 h-8 px-4 rounded-md text-white",
                    newsletterStatus === "idle" && "bg-green-600 hover:bg-green-700",
                    newsletterStatus === "loading" && "bg-green-600",
                    newsletterStatus === "success" && "bg-green-600",
                    newsletterStatus === "error" && "bg-red-600"
                  )}
                  disabled={newsletterStatus === "loading" || newsletterStatus === "success"}
                >
                  {newsletterStatus === "idle" && translate("Абонирай", "Subscribe")}
                  {newsletterStatus === "loading" && translate("Изпращане...", "Sending...")}
                  {newsletterStatus === "success" && <CheckCircle className="h-4 w-4" />}
                  {newsletterStatus === "error" && <X className="h-4 w-4" />}
                </Button>
              </form>
              
              {/* Status messages */}
              {newsletterStatus === "success" && (
                <motion.p 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="text-green-600 dark:text-green-400 text-sm mt-2 flex items-center gap-1"
                >
                  <CheckCircle className="h-4 w-4" />
                  {translate("Успешно се абонирахте!", "Successfully subscribed!")}
                </motion.p>
              )}
              
              {newsletterStatus === "error" && (
                <motion.p 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="text-red-600 dark:text-red-400 text-sm mt-2 flex items-center gap-1"
                >
                  <AlertCircle className="h-4 w-4" />
                  {translate("Моля, въведете валиден имейл адрес.", "Please enter a valid email address.")}
                </motion.p>
              )}
            </motion.div>
            
            {/* Author Contact Info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-green-100 dark:border-green-800">
                  <Image
                    src="/images/author-avatar.jpg"
                    alt="Author photo"
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white font-playfair">
                    {translate("ЕЛИС", "ELIS")}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {translate("Автор и лектор", "Author & Speaker")}
                  </p>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{translate("Имейл", "Email")}</p>
                    <a href="mailto:contact@authorELIS.com" className="text-gray-900 dark:text-gray-100 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                      contact@authorELIS.com
                    </a>
                  </div>
                </li>
                
                <li className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{translate("Събития", "Events")}</p>
                    <a href="/events" className="text-gray-900 dark:text-gray-100 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                      {translate("Вижте графика за събития", "View event schedule")}
                    </a>
                  </div>
                </li>
                
                <li className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{translate("Локация", "Location")}</p>
                    <p className="text-gray-900 dark:text-gray-100">
                      {translate("София, България", "Sofia, Bulgaria")}
                    </p>
                  </div>
                </li>
              </ul>
              
              {/* Social Media */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                  {translate("Последвайте ме в социалните мрежи", "Follow me on social media")}
                </h4>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a 
                      key={social.name} 
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "flex items-center justify-center w-10 h-10 rounded-full text-white transition-transform hover:scale-110",
                        social.color
                      )}
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Right Column - Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-500/90 rounded-full p-3">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {translate("Изпратете съобщение", "Send a Message")}
              </h3>
            </div>
            
            {contactStatus === "success" ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center"
              >
                <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-800/40 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {translate("Съобщението е изпратено!", "Message Sent!")}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {translate(
                    "Благодаря за съобщението. Ще се свържа с вас възможно най-скоро.",
                    "Thank you for your message. I will get back to you as soon as possible."
                  )}
                </p>
                <Button 
                  variant="outline"
                  onClick={() => setContactStatus("idle")}
                  className="bg-white dark:bg-gray-800 border-green-200 dark:border-green-700 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/10"
                >
                  {translate("Изпратете ново съобщение", "Send another message")}
                  <Sparkles className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {translate("Вашето име", "Your Name")} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input 
                      id="name"
                      name="name"
                      value={contactForm.name}
                      onChange={handleContactInputChange}
                      className={cn(
                        "pl-10 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600",
                        formErrors.name && "border-red-500 dark:border-red-500 focus:ring-red-500 dark:focus:ring-red-500"
                      )}
                      placeholder={translate("Въведете вашето име", "Enter your name")}
                      disabled={contactStatus === "loading"}
                      required
                    />
                  </div>
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {translate("Имейл адрес", "Email Address")} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input 
                      id="email"
                      name="email"
                      type="email"
                      value={contactForm.email}
                      onChange={handleContactInputChange}
                      className={cn(
                        "pl-10 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600",
                        formErrors.email && "border-red-500 dark:border-red-500 focus:ring-red-500 dark:focus:ring-red-500"
                      )}
                      placeholder={translate("Въведете вашия имейл", "Enter your email")}
                      disabled={contactStatus === "loading"}
                      required
                    />
                  </div>
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {translate("Тема", "Subject")}
                  </label>
                  <Input 
                    id="subject"
                    name="subject"
                    value={contactForm.subject}
                    onChange={handleContactInputChange}
                    className="border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                    placeholder={translate("Тема на съобщението", "Message subject")}
                    disabled={contactStatus === "loading"}
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {translate("Съобщение", "Message")} <span className="text-red-500">*</span>
                  </label>
                  <Textarea 
                    id="message"
                    name="message"
                    value={contactForm.message}
                    onChange={handleContactInputChange}
                    className={cn(
                      "h-32 resize-none border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600",
                      formErrors.message && "border-red-500 dark:border-red-500 focus:ring-red-500 dark:focus:ring-red-500"
                    )}
                    placeholder={translate("Напишете вашето съобщение тук...", "Write your message here...")}
                    disabled={contactStatus === "loading"}
                    required
                  />
                  {formErrors.message && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.message}</p>
                  )}
                </div>
                
                <Button 
                  type="submit"
                  className={cn(
                    "w-full py-3 text-white",
                    contactStatus === "loading" ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                  )}
                  disabled={contactStatus === "loading"}
                >
                  {contactStatus === "loading" ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {translate("Изпращане...", "Sending...")}
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <Send className="mr-2 h-5 w-5" />
                      {translate("Изпратете съобщение", "Send Message")}
                    </span>
                  )}
                </Button>
                
                {contactStatus === "error" && !Object.keys(formErrors).length && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-red-600 dark:text-red-400 text-sm flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <span>
                      {translate(
                        "Възникна грешка при изпращането на съобщението. Моля, опитайте отново.",
                        "An error occurred while sending your message. Please try again."
                      )}
                    </span>
                  </div>
                )}
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
} 