"use client";

import * as React from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { bg, enUS } from "date-fns/locale";
import { useLanguage } from "@/lib/LanguageContext";

export type CalendarPickerProps = {
  date?: Date;
  onDateChange: (date?: Date) => void;
  className?: string;
  disabledDates?: Date[];
  minDate?: Date;
  maxDate?: Date;
}

export function CalendarPicker({
  date,
  onDateChange,
  className,
  disabledDates,
  minDate = new Date(),
  maxDate
}: CalendarPickerProps) {
  const { language } = useLanguage();
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

  // Set the minimum date to today by default
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Limit to 3 months in the future by default if maxDate is not provided
  const defaultMaxDate = maxDate || new Date(today);
  defaultMaxDate.setMonth(today.getMonth() + 3);
  
  // Determine localization
  const locale = language === 'en' ? enUS : bg;
  
  // Format the display string
  const formatDisplayDate = (date?: Date) => {
    if (!date) return language === 'en' ? "Select a date" : "Изберете дата";
    
    return language === 'en' 
      ? format(date, "EEEE, MMMM d, yyyy") 
      : format(date, "EEEE, d MMMM yyyy", { locale: bg });
  };

  // Get available dates
  const isDateDisabled = (date: Date) => {
    // Check if the date is in the disabledDates array
    if (disabledDates?.some(disabledDate => 
      disabledDate.getDate() === date.getDate() &&
      disabledDate.getMonth() === date.getMonth() &&
      disabledDate.getFullYear() === date.getFullYear()
    )) {
      return true;
    }
    
    // Check if the date is a weekend (Saturday = 6, Sunday = 0)
    const day = date.getDay();
    if (day === 0 || day === 6) {
      return true;
    }
    
    // Check if the date is before minDate or after maxDate
    if (
      (minDate && date < minDate) ||
      (defaultMaxDate && date > defaultMaxDate)
    ) {
      return true;
    }
    
    return false;
  };

  return (
    <div className={cn("relative", className)}>
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="lg"
            className={cn(
              "w-full justify-start text-left font-normal transition-all border-2 focus-visible:ring-offset-4",
              !date && "text-muted-foreground",
              date && "bg-primary/5"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formatDisplayDate(date)}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-card/95 backdrop-blur-sm" align="start">
          <DayPicker
            mode="single"
            selected={date}
            onSelect={(date) => {
              onDateChange(date);
              setIsPopoverOpen(false);
            }}
            disabled={isDateDisabled}
            locale={locale}
            className="p-3"
            modifiersClassNames={{
              selected: "bg-primary text-primary-foreground",
              today: "bg-accent text-accent-foreground",
              disabled: "text-muted-foreground opacity-50",
            }}
            classNames={{
              months: "flex flex-col space-y-4 sm:space-x-4 sm:space-y-0 sm:flex-row",
              month: "space-y-4",
              caption: "flex justify-center pt-1 relative items-center",
              caption_label: "text-sm font-medium",
              nav: "space-x-1 flex items-center",
              nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 hover:bg-accent rounded-full transition-all",
              nav_button_previous: "absolute left-1",
              nav_button_next: "absolute right-1",
              table: "w-full border-collapse space-y-1",
              head_row: "flex",
              head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
              row: "flex w-full mt-2",
              cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
              day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-primary/10 rounded-full transition-all duration-200 hover:scale-110",
              day_range_end: "day-range-end",
              day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
              day_today: "bg-accent/40 text-accent-foreground",
              day_outside: "day-outside text-muted-foreground opacity-50",
              day_disabled: "text-muted-foreground opacity-50",
              day_hidden: "invisible",
            }}
            components={{
              IconLeft: () => <ChevronLeft className="h-4 w-4" />,
              IconRight: () => <ChevronRight className="h-4 w-4" />,
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
} 