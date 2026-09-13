import { useEffect, useState } from "react";
import apiClient from "../api/apiClient.js";

export default function ConversationList({ activeConversationId, onSelectConversation }) {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadAcceptedFriends() {
      try {
        const data = await apiClient("/api/friends");

        setFriends(data.friends || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadAcceptedFriends();
  }, []);

  const handleSelectFriend = async (friend) => {
    try {
      const data = await apiClient("/api/messages/conversations", {
        method: "POST",
        body: { participantId: friend._id },
      });

      onSelectConversation(data.conversation._id, {
        name: friend.name,
        profilePicture: friend.profilePicture,
      });
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p className="p-4 text-sm text-slate-500">Loading friends…</p>;
  if (error) return <p className="p-4 text-sm text-red-400">{error}</p>;
  if (friends.length === 0) {
    return (
      <p className="flex-1 p-4 text-sm text-slate-500">
        No friends yet — invite someone to start chatting.
      </p>
    );
  }

  return (
    <ul className="flex-1 divide-y divide-white/5 overflow-y-auto">
      {friends.map((friend) => (
        <li key={friend._id}>
          <button
            onClick={() => handleSelectFriend(friend)}
            className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-white/5 ${
              activeConversationId === friend._id ? "bg-white/10" : ""
            }`}
          >
            <img
              src={friend.profilePicture || "/default-avatar.png"}
              alt={friend.name}
              className="h-10 w-10 rounded-full object-cover"
            />
            <span className="text-sm font-medium">{friend.name}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}