import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  loading?: boolean;
  onClick?: () => void;
}

export default function Button({
  label,
  loading,
  onClick,
  ...props
}: ButtonProps) {
  return (
    <button
      className="bg-black text-white p-2 rounded-md cursor-pointer hover:scale-[101%] hover:shadow-xl transition-all duration-300 flex justify-center items-center mt-4"
      {...props}
      disabled={loading}
      onClick={onClick}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Loading
        </div>
      ) : (
        label
      )}
    </button>
  );
}
