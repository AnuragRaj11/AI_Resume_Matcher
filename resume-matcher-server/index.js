import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import bodyParser from 'body-parser';
import pdfParse from 'pdf-parse';
import { fileURLToPath } from 'url';
import path from 'path';
import { cosineSimilarity } from './utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());

const upload = multer();

async function extractTextFromPdf(buffer) {
  try {
    const data = await pdfParse(buffer);
    return data.text;
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error('Failed to parse PDF file');
  }
}

function generateExplanation(resume, jd, score) {
  const resumeWords = new Set(resume.toLowerCase().split(/\W+/));
  const jdWords = new Set(jd.toLowerCase().split(/\W+/));

  const matched = [...jdWords].filter(word => resumeWords.has(word));
  const topMatches = matched.slice(0, 10).join(', ') || 'few common terms';

  if (score > 75) {
    return `High match — strong overlap found. Key terms matched: ${topMatches}`;
  } else if (score > 50) {
    return `Moderate match — some relevant keywords aligned: ${topMatches}`;
  } else {
    return `Low match — limited overlap. Keywords found: ${topMatches}`;
  }
}

app.post('/match', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const jd = req.body.job_description;
    const resumeBuffer = req.file.buffer;

    const resumeText = await extractTextFromPdf(resumeBuffer);
    const score = cosineSimilarity(resumeText, jd);
    const explanation = generateExplanation(resumeText, jd, score * 100);

    res.json({
      match_percentage: (score * 100).toFixed(2),
      explanation
    });
  } catch (error) {
    console.error('❌ Error:', error.message);
    res.status(500).json({ error: 'Failed to process PDF', details: error.message });
  }
});

app.get('/', (req, res) => {
  res.send('Resume Matcher API is running');
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
