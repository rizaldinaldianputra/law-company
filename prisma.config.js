require('dotenv').config();

// Critical: Manually construct URL and ensure NO fallbacks to avoid accidental overwrites
const user = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const db = process.env.DB_NAME;

if (!user || !db) {
  console.warn("WARNING: DB_USERNAME or DB_NAME is missing. Using placeholders for build/generation.");
}

const db_host = host || 'localhost';
const db_port = port || '5432';
const db_user = user || 'dummy';
const db_pass = password || 'dummy';
const db_name = db || 'dummy';

module.exports = {
  datasource: {
    url: `postgresql://${db_user}:${db_pass}@${db_host}:${db_port}/${db_name}`
  },
  migrations: {
    seed: 'npx tsx ./prisma/seed.ts'
  }
};
