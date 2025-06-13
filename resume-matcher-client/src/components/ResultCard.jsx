import React from "react";

export default function ResultCard({ result }) {
  return (
    <div className="mt-6 p-4 border rounded bg-green-100 max-w-xl w-full mx-auto shadow-md">
      <h2 className="text-xl font-semibold text-green-800 mb-2">Match Result</h2>
      <div className="w-full bg-white rounded-full h-6 border border-green-300 overflow-hidden">
        <div
          className="bg-green-500 h-6 text-white text-sm font-bold text-center leading-6"
          style={{ width: `${result.match_percentage}%` }}
        >
          {result.match_percentage}%
        </div>
      </div>
      <p className="mt-3 text-gray-800">{result.explanation}</p>
    </div>
  );
}
