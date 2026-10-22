import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

import { generateDailyArchive } from '../lib/daily/generate-archive';

const outDir = path.join(process.cwd(), 'data/daily');
const outPath = path.join(outDir, 'puzzles.json');
const archive = generateDailyArchive();
mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, `${JSON.stringify(archive)}\n`, 'utf8');
console.log(`Wrote ${Object.keys(archive.puzzles).length} daily puzzles to ${outPath}`);
