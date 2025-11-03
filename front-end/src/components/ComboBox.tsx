// components/ComboBox.tsx
import { type UseFormRegisterReturn } from "react-hook-form";

interface ComboBoxProps {
  label: string;
  register: UseFormRegisterReturn;
  options: string[];
  placeholder?: string;
  error?: string;
  required?: boolean;
}

const ComboBox: React.FC<ComboBoxProps> = ({
  label,
  register,
  options,
  placeholder = "-- Select --",
  error,
  required,
}) => {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <select
        {...register}
        className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900
                   focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500
                   transition-all duration-200 appearance-none bg-white cursor-pointer"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
          backgroundPosition: "right 0.5rem center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "1.5em 1.5em",
          paddingRight: "2.5rem",
        }}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
    </div>
  );
};
export default ComboBox;
