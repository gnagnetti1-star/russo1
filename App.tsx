/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ALL_TESTS } from './data/tests';
import LevelSelectScreen from './components/LevelSelectScreen';
import QuizScreen from './components/QuizScreen';
import ResultsScreen from './components/ResultsScreen';
import { Answer } from './types';

type Screen = 'level-select' | 'quiz' | 'results';
const PASS_THRESHOLD = 90;

const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('level-select');
  const [activeTestId, setActiveTestId] = useState<string | null>(null);
  const [lastAnswers, setLastAnswers] = useState<Answer[]>([]);
  
  // State for unlocked and completed levels would be stored in localStorage in a real app
  const [unlockedLevels, setUnlockedLevels] = useState<string[]>([ALL_TESTS[0].id]);
  const [completedLevels, setCompletedLevels] = useState<Record<string, number>>({});

  const activeTest = useMemo(() => {
    return ALL_TESTS.find(t => t.id === activeTestId) || null;
  }, [activeTestId]);

  const handleSelectTest = (testId: string) => {
    setActiveTestId(testId);
    setScreen('quiz');
  };

  const handleQuizComplete = (answers: Answer[]) => {
    setLastAnswers(answers);
    
    if (activeTest) {
      const correctAnswersCount = answers.filter(a => a.isCorrect).length;
      const totalQuestions = activeTest.questions.length;
      const score = Math.round((correctAnswersCount / totalQuestions) * 100);

      // Update best score
      setCompletedLevels(prev => ({
        ...prev,
        [activeTest.id]: Math.max(prev[activeTest.id] || 0, score),
      }));

      // Unlock next level if passed
      if (score >= PASS_THRESHOLD) {
        const currentIndex = ALL_TESTS.findIndex(t => t.id === activeTest.id);
        if (currentIndex !== -1 && currentIndex + 1 < ALL_TESTS.length) {
          const nextTestId = ALL_TESTS[currentIndex + 1].id;
          setUnlockedLevels(prev => {
            if (prev.includes(nextTestId)) return prev;
            return [...prev, nextTestId];
          });
        }
      }
    }
    setScreen('results');
  };

  const handleRestart = () => {
    setLastAnswers([]);
    setScreen('quiz');
  };

  const handleGoHome = () => {
    setActiveTestId(null);
    setLastAnswers([]);
    setScreen('level-select');
  };

  const renderScreen = () => {
    switch(screen) {
      case 'quiz':
        return activeTest && <QuizScreen key="quiz" test={activeTest} onQuizComplete={handleQuizComplete} />;
      case 'results':
        return activeTest && <ResultsScreen key="results" test={activeTest} answers={lastAnswers} onRestart={handleRestart} onGoHome={handleGoHome} />;
      case 'level-select':
      default:
        return <LevelSelectScreen key="level-select" tests={ALL_TESTS} unlockedLevels={unlockedLevels} completedLevels={completedLevels} onSelectTest={handleSelectTest} />;
    }
  };

  return (
    <div className="font-sans bg-gray-50">
      <AnimatePresence mode="wait">
        {renderScreen()}
      </AnimatePresence>
    </div>
  );
};

export default App;
