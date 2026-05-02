import { useState, useRef } from "react";
import PdfViewer from "../components/PdfViewer.jsx";

export default function Clases({ notes = {}, setNotes }) {
  const [pdf, setPdf] = useState(null);
  const [video, setVideo] = useState(null);

  const videoRef = useRef(null);
  const [text, setText] = useState("");

  /* ================= IMPORT ================= */

  const handlePdf = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPdf({
      name: file.name,
      url: URL.createObjectURL(file),
    });
  };

  const handleVideo = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setVideo({
      name: file.name,
      url: URL.createObjectURL(file),
    });
  };

  /* ================= CLOSE CLEAN ================= */

  const closePdf = () => {
    if (pdf?.url) URL.revokeObjectURL(pdf.url);
    setPdf(null);
  };

  const closeVideo = () => {
    if (video?.url) URL.revokeObjectURL(video.url);
    setVideo(null);
  };

  /* ================= NOTES ================= */

  const addNote = () => {
    if (!video) return;

    const time = videoRef.current?.currentTime || 0;

    const newNote = { text, time };

    setNotes({
      ...notes,
      [video.name]: [...(notes[video.name] || []), newNote],
    });

    setText("");
  };

  return (
    <div style={styles.page}>

      {/* ================= PDF ================= */}
      <div style={styles.left}>
        {pdf ? (
          <div style={styles.box}>
            <button style={styles.close} onClick={closePdf}>✕</button>
            <PdfViewer file={pdf.url} />
          </div>
        ) : (
          <label style={styles.upload}>
            📄 Importar PDF
            <input type="file" accept="application/pdf" onChange={handlePdf} />
          </label>
        )}
      </div>

      {/* ================= RIGHT ================= */}
      <div style={styles.right}>

        {/* VIDEO */}
        <div style={styles.videoBox}>
          {video ? (
            <div style={styles.box}>
              <button style={styles.close} onClick={closeVideo}>✕</button>

              <video
                ref={videoRef}
                src={video.url}
                controls
                style={styles.media}
              />
            </div>
          ) : (
            <label style={styles.upload}>
              🎥 Importar Video
              <input type="file" accept="video/*" onChange={handleVideo} />
            </label>
          )}
        </div>

        {/* NOTES */}
        <div style={styles.notesBox}>

          <textarea
            placeholder="Escribe una nota..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={styles.textarea}
          />

          <button onClick={addNote} style={styles.btn}>
            ⏱ Guardar nota
          </button>

          <div style={styles.notesList}>
            {video &&
              (notes[video.name] || []).map((n, i) => (
                <div key={i} style={styles.noteItem}>
                  ⏱ {n.time.toFixed(0)}s - {n.text}
                </div>
              ))}
          </div>

        </div>

      </div>

    </div>
  );
}

/* ================= ESTILOS ================= */
const styles = {

  page: {
    display: "flex",
    height: "100vh",
    overflow: "hidden",
    background: "#f1f5f9"
  },

  left: {
    flex: 1.2,
    background: "#000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },

  right: {
    flex: 1,
    display: "flex",
    flexDirection: "column"
  },

  videoBox: {
    flex: 2,
    background: "#0f172a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },

  notesBox: {
    flex: 1,
    background: "#fff",
    display: "flex",
    flexDirection: "column",
    padding: 10
  },

  media: {
    width: "100%",
    height: "100%",
    objectFit: "contain"
  },

  box: {
    position: "relative",
    width: "100%",
    height: "100%"
  },

  close: {
    position: "absolute",
    top: 8,
    right: 8,
    zIndex: 10,
    background: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: 6,
    width: 28,
    height: 28,
    cursor: "pointer"
  },

  upload: {
    color: "white",
    cursor: "pointer",
    textAlign: "center"
  },

  textarea: {
    flex: 1,
    resize: "none",
    padding: 10
  },

  btn: {
    marginTop: 8,
    padding: 10,
    background: "#0f172a",
    color: "#fff",
    border: "none",
    borderRadius: 6
  },

  notesList: {
    marginTop: 10,
    overflowY: "auto"
  },

  noteItem: {
    padding: 6,
    borderBottom: "1px solid #eee"
  }
};