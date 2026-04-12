import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const resolveClient = await createClient(cookieStore)
  // Note: createClient in our implementation returns the response, 
  // but the user's snippet expected the client.
  // Actually, I should check my utils/supabase/server.ts again.

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Supabase Test Page</h1>
      <p>If you see this, the route is working.</p>
    </div>
  )
}
