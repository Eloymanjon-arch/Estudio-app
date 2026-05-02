export default function Home({ go, darkMode }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",

        // 🔥 ESTE ES EL IMPORTANTE
        background: darkMode ? "#0f0f0f" : "#ffffff",
        color: darkMode ? "#ffffff" : "#000000",
      }}
    >
      {/* LOGO */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontSize: 70 }}>📱</div>

        <h1 style={{ margin: 0 }}>
          Estudio Pro
        </h1>
      </div>

      {/* BOTONES */}
      <div style={{ display: "flex", flexDirection: "row", gap: 12 }}>
        <button onClick={() => go("pdfs")} style={btn(darkMode)}>
          📄 PDFs
        </button>

        <button onClick={() => go("videos")} style={btn(darkMode)}>
          🎥 Videos
        </button>

        <button onClick={() => go("clases")} style={btn(darkMode)}>
          📚 Clases
        </button>
      </div>
    </div>
  );
}

const btn = (darkMode) => ({
  padding: "12px",
  borderRadius: 10,
  border: "1px solid #ccc",
  fontWeight: "bold",
  cursor: "pointer",
  background: darkMode ? "#1e1e1e" : "#fff",
  color: darkMode ? "#fff" : "#000",
});