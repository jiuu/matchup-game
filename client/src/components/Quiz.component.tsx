"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { Question } from "./Question.component";
import { QuizContext } from "@/context/Quiz.context";
import { QuizContextType } from "@/utils/quiz.types";
import { Box, IconButton, Modal, Tooltip } from "@mui/material";
import { FinishModal } from "./FinishModal.component";
import { StartModal } from "./StartModal.component";
import { useScore } from "@/hooks/useScore";
import HelpIcon from "@mui/icons-material/Help";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";

export const Quiz = () => {
  //Component for rendering our quiz page
  //const matchupData = await getMatchupData('malphite', 'sylas', 'top');

  const [questionIndex, setQuestionIndex] = useState<number>(0); //possibly unnecessary as can derive ques index from answers state, but keeping it in for readability
  const [lives, setLives] = useState<number>(5);
  const [imageOpacity, setImageOpacity] = useState<number>(1);
  const [lifeRed, setLifeRed] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<number>(0); //0 for close, 1 for Start, 2 for Finish
  const [isOver, setIsOver] = useState<boolean>(false);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const { fetchMatchups } = useContext(QuizContext) as QuizContextType;

  const { score, streak, mute, handleCorrectAnswer, resetStreak, toggleMute } =
    useScore();
  const handleHide = () => {
    setOpenModal(0);
    localStorage.setItem("hide", "true");
  };
  const handleAnswer = (answer: boolean) => {
    if (imageOpacity == 1) {
      //handle answer only when transition is not happening
      setAnswers([...answers, answer]);
      if (answer) {
        handleCorrectAnswer();
      } else {
        setLives((s) => s - 1);
        resetStreak();
        handleColorTransition();
      }
      handleQuestionTransition();
    }
  };
  const handleColorTransition = () => {
    setLifeRed(true);
    setTimeout(() => {
      setLifeRed(false);
    }, 200);
  };
  const handleQuestionTransition = () => {
    //note: we have separate states for info and image opacity as we want their opacities to change at different moments.
    //For example, having the info opacity change too late would give the next answer away
    setImageOpacity(0);

    setTimeout(() => {
      setQuestionIndex((s) => s + 1);
    }, 500);
    setTimeout(() => {
      setImageOpacity(1);
    }, 1000);
  };

  useEffect(() => {
    if (lives <= 0) {
      setOpenModal(2);
      setIsOver(true);
    }
  }, [lives]);

  useEffect(() => {
    if (questionIndex % 10 == 8) {
      fetchMatchups();
    }
    /*if (questionIndex % 10 == 9) {
      setLives((s) => s + 1);
    }*/
  }, [questionIndex, fetchMatchups]);
  useEffect(() => {
    setOpenModal(localStorage?.getItem("hide") === "true" ? 0 : 1);
  }, []);

  return (
    <div
      style={{ backgroundImage: "url(/srbackground.png" }}
      className="bg-cover bg-center h-screen w-screen"
    >
      <Box
        sx={{
          fontFamily: "math",
        }}
        className={"flex p-2 absolute"}
      >
        <Box
          className={`flex pr-2 items-center transition-color duration-200 ease-out ${
            lifeRed ? "text-red-700" : "text-white"
          } `}
        >
          Score: {score} | Lives: {lives} | Streak: {streak}
        </Box>
        <Tooltip title="Earn more points based on streak count! Based off global match data from Emerald rank and up">
          <IconButton sx={{ color: "white" }} onClick={() => setOpenModal(1)}>
            <HelpIcon />
          </IconButton>
        </Tooltip>
        {mute ? (
          <IconButton sx={{ color: "white" }} onClick={() => toggleMute()}>
            <VolumeOffIcon />
          </IconButton>
        ) : (
          <IconButton sx={{ color: "white" }} onClick={() => toggleMute()}>
            <VolumeUpIcon />
          </IconButton>
        )}
      </Box>

      <Modal open={openModal == 1} onClose={() => setOpenModal(0)}>
        <StartModal handleClick={handleHide} />
      </Modal>
      <Modal open={openModal == 2} onClose={() => setOpenModal(0)}>
        <FinishModal score={score} answers={answers} />
      </Modal>

      <Question
        questionIndex={questionIndex}
        imageOpacity={imageOpacity}
        onAnswerSelect={handleAnswer}
        isOver={isOver}
      ></Question>
    </div>
  );
};
