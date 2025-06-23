 # 📄 AI Resume Matcher
An intelligent full-stack web app that compares a user's resume with a job description using AI-based text similarity and skill matching. Built with React, Node.js, Express, and Natural Language Processing (NLP) techniques.

# 🧰 Tech Stack
Frontend: React, Axios, TailwindCSS, React Icons

Backend: Node.js, Express, Multer, Helmet, Morgan

NLP: Natural.js, TF-IDF, Word Tokenization

PDF Parsing: pdf-parse

Deployment: Netlify (frontend), Render (backend)

 # ✨ Features

✅ Upload PDF Resume
✅ Paste a job description
✅ Analyze:

Keyword similarity using TF-IDF
Skill matching (JavaScript, React, etc.)
Experience extraction via regex
Semantic overlap via token comparison

✅ See:
Overall match score
Skill gap suggestions
Experience comparison

✅ Realtime upload progress
✅ PDF size validation (max 5MB)


AI Resume Matcher
├─ ProjTest
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ resume-matcher-client
│  │  ├─ package-lock.json
│  │  ├─ package.json
│  │  ├─ postcss.config.js
│  │  ├─ public
│  │  │  └─ index.html
│  │  ├─ src
│  │  │  ├─ App.jsx
│  │  │  ├─ components
│  │  │  │  ├─ MatchForm.jsx
│  │  │  │  └─ ResultCard.jsx
│  │  │  ├─ index.css
│  │  │  ├─ index.js
│  │  │  └─ tailwind-output.css
│  │  └─ tailwind.config.js
│  └─ resume-matcher-server
│     ├─ .env
│     ├─ index.js
│     ├─ package-lock.json
│     ├─ package.json
│     ├─ services
│     │  ├─ matchingService.js
│     │  └─ pdfService.js
│     └─ test
│        └─ data
│           └─ test-resume.pdf
└─ README.md

```


# 📜 License
MIT © Anurag Raj
```
