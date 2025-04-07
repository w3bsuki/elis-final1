import Head from 'next/head';
import { Toaster } from '@/components/ui/toaster';
import type { NextPage } from "next";
import Hero from "@/components/sections/Hero";
import { useLanguage } from "@/lib/LanguageContext";

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