import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Login({ onLogin }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  // 🧠 recordar usuario
  useEffect(() => {
    const saved = localStorage.getItem("lastUser");
    if (saved) setUser(saved);
  }, []);

  const handleLogin = () => {
    if (user === "emanjim" && pass === "Minisdef272727") {
      localStorage.setItem("logged", "true");
      localStorage.setItem("user", user);
      localStorage.setItem("lastUser", user);

      // 📳 vibración móvil
      if (navigator.vibrate) navigator.vibrate(50);

      onLogin(user);
    } else {
      setError("Usuario o contraseña incorrectos");

      // 💥 animación shake
      setShake(true);
      setTimeout(() => setShake(false), 400);

      // 📳 vibración error
      if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
    }
  };

  return (
    <div className="loginUltra">

      {/* 🌌 FONDO DINÁMICO */}
      <div className="bgGlow" />

      <motion.div
        className={`loginCard ${shake ? "shake" : ""}`}
        initial={{ opacity: 0, y: 60, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
      >

        <h1>📱 Estudio Pro</h1>
        <p className="subtitle">Tu espacio de estudio inteligente</p>

        {/* USER */}
        <input
          placeholder="Usuario"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />

        {/* PASSWORD */}
        <div className="passBox">
          <input
            type={showPass ? "text" : "password"}
            placeholder="Contraseña"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />

          <span onClick={() => setShowPass(!showPass)}>
            {showPass ? "🙈" : "👁"}
          </span>
        </div>

        {/* BOTÓN */}
        <button onClick={handleLogin}>
          Entrar
        </button>

        {error && <div className="error">{error}</div>}

        {/* 🔐 FAKE FACE ID */}
        <div className="faceID" onClick={handleLogin}>
          🔒 Usar Face ID
        </div>

      </motion.div>
    </div>
  );
}