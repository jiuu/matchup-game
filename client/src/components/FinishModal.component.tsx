import { QuizContext } from "@/context/Quiz.context";
import { QuizContextType } from "@/utils/quiz.types";
import { Box, Button, Pagination, Typography } from "@mui/material";
import Image from "next/image";
import { useContext, useState } from "react";

export const FinishModal = ({
  score,
  answers,
}: {
  score: number;
  answers: boolean[];
}) => {
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    boxShadow: 24,
    bgcolor: "slategrey",
    opacity: 0.9,
    p: "1.5rem 3rem",
    mx: { xs: "0rem", md: "auto" },
    borderRadius: 4,
    width: { xs: "100%", md: "60%" },
  };
  const typoStyle = { mb: 2, textAlign: "center", fontSize: "1.25rem" };

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
  const [page, setPage] = useState(1);
  const { quizData } = useContext(QuizContext) as QuizContextType;
  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  let results = answers.map((value, index) => {
    return {
      myChamp:
        quizData[index].myChamp?.charAt(0).toUpperCase() +
        quizData[index].myChamp?.slice(1),
      enemyChamp:
        quizData[index].enemyChamp?.charAt(0).toUpperCase() +
        quizData[index].enemyChamp?.slice(1),
      role: quizData[index].role,
      numOfGames: quizData[index].numOfGames,
      winRate: quizData[index].winRate,
      correct: value,
    };
  });
  let paginatedData = results.slice((page - 1) * 5, page * 5);
  return (
    <div>
      <Box sx={modalStyle}>
        <Image
          src={`/rank/${rank}.svg`}
          alt={"Rank"}
          width={50}
          height={50}
          className="mx-auto mb-6"
        ></Image>
        {/* <Typography id="modal-modal-title" variant="h6" component="h2">
          Finished!
        </Typography> */}
        <Typography id="modal-modal-description" variant="h6" sx={typoStyle}>
          Score: {score}
        </Typography>
        <table className="mx-auto">
          <thead>
            <tr>
              <th className="text-left pr-10">Your Champ</th>
              <th className="text-left pr-10">Enemy Champ</th>
              <th className="text-left pr-10">Win Rate</th>
              <th className="text-left pr-10">Role</th>
              <th className="text-left pr-10">Answer</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((data, index) => (
              <tr key={index}>
                <td>{data?.myChamp}</td>
                <td>{data?.enemyChamp}</td>
                <td>{100 - (data?.winRate as number) + "%"}</td>
                <td>{data?.role}</td>
                <td>{data?.correct ? "✅" : "❌"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          count={Math.ceil(answers.length / 5)}
          page={page}
          onChange={handleChangePage}
          sx={{
            "& .MuiPaginationItem-root": {
              color: "white",
              marginTop: "8px",
            },
          }}
        />
        <Box className="flex justify-end">
          <Button
            //className="text-white mr-4"
            //size="small"
            disableTouchRipple
            onClick={() => {
              window.location.reload();
            }}
            sx={{ color: "white", mr: "1rem" }}
          >
            Try again
          </Button>
        </Box>
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
