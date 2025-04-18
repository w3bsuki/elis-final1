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
    // First convert to midnight for consistent comparisons
    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0);
    
    // Check if the date is in the disabledDates array (using time-insensitive comparison)
    if (disabledDates?.some(disabledDate => {
      const normalizedDisabled = new Date(disabledDate);
      normalizedDisabled.setHours(0, 0, 0, 0);
      return normalizedDisabled.getTime() === normalizedDate.getTime();
    })) {
      return true;
    }
    
    // Check if the date is a weekend (Saturday = 6, Sunday = 0)
    const day = normalizedDate.getDay();
    if (day === 0 || day === 6) {
      return true;
    }
    
    // Check if the date is before minDate or after maxDate (using time-insensitive comparison)
    const normalizedMinDate = new Date(minDate);
    normalizedMinDate.setHours(0, 0, 0, 0);
    
    const normalizedMaxDate = new Date(defaultMaxDate);
    normalizedMaxDate.setHours(0, 0, 0, 0);
    
    if (
      normalizedDate.getTime() < normalizedMinDate.getTime() ||
      normalizedDate.getTime() > normalizedMaxDate.getTime()
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
              date && "bg-primary/5 border-green-200/60 dark:border-green-800/30"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formatDisplayDate(date)}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-2 border-green-100/50 dark:border-green-800/30 shadow-lg rounded-xl" align="start">
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
              selected: "bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-md",
              today: "bg-green-50 dark:bg-green-900/20 font-semibold border-2 border-green-200/60 dark:border-green-800/30",
              disabled: "text-muted-foreground opacity-50",
            }}
            classNames={{
              months: "flex flex-col space-y-4 sm:space-x-4 sm:space-y-0 sm:flex-row",
              month: "space-y-4",
              caption: "flex justify-center pt-1 relative items-center",
              caption_label: "text-sm font-medium",
              nav: "space-x-1 flex items-center",
              nav_button: "h-7 w-7 bg-transparent p-0 opacity-70 hover:opacity-100 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-full transition-all",
              nav_button_previous: "absolute left-1",
              nav_button_next: "absolute right-1",
              table: "w-full border-collapse space-y-1",
              head_row: "flex",
              head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
              row: "flex w-full mt-2",
              cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
              day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-full transition-all duration-200 hover:scale-110 hover:shadow-sm",
              day_range_end: "day-range-end",
              day_selected: "bg-gradient-to-br from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 focus:from-green-500 focus:to-emerald-600 shadow-md",
              day_today: "bg-green-50 dark:bg-green-900/20 font-semibold border-2 border-green-200/60 dark:border-green-800/30",
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