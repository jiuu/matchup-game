'use client'

import Matchup from "@/types/matchup.types";
import { useContext, useRef, useState } from "react";
import { Question } from "./Question.component";
import { QuizContext } from "@/context/Quiz.context";
import { QuizContextType } from "@/types/quiz.types";
import { Box, IconButton, Modal, Tooltip } from "@mui/material";
import { FinishModal } from "./FinishModal.component";
import HelpIcon from '@mui/icons-material/Help';




export const Quiz = () => { //Component for rendering our quiz page
  //const matchupData = await getMatchupData('malphite', 'sylas', 'top');
  const {quizData, questionIndex, setQuestionIndex} = useContext(QuizContext) as QuizContextType
  const [score, setScore] = useState(0);
  const [opacity, setOpacity] = useState(1)
  const [openModal, setOpenModal] = useState(false);

  const handleAnswer = (answer: boolean) => {
    if (opacity == 1) { //logic for fading images in and out and moving to next question
      if (answer) {
        setScore(score + 1)
      }
      if (questionIndex < quizData.length - 1) {
        setOpacity(0);
        setTimeout(() => {
          setQuestionIndex(questionIndex + 1)
          setOpacity(1);
        },500)
      } else {
        setOpenModal(true)
      }
    
    }
   
  }

  return (
    <div style={{backgroundImage: 'url(/srbackground.png'}} className="bg-cover bg-center h-screen w-screen">
      <div style={{ fontFamily: "math", position: "absolute"}}>Score: {score} 
        <Tooltip title="Based off">
          <IconButton>
            <HelpIcon />
          </IconButton>
        </Tooltip>
      </div>

      <Modal
        open={openModal}
        onClose={()=>setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <FinishModal score={score}/>
      </Modal>
      <Question
        data = {quizData[questionIndex]}
        opacity = {opacity}
        onAnswerSelect = {handleAnswer}
      ></Question>
    </div>
  )

 
  
}

