"use client";

import { ChangeEvent, ReactNode } from "react";

interface ButtonProps {
  variant: "Primary" | "Secondary" | "Outlined";
  onClick?: (e: ChangeEvent<HTMLButtonElement> | React.MouseEvent) => void;
  children?: ReactNode;
  className?: string;
  appName?: string;
}

const variants={
  "Primary":" text-white hover:bg-violet-300 bg-primary ",
  "Secondary":"",
  "Outlined":"border-1 border-violet-500 hover:bg-primary"
}

export const Button = ({
  variant,
  children,
  className,
  appName,
  onClick,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${className} ${variants[variant]}  w-full font-medium text-sm   py-2 rounded-md`}
    >
      {appName}
      {children}
    </button>
  );
};
