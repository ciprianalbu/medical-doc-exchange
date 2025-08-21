# Medical Document Exchange App

A minimal web app for exchanging medical files (e.g. ECG images) via a sharing code, with automatic deletion after 24h.

## Features

- **Upload** medical documents (image/PDF) — get a random code (e.g. `NA123VS`)
- **Retrieve** documents using the code (preview/download)
- No login required
- Files auto-delete after 24 hours
- Elegant, minimal UI

## Deploying on Render

1. **Fork/clone this repo and push to GitHub.**
2. **Create a new Render Web Service**:
   - Connect to your repo
   - **Build command:** `npm run build`
   - **Start command:** `npm start`
3. **Set up environment variables** (see `.env.example` in backend)
4. **Access your app via Render’s URL!**

## Local Development

```bash
# One-time setup
npm install

# Run backend
npm run start

# Run frontend in dev mode
cd frontend
npm start
```

## Directory Structure

- `/backend` - Express API, file storage, code logic
- `/frontend` - React app (minimal UI)
