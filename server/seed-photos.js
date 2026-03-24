require('dotenv').config();

const fs = require('fs');
const path = require('path');
const { getMongo } = require('./mongo');

async function main() {
  const jsonPath = path.join(__dirname, '..', 'photography-data.json');
  const raw = fs.readFileSync(jsonPath, 'utf8');
  const parsed = JSON.parse(raw);

  if (!parsed || !Array.isArray(parsed.photos)) {
    throw new Error('Invalid photography-data.json: expected { "photos": [...] }');
  }

  const photos = parsed.photos.map((p) => ({
    id: p.id,
    filename: p.filename,
    location: p.location,
    description: p.description,
  }));

  const { collection, client, dbName, collectionName } = await getMongo();

  await collection.createIndex({ id: 1 }, { unique: true });

  const ids = photos.map((p) => p.id);
  await collection.deleteMany({ id: { $in: ids } });
  if (photos.length) await collection.insertMany(photos, { ordered: false });

  console.log(
    `[seed] Seeded ${photos.length} photos into MongoDB (${dbName}.${collectionName})`
  );

  await client.close();
}

main().catch((err) => {
  console.error('[seed] Error:', err);
  process.exitCode = 1;
});

