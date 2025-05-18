// components/CheckboxField.tsx
"use client";

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
    <div className="flex items-center gap-2 mb-4">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="w-5 h-5"
      />
      <label>{label}</label>
    </div>
  );
}