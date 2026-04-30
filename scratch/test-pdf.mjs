import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');

async function test() {
  try {
    const pdfPath = path.join(process.cwd(), 'public', 'CV Bonifasius.pdf');
    if (!fs.existsSync(pdfPath)) {
      console.log("File not found");
      return;
    }
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdf(dataBuffer);
    console.log("PDF Content Sample:", data.text.substring(0, 100));
  } catch (e) {
    console.error("Error:", e);
  }
}

test();
