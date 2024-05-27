'use client'

import Matchup from "@/types/matchup.types";
import { useContext, useRef, useState } from "react";
import { Question } from "./question.component";
import { QuizContext } from "@/context/quiz.context";
import { QuizContextType } from "@/types/quiz.types";



export const Quiz = () => { //Component for rendering our quiz page
  //const matchupData = await getMatchupData('malphite', 'sylas', 'top');
  const {quizData, questionIndex, setQuestionIndex} = useContext(QuizContext) as QuizContextType
  const [score, setScore] = useState(0);
  const [opacity, setOpacity] = useState(1)
  const handleAnswer = (answer: boolean) => {
    if (opacity == 1) { //logic for fading images in and out and moving to next question
      if (questionIndex < quizData.length - 1) {
        if (answer) {
          setScore(score + 1)
        }
        setOpacity(0);
        setTimeout(() => {
          setQuestionIndex(questionIndex + 1)
          setOpacity(1);
        },500)
      } else {
        console.log('done') //quiz is over
      }
    }
   
  }

  return (
    <div style={{backgroundImage: 'url(/srbackground.png'}} className="bg-cover bg-center h-screen w-screen">
      <div style={{ fontFamily: "math", position: "absolute"}}>Score: {score}</div>
      <Question
        data = {quizData[questionIndex]}
        opacity = {opacity}
        onAnswerSelect = {handleAnswer}
      ></Question>
    </div>
  )

 
  
}

