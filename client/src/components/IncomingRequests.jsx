import { useEffect, useState } from "react";
import apiClient from "../api/apiClient.js";

export default function IncomingRequests({ onAccepted }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [respondingId, setRespondingId] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadRequests() {
      try {
        const data = await apiClient("/api/friends/requests");

        if (isMounted) {
          setRequests(data.requests);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadRequests();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleRespond = async (requestId, status) => {
    setRespondingId(requestId);
    setError(null);
    try {
      await apiClient(`/api/friends/requests/${requestId}`, {
        method: "PATCH",
        body: { status },
      });

      // Remove it from the list either way — accepted or rejected, it's resolved
      setRequests((prev) => prev.filter((r) => r._id !== requestId));

      if (status === "accepted") {
        onAccepted?.();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setRespondingId(null);
    }
  };

  if (loading) {
    return <p className="p-4 text-sm text-slate-500">Loading requests…</p>;
  }

  if (error) {
    return <p className="p-4 text-sm text-red-400">{error}</p>;
  }

  if (requests.length === 0) {
    return <p className="p-4 text-sm text-slate-500">No pending friend requests.</p>;
  }

  return (
    <ul className="divide-y divide-white/5">
      {requests.map((request) => (
        <li key={request._id} className="flex items-center gap-3 px-4 py-3">
          <img
            src={request.sender.profilePicture || "/default-avatar.png"}
            alt={request.sender.name}
            className="h-10 w-10 rounded-full object-cover"
          />
          <span className="flex-1 text-sm font-medium">{request.sender.name}</span>
          <button
            onClick={() => handleRespond(request._id, "accepted")}
            disabled={respondingId === request._id}
            className="rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-slate-900 hover:bg-slate-200 disabled:opacity-50"
          >
            Accept
          </button>
          <button
            onClick={() => handleRespond(request._id, "rejected")}
            disabled={respondingId === request._id}
            className="rounded-lg border border-white/15 px-3 py-1.5 text-xs text-slate-300 hover:bg-white/10 disabled:opacity-50"
          >
            Reject
          </button>
        </li>
      ))}
    </ul>
  );
}