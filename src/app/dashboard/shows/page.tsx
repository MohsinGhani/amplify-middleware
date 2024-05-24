"use client";

import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Modal from "@mui/material/Modal";

import theme from "../../../components/helpers/Theme";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { fetchShowsData } from "@/features/dashboard/dashboardAPI";
import { unwrapResult } from "@reduxjs/toolkit";
import { Skeleton } from "@mui/material";
import { ShowContent } from "@/shared/interfaces/interfaces";

const Shows: React.FC = () => {
  const [shows, setShows] = useState<ShowContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [modalLink, setModalLink] = useState("");

  const dispatch: AppDispatch = useDispatch();

  const handleOpenModal = (link: any) => {
    setOpenModal(true);
    setModalLink(link);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalLink("");
  };

  useEffect(() => {
    const fetchShowsList = async () => {
      try {
        const showData = await dispatch(fetchShowsData()).then(unwrapResult);

        setShows(showData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching media data:", error);
        setIsLoading(false);
      }
    };
    fetchShowsList();
  }, []);

  return (
    <Box sx={styles.section}>
      <Typography sx={{ fontWeight: "500" }} variant="h5">
        Shows
      </Typography>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={styles.modalContent}>
          {modalLink && (
            <iframe
              src={modalLink}
              title="Stream"
              width="100%"
              height="100%"
              allowFullScreen
            />
          )}
        </Box>
      </Modal>
      <Box sx={styles.wrapper}>
        {!isLoading ? (
          (shows || []).map((data: ShowContent, index: number) => (
            <Card key={index} sx={styles.cards}>
              <Box
                style={{ cursor: "pointer" }}
                onClick={() => handleOpenModal(data.showVideoURL)}
              >
                <img
                  className="coverArt"
                  src={data.showImageURL}
                  alt={`cover Art ${index + 1}`}
                  style={{ cursor: "pointer" }}
                />
                <Typography variant="h6" sx={styles.title}>
                  {data.showContentTitle}
                </Typography>
              </Box>
            </Card>
          ))
        ) : (
          <CardSkeleton />
        )}
      </Box>
    </Box>
  );
};

const CardSkeleton = () =>
  [1, 2, 3, 4].map((i) => (
    <Card key={i} sx={styles.cards}>
      <Box style={{ cursor: "pointer" }}>
        <Skeleton variant="rounded" width={"100%"} height={150} />
      </Box>
    </Card>
  ));

export default Shows;

/** @type {import("@mui/material").SxProps} */
const styles = {
  section: {
    py: 2,
    width: "100%",
  },
  wrapper: {
    mt: 2,
    display: "grid",
    gridTemplateColumns: "repeat(4, 2fr)",
    width: "100%",
    gap: 2,
    [theme.breakpoints.down("laptop")]: {
      gridTemplateColumns: "2fr",
    },
  },
  cards: {
    position: "relative",
    borderRadius: "10px",
    maxHeight: "10rem",
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
  title: {
    position: "absolute",
    bottom: 0,
    left: 0,
    p: "1rem 1rem",
    color: "var(--white)",
    bgcolor: "var(--secondary-overlay)",
    width: "100%",
    lineHeight: "1.5rem",
    fontWeight: "400",
    textTransform: "capitalize",
    textShadow: "2px 2px 2px rgba(7, 5, 28, 0.6)",
  },
};
