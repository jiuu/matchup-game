"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import mock from "@/mocks/matchups";
import { QuizContextType } from "common/types/quiz.types";
import Matchup from "common/types/matchup.types";
export const QuizContext = createContext<QuizContextType | null>(null);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [quizData, setQuizData] = useState<Matchup[]>(mock);
  const [questionIndex, setQuestionIndex] = useState(0);
  useEffect(() => {
    // Simulate a user login process
    setQuizData(mock);
  }, []);

  return (
    <QuizContext.Provider value={{ quizData, questionIndex, setQuestionIndex }}>
      {children}
    </QuizContext.Provider>
  );
};
