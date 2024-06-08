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
  const [openStartModal, setOpenStartModal] = useState(true);

  const [openFinishModal, setOpenFinishModal] = useState(false);
  const [isOver , setIsOver] = useState(false);

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
        setOpenFinishModal(true)
        setIsOver(true)
      }
    
    }
   
  }

  return (
    <div style={{backgroundImage: 'url(/srbackground.png'}} className="bg-cover bg-center h-screen w-screen">
      <div style={{ fontFamily: "math", position: "absolute", padding: '8px'}}>Score: {score} 
        <Tooltip title="Based off match win rate from Emerald rank and up">
          <IconButton sx={{color:'white'}}>
            <HelpIcon />
          </IconButton>
        </Tooltip>
      </div>

      <Modal
        open={openStartModal}
        onClose={()=>setOpenStartModal(false)}

      >
        <FinishModal score={score}/>
      </Modal>
      <Modal
        open={openFinishModal}
        onClose={()=>setOpenFinishModal(false)}
      >
        <FinishModal score={score}/>
      </Modal>

      
      <Question
        data = {quizData[questionIndex]}
        opacity = {opacity}
        onAnswerSelect = {handleAnswer}
        isOver = {isOver}
      ></Question>
    </div>
  )

 
  
}

