import { useState } from "react";

export default function PdfUploader({ onAdd }) {
  const [files, setFiles] = useState([]);

  const handleFiles = (e) => {
    const selected = Array.from(e.target.files);

    const pdfs = selected.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));

    setFiles(pdfs);
    onAdd(pdfs);
  };

  return (
    <div className="uploader">
      <input type="file" accept="application/pdf" multiple onChange={handleFiles} />

      <p>Sube PDFs desde tu dispositivo</p>
    </div>
  );
}