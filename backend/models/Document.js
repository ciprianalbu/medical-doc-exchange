// In-memory store for mapping codes to files (use DB for production!)
const docs = {};

function addDocument(code, filename, timestamp) {
  docs[code] = { filename, timestamp };
}

function getDocument(code) {
  return docs[code];
}

function deleteDocument(code) {
  delete docs[code];
}

function getExpiredDocuments(expiryMs) {
  const now = Date.now();
  return Object.entries(docs)
    .filter(([_, doc]) => now - doc.timestamp > expiryMs)
    .map(([code]) => code);
}

module.exports = { addDocument, getDocument, deleteDocument, getExpiredDocuments };
