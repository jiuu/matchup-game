import { Box, Button, Typography } from "@mui/material";

export const StartModal = ({
  handleHide,
  handleClose,
}: {
  handleHide: () => void;
  handleClose: () => void;
}) => {
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: "auto",
    width: 700,
    boxShadow: 24,

    bgcolor: "slategrey",
    opacity: 0.9,
    p: "2rem 3rem ",
    borderRadius: 4,
  };

  return (
    <div>
      <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Ready to test your matchup knowledge?
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Click on the champion who you think has a winning matchup! For
          simplicity{"'"}s sake, we consider a champion to win a matchup if they
          have a notably high {"(>54%)"} winrate when matched up against each
          other in the indicated role. Data is based off matches from all
          regions, Emerald rank and up.
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            size="small"
            disableTouchRipple
            onClick={() => {
              handleClose();
            }}
            sx={{ color: "white", mr: "1rem" }}
          >
            Close
          </Button>
          <Button
            size="small"
            disableTouchRipple
            onClick={() => {
              handleHide();
            }}
            sx={{ color: "white" }}
          >
            Do not show again
          </Button>
        </Box>
      </Box>
    </div>
  );
};
