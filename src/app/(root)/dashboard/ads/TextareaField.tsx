// components/TextareaField.tsx
import React from "react";

interface TextareaFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}

export default function TextareaField({
  label,
  name,
  value,
  onChange,
  placeholder,
}: TextareaFieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder:text-white/50 focus:outline-none min-h-[100px]"
      />
    </div>
  );
}