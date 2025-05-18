// components/ArrayInputField.tsx
"use client";

import React, { useState } from "react";

interface ArrayInputFieldProps {
  label: string;
  value: string[];
  onChange: (updatedArray: string[]) => void;
}

export default function ArrayInputField({
  label,
  value = [],
  onChange,
}: ArrayInputFieldProps) {
  const [inputValue, setInputValue] = useState("");

  const handleAddItem = () => {
    if (inputValue.trim() !== "") {
      onChange([...value, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemoveItem = (index: number) => {
    const updated = [...value];
    updated.splice(index, 1);
    onChange(updated);
  };

  return (
    <div className="mb-4">
      <label className="block mb-2">{label}</label>
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={`Add ${label}`}
          className="w-full p-2 bg-white/20 rounded text-white"
        />
        <button
          onClick={handleAddItem}
          type="button"
          className="px-3 py-2 bg-blue-500 hover:bg-blue-600 transition rounded"
        >
          Add
        </button>
      </div>

      <ul className="mt-2 flex flex-wrap gap-2">
        {value.map((item, index) => (
          <li
            key={index}
            className="flex items-center gap-2 mt-2 px-3 py-1 bg-white/20 rounded"
          >
            <span>{item}</span>
            <button
              type="button"
              onClick={() => handleRemoveItem(index)}
              className="text-red-400 hover:text-red-600"
            >
              &times;
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}