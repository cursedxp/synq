"use client";
import { FiChevronDown } from "react-icons/fi";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options?: { label: string; value: string }[];
  setCurrentOption?: (option: { label: string; value: string }) => void;
  className?: string;
}
//TODO:Create json file with countries and their codes and flag file urls
//TODO:Create a component that will fetch the data from the json file and display the data in the select

export default function Select({
  label,
  options,
  setCurrentOption,
  className,
  ...props
}: SelectProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = options?.find(
      (option) => option.value === e.target.value
    );
    if (setCurrentOption && selectedOption) {
      setCurrentOption(selectedOption);
    }
  };

  return (
    <div className="relative">
      <label
        htmlFor="select"
        className="text-xs text-black mb-1 cursor-pointer"
      >
        {label}
      </label>
      <select
        {...props}
        id={props?.name}
        className={`px-2 py-2 rounded-md border border-gray-300 w-full focus:outline-black appearance-none ${className}`}
        onChange={handleChange}
      >
        {options?.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
      <div className="absolute right-2 top-3 h-full flex items-center justify-center">
        <FiChevronDown />
      </div>
    </div>
  );
}
