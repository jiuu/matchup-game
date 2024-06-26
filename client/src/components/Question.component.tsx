"use client";

import Matchup from "common/types/matchup.types";
import { Box, Button, ButtonBase, IconButton, Skeleton } from "@mui/material";
import Image from "next/image";
import { useContext } from "react";
import { QuizContextType } from "@/utils/quiz.types";
import { QuizContext } from "@/context/Quiz.context";

export const Question = ({
  questionIndex,
  imageOpacity,
  onAnswerSelect,
  isOver,
}: {
  questionIndex: number;
  imageOpacity: number;
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
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      {quizData?.length ? (
        <Button
          onClick={() => handleClick(data.winRate || 0)}
          disableRipple
          disabled={isOver}
          sx={{ mt: 8, boxShadow: "none" }}
          className={` h-2/5 w-auto `}

        >
          <Image
            src={`/champions/${data?.myChamp}_0.jpg`}
            width={0}
            height={0}
            alt={data?.myChamp || "My Champion"}
            style={{ opacity: imageOpacity  }}
            sizes="100vw"

            className={`transition-opacity duration-500 ease-out h-full w-full  `}
          ></Image>
        </Button>
      ) : (
        <Skeleton
          variant="rectangular"
          width={"22vh"}
          height={"40%"}
          sx={{ margin: 1, mt: 8}}

        />
      )}

      {quizData?.length ? (
        <Image
          src={`/roles/${data?.role}.png`}
          width={30}
          height={30}
          alt={data?.role || "Role"}
          style={{ opacity: imageOpacity }}
          objectPosition="absolute"
          
          className={`transition-opacity duration-500 ease-out mx-4 my-4`}
        />
      ) : (
        <Skeleton
          variant="rectangular"
          width={'30px'}
          height={'30px'}
          className={"my-4 flex-none"}
        />
      )}

      { quizData?.length? (
        <Button
          onClick={() => handleClick(100 - (data.winRate || 0))}
          disableRipple
          disabled={isOver}
          sx={{ mb: 8 }}
          className={` h-2/5 w-auto `}
        >
          <Image
            src={`/champions/${data?.enemyChamp}_0.jpg`}
            width={0}
            height={0}
            alt={data?.enemyChamp || "Enemy Champion"}
            sizes="100vw"
            style={{ opacity: imageOpacity  }}
            
            className={` transition-opacity duration-500 ease-out h-full w-auto`}
          ></Image>
        </Button>
      ) : (
        <Skeleton
          variant="rectangular"
          width={"22vh"}
          height={"40%"}
          sx={{ margin: 1, mb: 8 }}

          
        />
      )}
    </div>
  );
};
