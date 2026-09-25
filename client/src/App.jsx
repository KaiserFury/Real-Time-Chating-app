import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/AuthContext.js";
import "./App.css";
import { RegisterForm } from "./pages/Register.jsx";
import { LoginForm } from "./pages/Login.jsx";
import Chat from "./pages/Chat.jsx";
import Profile from "./pages/Profile.jsx";
import CloudBackground from "./components/CloudBackground.jsx";
import ThunderLoading from "./components/ThunderLoading.jsx";

function App() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <ThunderLoading />;
  }

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<LoginForm/>} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/chat" element={<Chat />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<Navigate to="/chat" replace />} />
    </Routes>
  );
}

export default App;