"use client";

import React, { useState } from "react";
import { signOut } from "aws-amplify/auth";
import { usePathname, useRouter } from "next/navigation";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchIcon from "@mui/icons-material/Search";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import FeaturedPlayListOutlinedIcon from "@mui/icons-material/FeaturedPlayListOutlined";
import SlideshowOutlinedIcon from "@mui/icons-material/SlideshowOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import theme from "../../components/helpers/Theme";
import { useAuth } from "@/context";

const DashBoard: React.FC = ({ children }: any) => {
  const [open, setOpen] = useState(false);
  const { setUser, user } = useAuth();

  const router = useRouter();
  const pathName = usePathname();

  const handleTabClick = (tabId: string) => {
    switch (tabId) {
      case "Home":
        router.push("/dashboard");
        break;
      case "Search":
        router.push("/dashboard/search");
        break;
      case "LiveTV":
        router.push("/dashboard/livetv");
        break;
      case "Highlights":
        router.push("/dashboard/highlights");
        break;
      case "Shows":
        router.push("/dashboard/shows");
        break;
      case "Music":
        window.open("https://linktr.ee/noiretvworld", "_blank");
        break;
      case "Profile":
        router.push("/dashboard/profile");
        break;
      default:
        router.push("/dashboard");
        break;
    }
  };

  const handleSignOut = async () => {
    await signOut();
    setUser(null);
    router.push("/login");
  };

  return (
    <Box
      className="dashboard-container"
      sx={{ position: "relative", display: "flex", width: "100%" }}
    >
      <Box sx={styles.mainwrapper}>
        <Box sx={open ? styles.navOpen : styles.navClosed}>
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
                  Welcome
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
                  Welcome
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
              <List>
                <ListItem disablePadding>
                  <ListItemButton
                    sx={pathName === "/dashboard/search" ? styles.active : null}
                    onClick={() => handleTabClick("Search")}
                  >
                    <ListItemIcon sx={styles.menuItemIcon}>
                      <SearchIcon />
                    </ListItemIcon>
                    <Typography sx={{ fontWeight: "800" }}>Search</Typography>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    sx={pathName === "/dashboard" ? styles.active : null}
                    onClick={() => handleTabClick("Home")}
                  >
                    <ListItemIcon sx={styles.menuItemIcon}>
                      <HomeOutlinedIcon />
                    </ListItemIcon>
                    <Typography sx={{ fontWeight: "800" }}>Home</Typography>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    className={pathName === "/dashboard/livetv" ? "active" : ""}
                    onClick={() => handleTabClick("LiveTV")}
                  >
                    <ListItemIcon sx={styles.menuItemIcon}>
                      <LiveTvOutlinedIcon />
                    </ListItemIcon>
                    <Typography sx={{ fontWeight: "800" }}>LiveTV</Typography>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    className={
                      pathName === "/dashboard/highlights" ? "active" : ""
                    }
                    onClick={() => handleTabClick("Highlights")}
                  >
                    <ListItemIcon sx={styles.menuItemIcon}>
                      <FeaturedPlayListOutlinedIcon />
                    </ListItemIcon>
                    <Typography sx={{ fontWeight: "800" }}>
                      Highlights
                    </Typography>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    className={pathName === "/dashboard/shows" ? "active" : ""}
                    onClick={() => handleTabClick("Shows")}
                  >
                    <ListItemIcon sx={styles.menuItemIcon}>
                      <SlideshowOutlinedIcon />
                    </ListItemIcon>
                    <Typography sx={{ fontWeight: "800" }}>Shows</Typography>
                  </ListItemButton>
                </ListItem>
              </List>
              <Box className="usr_manage">
                <List>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => {
                        window.open("https://linktr.ee/noiretvworld", "_blank");
                      }}
                    >
                      <ListItemIcon sx={styles.menuItemIcon}>
                        <LibraryMusicOutlinedIcon />
                      </ListItemIcon>
                      Music
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton
                      className={
                        pathName === "/dashboard/profile" ? "active" : ""
                      }
                      onClick={() => handleTabClick("Profile")}
                    >
                      <ListItemIcon sx={styles.menuItemIcon}>
                        <ManageAccountsOutlinedIcon />
                      </ListItemIcon>
                      <Typography>Profile</Typography>
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton onClick={handleSignOut}>
                      <ListItemIcon sx={styles.menuItemIcon}>
                        <ExitToAppOutlinedIcon />
                      </ListItemIcon>
                      Sign Out
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

export default DashBoard;

/** @type {import("@mui/material").SxProps} */
const styles = {
  mainwrapper: {
    display: "grid",
    width: "100%",
    gridTemplateColumns: "0.1fr 3fr",
    [theme.breakpoints.down("laptop")]: {
      flexDirection: "column",
    },
  },
  navOpen: {
    display: "flex",
    flexDirection: "column",
    bgcolor: "var(--white)",
    borderRight: "1px solid var(--primary-color-light)",
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
  },
  innerContentWrapper: {
    display: "flex",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    overflow: "auto",
    p: "1rem",
  },
};
