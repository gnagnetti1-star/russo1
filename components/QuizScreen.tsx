/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import { Test, Answer } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { XCircleIcon, CheckCircleIcon } from './icons';

interface QuizScreenProps {
  test: Test;
  onQuizComplete: (answers: Answer[]) => void;
}

const optionLetters = ['А', 'Б', 'В', 'Г'];

const QuizScreen: React.FC<QuizScreenProps> = ({ test, onQuizComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const currentQuestion = test.questions[currentQuestionIndex];
  const totalQuestions = test.questions.length;

  const handleOptionSelect = (optionIndex: number) => {
    if (showFeedback) return;
    setSelectedOption(optionIndex);
    setShowFeedback(true);
    
    const isCorrect = optionIndex === currentQuestion.correctAnswerIndex;
    setAnswers(prev => [...prev, {
      questionId: currentQuestion.id,
      selectedOptionIndex: optionIndex,
      isCorrect,
    }]);
  };

  const handleNext = () => {
    setShowFeedback(false);
    setSelectedOption(null);
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Pass the final, complete list of answers
      onQuizComplete([...answers, {
        questionId: currentQuestion.id,
        selectedOptionIndex: selectedOption!,
        isCorrect: selectedOption === currentQuestion.correctAnswerIndex,
      }]);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      <header className="p-4 border-b border-gray-200">
        <h1 className="text-2xl font-serif font-bold text-center text-gray-800">{test.title}: {test.subtitle}</h1>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
          <motion.div
            className="bg-blue-600 h-2.5 rounded-full"
            initial={{ width: `${(currentQuestionIndex / totalQuestions) * 100}%` }}
            animate={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          ></motion.div>
        </div>
      </header>

      <main className="flex-grow flex flex-col justify-center p-4 sm:p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-2xl mx-auto"
          >
            <p className="text-center text-lg sm:text-xl text-gray-600 mb-6">
              Вопрос {currentQuestionIndex + 1} из {totalQuestions}
            </p>
            <p className="text-center text-2xl sm:text-3xl font-semibold text-gray-900 mb-10 h-20 flex items-center justify-center">
              {currentQuestion.text}
            </p>
            <div className="space-y-4">
              {currentQuestion.options.map((option, index) => {
                const isCorrect = index === currentQuestion.correctAnswerIndex;
                const isSelected = index === selectedOption;

                let buttonClass = 'bg-white hover:bg-gray-100 border-gray-300';
                if (showFeedback) {
                  if (isCorrect) {
                    buttonClass = 'bg-green-100 border-green-500 text-green-800';
                  } else if (isSelected && !isCorrect) {
                    buttonClass = 'bg-red-100 border-red-500 text-red-800';
                  } else {
                    buttonClass = 'bg-gray-100 border-gray-300 opacity-70';
                  }
                }
                
                return (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(index)}
                    disabled={showFeedback}
                    className={`w-full flex items-center p-4 rounded-lg border-2 text-left transition-all duration-200 ${buttonClass}`}
                  >
                    <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 mr-4 text-sm font-bold rounded-full border-2 border-current">
                      {optionLetters[index]}
                    </span>
                    <span className="text-lg">{option}</span>
                    {showFeedback && isSelected && (
                        isCorrect ? <CheckCircleIcon className="w-6 h-6 ml-auto text-green-600"/> : <XCircleIcon className="w-6 h-6 ml-auto text-red-600"/>
                    )}
                     {showFeedback && !isSelected && isCorrect && (
                       <CheckCircleIcon className="w-6 h-6 ml-auto text-green-600"/>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="p-4 border-t border-gray-200">
        <AnimatePresence>
          {showFeedback && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleNext}
              className="w-full max-w-2xl mx-auto block bg-blue-600 text-white font-bold py-4 px-4 rounded-lg text-lg hover:bg-blue-700 transition-colors"
            >
              {currentQuestionIndex < totalQuestions - 1 ? 'Следующий' : 'Завершить'}
            </motion.button>
          )}
        </AnimatePresence>
      </footer>
    </div>
  );
};

export default QuizScreen;
