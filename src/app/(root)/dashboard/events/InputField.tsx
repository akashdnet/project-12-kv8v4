//InputField.tsx
"use client";

import React from "react";

interface InputFieldProps {
  label: string;
  name: string;
  value: string | number | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "date" | "time" | "url" | "email" | "number";
  placeholder?: string;
}

export default function InputField({
  label,
  name,
  value = "",
  onChange,
  type = "text",
  placeholder = "",
}: InputFieldProps) {
  return (
    <div className="mb-4">
      <label className="block mb-2">{label}</label>
      <input
        type={type}
        name={name}
        value={value as string}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-2 bg-white/20 rounded text-white"
      />
    </div>
  );
}