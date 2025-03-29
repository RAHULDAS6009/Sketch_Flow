import { ReactNode } from "react";

export const IconComponent = ({
  onClick,
  icon,
  isActivated,
}: {
  isActivated: boolean;
  icon: ReactNode;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={` ${isActivated ? "bg-gray-300 text-red-400" : "bg-white"}   rounded-md h-8 w-8 flex justify-center items-center cursor-pointer hover:bg-gray-300 hover:text-red-400`}
    >
      {icon}
    </div>
  );
};
