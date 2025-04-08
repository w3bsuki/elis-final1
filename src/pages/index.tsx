import Head from 'next/head';
import { Toaster } from '@/components/ui/toaster';
import type { NextPage } from "next";
import Hero from "@/components/sections/Hero";
import { useLanguage } from "@/lib/LanguageContext";
import { CONTAINER_WIDTH_CLASSES } from "@/lib/constants";

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
        <main className="pt-5 overflow-hidden">
          <div className={CONTAINER_WIDTH_CLASSES}>
            {/* Single container with EVERYTHING inside it */}
            <div className="rounded-xl shadow-lg bg-white dark:bg-gray-800 p-6">
              <Hero includeFooter={true} noContainer={false} />
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