import { useNavigate } from "react-router-dom";

const NAV_ITEMS = [
  { key: "chat", label: "Chat", Icon: ChatIcon },
  { key: "calls", label: "Call Log", Icon: CallIcon },
  { key: "friends", label: "Invite", Icon: InviteIcon },
];

export default function NavRail({ activeSection, onSelectSection, onLogout }) {
  const navigate = useNavigate();

  return (
    <nav className="flex w-16 shrink-0 flex-col items-center gap-1 bg-slate-900 py-4 md:w-20">
      <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl bg-white text-sm font-bold text-slate-900 md:h-10 md:w-10">
        C
      </div>

      {NAV_ITEMS.map(({ key, label, Icon }) => {
        const isActive = activeSection === key;
        return (
          <button
            key={key}
            onClick={() => onSelectSection(key)}
            title={label}
            // The active tab overlaps the panel beside it (negative margin +
            // matching background + squared inner corner) so the two read
            // as one continuous shape instead of two separate boxes.
            className={`relative flex h-14 w-15 flex-col items-center justify-center gap-1 text-[10px] font-medium transition-colors duration-150 md:w-16 ${
              isActive
                ? "rounded-l-xl bg-slate-950 text-white"
                : "mx-1 rounded-xl text-slate-400 hover:bg-white/5 hover:text-slate-200"
            }`}
          >
            <Icon className="h-5 w-5" />
            {label}
          </button>
        );
      })}

      <div className="mt-auto flex flex-col items-center gap-1">
        <button
          onClick={() => navigate("/profile")}
          title="Profile"
          className="flex h-14 w-14 flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-medium text-slate-400 transition-colors duration-150 hover:bg-white/5 hover:text-slate-200 md:w-16"
        >
          <ProfileIcon className="h-5 w-5" />
          Profile
        </button>
        <button
          onClick={onLogout}
          title="Logout"
          className="flex h-10 w-14 items-center justify-center rounded-xl text-slate-500 transition-colors duration-150 hover:bg-red-500/10 hover:text-red-400 md:w-16"
        >
          <LogoutIcon className="h-4 w-4" />
        </button>
      </div>
    </nav>
  );
}

function ChatIcon(props) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8-1.06 0-2.077-.163-3.02-.462L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
  );
}

function CallIcon(props) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  );
}

function InviteIcon(props) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4v16m8-8H4"
      />
    </svg>
  );
}

function ProfileIcon(props) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  );
}

function LogoutIcon(props) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
      />
    </svg>
  );
}
