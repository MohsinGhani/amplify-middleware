"use client";

import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Input from "@mui/material/Input";
import SearchIcon from "@mui/icons-material/Search";

import theme from "../../../components/helpers/Theme";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { fetchHeroData } from "@/features/dashboard/dashboardAPI";
import { HeroContent } from "@/shared/interfaces/interfaces";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState<HeroContent[]>([]);
  const [loading, setLoading] = useState(false);
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
    fetchData(searchInput);
  }, [searchInput]);

  const fetchData = async (value: string) => {
    try {
      setLoading(true);
      const content = await dispatch(fetchHeroData()).then(unwrapResult);

      const filteredResults = content.filter((item: HeroContent) => {
        const lowerCaseValue = value.toLowerCase();
        return (
          item.contentTitle?.toLowerCase().includes(lowerCaseValue) ||
          item.category?.toLowerCase().includes(lowerCaseValue) ||
          item.subCategory?.toLowerCase().includes(lowerCaseValue)
        );
      });

      setResults(filteredResults);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <Box sx={styles.mainwrapper}>
      <Box sx={styles.searchWrapper}>
        <Box sx={styles.inputwrapper}>
          <SearchIcon sx={{ fill: "var(--black)" }} />
          <Input
            placeholder="Type to search content..."
            sx={styles.input}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </Box>
        <Box sx={styles.contentwrapper}>
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
          {searchInput === "" ? (
            <Typography sx={styles.instruction} variant="h5">
              Search content with "key words", "content title" or "category"
            </Typography>
          ) : loading ? (
            <CircularProgress />
          ) : (
            <Box sx={styles.layout}>
              {(results || []).map((result: HeroContent, index: number) => (
                <Card key={index} sx={styles.cards}>
                  <Box
                    style={{ cursor: "pointer" }}
                    onClick={() => handleOpenModal(result.videoUrl)}
                  >
                    <img
                      className="coverArt"
                      src={result.imageUrl}
                      alt={`cover Art ${index + 1}`}
                      style={{ cursor: "pointer" }}
                    />
                    <Typography
                      style={{ cursor: "pointer" }}
                      variant="h6"
                      sx={styles.title}
                    >
                      {result.contentTitle}
                    </Typography>
                  </Box>
                </Card>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SearchBar;

/** @type {import("@mui/material").SxProps} */
const styles = {
  mainwrapper: {
    pt: "2rem",
    width: "100vw",
  },
  searchWrapper: {
    pt: "1rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  inputwrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    bgcolor: "white",
    width: "40%",
    borderRadius: "10px",
    height: "2.5rem",
    px: "1rem",
    boxShadow: "0px 0px 6px var(--white)",
    [theme.breakpoints.down("laptop")]: {
      width: "80%",
    },
  },
  input: {
    width: "100%",
    height: "100%",
    outline: "none",
    color: "var(--black)",
  },
  contentwrapper: {
    py: 2,
  },
  layout: {
    mt: 2,
    display: "grid",
    gridTemplateColumns: "repeat(4, 2fr)",
    width: "100%",
    gap: 2,
  },
  instruction: {
    pt: "3rem",
    [theme.breakpoints.down("laptop")]: {
      fontSize: "1rem",
      textAlign: "center",
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
    bgcolor: "rgba(0, 208, 255, 0.537)",
    width: "100%",
    lineHeight: "1.5rem",
    fontWeight: "400",
    textTransform: "capitalize",
    textShadow: "2px 2px 2px rgba(7, 5, 28, 0.6)",
  },
};
