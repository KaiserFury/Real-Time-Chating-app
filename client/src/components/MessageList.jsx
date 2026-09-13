import { useEffect, useRef, useState } from "react";
import apiClient from "../api/apiClient.js";

export default function MessageList({ conversationId, refreshKey }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!conversationId) return;

    async function loadMessages() {
      setLoading(true);
      setError(null);

      try {
        const data = await apiClient(
          `/api/messages/${conversationId}?page=1&limit=20`,
        );

        // The API already returns oldest-to-newest (server reverses the page
        // internally), so no re-sorting needed here.
        setMessages(data.messages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadMessages();
  }, [conversationId, refreshKey]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (loading) {
    return (
      <div className="flex-1 p-4 text-sm text-slate-500">Loading messages…</div>
    );
  }

  if (error) {
    return <div className="flex-1 p-4 text-sm text-red-400">{error}</div>;
  }

  return (
    <div className="flex-1 space-y-3 overflow-y-auto p-4">
      {messages.length === 0 && (
        <p className="text-sm text-slate-500">No messages yet — say hello.</p>
      )}

      {messages.map((message) => (
        <div key={message._id} className="flex flex-col">
          <span className="text-xs font-medium text-slate-400">
            {message.sender?.name || "Unknown"}
          </span>
          <p className="mt-0.5 max-w-md rounded-lg bg-white/5 px-3 py-2 text-sm text-white">
            {message.text}
          </p>
        </div>
      ))}

      <div ref={bottomRef} />
    </div>
  );
}