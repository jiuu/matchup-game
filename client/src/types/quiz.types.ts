import Matchup from "./matchup.types";

export type QuizContextType = { 
    quizData: Matchup[];
    questionIndex: number;
    setQuestionIndex: (idx: number)=> void;
  };