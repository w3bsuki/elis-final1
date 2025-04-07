"use client";

import * as React from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export type TimeSlotPickerProps = {
  selectedTime?: string;
  onTimeChange: (time?: string) => void;
  className?: string;
  availableSlots?: string[];
  date?: Date;
}

// Default time slots from 9 AM to 5 PM
const DEFAULT_TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00"
];

export function TimeSlotPicker({
  selectedTime,
  onTimeChange,
  className,
  availableSlots = DEFAULT_TIME_SLOTS,
  date
}: TimeSlotPickerProps) {
  const { language } = useLanguage();
  
  // Format the time for display
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    if (language === 'en') {
      const isPM = parseInt(hours) >= 12;
      const displayHours = parseInt(hours) % 12 || 12;
      return `${displayHours}:${minutes} ${isPM ? 'PM' : 'AM'}`;
    } else {
      return `${hours}:${minutes} ч.`;
    }
  };
  
  // Create the time grid
  const renderTimeSlots = () => {
    if (!date) {
      return (
        <div className="text-center py-12 text-muted-foreground">
          {language === 'en' 
            ? "Please select a date first to view available time slots" 
            : "Моля, изберете дата, за да видите наличните часове"}
        </div>
      );
    }
    
    if (availableSlots.length === 0) {
      return (
        <div className="text-center py-12 text-muted-foreground">
          {language === 'en' 
            ? "No available time slots for the selected date" 
            : "Няма свободни часове за избраната дата"}
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {availableSlots.map((time) => (
          <Button
            key={time}
            variant={selectedTime === time ? "default" : "outline"}
            size="sm"
            className={cn(
              "rounded-full font-medium transition-all duration-300",
              selectedTime === time 
                ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md hover:shadow-sm hover:from-blue-600 hover:to-indigo-700" 
                : "border-blue-200/60 dark:border-blue-800/30 bg-white/80 dark:bg-gray-800/80 hover:bg-blue-50/70 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-sm"
            )}
            onClick={() => onTimeChange(time)}
          >
            {formatTime(time)}
          </Button>
        ))}
      </div>
    );
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-3 flex items-center gap-2">
        <div className="rounded-full p-1.5 bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
          <Clock className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
        </div>
        <span className="text-sm font-medium">
          {language === 'en' ? "Available Time Slots" : "Налични часове"}
        </span>
      </div>
      
      <ScrollArea className="h-[200px] pr-4 rounded-xl border-2 border-blue-100/50 dark:border-blue-800/30 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-3 shadow-inner">
        {renderTimeSlots()}
      </ScrollArea>
    </div>
  );
} 