"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchGuestlist } from "@/utils/actions";
import { IGuestlist } from "@/types/allTypes";
import Skeleton from "./loading";
import DeleteConfirmModal from "./DeleteConfirmModal";
import Manager from "./Manager";
import GuestlistForm from "./Form";

export default function GuestlistClient() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["guestlist"],
    queryFn: fetchGuestlist,
  });

  const [editingPost, setEditingPost] = useState<IGuestlist | null>(null);
  const [duplicatingPost, setDuplicatingPost] = useState<IGuestlist | null>(null);
  const [deletingPostId, setDeletingPostId] = useState<string | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter posts based on search term
  const filteredPosts = data?.filter((event: IGuestlist) =>
    event.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
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
      <Manager onSearch={setSearchTerm} />

      {/* Post List */}
      <div className="w-full p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20 mt-6">
        <table className="w-full border-collapse text-white">
          <thead>
            <tr className="border-b border-white/30">
              <th className="p-3 text-left">Full Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Contact Number</th>
              <th className="p-3 text-left">Number of Guest(s)</th>
              <th className="p-3 text-left">Form submitted by</th>
              <th className="p-3 text-left">Start Date</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts?.map((event: IGuestlist) => (
              <tr
                key={event.email}
                className="border-b border-white/20 hover:bg-white/20 transition"
              >
                <td className="p-2">{event.fullName}</td>
                <td className="p-2">{event.email}</td>
                <td className="p-2">{event.phoneNumber}</td>
                <td className="p-2">{event.numberOfGuests}</td>
                <td className="p-2">{event.submittedBy}</td>
                <td className="p-2">
                {event.createdAt ? new Date(event.createdAt).toLocaleString() : "No date available"}
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
        <GuestlistForm data={editingPost} onClose={() => setEditingPost(null)} />
      )}
      {duplicatingPost && (
        <GuestlistForm
          data={{ ...duplicatingPost, id: "" }}
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
