"use client";

import Matchup from "common/types/matchup.types";
import { Button } from "@mui/material";
import Image from "next/image";
import { useContext } from "react";
import { QuizContextType } from "common/types/quiz.types";
import { QuizContext } from "@/context/Quiz.context";

export const Question = ({
  questionIndex,
  opacity,
  onAnswerSelect,
  isOver,
}: {
  questionIndex: number;
  opacity: number;
  onAnswerSelect: (answer: boolean) => void;
  isOver: boolean;
}) => {
  const { quizData } = useContext(QuizContext) as QuizContextType;
  let data = quizData[questionIndex];
  //Component for rendering this Quiz items for our quiz
  const handleClick = (val: number) => {
    val < 50 ? onAnswerSelect(true) : onAnswerSelect(false);
  };

  return (
    //format received matchup data into quiz, can divide page up in half with each champion portrait
    <div className="flex flex-col items-center justify-evenly h-screen w-screen">
      <Button
        onClick={() => handleClick(data.winRate || 0)}
        disabled={isOver}
        sx={{ mt: 8 }}
      >
        <Image
          src={`/champions/${data?.myChamp}_0.jpg`}
          width={200}
          height={500}
          alt={data?.myChamp || "My Champion"}
          style={{ opacity: opacity }}
          className={`transition-opacity duration-500 ease-out `}
        ></Image>
      </Button>
      <Button
        onClick={() => handleClick(100 - (data.winRate || 0))}
        disabled={isOver}
        sx={{ mb: 8 }}
      >
        <Image
          src={`/champions/${data?.enemyChamp}_0.jpg`}
          width={200}
          height={500}
          alt={data?.enemyChamp || "Enemy Champion"}
          style={{ opacity: opacity }}
          className={` transition-opacity duration-500 ease-out `}
        ></Image>
      </Button>
    </div>
  );
};
