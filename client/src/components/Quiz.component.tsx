"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { Question } from "./Question.component";
import { QuizContext } from "@/context/Quiz.context";
import { QuizContextType } from "common/types/quiz.types";
import { Box, IconButton, Modal, Tooltip } from "@mui/material";
import { FinishModal } from "./FinishModal.component";
import HelpIcon from "@mui/icons-material/Help";

export const Quiz = () => {
  //Component for rendering our quiz page
  //const matchupData = await getMatchupData('malphite', 'sylas', 'top');

  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [streak, setStreak] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [openStartModal, setOpenStartModal] = useState(false);
  const [openFinishModal, setOpenFinishModal] = useState(false);
  const [isOver, setIsOver] = useState(false);
  const { fetchMatchups } = useContext(QuizContext) as QuizContextType;

  const handleAnswer = (answer: boolean) => {
    if (opacity == 1) {
      //logic for fading images in and out and moving to next question
      if (answer) {
        setScore((s) => s + 50 + streak * 10);
        setStreak((s) => s + 1);
      } else {
        setLives((s) => s - 1);
        setStreak(0);
      }
      handleQuestionTransition();
    }
  };
  const handleQuestionTransition = () => {
    setOpacity(0);
    setTimeout(() => {
      setQuestionIndex((s) => s + 1);
    }, 500);
    setTimeout(() => {
      setOpacity(1);
    }, 1000);
  };
  useEffect(() => {
    if (lives <= 0) {
      setOpenFinishModal(true);
      setIsOver(true);
    }
  }, [lives]);

  useEffect(() => {
    if (questionIndex % 10 == 8) {
      fetchMatchups();
    }
    if (questionIndex % 10 == 9) {
      setLives((s) => s + 1);
    }
  }, [questionIndex, fetchMatchups]);

  return (
    <div
      style={{ backgroundImage: "url(/srbackground.png" }}
      className="bg-cover bg-center h-screen w-screen"
    >
      <div
        style={{
          fontFamily: "math",
          position: "absolute",
          padding: "8px",
          color: "white",
        }}
      >
        Score: {score} | Lives: {lives}| Streak: {streak}
        <Tooltip title="Earn more points based on streak count and get one life back every 10 questions! Based off match win rates from Emerald rank and up">
          <IconButton sx={{ color: "white" }}>
            <HelpIcon />
          </IconButton>
        </Tooltip>
      </div>

      <Modal open={openStartModal} onClose={() => setOpenStartModal(false)}>
        <FinishModal score={score} />
      </Modal>
      <Modal open={openFinishModal} onClose={() => setOpenFinishModal(false)}>
        <FinishModal score={score} />
      </Modal>

      <Question
        questionIndex={questionIndex}
        opacity={opacity}
        onAnswerSelect={handleAnswer}
        isOver={isOver}
      ></Question>
    </div>
  );
};
