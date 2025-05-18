"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import InputField from "./InputField";
import CheckboxField from "./CheckboxField";
import { createGuestlist, updateGuestlist } from "../../../../utils/actions";
import { IGuestlist } from "@/types/allTypes";
import { useQueryClient } from "@tanstack/react-query";

interface GuestlistFormProps {
  data?: IGuestlist;
  onClose: () => void;
  isDuplicate?: boolean;
}

export default function GuestlistForm({ data, onClose, isDuplicate = false }: GuestlistFormProps) {
  const [formData, setFormData] = useState({
    fullName: data?.fullName ||"",
    email: data?.email ||"",
    phoneNumber: data?.phoneNumber || "",
    numberOfGuests: data?.numberOfGuests || 1,
    termsAccepted: data?.termsAccepted ||false,
    submittedBy: 'admin' as 'admin',
    startDate: data?.startDate || new Date()
  });

  const [isSaving, setIsSaving] = useState(false);
   const queryClient = useQueryClient();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {


    const { name, value, type } = e.target;





    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);

    try {
      if (isDuplicate || !data) {
        await createGuestlist(formData);
        toast.success("Guestlist created successfully");
      } else {
        await updateGuestlist(data.id!, formData);
        toast.success("Guestlist updated successfully");
      }

      queryClient.invalidateQueries({ queryKey: ["guestlist"] });
      onClose();
    } catch (error) {
      toast.error(" Failed to save Guestlist.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-20">
      <div className="w-full max-w-xl p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20 text-white">
        <h2 className="text-2xl font-semibold mb-4">Guestlist Form</h2>

        <InputField
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="John Doe"
        />

        <InputField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john@example.com"
        />

        <InputField
          label="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="01XXXXXXXXX"
        />

        {/* Start Date */}
        <InputField
          label="Start Date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          type="date"
        />

        <InputField
          label="Number of Guests"
          name="numberOfGuests"
          type="number"
          value={formData.numberOfGuests}
          onChange={handleChange}
          placeholder="1"
        />

        <CheckboxField
          label="I accept the terms and conditions"
          name="termsAccepted"
          checked={formData.termsAccepted}
          onChange={handleChange}
        />

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
            {isSaving ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}
