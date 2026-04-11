import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const lawyers = await prisma.lawyer.findMany()
  const articles = await prisma.article.findMany()
  const clients = await prisma.client.findMany()
  
  console.log('--- LAWYERS ---')
  lawyers.forEach(l => console.log(`${l.name}: ${l.image}`))
  
  console.log('--- ARTICLES ---')
  articles.forEach(a => console.log(`${a.title}: ${a.image}`))

  console.log('--- CLIENTS ---')
  clients.forEach(c => console.log(`${c.name}: ${c.logo}`))
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
