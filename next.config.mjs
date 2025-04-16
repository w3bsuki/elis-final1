/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'nlabjdsqkfbzkblwcdma.supabase.co' },
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: 'source.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'media.giphy.com' },
      { protocol: 'https', hostname: 'media4.giphy.com' },
      { protocol: 'https', hostname: 'media1.giphy.com' },
      { protocol: 'https', hostname: 'media2.giphy.com' },
      { protocol: 'https', hostname: 'media3.giphy.com' },
      { protocol: 'https', hostname: 'media0.giphy.com' },
      { protocol: 'https', hostname: 'media5.giphy.com' },
      { protocol: 'https', hostname: 'cdn.dribbble.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'books.google.com' }
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  // Enable incremental static regeneration
  experimental: {
    // Enable the new optimistic transitions feature
    optimisticClientCache: true,
  },
  // Enable compression
  compress: true,
  // Configure compiler options for improved performance
  compiler: {
    // Remove console.* in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  // Add page loading performance indicators
  devIndicators: {
    position: 'bottom-right',
  },
  // Add support for internationalization (i18n)
  // Commenting out i18n config as it's not supported in App Router
  /* 
  i18n: {
    locales: ['bg', 'en'],
    defaultLocale: 'bg',
    localeDetection: false,
  },
  */
  // Commenting out standalone output to avoid symlink permission errors on Windows
  /*
  output: 'standalone',
  */
  poweredByHeader: false,
};

export default nextConfig; 