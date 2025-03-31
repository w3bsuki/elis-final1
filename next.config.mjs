/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'nlabjdsqkfbzkblwcdma.supabase.co',
      'placehold.co',
      'source.unsplash.com',
      'plus.unsplash.com',
      'images.unsplash.com',
      'media.giphy.com',
      'media4.giphy.com',
      'media1.giphy.com',
      'media2.giphy.com',
      'media3.giphy.com',
      'media0.giphy.com',
      'media5.giphy.com',
      'cdn.dribbble.com',
      'picsum.photos',
      'books.google.com'
    ],
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  distDir: '.next',
  trailingSlash: true
};

export default nextConfig; 