"use client";
import zxcvbn from "zxcvbn";

export default function PasswordStrengthMeter({
  password,
}: {
  password: string;
}) {
  //Strength labels
  const strengtParametters = [
    {
      text: "Password must be at least 8 characters.",
      color: "bg-red-500",
      textColor: "text-gray-500",
      value: 0,
      message: "Add more characters to meet the minimum length requirement.",
    },
    {
      text: "Password is too weak.",
      color: "bg-orange-500",
      textColor: "text-orange-500",
      value: 1,
      message: "Add uppercase letters, numbers, and special characters.",
    },
    {
      text: "Password needs improvement.",
      color: "bg-orange-500",
      textColor: "text-orange-500",
      value: 2,
      message:
        "Add more variety: uppercase letters, numbers, and special characters.",
    },
    {
      text: "Password is strong.",
      color: "bg-green-500",
      textColor: "text-green-500",
      value: 3,
      message: "Your password meets all requirements.",
    },
    {
      text: "Password is very strong",
      color: "bg-green-500",
      textColor: "text-green-500",
      value: 4,
      message: "Excellent! Your password is very secure.",
    },
  ];
  const checkedPassword = zxcvbn(password);
  // Additional validation to match schema requirements
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password);

  // Adjust strength based on schema requirements
  const adjustedStrength =
    password.length < 8
      ? 0
      : !hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar
        ? 1
        : checkedPassword.score;

  return (
    <div className="flex flex-col gap-2">
      <div className="w-full h-1 bg-gray-200 rounded-full relative">
        <div
          className={`absolute h-full rounded-full ${strengtParametters[adjustedStrength].color}`}
          style={{ width: `${adjustedStrength * 25}%` }}
        ></div>
      </div>
      <div className="text-xs mt-2">
        <div
          className={`${adjustedStrength === 0 ? "text-gray-500" : `${strengtParametters[adjustedStrength].textColor} font-bold`} mr-1`}
        >
          {strengtParametters[adjustedStrength].text}
        </div>
        <div className="text-gray-500">
          {strengtParametters[adjustedStrength].message}
        </div>
      </div>
    </div>
  );
}
