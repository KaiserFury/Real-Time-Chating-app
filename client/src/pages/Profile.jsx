import { useContext } from "react";
import apiClient from "../api/apiClient.js";
import { AuthContext } from "../context/AuthContext.js";

export default function Profile() {
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await apiClient("/api/auth/logout", { method: "POST" });
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
      setUser(null);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-slate-950">
      <div className="relative w-full max-w-xs rounded-2xl bg-linear-to-b from-slate-900 to-slate-950 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.35)] ring-1 ring-white/10">
        <div className="flex flex-col items-center">
          <img
            className="mb-5 h-24 w-24 rounded-full object-cover ring-2 ring-white/15"
            src={user.profilePicture}
            alt="Profile Picture"
          />
          <h5 className="mb-1 text-xl font-semibold tracking-tight text-white">
            {user.name}
          </h5>
          <span className="text-sm text-slate-400">@{user.username}</span>

          <div className="mt-6 flex gap-3">
            <button
              onClick={handleLogout}
              type="button"
              className="inline-flex items-center rounded-lg bg-white px-4 py-2.5 text-sm font-medium leading-5 text-slate-900 transition-colors hover:bg-slate-200 focus:outline-none focus:ring-4 focus:ring-white/20"
            >
              <svg
                className="me-1.5 -ms-0.5 h-4 w-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 12h4m-2 2v-4M4 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}