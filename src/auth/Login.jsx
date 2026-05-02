import { useState } from "react";

export default function Login({ onLogin }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (name === "emanjim" && password === "Minisdef272727") {
      
      const user = { name };

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("logged", "true");

      onLogin(user);
    }
  };

  return (
    <div className="login">
      <div className="loginBox">
        <h2>📱 Estudio Pro</h2>

        <input
          placeholder="Usuario"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>
          Entrar
        </button>
      </div>
    </div>
  );
}