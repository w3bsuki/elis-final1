import { NextApiRequest, NextApiResponse } from 'next';
import sharp from 'sharp';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { url, width, height, quality, format } = req.query;

    // Validate required parameters
    if (!url) {
      return res.status(400).json({ error: 'URL parameter is required' });
    }

    // Parse parameters
    const imageWidth = width ? parseInt(width as string, 10) : undefined;
    const imageHeight = height ? parseInt(height as string, 10) : undefined;
    const imageQuality = quality ? parseInt(quality as string, 10) : 80;
    const imageFormat = (format as string) || 'webp';

    // Fetch the image
    let imageBuffer: Buffer;
    
    if ((url as string).startsWith('supabase:')) {
      // Handle Supabase storage URLs
      const path = (url as string).replace('supabase:', '');
      const { data, error } = await supabase.storage
        .from('images')
        .download(path);
      
      if (error) {
        throw new Error(`Failed to fetch image from Supabase: ${error.message}`);
      }
      
      imageBuffer = await data.arrayBuffer().then(Buffer.from);
    } else {
      // Handle external URLs
      const response = await fetch(url as string);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
      }
      
      imageBuffer = Buffer.from(await response.arrayBuffer());
    }

    // Process the image with sharp
    let transformer = sharp(imageBuffer);
    
    // Resize if dimensions are provided
    if (imageWidth || imageHeight) {
      transformer = transformer.resize(imageWidth, imageHeight, {
        fit: 'cover',
        position: 'center',
      });
    }
    
    // Set format and quality
    switch (imageFormat) {
      case 'webp':
        transformer = transformer.webp({ quality: imageQuality });
        res.setHeader('Content-Type', 'image/webp');
        break;
      case 'avif':
        transformer = transformer.avif({ quality: imageQuality });
        res.setHeader('Content-Type', 'image/avif');
        break;
      case 'png':
        transformer = transformer.png({ quality: imageQuality });
        res.setHeader('Content-Type', 'image/png');
        break;
      case 'jpeg':
      case 'jpg':
        transformer = transformer.jpeg({ quality: imageQuality });
        res.setHeader('Content-Type', 'image/jpeg');
        break;
      default:
        transformer = transformer.webp({ quality: imageQuality });
        res.setHeader('Content-Type', 'image/webp');
    }
    
    // Output the processed image
    const processedImageBuffer = await transformer.toBuffer();
    
    // Set cache headers (cache for 30 days)
    res.setHeader('Cache-Control', 'public, max-age=2592000, stale-while-revalidate=86400');
    
    // Send the processed image
    res.status(200).send(processedImageBuffer);
  } catch (error) {
    console.error('Image optimization error:', error);
    res.status(500).json({ error: 'Failed to optimize image' });
  }
} 