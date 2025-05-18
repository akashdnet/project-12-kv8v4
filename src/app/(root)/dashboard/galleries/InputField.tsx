// components/InputField.tsx
import React from "react";

interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  maxLength?: number;
  placeholder?: string;
}

export default function InputField({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  maxLength,
  placeholder,
}: InputFieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        maxLength={maxLength}
        placeholder={placeholder}
        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder:text-white/50 focus:outline-none"
      />
    </div>
  );
}