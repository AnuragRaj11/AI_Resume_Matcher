require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const multer = require('multer');
const { extractTextFromPdf } = require('./services/pdfService');
const { enhancedMatch } = require('./services/matchingService');

const app = express();

// Enhanced CORS configuration
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  methods: ['POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json({ limit: '10kb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later'
});
app.use('/api', limiter);

// File upload configuration
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  }
});

// Enhanced matching endpoint
app.post('/api/match', upload.single('resume'), async (req, res) => {
  try {
    const { file, body } = req;
    const { jobDescription } = body;

    if (!file) {
      return res.status(400).json({ error: 'No resume file uploaded' });
    }
    if (!jobDescription || jobDescription.trim().length === 0) {
      return res.status(400).json({ error: 'Job description is required' });
    }

    const resumeText = await extractTextFromPdf(file.buffer);
    const result = await enhancedMatch(resumeText, jobDescription);

    res.json({
      success: true,
      ...result
    });

  } catch (error) {
    console.error('Matching error:', error);
    res.status(500).json({
      error: error.message || 'Failed to process request',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date() });
});

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});