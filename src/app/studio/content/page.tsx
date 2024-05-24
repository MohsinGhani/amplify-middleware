"use client";

import React, { useState } from "react";
import { Box, Tab, Tabs, Tooltip, Typography } from "@mui/material";
import UploadSharpIcon from "@mui/icons-material/UploadSharp";
import theme from "@/components/helpers/Theme";
import ContentTab from "./ContentTab";

const Page = () => {
  const [selectedTab, setSelectedTab] = useState<any>(0);

  const tabs = [
    { id: 0, label: "Videos", component: <ContentTab /> },
    // { id: 1, label: "Playlists", component: <></> },
  ];

  const handleChange = (event: any, newValue: any) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={styles.mainwrapper}>
      <Box sx={styles.header}>
        <Typography
          variant="h3"
          sx={{
            fontSize: "1.7rem",
            fontWeight: "500",
          }}
        >
          Channel content
        </Typography>
        {/* <Box sx={styles.headerButtons}>
          <Tooltip title="Upload videos">
            <Box sx={styles.headerButton}>
              <UploadSharpIcon sx={{ color: "var(--white)" }} />
            </Box>
          </Tooltip>
        </Box> */}
      </Box>
      <Box sx={styles.cardContainer}>
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={styles.tabs}
        >
          {(tabs || []).map((tab) => (
            <Tab
              label={tab.label}
              sx={
                selectedTab === tab.id
                  ? {
                      ...styles.tab,
                      color: "var(--white)",
                      transform: "scale(0.98)",
                    }
                  : styles.tab
              }
            />
          ))}
        </Tabs>
      </Box>
      <Box width={"100%"} overflow={"hidden"}>
        {tabs.map((tab, index) => (
          <div key={index} hidden={selectedTab !== index}>
            {tab["component"]}
          </div>
        ))}
      </Box>
    </Box>
  );
};

export default Page;

/** @type {import("@mui/material").SxProps} */
const styles = {
  mainwrapper: {
    display: "grid",
    width: "100%",
    [theme.breakpoints.down("laptop")]: {
      flexDirection: "column",
    },
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerButtons: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
  },
  headerButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "var(--secondary-color-light)",
    padding: "0.5rem",
    borderRadius: "50%",
    cursor: "pointer",
  },
  cardContainer: {
    display: "flex",
    alignItems: "flex-start",
    gap: "1.7rem",
    marginTop: "1rem",
    [theme.breakpoints.down("laptop")]: {
      flexDirection: "column",
      gap: "1rem",
    },
  },
  uploadCardContainer: {
    width: "100%",
    padding: "1rem",
    borderRadius: "0.5rem",
    border: "1px solid var(--disabled-color-dark)",
    boxShadow: "none",
    "& .MuiCardContent-root": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      border: "1px dashed var(--shadow)",
      padding: "6rem 1rem",
      "& p": {
        textAlign: "center",
        fontSize: "0.8rem",
      },
    },
  },
  middleCard: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "1.3rem",
  },
  channelAnalytics: {
    width: "100%",
    padding: "0.1rem",
    borderRadius: "0.5rem",
    border: "1px solid var(--disabled-color-dark)",
    boxShadow: "none",
    "& .subscriberCount": {
      "& h5": {
        fontSize: "16px",
        fontWeight: "600",
      },
      "& p": {
        marginTop: "12px",
        fontSize: "13px",
        fontWeight: "400",
      },
      "& h3": {
        marginTop: "6px",
        fontSize: "40px",
        fontWeight: "400",
      },
      "& hr": {
        marginTop: "48px",
        marginBottom: "12px",
      },
    },
    "& .summary": {
      "& h6": {
        fontSize: "14px",
        fontWeight: "600",
      },
      "& p": {
        fontSize: "13px",
        fontWeight: "400",
      },
      "& hr": {
        marginTop: "24px",
        marginBottom: "12px",
      },
      "& .common-button": {
        justifyContent: "flex-start",
      },
    },
  },
  comments: {
    width: "100%",
    padding: "0.1rem",
    borderRadius: "0.5rem",
    border: "1px solid var(--disabled-color-dark)",
    boxShadow: "none",
    "& h5": {
      fontSize: "16px",
      fontWeight: "600",
    },
    "& p": {
      marginTop: "6px",
      fontSize: "13px",
      fontWeight: "400",
    },
    "& .common-button": {
      justifyContent: "flex-start",
    },
    "& .recentComment": {
      marginTop: "12px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: "1rem",
      width: "100%",
    },
  },
  recentSubscribers: {
    width: "100%",
    padding: "0.1rem",
    borderRadius: "0.5rem",
    border: "1px solid var(--disabled-color-dark)",
    boxShadow: "none",
    "& .MuiCardContent-root": {
      paddingBottom: "16px !important",
    },
    "& h5": {
      fontSize: "16px",
      fontWeight: "600",
    },
    "& p": {
      marginTop: "6px",
      fontSize: "13px",
      fontWeight: "400",
    },
    "& .common-button": {
      justifyContent: "flex-start",
    },
    "& .subscribers": {
      marginTop: "16px",
      display: "flex",
      gap: "1rem",
      "& p": {
        marginTop: "0 !important",
      },
    },
  },
  lastCard: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "1.3rem",
  },
  creatorInsider: {
    padding: "1.1rem",
    borderRadius: "0.5rem",
    border: "1px solid var(--disabled-color-dark)",
    boxShadow: "none",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    "& .MuiCardContent-root": {
      padding: "0 !important",
    },
    "& h5": {
      fontSize: "16px",
      fontWeight: "600",
    },
    "& h6": {
      fontSize: "14px",
      fontWeight: "600",
    },
    "& p": {
      marginTop: "6px",
      fontSize: "13px",
      fontWeight: "400",
    },
    "& .common-button": {
      justifyContent: "flex-start",
    },
  },
  newInStudio: {
    padding: "1.1rem",
    borderRadius: "0.5rem",
    border: "1px solid var(--disabled-color-dark)",
    boxShadow: "none",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    "& .MuiCardContent-root": {
      padding: "0 !important",
    },
    "& h5": {
      fontSize: "16px",
      fontWeight: "600",
      marginBottom: "0.9rem",
    },
    "& p": {
      padding: "0.9rem 0",
      fontSize: "13px",
    },
  },
  tabs: {
    display: "flex",
    flexDirection: "row",
    p: "4rem 0 1rem 0",
    // [theme.breakpoints.down("tablet")]: {
    //   width: "auto",
    //   flexDirection: "column",
    // },
  },
  tab: {
    fontSize: "1.1rem",
    textTransform: "uppercase",
    fontWeight: "500",
    cursor: "pointer",
    width: "auto",
    transition: "all 0.3s ease-in-out",
  },
};
