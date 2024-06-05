import { Box } from "@mui/material"
import { useEffect, useState } from "react";







export const FinishModal = ({score} : {score: number}) => {
    let tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0,0,0,0)
    const [timer, setTimer] = useState((tomorrow.getTime() - Date.now()) / 1000);

    let hours = Math.floor(timer / 3600)
    let minutes = Math.floor(timer / 60 % 60)
    let seconds = Math.floor(timer % 60)

    useEffect(() => {
        let myInterval = setInterval(() => {
            if (timer > 0) {
                setTimer(timer - 1)
            }
            if (seconds === 0) {
               clearInterval(myInterval)
            }
        }, 1000)
        return ()=> {
            clearInterval(myInterval)
        }
    })



    return (
        <div>
            <Box >
            Your final score is {score}! Check back in {hours}:{minutes}:{seconds} for a new daily quiz.
            </Box>
        </div>
        

    )

}