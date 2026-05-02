import { useState } from "react";
import * as XLSX from "xlsx";

export default function ExcelUploader() {
  const [data, setData] = useState([]);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (evt) => {
      const buffer = evt.target.result;
      const workbook = XLSX.read(buffer, { type: "array" });

      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      setData(jsonData);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <input type="file" accept=".xlsx, .xls" onChange={handleFile} />

      <table border="1" style={{ marginTop: "10px" }}>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}