const { MongoClient } = require('mongodb');

let cached = null;

function getEnv(name, fallback) {
  const v = process.env[name];
  if (v && String(v).trim()) return v;
  return fallback;
}

async function getMongo() {
  if (cached) return cached;

  const uri = getEnv('MONGODB_URI', 'mongodb://127.0.0.1:27017');
  const dbName = getEnv('MONGODB_DB', 'paruchurisid_site');
  const collectionName = getEnv('MONGODB_COLLECTION', 'photos');

  const client = new MongoClient(uri);
  await client.connect();

  const db = client.db(dbName);
  const collection = db.collection(collectionName);

  cached = { client, db, collection, dbName, collectionName, uri };
  return cached;
}

module.exports = { getMongo };

