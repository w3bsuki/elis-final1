"use client";

import { ReactNode } from "react";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <div className="font-sans antialiased">
      {children}
    </div>
  );
} 