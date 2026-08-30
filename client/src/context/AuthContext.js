import { createContext } from "react";

// Shared auth state lives here so future pages can read the same logged-in user.
export const AuthContext = createContext(null);
