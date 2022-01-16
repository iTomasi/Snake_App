import React from "react";

interface IInputProps {
    className?: string;
    type?: "text" | "password";
    placeholder: string;
    name: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const Input = ({ className = "", type = "text", placeholder, name, value, onChange }: IInputProps) => {
    return (
        <input
            className={`iw-w-full iw-bg-stone-900 iw-px-3 iw-py-2 iw-outline-none iw-rounded focus:iw-outline-violet-500 ${className}`}
            type={type}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
        />
    )
}

export default Input;