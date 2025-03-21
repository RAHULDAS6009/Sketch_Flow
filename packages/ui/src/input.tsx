"use client";
import { LucideIcon } from "lucide-react";
import { ChangeEvent } from "react";

interface InputProps {
  Icon: LucideIcon;
  className?: string;
  label: string;
  type: "text" | "password";
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  placeholder?: string;
}
export const Input = ({
  onChange,
  Icon,
  value,
  label,
  placeholder,
  type,
}: InputProps) => {
  return (
    <div className="flex flex-col gap-2 text-slate-500">
      <span className="font-bold">{label}</span>
      <div className="flex items-center gap-2 text-slate-700 p-2 rounded-md focus:outline focus:outline-offset-2   border-2 border-slate-300     focus:border-violet-400">
        <Icon />
        <input
          className=" bottom-0 left-0 w-full outline-none "
          placeholder={placeholder}
          onChange={onChange}
          type={type}
          value={value}
        />
      </div>
    </div>
  );
};
