import { QuizContext } from "@/context/Quiz.context";
import { QuizContextType } from "@/utils/quiz.types";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useContext } from "react";

export const FinishModal = ({ score }: { score: number }) => {
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: 180,
    boxShadow: 24,
    bgcolor: "slategrey",
    opacity: 0.9,
    p: "1.5rem 3rem",
    borderRadius: 4,
  };

  const interval = 250;
  let rank = "bronze";
  if (score < interval) {
    rank = "bronze";
  } else if (score < interval * 2) {
    rank = "silver";
  } else if (score < interval * 3) {
    rank = "gold";
  } else if (score < interval * 4) {
    rank = "platinum";
  } else if (score < interval * 5) {
    rank = "diamond";
  } else if (score < interval * 6) {
    rank = "master";
  } else if (score < interval * 7) {
    rank = "grandmaster";
  } else {
    rank = "challenger";
  }

  const { quizData } = useContext(QuizContext) as QuizContextType;
  console.log(quizData);

  return (
    <div>
      <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Finished!
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Your final score is {score}.
        </Typography>

        <Image
          src={`/rank/${rank}.svg`}
          alt={"Rank"}
          width={50}
          height={50}
          className="mx-auto mt-6"
        ></Image>
      </Box>
    </div>
  );
};

//code for counting down to the next day. No use right now, but going to keep it commented here
/*let tomorrow = new Date();
  tomorrow.getUTCHours() >= 7
    ? tomorrow.setUTCDate(tomorrow.getUTCDate() + 1)
    : tomorrow.setUTCDate(tomorrow.getUTCDate());
  tomorrow.setUTCHours(7, 0, 0, 0);
  const [timer, setTimer] = useState((tomorrow.getTime() - Date.now()) / 1000);

  let hours = Math.floor(timer / 3600)
    .toString()
    .padStart(2, "0");
  let minutes = Math.floor((timer / 60) % 60)
    .toString()
    .padStart(2, "0");
  let seconds = Math.floor(timer % 60)
    .toString()
    .padStart(2, "0");

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      }
      if (timer === 0) {
        clearInterval(myInterval);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  }); */
