"use client";

import { LanguageProvider } from "@/lib/LanguageContext";
import { ReactNode } from "react";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <div className="font-sans antialiased">
        {children}
      </div>
    </LanguageProvider>
  );
} 