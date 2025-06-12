const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const natural = require('natural');

const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route
app.post('/match', (req, res) => {
  const { resume, job_description } = req.body;

  if (!resume || !job_description) {
    return res.status(400).json({ error: 'Missing resume or job description' });
  }

  try {
    const tfidf = new natural.TfIdf();
    tfidf.addDocument(resume);
    tfidf.addDocument(job_description);

    const terms = tfidf.listTerms(0);
    const vecA = terms.map(t => t.tfidf);
    const vecB = terms.map(t => tfidf.tfidf(t.term, 1));

    const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
    const magA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
    const magB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));

    const similarity = magA && magB ? dotProduct / (magA * magB) : 0;

    res.json({ match_percentage: (similarity * 100).toFixed(2) });
  } catch (error) {
    console.error('Error calculating similarity:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Resume Matcher API running at http://localhost:${PORT}`);
});
