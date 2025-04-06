const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(process.cwd(), 'public');

// Ensure public directory exists
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR);
}

// Create a solid color buffer
const createColorBuffer = (width, height) => {
  const channels = 4;
  const buffer = Buffer.alloc(width * height * channels);
  
  for (let i = 0; i < buffer.length; i += channels) {
    buffer[i] = 16;     // R
    buffer[i + 1] = 185; // G
    buffer[i + 2] = 129; // B
    buffer[i + 3] = 255; // A
  }
  
  return sharp(buffer, {
    raw: {
      width,
      height,
      channels
    }
  });
};

// Generate icons
async function generateIcons() {
  try {
    // Generate favicon.png (browsers will accept this instead of .ico)
    await createColorBuffer(32, 32)
      .png()
      .toFile(path.join(PUBLIC_DIR, 'favicon.png'));
    console.log('✅ Generated favicon.png');

    // Generate apple-touch-icon
    await createColorBuffer(180, 180)
      .png()
      .toFile(path.join(PUBLIC_DIR, 'apple-touch-icon.png'));
    console.log('✅ Generated apple-touch-icon.png');

    // Generate Android icons
    await createColorBuffer(192, 192)
      .png()
      .toFile(path.join(PUBLIC_DIR, 'android-chrome-192x192.png'));
    console.log('✅ Generated android-chrome-192x192.png');

    await createColorBuffer(512, 512)
      .png()
      .toFile(path.join(PUBLIC_DIR, 'android-chrome-512x512.png'));
    console.log('✅ Generated android-chrome-512x512.png');

    // Generate OG Image
    await createColorBuffer(1200, 630)
      .jpeg({ quality: 90 })
      .toFile(path.join(PUBLIC_DIR, 'og-image.jpg'));
    console.log('✅ Generated og-image.jpg');

    console.log('\n✨ All icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
    process.exit(1);
  }
}

generateIcons(); 