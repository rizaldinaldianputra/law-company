import { PrismaClient } from '@prisma/client'
import 'dotenv/config'

const prisma = new PrismaClient()

async function main() {
  const email = 'admin@gmail.com'
  
  try {
    const user = await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        name: 'Super Admin',
        password: 'admin'
      },
    })
    
    console.log('✅ Admin user created/verified in database:', user.email)
  } catch (err) {
    console.error('❌ Error during database operation:', err)
  } finally {
    await prisma.$disconnect()
  }
}

main().catch((e) => {
  console.error('❌ Script failed:', e)
  process.exit(1)
})
