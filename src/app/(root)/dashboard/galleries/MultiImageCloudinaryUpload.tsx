"use client";

import React, { useState } from "react";
import { uploadImage } from "@/utils/server-actions"; // assuming it works for single upload

interface MultiImageCloudinaryUploadProps {
  value?: string[];
  title?: string;
  onChange: (urls: string[]) => void;
  maxImages?: number;
}

export default function MultiImageCloudinaryUpload({
  value = [],
  title = "Gallery Images",
  onChange,
  maxImages = 10,
}: MultiImageCloudinaryUploadProps) {
  const [previews, setPreviews] = useState<string[]>(value || []);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const uploadFile = async (file: File) => {
    const data = new FormData();
    data.append("file", file);

    try {
      const result = await uploadImage(data); // your server action

      if (result.success && result.url) {
        return result.url; // return single URL
      } else {
        throw new Error(result.message || "Upload failed");
      }
    } catch (err) {
      setError("One or more images failed to upload.");
      return null;
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files.length === 0) return;

    setIsUploading(true);
    setError("");

    try {
      const uploadPromises = Array.from(files).map(file => uploadFile(file));
      const uploadedUrls = await Promise.all(uploadPromises);
      const successfulUrls = uploadedUrls.filter((url): url is string => url !== null);

      const combinedUrls = [...value, ...successfulUrls].slice(0, maxImages);
      setPreviews(combinedUrls);
      onChange(combinedUrls);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;

    if (!files || files.length === 0) return;

    setIsUploading(true);
    setError("");

    try {
      const uploadPromises = Array.from(files).map(file => uploadFile(file));
      const uploadedUrls = await Promise.all(uploadPromises);
      const successfulUrls = uploadedUrls.filter((url): url is string => url !== null);

      const combinedUrls = [...value, ...successfulUrls].slice(0, maxImages);
      setPreviews(combinedUrls);
      onChange(combinedUrls);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleRemove = (index: number) => {
    const updatedPreviews = previews.filter((_, i) => i !== index);
    setPreviews(updatedPreviews);
    onChange(updatedPreviews);
  };

  return (
    <div className="mb-4">
      <label className="block mb-2">{title}</label>

      {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={`border-2 border-dashed p-6 text-center rounded cursor-pointer ${
          isUploading ? "bg-blue-500 bg-opacity-10" : "bg-white/10"
        }`}
      >
        {isUploading ? (
          <>
            <p>Uploading...</p>
            <div className="mt-3 flex justify-center">
              <div className="w-8 h-8 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
            </div>
          </>
        ) : (
          <>
            <p>Drag images here or click to select</p>
            <input
              type="file"
              name="images"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              disabled={isUploading}
              className="hidden"
              id="multi-cloudinary-upload-input"
            />
            <label
              htmlFor="multi-cloudinary-upload-input"
              className="mt-2 inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 transition rounded cursor-pointer"
            >
              Browse
            </label>
          </>
        )}
      </div>

      {/* Preview Section */}
      {previews.length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {previews.map((url, index) => (
            <div key={index} className="relative group">
              <img
                src={url}
                alt={`Preview ${index}`}
                className="w-full h-32 object-cover rounded-md"
              />
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                title="Remove image"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Hidden Inputs */}
      {previews.map((url, index) => (
        <input
          key={index}
          type="hidden"
          name={`image-${index}`}
          value={url}
        />
      ))}

      {/* Error Message */}
      {error && <p className="text-red-400 mt-2">{error}</p>}
    </div>
  );
}