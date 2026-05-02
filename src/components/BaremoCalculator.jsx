import React, { useState, useEffect } from "react";

const KEY = "baremo_pro_v3";

/* ================= CONFIG ================= */
const config = [
  { section: "MÉRITOS PROFESIONALES" },
  { label: "Tiempo de servicios en unidades preferentes", field: "servicios", factor: 0.08 },
  { label: "Tiempo de servicios en otras unidades", field: "otras", factor: 0.04 },
  { label: "Tiempo en operaciones/misiones en el extranjero", field: "extranjero", factor: 0.1 },

  { section: "EMPLEO" },
  { label: "CABO", field: "cabo", factor: 2 },
  { label: "CABO 1º", field: "cabo1", factor: 5 },

  { section: "RECOMPENSAS" },
  { label: "Cruz Laureada de San Fernando", field: "laureada", factor: 10 },
  { label: "Medalla Militar", field: "medallaMilitar", factor: 8 },
  { label: "Cruz Guerra", field: "cruzGuerra", factor: 7 },
  { label: "Medallas del Ejército, Naval y Aérea (individuales)", field: "medallas", factor: 6 },

  { label: "MCruz al Mérito Naval Rojo", field: "Cruz al Mérito Naval Rojo", factor: 5 },
  { label: "Cruz al Mérito Naval Azul", field: "Cruz al Mérito Naval Azul", factor: 4 },
  { label: "Cruz al Mérito Naval Blanco", field: "Cruz al Mérito Naval Blanco", factor: 3 },

  { label: "Citación como distinguido en la Orden General de los Ejércitos y Armada", field: "citacion", factor: 2.5 },
  { label: "Cruz de plata a la constancia en el Servicio", field: "plata", factor: 4 },
  { label: "Cruz de bronce a la constancia en el Servicio", field: "bronce", factor: 3 },
  { label: "Mención Honorífica ", field: "mencion", factor: 1 },
  { label: "Felicitaciones individuales anotadas en la Hoja de Servicios", field: "felicitaciones", factor: 0.5 },
  { label: "Condecoraciones extranjeras A", field: "condecExtA", factor: 3 },
  { label: "Condecoraciones extranjeras B", field: "condecExtB", factor: 0.25 },
  { label: "Valor reconocido", field: "valorReconocido", factor: 0.5 },

  { section: "CURSOS" },
  { label: "Cursos Especialización", field: "cursosEsp", factor: 2 },
  { label: "Cursos Informativos", field: "cursosInfo", factor: 0.5 },

  { section: "OTROS" },
  { label: "IPECS", field: "ippecs", factor: 1 },
  { label: "PPFF", field: "ppff", factor: 1 }
];

const initial = {
  servicios:"209", otras:"4", extranjero:"24",
  cabo:"1", cabo1:"0",
  laureada:"0", medallaMilitar:"0", cruzGuerra:"0", medallas:"0",
  meritoRojo:"0", meritoAzul:"0", meritoBlanco:"0",
  citacion:"0", plata:"1", bronce:"1", mencion:"0", felicitaciones:"0",
  condecExtA:"0", condecExtB:"4", valorReconocido:"0",
  cursosEsp:"0", cursosInfo:"1",
  ippecs:"0", ppff:"0"
};

