import { useState, useRef, useEffect } from "react";
import PdfViewer from "../components/PdfViewer.jsx";
import NotesEditor from "../components/NotesEditor.jsx";
import ExcelUploader from "../components/ExcelUploader.jsx";

export default function Study() {
  const [pdf, setPdf] = useState(null);
  const [audio, setAudio] = useState(null);
  const [speed, setSpeed] = useState(1);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [lastActivity, setLastActivity] = useState(Date.now());

  const [examMode, setExamMode] = useState(false); // 🧠 MODO EXAMEN

  const audioRef = useRef(null);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  /* ================= PDF ================= */
  const handlePdf = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPdf({
      name: file.name,
      url: URL.createObjectURL(file),
    });
  };

  const removePdf = () => {
    setPdf(null);
  };

  /* ================= AUDIO ================= */
  const handleAudio = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setAudio({
      name: file.name,
      url: URL.createObjectURL(file),
    });

    setSpeed(1);

    if (audioRef.current) {
      audioRef.current.playbackRate = 1;
    }
  };

  const removeAudio = () => {
    setAudio(null);
  };

  const changeSpeed = (value) => {
    setSpeed(value);
    setSidebarOpen(false);

    if (audioRef.current) {
      audioRef.current.playbackRate = value;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (sidebarOpen && Date.now() - lastActivity > 5000) {
        setSidebarOpen(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [sidebarOpen, lastActivity]);

  return (
    <div
      className={`studyLayout ${theme}`}
      onMouseMove={() => setLastActivity(Date.now())}
      onClick={() => setLastActivity(Date.now())}
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden"
      }}
    >

      {/* 🧠 BOTÓN MODO EXAMEN */}
      <button
        onClick={() => setExamMode(!examMode)}
        style={{
          position: "fixed",
          top: 10,
          left: 10,
          zIndex: 9999,
          background: examMode ? "#ef4444" : "#16a34a",
          color: "white",
          border: "none",
          padding: "8px 12px",
          borderRadius: 6,
          fontWeight: "bold"
        }}
      >
        {examMode ? "🛑 Salir examen" : "🧠 Modo examen"}
      </button>

      {/* 🍔 MENU */}
      <button onClick={() => setSidebarOpen(true)}>
        ☰
      </button>

      {sidebarOpen && (
        <div className="sidebar">
          ...
        </div>
      )}

      {/* ================= PDF ================= */}
      <div
        className="studyLeft"
        style={{
          flex: 3,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          position: "relative"
        }}
      >
        {!pdf ? (
          <label className="studyUpload">
            📄 Subir PDF
            <input type="file" accept="application/pdf" onChange={handlePdf} />
          </label>
        ) : (
          <>
            <button
              onClick={removePdf}
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                zIndex: 10,
                background: "#ef4444",
                color: "white",
                border: "none",
                borderRadius: 6,
                padding: "4px 8px"
              }}
            >
              ✖
            </button>

            <div style={{ flex: 1, overflowY: "auto" }}>
              <PdfViewer file={pdf.url} />
            </div>
          </>
        )}
      </div>

      {/* ================= RIGHT ================= */}
      <div
        className="studyRight"
        style={{
          flex: 1.2,
          height: "100vh",
          display: "flex",
          flexDirection: "column"
        }}
      >

        {/* AUDIO */}
        <div className="studyAudio" style={{ position: "relative" }}>

          {/* 🔥 MODO EXAMEN BLOQUEA AUDIO */}
          {examMode ? (
            <div style={{
              padding: 10,
              background: "#111827",
              color: "white",
              textAlign: "center"
            }}>
              🎧 Audio bloqueado (modo examen)
            </div>
          ) : !audio ? (
            <label className="studyUpload">
              🎧 Subir Audio
              <input type="file" accept="audio/*" onChange={handleAudio} />
            </label>
          ) : (
            <>
              <button
                onClick={removeAudio}
                style={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  zIndex: 10,
                  background: "#ef4444",
                  color: "white",
                  border: "none",
                  borderRadius: 6
                }}
              >
                ✖
              </button>

              <audio
                ref={audioRef}
                src={audio.url}
                controls
                style={{ width: "100%" }}
              />
            </>
          )}
        </div>

        {/* NOTES */}
        <div className="studyNotes" style={{ flex: 1, overflow: "auto", padding: 10 }}>

          {/* 🔥 MODO EXAMEN BLOQUEA NOTAS */}
          {examMode ? (
            <div style={{
              textAlign: "center",
              fontWeight: "bold",
              marginTop: 20
            }}>
              🧠 MODO EXAMEN ACTIVO<br />
              Notas desactivadas
            </div>
          ) : (
            <NotesEditor />
          )}

        </div>

      </div>

    </div>
  );
}