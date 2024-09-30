import React from "react";

interface ComponentsProps {
  values: string;  // specify the expected type, e.g., string
  setValues: (value: string) => void;
  setFocused: (value: string | null) => void;
  focused: string | null;
  txt: string;
  valuesFouce: string;
  typeofInput?: string;
}

const InputComponent: React.FC<ComponentsProps> = ({
  values = "",  // Default to empty string
  setValues,
  setFocused,
  focused,
  txt,
  valuesFouce,
  typeofInput = "text",
}) => {
  return (
    <div>
      <div className="w-full container relative pt-10">
        <input
          className={`w-full outline-none rounded-2xl p-5 shadow-md shadow-black-300 pl-7 ${
            typeofInput === "date" ? "min-w-full h-16" : ""
          }`}
          type={typeofInput}
          value={values}
          onChange={(e) => setValues(e.target.value)}
          onFocus={() => setFocused(valuesFouce)}
          onBlur={() => setFocused(null)}
        />
        {/* For date input */}
        <label
          className={`transition-all pointer-events-none text-gray-400 absolute ${
            typeofInput === "date" ? "top-4" : "top-16 hidden"
          } left-10`}
        >
          {txt}
        </label>
        {/* For other inputs */}
        <label
          className={`${
            typeofInput === "date" ? "hidden" : ""
          } transition-all pointer-events-none text-gray-400 absolute ${
            values || focused === valuesFouce ? "top-7" : "top-16"
          } left-10`}
        >
          {txt}
        </label>
      </div>
    </div>
  );
};

export default InputComponent;
