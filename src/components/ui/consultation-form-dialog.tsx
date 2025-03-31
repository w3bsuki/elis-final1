"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, Mail, Phone, User, Check } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

interface ConsultationFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ConsultationFormDialog({ open, onOpenChange }: ConsultationFormDialogProps) {
  const { language } = useLanguage();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after 3 seconds and close dialog
      setTimeout(() => {
        setIsSubmitted(false);
        setFormState({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
        onOpenChange(false);
      }, 3000);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border-2 border-green-600 dark:border-green-700 p-0 overflow-hidden rounded-lg shadow-lg">
        <div className="relative w-full h-16 bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
          <Calendar className="h-8 w-8 text-white mr-2" />
          <h2 className="text-xl font-bold text-white">
            {language === "en" ? "Book a Consultation" : "Запазете Консултация"}
          </h2>
        </div>

        <div className="p-6">
          {!isSubmitted ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {language === "en" ? "Request a Consultation" : "Заявете Консултация"}
                </DialogTitle>
                <DialogDescription className="text-sm text-gray-600 dark:text-gray-300">
                  {language === "en" 
                    ? "Fill out the form below and I'll get back to you as soon as possible."
                    : "Попълнете формуляра по-долу и ще се свържа с вас възможно най-скоро."}
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <User className="h-4 w-4 text-green-600 mr-2" />
                    <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {language === "en" ? "Your Name" : "Вашето Име"}
                    </label>
                  </div>
                  <Input
                    id="name"
                    name="name"
                    required
                    value={formState.name}
                    onChange={handleInputChange}
                    placeholder={language === "en" ? "Enter your full name" : "Въведете пълното си име"}
                    className="rounded-md"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-green-600 mr-2" />
                    <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {language === "en" ? "Email Address" : "Имейл Адрес"}
                    </label>
                  </div>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={handleInputChange}
                    placeholder={language === "en" ? "your@email.com" : "ваш@имейл.com"}
                    className="rounded-md"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-green-600 mr-2" />
                    <label htmlFor="phone" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {language === "en" ? "Phone Number (optional)" : "Телефон (незадължително)"}
                    </label>
                  </div>
                  <Input
                    id="phone"
                    name="phone"
                    value={formState.phone}
                    onChange={handleInputChange}
                    placeholder={language === "en" ? "+1 (555) 000-0000" : "+359 00 000 0000"}
                    className="rounded-md"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-green-600 mr-2" />
                    <label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {language === "en" ? "Message" : "Съобщение"}
                    </label>
                  </div>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formState.message}
                    onChange={handleInputChange}
                    placeholder={language === "en" 
                      ? "Briefly describe what you'd like to discuss in our consultation..."
                      : "Опишете накратко какво бихте искали да обсъдим в нашата консултация..."}
                    className="min-h-[100px] rounded-md"
                  />
                </div>
                
                <DialogFooter className="mt-6">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-green-600 hover:bg-green-700 text-white border-2 border-black dark:border-gray-700 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-300 rounded-md h-11"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {language === "en" ? "Submitting..." : "Изпращане..."}
                      </span>
                    ) : (
                      <span>{language === "en" ? "Send Request" : "Изпратете Заявка"}</span>
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {language === "en" ? "Request Sent Successfully!" : "Заявката е изпратена успешно!"}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {language === "en" 
                  ? "Thank you for your interest. I'll be in touch with you shortly."
                  : "Благодаря за интереса. Ще се свържа с вас скоро."}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
} 