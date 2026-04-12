import { PrismaClient } from "@prisma/client"

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

let prismaInstance: PrismaClient | undefined

export const getPrisma = (): PrismaClient => {
  if (prismaInstance) return prismaInstance
  
  if (globalThis.prisma) {
    prismaInstance = globalThis.prisma
    return prismaInstance
  }

  prismaInstance = new PrismaClient()
  
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
