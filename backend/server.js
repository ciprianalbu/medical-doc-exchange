const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const { generateCode } = require('./codeGenerator');
const { addDocument, getDocument, deleteDocument } = require('./models/Document');
const { cleanup } = require('./cleanup');

const UPLOAD_DIR = process.env.UPLOAD_DIR || "uploads";
const MAX_FILE_SIZE_MB = parseInt(process.env.MAX_FILE_SIZE_MB || "10");
const EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);

const app = express();
app.use(cors());
app.use(express.json());

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE_MB * 1024 * 1024 }
});

// Upload endpoint
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  // Generate unique code, check for collisions
  let code;
  do {
    code = generateCode();
  } while (getDocument(code));

  addDocument(code, req.file.filename, Date.now());
  res.json({ code });
});

// Retrieve endpoint
app.get('/api/retrieve/:code', (req, res) => {
  const { code } = req.params;
  const doc = getDocument(code);
  if (!doc || (Date.now() - doc.timestamp > EXPIRY_MS)) {
    return res.status(404).json({ error: "Code not found or expired" });
  }
  const filePath = path.join(UPLOAD_DIR, doc.filename);
  // For images show preview, for others force download
  const mime = req.query.download === "1" ? "application/octet-stream" : undefined;
  res.sendFile(filePath, { headers: mime ? { "Content-Type": mime } : {} });
});

// Info endpoint (for preview/download button)
app.get('/api/info/:code', (req, res) => {
  const { code } = req.params;
  const doc = getDocument(code);
  if (!doc || (Date.now() - doc.timestamp > EXPIRY_MS)) {
    return res.status(404).json({ error: "Code not found or expired" });
  }
  res.json({ filename: doc.filename });
});

// Serve frontend build
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// Cleanup job
const cron = require('node-cron');
cron.schedule('0 * * * *', () => cleanup(UPLOAD_DIR, EXPIRY_MS)); // every hour

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
