"use client";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";
interface InputProps {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  error?: string;
}

export default function Input({
  label,
  type,
  name,
  placeholder,
  error,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-sm text-black mb-1 cursor-pointer">
        {label}
      </label>
      <div className="relative w-full">
        <input
          type={showPassword ? "text" : type}
          placeholder={placeholder}
          id={name}
          className=" p-2 rounded-md border border-gray-300 w-full focus:outline-black"
        />
        {type === "password" && (
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
            onClick={togglePassword}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        )}
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  );
}
