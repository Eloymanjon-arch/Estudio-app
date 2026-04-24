import { useState, useRef } from "react";
import PdfViewer from "../components/PdfViewer.jsx";

export default function Clases({ notes = {}, setNotes }) {
  const [pdf, setPdf] = useState(null);
  const [video, setVideo] = useState(null);

  const videoRef = useRef(null);
  const [text, setText] = useState("");

  // IMPORT PDF
  const handlePdf = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPdf({
      name: file.name,
      url: URL.createObjectURL(file),
    });
  };

  // IMPORT VIDEO
  const handleVideo = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setVideo({
      name: file.name,
      url: URL.createObjectURL(file),
    });
  };

  const addNote = () => {
    if (!video) return;

    const time = videoRef.current?.currentTime || 0;

    const newNote = {
      text,
      time,
    };

    setNotes({
      ...notes,
      [video.name]: [...(notes[video.name] || []), newNote],
    });

    setText("");
  };

  return (
    <div className="clasesPro">

      {/* SPLIT PRINCIPAL */}
      <div className="viewerArea">

        {/* PDF */}
        <div className="viewerPanel">
          {pdf ? (
            <PdfViewer file={pdf.url} />
          ) : (
            <label className="emptyBox">
              📄
              <span>Importar PDF</span>
              <input type="file" accept="application/pdf" onChange={handlePdf} />
            </label>
          )}
        </div>

        {/* VIDEO */}
        <div className="viewerPanel">
          {video ? (
            <video
              ref={videoRef}
              src={video.url}
              controls
            />
          ) : (
            <label className="emptyBox">
              🎥
              <span>Importar Video</span>
              <input type="file" accept="video/*" onChange={handleVideo} />
            </label>
          )}
        </div>

      </div>

      {/* NOTAS */}
      <div className="notesPanel">

        <textarea
          placeholder="Escribe una nota mientras estudias..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button onClick={addNote}>
          ⏱ Guardar nota
        </button>

        <div className="notesList">
          {video &&
            (notes[video.name] || []).map((n, i) => (
              <div key={i} className="noteItem">
                ⏱ {n.time.toFixed(0)}s - {n.text}
              </div>
            ))}
        </div>

      </div>

    </div>
  );
}