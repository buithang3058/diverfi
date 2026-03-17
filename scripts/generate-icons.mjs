import sharp from 'sharp';
import { mkdir } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ICONS_DIR = join(__dirname, '../public/icons');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Create a simple purple gradient icon with "dF" text
async function generateIcon(size) {
  const svg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#7c3aed"/>
          <stop offset="100%" style="stop-color:#4f46e5"/>
        </linearGradient>
      </defs>
      <rect width="${size}" height="${size}" rx="${size * 0.18}" fill="url(#grad)"/>
      <text
        x="50%"
        y="58%"
        font-family="system-ui, -apple-system, sans-serif"
        font-size="${size * 0.45}"
        font-weight="bold"
        fill="white"
        text-anchor="middle"
        dominant-baseline="middle"
      >dF</text>
    </svg>
  `;

  await sharp(Buffer.from(svg))
    .png()
    .toFile(join(ICONS_DIR, `icon-${size}x${size}.png`));

  console.log(`Generated icon-${size}x${size}.png`);
}

async function main() {
  await mkdir(ICONS_DIR, { recursive: true });

  for (const size of sizes) {
    await generateIcon(size);
  }

  // Generate special icons for shortcuts
  await generateShortcutIcon('learn', '📚', 96);
  await generateShortcutIcon('dashboard', '📊', 96);

  console.log('All icons generated!');
}

async function generateShortcutIcon(name, emoji, size) {
  const svg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" rx="${size * 0.18}" fill="#7c3aed"/>
      <text
        x="50%"
        y="55%"
        font-size="${size * 0.5}"
        text-anchor="middle"
        dominant-baseline="middle"
      >${emoji}</text>
    </svg>
  `;

  await sharp(Buffer.from(svg))
    .png()
    .toFile(join(ICONS_DIR, `${name}-${size}x${size}.png`));

  console.log(`Generated ${name}-${size}x${size}.png`);
}

main().catch(console.error);
