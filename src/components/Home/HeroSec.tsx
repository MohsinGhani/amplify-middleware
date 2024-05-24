"use client";

import React from "react";
import Link from "next/link";
import { Box, Typography } from "@mui/material";
import { SxProps, Theme } from "@mui/system";
import theme from "../helpers/Theme";
import Button from "./Button";
import YtVideos from "./YtVideos";

interface Partner {
  logo: string;
  alt: string;
  link: string;
}

const heroImg = "https://d3t91pxhqkzcch.cloudfront.net/heroImage.png";
const verizonLogo = "https://d3t91pxhqkzcch.cloudfront.net/verizonFiosLogo.png";
const optimumLogo = "https://d3t91pxhqkzcch.cloudfront.net/optimumLogo.png";
const digicelLogo = "https://d3t91pxhqkzcch.cloudfront.net/digicelLogo.png";

const partners: Partner[] = [
  {
    logo: verizonLogo,
    alt: "verizon logo",
    link: "https://www.verizon.com/home/fios-tv/international-programming/",
  },
  {
    logo: optimumLogo,
    alt: "Optimum Logo",
    link: "https://www.optimum.com/tv/internationaltv",
  },
  {
    logo: digicelLogo,
    alt: "Digicel Logo",
    link: "https://www.digicelgroup.com/jm/en/contact-us.html",
  },
];

const heroObj = {
  lightBg: false,
  lightText: true,
  lightTextDesc: true,
  topLine: "Unlimited Access",
  headline: "Your one-stop destination for all your favorite shows!",
  description:
    "Stream your favorite shows anytime, anywhere with the NoireTV app - enjoy the ultimate TV experience!",
  buttonLabel: "Get App",
  imgStart: "",
  alt: "Mobile App",
};

const HeroSec: React.FC = () => {
  const { topLine, headline, description, buttonLabel, alt } = heroObj;
  return (
    <>
      <Box sx={styles.mainWrapper}>
        <Box className="video">
          <YtVideos />
        </Box>
        <Box sx={styles.contentWrapper}>
          <Box sx={styles.content}>
            <Typography sx={styles.topHeroLine}>{topLine}</Typography>
            <Typography sx={styles.headline}>{headline}</Typography>
            <Typography sx={styles.subtitle}>{description}</Typography>
            <Link href="/mobile-app" passHref>
              <Button buttonSize="btn--wide">{buttonLabel}</Button>
            </Link>
          </Box>

          <Box sx={styles.heroImg}>
            <Box component={"img"} src={heroImg} alt={alt} />
          </Box>
        </Box>

        <Box sx={styles.partners}>
          <Typography sx={styles.partHeadline}>Watch NOIRETV on:</Typography>
          <Box className="flex flex-row justify-center ">
            {partners.map((partner, index) => (
              <Box key={index} sx={styles.partLogo}>
                <Link href={partner.link} target="_blank" rel="noreferrer">
                  <Box component={"img"} src={partner.logo} alt={partner.alt} />
                </Link>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default HeroSec;

/** @type {import("@mui/material").SxProps} */
const styles: { [key: string]: SxProps<Theme> } = {
  mainWrapper: {
    position: "relative",
    bgcolor: "var(--overlay)",
    color: "#fff",
    minHeight: "100vh",
    width: "auto",
    overflow: "hidden",
  },
  contentWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    py: "1rem",
    [theme.breakpoints.down("laptop")]: {
      flexDirection: "column",
    },
  },
  content: {
    width: "40%",
    mr: "2rem",
    [theme.breakpoints.down("laptop")]: {
      width: "80%",
      mr: 0,
      mt: 4,
    },
    [theme.breakpoints.down("tablet")]: {
      width: "90%",
    },
  },
  topHeroLine: {
    color: "#f00946",
    fontSize: "1rem",
    lineHeight: "16px",
    fontWeight: "700",
    letterSpacing: "1.4px",
    textTransform: "uppercase",
    marginBottom: "35px",
  },
  headline: {
    mb: "24px",
    fontSize: "3rem",
    lineHeight: "1.1",
    fontWeight: "600",
    color: "#f7f8fa",
    [theme.breakpoints.down("tablet")]: {
      fontSize: "2rem",
    },
  },
  subtitle: {
    width: "100%",
    marginBottom: "35px",
    fontSize: "1rem",
    lineHeight: "24px",
  },
  heroImg: {
    width: "40%",
    ml: "2rem",
    // [theme.breakpoints.down("laptop")]: {
    //   width: "80%",
    //   ml: 0,
    //   mt: 4,
    // },
    // [theme.breakpoints.down("tablet")]: {
    //   width: "70%",
    // },
  },

  partners: {
    display: "flex",
    flexDirection: "column",
  },
  partHeadline: {
    textAlign: "center",
    fontSize: "1.1rem",
    fontWeight: "400",
    [theme.breakpoints.down("tablet")]: {
      fontSize: "0.9rem",
    },
  },
  partLogo: {
    width: "15%",
    m: "0 1rem",
    transition: "all 0.5s ease-in-out",
    "&:hover": {
      transform: "scale(1.1)",
    },
    [theme.breakpoints.down("laptop")]: {
      width: "25%",
    },
    [theme.breakpoints.down("tablet")]: {
      width: "20%",
    },
  },
};
