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

  useEffect(() => {
    if (!carouselApi || !enabled) return;
    
    let intervalId: ReturnType<typeof setInterval> | null = null;
    let interacting = false;
    
    const scroll = () => {
      if (interacting) return;
      
      if (direction === "forward") {
        carouselApi.scrollNext();
      } else {
        carouselApi.scrollPrev();
      }
    };
    
    // Start the auto-scroll timer
    const startTimer = () => {
      intervalId = setInterval(scroll, 3000 / Math.abs(speed));
    };
    
    // Clean up the timer
    const stopTimer = () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };
    
    if (stopOnInteraction) {
      const handlePointerDown = () => {
        interacting = true;
        stopTimer();
      };
      
      const handlePointerUp = () => {
        interacting = false;
        startTimer();
      };
      
      carouselApi.on("pointerDown", handlePointerDown);
      carouselApi.on("pointerUp", handlePointerUp);
    }
    
    startTimer();
    
    return () => {
      stopTimer();
      if (stopOnInteraction) {
        carouselApi.off("pointerDown");
        carouselApi.off("pointerUp");
      }
    };
  }, [carouselApi, enabled, speed, direction, stopOnInteraction]);
  
  return {
    enabled,
  };
}

// Keep this function as a stub that does nothing to avoid breaking existing imports
export function AutoScroll() {
  return undefined;
} 