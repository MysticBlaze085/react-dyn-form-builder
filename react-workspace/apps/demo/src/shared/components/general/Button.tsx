import React from 'react';
interface ButtonProps {
    children: React.ReactNode;
    [key: string]: any;
  }
  
 const Button: React.FC<ButtonProps> = (props) => {
    return (
      <button
        className="select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button"
        {...props}
      >
        {props.children}
      </button>
    );
  };

  export default Button;