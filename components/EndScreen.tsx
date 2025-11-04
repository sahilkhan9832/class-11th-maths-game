
import React from 'react';

interface EndScreenProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

const EndScreen: React.FC<EndScreenProps> = ({ score, totalQuestions, onRestart }) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const getFeedbackMessage = () => {
    if (percentage === 100) return "Perfect Score! You're a Math Genius! 🚀";
    if (percentage >= 80) return "Excellent work! You really know your stuff. ✨";
    if (percentage >= 60) return "Great job! A little more practice and you'll be unstoppable. 👍";
    if (percentage >= 40) return "Good effort! Keep practicing. 💪";
    return "Keep trying! Every attempt is a step forward. 🧠";
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-gray-900 to-indigo-900/50">
      <div className="w-full max-w-md text-center bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-indigo-500/30">
        <h1 className="text-3xl font-bold text-gray-100 mb-2">Challenge Complete!</h1>
        <p className="text-lg text-gray-300 mb-6">{getFeedbackMessage()}</p>
        
        <div className="bg-gray-900/50 p-6 rounded-xl mb-8">
          <p className="text-xl text-indigo-300 mb-2">Your Final Score</p>
          <p className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
            {score} / {totalQuestions}
          </p>
        </div>

        <button
          onClick={onRestart}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 px-6 rounded-lg text-lg transform hover:scale-105 transition-transform duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-purple-500/50 shadow-lg"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default EndScreen;
