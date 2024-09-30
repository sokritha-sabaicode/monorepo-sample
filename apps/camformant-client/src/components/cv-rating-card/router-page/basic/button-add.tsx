
import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <div className=" w-full container relative pt-10 ">
    <button
      onClick={onClick}
      className="w-full  outline-none rounded-2xl flex items-center justify-between p-5 pl-7 bg-orange-500 text-white  shadow-md hover:bg-orange-600 transition-colors"
    >
      <span>{label}</span>
      <span className="ml-2">+</span>
    </button>
    </div>
  );
};

export default Button;
