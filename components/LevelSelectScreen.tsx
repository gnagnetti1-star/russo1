/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { Test } from '../types';
import { LockIcon, CheckCircleIcon } from './icons';

interface LevelSelectScreenProps {
  tests: Test[];
  unlockedLevels: string[];
  completedLevels: Record<string, number>; // Maps testId to best score
  onSelectTest: (testId: string) => void;
}

const LevelSelectScreen: React.FC<LevelSelectScreenProps> = ({ tests, unlockedLevels, completedLevels, onSelectTest }) => {
  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center p-4 sm:p-6">
      <div className="w-full max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-gray-800">
            Тесты, тесты, тесты...
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            II СЕРТИФИКАЦИОННЫЙ УРОВЕНЬ
          </p>
        </header>
        <main className="space-y-4">
          {tests.map((test) => {
            const isUnlocked = unlockedLevels.includes(test.id);
            const bestScore = completedLevels[test.id];
            const isCompleted = bestScore >= 90;

            return (
              <button
                key={test.id}
                onClick={() => onSelectTest(test.id)}
                disabled={!isUnlocked}
                className={`w-full flex items-center justify-between p-4 sm:p-6 rounded-xl transition-all duration-200 text-left ${
                  isUnlocked
                    ? 'bg-white shadow-md hover:shadow-lg hover:-translate-y-1'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                <div className="flex-grow">
                  <h2 className="text-xl sm:text-2xl font-bold font-serif">
                    {test.title}
                  </h2>
                  <p className="text-sm sm:text-base">{test.subtitle}</p>
                </div>
                <div className="flex items-center space-x-4">
                  {bestScore !== undefined && (
                    <div className={`font-semibold text-lg ${isCompleted ? 'text-green-600' : 'text-amber-600'}`}>
                      {bestScore}%
                    </div>
                  )}
                  {isUnlocked ? (
                    isCompleted ? (
                      <CheckCircleIcon className="w-7 h-7 text-green-500" />
                    ) : (
                      <span className="w-7 h-7"></span> // Placeholder for alignment
                    )
                  ) : (
                    <LockIcon className="w-6 h-6" />
                  )}
                </div>
              </button>
            );
          })}
        </main>
      </div>
    </div>
  );
};

export default LevelSelectScreen;
