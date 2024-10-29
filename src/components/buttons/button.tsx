import React from "react";

type RedditButtonProps = {
  variant?: "primary" | "secondary";
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button = ({ 
  variant = "primary",
  type = "button",
  children, 
  onClick 
}: RedditButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-md font-bold px-4 py-2 transition-colors duration-200 
        ${variant === "primary"
          ? "bg-orange-500 text-white hover:bg-orange-600"
          : "bg-[#115BCA] text-white border-2 border-gray-300 hover:bg-gray-100"}
      `}
    >
      {children}
    </button>
  );
};
