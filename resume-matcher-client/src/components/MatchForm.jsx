import React, { useState } from 'react';
import axios from 'axios';

export default function MatchForm({ onResult }) {
  const [resume, setResume] = useState('');
  const [jd, setJd] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileRead = (file, setContent) => {
    const reader = new FileReader();
    reader.onload = () => setContent(reader.result);
    reader.readAsText(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('resume', resume);
      formData.append('job_description', jd);

      const response = await axios.post('http://localhost:8000/match/', formData);
      onResult(response.data);
    } catch (err) {
      alert('Error: ' + err.message);
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-3xl sm:max-w-xl p-6 rounded-lg shadow-lg
                 bg-gradient-to-r from-green-200 via-green-100 to-blue-200
                 backdrop-blur-sm bg-opacity-80"
    >
      {/* Resume Upload */}
      <label className="block mb-2 font-semibold text-green-700">
        Upload Resume (or paste below)
      </label>
      <input
        type="file"
        accept=".txt,.pdf,.doc,.docx"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) handleFileRead(file, setResume);
        }}
        className="mb-3 border-2 border-green-500 rounded p-1 cursor-pointer hover:border-green-700 transition"
      />
      <textarea
        className="w-full p-3 mb-6 border-2 border-green-500 rounded focus:outline-none focus:ring-4 focus:ring-green-400 focus:border-green-600 transition"
        rows={4}
        placeholder="Or paste resume here"
        value={resume}
        onChange={(e) => setResume(e.target.value)}
      />

      {/* Job Description Upload */}
      <label className="block mb-2 font-semibold text-green-700">
        Upload Job Description (or paste below)
      </label>
      <input
        type="file"
        accept=".txt,.pdf,.doc,.docx"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) handleFileRead(file, setJd);
        }}
        className="mb-3 border-2 border-green-500 rounded p-1 cursor-pointer hover:border-green-700 transition"
      />
      <textarea
        className="w-full p-3 mb-6 border-2 border-green-500 rounded focus:outline-none focus:ring-4 focus:ring-green-400 focus:border-green-600 transition"
        rows={4}
        placeholder="Or paste job description here"
        value={jd}
        onChange={(e) => setJd(e.target.value)}
      />

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 rounded text-white font-bold transition transform duration-150 ease-in-out ${
          loading
            ? 'bg-green-300 cursor-not-allowed scale-100'
            : 'bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 hover:scale-105 active:scale-95'
        }`}
      >
        {loading ? 'Matching...' : 'Match Resume'}
      </button>
    </form>
  );
}
