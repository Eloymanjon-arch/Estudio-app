import { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import workerSrc from "pdfjs-dist/build/pdf.worker.min?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

export default function PdfViewer({ file }) {
  const containerRef = useRef(null);
  const pdfRef = useRef(null);

  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  // 📄 LOAD PDF
  useEffect(() => {
    if (!file) return;

    const load = async () => {
      try {
        setLoading(true);

        const response = await fetch(file);
        const buffer = await response.arrayBuffer();

        const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;

        pdfRef.current = pdf;
        setTotal(pdf.numPages);

        // 🔥 renderizar TODAS las páginas
        renderAllPages(pdf);

        setLoading(false);
      } catch (err) {
        console.error("❌ PDF LOAD ERROR:", err);
        setLoading(false);
      }
    };

    load();
  }, [file]);

  // 📄 RENDER TODAS LAS PÁGINAS (SCROLL REAL)
  const renderAllPages = async (pdf) => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = ""; // limpiar antes

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);

      const viewport = page.getViewport({ scale: 1.3 });

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      canvas.style.display = "block";
      canvas.style.margin = "0 auto 20px auto"; // espacio entre páginas

      container.appendChild(canvas);

      await page.render({
        canvasContext: ctx,
        viewport,
      }).promise;
    }
  };

  if (!file) {
    return <div style={{ color: "white" }}>📄 Sin PDF</div>;
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "black",
        position: "relative",
        overflowY: "auto" // 🔥 SCROLL REAL
      }}
    >
      {loading && (
        <div style={{
          color: "white",
          position: "absolute",
          top: 10,
          left: 10
        }}>
          Cargando PDF...
        </div>
      )}

      {/* 🔥 CONTENEDOR CON TODAS LAS PÁGINAS */}
      <div ref={containerRef} />

      {/* INFO */}
      <div
        style={{
          position: "fixed",
          bottom: 10,
          right: 10,
          background: "rgba(0,0,0,0.6)",
          color: "white",
          padding: "5px 10px",
          borderRadius: 6
        }}
      >
        {total} páginas
      </div>
    </div>
  );
}