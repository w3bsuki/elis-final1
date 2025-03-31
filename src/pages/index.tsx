import Head from 'next/head';
import Hero from "@/components/sections/Hero";
import { FeaturedBooks } from "@/components/sections/FeaturedBooks";
import { BookTimeline } from "@/components/sections/BookTimeline";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
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
      
      <main className="flex min-h-screen flex-col bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950">
        {/* Hero Section */}
        <Hero />
        
        {/* Featured Books Section */}
        <FeaturedBooks />
        
        {/* Book Timeline Section */}
        <BookTimeline />
        
        {/* Testimonials Section */}
        <Testimonials />
        
        {/* Contact Section */}
        <Contact />
      </main>
    </>
  );
} 