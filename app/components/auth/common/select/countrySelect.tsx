"use client";

import { useState } from "react";
import Image from "next/image";
import Select from "./select";
interface CountrySelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options?: { label: string; value: string }[];
}
export default function CountrySelect({
  label,
  options,
  className,
  ...props
}: CountrySelectProps) {
  const [currentOption, setCurrentOption] = useState(options?.[0]);

  return (
    <div className="relative">
      <Image
        src={`/flags/flag_${currentOption?.value}_16.svg`}
        alt={currentOption?.label || ""}
        width={48}
        height={48}
        style={{ width: "auto", height: "auto" }}
        className="absolute left-3 top-[38px] flex items-center justify-center pointer-events-none"
      />
      <Select
        {...props}
        label={label}
        options={options}
        setCurrentOption={setCurrentOption}
        className={className}
      />
    </div>
  );
}
