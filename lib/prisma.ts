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

  const connectionString = `postgresql://${user}:${password}@${host}:${port}/${db}`;
  
  // If we have an adapter, use it, but if user/db are missing, 
  // we are likely in an environment where we should use the URL directly
  if (!user || !db) {
    return new PrismaClient();
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
