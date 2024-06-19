import { Box, Typography } from "@mui/material";

export const StartModal = () => {
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: 200,
    width: 700,
    boxShadow: 24,
    bgcolor: "dimgrey",
    opacity: 0.9,
    p: "2rem 3rem",
    borderRadius: 4,
  };

  return (
    <div>
      <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Ready to test your matchup knowledge?
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Click on the champion who you think has a winning matchup! We consider
          a champion to win a matchup if they have a positive winrate when
          matched up against each other in the indicated role.
        </Typography>
      </Box>
    </div>
  );
};
