import Head from 'next/head';
import { Toaster } from '@/components/ui/toaster';
import type { NextPage } from "next";
import { useLanguage } from "@/lib/LanguageContext";
import { CONTAINER_WIDTH_CLASSES } from "@/lib/constants";
import HomePage from "@/components/sections/home";
import Header from "@/components/layout/Header";

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
      
      <div className="flex flex-col">
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Join Elis Pavlova's transformative journey through creative writing, personal development workshops, and professional consultations. Discover your creative potential today."
        />
        {/* Add custom styles for the homepage */}
        <style jsx global>{`
          body {
            overflow-x: hidden;
          }
        `}</style>
        
        {/* Header container */}
        <div className={CONTAINER_WIDTH_CLASSES}>
          <div className="relative w-full mb-0 rounded-xl bg-gradient-to-b from-white via-gray-50/95 to-gray-100/90 dark:from-gray-800/95 dark:via-gray-850/95 dark:to-gray-900/90 shadow-[0_4px_16px_rgba(0,0,0,0.1),0_1px_3px_rgba(0,0,0,0.05)] border border-gray-200/80 dark:border-gray-700/60 backdrop-blur-md contained-header overflow-hidden">
            {/* Subtle inner shadow overlay */}
            <div className="absolute inset-0 shadow-[inset_0_0_10px_rgba(0,0,0,0.04)] pointer-events-none rounded-xl"></div>
            
            {/* Subtle pattern background */}
            <div className="absolute inset-0 bg-[url('/images/pattern-light.svg')] dark:bg-[url('/images/pattern-dark.svg')] opacity-[0.03] bg-repeat bg-[length:24px_24px] pointer-events-none rounded-lg"></div>
            
            {/* Subtle highlight at the top */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/80 dark:bg-white/15"></div>
            
            {/* Subtle glow effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-radial from-transparent via-transparent to-gray-100/30 dark:to-primary/5 pointer-events-none"></div>
            
            <Header containedMode={true} />
          </div>
        </div>
        
        {/* Main content area with proper spacing from header */}
        <main className="pt-0 mt-0 overflow-hidden">
          <div className={CONTAINER_WIDTH_CLASSES}>
            {/* Main content container */}
            <div className="rounded-xl shadow-lg bg-white dark:bg-gray-800 p-4">
              <HomePage includeFooter={true} noContainer={true} />
            </div>
          </div>
        </main>
        
        {/* Toast notifications */}
        <Toaster />
      </div>
    </>
  );
};

// Flag for _app.tsx to not render the header
Home.renderHeaderManually = true;

export default Home; 