export default function BaremoCalculator({ go }) {

  const [data, setData] = useState(() => {
    const saved = localStorage.getItem(KEY);
    return saved ? JSON.parse(saved) : initial;
  });

  const toNum = (v) =>
    parseFloat(String(v || "").replace(",", ".")) || 0;

  let baremo = 0;

  config.forEach((item) => {
    if (!item.field) return;
    baremo += toNum(data[item.field]) * item.factor;
  });

  useEffect(() => {
    localStorage.setItem("mi_nota", JSON.stringify({
      nombre: "TÚ",
      concurso: baremo
    }));
  }, [baremo]);

  const handleChange = (f, v) => {
    const newData = { ...data, [f]: v };
    setData(newData);
    localStorage.setItem(KEY, JSON.stringify(newData));
  };

  return (
    <div style={styles.page}>

      <div style={styles.container}>

        <div style={styles.topBar}>
          <h2 style={styles.title}>📊 BAREMO EXCEL PRO</h2>

          <button style={styles.btn} onClick={() => go("ranking")}>
            🏆 Ranking Academia
          </button>
        </div>

        <div style={styles.table}>

          <div style={styles.header}>
            <div>CONCEPTO</div>
            <div>FACTOR</div>
            <div>VALOR</div>
            <div>PUNTOS</div>
          </div>

          {config.map((item,i)=>{

            if (item.section) {
              return (
                <div key={i} style={styles.section}>
                  {item.section}
                </div>
              );
            }

            const val = toNum(data[item.field]);
            const puntos = val * item.factor;

            return (
              <div key={item.field} style={styles.row}>

                <div style={styles.cellLeft}>{item.label}</div>

                <div style={styles.cellCenter}>x{item.factor}</div>

                <input
                  style={styles.input}
                  value={data[item.field]}
                  onChange={(e)=>handleChange(item.field,e.target.value)}
                />

                <div style={styles.cellRight}>
                  {puntos.toFixed(3)}
                </div>

              </div>
            );
          })}

        </div>

        <div style={styles.total}>
          TOTAL BAREMO: {baremo.toFixed(3)}
        </div>

      </div>

    </div>
  );
}

/* ================= FIX IPHONE AÑADIDO ================= */
const styles = {

  page:{
    height:"100dvh",              // 🔥 FIX iOS (ANTES 100vh)
    display:"flex",
    justifyContent:"center",
    background:"#f1f5f9",
    padding:20,
    overflow:"hidden",
    WebkitOverflowScrolling:"touch" // 🔥 smooth scroll iPhone
  },

  container:{
    width:"100%",
    maxWidth:1100,
    background:"#fff",
    borderRadius:12,
    boxShadow:"0 10px 25px rgba(0,0,0,0.1)",
    padding:15,
    display:"flex",
    flexDirection:"column",
    height:"100%",
    minHeight:0   // 🔥 FIX FLEX iOS
  },

  topBar:{
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    marginBottom:15,
    marginTop:"env(safe-area-inset-top)" // 🔥 notch iPhone
  },

  title:{
    margin:0,
    fontSize:26
  },

  btn:{
    padding:"8px 15px",
    border:"none",
    background:"#0f172a",
    color:"#fff",
    borderRadius:6,
    cursor:"pointer",
    WebkitTapHighlightColor:"transparent" // 🔥 iPhone click
  },

  table:{
    flex:1,
    overflowY:"auto",
    minHeight:0,
    border:"1px solid #cbd5e1",
    borderRadius:6,
    WebkitOverflowScrolling:"touch" // 🔥 scroll iOS suave
  },

  header:{
    display:"grid",
    gridTemplateColumns:"3fr 1fr 1fr 1fr",
    background:"#e2e8f0",
    borderBottom:"2px solid #94a3b8",
    fontWeight:"bold",
    textAlign:"center",
    padding:10,
    position:"sticky",
    top:0,
    zIndex:2
  },

  row:{
    display:"grid",
    gridTemplateColumns:"3fr 1fr 1fr 1fr",
    borderBottom:"1px solid #e5e7eb",
    alignItems:"center"
  },

  section:{
    background:"#c7d2fe",
    padding:8,
    fontWeight:"bold"
  },

  cellLeft:{
    padding:8,
    borderRight:"1px solid #e5e7eb"
  },

  cellCenter:{
    textAlign:"center",
    borderRight:"1px solid #e5e7eb"
  },

  cellRight:{
    textAlign:"right",
    paddingRight:10
  },

  input:{
    width:"100%",
    border:"none",
    borderRight:"1px solid #e5e7eb",
    textAlign:"center",
    padding:8,
    outline:"none",
    fontSize:16,              // 🔥 evita zoom iPhone
    WebkitAppearance:"none"
  },

  total:{
    background:"#0f172a",
    color:"#fff",
    padding:15,
    textAlign:"center",
    fontSize:20,
    fontWeight:"bold",
    marginTop:10,
    borderRadius:6
  }
};