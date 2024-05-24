import { IconButton, InputAdornment, TextField } from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import React, { useState } from "react";

interface PasswordInputProps {
  fullWidth?: boolean;
  label: string;
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  required?: boolean;
  autoComplete?: string;
  variant?: "filled" | "outlined" | "standard";
  error?: boolean;
  helperText?: string | boolean;
  disabled?: boolean;
  className?: string;
  multiline?: boolean;
  minRows?: number | string;
  maxRows?: number | string;
  rows?: number | string;
  margin?: "none" | "dense" | "normal";
}

const PasswordInput = ({
  fullWidth = true,
  label,
  value,
  name,
  onChange,
  onBlur,
  required = false,
  autoComplete = "off",
  variant = "outlined",
  error,
  helperText,
  disabled = false,
  className = "password-field",
  multiline = false,
  minRows,
  maxRows,
  rows,
  margin,
}: PasswordInputProps) => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  return (
    <TextField
      className={className}
      fullWidth={fullWidth}
      label={label}
      value={value}
      name={name}
      type={passwordVisibility ? "text" : "password"}
      autoComplete={autoComplete}
      variant={variant}
      onChange={onChange}
      onBlur={onBlur}
      required={required}
      error={error}
      helperText={helperText}
      disabled={disabled}
      multiline={multiline}
      minRows={minRows}
      maxRows={maxRows}
      rows={rows}
      margin={margin}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setPasswordVisibility(!passwordVisibility)}
              edge="end"
            >
              {passwordVisibility ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordInput;
