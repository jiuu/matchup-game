'use client'

import Matchup from "@/types/matchup.types";
import getMatchupData from "@/utils/scrape";
import { NextPage } from "next";
import { useRef, useState } from "react";
import Image from 'next/image'
import {CSSTransition, TransitionGroup} from "react-transition-group";



export const Quiz = ({data}: {data:Matchup[]}) => {
  //const matchupData = await getMatchupData('malphite', 'sylas', 'top');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [opacity, setOpacity] = useState(1)
  const handleAnswer = (answer: boolean) => {
    if (opacity == 1) {
      if (answer) {
        setScore(score + 1)
      }
  
      
      if (questionIndex < data.length - 1) {
        setOpacity(0);
        setTimeout(() => {
          setQuestionIndex(questionIndex + 1)
          setOpacity(1);
        },500)
      } else {
        console.log('done')
      }
    }
   
  }

  return (
    <div style={{backgroundImage: 'url(/srbackground.png'}} className="bg-cover bg-center h-screen w-screen">
      <div style={{ fontFamily: "math", position: "absolute"}}>Score: {score}</div>
      <Question
        data = {data[questionIndex]}
        opacity = {opacity}
        onAnswerSelect = {handleAnswer}
      ></Question>
    </div>
  )

 
  
}

const Question  = ({ data, opacity, onAnswerSelect} : {data:Matchup, opacity:number, onAnswerSelect: (answer: boolean) => void} ) => {
  const handleClick = (val: number) => {
    val > 50 ? onAnswerSelect(true) : onAnswerSelect(false)

  }

  return ( //format received matchup data into quiz, can divide page up in half with each champion portrait
  <div className="flex flex-col items-center justify-between h-screen w-screen">
      <Image 
        onClick={() => handleClick(data.winRate)} 
        src={`/champions/${data.myChamp}_0.jpg`} 
        width={200} 
        height={500} 
        alt="My Champion" 
        style={{opacity:opacity}} 
        className={`mt-16 transition-opacity duration-500 ease-out `}>
      </Image>
      <Image 
        onClick ={() => handleClick(100 - data.winRate)} src={`/champions/${data.enemyChamp}_0.jpg`} 
        width={200} 
        height={500} 
        alt="Enemy Champion" 
        style={{opacity:opacity}} 
        className={`mb-16 transition-opacity duration-500 ease-out `}>
      </Image>

    </div>
   
  )
}