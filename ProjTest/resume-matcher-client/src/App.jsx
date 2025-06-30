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
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 flex flex-col items-center p-4 sm:p-8">
      {/* Enhanced Header with Blue Gradient */}
      <header className="w-full max-w-4xl mb-8 text-center">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl shadow-lg transform group-hover:scale-105 transition-all duration-500 -z-10 opacity-95" />
       <h1 className="text-4xl md:text-5xl font-extrabold text-custom-red px-8 py-4 rounded-xl relative z-10">
            AI Resume Matcher
          </h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-6 leading-relaxed">
          Upload your resume and job description to get <span className="font-semibold text-blue-600">instant matching analysis</span> and <span className="font-semibold text-blue-600">personalized suggestions</span>.
        </p>
      </header>

      {/* Rest of the code remains the same... */}
      <main className="w-full max-w-4xl bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 transition-all duration-500 hover:shadow-2xl border border-gray-100">
        <MatchForm 
          onResult={handleResult} 
          setLoading={setLoading} 
          loading={loading}
        />
      </main>

      {apiError && (
        <div className="w-full max-w-4xl p-4 bg-red-50/90 backdrop-blur-sm text-red-700 rounded-xl border border-red-200 mb-8" aria-live="polite">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <p className="font-medium">{apiError}</p>
          </div>
        </div>
      )}

      {loading && (
        <div className="w-full max-w-4xl flex flex-col items-center my-8 space-y-6" aria-live="polite">
          <div className="relative w-24 h-24">
            <div className="animate-spin rounded-full h-full w-full border-t-4 border-b-4 border-blue-600 border-opacity-30"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-16 w-16 bg-blue-100 rounded-full animate-pulse flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          </div>
          <p className="text-gray-700 font-medium text-lg">Analyzing your resume...</p>
          <div className="w-full max-w-md">
            <div className="flex justify-between text-sm text-gray-500 mb-1">
              <span>0%</span>
              <span>100%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-2.5 rounded-full animate-pulse" 
                style={{ width: '100%' }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {result && !loading && (
        <section className="w-full max-w-4xl" aria-live="polite">
          <ResultCard result={result} />
        </section>
      )}

      <footer className="mt-12 text-center text-gray-500 text-sm">
        <div className="flex items-center justify-center space-x-4 mb-2">
          <a href="/privacy" className="hover:text-blue-600 transition-colors">Privacy</a>
          <span>•</span>
          <a href="/terms" className="hover:text-blue-600 transition-colors">Terms</a>
          <span>•</span>
          <a href="/contact" className="hover:text-blue-600 transition-colors">Contact</a>
        </div>
        <p className="text-gray-400">
          © {new Date().getFullYear()} AI Resume Matcher — Your data is processed securely and never stored.
        </p>
      </footer>
    </div>
  );
}

export default App;