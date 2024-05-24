"use client";

import { Button, CircularProgress } from "@mui/material";
import React from "react";

interface ButtonProps {
  className?: string;
  children?: React.ReactNode;
  fullWidth?: boolean;
  text?: string;
  variant?: "contained" | "outlined" | "text";
  disabled?: boolean;
  onClick?: () => void;
  loading?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  href?: string;
  sx?: any;
}

const CommonButton = ({
  className,
  children,
  fullWidth = false,
  text,
  variant = "contained",
  disabled = false,
  onClick,
  loading = false,
  startIcon,
  endIcon,
  href,
  sx,
}: ButtonProps) => {
  return (
    <div
      className={`common-button ${className} ${loading && "loading-button"}`}
    >
      <Button
        variant={variant}
        onClick={onClick}
        fullWidth={fullWidth}
        disabled={disabled}
        startIcon={startIcon}
        endIcon={endIcon}
        href={href}
        sx={sx}
      >
        {children || text}
      </Button>
      {loading && <CircularProgress size={24} />}
    </div>
  );
};

export default CommonButton;
