import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Home from "../pages/Home.jsx";
import Pdfs from "../pages/Pdfs.jsx";
import Videos from "../pages/Videos.jsx";
import Clases from "../pages/Clases.jsx";
import Study from "../pages/Study.jsx";
import BaremoCalculator from "../components/BaremoCalculator.jsx";
import RankingPage from "../components/RankingPage.jsx";

export default function Layout() {
  const [tab, setTab] = useState("home");
  const [menu, setMenu] = useState(false);
  const [notes, setNotes] = useState({});

  const render = () => {
    switch (tab) {
      case "home": return <Home go={setTab} />;
      case "pdfs": return <Pdfs />;
      case "videos": return <Videos />;
      case "clases": return <Clases notes={notes} setNotes={setNotes} />;
      case "study": return <Study />;
      case "baremo": return <BaremoCalculator go={setTab} />;
      case "ranking": return <RankingPage go={setTab} />;
      default: return <Home go={setTab} />;
    }
  };

  return (
    <div style={styles.app}>

      <div style={styles.header}>
        <button onClick={() => setMenu(!menu)} style={styles.menuBtn}>☰</button>
        <div style={styles.title}>
          SISTEMA DE BAREMO Y OPOSICIÓN
        </div>
      </div>

      {menu && <div style={styles.overlay} onClick={() => setMenu(false)} />}

      <div
        style={{
          ...styles.menu,
          transform: menu ? "translateX(0)" : "translateX(-110%)"
        }}
      >
        {[
          ["🏠 Inicio", "home"],
          ["📊 Baremo", "baremo"],
          ["🏆 Tribunal / Ranking", "ranking"],
          ["📄 Temario", "pdfs"],
          ["🎥 Vídeos", "videos"],
          ["📚 Clases", "clases"],
          ["📖 Estudio", "study"],
        ].map(([label, value]) => (
          <button
            key={value}
            onClick={() => {
              setTab(value);
              setMenu(false);
            }}
            style={styles.menuItem}
          >
            {label}
          </button>
        ))}
      </div>

      <div style={styles.content}>
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
          >
            {render()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

const styles = {
  /* 🔥 FIX PRINCIPAL IPHONE */
  app: {
    height: "100dvh",          // mejor que 100vh en iPhone
    background: "#f5f6f8",
    fontFamily: "Arial",
    color: "#111",
    overflow: "hidden",       // evita scroll doble
    display: "flex",
    flexDirection: "column",
  },

  header: {
    height: 60,
    display: "flex",
    alignItems: "center",
    padding: "0 15px",
    background: "#1f2a44",
    color: "#fff",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    zIndex: 1000,
  },

  title: {
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 14,
    letterSpacing: 1,
  },

  menuBtn: {
    fontSize: 20,
    background: "transparent",
    border: "none",
    color: "#fff",
    cursor: "pointer",
  },

  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    zIndex: 999,
  },

  menu: {
    position: "fixed",
    top: 60,
    left: 0,
    width: 260,
    height: "calc(100dvh - 60px)",  // 🔥 FIX iPhone
    background: "#fff",
    boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
    transition: "0.3s",
    padding: 10,
    zIndex: 1000,
    overflowY: "auto",             // 🔥 scroll correcto
    WebkitOverflowScrolling: "touch",
  },

  menuItem: {
    width: "100%",
    padding: 12,
    marginBottom: 6,
    border: "1px solid #eee",
    background: "#fafafa",
    textAlign: "left",
    borderRadius: 6,
    cursor: "pointer",
  },

  content: {
    marginTop: 60,   // 🔥 evita que se meta debajo del header
    flex: 1,
    padding: 15,
    overflowY: "auto",
    WebkitOverflowScrolling: "touch",
  }
};