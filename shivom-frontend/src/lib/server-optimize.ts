import fs from 'fs';
import path from 'path';
import https from 'https';
import sharp from 'sharp';

// Download and optimize external image at build time
export async function optimizeRemoteImage(url: string): Promise<string> {
  if (!url || !url.startsWith('http')) return url;

  try {
    const filename = path.basename(new URL(url).pathname);
    const ext = path.extname(filename);
    const baseName = path.basename(filename, ext);
    const webpName = `${baseName}.webp`;
    
    const publicDir = path.join(process.cwd(), 'public');
    const destDir = path.join(publicDir, 'cms-cache');
    
    // Ensure dir exists
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    
    const destPath = path.join(destDir, webpName);
    const publicUrl = `/cms-cache/${webpName}`;
    
    // If already optimized, return it
    if (fs.existsSync(destPath)) {
      return publicUrl;
    }
    
    console.log(`Downloading and optimizing remote image: ${url}`);
    
    // Download image
    const buffer = await new Promise<Buffer>((resolve, reject) => {
      https.get(url, (res) => {
        if (res.statusCode !== 200) {
          reject(new Error(`Failed to download image: ${res.statusCode}`));
          return;
        }
        const chunks: any[] = [];
        res.on('data', (chunk) => chunks.push(chunk));
        res.on('end', () => resolve(Buffer.concat(chunks)));
        res.on('error', reject);
      }).on('error', reject);
    });
    
    // Optimize and save as WebP
    await sharp(buffer)
      .resize({ width: 1200, height: 1200, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(destPath);
      
    console.log(`Successfully optimized remote image to: ${publicUrl}`);
    return publicUrl;
  } catch (err) {
    console.error(`Error optimizing remote image ${url}:`, err);
    return url; // Fallback to remote URL on failure
  }
}
