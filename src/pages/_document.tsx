import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link 
          rel="apple-touch-icon" 
          sizes="180x180" 
          href="/apple-touch-icon.png" 
        />
        <link 
          rel="icon" 
          type="image/png" 
          sizes="32x32" 
          href="/favicon-32x32.png" 
        />
        <link 
          rel="icon" 
          type="image/png" 
          sizes="16x16" 
          href="/favicon-16x16.png" 
        />
        <link rel="manifest" href="/site.webmanifest" />
        {/* Preconnect to domains for resources to improve load time */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>
      <body className="min-h-screen bg-white dark:bg-gray-900">
        <Main />
        <NextScript />
        {/* Load analytics only after page load to not block rendering */}
        <Script
          strategy="afterInteractive"
          id="gtm-script"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-XXXXXXX');
            `,
          }}
        />
      </body>
    </Html>
  );
} 