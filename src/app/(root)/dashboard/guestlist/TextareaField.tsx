// components/TextareaField.tsx
"use client";

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
  placeholder = "",
}: TextareaFieldProps) {
  return (
    <div className="mb-4">
      <label className="block mb-2">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={4}
        className="w-full p-2 bg-white/20 rounded text-white"
      />
    </div>
  );
}