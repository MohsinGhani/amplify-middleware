import React from "react";
import { useSnackbar } from "@/context/SnackbarContext";
import { downloadFile } from "@/shared/helper/s3Services";
import { Box, Button, SxProps, Theme } from "@mui/material";

const DownloadBtn = () => {
  const { showMessage } = useSnackbar();
  const handleDownloadForm = async () => {
    try {
      await downloadFile(
        "forms/content-form.pdf",
        "content-submission-form.pdf"
      );
    } catch (err) {
      showMessage(err, "error");
    }
  };
  return (
    <Box sx={styles.btn}>
      <Button
        onClick={handleDownloadForm}
        sx={{
          borderRadius: "5px",
          p: 2,
          color: "var(--white)",
          background:
            "linear-gradient(45deg, var(--secondary-color-dark), var(--grad-bg-light))",
          transition: "all 0.5s ease-in-out",
          "&:hover": {
            background:
              "linear-gradient(-300deg, var(--primary-color-light), rgb(0, 221, 11))",
            borderRadius: "10px",
            transform: "scale(1.05)",
          },
        }}
        component="span"
      >
        Download Submission Form
      </Button>
    </Box>
  );
};

export default DownloadBtn;

/** @type {import("@mui/material").SxProps} */
const styles: { [key: string]: SxProps<Theme> } = {
  btn: {
    display: "flex",
    justifyContent: "center",
    p: "2rem 0 4rem 0",
  },
};
