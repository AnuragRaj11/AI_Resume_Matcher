const natural = require('natural');
const { extractSkills, extractExperience } = require('./pdfService');
const { TfIdf } = natural;
const { WordTokenizer } = natural;
const tokenizer = new WordTokenizer();

exports.enhancedMatch = async (resumeText, jobDescription) => {
  // 1. Keyword matching using TF-IDF
  const keywordScore = calculateKeywordSimilarity(resumeText, jobDescription);
  
  // 2. Skill matching
  const resumeSkills = extractSkills(resumeText);
  const jdSkills = extractSkills(jobDescription);
  const skillScore = calculateSkillSimilarity(resumeSkills, jdSkills);
  
  // 3. Experience matching
  const resumeExp = extractExperience(resumeText);
  const jdExp = extractExperience(jobDescription);
  const expScore = calculateExperienceMatch(resumeExp, jdExp);
  
  // 4. Semantic similarity (simulated)
  const semanticScore = calculateSemanticSimilarity(resumeText, jobDescription);
  
  // Calculate overall score with weights
  const overallScore = (
    keywordScore * 0.25 + 
    skillScore * 0.35 + 
    expScore * 0.20 + 
    semanticScore * 0.20
  ) * 100;
  
  // Generate suggestions
  const suggestions = generateSuggestions(resumeSkills, jdSkills, resumeExp, jdExp);
  
  return {
    matchPercentage: overallScore.toFixed(2),
    analysis: {
      keywordScore: (keywordScore * 100).toFixed(2),
      skillScore: (skillScore * 100).toFixed(2),
      experienceScore: (expScore * 100).toFixed(2),
      semanticScore: (semanticScore * 100).toFixed(2),
      resumeSkills,
      jobSkills: jdSkills,
      resumeExperience: resumeExp,
      jobExperience: jdExp,
      missingSkills: jdSkills.filter(skill => !resumeSkills.includes(skill)),
      matchingSkills: jdSkills.filter(skill => resumeSkills.includes(skill)),
    },
    suggestions
  };
};

function calculateKeywordSimilarity(textA, textB) {
  const tfidf = new TfIdf();
  
  tfidf.addDocument(textA);
  tfidf.addDocument(textB);
  
  const terms = tfidf.listTerms(0);
  const vecA = terms.map(t => t.tfidf);
  const vecB = terms.map(t => tfidf.tfidf(t.term, 1));
  
  const dot = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const magA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  
  return magA && magB ? dot / (magA * magB) : 0;
}

function calculateSkillSimilarity(resumeSkills, jdSkills) {
  if (jdSkills.length === 0) return 0;
  
  const matchingSkills = jdSkills.filter(skill => 
    resumeSkills.includes(skill)
  );
  
  return matchingSkills.length / jdSkills.length;
}

function calculateExperienceMatch(resumeExp, jdExp) {
  if (jdExp === 0) return 1;
  
  if (resumeExp >= jdExp) return 1;
  
  return resumeExp / jdExp;
}

function calculateSemanticSimilarity(textA, textB) {
  const tokensA = new Set(tokenizer.tokenize(textA.toLowerCase()));
  const tokensB = new Set(tokenizer.tokenize(textB.toLowerCase()));
  
  const intersection = [...tokensA].filter(token => tokensB.has(token)).length;
  const union = tokensA.size + tokensB.size - intersection;
  
  return union ? intersection / union : 0;
}

function generateSuggestions(resumeSkills, jdSkills, resumeExp, jdExp) {
  const suggestions = [];
  
  const missingSkills = jdSkills.filter(skill => !resumeSkills.includes(skill));
  if (missingSkills.length > 0) {
    suggestions.push({
      type: 'skill',
      message: `Add these skills to improve your match: ${missingSkills.join(', ')}`,
      priority: 'high'
    });
  }
  
  if (resumeExp < jdExp) {
    suggestions.push({
      type: 'experience',
      message: `The job requires ${jdExp} years of experience, but your resume shows ${resumeExp} years`,
      priority: 'medium'
    });
  }
  
  if (resumeSkills.length < 15) {
    suggestions.push({
      type: 'content',
      message: 'Consider adding more technical skills to your resume',
      priority: 'low'
    });
  }
  
  return suggestions;
}
