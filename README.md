# PersonalWebsite.github.io
personal portfolio website

Hello,

Thank you for looking at my personal website I am sure it lead you to the github page. This is all of the code for the website that you where
just on. This website has 

## MongoDB (local learning setup)

This repo is a static GitHub Pages site, but you can run a small local API backed by MongoDB to get hands-on experience (seed + read your photo data).

### Install dependencies

```bash
npm install
```

### Configure env

Copy `.env.example` to `.env` and edit if needed:
- `MONGODB_URI` (local MongoDB or Atlas)
- `MONGODB_DB` / `MONGODB_COLLECTION`

### Seed MongoDB from `photography-data.json`

```bash
npm run seed:photos
```

### Run the API

```bash
npm run dev:api
```

### Use it in the site

Open `photography.html`. It will:
- Try `http://localhost:5177/api/photos` first (MongoDB-backed)
- Otherwise fall back to `photography-data.json` / `photography-data.js` for static hosting (GitHub Pages / `file://`).
