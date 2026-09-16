import { useState } from "react";

export default function MessageComposer({ conversationId, socket }) {
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmed = text.trim();
    if (!trimmed) return;

    if (!socket?.connected) {
      setError("Connecting to chat server. Please try again in a moment.");
      return;
    }

    setSending(true);
    setError(null);

    socket.emit("sendMessage", { conversationId, text: trimmed }, (response) => {
      setSending(false);

      if (response?.error) {
        setError(response.error);
        return;
      }

      setText("");
      // No manual refresh needed — the sender's own socket also receives
      // "newMessage" via the room broadcast, since io.to(...).emit(...)
      // includes every socket in that room, sender included.
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 border-t border-white/10 p-4"
    >
      <input
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Type a message…"
        disabled={sending}
        className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-white/20"
      />
      <button
        type="submit"
        disabled={sending || !text.trim()}
        className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-200 disabled:opacity-50"
      >
        Send
      </button>
      {error && <span className="text-xs text-red-400">{error}</span>}
    </form>
  );
}