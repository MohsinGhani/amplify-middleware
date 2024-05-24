"use client";

import React from "react";
import { Box, Typography, SxProps, Theme } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";

import theme from "../helpers/Theme"; // Adjust the path as needed

const TikTokIcon = ({ color = "#FFFFFF" }) => {
  return (
    <svg
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      width="54x"
      height="54px"
      style={{ transform: "scale(0.9)" }}
      className="MuiSvgIcon-root"
    >
      <path d="M41,4H9C6.243,4,4,6.243,4,9v32c0,2.757,2.243,5,5,5h32c2.757,0,5-2.243,5-5V9C46,6.243,43.757,4,41,4z M37.006,22.323 c-0.227,0.021-0.457,0.035-0.69,0.035c-2.623,0-4.928-1.349-6.269-3.388c0,5.349,0,11.435,0,11.537c0,4.709-3.818,8.527-8.527,8.527 s-8.527-3.818-8.527-8.527s3.818-8.527,8.527-8.527c0.178,0,0.352,0.016,0.527,0.027v4.202c-0.175-0.021-0.347-0.053-0.527-0.053 c-2.404,0-4.352,1.948-4.352,4.352s1.948,4.352,4.352,4.352s4.527-1.894,4.527-4.298c0-0.095,0.042-19.594,0.042-19.594h4.016 c0.378,3.591,3.277,6.425,6.901,6.685V22.323z" />
    </svg>
  );
};

const SocialFeeds: React.FC = () => {
  return (
    <>
      <Box sx={styles.mainWrapper}>
        <Box sx={styles.contentWrapper}>
          <Box sx={styles.socialplatWrapper}>
            <Box sx={styles.socialplat}>
              <a
                href="https://www.youtube.com/channel/UCpjq9Obrl1MEpu4DTgWFunA"
                target="_blank"
                rel="noopener noreferrer"
              >
                <YouTubeIcon sx={styles.icnSizelg} />
              </a>
            </Box>
            <Box sx={styles.socialplat}>
              <a
                href="https://www.facebook.com/noiretvblog/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookIcon sx={styles.icnSize} />
              </a>
            </Box>
            <Box sx={styles.socialplat}>
              <a
                href="https://www.instagram.com/noiretvnetwork/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon sx={styles.icnSize} />
              </a>
            </Box>
            <Box sx={styles.socialplat}>
              <a
                href="https://www.tiktok.com/@noiretv"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterIcon style={{ transform: "scale(2.4)" }} />
              </a>
            </Box>
            <Box sx={styles.socialplat}>
              <a
                href="https://twitter.com/Noiretvnetwork"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TikTokIcon />
              </a>
            </Box>
          </Box>
          <Box sx={styles.socialtext}>
            <Typography sx={styles.headline} variant="h4">
              LIVE Social Feeds
            </Typography>
            <Typography sx={styles.introtext}>
              Connecting, sharing, and engaging! Welcome to our social media
              space where you can stay updated, interact with our community, and
              explore exciting content.
              <br />
              <br />
              Let's connect and make moments together!
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SocialFeeds;

/** @type {import("@mui/material").SxProps} */
const styles: { [key: string]: SxProps<Theme> } = {
  mainWrapper: {
    bgcolor: "var(--overlay)",
    position: "relative",
    p: "4rem 8rem",
    width: "100%",
    color: "var(--white)",
    [theme.breakpoints.down("laptop")]: {
      p: "2rem 1rem",
    },
  },
  contentWrapper: {
    display: "flex",
    textAlign: "left",
    padding: "2rem 0",
    gap: "4rem",
    [theme.breakpoints.down("laptop")]: {
      flexDirection: "column",
    },
  },
  socialtext: {
    width: "70%",
    [theme.breakpoints.down("laptop")]: {
      width: "auto",
      p: "0 0.6rem",
    },
  },
  headline: {
    fontWeight: "600",
    p: "1rem 0",
  },
  introtext: {
    fontSize: "1.1rem",
  },
  socialplatWrapper: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 2fr)",
  },
  socialplat: {
    display: "flex",
    borderRadius: "5px",
    justifyContent: "center",
    margin: "1rem 1rem",
    background: "rgba(0, 75, 205, 0.822)",
    width: "70px",
    height: "70px",
    transition: "all 1s ease-in-out",
    "&:hover": {
      cursor: "pointer",
      alignItems: "center",
      transform: "scale(1.1)",
    },
    "& svg": {
      marginTop: "-15px",
      transition: "margin-top 1s ease-in-out",
    },
  },
  icnSize: { transform: "scale(2)" },
  icnSizelg: { transform: "scale(2.4)" },
};
