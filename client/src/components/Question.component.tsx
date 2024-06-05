'use client'

import Matchup from "@/types/matchup.types"
import Image from 'next/image'

export const Question  = ({ data, opacity, onAnswerSelect} : {data:Matchup, opacity:number, onAnswerSelect: (answer: boolean) => void} ) => { //Component for rendering this Quiz items for our quiz
    const handleClick = (val: number) => {
      val > 50 ? onAnswerSelect(true) : onAnswerSelect(false)
      console.log(data)

    }

  
    return ( //format received matchup data into quiz, can divide page up in half with each champion portrait
    <div className="flex flex-col items-center justify-between h-screen w-screen">

        <Image 
          onClick={() => handleClick(data.winRate || 0)} 
          src={`/champions/${data.myChamp}_0.jpg`} 
          width={200} 
          height={500} 
          alt="My Champion" 
          style={{opacity:opacity}} 
          className={`mt-16 transition-opacity duration-500 ease-out `}>
        </Image>
        <Image 
          onClick ={() => handleClick(100 - (data.winRate || 0))} src={`/champions/${data.enemyChamp}_0.jpg`} 
          width={200} 
          height={500} 
          alt="Enemy Champion" 
          style={{opacity:opacity}} 
          className={`mb-16 transition-opacity duration-500 ease-out `}>
        </Image>
  
      </div>
     
    )
  }