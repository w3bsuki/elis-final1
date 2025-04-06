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
              "rounded-full font-medium hover:scale-105 transition-all",
              selectedTime === time && "shadow-md"
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
        <Clock className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">
          {language === 'en' ? "Available Time Slots" : "Налични часове"}
        </span>
      </div>
      
      <ScrollArea className="h-[200px] pr-4 rounded-md border p-3">
        {renderTimeSlots()}
      </ScrollArea>
    </div>
  );
} 