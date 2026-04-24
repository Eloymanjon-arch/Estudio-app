import { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import workerSrc from "pdfjs-dist/build/pdf.worker.min?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

export default function PdfViewer({ file }) {
  const canvasRef = useRef(null);
  const pdfRef = useRef(null);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  // 📄 LOAD PDF (FIX REAL)
  useEffect(() => {
    if (!file) return;

    const load = async () => {
      try {
        setLoading(true);

        // 🔥 IMPORTANTE: leer como ArrayBuffer (FIX CLAVE)
        const response = await fetch(file);
        const buffer = await response.arrayBuffer();

        const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;

        pdfRef.current = pdf;
        setTotal(pdf.numPages);
        setPage(1);

        setLoading(false);
      } catch (err) {
        console.error("❌ PDF LOAD ERROR:", err);
        setLoading(false);
      }
    };

    load();
  }, [file]);

  // 📄 RENDER PAGE
  useEffect(() => {
    if (!pdfRef.current) return;
    if (!canvasRef.current) return;

    const render = async () => {
      try {
        const pdf = pdfRef.current;
        const pageObj = await pdf.getPage(page);

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        const viewport = pageObj.getViewport({ scale: 1.4 });

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        await pageObj.render({
          canvasContext: ctx,
          viewport,
        }).promise;

      } catch (err) {
        console.error("❌ RENDER ERROR:", err);
      }
    };

    render();
  }, [page]);

  if (!file) {
    return <div style={{ color: "white" }}>📄 Sin PDF</div>;
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative"
      }}
    >
      {loading && (
        <div style={{ color: "white", position: "absolute" }}>
          Cargando PDF...
        </div>
      )}

      <canvas ref={canvasRef} />

      <div
        style={{
          position: "absolute",
          bottom: 10,
          color: "white",
          display: "flex",
          gap: 10,
          alignItems: "center"
        }}
      >
        <button onClick={() => setPage(p => Math.max(1, p - 1))}>
          ⬅
        </button>

        <span>{page} / {total}</span>

        <button onClick={() => setPage(p => Math.min(total, p + 1))}>
          ➡
        </button>
      </div>
    </div>
  );
}