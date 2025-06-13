import React, { useState, useRef } from "react";
import axios from "axios";

export default function MatchForm({ onResult }) {
  const [resumeFile, setResumeFile] = useState(null);
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file?.type === "application/pdf") {
      setResumeFile(file);
      setError(null);
    } else {
      setError("Please upload a valid PDF file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resumeFile || !jd) return setError("Both resume and JD required");

    setLoading(true);
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append("resume", resumeFile);
      formData.append("job_description", jd);

      const res = await axios.post("http://localhost:8000/match", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) =>
          setProgress(Math.round((e.loaded * 100) / e.total)),
      });

      onResult(res.data);
      setResumeFile(null);
      setJd("");
      fileInputRef.current.value = "";
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Matching failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-xl mx-auto bg-white rounded shadow space-y-4">
      <label className="block font-bold text-green-700">Upload Resume (PDF)</label>
      <input
        type="file"
        accept=".pdf"
        ref={fileInputRef}
        onChange={handleFileSelect}
        className="w-full border border-green-500 rounded px-3 py-2"
        required
      />

      <label className="block font-bold text-green-700">Job Description</label>
      <textarea
        className="w-full border border-green-500 rounded p-2"
        rows="6"
        value={jd}
        onChange={(e) => setJd(e.target.value)}
        required
        placeholder="Paste the job description here..."
      />

      {loading && (
        <div className="w-full bg-gray-300 rounded-full h-2 overflow-hidden">
          <div
            className="bg-green-600 h-2 transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

      {error && <p className="text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 font-bold text-white rounded ${
          loading ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {loading ? "Matching..." : "Match Resume"}
      </button>
    </form>
  );
}
