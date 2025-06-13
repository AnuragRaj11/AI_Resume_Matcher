import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import bodyParser from 'body-parser';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.js';
import { cosineSimilarity } from './utils.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());

const upload = multer();

// 🔍 Extract text from uploaded PDF
async function extractTextFromPdf(buffer) {
  const loadingTask = pdfjsLib.getDocument({ data: buffer });
  const pdf = await loadingTask.promise;

  let text = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const strings = content.items.map(item => item.str);
    text += strings.join(' ') + '\n';
  }

  return text;
}

// ✏️ Basic explanation generator based on overlapping keywords
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

app.listen(port, () => {
  console.log(`✅ Resume Matcher backend running at http://localhost:${port}`);
});
