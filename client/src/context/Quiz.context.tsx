"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import mock from "@/mocks/matchups";
import { QuizContextType } from "common/types/quiz.types";
import Matchup from "common/types/matchup.types";
export const QuizContext = createContext<QuizContextType | null>(null);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [quizData, setQuizData] = useState([]);
  const fetchMatchups = async () => {
    let res = await fetch(
      "https://matchup-game-server.vercel.app/api/matchups"
    );
    let posts = await res.json();

    setQuizData((q) => q.concat(posts.data));
  };
  useEffect(() => {
    fetchMatchups();
    console.log("trigger");
  }, []);

  return (
    <QuizContext.Provider value={{ quizData, fetchMatchups }}>
      {children}
    </QuizContext.Provider>
  );
};
