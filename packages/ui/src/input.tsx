import { ChangeEvent } from "react";

interface InputProps {
  title: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}
export const Input = ({ onChange, value,title }: InputProps) => {
  return (
    <div>
      <span>{title}</span>
      <input className="p-2 rounded-md outline-2 outline-offset-2 outline-violet-500" onChange={onChange} type="text" value={value} />;
    </div>
  );
};
