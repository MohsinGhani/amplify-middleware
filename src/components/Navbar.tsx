"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "@/context";
import { signOut } from "aws-amplify/auth";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import { useMediaQuery } from "@mui/material";
import CommonButton from "./Shared/CommonButton";
import { UserRole } from "@/shared/enums/enums";

interface Page {
  title: string;
  path: string;
}

const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, setUser } = useAuth();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const isOnMobile = useMediaQuery("(max-width:500px)");

  const pages: Page[] = [
    {
      title: "Home",
      path: "/",
    },
    ...(user?.role !== UserRole.VIP
      ? [{ title: "Watch", path: "/dashboard" }]
      : []),
    // {
    //   title: "Watch",
    //   path: "/dashboard",
    // },
    {
      title: "Music",
      path: "https://linktr.ee/noiretvworld",
    },
    {
      title: "Pricing",
      path: "/pricing",
    },
    {
      title: "Submissions",
      path: "/submission",
    },
  ];

  const compLogo =
    "https://d3t91pxhqkzcch.cloudfront.net/noiretvLogoDefault.png";

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleSignOut = async () => {
    await signOut();
    setUser(null);
    router.push("/");
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: "var(--secondary-color-dark)",
      }}
    >
      <Container maxWidth="tv">
        <Toolbar disableGutters>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              width: "12%",
              mr: 1,
              cursor: "pointer",
              mb: "0.4rem",
            }}
            onClick={() => {
              router.push("/");
            }}
          >
            <Box component={"img"} src={compLogo} width={167} />
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
                bgcolor: "var(--shadow)",
              }}
            >
              {pages.map((page, index) => (
                <MenuItem
                  key={index}
                  onClick={() => {
                    if (page.path.startsWith("http")) {
                      // If the path starts with 'http', open it in a new tab/window
                      window.open(page.path, "_blank");
                    } else {
                      // Otherwise, navigate to the path
                      router.push(page.path);
                    }
                    // Close the menu when a MenuItem is clicked
                    handleCloseNavMenu();
                  }}
                  sx={{
                    width: "90vw",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              mr: "1rem",
              justifyContent: "center",
              alignItems: "center",
              width: "100px",
            }}
          >
            <Box component={"img"} src={compLogo} alt="company logo" />
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              ml: "1.5rem",
            }}
          >
            {pages.map((page, index) => (
              <Button
                key={index}
                onClick={() => {
                  if (page.path.startsWith("http")) {
                    // If the path starts with 'http', open it in a new tab/window
                    window.open(page.path, "_blank");
                  } else {
                    // Otherwise, navigate to the path
                    router.push(page.path);
                  }
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.title}
              </Button>
            ))}
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              alignItems: "flex-end",
            }}
          >
            {user ? (
              <Box
                className="flex"
                sx={{
                  minWidth: 120,
                  flexGrow: 1,
                  alignItems: "center",
                  justifyContent: "flex-end",
                  gap: "1rem",
                }}
              >
                {user?.role === UserRole.VIP && pathname !== "/studio" && (
                  <CommonButton
                    text="Go to Studio"
                    href="/studio"
                    variant="outlined"
                    fullWidth={false}
                    className="studio-btn"
                    sx={{
                      color: "white !important",
                      borderColor: "white !important",
                      "&:hover": {
                        borderColor: "white",
                      },
                    }}
                  />
                )}
                <Tooltip title="Sign Out">
                  <IconButton onClick={handleSignOut} sx={{ p: 0 }}>
                    <LogoutIcon
                      sx={{
                        fill: "var(--white)",
                        transform: "scale(1.1)",
                        transition: "all 0.6s ease-in-out",
                        "&:hover": {
                          transform: "scale(1.2)",
                        },
                      }}
                    />
                  </IconButton>
                </Tooltip>
              </Box>
            ) : (
              <Box
                className="flex"
                sx={{
                  minWidth: 120,
                  flexGrow: 1,
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Tooltip title="Sign Up">
                  <Button
                    onClick={() => {
                      router.push(`/signup`);
                    }}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    Sign Up
                  </Button>
                </Tooltip>

                <Tooltip title="Sign In">
                  {isOnMobile ? (
                    <IconButton onClick={() => router.push(`/login`)}>
                      <ExitToAppOutlinedIcon
                        sx={{
                          fill: "var(--white)",
                          transform: "scale(1.1)",
                          transition: "all 0.6s ease-in-out",
                          "&:hover": {
                            transform: "scale(1.2)",
                          },
                        }}
                      />
                    </IconButton>
                  ) : (
                    <Button
                      variant={"outlined"}
                      onClick={() => {
                        router.push(`/login`);
                      }}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      Sign In
                    </Button>
                  )}
                </Tooltip>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
