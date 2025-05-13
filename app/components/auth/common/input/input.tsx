"use client";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function Input({ label, error, ...props }: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col">
      <label
        htmlFor={props.name}
        className="text-sm text-black mb-1 cursor-pointer"
      >
        {label}
      </label>
      <div className="relative w-full">
        <input
          {...props}
          type={showPassword ? "text" : props.type}
          className="p-2 rounded-md border border-gray-300 w-full focus:outline-black"
        />
        {props.type === "password" && (
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
            onClick={togglePassword}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        )}
      </div>
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
}
