"use client";

import { ChangeEvent, EventHandler, ReactNode } from "react";

interface ButtonProps {
  variant?: "Primary" | "Secondary" | "Outlined";
  onClick?: (e: ChangeEvent<HTMLButtonElement> | React.MouseEvent) => void;
  children?: ReactNode;
  className?: string;
  appName?: string;
}

export const Button = ({
  children,
  className,
  appName,
  onClick,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${className} bg-primary w-full  p-2 rounded-md text-white hover:bg-violet-400`}
    >
      {children}
    </button>
  );
};
