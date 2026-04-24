export default function Home({ go }) {
  return (
    <div className="homeModern">

      {/* LOGO */}
      <div className="homeLogo">
        📱
        <h1>Estudio Pro</h1>
      </div>

      {/* ACCIONES */}
      <div className="homeActions">

        <button onClick={() => go("pdfs")}>
          📄 PDFs
        </button>

        <button onClick={() => go("videos")}>
          🎥 Videos
        </button>

        <button onClick={() => go("clases")}>
          📚 Clases
        </button>

      </div>

    </div>
  );
}