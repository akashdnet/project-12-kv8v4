// components/VenueForm.tsx
"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { createVenue, updateVenue } from "@/utils/actions";
import InputField from "./InputField";
import TextareaField from "./TextareaField";
import ArrayInputField from "./ArrayInputField";;
import { IVenue } from "@/types/allTypes";
import CloudinaryUpload from "./CloudinaryUpload";

interface VenueFormProps {
  venue?: IVenue;
  data?: IVenue;
  onClose: () => boolean | null | any;
  isDuplicate?: boolean;
}

export default function VenueForm({ data:venue, onClose, isDuplicate = false, }: VenueFormProps) {
  const [formData, setFormData] = useState<IVenue>({
    name: venue?.name || "",
    slug: venue?.slug || "",
    location: venue?.location || "",
    venueMail: venue?.venueMail || "",
    date: venue?.date ? new Date(venue.date).toISOString().split("T")[0] : "",
    time: venue?.time || "",
    details: venue?.details || "",
    summary: venue?.summary || "",
    eventAdmin: venue?.eventAdmin || "",
    promoterLink: venue?.promoterLink || "",
    minAge: venue?.minAge || "",
    cost: venue?.cost || "",
    mainImage: venue?.mainImage || "",
    video: venue?.video || "",
    promoterMail: venue?.promoterMail || "",
    facebookLink: venue?.facebookLink || "",
    twitterLink: venue?.twitterLink || "",
    whatsappLink: venue?.whatsappLink || "",
    venuesMap: venue?.venuesMap || "",
    catchEvents: venue?.catchEvents || [],
    meta: venue?.meta || "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const queryClient = useQueryClient();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleArrayChange = (field: keyof IVenue) => (updatedArray: string[]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: updatedArray,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (isDuplicate || !venue) {
        await createVenue(formData);
        toast.success("Venue created successfully");
      } else {
        await updateVenue(venue.slug!, formData); // Assuming slug is unique
        toast.success("Venue updated successfully");
      }
      queryClient.invalidateQueries({ queryKey: ["venue"] });

      onClose();
    } catch (error) {
      toast.error("Failed to save venue.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-20">
      <div className="w-full max-w-3xl p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20 text-white overflow-auto max-h-[90vh]">
        <h2 className="text-2xl font-semibold mb-4">Venue Form</h2>

        <InputField label="Name" name="name" value={formData.name} onChange={handleChange} />
        <InputField label="Slug" name="slug" value={formData.slug} onChange={handleChange} />
        <InputField label="Location" name="location" value={formData.location} onChange={handleChange} />
        <InputField label="Venue Email" name="venueMail" value={formData.venueMail} onChange={handleChange} type="email" />
        <InputField label="Date" name="date" value={formData.date as any} onChange={handleChange} type="date" />
        <InputField label="Time" name="time" value={formData.time} onChange={handleChange} type="time" />
        <TextareaField label="Details" name="details" value={formData.details || ""} onChange={handleChange} />
        <TextareaField label="Summary" name="summary" value={formData.summary || ""} onChange={handleChange} />
        <InputField label="Event Admin" name="eventAdmin" value={formData.eventAdmin} onChange={handleChange} />
        <InputField label="Promoter Link" name="promoterLink" value={formData.promoterLink} onChange={handleChange} />
        <InputField label="Minimum Age" name="minAge" value={formData.minAge} onChange={handleChange} />
        <InputField label="Cost" name="cost" value={formData.cost} onChange={handleChange} />
        
        {/* Cloudinary Upload */}
        <div className="mb-4">
          <CloudinaryUpload
            value={formData.mainImage}
            onChange={(url:any) => setFormData((prev) => ({ ...prev, mainImage: url }))}
          />
        </div>

        <InputField label="Video URL" name="video" value={formData.video} onChange={handleChange} />
        <InputField label="Promoter Email" name="promoterMail" value={formData.promoterMail} onChange={handleChange} type="email" />
        <InputField label="Facebook Link" name="facebookLink" value={formData.facebookLink} onChange={handleChange} />
        <InputField label="Twitter/Instagram Link" name="twitterLink" value={formData.twitterLink} onChange={handleChange} />
        <InputField label="WhatsApp Link" name="whatsappLink" value={formData.whatsappLink} onChange={handleChange} />
        <InputField label="Map Embed URL" name="venuesMap" value={formData.venuesMap} onChange={handleChange} />

        <ArrayInputField label="Catch Events" value={formData.catchEvents || []} onChange={handleArrayChange("catchEvents")} />

        <InputField label="Meta" name="meta" value={formData.meta} onChange={handleChange} />

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
