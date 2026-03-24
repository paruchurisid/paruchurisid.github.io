require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { getMongo } = require('./mongo');

const app = express();
app.use(cors());

app.get('/health', async (_req, res) => {
  try {
    const { dbName, collectionName } = await getMongo();
    res.json({ ok: true, mongo: { db: dbName, collection: collectionName } });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.get('/api/photos', async (_req, res) => {
  try {
    const { collection } = await getMongo();
    const docs = await collection
      .find({}, { projection: { _id: 0 } })
      .sort({ id: 1 })
      .toArray();

    res.json({ photos: docs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const port = Number(process.env.PORT || 5177);
app.listen(port, () => {
  console.log(`[api] Listening on http://localhost:${port}`);
  console.log('[api] GET /api/photos');
});

