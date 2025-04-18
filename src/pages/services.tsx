"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ServicesPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to home page since we're showing services directly in Timeline
    router.replace('/');
  }, [router]);
  
  return null; // No UI needed, just redirecting
} 