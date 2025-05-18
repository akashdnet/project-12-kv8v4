// components/GalleryForm.tsx
"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { createAd, updateAd } from "@/utils/actions";
import InputField from "./InputField";
import CloudinaryUpload from "./CloudinaryUpload";
import { IAd } from "@/types/allTypes";

interface FormProps {
  data?: IAd;
  onClose: () => void;
  isDuplicate?: boolean;
}

export default function GalleryForm({
  data: gallery,
  onClose,
  isDuplicate = false,
}: FormProps) {
  const [formData, setFormData] = useState<IAd>({
    title: gallery?.title || "",
    image: gallery?.image || "",
    position: gallery?.position || -1,
    createdAt: gallery?.createdAt || undefined
    
  });

  const [isSaving, setIsSaving] = useState(false);
  const queryClient = useQueryClient();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };



  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (isDuplicate || !gallery) {
        await createAd(formData);
        toast.success("Ad created successfully");
      } else {
        await updateAd(gallery.position!, formData);
        toast.success("Ad updated successfully");
      }
      queryClient.invalidateQueries({ queryKey: ["ad"] });
      onClose();
    } catch (error) {
      toast.error("Failed to save Ad.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-20">
      <div className="w-full max-w-3xl p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20 text-white overflow-auto max-h-[90vh]">
        <h2 className="text-2xl font-semibold mb-4">Ad Form</h2>

        {/* Feature Image Upload */}
        <div className="mb-4">
          {/* <label className="block text-sm font-medium mb-1">Feature Image</label> */}
          <CloudinaryUpload
            value={formData.image}
            title="Feature Image"
            onChange={(url: string) =>
              setFormData((prev) => ({ ...prev, image: url }))
            }
          />
        </div>

        {/* Position */}
        <InputField
          label="Position"
          name="position"
          value={formData.position}
          onChange={handleChange}
          placeholder="Enter ad Position"
          maxLength={10}
          required
        />
        {/* Title */}
        <InputField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter gallery title"
          maxLength={150}
        />

        {/* Save Button */}
        <div className="flex gap-4 mt-6 justify-end">
          <button
            onClick={onClose}
            type="button"
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 transition rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`px-4 py-2 rounded ${
              isSaving
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white transition`}
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
