import { useEffect, useState } from "react";
import { type CarouselApi } from "@/components/ui/carousel";

// This is a helper function to create auto-scroll functionality with hooks instead of a plugin
export function useManualAutoScroll(
  carouselApi: CarouselApi | null,
  options?: {
    enabled?: boolean;
    speed?: number;
    direction?: "forward" | "backward";
    stopOnInteraction?: boolean;
  }
) {
  const {
    enabled = true,
    speed = 1,
    direction = "forward",
    stopOnInteraction = true,
  } = options || {};

  const [isRunning, setIsRunning] = useState(enabled);

  useEffect(() => {
    if (!carouselApi || !enabled) return;
    
    let timer: ReturnType<typeof setTimeout> | null = null;
    
    // Very important - force the carousel to loop
    if (carouselApi.scrollSnapList?.()?.length) {
      carouselApi.canScrollNext = () => true;
      carouselApi.canScrollPrev = () => true;
    }
    
    const scroll = () => {
      if (!isRunning) return;
      
      if (direction === "forward") {
        carouselApi.scrollNext();
      } else {
        carouselApi.scrollPrev();
      }
      
      // Schedule the next scroll
      timer = setTimeout(scroll, 2500 / speed);
    };
    
    // Start scrolling
    const startScrolling = () => {
      setIsRunning(true);
      // Start with a scroll
      if (direction === "forward") {
        carouselApi.scrollNext();
      } else {
        carouselApi.scrollPrev();
      }
      // Schedule regular scrolling
      timer = setTimeout(scroll, 2500 / speed);
    };
    
    // Stop scrolling
    const stopScrolling = () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      setIsRunning(false);
    };
    
    if (stopOnInteraction) {
      // Handle user interactions
      const handlePointerDown = () => {
        stopScrolling();
      };
      
      const handlePointerUp = () => {
        // Restart with a delay
        setTimeout(startScrolling, 1000);
      };
      
      carouselApi.on("pointerDown", handlePointerDown);
      carouselApi.on("pointerUp", handlePointerUp);
      
      // Also handle when user clicks pagination
      carouselApi.on("select", () => {
        stopScrolling();
        // Restart with a longer delay
        setTimeout(startScrolling, 2000);
      });
    }
    
    // Start immediately
    startScrolling();
    
    // Cleanup
    return () => {
      if (timer) clearTimeout(timer);
      if (stopOnInteraction) {
        carouselApi.off("pointerDown");
        carouselApi.off("pointerUp");
        carouselApi.off("select");
      }
    };
  }, [carouselApi, enabled, speed, direction, stopOnInteraction, isRunning]);
  
  return {
    enabled: isRunning,
    setEnabled: setIsRunning
  };
}

// Keep this function as a stub that does nothing to avoid breaking existing imports
export function AutoScroll() {
  return undefined;
} 