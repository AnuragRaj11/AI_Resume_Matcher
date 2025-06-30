import React, { useState } from 'react';
import MatchForm from './components/MatchForm';
import ResultCard from './components/ResultCard';
import './index.css';

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const handleResult = (data) => {
    if (data.error) {
      setApiError(data.error);
      setResult(null);
    } else {
      setResult(data);
      setApiError(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col items-center p-4 sm:p-8">
      <header className="w-full max-w-4xl mb-8 text-center">
        <div className="inline-block bg-gradient-to-r from-blue-700 to-indigo-800 p-1 rounded-lg mb-4 shadow-lg">
          <h1 className="text-4xl font-bold text-white px-6 py-2 rounded-md">
            AI Resume Matcher
          </h1>
        </div>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Upload your resume and job description to get instant matching analysis
        </p>
      </header>

      <div className="w-full max-w-4xl bg-white text-gray-900 rounded-xl shadow-lg p-6 mb-8 transition-all duration-300 hover:shadow-xl">
        <MatchForm 
          onResult={handleResult} 
          setLoading={setLoading} 
        />
      </div>

      {apiError && (
        <div className="w-full max-w-4xl p-4 bg-red-50 text-red-700 rounded-xl border border-red-200 mb-8">
          <p className="font-medium">{apiError}</p>
        </div>
      )}

      {loading && (
        <div className="w-full max-w-4xl flex flex-col items-center my-8 space-y-4">
          <div className="relative w-20 h-20">
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-indigo-600"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-12 w-12 bg-indigo-100 rounded-full animate-pulse"></div>
            </div>
          </div>
          <p className="text-gray-700 font-medium">Analyzing your resume...</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 max-w-md">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2.5 rounded-full animate-pulse" style={{ width: '45%' }}></div>
          </div>
        </div>
      )}

      {result && (
        <div className="w-full max-w-4xl animate-fade-in">
          <ResultCard result={result} />
        </div>
      )}

      <footer className="mt-12 text-center text-gray-600 text-sm">
        <p>© {new Date().getFullYear()} AI Resume Matcher | Your data is processed securely and never stored</p>
      </footer>
    </div>
  );
}

export default App;
