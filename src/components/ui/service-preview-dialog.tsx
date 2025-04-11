"use client";

import Image from "next/image";
import { Calendar, Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/LanguageContext";

interface ServicePreviewDialogProps {
  service: {
    id: string;
    title: string;
    description: string;
    duration?: string;
    price?: number;
    image?: string;
  } | null;
  isOpen?: boolean;
  open?: boolean;
  onClose?: () => void;
  onOpenChange?: (open: boolean) => void;
}

export function ServicePreviewDialog({ service, isOpen, open, onClose, onOpenChange }: ServicePreviewDialogProps) {
  const { language } = useLanguage();
  
  // Handle both isOpen/onClose and open/onOpenChange prop patterns
  const isDialogOpen = isOpen !== undefined ? isOpen : open;
  const handleOpenChange = (newOpen: boolean) => {
    if (onOpenChange) {
      onOpenChange(newOpen);
    } else if (onClose && !newOpen) {
      onClose();
    }
  };
  
  // If service is null, render nothing or a placeholder
  if (!service) {
    return (
      <Dialog open={!!isDialogOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-md border-2 border-purple-600 dark:border-purple-700 p-0 overflow-hidden rounded-lg shadow-lg">
          <div className="p-6 bg-white dark:bg-gray-900">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
                {language === 'bg' ? 'Услуга не е избрана' : 'No service selected'}
              </DialogTitle>
            </DialogHeader>
            <div className="mt-6 flex justify-end">
              <Button onClick={() => handleOpenChange(false)}>
                {language === 'bg' ? 'Затвори' : 'Close'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
  
  return (
    <Dialog open={!!isDialogOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md border-2 border-purple-600 dark:border-purple-700 p-0 overflow-hidden rounded-lg shadow-lg">
        <div className="relative">
          <AspectRatio ratio={16/9} className="w-full">
            <div className="relative h-full w-full">
              <Image
                src={service.image || "/images/services/default-service.jpg"}
                alt={service.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <button 
                onClick={() => handleOpenChange(false)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
                aria-label="Close dialog"
              >
                <X className="h-5 w-5" />
              </button>
              {service.price && (
                <div className="absolute top-4 left-4 bg-purple-600 text-white text-xs font-medium px-2.5 py-1.5 rounded-md shadow-md">
                  {language === 'bg' ? `${service.price.toFixed(2)} лв.` : `$${service.price.toFixed(2)}`}
                </div>
              )}
            </div>
          </AspectRatio>
        </div>
        
        <div className="p-6 bg-white dark:bg-gray-900">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">{service.title}</DialogTitle>
            <DialogDescription className="text-sm mt-2 text-gray-600 dark:text-gray-300">
              {service.description}
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-4 flex items-center gap-2">
            {service.duration && (
              <Badge variant="outline" className="flex items-center gap-1 border-purple-200 text-purple-800 dark:border-purple-800 dark:text-purple-300">
                <Clock className="h-3 w-3" />
                {service.duration}
              </Badge>
            )}
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white border-2 border-black dark:border-gray-700 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-200 rounded-md hover:translate-y-[-2px]">
              <Calendar className="mr-2 h-4 w-4" />
              {language === 'bg' ? 'Запазете час' : 'Book Appointment'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 