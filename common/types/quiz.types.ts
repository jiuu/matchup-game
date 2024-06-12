import Matchup from "./matchup.types";

export type QuizContextType = { 
    quizData: Matchup[];
    fetchMatchups: () => void;

  };