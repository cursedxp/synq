import { HiCheck } from "react-icons/hi2";
import { useState } from "react";

interface CustomCheckBox {
  label: string;
}

export default function Checkbox({ label }: CustomCheckBox) {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const toggleChecked = () => {
    setIsChecked(!isChecked);
  };
  return (
    <div className="max-w-md flex gap-2 items-center">
      <input
        type="checkbox"
        name="checkbox"
        id="checkbox"
        className="hidden"
        checked={isChecked}
        aria-checked={isChecked}
        role="checkbox"
        aria-label="newsletter"
        readOnly
      />
      <div
        className={`w-5 h-5 p-2 border border-zinc-400 rounded-sm hover:border-zinc-900 cursor-pointer relative focus:outline-none ${isChecked ? "bg-zinc-900 border-zinc-900" : ""}`}
        onClick={toggleChecked}
      >
        {isChecked && (
          <HiCheck
            className={`text-lg absolute top-0 left-0 ${isChecked ? "text-white" : ""}`}
          ></HiCheck>
        )}
      </div>
      <label htmlFor="checkbox" onClick={toggleChecked}>
        {label}
      </label>
    </div>
  );
}
