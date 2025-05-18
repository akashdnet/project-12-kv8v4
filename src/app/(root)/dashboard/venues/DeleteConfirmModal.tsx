'use client';

import { deleteVenue } from "@/utils/actions";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

interface DeleteConfirmModalProps {
  eventId: string;
  onClose: () => void;
}

export default function DeleteConfirmModal({ eventId, onClose }: DeleteConfirmModalProps) {
  const queryClient = useQueryClient();
  
  const handleDelete = async () => {
    try {
      await deleteVenue(eventId);
      setTimeout(() => toast.success("Venue deleted successfully!"), 300); // Add a slight delay
      queryClient.invalidateQueries({ queryKey: ["venue"] });
      onClose();
    } catch (error) {
      setTimeout(() => toast.error("Failed to delete venue!"), 300);
    }
  };
  

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50">
      <div className="w-1/3 p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20 text-white text-center">
        <h2 className="text-xl font-semibold mb-4">Are you sure?</h2>
        <p className="mb-6">Do you really want to delete this venue? This action cannot be undone.</p>
        <div className="flex justify-center gap-4">
          <button 
            onClick={handleDelete} 
            className="px-4 py-2 bg-red-500 rounded hover:bg-red-600 transition"
          >
            Yes, Delete
          </button>
          <button 
            onClick={onClose} 
            className="px-4 py-2 bg-gray-500 rounded hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
