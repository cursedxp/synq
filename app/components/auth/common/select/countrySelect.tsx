"use client";

import { useState } from "react";
import Image from "next/image";
import Select from "./select";
import countriesData from "@/app/data/countries.json";

interface Country {
  code: string;
  name: string;
  flag: string;
}

const countryOptions = countriesData.countries.map((country: Country) => ({
  label: country.name,
  value: country.code,
  flag: country.flag,
}));

interface CountrySelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
}

export default function CountrySelect({
  label,
  className,
  ...props
}: CountrySelectProps) {
  const [currentOption, setCurrentOption] = useState(countryOptions[0]);

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
        options={countryOptions}
        setCurrentOption={setCurrentOption}
        className={className}
      />
    </div>
  );
}
