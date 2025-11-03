// components/InputBox.tsx
import { type UseFormRegisterReturn } from "react-hook-form";

interface InputBoxProps {
  label: string;
  register: UseFormRegisterReturn;
  placeholder?: string;
  type?: string;
  error?: string;
  required?: boolean;
}

const InputBox: React.FC<InputBoxProps> = ({
  label,
  register,
  placeholder,
  type = "text",
  error,
  required,
}) => {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <input
        {...register}
        type={type}
        placeholder={placeholder}
        className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500
                   transition-all duration-200"
      />
      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
    </div>
  );
};
export default InputBox;
