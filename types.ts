/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface Test {
  id: string;
  title: string;
  subtitle: string;
  questions: Question[];
}

export type Answer = {
  questionId: number;
  selectedOptionIndex: number;
  isCorrect: boolean;
};

// FIX: Add WardrobeItem type definition for use in WardrobeSheet component.
export interface WardrobeItem {
  id: string;
  name: string;
  url: string;
}