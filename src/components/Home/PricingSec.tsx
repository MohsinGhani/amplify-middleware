"use client";

import React from "react";
import Link from "next/link";
import { Box, Typography, SxProps, Theme } from "@mui/material";

import theme from "../helpers/Theme";
import Button from "./Button";

const data = {
  lightBg: true,
  lightText: false,
  lightTextDesc: false,
  topLine: "EASY SETUP",
  headline: "Unlimited Entertainment for everyone",
  description:
    "With our unlimited entertainment platform, signing up for quality TV and entertainment has never been easier! In just under 10 minutes, you can have everything set up and ready to go. Simply add your information and start enjoying endless hours of entertainment.",
  buttonLabel: "Subscribe",
  imgStart: "start",
  alt: "Vault",
};

const PricingSec: React.FC = () => {
  const { topLine, headline, description, buttonLabel, alt } = data;
  const pricingSecImg =
    "https://d3t91pxhqkzcch.cloudfront.net/pricingImage.png";

  return (
    <>
      <Box sx={styles.mainWrapper}>
        <Box sx={styles.contentWrapper}>
          <Box sx={styles.content}>
            <Box sx={styles.col}>
              <Box sx={styles.text}>
                <Typography sx={styles.topHeroLine}>{topLine}</Typography>
                <Typography sx={styles.headline}>{headline}</Typography>
                <Typography sx={styles.subtitle}>{description}</Typography>
                <Link href="/pricing" passHref>
                  <Button buttonSize="btn--wide" buttonColor="lightbgBtn">
                    {buttonLabel}
                  </Button>
                </Link>
              </Box>
            </Box>
            <Box sx={styles.col}>
              <Box sx={styles.secImg}>
                <img src={pricingSecImg} alt={alt} className="home__hero-img" />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default PricingSec;

/** @type {import("@mui/material").SxProps} */
const styles: { [key: string]: SxProps<Theme> } = {
  mainWrapper: {
    bgcolor: "var(--whiteoverlay)",
    color: "#fff",
    p: "4rem 1.5rem 0 1.5rem",
    [theme.breakpoints.down("laptop")]: {
      pt: "1rem",
    },
  },
  contentWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("laptop")]: {
      flexDirection: "column",
    },
  },
  content: {
    display: "flex",
    flexDirection: "row-reverse",
    alignContent: "stretch",
    flexWrap: "wrap",
    m: "0 -15px -15px -15px",
    [theme.breakpoints.down("laptop")]: {
      flexDirection: "column-reverse",
      width: "auto",
      m: "0 0 4rem 0",
    },
  },
  text: {
    mt: "2rem",
  },
  col: {
    marginBottom: "15px",
    p: "0 15px",
    flex: 1,
    maxWidth: "50%",
    flexBasis: "50%",
    [theme.breakpoints.down("laptop")]: {
      maxWidth: "100%",
      m: 0,
    },
  },
  topHeroLine: {
    color: "var(--primary-color-dark)",
    fontSize: "1rem",
    lineHeight: "16px",
    fontWeight: "700",
    letterSpacing: "1.4px",
    textTransform: "uppercase",
    marginBottom: "2rem",
  },
  headline: {
    mb: "24px",
    fontSize: "3rem",
    lineHeight: "1.1",
    fontWeight: "600",
    color: "var(--black)",
    [theme.breakpoints.down("tablet")]: {
      fontSize: "2rem",
    },
  },
  subtitle: {
    width: "80%",
    marginBottom: "35px",
    fontSize: "1rem",
    lineHeight: "24px",
    color: "var(--black)",
    [theme.breakpoints.down("laptop")]: {
      width: "100%",
    },
  },
  secImg: {
    width: "95%",
    mt: "-6rem",
    [theme.breakpoints.down("laptop")]: {
      width: "100%",
      m: 0,
    },
  },
};
