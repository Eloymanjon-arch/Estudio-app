import { useState } from "react";
import PdfViewer from "../components/PdfViewer.jsx";

export default function Pdfs() {
  const [pdfFile, setPdfFile] = useState(null);

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPdfFile(url);
  };

  return (
    <div className="pdfPage">

      <div className="uploadBox">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleUpload}
        />
      </div>

      {pdfFile ? (
        <PdfViewer file={pdfFile} />
      ) : (
        <div className="emptyState">📄 Sube un PDF</div>
      )}

    </div>
  );
}