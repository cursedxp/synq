import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export default function Button({ label, ...props }: ButtonProps) {
  return (
    <button
      className="bg-black text-white p-2 rounded-md mt-2 cursor-pointer hover:scale-[101%] hover:shadow-xl transition-all duration-300 flex justify-center items-center"
      {...props}
    >
      {label}
    </button>
  );
}
