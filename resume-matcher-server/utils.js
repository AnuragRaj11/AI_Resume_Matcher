import { TfIdf, PorterStemmer, NGrams } from 'natural';

export function cosineSimilarity(textA, textB) {
  const tfidf = new TfIdf();

  tfidf.addDocument(textA);
  tfidf.addDocument(textB);

  const vecA = [];
  const vecB = [];

  tfidf.listTerms(0).forEach((term) => {
    vecA.push(term.tfidf);
    const termB = tfidf.tfidf(term.term, 1);
    vecB.push(termB);
  });

  const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a ** 2, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b ** 2, 0));

  if (magnitudeA === 0 || magnitudeB === 0) return 0;
  return dotProduct / (magnitudeA * magnitudeB);
}
