import { useState } from "react";
import apiClient from "../api/apiClient.js";

export default function InviteFriend({ onClose }) {
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSending(true);
    setStatus(null);

    try {
      const lookupData = await apiClient(
        `/api/users?username=${encodeURIComponent(username.trim())}`,
      );

      await apiClient("/api/friends/requests", {
        method: "POST",
        body: { receiverId: lookupData.user._id },
      });

      setStatus({ type: "success", message: "Friend request sent!" });
      setUsername("");
    } catch (err) {
      setStatus({ type: "error", message: err.message });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="w-80 rounded-xl border border-white/10 bg-white/5 p-6 text-center">
      <h3 className="mb-2 text-lg font-semibold">Invite a friend</h3>
      <p className="mb-4 text-sm text-slate-400">
        Enter a username to send a friend request.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="username"
          disabled={sending}
          className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-white/20"
        />
        <button
          type="submit"
          disabled={sending || !username.trim()}
          className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-200 disabled:opacity-50"
        >
          {sending ? "Sending…" : "Send request"}
        </button>
      </form>
      {status && (
        <p
          className={`mt-3 text-sm ${
            status.type === "success" ? "text-green-400" : "text-red-400"
          }`}
        >
          {status.message}
        </p>
      )}
      <button
        onClick={onClose}
        className="mt-4 text-xs text-slate-500 hover:text-slate-300"
      >
        Cancel
      </button>
    </div>
  );
}