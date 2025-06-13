import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const natural = require('natural');

export function cosineSimilarity(resume, jd) {
  const TfIdf = natural.TfIdf;
  const tfidf = new TfIdf();

  tfidf.addDocument(resume);
  tfidf.addDocument(jd);

  const terms = tfidf.listTerms(0);
  const vecA = terms.map(t => t.tfidf);
  const vecB = terms.map(t => tfidf.tfidf(t.term, 1));

  const dot = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const magA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));

  return magA && magB ? dot / (magA * magB) : 0;
}
