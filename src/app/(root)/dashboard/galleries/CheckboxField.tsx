// components/CheckboxField.tsx
import React from "react";

interface CheckboxFieldProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CheckboxField({
  label,
  name,
  checked,
  onChange,
}: CheckboxFieldProps) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={checked}
        onChange={onChange}
        className="w-5 h-5 accent-blue-500"
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );
}