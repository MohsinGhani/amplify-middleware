import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { getCurrentUser, fetchUserAttributes } from "aws-amplify/auth";
type Dispatch<T> = (action: T) => void;

interface UserProfile {
  userId: string;
  role: string;
  email: string | undefined;
  email_verified: boolean | undefined;
  name: string | undefined;
  username: string | undefined;
  phone: string | undefined;
  avatar: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
}

type AuthContextType = {
  user: UserProfile;
  setUser: Dispatch<any>;
  loading: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUserState] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const pathname = usePathname();

  const setUser = (e: any) => {
    if (e) {
      getUserInfo();
    } else {
      setUserState(null);
    }
  };

  const getUserInfo = async () => {
    try {
      const { userId, username } = await getCurrentUser();
      const userAttributes = await fetchUserAttributes();

      const user: UserProfile = {
        userId,
        username,
        role: userAttributes["custom:role"] ?? "viewer",
        email: userAttributes["email"],
        email_verified: userAttributes["email_verified"] === "true",
        name: userAttributes["name"],
        phone: userAttributes["phone_number"],
        avatar: userAttributes["profile"],
        firstName: userAttributes["given_name"],
        lastName: userAttributes["family_name"],
      };

      setUserState(user);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching authenticated user:", error);
      setLoading(false);
    }
  };

  const isShowFooter = useMemo(() => {
    if (pathname.includes("dashboard")) return false;
    if (pathname.includes("studio")) return false;
    return true;
  }, [pathname]);

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      <Box sx={styles.mainWrapper}>
        <Navbar />
        {loading ? (
          <Box sx={isShowFooter ? styles.footerLoader : styles.loader}>
            <CircularProgress size={64} />
          </Box>
        ) : (
          <Box sx={styles.container}>{children}</Box>
        )}
        <Footer />
      </Box>
    </AuthContext.Provider>
  );
};

import { useContext } from "react";
import { Box, CircularProgress, SxProps, Theme } from "@mui/material";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import theme from "@/components/helpers/Theme";
import { usePathname } from "next/navigation";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    // This error would occur if useAuth is used outside of an AuthProvider
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

/** @type {import("@mui/material").SxProps} */
const styles: { [key: string]: SxProps<Theme> } = {
  mainWrapper: (theme: Theme) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "var(--whiteoverlay)",
    [theme.breakpoints.down("laptop")]: {
      height: "auto",
      p: "2rem 0 4rem 0",
    },
  }),
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "var(--white)",
    minHeight: "calc(100vh - 346px)",
    [theme.breakpoints.down("laptop")]: {
      minHeight: "calc(100vh - 275px)",
    },
  },
  footerLoader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "calc(100vh - 345px)",
    [theme.breakpoints.down("laptop")]: {
      minHeight: "calc(100vh - 275px)",
    },
  },
  loader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "calc(100vh - 68.5px)",
    [theme.breakpoints.down("laptop")]: {
      minHeight: "calc(100vh - 56px)",
    },
  },
};
