'use client';

import { useState } from "react";
import { createPost, updatePost } from "@/utils/actions";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

interface PostFormProps {
  post?: { id: string; title: string; content: string };
  onClose: () => void;
  isDuplicate?: boolean;
}

export default function PostForm({ post, onClose, isDuplicate = false }: PostFormProps) {
  const [formData, setFormData] = useState({ title: post?.title || "", content: post?.content || "" });
  const [isSaving, setIsSaving] = useState(false);
  const queryClient = useQueryClient();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (isDuplicate || !post) {
        await createPost(formData);
        toast.success("Post created successfully!");
      } else {
        await updatePost(post.id, formData);
        toast.success("Post updated successfully!");
      }
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      onClose();
    } catch (error) {
      toast.error("Failed to save post!");
    }
    setIsSaving(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-10">
      <div className="w-full max-w-md p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20 text-white ">
        <h2 className="text-xl font-semibold mb-4">
          {isDuplicate ? "Duplicate Post" : post ? "Edit Post" : "Create New Post"}
        </h2>
        <label className="text-white">Title</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 bg-white/20 rounded text-white mb-4"
        />
        <label className="text-white">Content</label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          className="w-full p-2 bg-white/20 rounded text-white mb-4"
        />
        <div className="flex gap-4 justify-center">
          <button 
            onClick={handleSave} 
            disabled={isSaving} 
            className={`px-4 py-2 rounded text-white transition ${
              isSaving ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isSaving ? "Saving..." : isDuplicate ? "Duplicate" : post ? "Save" : "Create"}
          </button>
          <button 
            onClick={onClose} 
            className="px-4 py-2 bg-red-500 rounded text-white hover:bg-red-600 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
