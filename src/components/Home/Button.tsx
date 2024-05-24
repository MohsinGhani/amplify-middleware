"use client";

import React, { ReactNode } from "react";

// Define the prop types for the Button component
interface ButtonProps {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  buttonStyle?: string;
  buttonSize?: string;
  buttonColor?: string;
}

const STYLES = ["btn--primary", "btn--outline"];
const SIZES = ["btn--large", "btn--medium", "btn--mobile", "btn--wide"];
const COLOR = ["primary", "lightbgBtn", "red", "blue", "yellow"];

const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  onClick,
  buttonStyle,
  buttonSize,
  buttonColor,
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle ?? "")
    ? buttonStyle
    : STYLES[0];
  const checkButtonSize = SIZES.includes(buttonSize ?? "")
    ? buttonSize
    : SIZES[0];
  const checkButtonColor = COLOR.includes(buttonColor ?? "")
    ? buttonColor
    : COLOR[0];

  return (
    <span className="custom-btn">
      <button
        className={`btn ${checkButtonStyle} ${checkButtonSize} ${checkButtonColor}`}
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
    </span>
  );
};

export default Button;
