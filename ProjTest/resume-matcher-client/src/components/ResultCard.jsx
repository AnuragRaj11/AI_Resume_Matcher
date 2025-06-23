import React from 'react';
import { FiCheck, FiX, FiAlertTriangle, FiInfo, FiStar, FiAward, FiTool } from 'react-icons/fi';

const ResultCard = ({ result }) => {
  const { matchPercentage, analysis, suggestions } = result;
  
  const getMatchLevel = () => {
    const percentage = parseFloat(matchPercentage);
    if (percentage >= 80) return 'high';
    if (percentage >= 60) return 'medium';
    return 'low';
  };
  
  const matchLevel = getMatchLevel();
  
  const levelStyles = {
    high: 'bg-gradient-to-br from-green-50 to-green-100 text-green-800 border-b-4 border-green-400',
    medium: 'bg-gradient-to-br from-yellow-50 to-yellow-100 text-yellow-800 border-b-4 border-yellow-400',
    low: 'bg-gradient-to-br from-red-50 to-red-100 text-red-800 border-b-4 border-red-400'
  };
  
  const levelIcons = {
    high: <FiAward className="text-green-500 text-3xl" />,
    medium: <FiStar className="text-yellow-500 text-3xl" />,
    low: <FiTool className="text-red-500 text-3xl" />
  };
  
  const SkillMatch = ({ skill, matched }) => (
    <div className="flex items-center py-2 px-4 rounded-lg hover:bg-opacity-10 transition-all duration-200 hover:scale-[1.02]">
      {matched ? (
        <div className="p-1.5 mr-3 rounded-full bg-green-100 text-green-600">
          <FiCheck className="text-lg" />
        </div>
      ) : (
        <div className="p-1.5 mr-3 rounded-full bg-red-100 text-red-600">
          <FiX className="text-lg" />
        </div>
      )}
      <span className={`font-medium ${matched ? 'text-green-700' : 'text-red-700'}`}>
        {skill}
      </span>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300">
      <div className={`p-6 ${levelStyles[matchLevel]}`}>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center">
            <div className="mr-4 bg-white p-3 rounded-xl shadow-sm">
              {levelIcons[matchLevel]}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-1">Resume Match Analysis</h2>
              <p className="text-lg text-gray-700">
                Compatibility with job requirements
              </p>
            </div>
          </div>
          
          <div className="w-full md:w-1/2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Match Score
              </span>
              <span className={`text-2xl font-bold ${
                matchLevel === 'high' ? 'text-green-600' : 
                matchLevel === 'medium' ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {matchPercentage}%
              </span>
            </div>
            
            <div className="w-full bg-gray-100 rounded-full h-3 shadow-inner overflow-hidden">
              <div 
                className={`h-full rounded-full ${
                  matchLevel === 'high' ? 'bg-gradient-to-r from-green-400 via-green-500 to-green-600' : 
                  matchLevel === 'medium' ? 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600' : 
                  'bg-gradient-to-r from-red-400 via-red-500 to-red-600'
                } shadow-md transition-all duration-500`}
                style={{ width: `${matchPercentage}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between text-xs font-medium text-gray-500 mt-2 px-1">
              {[0, 25, 50, 75, 100].map((point) => (
                <span 
                  key={point} 
                  className={`transition-colors duration-300 ${
                    matchPercentage >= point ? 'text-gray-700 font-bold' : ''
                  }`}
                >
                  {point}%
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
              <div className="bg-blue-100 p-2 rounded-xl mr-3 text-blue-600">
                <FiTool className="text-xl" />
              </div>
              Skills Analysis
            </h3>
            <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
              {analysis.jobSkills.map(skill => (
                <SkillMatch 
                  key={skill} 
                  skill={skill} 
                  matched={analysis.matchingSkills.includes(skill)} 
                />
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                <div className="bg-purple-100 p-2 rounded-xl mr-3 text-purple-600">
                  <FiStar className="text-xl" />
                </div>
                Experience Comparison
              </h3>
              <div className="flex justify-between items-center mb-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Your Experience</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {analysis.resumeExperience} {analysis.resumeExperience === 1 ? 'year' : 'years'}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Job Requirement</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {analysis.jobExperience} {analysis.jobExperience === 1 ? 'year' : 'years'}
                  </p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                <div 
                  className={`h-3 rounded-full ${
                    analysis.resumeExperience >= analysis.jobExperience ? 
                    'bg-gradient-to-r from-green-400 to-green-600' : 
                    'bg-gradient-to-r from-yellow-400 to-yellow-600'
                  } transition-all duration-500`}
                  style={{ width: `${Math.min(100, (analysis.resumeExperience / analysis.jobExperience) * 100)}%` }}
                ></div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                <div className="bg-teal-100 p-2 rounded-xl mr-3 text-teal-600">
                  <FiAward className="text-xl" />
                </div>
                Score Breakdown
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Keyword Match</span>
                    <span className="text-sm font-bold text-blue-600">{analysis.keywordScore}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 shadow-inner">
                    <div 
                      className="h-2.5 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-500" 
                      style={{ width: `${analysis.keywordScore}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Skill Match</span>
                    <span className="text-sm font-bold text-teal-600">{analysis.skillScore}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 shadow-inner">
                    <div 
                      className="h-2.5 rounded-full bg-gradient-to-r from-teal-400 to-teal-600 transition-all duration-500" 
                      style={{ width: `${analysis.skillScore}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Experience</span>
                    <span className="text-sm font-bold text-amber-600">{analysis.experienceScore}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 shadow-inner">
                    <div 
                      className="h-2.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-500" 
                      style={{ width: `${analysis.experienceScore}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
            <div className="bg-rose-100 p-2 rounded-xl mr-3 text-rose-600">
              <FiAlertTriangle className="text-xl" />
            </div>
            Improvement Recommendations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {suggestions.map((suggestion, index) => (
              <div 
                key={index} 
                className={`p-4 rounded-xl flex items-start transition-all duration-200 hover:shadow-md ${
                  suggestion.priority === 'high' ? 
                  'bg-rose-50 border-l-4 border-rose-500' : 
                  suggestion.priority === 'medium' ? 
                  'bg-amber-50 border-l-4 border-amber-500' : 
                  'bg-blue-50 border-l-4 border-blue-500'
                }`}
              >
                <div className="mr-3 mt-0.5">
                  {suggestion.priority === 'high' ? 
                    <FiAlertTriangle className="text-rose-500 text-xl" /> :
                    <FiInfo className="text-blue-500 text-xl" />
                  }
                </div>
                <div>
                  <p className="font-medium text-gray-800">
                    {suggestion.message}
                  </p>
                  {suggestion.priority === 'high' && (
                    <span className="inline-block mt-2 px-2 py-0.5 text-xs font-semibold bg-rose-100 text-rose-800 rounded-full">
                      High Priority
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;