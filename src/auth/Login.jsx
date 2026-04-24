import { useState } from "react";

export default function Login({ onLogin }) {
  const [name, setName] = useState("");

  const handleLogin = () => {
    if (!name.trim()) return;
    localStorage.setItem("user", name);
    localStorage.setItem("logged", "true");
    onLogin(name);
  };

  return (
    <div className="login">
      <div className="loginBox">
        <h2>📱 Estudio Pro</h2>

        <input
          placeholder="Tu nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button onClick={handleLogin}>
          Entrar
        </button>
      </div>
    </div>
  );
}