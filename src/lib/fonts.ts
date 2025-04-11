import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import { Caveat } from "next/font/google";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
}); 