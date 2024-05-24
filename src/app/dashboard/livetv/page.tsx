"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import theme from "../../../components/helpers/Theme";

const LiveTV = () => {
  const usaFlyer = "https://d3t91pxhqkzcch.cloudfront.net/LiveUSA.png";
  const caribbeanFlyer =
    "https://d3t91pxhqkzcch.cloudfront.net/LiveCARIBBEAN.png";

  const [openModal, setOpenModal] = useState(false);
  const [modalLink, setModalLink] = useState("");

  const handleOpenModal = (link: any) => {
    setOpenModal(true);
    setModalLink(link);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalLink("");
  };

  return (
    <Box sx={styles.mainWrapper}>
      <Typography sx={styles.pageTitle} variant="h5">
        Live TV
      </Typography>
      <Box sx={styles.cardWrapper}>
        <Modal open={openModal} onClose={handleCloseModal}>
          <Box sx={styles.modalContent}>
            {modalLink && (
              <iframe
                src={modalLink}
                title="Live Stream"
                width="100%"
                height="100%"
                allowFullScreen
              />
            )}
          </Box>
        </Modal>
        <Box sx={styles.livetv_cards}>
          <Box
            style={{ cursor: "pointer" }}
            onClick={() =>
              handleOpenModal(
                "https://player.castr.com/live_02552ef03e6811ebb47a9ff3efb88eeb"
              )
            }
          >
            <Box
              component={"img"}
              src={usaFlyer}
              alt="usaFlyer"
              sx={styles.images}
            />
          </Box>
          <Typography sx={{ m: "1rem 0", fontWeight: "600" }} variant="h5">
            LIVE USA
          </Typography>
        </Box>
        <Box sx={styles.livetv_cards}>
          <Box
            sx={{ cursor: "pointer" }}
            onClick={() =>
              handleOpenModal(
                "https://player.castr.com/live_9b4fc280be0d11ebb99ce323d73058fb"
              )
            }
          >
            <Box
              component={"img"}
              src={caribbeanFlyer}
              alt="caribbeanLive"
              sx={styles.images}
            />
          </Box>
          <Typography
            sx={{ m: "1rem 0", fontWeight: "600", textAlign: "center" }}
            variant="h5"
          >
            LIVE CARIBBEAN
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default LiveTV;

/** @type {import("@mui/material").SxProps} */
const styles = {
  mainWrapper: {
    py: 2,
    position: "relative",
    height: "auto",
  },
  pageTitle: {
    fontWeight: "500",
    mr: "auto",
    ml: 0,
    mb: 4,
  },
  modalContent: {
    position: "absolute",
    width: "80%",
    height: "80%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    outline: "none",
  },
  cardWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    [theme.breakpoints.down("laptop")]: {
      flexDirection: "column",
    },
  },
  livetv_cards: {
    background:
      "linear-gradient(to right, var(--primary-color-light), var(--grad-color-light))",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "40%",
    margin: "0 1.5rem",
    p: "2rem",
    [theme.breakpoints.down("laptop")]: {
      width: "80%",
    },
  },
  images: {
    boxShadow: "4px 4px 12px var(--overlay)",
    width: "100%",
    borderRadius: "10px",
    transition: "all 0.8s ease-in-out",
    "&:hover": {
      transform: "scale(1.03)",
    },
  },
};
