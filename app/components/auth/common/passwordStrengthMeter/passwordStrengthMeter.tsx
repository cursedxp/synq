"use client";
import { useState } from "react";
import zxcvbn from "zxcvbn";

//TODO: use typescript types when you implement it in the form
//TODO: check password coming from react hook form and remove state

export default function PasswordStrengthMeter() {
  const [password, setPassword] = useState("2312312");

  //Strength labels
  const strengtParametters = [
    {
      text: "Choose a password with at least 8 characters.",
      color: "bg-red-500",
      textColor: "text-gray-500",
      value: 0,
    },
    {
      text: "This password could be easily guessed.",
      color: "bg-orange-500",
      textColor: "text-orange-500",
      value: 1,
      message:
        "Make it stronger by adding letters, numbers and special characters.",
    },
    {
      text: "This password could be stronger.",
      message:
        "Make it stronger by adding letters, numbers and special characters.",
      color: "bg-orange-500",
      textColor: "text-orange-500",
      value: 1,
    },
    {
      text: "This password is strong.",
      message:
        "Make it very strong by adding letters, numbers and special characters.",
      color: "bg-green-500",
      textColor: "text-green-500",
      value: 2,
    },
    {
      text: "This password is very strong",
      message: "Well done",
      color: "bg-green-500",
      textColor: "text-green-500",
      value: 3,
    },
  ];
  const checkedPassword = zxcvbn(password);
  const passwordStrength = checkedPassword.score;
  console.log(passwordStrength);
  return (
    <div className="flex flex-col gap-2 mt-2">
      <div className="w-full h-1 bg-gray-200 rounded-full relative">
        <div
          className={`absolute h-full rounded-full ${strengtParametters[passwordStrength].color}`}
          style={{ width: `${passwordStrength * 25}%` }}
        ></div>
      </div>
      <div className="text-xs mt-2">
        <div
          className={`${passwordStrength === 0 ? "text-gray-500" : `${strengtParametters[passwordStrength].textColor} font-bold`} mr-1`}
        >
          {strengtParametters[passwordStrength].text}
        </div>
        <div className="text-gray-500">
          {strengtParametters[passwordStrength].message}
        </div>
      </div>
    </div>
  );
}
