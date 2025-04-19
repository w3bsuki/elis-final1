import React from 'react';
import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";
import { shopBooks } from "@/lib/shop-data";
import { useLanguage } from "@/lib/LanguageContext";
import { Book } from "@/types";

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const { language } = useLanguage();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  
  const translate = (bg: string, en: string) => language === "bg" ? bg : en;
  
  useEffect(() => {
    if (id) {
      const foundBook = shopBooks.find(book => book.id === id);
      setBook(foundBook || null);
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <p>Loading...</p>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="container mx-auto p-4">
        <p>Book not found</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{book.title}</title>
        <meta name="description" content={book.description} />
      </Head>
      
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">{book.title}</h1>
        <p className="mt-2">{book.description}</p>
        <button 
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" 
          onClick={() => router.push('/shop')}
        >
          Back to shop
        </button>
      </main>
    </>
  );
} 