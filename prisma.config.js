require('dotenv').config();

// Critical: Manually construct URL and ensure NO fallbacks to avoid accidental overwrites
const user = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const db = process.env.DB_NAME;

if (!user || !db) {
  throw new Error("CRITICAL CONFIG ERROR: DB_USERNAME or DB_NAME is missing in .env file.");
}

module.exports = {
  datasource: {
    url: `postgresql://${user}:${password}@${host}:${port}/${db}`
  },
  migrations: {
    seed: 'npx tsx ./prisma/seed.ts'
  }
};
