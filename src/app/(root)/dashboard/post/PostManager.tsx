'use client';

import { useState, useCallback } from "react";
import { debounce } from "lodash";
import PostForm from "./PostForm";

interface PostManagerProps {
  onSearch: (searchTerm: string) => void;
}

export default function PostManager({ onSearch }: PostManagerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Debounced Search Handler
  const debouncedSearch = useCallback(
    debounce((term: string) => {
      onSearch(term);
    }, 500),
    [onSearch]
  );

  return (
    <>
      <div className="flex justify-between items-center w-full p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20">
        <input
          type="text"
          placeholder="Search post title..."
          onChange={(e) => debouncedSearch(e.target.value)}
          className="w-1/3 p-2 bg-white/20 rounded text-white"
        />
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="px-4 py-2 bg-blue-500 rounded text-white hover:bg-blue-600 transition"
        >
          Create New Post
        </button>
      </div>

      {/* Properly Centered Create Post Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-10 bg-black/50">
          <PostForm onClose={() => setIsModalOpen(false)} />
        </div>
      )}
    </>
  );
}
