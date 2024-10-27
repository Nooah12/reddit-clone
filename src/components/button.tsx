import React from "react";

type RedditButtonProps = {
  variant?: "primary" | "secondary";
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  onClick?: () => void;
}

export const RedditButton = ({ 
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
          : "border-2 border-gray-300 text-gray-800 hover:bg-gray-100"}
      `}
    >
      {children}
    </button>
  );
};
