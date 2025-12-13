import React, { useState, useCallback } from 'react';
import { GameState, Question } from './types';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import EndScreen from './components/EndScreen';
import Loader from './components/Loader';
import { TOTAL_QUESTIONS } from './constants';
import { generateQuizQuestions } from './services/geminiService';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('START');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStartGame = useCallback(async (topic: string) => {
    setLoading(true);
    setError(null);
    try {
      const fetchedQuestions = await generateQuizQuestions(topic);
      if (fetchedQuestions.length < TOTAL_QUESTIONS) {
        // Sometimes the API might return fewer questions than requested
        // In a real app, you might want to fetch more or handle this differently
        console.warn(`Expected ${TOTAL_QUESTIONS} questions, but got ${fetchedQuestions.length}`);
      }
      if (fetchedQuestions.length === 0) {
        throw new Error("No questions were generated. Please try a different topic or try again.");
      }
      setQuestions(fetchedQuestions);
      setScore(0);
      setCurrentQuestionIndex(0);
      setGameState('PLAYING');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      setGameState('START'); // Go back to start screen on error
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAnswer = useCallback((isCorrect: boolean) => {
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }
  }, []);

  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      setGameState('FINISHED');
    }
  }, [currentQuestionIndex, questions.length]);

  const handleRestart = useCallback(() => {
    setGameState('START');
    setQuestions([]);
    setError(null);
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <Loader message="Generating your Math challenge..." />
        </div>
      );
    }

    if (error && gameState === 'START') {
      // Show error on the start screen
      return (
          <div className="flex flex-col items-center justify-center min-h-screen">
              <StartScreen onStart={handleStartGame} />
              <div className="absolute top-5 bg-red-500/80 text-white p-4 rounded-lg shadow-lg animate-pulse">
                  <p className="font-bold">Error:</p>
                  <p>{error}</p>
              </div>
          </div>
      );
    }

    switch (gameState) {
      case 'PLAYING':
        return (
          <GameScreen
            question={questions[currentQuestionIndex]}
            questionNumber={currentQuestionIndex + 1}
            score={score}
            onAnswer={handleAnswer}
            onNext={handleNextQuestion}
          />
        );
      case 'FINISHED':
        return <EndScreen score={score} totalQuestions={questions.length} onRestart={handleRestart} />;
      case 'START':
      default:
        return <StartScreen onStart={handleStartGame} />;
    }
  };

  return <div className="App">{renderContent()}</div>;
};

export default App;