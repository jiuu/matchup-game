import Matchup from "common/types/matchup.types";

export type QuizContextType = { 
    quizData: Matchup[];
    fetchMatchups: () => void;

  };