import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../components/Login.jsx";
import Layout from "../layout/Layout.jsx";
import Splash from "../components/Splash.jsx";
import RankingPage from "../components/RankingPage.jsx";

export default function App() {
  const [logged, setLogged] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("logged");
    if (saved === "true") {
      setLogged(true);
    }

    // 🔥 FIX IPHONE: evita “scroll fantasma” al iniciar
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";

    setTimeout(() => {
      setShowSplash(false);
      setLoading(false);

      // 🔥 restaurar scroll cuando termina splash
      document.body.style.overflow = "auto";
    }, 1500);
  }, []);

  const handleLogin = (name) => {
    localStorage.setItem("logged", "true");
    localStorage.setItem("user", name);
    setLogged(true);

    // 🔥 FIX iOS: reset scroll al entrar
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    localStorage.removeItem("logged");
    localStorage.removeItem("user");
    setLogged(false);

    // 🔥 FIX iOS
    window.scrollTo(0, 0);
  };

  if (showSplash) return <Splash />;
  if (loading) return null;

  return (
    <BrowserRouter>
      <Routes>
        {/* TU APP NORMAL */}
        <Route
          path="/"
          element={
            logged ? (
              <Layout onLogout={handleLogout} />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />

        {/* NUEVA VENTANA RANKING */}
        <Route path="/ranking" element={<RankingPage />} />
      </Routes>
    </BrowserRouter>
  );
}