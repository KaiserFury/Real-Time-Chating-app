import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import apiClient from './api/apiClient.js';
import { AuthContext } from './context/AuthContext.js';
import './App.css';
import { RegisterForm } from './pages/Register.jsx';
import { LoginForm } from './pages/Login.jsx';

function App() {
  const { user, loading, setUser } = useContext(AuthContext);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  const handleLogout = async () => {
    try {
      await apiClient('/api/auth/logout', { method: 'POST' });
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
      setUser(null);
    }
  };

  return (
    <main style={{ padding: '2rem', maxWidth: '480px', margin: '0 auto' }}>
      <h1>Welcome back</h1>
      <p>Name: {user.name}</p>
      <p>Username: {user.username}</p>
      <button type="button" onClick={handleLogout} style={{ marginTop: '1rem' }}>
        Log out
      </button>
    </main>
  );
}

export default App;