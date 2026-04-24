import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Home from "../pages/Home.jsx";
import Pdfs from "../pages/Pdfs.jsx";
import Videos from "../pages/Videos.jsx";
import Clases from "../pages/Clases.jsx";
import Study from "../pages/Study.jsx";

export default function Layout() {
  const [tab, setTab] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  // 🔥 ESTADO GLOBAL DE NOTAS (IMPORTANTE)
  const [notes, setNotes] = useState({});

  const renderPage = () => {
    switch (tab) {
      case "home":
        return <Home go={setTab} />;
      case "pdfs":
        return <Pdfs />;
      case "videos":
        return <Videos />;
      case "clases":
        return <Clases notes={notes} setNotes={setNotes} />;
      default:
        return <Home />;
      case "study":
        return <Study />;
    }
  };

  return (
    <div className="appShell">

      <button className="burger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      <div className="appContent">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={`bottomNav ${menuOpen ? "show" : "hide"}`}>
        <button onClick={() => setTab("home")}>🏠</button>
        <button onClick={() => setTab("pdfs")}>📄</button>
        <button onClick={() => setTab("videos")}>🎥</button>
        <button onClick={() => setTab("clases")}>📚</button>
        <button onClick={() => setTab("study")}>📚</button>
        <button onClick={() => {
  localStorage.removeItem("logged");
  window.location.reload();
}}>
  🚪
</button>
      </div>

    </div>
  );
}