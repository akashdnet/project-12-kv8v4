"use client";

import React, { useState } from "react";
import { uploadImage } from "@/utils/server-actions";

interface CloudinaryUploadProps {
  value?: string;
  title?:string;
  onChange: (url: string) => void;
}

export default function CloudinaryUpload({ value, title="Main Image", onChange }: CloudinaryUploadProps) {
  const [preview, setPreview] = useState<string | null>(value || null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const uploadFile = async (file: File) => {
    const data = new FormData();
    data.append("file", file);

    setIsUploading(true);
    setError("");

    try {
      const result = await uploadImage(data);

      if (result.success && result.url) {
        setPreview(result.url);
        onChange(result.url);
      } else {
        setError(result.message || "Upload failed");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      uploadFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleRemove = () => {
    setPreview(null);
    onChange("");
  };

  return (
    <div className="mb-4">
      <label className="block mb-2">{title}</label>

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={`border-2 border-dashed p-6 text-center rounded cursor-pointer ${
          isUploading ? "bg-blue-500 bg-opacity-10" : "bg-white/10"
        }`}
      >
        {preview ? (
          <div className="relative inline-block">
            <img src={preview} alt="Uploaded preview" className="max-h-40 mx-auto rounded shadow" />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-0 right-0 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm -top-2 -right-2"
            >
              ×
            </button>
          </div>
        ) : isUploading ? (
          <>
            <p>Uploading...</p>
            <div className="mt-3 flex justify-center">
              <div className="w-8 h-8 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
            </div>
          </>
        ) : (
          <>
            <p>Drag an image here or click to select</p>
            <input
              type="file"
              name="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={isUploading}
              className="hidden"
              id="cloudinary-upload-input"
            />
            <label
              htmlFor="cloudinary-upload-input"
              className="mt-2 inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 transition rounded cursor-pointer"
            >
              Browse
            </label>
          </>
        )}
      </div>

      <input type="hidden" name="mainImage" value={preview || ""} />
      {error && <p className="text-red-400 mt-2">{error}</p>}
    </div>
  );
}
