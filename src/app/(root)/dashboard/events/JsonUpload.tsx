"use client";

import { useQueryClient } from "@tanstack/react-query";
import { uploadJsonData } from "../../../../utils/jsonActions";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface FormProps {
  onClose: () => void;
}

export default function JsonUpload({ onClose }: FormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const queryClient = useQueryClient();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a JSON file.");
      return;
    }

    setIsUploading(true);
    const toastId = toast.loading("Uploading JSON...");

    try {
      const text = await file.text();
      const json = JSON.parse(text);

      const res = await uploadJsonData(json);
      toast.success(res?.message || "Upload successful", { id: toastId });
      queryClient.invalidateQueries({ queryKey: ["events"] });
      onClose(); // Optional: modal close after success
    } catch (err: any) {
      toast.error("Upload failed: " + err.message, { id: toastId });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-20">
      <div className="flex flex-col">
        <div className="space-y-4 p-4 bg-blue-400/50 p-8 rounded-2xl">
          <input
            type="file"
            accept=".json"
            onChange={handleFileChange}
            className="bg-amber-100/50 mr-5 p-3"
          />
          <div className="flex gap-5">
            <button
              onClick={handleUpload}
              disabled={isUploading}
              className={`px-4 py-2 rounded text-white ${
                isUploading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600"
              }`}
            >
              {isUploading ? "Uploading..." : "Upload JSON"}
            </button>
            <button
              onClick={onClose}
              disabled={isUploading}
              className="px-4 py-2 bg-red-600 text-white rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
