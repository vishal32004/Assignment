import React from 'react';

interface ButtonProps {
  text: string;
}

const Button: React.FC<ButtonProps> = ({ text }) => {
  return (
    <div className="relative">
      <button className="bg-blue-500 text-white rounded-md px-2 py-1">
        {text}
      </button>
    </div>
  );
};

export default Button;
