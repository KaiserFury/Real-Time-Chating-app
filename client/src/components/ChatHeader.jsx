export default function ChatHeader({ friend }) {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-3">
        <img
          src={friend.profilePicture || "/default-avatar.png"}
          alt={friend.name}
          className="h-9 w-9 rounded-full object-cover"
        />
        <span className="text-sm font-medium">{friend.name}</span>
      </div>

      {/* Placeholder only — real calling needs WebRTC + Socket.IO signaling,
          which hasn't been built yet. Disabled so it's visually in place
          without pretending to work. */}
      <div className="flex items-center gap-2">
        <button
          disabled
          title="Voice call (not available yet)"
          className="cursor-not-allowed rounded-full bg-white/5 p-2 text-slate-500"
        >
          <PhoneIcon />
        </button>
        <button
          disabled
          title="Video call (not available yet)"
          className="cursor-not-allowed rounded-full bg-white/5 p-2 text-slate-500"
        >
          <VideoIcon />
        </button>
      </div>
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  );
}

function VideoIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
      />
    </svg>
  );
}