import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WORDS_PER_MINUTE = 200;

function getReadingTimeMinutes(rawContent) {
  const withoutMeta = rawContent.replace(/export const meta\s*=\s*\{[\s\S]*?\};?\s*/gi, '').trim();
  const withoutCodeBlocks = withoutMeta.replace(/```[\s\S]*?```/g, ' ');
  const words = withoutCodeBlocks.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

const blogDir = path.join(__dirname, '../src/pages/blog');
const files = fs.readdirSync(blogDir).filter((f) => f.endsWith('.mdx'));

const readingTimes = {};
for (const file of files) {
  const slug = file.replace(/\.mdx$/, '');
  const content = fs.readFileSync(path.join(blogDir, file), 'utf-8');
  readingTimes[slug] = getReadingTimeMinutes(content);
}

const outPath = path.join(blogDir, 'reading-times.json');
fs.writeFileSync(outPath, JSON.stringify(readingTimes, null, 2), 'utf-8');
console.log('Wrote reading-times.json:', Object.keys(readingTimes).length, 'posts');
