import Head from 'next/head';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Toaster } from '@/components/ui/toaster';
import type { NextPage } from "next";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Hero from "@/components/sections/Hero";
import { useLanguage } from "@/lib/LanguageContext";
import { Suspense } from "react";

// Dynamically import components with suspense and loading states
const Testimonials = dynamic(
  () => import("@/components/sections/Testimonials").then(mod => ({ default: mod.Testimonials })),
  {
    loading: () => <div className="h-96 flex items-center justify-center"><div className="animate-pulse w-8 h-8 rounded-full bg-primary/20"></div></div>,
    ssr: false,
  }
);

const Home: NextPage = () => {
  const { language } = useLanguage();
  const translate = (bg: string, en: string) => language === 'bg' ? bg : en;

  return (
    <>
      <Head>
        <title>ELIS | Author Portfolio</title>
        <meta name="description" content="Official website of ELIS - Author, Philosopher, and Inspirational Writer. Discover books, articles, and upcoming events." />
        <meta property="og:title" content="ELIS | Author Portfolio" />
        <meta property="og:description" content="Official website of ELIS - Author, Philosopher, and Inspirational Writer. Discover books, articles, and upcoming events." />
        <meta property="og:image" content="/images/author-og-image.jpg" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="flex min-h-screen flex-col bg-background relative">
        {/* Hero Section with nested containers (includes Books, Services, Testimonials, Contact, and now Footer) */}
        <Hero includeFooter={true} />
      </main>
      
      {/* Toast notifications */}
      <Toaster />
    </>
  );
};

export default Home; 