/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { Test, Answer } from '../types';
import { motion } from 'framer-motion';

interface ResultsScreenProps {
  test: Test;
  answers: Answer[];
  onRestart: () => void;
  onGoHome: () => void;
}

const PASS_THRESHOLD = 90;

const ResultsScreen: React.FC<ResultsScreenProps> = ({ test, answers, onRestart, onGoHome }) => {
  const correctAnswersCount = answers.filter(a => a.isCorrect).length;
  const totalQuestions = test.questions.length;
  const score = Math.round((correctAnswersCount / totalQuestions) * 100);
  const passed = score >= PASS_THRESHOLD;

  const message = passed
    ? 'Отлично! Уровень пройден.'
    : 'Попробуйте еще раз. Нужно 90% для прохождения.';
  
  const messageColor = passed ? 'text-green-600' : 'text-amber-600';

  return (
    <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 text-center"
      >
        <h1 className="text-3xl font-serif font-bold text-gray-800">Результаты</h1>
        <p className="text-lg text-gray-600 mt-1">{test.title}</p>
        
        <div className="my-8">
          <div className={`text-7xl font-bold ${passed ? 'text-green-500' : 'text-red-500'}`}>
            {score}%
          </div>
          <p className="text-gray-700 mt-2">
            {correctAnswersCount} из {totalQuestions} правильных ответов
          </p>
        </div>

        <p className={`text-xl font-semibold mb-8 ${messageColor}`}>{message}</p>

        <div className="space-y-4">
          <button
            onClick={onRestart}
            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg text-lg hover:bg-blue-700 transition-colors"
          >
            {passed ? 'Пройти снова' : 'Попробовать еще раз'}
          </button>
          <button
            onClick={onGoHome}
            className="w-full bg-gray-200 text-gray-800 font-bold py-3 px-4 rounded-lg text-lg hover:bg-gray-300 transition-colors"
          >
            К списку тестов
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ResultsScreen;
