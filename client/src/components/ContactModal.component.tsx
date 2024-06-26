import { Box, Button, Typography } from "@mui/material";

export const ContactModal = ({
  handleClose,
}: {
  handleClose: () => void;
}) => {
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width:{xs: "100%", sm:"40%"},
    mx: {xs: '0rem', sm:"auto"},

    boxShadow: 24,

    bgcolor: "slategrey",
    opacity: 0.9,
    p: "2rem 3rem ",
    borderRadius: 4,
  };
  console.log('hey')

  return (
    <div>
      <Box sx={modalStyle}>
        
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Thanks for checking out my project! If you have any suggestions or inquiries, please shoot me an email at ___. Counterpick.me was created under Riot Games' "Legal Jibber Jabber" policy using assets owned by Riot Games.  Riot Games does not endorse or sponsor this project.
        </Typography>
        <Box
          sx={{
            
          }}
        >
          <Button
            size="small"
            disableTouchRipple
            onClick={() => {
              handleClose();
            }}
            sx={{ color: "white", mr: "1rem",display: "flex",
            justifyContent: "flex-end", }}
          >
            Close
          </Button>
          
        </Box>
      </Box>
    </div>
  );
};
