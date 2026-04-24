const DB_NAME = "pdf-db";
const STORE = "pdfs";

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = () => {
      const db = request.result;
      db.createObjectStore(STORE, { keyPath: "id" });
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function savePDF(pdf) {
  const db = await openDB();
  const tx = db.transaction(STORE, "readwrite");
  tx.objectStore(STORE).put(pdf);
  return tx.complete;
}

export async function getPDFs() {
  const db = await openDB();
  return db.getAll(STORE);
}