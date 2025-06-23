import React, { useState } from 'react';
import axios from 'axios';
import { FiUpload, FiFileText, FiX, FiEdit2, FiAlertTriangle } from 'react-icons/fi';

const MatchForm = ({ onResult, setLoading }) => {
  const [resumeFile, setResumeFile] = useState(null);
  const [jd, setJd] = useState('');
  const [error, setError] = useState('');
  const [warning, setWarning] = useState('');
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === 'application/pdf') {
        if (file.size > 5 * 1024 * 1024) {
          setError('File size must be less than 5MB');
        } else {
          setResumeFile(file);
          setError('');
        }
      } else {
        setError('Please upload a valid PDF file');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resumeFile) {
      setError('Please upload a resume file');
      return;
    }
    if (!jd.trim()) {
      setError('Job description cannot be empty');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setWarning('');
      setProgress(0);

      const formData = new FormData();
      formData.append('resume', resumeFile);
      formData.append('jobDescription', jd);

      const response = await axios.post(
        'https://ai-resume-matcher-qb6a.onrender.com/api/match',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          }
        }
      );

      if (response.data.success) {
        onResult(response.data);
      } else {
        setError(response.data.error || 'Matching failed');
      }
    } catch (err) {
      console.error('API error:', err);
      setError(err.response?.data?.error ||
        err.message ||
        'Failed to process your request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const removeFile = () => {
    setResumeFile(null);
  };

  const handleJdChange = (e) => {
    const value = e.target.value;
    setJd(value);
    setWarning('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <label className="block text-lg font-semibold text-gray-800">
          Upload Resume (PDF, max 5MB)
          <span className="text-red-500 ml-1">*</span>
        </label>

        {resumeFile ? (
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border-2 border-blue-100 transition-all duration-200">
            <div className="flex items-center">
              <FiFileText className="text-blue-600 text-xl mr-3" />
              <span className="text-blue-800 font-medium truncate max-w-xs">
                {resumeFile.name}
              </span>
            </div>
            <button
              type="button"
              onClick={removeFile}
              className="text-gray-500 hover:text-red-500 transition-colors"
            >
              <FiX className="text-xl" />
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-blue-200 rounded-xl cursor-pointer bg-blue-50 hover:bg-blue-100 transition-all duration-300 group">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <div className="p-3 bg-blue-100 rounded-full mb-3 group-hover:bg-blue-200 transition-colors">
                <FiUpload className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-semibold text-blue-700">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">PDF only (MAX. 5MB)</p>
            </div>
            <input
              type="file"
              className="hidden"
              accept=".pdf"
              onChange={handleFileChange}
            />
          </label>
        )}
      </div>

      <div className="space-y-4">
        <label className="block text-lg font-semibold text-gray-800">
          Job Description
          <span className="text-red-500 ml-1">*</span>
        </label>
        <div className="relative">
          <textarea
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-500 min-h-[200px] placeholder-gray-400 transition-all duration-200"
            placeholder="Paste the job description here"
            value={jd}
            onChange={handleJdChange}
          />
          <div className="absolute bottom-4 right-4 text-gray-400">
            <FiEdit2 />
          </div>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-50 text-red-700 rounded-lg border border-red-200 flex items-start">
          <FiAlertTriangle className="flex-shrink-0 mr-2 mt-0.5 text-red-500" />
          <span>{error}</span>
        </div>
      )}

      {warning && (
        <div className="p-3 bg-amber-50 text-amber-700 rounded-lg border border-amber-200 flex items-start">
          <FiAlertTriangle className="flex-shrink-0 mr-2 mt-0.5 text-amber-500" />
          <span>{warning}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={!resumeFile || !jd.trim()}
        className={`w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 ${
          (!resumeFile || !jd.trim()) ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        Analyze Match
      </button>

      {progress > 0 && progress < 100 && (
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
    </form>
  );
};

export default MatchForm;
