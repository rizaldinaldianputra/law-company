import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ejcbhupncuwcmcqoqede.supabase.co";
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  console.error("CRITICAL: NEXT_PUBLIC_SUPABASE_URL is missing.")
}
if (!supabaseServiceRoleKey) {
  console.error("CRITICAL: SUPABASE_SERVICE_ROLE_KEY is missing. Administrative tasks will fail.")
}

let supabaseInstance: ReturnType<typeof createClient> | undefined

const getSupabase = () => {
  if (supabaseInstance) return supabaseInstance
  
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    // Return a dummy proxy that avoids crashing during build-time static analysis
    return new Proxy({} as any, {
      get: () => () => ({ data: null, error: null }),
    })
  }
  
  supabaseInstance = createClient(supabaseUrl, supabaseServiceRoleKey)
  return supabaseInstance
}

export const supabase = new Proxy({} as ReturnType<typeof createClient>, {
  get: (target, prop) => {
    const instance = getSupabase()
    return (instance as any)[prop]
  }
})

export async function uploadFile(file: File, path: string): Promise<string> {
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error("Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.")
  }

  const bucketName = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || "lawfirm-assets"
  
  // Convert File to ArrayBuffer/Buffer for Supabase SDK
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(path, buffer, {
      contentType: file.type,
      upsert: true
    })

  if (error) {
    console.error("Supabase upload error:", error)
    throw new Error(`Failed to upload file: ${error.message}`)
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from(bucketName)
    .getPublicUrl(data.path)

  return publicUrl
}

export async function listAllObjects() {
  const bucketName = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || "lawfirm-assets"
  const { data, error } = await supabase.storage.from(bucketName).list()

  if (error) {
    console.error("Supabase list error:", error)
    return []
  }

  return data.map(item => ({
    name: item.name,
    size: item.metadata?.size || 0,
    lastModified: item.updated_at || item.created_at || ""
  }))
}
