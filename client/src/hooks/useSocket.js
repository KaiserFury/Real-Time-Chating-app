import { useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "../context/AuthContext.js";

export function useSocket() {
  const { user } = useContext(AuthContext);
  const socketRef = useRef(null);

  useEffect(() => {
    if (!user) {
      socketRef.current?.disconnect();
      socketRef.current = null;
      return;
    }

    // Calling io() with no URL connects to the page's own origin —
    // correct in production (Express serves both API and frontend on
    // the same origin) and in local dev via the Vite proxy.
    const socket = io({
      withCredentials: true,
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connection rejected:", err.message);
    });

    socketRef.current = socket;

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [user]);

  return socketRef.current;
}