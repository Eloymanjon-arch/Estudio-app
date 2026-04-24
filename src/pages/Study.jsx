import { useState, useRef } from "react";
import PdfViewer from "../components/PdfViewer.jsx";

export default function Study() {
  const [pdf, setPdf] = useState(null);
  const [audio, setAudio] = useState(null);
  const [text, setText] = useState("");

  const audioRef = useRef(null);

  // 📄 PDF
  const handlePdf = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPdf({
      name: file.name,
      url: URL.createObjectURL(file),
    });
  };

  // 🎧 AUDIO
  const handleAudio = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setAudio({
      name: file.name,
      url: URL.createObjectURL(file),
    });
  };

  return (
    <div className="studyLayout">

      {/* ================= LEFT PDF ================= */}
      <div className="studyLeft">

        {!pdf ? (
          <label className="studyUpload">
            📄 Subir PDF
            <input type="file" accept="application/pdf" onChange={handlePdf} />
          </label>
        ) : (
          <PdfViewer file={pdf.url} />
        )}

      </div>

      {/* ================= RIGHT ================= */}
      <div className="studyRight">

        {/* 🎧 AUDIO */}
        <div className="studyAudio">

          {!audio ? (
            <label className="studyUpload">
              🎧 Subir Audio
              <input type="file" accept="audio/*" onChange={handleAudio} />
            </label>
          ) : (
            <audio
              ref={audioRef}
              src={audio.url}
              controls
              className="audioPlayerSmall"
            />
          )}

        </div>

        {/* ================= NOTES TIPO WORD ================= */}
        <div className="studyNotes">

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Escribe tus notas aquí..."
            className="studyTextarea"
          />

          <button onClick={() => setText("")}>
            💾 Limpiar
          </button>

        </div>

      </div>

    </div>
  );
}