import { useState, useRef, useEffect } from "react";

export default function NotesEditor() {
  const editorRef = useRef(null);

  /* ================= CARGAR NOTAS ================= */
  useEffect(() => {
    try {
      const saved = localStorage.getItem("notes_rich");
      if (saved && editorRef.current) {
        editorRef.current.innerHTML = saved;
      }
    } catch (err) {
      console.error("Error cargando notas:", err);
    }
  }, []);

  /* ================= ACCIONES FORMATO ================= */
  const exec = (command) => {
    document.execCommand(command, false, null);

    if (editorRef.current) {
      localStorage.setItem("notes_rich", editorRef.current.innerHTML);
    }
  };

  /* ================= GUARDAR ================= */
  const save = () => {
    if (editorRef.current) {
      localStorage.setItem("notes_rich", editorRef.current.innerHTML);
    }
  };

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: "1px solid #e5e7eb",
        borderRadius: 8,
        overflow: "hidden",
        background: "#fff"
      }}
    >

      {/* ================= TOOLBAR ================= */}
      <div
        style={{
          display: "flex",
          gap: 8,
          padding: 8,
          borderBottom: "1px solid #e5e7eb",
          background: "#f8fafc"
        }}
      >
        <button onClick={() => exec("bold")}><b>B</b></button>
        <button onClick={() => exec("italic")}><i>I</i></button>
        <button onClick={() => exec("underline")}><u>U</u></button>
      </div>

      {/* ================= EDITOR ================= */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={save}
        style={{
          flex: 1,
          padding: 12,
          outline: "none",
          overflowY: "auto",
          fontSize: 14,
          lineHeight: "1.5"
        }}
      />

    </div>
  );
}