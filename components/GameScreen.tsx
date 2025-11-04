
import React, { useState, useEffect } from 'react';
import { Question } from '../types';
import { CheckIcon, CrossIcon } from './Icons';
import { TOTAL_QUESTIONS } from '../constants';

interface GameScreenProps {
  question: Question;
  questionNumber: number;
  score: number;
  onAnswer: (isCorrect: boolean) => void;
  onNext: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ question, questionNumber, score, onAnswer, onNext }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    setSelectedOption(null);
    setIsAnswered(false);
  }, [question]);

  const handleOptionClick = (option: string) => {
    if (isAnswered) return;

    const isCorrect = option === question.answer;
    setSelectedOption(option);
    setIsAnswered(true);
    onAnswer(isCorrect);
  };

  const getOptionClass = (option: string) => {
    if (!isAnswered) {
      return 'border-indigo-500/50 hover:bg-indigo-900/70 hover:border-indigo-400';
    }
    if (option === question.answer) {
      return 'bg-green-500/30 border-green-500 text-white';
    }
    if (option === selectedOption) {
      return 'bg-red-500/30 border-red-500 text-white';
    }
    return 'border-indigo-500/50 cursor-not-allowed';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-900">
      <div className="w-full max-w-2xl">
        <header className="flex justify-between items-center mb-6 text-lg font-semibold">
          <div className="bg-gray-800 px-4 py-2 rounded-lg">Question: <span className="text-indigo-400">{questionNumber}/{TOTAL_QUESTIONS}</span></div>
          <div className="bg-gray-800 px-4 py-2 rounded-lg">Score: <span className="text-green-400">{score}</span></div>
        </header>

        <main className="bg-gray-800/60 p-6 md:p-8 rounded-2xl shadow-lg border border-indigo-500/30">
          <div className="mb-6">
            <p className="text-xl md:text-2xl font-medium leading-relaxed text-gray-200">{question.question}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                disabled={isAnswered}
                className={`flex items-center justify-between w-full p-4 border-2 rounded-lg text-left transition-all duration-300 ${getOptionClass(option)}`}
              >
                <span className="text-base md:text-lg">{option}</span>
                {isAnswered && option === question.answer && <CheckIcon className="w-6 h-6 text-green-400" />}
                {isAnswered && option === selectedOption && option !== question.answer && <CrossIcon className="w-6 h-6 text-red-400" />}
              </button>
            ))}
          </div>

          {isAnswered && (
            <div className="mt-8 text-right">
              <button
                onClick={onNext}
                className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg text-lg transform hover:scale-105 transition-transform duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-indigo-500/50"
              >
                {questionNumber === TOTAL_QUESTIONS ? 'Finish' : 'Next Question'}
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default GameScreen;
