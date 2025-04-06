"use client";

import * as React from "react";
import { CalendarClock, Check, ChevronRight, User, Mail, Phone, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";
import { Button } from "@/components/ui/button";
import { CalendarPicker } from "@/components/ui/calendar-picker";
import { TimeSlotPicker } from "@/components/ui/time-slot-picker";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

export type BookingCalendarProps = {
  className?: string;
  onBookingComplete?: (bookingData: BookingData) => void;
}

export type BookingData = {
  name: string;
  email: string;
  phone?: string;
  date: Date;
  time: string;
  message?: string;
}

type BookingStep = 'datetime' | 'details' | 'confirmation';

export function BookingCalendar({
  className,
  onBookingComplete
}: BookingCalendarProps) {
  const { language } = useLanguage();
  const { toast } = useToast();
  const translate = (bg: string, en: string) => language === 'en' ? en : bg;
  
  // State for date/time selection
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = React.useState<string | undefined>();
  
  // State for form fields
  const [bookingData, setBookingData] = React.useState<Partial<BookingData>>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  // State for current step
  const [currentStep, setCurrentStep] = useState<BookingStep>('datetime');
  
  // State for loading
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBookingData(prev => ({ ...prev, [name]: value }));
  };
  
  // Get disabled dates (example - this would typically come from an API)
  const getDisabledDates = () => {
    // This is just an example - in a real app, this would be fetched from an API
    const disabledDates = [];
    const today = new Date();
    
    // Disable some random dates as an example
    for (let i = 1; i <= 10; i++) {
      const randomDays = Math.floor(Math.random() * 60) + 1;
      const randomDate = new Date(today);
      randomDate.setDate(today.getDate() + randomDays);
      disabledDates.push(randomDate);
    }
    
    return disabledDates;
  };
  
  // Get available time slots based on date (example - this would typically come from an API)
  const getAvailableTimeSlots = (date?: Date) => {
    if (!date) return [];
    
    // In a real app, this would be fetched from an API based on the selected date
    const allTimeSlots = [
      "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
      "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
      "15:00", "15:30", "16:00", "16:30", "17:00"
    ];
    
    // For demo purposes, let's simulate some slots being already booked
    const bookedCount = Math.floor(Math.random() * 8);
    const bookedIndices = new Set();
    
    while (bookedIndices.size < bookedCount) {
      bookedIndices.add(Math.floor(Math.random() * allTimeSlots.length));
    }
    
    return allTimeSlots.filter((_, index) => !bookedIndices.has(index));
  };
  
  // Check if date and time are selected
  const isDateTimeSelected = selectedDate && selectedTime;
  
  // Check if form is valid
  const isFormValid = 
    bookingData.name && 
    bookingData.email && 
    selectedDate && 
    selectedTime;
  
  // Handle next step
  const handleNextStep = () => {
    if (currentStep === 'datetime' && isDateTimeSelected) {
      setCurrentStep('details');
    } else if (currentStep === 'details' && isFormValid) {
      setCurrentStep('confirmation');
    }
  };
  
  // Handle back button
  const handleBack = () => {
    if (currentStep === 'details') {
      setCurrentStep('datetime');
    } else if (currentStep === 'confirmation') {
      setCurrentStep('details');
    }
  };
  
  // Handle final submission
  const handleSubmit = async () => {
    if (!isFormValid || !selectedDate || !selectedTime) return;
    
    setIsSubmitting(true);
    
    try {
      // In a real app, send data to API here
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const finalBookingData: BookingData = {
        name: bookingData.name!,
        email: bookingData.email!,
        phone: bookingData.phone,
        date: selectedDate,
        time: selectedTime,
        message: bookingData.message
      };
      
      // Call the callback if provided
      if (onBookingComplete) {
        onBookingComplete(finalBookingData);
      }
      
      // Show success toast
      toast.success({
        title: translate("Резервация успешна!", "Booking Successful!"),
        description: translate(
          `Вашата консултация е резервирана за ${format(selectedDate, "d MMMM")} в ${selectedTime} ч.`,
          `Your consultation is booked for ${format(selectedDate, "MMMM d")} at ${selectedTime}.`
        )
      });
      
      // Reset form
      setSelectedDate(undefined);
      setSelectedTime(undefined);
      setBookingData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      setCurrentStep('datetime');
    } catch (error) {
      // Show error toast
      toast.error({
        title: translate("Грешка при резервация", "Booking Error"),
        description: translate(
          "Възникна грешка при обработката на вашата заявка. Моля, опитайте отново.",
          "An error occurred while processing your request. Please try again."
        )
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Render the content based on current step
  const renderStepContent = () => {
    switch (currentStep) {
      case 'datetime':
        return (
          <>
            <div className="space-y-4">
              <div>
                <Label htmlFor="date">
                  {translate("Изберете дата", "Select a Date")}
                </Label>
                <CalendarPicker
                  date={selectedDate}
                  onDateChange={setSelectedDate}
                  className="mt-1.5"
                  disabledDates={getDisabledDates()}
                />
              </div>
              
              <div className="mt-6">
                <TimeSlotPicker
                  selectedTime={selectedTime}
                  onTimeChange={setSelectedTime}
                  date={selectedDate}
                  availableSlots={getAvailableTimeSlots(selectedDate)}
                />
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <Button 
                onClick={handleNextStep} 
                disabled={!isDateTimeSelected}
                className="min-w-[120px]"
                iconPosition="right"
                icon={<ChevronRight className="h-4 w-4" />}
              >
                {translate("Напред", "Next")}
              </Button>
            </div>
          </>
        );
        
      case 'details':
        return (
          <>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">
                  {translate("Име", "Name")} <span className="text-red-500">*</span>
                </Label>
                <div className="mt-1.5 relative">
                  <Input
                    id="name"
                    name="name"
                    value={bookingData.name}
                    onChange={handleInputChange}
                    placeholder={translate("Вашето пълно име", "Your full name")}
                    className="pl-10"
                    required
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                    <User className="h-4 w-4" />
                  </div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="email">
                  {translate("Имейл", "Email")} <span className="text-red-500">*</span>
                </Label>
                <div className="mt-1.5 relative">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={bookingData.email}
                    onChange={handleInputChange}
                    placeholder={translate("вашият@имейл.com", "your@email.com")}
                    className="pl-10"
                    required
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                  </div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="phone">
                  {translate("Телефон", "Phone")}
                </Label>
                <div className="mt-1.5 relative">
                  <Input
                    id="phone"
                    name="phone"
                    value={bookingData.phone}
                    onChange={handleInputChange}
                    placeholder={translate("+359 00 000 0000", "+1 (555) 000-0000")}
                    className="pl-10"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                  </div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="message">
                  {translate("Съобщение", "Message")}
                </Label>
                <div className="mt-1.5 relative">
                  <Textarea
                    id="message"
                    name="message"
                    value={bookingData.message}
                    onChange={handleInputChange}
                    placeholder={translate(
                      "Опишете накратко целта на консултацията...",
                      "Briefly describe the purpose of the consultation..."
                    )}
                    className="min-h-[100px] pl-10 pt-8"
                  />
                  <div className="absolute left-3 top-8 text-muted-foreground">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-between">
              <Button 
                variant="outline" 
                onClick={handleBack}
                className="min-w-[100px]"
              >
                {translate("Назад", "Back")}
              </Button>
              
              <Button 
                onClick={handleNextStep} 
                disabled={!isFormValid}
                className="min-w-[100px]"
                iconPosition="right"
                icon={<ChevronRight className="h-4 w-4" />}
              >
                {translate("Преглед", "Review")}
              </Button>
            </div>
          </>
        );
        
      case 'confirmation':
        return (
          <>
            <div className="space-y-6">
              <div className="bg-primary/5 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-3">
                  {translate("Детайли на резервацията", "Booking Details")}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {translate("Дата", "Date")}:
                    </p>
                    <p className="font-medium">
                      {selectedDate && format(selectedDate, language === 'en' ? "MMMM d, yyyy" : "d MMMM yyyy")}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {translate("Час", "Time")}:
                    </p>
                    <p className="font-medium">
                      {selectedTime}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {translate("Име", "Name")}:
                    </p>
                    <p className="font-medium">
                      {bookingData.name}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {translate("Имейл", "Email")}:
                    </p>
                    <p className="font-medium">
                      {bookingData.email}
                    </p>
                  </div>
                  
                  {bookingData.phone && (
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {translate("Телефон", "Phone")}:
                      </p>
                      <p className="font-medium">
                        {bookingData.phone}
                      </p>
                    </div>
                  )}
                </div>
                
                {bookingData.message && (
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground">
                      {translate("Съобщение", "Message")}:
                    </p>
                    <p className="text-sm mt-1 bg-white dark:bg-gray-800 p-3 rounded border">
                      {bookingData.message}
                    </p>
                  </div>
                )}
              </div>
              
              <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800/30">
                <h3 className="text-sm font-medium text-amber-800 dark:text-amber-400 flex items-center gap-2">
                  <CalendarClock className="h-4 w-4" />
                  {translate("Информация за консултацията", "Consultation Information")}
                </h3>
                <ul className="mt-2 space-y-1 text-sm text-amber-700 dark:text-amber-300/80">
                  <li>• {translate("Продължителност: 45 минути", "Duration: 45 minutes")}</li>
                  <li>• {translate("Видео конферентна връзка", "Video conference link")}</li>
                  <li>• {translate("Имейл с детайли ще бъде изпратен след резервация", "Email with details will be sent after booking")}</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 flex justify-between">
              <Button 
                variant="outline" 
                onClick={handleBack}
                className="min-w-[100px]"
              >
                {translate("Назад", "Back")}
              </Button>
              
              <Button 
                onClick={handleSubmit} 
                className="min-w-[140px]"
                disabled={isSubmitting}
                variant="premium"
                icon={isSubmitting ? undefined : <Check className="h-4 w-4 mr-2" />}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {translate("Обработва се...", "Processing...")}
                  </span>
                ) : (
                  translate("Потвърди резервация", "Confirm Booking")
                )}
              </Button>
            </div>
          </>
        );
        
      default:
        return null;
    }
  };
  
  // Render step indicators
  const renderStepIndicators = () => {
    const steps = [
      { id: 'datetime', label: translate("Дата и час", "Date & Time") },
      { id: 'details', label: translate("Детайли", "Details") },
      { id: 'confirmation', label: translate("Потвърждение", "Confirmation") }
    ];
    
    return (
      <div className="flex items-center justify-center mb-8">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div 
              className={cn(
                "flex flex-col items-center",
                currentStep === step.id ? "opacity-100" : "opacity-60"
              )}
            >
              <div 
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                  currentStep === step.id 
                    ? "bg-primary text-white" 
                    : "bg-muted text-muted-foreground",
                  steps.findIndex(s => s.id === currentStep) >= index && "bg-primary text-white"
                )}
              >
                {index + 1}
              </div>
              <span className="text-xs mt-1 text-center max-w-[80px]">{step.label}</span>
            </div>
            
            {index < steps.length - 1 && (
              <div 
                className={cn(
                  "h-px w-12 mx-2 bg-muted",
                  steps.findIndex(s => s.id === currentStep) > index && "bg-primary"
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <Card className={cn("w-full shadow-lg border-2 border-primary/15", className)}>
      <CardHeader className="pb-0">
        <CardTitle className="text-2xl font-bold text-center">
          {translate("Запазете консултация", "Book a Consultation")}
        </CardTitle>
        <CardDescription className="text-center max-w-md mx-auto">
          {translate(
            "Изберете удобни за вас дата и час за консултация с автора",
            "Choose a convenient date and time for a consultation with the author"
          )}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6">
        {renderStepIndicators()}
        {renderStepContent()}
      </CardContent>
    </Card>
  );
} 