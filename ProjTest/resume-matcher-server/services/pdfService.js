const pdfParse = require('pdf-parse');
const natural = require('natural');
const { WordTokenizer } = natural;
const tokenizer = new WordTokenizer();

exports.extractTextFromPdf = async (buffer) => {
  try {
    const data = await pdfParse(buffer);
    let text = data.text;
    text = text.replace(/\s+/g, ' ').trim();
    return text;
  } catch (error) {
    console.error('PDF processing error:', error);
    throw new Error('Failed to process PDF');
  }
};

exports.extractSkills = (text) => {
  const skillsList = [
    'JavaScript', 'React', 'Node.js', 'Python', 'Java', 'SQL', 
    'MongoDB', 'Express', 'AWS', 'Docker', 'Kubernetes', 'Git',
    'TypeScript', 'Redux', 'GraphQL', 'REST API', 'HTML', 'CSS',
    'Machine Learning', 'TensorFlow', 'PyTorch', 'Data Analysis'
  ];
  
  const foundSkills = [];
  const tokens = tokenizer.tokenize(text.toLowerCase());
  
  skillsList.forEach(skill => {
    const lowerSkill = skill.toLowerCase();
    if (tokens.includes(lowerSkill)) {
      foundSkills.push(skill);
    }
  });
  
  return [...new Set(foundSkills)];
};

exports.extractExperience = (text) => {
  const experiencePatterns = [
    /\b(\d+)\s+years?\b/gi,
    /\b(\d+)\+\s+years?\b/gi,
    /\b(\d+)\s*-\s*(\d+)\s+years?\b/gi
  ];
  
  let experience = 0;
  
  experiencePatterns.forEach(pattern => {
    const matches = [...text.matchAll(pattern)];
    matches.forEach(match => {
      const years = parseInt(match[1]) || 0;
      if (years > experience) experience = years;
    });
  });
  
  return experience;
};
