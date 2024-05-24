"use client";

import React, { useMemo } from "react";
import { Box, List, ListItem, Typography } from "@mui/material";

import theme from "./helpers/Theme";
import { usePathname, useRouter } from "next/navigation";

interface NavLink {
  title: string;
  path: string;
  target?: string;
}

const navLinks: NavLink[] = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "About Us",
    path: "/about-us",
  },
  {
    title: "Live TV",
    path: "/dashboard",
  },
  {
    title: "Music",
    path: "https://linktr.ee/noiretvworld",
    target: "_blank",
  },
  {
    title: "Pricing",
    path: "/pricing",
  },
  {
    title: "Submissions",
    path: "/submission",
  },
  {
    title: "Contact Us",
    path: "/contact",
  },
];

const terms: NavLink[] = [
  {
    title: "Terms Of Use Agreement",
    path: "/terms-of-agreement",
  },
  {
    title: "Terms Of Service",
    path: "/terms-of-services",
  },
  {
    title: "Privacy Policy",
    path: "/privacy-policy",
  },
];

const Footer: React.FC = () => {
  const router = useRouter();
  const compLogo =
    "https://d3t91pxhqkzcch.cloudfront.net/noiretvLogoDefault.png";

  const pathname = usePathname();

  const isShowFooter = useMemo(() => {
    if (pathname.includes("dashboard")) return false;
    if (pathname.includes("studio")) return false;
    return true;
  }, [pathname]);

  if (!isShowFooter) return null;

  return (
    <Box
      sx={{
        bgcolor: "var(--secondary-color-dark)",
        color: "var(--white)",
        height: "auto",
        boxShadow: "-2px -2px 12px var(--shadow)",
        p: "0 8rem",
        [theme.breakpoints.down("laptop")]: {
          p: "2rem 2rem",
        },
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "3fr 2fr",
          padding: "1rem",
          fontSize: "14px",
          [theme.breakpoints.down("tablet")]: {
            p: 0,
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "2fr 2fr",
          }}
        >
          <List>
            {navLinks.map((navLink, index) => (
              <ListItem
                key={index}
                onClick={() => {
                  if (navLink.target) {
                    window.open(navLink.path, "_blank");
                  } else {
                    router.push(navLink.path);
                  }
                }}
                sx={styles.listItems}
              >
                {navLink.title}
              </ListItem>
            ))}
          </List>
          <List>
            {terms.map((term, index) => (
              <ListItem
                key={index}
                onClick={() => router.push(term.path)}
                sx={styles.listItems}
              >
                {term.title}
              </ListItem>
            ))}
          </List>
        </Box>
        <Box sx={styles.copyright}>
          <Box>
            <Box component={"img"} src={compLogo} sx={styles.compLogo} />
          </Box>
          <Typography variant="body2" sx={styles.copyriteNote}>
            Copyright © 2023 Caspen Media Group. All Rights Reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;

const styles = {
  listItems: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    cursor: "pointer",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.02)",
    },
  },
  copyright: {
    [theme.breakpoints.down("tablet")]: {
      p: "2rem 0 2rem 0",
    },
  },
  compLogo: {
    width: "16rem",
    display: "flex",
    flexDirection: "column",
    ml: "auto",
    mr: 0,
    [theme.breakpoints.down("laptop")]: {
      width: "10rem",
    },
  },
  copyriteNote: {
    textAlign: "right",
    [theme.breakpoints.down("tablet")]: {
      pl: "4rem",
    },
  },
};
