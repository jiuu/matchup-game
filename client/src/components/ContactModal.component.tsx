import { Box, Button, Link, Typography } from "@mui/material";

export const ContactModal = ({ handleClose }: { handleClose: () => void }) => {
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "100%", sm: "40%" },
    mx: { xs: "0rem", sm: "auto" },

    boxShadow: 24,

    bgcolor: "slategrey",
    opacity: 0.9,
    p: "2rem 3rem ",
    borderRadius: 4,
  };
  console.log("hey");

  return (
    <div>
      <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          About
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <Box sx={{ mb: 2 }}>
            Thanks for checking out my project! If you have any suggestions,
            inquiries, <span className="text-[8px]">or job offers 🙃,</span>{" "}
            please shoot me an email at alexjwpak@gmail.com.
          </Box>

          <Box>
            Counterpick.me was created under Riot Game&apos;s &quot;
            <Link href="https://www.riotgames.com/en/legal">
              Legal Jibber Jabber
            </Link>
            &quot; policy using assets owned by Riot Games. Riot Games does not
            endorse or sponsor this project.
          </Box>
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
            sx={{
              color: "white",
            }}
          >
            Close
          </Button>
        </Box>
      </Box>
    </div>
  );
};
