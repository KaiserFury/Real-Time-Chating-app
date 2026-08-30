import apiClient from "../api/apiClient.js";
import { AuthContext } from "./AuthContext.js";
import { useState, useEffect } from "react";


export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check the HttpOnly cookie once when the app loads.
        const restoreSession = async () => {
            try {
                const userData = await apiClient("/api/auth/me");
                setUser(userData);
            } catch (err) {
                setUser(null);

                // 401 only means the visitor is not logged in yet.
                if (err.status !== 401) {
                    console.error("AuthProvider error:", err);
                }
            } finally {
                setLoading(false);
            }
        }

        restoreSession();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    );
}
