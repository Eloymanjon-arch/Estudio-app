import { useEffect, useState } from "react";
import Login from "../components/Login.jsx";
import Layout from "../layout/Layout.jsx";
import Splash from "../components/Splash.jsx";

export default function App() {
  const [logged, setLogged] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("logged");
    if (saved === "true") {
      setLogged(true);
    }

    // ⏳ splash 1.5s
    setTimeout(() => {
      setShowSplash(false);
      setLoading(false);
    }, 1500);

  }, []);

  const handleLogin = (name) => {
    localStorage.setItem("logged", "true");
    localStorage.setItem("user", name);
    setLogged(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("logged");
    localStorage.removeItem("user");
    setLogged(false);
  };

  // 🔥 SPLASH PRIMERO
  if (showSplash) return <Splash />;

  if (loading) return null;

  return logged ? (
    <Layout onLogout={handleLogout} />
  ) : (
    <Login onLogin={handleLogin} />
  );
}