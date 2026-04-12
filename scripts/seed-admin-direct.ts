import { Client } from 'pg'
import 'dotenv/config'

async function main() {
  const email = 'admin@gmail.com'
  const connectionString = process.env.DATABASE_URL
  
  if (!connectionString) {
    throw new Error("DATABASE_URL not found in environment.")
  }

  // Convert pooled URL to direct if needed, but since we pushed successfully 
  // with a direct URL earlier, we should ensure we use a valid connection string.
  // We'll use the one from the environment.
  
  const client = new Client({
    connectionString: connectionString,
    ssl: { rejectUnauthorized: false }
  })

  try {
    await client.connect()
    console.log('📡 Connected to database via pg...')

    // Check if user exists
    const checkRes = await client.query('SELECT * FROM "User" WHERE email = $1', [email])
    
    if (checkRes.rows.length > 0) {
      console.log('✅ User already exists:', email)
    } else {
      // Insert user
      const id = Date.now().toString() // Simple ID generation
      await client.query('INSERT INTO "User" (id, email, name, "createdAt", "updatedAt") VALUES ($1, $2, $3, NOW(), NOW())', 
        [id, email, 'Super Admin'])
      console.log('✅ Admin user created successfully:', email)
    }

  } catch (err) {
    console.error('❌ Error during direct database operation:', err)
  } finally {
    await client.end()
  }
}

main().catch((e) => {
  console.error('❌ Script failed:', e)
  process.exit(1)
})
