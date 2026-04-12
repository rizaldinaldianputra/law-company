import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import pg from "pg"

const prismaClientSingleton = () => {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("DATABASE_URL is missing. Prisma will not be able to connect.")
    }
    return new PrismaClient()
  }

  const pool = new pg.Pool({ connectionString })
  const adapter = new PrismaPg(pool)
  return new PrismaClient({ adapter })
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

let prismaInstance: ReturnType<typeof prismaClientSingleton> | undefined

export const getPrisma = (): ReturnType<typeof prismaClientSingleton> => {
  if (prismaInstance) return prismaInstance
  
  if (globalThis.prisma) {
    prismaInstance = globalThis.prisma
    return prismaInstance
  }

  prismaInstance = prismaClientSingleton()
  
  if (process.env.NODE_ENV !== "production") {
    globalThis.prisma = prismaInstance
  }
  
  return prismaInstance
}

// Keep a default export or named export for existing code, but use a proxy or wrapper
export const prisma = new Proxy({} as PrismaClient, {
  get: (target, prop) => {
    const instance = getPrisma()
    return (instance as any)[prop]
  }
})
