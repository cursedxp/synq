import { FiChevronDown } from "react-icons/fi";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
}

export const Select = ({ label, ...props }: SelectProps) => {
  return (
    <div>
      <label
        htmlFor="select"
        className="text-sm text-black mb-1 cursor-pointer"
      >
        {label}
      </label>
      <div className="relative">
        <select
          {...props}
          id={props?.name}
          className="p-2 rounded-md border border-gray-300 w-full focus:outline-black appearance-none"
        >
          <option value="1">1</option>
        </select>
        <div className="absolute right-2 top-0 h-full flex items-center justify-center">
          <FiChevronDown />
        </div>
      </div>
    </div>
  );
};
