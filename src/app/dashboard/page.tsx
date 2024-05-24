"use client";

import React, { useState, useEffect } from "react";
import theme from "../../components/helpers/Theme";
import { ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Skeleton } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  fetchHeroData,
  fetchHighlightsData,
  fetchRecentData,
  fetchShowsData,
} from "@/features/dashboard/dashboardAPI";
import { unwrapResult } from "@reduxjs/toolkit";
import { AppDispatch } from "@/store";
import {
  HeroContent,
  HighlightContent,
  RecentContent,
  ShowContent,
} from "@/shared/interfaces/interfaces";

const Page: React.FC = () => {
  const [heroData, setHeroData] = useState<HeroContent[]>([]);
  const [recentUpload, setRecentUpload] = useState<RecentContent[]>([]);
  const [shows, setShows] = useState<ShowContent[]>([]);
  const [highlights, setHighlights] = useState<HighlightContent[]>([]);
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
    const fetchDashboardData = async () => {
      try {
        const heroData = await dispatch(fetchHeroData()).then(unwrapResult);
        const recentData = await dispatch(fetchRecentData()).then(unwrapResult);
        const highlightData = await dispatch(fetchHighlightsData()).then(
          unwrapResult
        );
        const showData = await dispatch(fetchShowsData()).then(unwrapResult);
        setHeroData(heroData);
        setRecentUpload(recentData);
        setHighlights(highlightData);
        setShows(showData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching media data:", error);
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={styles.container}>
        <Modal open={openModal} onClose={handleCloseModal} sx={styles.modal}>
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
        <Box sx={styles.hero}>
          <Box sx={styles.heroItem}>
            {!isLoading && heroData.length > 0 ? (
              <Carousel
                infiniteLoop
                autoPlay
                interval={5000}
                showThumbs={false}
                showStatus={false}
              >
                {(heroData || [])
                  .slice(0, 4)
                  .map((data: HeroContent, index) => {
                    return (
                      <Card key={index}>
                        <Box
                          style={{ cursor: "pointer" }}
                          onClick={() => handleOpenModal(data.heroVideoURL)}
                        >
                          <img
                            src={data.heroImageURL}
                            alt={`Slide ${index + 1}`}
                            style={{ cursor: "pointer" }}
                          />
                          <Button sx={styles.btn}>Watch Now</Button>
                        </Box>
                      </Card>
                    );
                  })}
              </Carousel>
            ) : (
              <Skeleton variant="rounded" height={"100%"} />
            )}
          </Box>
          <Box sx={styles.heroItem}>
            {!isLoading && heroData.length > 0 ? (
              <Carousel
                infiniteLoop
                autoPlay
                interval={5000}
                showThumbs={false}
                showStatus={false}
              >
                {(heroData || [])
                  .slice(0, 4)
                  .map((data: HeroContent, index: number) => (
                    <Card key={index}>
                      <Box
                        style={{ cursor: "pointer" }}
                        onClick={() => handleOpenModal(data.heroVideoURL)}
                      >
                        <img
                          src={data.heroImageURL}
                          alt={`Slide ${index + 1}`}
                          style={{ cursor: "pointer" }}
                        />
                        <Button sx={styles.btn}>Watch Now</Button>
                      </Box>
                    </Card>
                  ))}
              </Carousel>
            ) : (
              <Skeleton variant="rounded" height={"100%"} />
            )}
          </Box>
        </Box>
        {/* Buttom Grid*/}
        <Box sx={styles.bottomContainer}>
          <Box>
            <Typography variant="h5">Recently Added</Typography>
            <Grid sx={styles.rowWrapper}>
              {isLoading ? (
                <CardSkeleton />
              ) : (
                (recentUpload || [])
                  .slice(0, 4)
                  .map((data: RecentContent, index: number) => (
                    <Card key={index} sx={styles.cards}>
                      <Box
                        style={{ cursor: "pointer" }}
                        onClick={() => handleOpenModal(data.recentVideoURL)}
                      >
                        <img
                          className="coverArt"
                          src={data.recentImageURL}
                          alt={`cover Art ${index + 1}`}
                        />
                        <Typography
                          style={{ cursor: "pointer" }}
                          variant="h6"
                          sx={styles.title}
                        >
                          {data.recentContentTitle}
                        </Typography>
                      </Box>
                    </Card>
                  ))
              )}
            </Grid>
          </Box>
          <Box sx={styles.section}>
            <Typography variant="h5">Highlights</Typography>
            <Box sx={styles.rowWrapper}>
              {isLoading ? (
                <CardSkeleton />
              ) : (
                (highlights || [])
                  .slice(0, 4)
                  .map((data: HighlightContent, index: number) => {
                    return (
                      <Card key={index} sx={styles.cards}>
                        <Box
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            handleOpenModal(data.highlightVideoURL)
                          }
                        >
                          <img
                            className="coverArt"
                            src={data.highlightImageURL}
                            alt={`cover Art ${index + 1}`}
                            style={{ cursor: "pointer" }}
                          />
                          <Typography
                            style={{ cursor: "pointer" }}
                            variant="h6"
                            sx={styles.title}
                          >
                            {data.highlightContentTitle}
                          </Typography>
                        </Box>
                      </Card>
                    );
                  })
              )}
            </Box>
          </Box>
          <Box sx={styles.section}>
            <Typography variant="h5">Shows</Typography>
            <Box sx={styles.rowWrapper}>
              {isLoading ? (
                <CardSkeleton />
              ) : (
                (shows || [])
                  .slice(0, 4)
                  .map((data: ShowContent, index: number) => (
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
                        <Typography
                          style={{ cursor: "pointer" }}
                          variant="h6"
                          sx={styles.title}
                        >
                          {data.showContentTitle}
                        </Typography>
                      </Box>
                    </Card>
                  ))
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

const CardSkeleton = () =>
  [1, 2, 3, 4].map((i) => (
    <Card key={i} sx={styles.cards}>
      <Box style={{ cursor: "pointer" }}>
        <Skeleton key={i} variant="rounded" height={200} width={"100%"} />
      </Box>
    </Card>
  ));

export default Page;

/** @type {import("@mui/material").SxProps} */
const styles = {
  container: {
    position: "relative",
    height: "auto",
    width: "100%",
    [theme.breakpoints.down("laptop")]: {
      width: "100%",
    },
  },
  hero: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "auto",
    height: "auto",
    gap: 4,
    [theme.breakpoints.down("laptop")]: {
      flexDirection: "column",
    },
  },
  heroItem: {
    width: "50%",
    height: "35vh",
    borderRadius: "10px",
    boxShadow: "1px 1px 6px var(--shadow)",
    overflow: "hidden",
    [theme.breakpoints.down("laptop")]: {
      width: "100%",
      height: "23vh",
    },
  },
  btn: {
    position: "absolute",
    top: 0,
    right: 0,
    background:
      "linear-gradient(300deg, var(--primary-color-light), var(--green)) !important",
    opacity: "95%",
    borderRadius: "10px",
    boxShadow: "2px 2px 8px var(--primary-color-light)",
    p: "1rem",
    m: "1rem 1rem 0 0",
    cursor: "pointer",
    color: "var(--white)",
    "&:hover": {
      transform: "scale(1.1)",
      transition: "all 0.6s ease-in-out",
    },
  },
  bottomContainer: {
    mt: 2,
  },
  section: {
    py: 2,
  },
  rowWrapper: {
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
  modal: {},
  modalContent: {
    position: "absolute",
    width: "80%",
    height: "80%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    outline: "none",
    [theme.breakpoints.down("laptop")]: {
      width: "100%",
      height: "35%",
    },
  },
  title: {
    position: "absolute",
    bottom: 0,
    left: 0,
    p: "1rem 1rem",
    bgcolor: "var(--secondary-overlay)",
    color: "var(--white)",
    width: "100%",
    lineHeight: "1.5rem",
    fontWeight: "400",
    textTransform: "capitalize",
    textShadow: "2px 2px 2px rgba(7, 5, 28, 0.6)",
  },
};
