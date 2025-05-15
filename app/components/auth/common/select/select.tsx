"use client";
import { FiChevronDown } from "react-icons/fi";
import { useState, useRef } from "react";
import Image from "next/image";
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options?: { label: string; value: string }[];
}

//TODO:Create json file with countries and their codes and flag file urls
//TODO:Create a component that will fetch the data from the json file and display the data in the select

export default function Select({ label, options, ...props }: SelectProps) {
  const [currentOption, setCurrentOption] = useState(options?.[0]);
  const selectRef = useRef<HTMLSelectElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = options?.find(
      (option) => option.value === e.target.value
    );
    setCurrentOption(selectedOption);
  };

  return (
    <div>
      <label
        htmlFor="select"
        className="text-xs text-black mb-1 cursor-pointer"
      >
        {label}
      </label>
      <div className="relative">
        <Image
          src={`/flags/flag_${currentOption?.value}_16.svg`}
          alt={currentOption?.label || ""}
          width={16}
          height={16}
          style={{ width: "auto", height: "auto" }}
          className="absolute left-3 top-3.5 flex items-center justify-center pointer-events-none"
        />
        <select
          {...props}
          id={props?.name}
          className="pr-2 pl-10 py-2 rounded-md border border-gray-300 w-full focus:outline-black appearance-none"
          onChange={handleChange}
          ref={selectRef}
        >
          {options?.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            );
          })}
        </select>
        <div className="absolute right-2 top-0 h-full flex items-center justify-center">
          <FiChevronDown />
        </div>
      </div>
    </div>
  );
}
