import { useState } from "react";
import Head from "next/head";

export default function TestPage() {
  const [test, setTest] = useState("test");
  
  return (
    <>
      <Head>
        <title>Test Page</title>
        <meta name="description" content="Test description" />
      </Head>
      
      <main className="pt-12 pb-6 min-h-screen relative">
        <div>This is a test page</div>
      </main>
    </>
  );
} 