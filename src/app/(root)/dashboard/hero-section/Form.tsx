// components/EventForm.tsx
"use client";

import InputField from "./InputField";
import { IHero } from "@/types/allTypes";
import CloudinaryUpload from "./CloudinaryUpload";

interface FormProps {
  formData?: IHero | null;
  isSaving: boolean;
  handleSave:()=> void;
  handleChange:(e: any)=>void;
  setFormData:(prev :any)=>void;
}

export default function EventForm({ formData, handleChange, handleSave, isSaving, setFormData }: FormProps) {
  

  return (
    <div className="w-full flex justify-center items-center ">
      <div className="flex-1 w-full  max-w-4xl p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20 text-white overflow-auto max-h-[90vh]">
        <h2 className="text-2xl font-semibold mb-4">Create Hero Sections</h2>

        {/* Title */}
        <InputField
          label="Title"
          name="title"
          value={formData?.title}
          onChange={handleChange}
          placeholder="Hero section title"
        />
        {/* SubTitle */}
        <InputField
          label="Subtitle"
          name="subTitle"
          value={formData?.subTitle}
          onChange={handleChange}
          placeholder="Hero section subtitle"
        />
        
       

        {/* Main Image Upload */}
      <div className="mb-4">
        <CloudinaryUpload
          value={formData?.image}
          label="Feature Image"
          onChange={(url) =>
            setFormData((prev:any ) => ({ ...prev, image: url }))
          }
        />
      </div>






        {/* Save Button */}
        <div className="flex gap-4 mt-6 justify-end">
          {/* <button
            onClick={onClose}
            type="button"
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 transition rounded"
          >
            Cancel
          </button> */}
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`px-4 py-2 rounded ${
              isSaving ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            } text-white transition`}
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}