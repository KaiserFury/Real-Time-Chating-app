import { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "../context/AuthContext.js";

const SOCKET_URL = "http://localhost:8000"; // match your server port

export function useSocket() {
  const { user } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!user) {
      return;
    }

    // withCredentials sends the auth cookie along with the socket handshake,
    // which socketAuthMiddleware reads server-side.
    const socket = io(SOCKET_URL, {
      withCredentials: true,
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connection rejected:", err.message);
    });

    socket.on("connect", () => {
      setSocket(socket);
    });
    socket.on("disconnect", () => {
      setSocket((currentSocket) => (currentSocket === socket ? null : currentSocket));
    });

    return () => {
      socket.disconnect();
    };
  }, [user]);

  return socket;
}