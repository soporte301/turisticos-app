import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
// IMPORTANT: Turisticos uses image uploads encoded in Base64 (up to 800x800).
// We increase the JSON payload limit so those images don't get rejected.
app.use(express.json({ limit: '10mb' })); 

// In production (Easypanel), data is stored in /data/ which is a persistent volume.
// In development (local), it falls back to the project folder.
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname);
const DB_FILE = path.join(DATA_DIR, 'database.json');

// Ensure directory and DB file exist on boot
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify({}));
}

const getDB = () => {
    try {
        return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    } catch (e) {
        return {};
    }
};

const writeDB = (data) => {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

// --- API ROUTES ---
// Get a specific key
app.get('/api/db/:key', (req, res) => {
  const db = getDB();
  const val = db[req.params.key];
  res.json({ data: val !== undefined ? val : null });
});

// Save a specific key
app.post('/api/db/:key', (req, res) => {
  const db = getDB();
  db[req.params.key] = req.body.data;
  writeDB(db);
  res.json({ success: true });
});

// --- STATIC ASSETS FOR PRODUCTION ---
// When deployed on VPS, this serves the React app
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  // Serve static files with explicit MIME types
  app.use(express.static(distPath, {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css; charset=utf-8');
      } else if (filePath.endsWith('.js') || filePath.endsWith('.mjs')) {
        res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
      } else if (filePath.endsWith('.svg')) {
        res.setHeader('Content-Type', 'image/svg+xml');
      }
    }
  }));
  
  // Catch-all route to serve the React router app
  app.get(/(.*)/, (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Backend server listening on port ${PORT}`);
});
