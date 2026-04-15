import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import pg from "pg"

const prismaClientSingleton = () => {
  // Manually construct the URL to bypass .env interpolation issues
  const user = process.env.DB_USERNAME;
  const password = process.env.DB_PASSWORD;
  const host = process.env.DB_HOST || 'localhost';
  const port = process.env.DB_PORT || '5432';
  const db = process.env.DB_NAME;

  // Use DATABASE_URL if available, otherwise construct it
  const connectionString = process.env.DATABASE_URL || `postgresql://${user}:${password}@${host}:${port}/${db}`;
  
  // If we lack the essential components for a connection string AND DATABASE_URL is missing,
  // return a standard client (which might still fail, but it's the best we can do)
  if (!process.env.DATABASE_URL && (!user || !db)) {
    return new PrismaClient({
      datasources: {
        db: {
          url: "postgresql://dummy:dummy@localhost:5432/dummy"
        }
      }
    });
  }

  const pool = new pg.Pool({ 
    connectionString,
    ssl: connectionString.includes('supabase.com') 
      ? { rejectUnauthorized: false } 
      : false
  })
  
  const adapter = new PrismaPg(pool)
  return new PrismaClient({ adapter })
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

export const prisma = globalThis.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma
