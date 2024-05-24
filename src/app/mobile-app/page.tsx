"use client";

import { Box, Typography, SxProps, Theme } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const MobileApp: React.FC = () => {
  return (
    <Box sx={styles.mainwrapper}>
      <Box sx={styles.content}>
        <Typography sx={styles.heading} variant="h4">
          The Mobile Smart Look
        </Typography>
        <Typography sx={styles.description}>
          Experience the ultimate in television entertainment with the NoireTV
          app on iOS and Android devices, allowing you to watch your favorite
          shows at your convenience, no matter where you are.
        </Typography>
      </Box>
      <Box sx={styles.logoContainer}>
        <Box sx={styles.logowrapper}>
          <Link href="https://testflight.apple.com/join/P7kArEQA" passHref>
            <Box
              component={"img"}
              src="https://d3t91pxhqkzcch.cloudfront.net/ioslogo.png"
              sx={styles.logo}
            />
          </Link>
        </Box>
        <Box sx={styles.logowrapper}>
          <Link
            href="https://play.google.com/store/apps/details?id=com.noiretv"
            passHref
          >
            <Box
              component={"img"}
              src="https://d3t91pxhqkzcch.cloudfront.net/androidlogo.png"
              sx={styles.logo}
            />
          </Link>
        </Box>
      </Box>
      <Box sx={styles.picwrapper}>
        <Box
          src="https://d3t91pxhqkzcch.cloudfront.net/mobile-app-hand.png"
          component={"img"}
          sx={styles.pic}
        />
      </Box>
    </Box>
  );
};

export default MobileApp;

const styles: Record<string, SxProps<Theme>> = {
  mainwrapper: {
    bgcolor: "var(--whiteoverlay)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "50%",
    p: "2rem 0 1rem 0",
  },
  heading: {
    fontWeight: "600",
    textAlign: "center",
    color: "var(--black)",
    p: "1rem 0",
  },
  description: {
    textAlign: "center",
    color: "var(--black)",
  },
  logoContainer: {
    display: "flex",
    justifyContent: "center",
  },
  logowrapper: {
    m: "1rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "8%",
    transition: "all 0.4s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  logo: {
    width: "100%",
    borderRadius: "40px",
    boxShadow: "1px 1px 8px var(--shadow)",
  },
  picwrapper: {
    width: "50%",
  },
  pic: {
    width: "100%",
  },
};
