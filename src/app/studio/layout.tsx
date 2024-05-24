"use client";

import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
} from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import AutoFixHighOutlinedIcon from "@mui/icons-material/AutoFixHighOutlined";
import CopyrightOutlinedIcon from "@mui/icons-material/CopyrightOutlined";
import SubtitlesOutlinedIcon from "@mui/icons-material/SubtitlesOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import InsertChartOutlinedSharpIcon from "@mui/icons-material/InsertChartOutlinedSharp";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import theme from "@/components/helpers/Theme";
import { useAuth } from "@/context";

const Studio: React.FC = ({ children }: any) => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  const router = useRouter();
  const pathName = usePathname();

  const handleTabClick = (tabId: string) => {
    switch (tabId) {
      case "Dashboard":
        router.push("/studio");
        break;
      case "Content":
        router.push("/studio/content");
        break;
      case "Analytics":
        router.push("/studio/analytics");
        break;
      case "Comments":
        router.push("/studio/comments");
        break;
      case "Subtitles":
        router.push("/studio/subtitles");
        break;
      case "Copyright":
        router.push("/studio/copyright");
        break;
      case "Earn":
        router.push("/studio/earn");
        break;
      case "Customization":
        router.push("/studio/customization");
        break;
      case "AudioLibrary":
        router.push("/studio/audiolibrary");
        break;
      case "Settings":
        router.push("/studio/settings");
        break;
      case "Feedback":
        router.push("/studio/feedback");
        break;
      default:
        router.push("/studio");
        break;
    }
  };

  return (
    <Box
      className="dashboard-container"
      sx={{ position: "relative", display: "flex", width: "100%" }}
    >
      <Box sx={styles.mainwrapper}>
        <Box sx={[open ? styles.navOpen : styles.navClosed, styles.navStyle]}>
          <Box>
            <Box sx={styles.togglewrapper}>
              <IconButton
                onClick={() => setOpen(!open)}
                sx={{
                  mr: 0,
                  bgcolor: "var(--whiteverlay)",
                  borderRadius: "50%",
                }}
              >
                <Box component="span" sx={styles.togglebtn}>
                  {open ? (
                    <ChevronLeftIcon
                      sx={{
                        color: "var(--black)",
                        borderRadius: "50%",
                        bgcolor: "var(--shadow)",
                      }}
                    />
                  ) : (
                    <ChevronRightIcon
                      sx={{
                        color: "var(--black)",
                        borderRadius: "50%",
                        bgcolor: "var(--shadow)",
                      }}
                    />
                  )}
                </Box>
              </IconButton>
            </Box>
            {open ? (
              <Box sx={styles.greetbox}>
                <Box
                  sx={styles.avatarContainer}
                  onClick={() => handleTabClick("Profile")}
                >
                  {/* // reserved for future design
                    <Avatar sx={styles.avatar} alt={firstName} src={avatar} />
                  */}
                </Box>
                <Typography
                  style={{ textAlign: "center", color: "var(--black)" }}
                >
                  Your channel
                </Typography>
                <Typography
                  sx={styles.typo}
                  onClick={() => handleTabClick("Profile")}
                >
                  {user?.firstName}
                </Typography>
              </Box>
            ) : (
              <Box sx={styles.faded}>
                <Box
                  sx={styles.avatarContainer}
                  onClick={() => handleTabClick("Profile")}
                >
                  <Box sx={styles.avatar} />
                </Box>
                <Typography
                  style={{ textAlign: "center", color: "var(--black)" }}
                >
                  Your channel
                </Typography>
                <Typography
                  sx={styles.typo}
                  onClick={() => handleTabClick("Profile")}
                >
                  {user?.name}
                </Typography>
              </Box>
            )}
            <Box sx={open ? styles.navOpen : styles.navClosed}>
              <Box sx={open ? styles.listWrapperOpen : styles.listWrapperClose}>
                <List>
                  <ListItem disablePadding>
                    <ListItemButton
                      sx={pathName === "/studio" ? styles.active : null}
                      onClick={() => handleTabClick("Dashboard")}
                    >
                      <ListItemIcon sx={styles.menuItemIcon}>
                        <DashboardIcon />
                      </ListItemIcon>
                      <Typography sx={{ fontWeight: "800" }}>
                        Dashboard
                      </Typography>
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton
                      sx={pathName === "/studio/content" ? styles.active : null}
                      onClick={() => handleTabClick("Content")}
                    >
                      <ListItemIcon sx={styles.menuItemIcon}>
                        <VideoLibraryOutlinedIcon />
                      </ListItemIcon>
                      <Typography sx={{ fontWeight: "800" }}>
                        Content
                      </Typography>
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton
                      className={
                        pathName === "/studio/analytics" ? "active" : ""
                      }
                      onClick={() => handleTabClick("Analytics")}
                    >
                      <ListItemIcon sx={styles.menuItemIcon}>
                        <InsertChartOutlinedSharpIcon />
                      </ListItemIcon>
                      <Typography sx={{ fontWeight: "800" }}>
                        Analytics
                      </Typography>
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton
                      className={
                        pathName === "/studio/comments" ? "active" : ""
                      }
                      onClick={() => handleTabClick("Comments")}
                    >
                      <ListItemIcon sx={styles.menuItemIcon}>
                        <CommentOutlinedIcon />
                      </ListItemIcon>
                      <Typography sx={{ fontWeight: "800" }}>
                        Comments
                      </Typography>
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton
                      className={
                        pathName === "/studio/subtitles" ? "active" : ""
                      }
                      onClick={() => handleTabClick("Subtitles")}
                    >
                      <ListItemIcon sx={styles.menuItemIcon}>
                        <SubtitlesOutlinedIcon />
                      </ListItemIcon>
                      <Typography sx={{ fontWeight: "800" }}>
                        Subtitles
                      </Typography>
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton
                      className={
                        pathName === "/studio/copyright" ? "active" : ""
                      }
                      onClick={() => handleTabClick("Copyright")}
                    >
                      <ListItemIcon sx={styles.menuItemIcon}>
                        <CopyrightOutlinedIcon />
                      </ListItemIcon>
                      <Typography sx={{ fontWeight: "800" }}>
                        Copyright
                      </Typography>
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton
                      className={pathName === "/studio/earn" ? "active" : ""}
                      onClick={() => handleTabClick("Earn")}
                    >
                      <ListItemIcon sx={styles.menuItemIcon}>
                        <AttachMoneyOutlinedIcon />
                      </ListItemIcon>
                      <Typography sx={{ fontWeight: "800" }}>Earn</Typography>
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton
                      className={
                        pathName === "/studio/customization" ? "active" : ""
                      }
                      onClick={() => handleTabClick("Customization")}
                    >
                      <ListItemIcon sx={styles.menuItemIcon}>
                        <AutoFixHighOutlinedIcon />
                      </ListItemIcon>
                      <Typography sx={{ fontWeight: "800" }}>
                        Customization
                      </Typography>
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton
                      className={
                        pathName === "/studio/audiolibrary" ? "active" : ""
                      }
                      onClick={() => handleTabClick("AudioLibrary")}
                    >
                      <ListItemIcon sx={styles.menuItemIcon}>
                        <LibraryMusicOutlinedIcon />
                      </ListItemIcon>
                      <Typography sx={{ fontWeight: "800" }}>
                        Audio library
                      </Typography>
                    </ListItemButton>
                  </ListItem>
                </List>
                <List>
                  <ListItem disablePadding>
                    <ListItemButton
                      className={
                        pathName === "/studio/settings" ? "active" : ""
                      }
                      onClick={() => handleTabClick("Settings")}
                    >
                      <ListItemIcon sx={styles.menuItemIcon}>
                        <SettingsOutlinedIcon />
                      </ListItemIcon>
                      <Typography sx={{ fontWeight: "800" }}>
                        Settings
                      </Typography>
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton
                      className={
                        pathName === "/studio/feedback" ? "active" : ""
                      }
                      onClick={() => handleTabClick("Feedback")}
                    >
                      <ListItemIcon sx={styles.menuItemIcon}>
                        <FeedbackOutlinedIcon />
                      </ListItemIcon>
                      <Typography sx={{ fontWeight: "800" }}>
                        Send feedback
                      </Typography>
                    </ListItemButton>
                  </ListItem>
                </List>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={styles.tabContent}>
          <Box sx={styles.innerContentWrapper}>{children}</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Studio;

/** @type {import("@mui/material").SxProps} */
const styles = {
  mainwrapper: {
    display: "grid",
    width: "100%",
    gridTemplateColumns: "0.1fr 3fr",
    position: "relative",
    [theme.breakpoints.down("laptop")]: {
      flexDirection: "column",
    },
  },
  navOpen: {
    display: "flex",
    flexDirection: "column",
    bgcolor: "var(--white)",
    width: "13rem",
    overflow: "hidden",
    transition: "all 0.6s ease-in-out",
    [theme.breakpoints.down("laptop")]: {
      p: "0 1rem",
    },
  },
  navClosed: {
    display: "flex",
    flexDirection: "column",
    bgcolor: "var(--white)",
    width: "4rem",
    overflow: "hidden",
    transition: "all 0.4s ease-in-out",
  },
  listWrapperOpen: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "calc(100vh - 207px)",
    [theme.breakpoints.down("laptop")]: {
      height: "calc(100vh - 130px)",
    },
  },
  listWrapperClose: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "calc(100vh - 147px)",
  },
  active: {
    background:
      "linear-gradient(to right, var(--primary-color-light), var(--secondary-color-light))",
    WebkitTextFillColor: "transparent", // Note the capital 'W' in Webkit
    WebkitBackgroundClip: "text", // Note the capital 'W' in Webkit
    transition: "all 0.6s ease-in-out",
    cursor: "pointer",
  },
  togglewrapper: {
    p: "0.8rem 0.5rem",
  },
  togglebtn: {
    display: "flex",
  },
  avatarContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    my: 2,
  },
  avatar: {
    width: "4vw",
    minHeight: "8vh",
    cursor: "pointer",
  },
  greeting: {
    mt: 1,
  },
  greetbox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    pb: "1rem",
    opacity: "100%",
    transition: "all 0.6s ease-in-out",
  },
  faded: {
    pb: 0,
    mt: "-9rem",
    transform: "scale(0)",
    opacity: 0,
    transition: "all 0.4s ease-in-out",
  },
  typo: {
    fontSize: "1.1rem",
    fontWeight: 700,
    textAlign: "center",
    textTransform: "uppercase",
    cursor: "pointer",
    "&:hover": {
      transform: "scale(1.1)",
      transition: "all 0.6s ease-in-out",
    },
  },
  menuItemIcon: {
    p: 0,
    m: 0,
  },
  tabContent: {
    bgcolor: "var(--whiteoverlay)",
    minWidth: "100%",
    height: "calc(100vh - 68.5px)",
    overflow: "auto",
  },
  innerContentWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "start",
    height: "100%",
    width: "100%",
    overflow: "auto",
    p: "1rem",
  },
  navStyle: {
    maxHeight: "calc(100vh - 68.5px)",
    overflowY: "auto",
  },
};
