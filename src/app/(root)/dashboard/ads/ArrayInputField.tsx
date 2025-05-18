// components/ArrayInputField.tsx
import React from "react";

interface ArrayInputFieldProps {
  label: string;
  value: string[];
  onChange: (arr: string[]) => void;
  placeholder?: string;
}

export default function ArrayInputField({
  label,
  value,
  onChange,
  placeholder = "Enter a value",
}: ArrayInputFieldProps) {
  const addField = () => onChange([...value, ""]);
  const removeField = () => onChange(value.slice(0, -1));
  const handleChange = (index: number, newValue: string) => {
    const updated = [...value];
    updated[index] = newValue;
    onChange(updated);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">{label}</label>
      {value.map((val, index) => (
        <div key={index} className="flex gap-2 mb-2">
          <input
            type="text"
            value={val}
            onChange={(e) => handleChange(index, e.target.value)}
            placeholder={placeholder}
            className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded text-white focus:outline-none"
          />
          {index === value.length - 1 && (
            <button
              type="button"
              onClick={addField}
              className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded"
            >
              +
            </button>
          )}
          {value.length > 1 && (
            <button
              type="button"
              onClick={removeField}
              className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
            >
              -
            </button>
          )}
        </div>
      ))}
    </div>
  );
}