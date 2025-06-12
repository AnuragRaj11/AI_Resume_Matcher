import React from "react";

export default function ResultCard({ result }) {
  const { match_percentage } = result;

  return (
    <div className="mt-6 p-6 rounded-lg shadow-md bg-gradient-to-r from-green-100 to-green-200 border border-green-400">
      <h2 className="text-2xl font-semibold text-green-800 mb-4">Match Result</h2>
      <div className="w-full bg-white rounded-full h-6 border border-green-300 overflow-hidden">
        <div
          className="bg-green-500 h-6 text-white text-sm font-bold text-center leading-6"
          style={{ width: `${match_percentage}%`, transition: "width 0.5s ease-in-out" }}
        >
          {match_percentage}%
        </div>
      </div>
    </div>
  );
}
