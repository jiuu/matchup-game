import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export const FinishModal = ({ score }: { score: number }) => {
  let tomorrow = new Date();
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
  });

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: 200,
    boxShadow: 24,
    bgcolor: "slategrey",
    opacity: 0.9,
    p: "2rem 3rem",
    borderRadius: 4,
  };

  return (
    <div>
      <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Finished!
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Your final score is {score}. Check back in {hours}:{minutes}:{seconds}{" "}
          for a new daily quiz!
        </Typography>
      </Box>
    </div>
  );
};
