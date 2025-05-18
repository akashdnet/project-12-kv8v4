"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "@/utils/actions";
import { IPost } from "@/types/allTypes";
import Skeleton from "./loading";
import DeleteConfirmModal from "./DeleteConfirmModal";
import PostManager from "./PostManager";
import PostForm from "./PostForm";

export default function PostsClient() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const [editingPost, setEditingPost] = useState<IPost | null>(null);
  const [duplicatingPost, setDuplicatingPost] = useState<IPost | null>(null);
  const [deletingPostId, setDeletingPostId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter posts based on search term
  const filteredPosts = data?.filter((post: IPost) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <Skeleton/>;

  if (error)
    return (
      <p className="flex justify-center items-center min-h-screen text-red-500 text-center">
        Error fetching posts
      </p>
    );

  return (
    <div className="flex flex-col h-screen">
      {/* Post Search & Create */}
      <PostManager onSearch={setSearchTerm} />

      {/* Post List */}
      <div className="w-full p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20 mt-6">
        <table className="w-full border-collapse text-white">
          <thead>
            <tr className="border-b border-white/30">
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Content</th>
              <th className="p-3 text-left">Created At</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts?.map((post: IPost) => (
              <tr
                key={post.id}
                className="border-b border-white/20 hover:bg-white/20 transition"
              >
                <td className="p-2">{post.id}</td>
                <td className="p-2">{post.title}</td>
                <td className="p-2">{post.content}</td>
                <td className="p-2">
                  {new Date(post.createdAt as string).toLocaleString()}
                </td>
                <td className="p-2 flex gap-2">
                  <button
                    onClick={() => setEditingPost(post)}
                    className="px-3 py-1 bg-blue-500 rounded text-white hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDuplicatingPost(post)}
                    className="px-3 py-1 bg-yellow-500 rounded text-white hover:bg-yellow-600"
                  >
                    Duplicate
                  </button>
                  <button
                    onClick={() => setDeletingPostId(post.id)}
                    className="px-3 py-1 bg-red-500 rounded text-white hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingPost && (
        <PostForm post={editingPost} onClose={() => setEditingPost(null)} />
      )}
      {duplicatingPost && (
        <PostForm
          post={{ ...duplicatingPost, id: "" }}
          onClose={() => setDuplicatingPost(null)}
          isDuplicate={true}
        />
      )}

      {deletingPostId && (
        <DeleteConfirmModal
          postId={deletingPostId}
          onClose={() => setDeletingPostId(null)}
        />
      )}
    </div>
  );
}
