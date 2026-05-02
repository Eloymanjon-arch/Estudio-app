import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const KEY = "ranking_pro";

export default function RankingPage() {
  const [list, setList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showBulk, setShowBulk] = useState(false);
  const [bulkText, setBulkText] = useState("");

  const [search, setSearch] = useState("");
  const [plazas, setPlazas] = useState(100);

  const [form, setForm] = useState({
    id: null,
    numero: "",
    concurso: "",
    examen: ""
  });

  /* ================= LOAD ================= */
  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    setList(saved ? JSON.parse(saved) : []);
  }, []);

  const save = (data) => {
    setList(data);
    localStorage.setItem(KEY, JSON.stringify(data));
  };

  const total = (p) =>
    (Number(p.concurso) || 0) + (Number(p.examen) || 0);

  const ranking = [...list]
    .map(p => ({ ...p, total: total(p) }))
    .sort((a, b) => b.total - a.total);

  const filtered = ranking.filter(p =>
    p.numero.toString().toLowerCase().includes(search.toLowerCase())
  );

  const cutoff = ranking[plazas - 1]?.total || 0;

  const mine = ranking.find(p => p.id === "TU");
  const myPos = ranking.findIndex(p => p.id === "TU") + 1;

  const percentil = ranking.length
    ? ((ranking.length - myPos) / ranking.length) * 100
    : 0;

  /* ================= PDF ================= */
  const exportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("RANKING OPOSICIONES OFICIAL", 14, 15);

    doc.setFontSize(10);
    doc.text(`Total aspirantes: ${ranking.length}`, 14, 22);

    autoTable(doc, {
      startY: 28,
      head: [["Pos", "Nº Opositor", "Concurso", "Oposición", "Total"]],
      body: ranking.map((p, i) => [
        i + 1,
        p.numero,
        Number(p.concurso).toFixed(2),
        Number(p.examen).toFixed(2),
        p.total.toFixed(2)
      ]),
      didParseCell: function (data) {
        const rowIndex = data.row.index;
        if (data.section === "body" && rowIndex < plazas) {
          data.cell.styles.fillColor = [220, 252, 231];
        }
      }
    });

    doc.save("ranking_oposiciones.pdf");
  };

  /* ================= CRUD ================= */
  const openAdd = () => {
    setForm({ id: null, numero: "", concurso: "", examen: "" });
    setShowModal(true);
  };

  const openEdit = (p) => {
    setForm(p);
    setShowModal(true);
  };

  const saveForm = () => {
    if (!form.numero.trim()) return;

    const item = {
      id: form.id ?? Date.now(),
      numero: form.numero,
      concurso: Number(form.concurso) || 0,
      examen: Number(form.examen) || 0
    };

    const updated = form.id
      ? list.map(p => p.id === form.id ? item : p)
      : [...list, item];

    save(updated);
    setShowModal(false);
  };

  const remove = (id) => {
    save(list.filter(p => p.id !== id));
  };

  /* ================= MASIVO ================= */
  const handleBulkImport = () => {
    if (!bulkText.trim()) return;

    const lines = bulkText.split("\n").filter(Boolean);

    const nuevos = lines.map(line => {
      const parts = line.split(/\s+/);
      return {
        id: Date.now() + Math.random(),
        numero: parts[0],
        concurso: Number(parts[1]) || 0,
        examen: Number(parts[2]) || 0
      };
    });

    save([...list, ...nuevos]);
    setBulkText("");
    setShowBulk(false);
  };

  return (
    <div style={{
      fontFamily: "sans-serif",
      background: "#f5f7fb",
      minHeight: "100vh"
    }}>

      {/* HEADER + BOTONES */}
      <div style={styles.header}>
        <h2 style={{ margin: 0 }}>🔥 PERMANENTE 26</h2>

        <div style={styles.btnGroup}>
          <button style={styles.btnPrimary} onClick={exportPDF}>📄 PDF</button>
          <button style={styles.btnSuccess} onClick={openAdd}>➕ Añadir</button>
          <button style={styles.btnDark} onClick={() => setShowBulk(true)}>📥 Masivo</button>
        </div>
      </div>

      {/* CONTROLES */}
      <div style={styles.controls}>
        <input
          placeholder="Buscar opositor"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ flex: 1 }}
        />

        <input
          type="number"
          value={plazas}
          onChange={e => setPlazas(Number(e.target.value))}
          style={{ width: 100 }}
        />
      </div>

      {/* INFO */}
      {mine && (
        <div style={styles.info}>
          🏆 Posición: {myPos} | 📊 Percentil: {percentil.toFixed(1)}% | 🎯 Corte: {cutoff.toFixed(2)}
        </div>
      )}

      {/* CABECERA TABLA */}
      <div style={styles.tableHeader}>
        <div>#</div>
        <div>Nº OPOSITOR</div>
        <div>CONCURSO</div>
        <div>OPOSICIÓN</div>
        <div>TOTAL</div>
        <div>ACCIONES</div>
      </div>

      {/* LISTA */}
      <div style={styles.list}>
        {filtered.map((p, i) => {
          const isPlaza = i < plazas;

          return (
            <div key={p.id} style={{
              ...styles.row,
              background: isPlaza ? "#dcfce7" : "#fff"
            }}>
              <div>{i + 1}</div>
              <div style={{ fontWeight: "bold", color: "#2563eb" }}>{p.numero}</div>
              <div>{p.concurso}</div>
              <div>{p.examen}</div>
              <div style={{ fontWeight: "bold", color: "#dc2626" }}>{p.total.toFixed(2)}</div>
              <div style={{ display: "flex", gap: 5 }}>
                <button onClick={() => openEdit(p)}>✏️</button>
                <button onClick={() => remove(p.id)}>❌</button>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODALES (igual que tenías) */}
      {showBulk && (
        <div style={styles.modal}>
          <div style={styles.modalBox}>
            <textarea rows={10} style={{ width: "100%" }} value={bulkText} onChange={e => setBulkText(e.target.value)} />
            <button onClick={handleBulkImport}>Importar</button>
          </div>
        </div>
      )}

      {showModal && (
        <div style={styles.modal}>
          <div style={styles.modalBox}>
            <input placeholder="Número" value={form.numero} onChange={e => setForm({ ...form, numero: e.target.value })} />
            <input placeholder="Concurso" value={form.concurso} onChange={e => setForm({ ...form, concurso: e.target.value })} />
            <input placeholder="Oposición" value={form.examen} onChange={e => setForm({ ...form, examen: e.target.value })} />
            <button onClick={saveForm}>Guardar</button>
          </div>
        </div>
      )}

    </div>
  );
}

/* ================= ESTILOS PRO ================= */
const styles = {

  header:{
    background:"#fff",
    padding:15,
    borderBottom:"1px solid #ddd",
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    flexWrap:"wrap",
    gap:10
  },

  btnGroup:{
    display:"flex",
    gap:10,
    flexWrap:"wrap"
  },

  btnPrimary:{
    background:"linear-gradient(135deg,#3b82f6,#2563eb)",
    color:"#fff",
    border:"none",
    borderRadius:10,
    padding:"10px 16px",
    fontWeight:"600",
    cursor:"pointer"
  },

  btnSuccess:{
    background:"linear-gradient(135deg,#22c55e,#16a34a)",
    color:"#fff",
    border:"none",
    borderRadius:10,
    padding:"10px 16px",
    fontWeight:"600",
    cursor:"pointer"
  },

  btnDark:{
    background:"linear-gradient(135deg,#1f2937,#111827)",
    color:"#fff",
    border:"none",
    borderRadius:10,
    padding:"10px 16px",
    fontWeight:"600",
    cursor:"pointer"
  },

  controls:{
    display:"flex",
    gap:10,
    padding:10,
    background:"#fff",
    borderBottom:"1px solid #ddd"
  },

  info:{
    background:"#111827",
    color:"#fff",
    padding:10
  },

  tableHeader:{
    display:"grid",
    gridTemplateColumns:"60px 1fr 120px 120px 120px 120px",
    background:"#0f172a",
    color:"#fff",
    padding:12,
    fontWeight:"bold"
  },

  list:{
    height:"calc(100vh - 260px)",
    overflowY:"auto"
  },

  row:{
    display:"grid",
    gridTemplateColumns:"60px 1fr 120px 120px 120px 120px",
    padding:10,
    borderBottom:"1px solid #eee"
  },

  modal:{
    position:"fixed",
    inset:0,
    background:"rgba(0,0,0,0.5)",
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  },

  modalBox:{
    background:"#fff",
    padding:20,
    width:300
  }
};