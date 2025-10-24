import React from "react";
interface InputBoxProps {
  name: string;
  placeholder?: string;
  id?: string;
}

const InputBox = ({ name, placeholder, id }: InputBoxProps) => {
  return (
    <div>
      <label>{name}</label>
      <input id={id} placeholder={placeholder || ""} />
    </div>
  );
};

export default InputBox;
