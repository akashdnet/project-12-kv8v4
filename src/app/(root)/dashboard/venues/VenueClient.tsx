"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchVenue } from "@/utils/actions";
import { IVenue } from "@/types/allTypes";
import Skeleton from "./loading";
import DeleteConfirmModal from "./DeleteConfirmModal";
import Manager from "./Manager";
import Form from "./Form";

export default function VenueClient() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["venue"],
    queryFn: fetchVenue,
  });


  const [editingPost, setEditingPost] = useState<IVenue | null>(null);
  const [duplicatingPost, setDuplicatingPost] = useState<IVenue | null>(null);
  const [deletingPostId, setDeletingPostId] = useState<string | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter posts based on search term
  const filteredPosts = data?.filter((event: IVenue) =>
    event.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <Skeleton />;

  if (error)
    return (
      <p className="flex w-full m-auto justify-center items-center min-h-screen text-red-500 text-center">
        Error fetching Venue
      </p>
    );

  return (
    <div className="flex flex-col h-screen">
      
      <Manager onSearch={setSearchTerm} />

      
      <div className="w-full p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20 mt-6">
        <table className="w-full border-collapse text-white">
          <thead>
            <tr className="border-b border-white/30">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-left">Summary</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts?.map((event: IVenue) => (
              <tr
                key={event.slug}
                className="border-b border-white/20 hover:bg-white/20 transition"
              >
                <td className="p-2">{event.name}</td>
                <td className="p-2">{event.location}</td>
                <td className="p-2">{event.summary}</td>
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
                    onClick={() => setDeletingPostId(event.slug)}
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
        <Form data={editingPost} onClose={() => setEditingPost(null)} />
      )}
      {duplicatingPost && (
        <Form
          data={{ ...duplicatingPost}}
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
