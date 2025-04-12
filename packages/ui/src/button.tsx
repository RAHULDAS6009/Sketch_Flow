"use client";

import { ChangeEvent, ReactNode } from "react";

interface ButtonProps {
  variant: "Primary" | "Secondary" | "Outlined" | "none";
  onClick?: (e: ChangeEvent<HTMLButtonElement> | React.MouseEvent) => void;
  children?: ReactNode;
  className?: string;
  size: "large" | "medium" | "small";
  appName?: string;
}

const variants = {
  Primary: " text-white hover:bg-violet-300 bg-primary ",
  Secondary: "",
  Outlined: "border-1 border-violet-500 hover:bg-primary",
  none: "",
};

const sizes = {
  large: "py-6",
  medium: "py-4",
  small: "py-2",
};

export const Button = ({
  variant,
  children,
  className,
  appName,
  size = "small",
  onClick,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${className} ${variants[variant]} ${sizes[size]}  w-full font-medium text-sm    rounded-md`}
    >
      {appName}
      {children}
    </button>
  );
};
