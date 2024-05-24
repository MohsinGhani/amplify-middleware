import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

// Alert component
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// Context and provider types
type SnackbarContextType = {
  showMessage: (
    message: any,
    severity: "error" | "warning" | "info" | "success"
  ) => void;
};

type SnackbarProviderProps = {
  children: ReactNode;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<
    "error" | "warning" | "info" | "success"
  >("info");

  const showMessage = useCallback(
    (
      newMessage: any,
      newSeverity: "error" | "warning" | "info" | "success"
    ) => {
      if (newSeverity === "error") {
        let errorMessage = "An unexpected error occurred"; // Default error message
        if (newMessage instanceof Error) {
          errorMessage = newMessage.message;
        }
        setMessage(errorMessage);
      } else {
        setMessage(newMessage);
      }
      setSeverity(newSeverity);
      setOpen(true);
    },
    []
  );

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <SnackbarContext.Provider value={{ showMessage }}>
      {children}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
