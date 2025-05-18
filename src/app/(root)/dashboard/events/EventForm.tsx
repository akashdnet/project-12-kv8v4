// components/EventForm.tsx
"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { createEvent, updateEvent } from "@/utils/actions";
import ArrayInputField from "./ArrayInputField";
import InputField from "./InputField";
import TextareaField from "./TextareaField";
import CheckboxField from "./CheckboxField";
import { IEvent } from "@/types/allTypes";
import CloudinaryUpload from "./CloudinaryUpload";

interface EventFormProps {
  event?: IEvent;
  onClose: () => void;
  isDuplicate?: boolean;
}

export default function EventForm({ event, onClose, isDuplicate = false }: EventFormProps) {
  const [formData, setFormData] = useState({
    name: event?.name || "",
    slug: event?.slug || "",
    recommend: event?.recommend || false,
    startDate: event?.startDate ? new Date(event.startDate).toISOString().split("T")[0] : "",
    startTime: event?.startTime || "",
    mainImage: event?.mainImage || "",
    imageZapierLink: event?.imageZapierLink || "",
    venueAddress: event?.venueAddress || "",
    venueNameFrontEnd: event?.venueNameFrontEnd || "",
    venueNameBackEnd: event?.venueNameBackEnd || "",
    city: event?.city || "",
    bali: event?.bali || false,
    neighborhood: event?.neighborhood || "",
    lineUp: event?.lineUp || [],
    genres: event?.genres || [],
    details: event?.details || "",
    minAge: event?.minAge || undefined,
    cost: event?.cost || undefined,
    promoterMail: event?.promoterMail || "",
    websiteUrl: event?.websiteUrl || "",
    ticketLink: event?.ticketLink || "",
    videoLink: event?.videoLink || "",
    recurring: event?.recurring || "",
    currency: event?.currency || "",
    eventsMap: event?.eventsMap || "",
    catchVenues: event?.catchVenues || [],
    socialFbLink: event?.socialFbLink || "",
    socialTwLink: event?.socialTwLink || "",
    socialWtLink: event?.socialWtLink || "",
    socialOtherLink: event?.socialOtherLink || "",
    meta: event?.meta || "",
    venue: event?.venue || "",
    guestlist: event?.guestlist || false,
  });

  const [isSaving, setIsSaving] = useState(false);
  const queryClient = useQueryClient();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleArrayChange = (field: string) => (updatedArray: string[]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: updatedArray,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);

    try {
      if (isDuplicate || !event) {
        await createEvent(formData);
        toast.success("Event created successfully");
      } else {
        await updateEvent(event.id!, formData);
        toast.success("Event updated successfully");
      }

      queryClient.invalidateQueries({ queryKey: ["events"] });
      onClose();
    } catch (error) {
      toast.error(" Failed to save event.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-20">
      <div className="w-full max-w-4xl p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20 text-white overflow-auto max-h-[90vh]">
        <h2 className="text-2xl font-semibold mb-4">Event Create</h2>

        {/* Name */}
        <InputField
          label="Title"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Event Title"
        />
        
        {/* recommend */}
        <CheckboxField
          label="Recommend"
          name="recommend"
          checked={formData.recommend}
          onChange={handleChange}
        />
        

        {/* Slug */}
        <InputField
          label="Slug"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          placeholder="URL-friendly identifier"
        />

        {/* Start Date */}
        <InputField
          label="Start Date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          type="date"
        />

        {/* Start Time */}
        <InputField
          label="Start Time"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          type="time"
        />

        {/* Main Image Upload */}
      <div className="mb-4">
        <CloudinaryUpload
          value={formData.mainImage}
          onChange={(url) =>
            setFormData((prev) => ({ ...prev, mainImage: url }))
          }
        />
      </div>

        {/* Zapier Image Link */}
        <InputField
          label="Zapier Image Link"
          name="imageZapierLink"
          value={formData.imageZapierLink}
          onChange={handleChange}
          type="url"
          placeholder="https://zapier.com/... "
        />

        {/* Venue Address */}
        <InputField
          label="Venue Address"
          name="venueAddress"
          value={formData.venueAddress}
          onChange={handleChange}
          placeholder="123 Music Street, Dhaka"
        />

        {/* Venue Name Frontend */}
        <InputField
          label="Venue Name (Frontend)"
          name="venueNameFrontEnd"
          value={formData.venueNameFrontEnd}
          onChange={handleChange}
          placeholder="Example: City Stage"
        />

        {/* Venue Name Backend */}
        <InputField
          label="Venue Name (Backend)"
          name="venueNameBackEnd"
          value={formData.venueNameBackEnd}
          onChange={handleChange}
          placeholder="Example: STG_BD_001"
        />

        {/* City */}
        <InputField
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder=""
        />

        {/* Bali */}
        <CheckboxField
          label="Bali"
          name="bali"
          checked={formData.bali}
          onChange={handleChange}
        />

        {/* Neighborhood */}
        <InputField
          label="Neighborhood"
          name="neighborhood"
          value={formData.neighborhood}
          onChange={handleChange}
          placeholder=""
        />

        {/* Line Up */}
        <ArrayInputField
          label="Line Up"
          value={formData.lineUp}
          onChange={handleArrayChange("lineUp")}
        />

        {/* Genres */}
        <ArrayInputField
          label="Genres"
          value={formData.genres}
          onChange={handleArrayChange("genres")}
        />

        {/* Details */}
        <TextareaField
          label="Details"
          name="details"
          value={formData.details}
          onChange={handleChange}
          placeholder="Write about event..."
        />

        {/* Minimum Age */}
        <InputField
          label="Minimum Age"
          name="minAge"
          value={formData.minAge}
          onChange={handleChange}
          type="number"
          placeholder="18"
        />

        {/* Cost */}
        <InputField
          label="Cost"
          name="cost"
          value={formData.cost}
          onChange={handleChange}
          type="number"
          placeholder="500"
        />

        {/* Promoter Mail */}
        <InputField
          label="Promoter Email"
          name="promoterMail"
          value={formData.promoterMail}
          onChange={handleChange}
          type="email"
          placeholder="promoter@example.com"
        />

        {/* Website URL */}
        <InputField
          label="Website URL"
          name="websiteUrl"
          value={formData.websiteUrl}
          onChange={handleChange}
          type="url"
          placeholder="https://example.com "
        />

        {/* Ticket Link */}
        <InputField
          label="Ticket Link"
          name="ticketLink"
          value={formData.ticketLink}
          onChange={handleChange}
          type="url"
          placeholder="https://tickets.example.com "
        />

        {/* Video Link */}
        <InputField
          label="Video Link"
          name="videoLink"
          value={formData.videoLink}
          onChange={handleChange}
          type="url"
          placeholder="https://youtube.com/watch?v=... "
        />

        {/* Recurring */}
        <InputField
          label="Recurring"
          name="recurring"
          value={formData.recurring}
          onChange={handleChange}
          placeholder="Daily, Weekly, Monthly"
        />

        {/* Currency */}
        <InputField
          label="Currency"
          name="currency"
          value={formData.currency}
          onChange={handleChange}
          placeholder="BDT, USD"
        />

        {/* Map Embed */}
        <InputField
          label="Events Map"
          name="eventsMap"
          value={formData.eventsMap}
          onChange={handleChange}
          placeholder="Google Maps embed link"
        />

        {/* Catch Venues */}
        <ArrayInputField
          label="Catch Venues"
          value={formData.catchVenues}
          onChange={handleArrayChange("catchVenues")}
        />

        {/* Social Links */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <InputField
            label="Facebook Link"
            name="socialFbLink"
            value={formData.socialFbLink}
            onChange={handleChange}
            type="url"
            placeholder="https://facebook.com/... "
          />
          <InputField
            label="Twitter Link"
            name="socialTwLink"
            value={formData.socialTwLink}
            onChange={handleChange}
            type="url"
            placeholder="https://twitter.com/... "
          />
          <InputField
            label="WhatsApp Link"
            name="socialWtLink"
            value={formData.socialWtLink}
            onChange={handleChange}
            type="url"
            placeholder="https://wa.me/... "
          />
          <InputField
            label="Other Link"
            name="socialOtherLink"
            value={formData.socialOtherLink}
            onChange={handleChange}
            type="url"
            placeholder="https://instagram.com/... "
          />
        </div>

        {/* Meta Data */}
        <InputField
          label="Meta"
          name="meta"
          value={formData.meta}
          onChange={handleChange}
          placeholder="SEO description"
        />

        {/* Guestlist */}
        <CheckboxField
          label="Guestlist"
          name="guestlist"
          checked={formData.guestlist}
          onChange={handleChange}
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