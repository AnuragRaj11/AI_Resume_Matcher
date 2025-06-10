import React from 'react';

export default function ResultCard({ result }) {
  return (
    <div className="mt-6 p-4 border rounded bg-green-100 max-w-3xl sm:max-w-xl w-full shadow-md">
      <h2 className="text-xl font-semibold text-green-800 mb-2">Match Score</h2>
      <p className="text-3xl font-bold text-green-900">{result.match_percentage}%</p>
    </div>
  );
}
