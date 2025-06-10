import React, { useState } from 'react';
import MatchForm from './components/MatchForm';
import ResultCard from './components/ResultCard';

export default function App() {
  const [result, setResult] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-300 via-pink-200 to-yellow-200 flex flex-col items-center p-4 sm:p-8">
      <h1 className="text-4xl font-extrabold mb-8 text-indigo-900 drop-shadow">
        Resume Matcher
      </h1>
      <MatchForm onResult={setResult} />
      {result && <ResultCard result={result} />}
    </div>
  );
}
