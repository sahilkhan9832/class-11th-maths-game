
import React, { useState } from 'react';
import { MATH_TOPICS } from '../constants';
import { BrainIcon } from './Icons';

interface StartScreenProps {
  onStart: (topic: string) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const [selectedTopic, setSelectedTopic] = useState(MATH_TOPICS[0]);

  const handleStart = () => {
    onStart(selectedTopic);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-gray-900 to-indigo-900/50">
      <div className="w-full max-w-md text-center bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-indigo-500/30">
        <BrainIcon className="w-20 h-20 mx-auto mb-4 text-indigo-400" />
        <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-2">
          Math Whiz Challenge
        </h1>
        <p className="text-gray-300 mb-8">
          Select a topic and test your Class 11th math skills!
        </p>
        
        <div className="flex flex-col space-y-6">
          <div className="relative">
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 border border-indigo-600 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-400 text-lg"
            >
              {MATH_TOPICS.map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
          
          <button
            onClick={handleStart}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 px-6 rounded-lg text-lg transform hover:scale-105 transition-transform duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-purple-500/50 shadow-lg"
          >
            Start Challenge
          </button>
        </div>
      </div>
      <footer className="absolute bottom-4 text-sm text-gray-500">
        Powered by Gemini API
      </footer>
    </div>
  );
};

export default StartScreen;
