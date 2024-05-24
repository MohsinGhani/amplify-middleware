"use client";

import React, { useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Tooltip,
  Typography,
} from "@mui/material";

import UploadSharpIcon from "@mui/icons-material/UploadSharp";

import theme from "@/components/helpers/Theme";
import CommonButton from "@/components/Shared/CommonButton";
import UploadVideoModal from "@/components/UploadVideoModal";

const Page = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

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
          Channel dashboard
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
        <Card sx={styles.uploadCardContainer}>
          <CardContent>
            <img src="/assets/upload-video.svg" alt="upload-video" />
            <Typography variant="body1">
              Want to see metrics on your recent video? Upload and publish a
              video to get started.
            </Typography>
            <CommonButton
              text="UPLOAD VIDEOS"
              fullWidth={false}
              onClick={() => setIsUploadModalOpen(!isUploadModalOpen)}
              sx={{
                width: "fit-content !important",
                marginTop: "1rem",
              }}
            />
          </CardContent>
        </Card>
        <Box sx={styles.middleCard}>
          <Card sx={styles.channelAnalytics}>
            <CardContent>
              <Box className="subscriberCount">
                <Typography variant="h5">Channel analytics</Typography>
                <Typography variant="body1">Current subscribers</Typography>
                <Typography variant="h3">533</Typography>
                <Divider />
              </Box>
              <Box className="summary">
                <Typography variant="h6">Summary</Typography>
                <Typography variant="body1">Last 28 days</Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "1rem",
                  }}
                >
                  <Typography variant="body1">Views</Typography>
                  <Typography variant="body1">23</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "1rem",
                  }}
                >
                  <Typography variant="body1">Watch time (hours)</Typography>
                  <Typography variant="body1">0.6</Typography>
                </Box>
                <Divider />
              </Box>
              <Box className="summary">
                <Typography variant="h6">Top videos</Typography>
                <Typography variant="body1">Last 48 hours · Views</Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "1rem",
                  }}
                >
                  <Typography variant="body1">
                    Ramadan - Iftari at Dataar - Sindh
                  </Typography>
                  <Typography variant="body1">1</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "1rem",
                  }}
                >
                  <Typography variant="body1">4k video</Typography>
                  <Typography variant="body1">1</Typography>
                </Box>
                <CommonButton
                  text="GO TO CHANNEL ANALYTICS"
                  variant="text"
                  fullWidth={false}
                  sx={{
                    width: "fit-content !important",
                    marginTop: "1rem",
                  }}
                />
              </Box>
            </CardContent>
          </Card>
          <Card sx={styles.comments}>
            <CardContent>
              <Typography variant="h5">Latest comments</Typography>
              <Typography variant="body1">
                Channel comments I haven't responded to
              </Typography>
              <Box className="recentComment">
                <Avatar>N</Avatar>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  <Typography variant="body1">Naveed Ahmed</Typography>
                  <Typography variant="body1">1 week ago · 1 reply</Typography>
                </Box>
                <Box>
                  <img
                    src="https://i9.ytimg.com/vi/qPWvo-8CDoY/hqdefault.jpg?sqp=COzpxqsG-oaymwEmCOADEOgC8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGH8gVCgZMA8=&rs=AOn4CLDv9Xbb3y-QMpq09Z9pOANjphUXOQ"
                    alt="video-thumbnail"
                    style={{
                      width: "100px",
                      height: "65px",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              </Box>
              <CommonButton
                text="VIEW MORE"
                variant="text"
                fullWidth={false}
                sx={{
                  width: "fit-content !important",
                  marginTop: "1rem",
                }}
              />
            </CardContent>
          </Card>
          <Card sx={styles.recentSubscribers}>
            <CardContent>
              <Typography variant="h5">Recent Subscribers</Typography>
              <Typography variant="body1">Lifetime</Typography>
              <Box className="subscribers">
                <Avatar>N</Avatar>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  <Typography variant="body1">tafri shorts</Typography>
                  <Typography variant="body1">1 subscriber</Typography>
                </Box>
              </Box>
              <Box className="subscribers">
                <Avatar>N</Avatar>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  <Typography variant="body1">tafri shorts</Typography>
                  <Typography variant="body1">1 subscriber</Typography>
                </Box>
              </Box>
              <Box className="subscribers">
                <Avatar>N</Avatar>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  <Typography variant="body1">tafri shorts</Typography>
                  <Typography variant="body1">1 subscriber</Typography>
                </Box>
              </Box>
              <CommonButton
                text="SEE ALL"
                variant="text"
                fullWidth={false}
                sx={{
                  width: "fit-content !important",
                  marginTop: "1rem",
                }}
              />
            </CardContent>
          </Card>
        </Box>
        <Box sx={styles.lastCard}>
          <Card sx={styles.creatorInsider}>
            <Typography variant="h5">Creator Insider</Typography>
            <CardMedia
              component="img"
              height="140"
              image="/assets/noiretvLogo.png"
              alt="creator-insider"
            />
            <CardContent>
              <Typography variant="h6">The Week at Noire Tv</Typography>
              <Typography variant="body1">
                Hello Insiders! Today we are covering Product Drops, Updated
                Post Creation Flow & Updates on Revenue Analytics Tabs.
              </Typography>
              <CommonButton
                text="WATCH NOW"
                variant="text"
                fullWidth={false}
                sx={{
                  width: "fit-content !important",
                  marginTop: "1rem",
                }}
              />
            </CardContent>
          </Card>
          <Card sx={styles.newInStudio}>
            <CardContent>
              <Typography variant="h5">What's new in Studio</Typography>
              <Typography variant="body1">
                Linking changes on Noire Tv
              </Typography>
              <Divider />
              <Typography variant="body1">
                Expansion of channel permissions
              </Typography>
              <Divider />
              <Typography variant="body1">
                Upcoming changes to Community Guidelines warnings
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
      {isUploadModalOpen && (
        <UploadVideoModal
          open={isUploadModalOpen}
          handleClose={() => setIsUploadModalOpen(!isUploadModalOpen)}
        />
      )}
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
};
