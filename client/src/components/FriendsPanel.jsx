import { useState } from "react";
import InviteFriend from "./InviteFriend";
import IncomingRequests from "./IncomingRequests";

export default function FriendsPanel({ onAccepted }) {
  const [tab, setTab] = useState("invite"); // "invite" | "requests"

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex border-b border-white/10">
        <button
          onClick={() => setTab("invite")}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            tab === "invite"
              ? "border-b-2 border-white text-white"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          Invite
        </button>
        <button
          onClick={() => setTab("requests")}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            tab === "requests"
              ? "border-b-2 border-white text-white"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          Requests
        </button>
      </div>

      <div className="flex flex-1 flex-col overflow-y-auto">
        {tab === "invite" ? (
          <div className="flex flex-1 items-center justify-center p-4">
            <InviteFriend onClose={() => setTab("requests")} />
          </div>
        ) : (
          <IncomingRequests onAccepted={onAccepted} />
        )}
      </div>
    </div>
  );
}