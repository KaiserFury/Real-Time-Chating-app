import { useContext, useState } from "react";
import apiClient from "../api/apiClient.js";
import { AuthContext } from "../context/AuthContext.js";
import NavRail from "../components/NavRail";
import ConversationList from "../components/ConversationList";
import CallLog from "../components/CallLog";
import FriendsPanel from "../components/FriendsPanel";
import MessageList from "../components/MessageList";
import MessageComposer from "../components/MessageComposer";
import ChatHeader from "../components/ChatHeader";
import { useSocket } from "../hooks/useSocket";

export default function Chat() {
  const { setUser } = useContext(AuthContext);
  const socket = useSocket();
  const [section, setSection] = useState("chat"); // "chat" | "calls" | "friends"
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [activeFriend, setActiveFriend] = useState(null);
  const [friendListKey, setFriendListKey] = useState(0);

  const handleSelectSection = (nextSection) => {
    setSection(nextSection);
  };

  const handleSelectConversation = (conversationId, friend) => {
    setActiveConversationId(conversationId);
    setActiveFriend(friend);
    setSection("chat");
  };

  const handleRequestAccepted = () => {
    setFriendListKey((prev) => prev + 1);
  };

  const handleLogout = async () => {
    try {
      await apiClient("/api/auth/logout", { method: "POST" });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setUser(null);
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-white">
      <NavRail
        activeSection={section}
        onSelectSection={handleSelectSection}
        onLogout={handleLogout}
      />

      {/* Middle panel — content depends on which nav item is active.
          This is the piece that visually "blends" with the active rail button. */}
      <aside className="flex w-64 shrink-0 flex-col bg-slate-950 md:w-72">
        {section === "chat" && (
          <>
            <div className="border-b border-white/10 px-4 py-3">
              <h2 className="mb-2 text-sm font-semibold">Chats</h2>
              <input
                type="text"
                placeholder="Search conversations…"
                className="w-full rounded-lg bg-white/5 px-3 py-1.5 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
            </div>
            <ConversationList
              key={friendListKey}
              activeConversationId={activeConversationId}
              onSelectConversation={handleSelectConversation}
            />
          </>
        )}

        {section === "calls" && <CallLog />}

        {section === "friends" && (
          <FriendsPanel onAccepted={handleRequestAccepted} />
        )}
      </aside>

      {/* Main panel */}
      <main className="flex flex-1 flex-col border-l border-white/10">
        {activeConversationId && section === "chat" ? (
          <>
            <div className="border-b border-white/10 px-4 py-3">
              <ChatHeader friend={activeFriend} />
            </div>
            <MessageList
              conversationId={activeConversationId}
              socket={socket}
            />
            <MessageComposer
              conversationId={activeConversationId}
              socket={socket}
            />
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-slate-500">
            <p>
              {section === "chat"
                ? "Select a conversation to start chatting"
                : section === "calls"
                  ? "Select a call to view details"
                  : "Manage friend requests on the left"}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
