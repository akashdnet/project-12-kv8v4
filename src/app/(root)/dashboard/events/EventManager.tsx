"use client";

import { useState, useCallback } from "react";
import { debounce } from "lodash";
import EventForm from "./EventForm"; // ধরে নিলাম আপনার EventForm.tsx আছে
import JsonUpload from "./JsonUpload";

interface EventManagerProps {
  onSearch: (searchTerm: string) => void;
}

export default function EventManager({ onSearch }: EventManagerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isJSONOpen, setIsJSONOpen] = useState(false);

  // Debounced search
  const debouncedSearch = useCallback(
    debounce((term: string) => {
      onSearch(term);
    }, 500),
    [onSearch]
  );

  return (
    <>
      {/* Top Bar with Search & Create Button */}
      <div className="flex justify-between items-center w-full p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20">
        <input
          type="text"
          placeholder="Search event title..."
          onChange={(e) => debouncedSearch(e.target.value)}
          className="w-1/3 p-2 bg-white/20 rounded text-white placeholder:text-white/70"
        />

        
        <div className="flex gap-4">
          <button
          onClick={() => setIsJSONOpen(true)}
          className="px-4 py-2  bg-cyan-500 rounded text-white hover:bg-cyan-600 transition"
          >
            Upload JSON FIle
          </button>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-purple-500 rounded text-white hover:bg-purple-600 transition"
        >
          Create New Event
        </button>
        </div>
      </div>

      {/* Modal for Creating Event */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-10 bg-black/50">
          <EventForm onClose={() => setIsModalOpen(false)} />
        </div>
      )}
      {/* Modal for uploading JSON data */}
      {isJSONOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-10 bg-black/50">
          <JsonUpload onClose={() => setIsJSONOpen(false)} />
        </div>
      )}
    </>
  );
}