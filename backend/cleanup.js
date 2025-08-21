const fs = require('fs');
const path = require('path');
const { getExpiredDocuments, deleteDocument, getDocument } = require('./models/Document');

function cleanup(uploadDir, expiryMs) {
  const expiredCodes = getExpiredDocuments(expiryMs);
  expiredCodes.forEach(code => {
    const doc = getDocument(code);
    if (doc) {
      try {
        fs.unlinkSync(path.join(uploadDir, doc.filename));
      } catch (e) { /* ignore */ }
      deleteDocument(code);
    }
  });
}

module.exports = { cleanup };
