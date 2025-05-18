"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "@/utils/actions";
import { IEvent } from "@/types/allTypes";
import Skeleton from "./loading";
import DeleteConfirmModal from "./DeleteConfirmModal";
import EventManager from "./EventManager";
import EventForm from "./EventForm";
import Image from "next/image";

export default function PostsClient() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  const [editingPost, setEditingPost] = useState<IEvent | null>(null);
  const [duplicatingPost, setDuplicatingPost] = useState<IEvent | null>(null);
  const [deletingPostId, setDeletingPostId] = useState<string | undefined>(
    undefined
  );
  const [searchTerm, setSearchTerm] = useState("");

  // Filter posts based on search term
  const filteredPosts = data?.filter((event: IEvent) =>
    event.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <Skeleton />;

  if (error)
    return (
      <p className="flex justify-center items-center min-h-screen text-red-500 text-center">
        Error fetching posts
      </p>
    );

  return (
    <div className="flex flex-col h-screen">
      {/* Post Search & Create */}
      <EventManager onSearch={setSearchTerm} />

      {/* Post List */}
      <div className="w-full p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20 mt-6">
        <table className="w-full border-collapse text-white">
          <thead>
            <tr className="border-b border-white/30">
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Details</th>
              <th className="p-3 text-left">Start Date</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts?.map((event: IEvent) => (
              <tr
                key={event.id}
                className="border-b border-white/20 hover:bg-white/20 transition"
              >
                <td className="p-2">
                  <Image
                    src={event.mainImage as string}
                    width={80}
                    height={80}
                    alt={"image"}
                    loading="lazy"
                    className="object-cover rounded"
                  />
                </td>
                <td className="p-2">{event.name}</td>
                <td className="p-2">{event.details}</td>
                <td className="p-2">
                  {new Date(event.startDate).toLocaleString()}
                </td>
                <td className="p-2 flex gap-2">
                  <button
                    onClick={() => setEditingPost(event)}
                    className="px-3 py-1 bg-blue-500 rounded text-white hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDuplicatingPost(event)}
                    className="px-3 py-1 bg-yellow-500 rounded text-white hover:bg-yellow-600"
                  >
                    Duplicate
                  </button>
                  <button
                    onClick={() => setDeletingPostId(event.id)}
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
        <EventForm event={editingPost} onClose={() => setEditingPost(null)} />
      )}
      {duplicatingPost && (
        <EventForm
          event={{ ...duplicatingPost, id: "" }}
          onClose={() => setDuplicatingPost(null)}
          isDuplicate={true}
        />
      )}

      {deletingPostId && (
        <DeleteConfirmModal
          eventId={deletingPostId}
          onClose={() => setDeletingPostId(undefined)}
        />
      )}
    </div>
  );
}
