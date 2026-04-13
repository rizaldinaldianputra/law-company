'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from "@/lib/prisma";
import { uploadFile, listAllObjects, supabase as legacySupabase } from "@/lib/supabase";
import { createClient } from '@/utils/supabase/server';

export async function loginAction(formData: FormData) {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    // 1. Authenticate with Supabase
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      return { error: authError.message };
    }

    // 2. Check if user exists in the database 'User' table
    try {
      const dbUser = await prisma.user.findUnique({
        where: { email },
      });

      if (!dbUser) {
        // If authenticated but not in User table, sign out and deny access
        await supabase.auth.signOut();
        return { error: 'Unauthorized: You are not registered as an administrator.' };
      }
    } catch (prismaError: any) {
      console.error("Database connection failed in loginAction:", prismaError);
      return { error: "Database connection failed. Please check if DATABASE_URL is correct on Vercel." };
    }

    return { success: true };
  } catch (err: any) {
    console.error("Unexpected error in loginAction:", err);
    return { error: err.message || "An unexpected system error occurred." };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  await supabase.auth.signOut();
  redirect('/admin/login');
}

// ─── ARTICLE ACTIONS ───

export async function upsertArticle(formData: FormData) {
  const id = formData.get('id') as string | null;
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const excerpt = formData.get('excerpt') as string | null;
  const category = formData.get('category') as string | "article";
  const published = formData.get('published') === 'true';
  const authorName = formData.get('authorName') as string | null;
  const readingTime = formData.get('readingTime') as string | null;
  const keyTakeaways = formData.get('keyTakeaways') as string | null;
  const image = formData.get('image');

  // Auto-generate slug from title if not already present or if title changed significantly
  const slug = title.toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .substring(0, 100);
  
  let imageUrl = typeof image === 'string' ? image : null;
  if (image instanceof File && image.size > 0) {
    const fileName = `articles/${Date.now()}-${image.name}`;
    imageUrl = await uploadFile(image, fileName);
  }

  const data = {
    title,
    content,
    excerpt,
    category,
    published,
    authorName,
    readingTime,
    keyTakeaways,
    slug,
    image: imageUrl || (id ? undefined : '')
  };

  try {
    if (id) {
      await prisma.article.update({ 
        where: { id }, 
        data: data as any 
      });
    } else {
      await prisma.article.create({ 
        data: data as any 
      });
    }
    return { success: true };
  } catch (err: any) {
    console.error("Article upsert error:", err);
    throw new Error(err.message || "Failed to save article.");
  }
}

export async function deleteArticle(id: string) {
  await prisma.article.delete({ where: { id } });
  return { success: true };
}

// ─── LAWYER ACTIONS ───

export async function upsertLawyer(formData: FormData) {
  const id = formData.get('id') as string | null;
  const name = formData.get('name') as string;
  const title = formData.get('title') as string;
  const bio = formData.get('bio') as string | null;
  const email = formData.get('email') as string | null;
  const phone = formData.get('phone') as string | null;
  const education = formData.get('education') as string | null;
  const expertise = formData.get('expertise') as string | null;
  const languages = formData.get('languages') as string | null;
  const socialLinks = formData.get('socialLinks') as string | null;
  const image = formData.get('image');

  // Auto-generate slug from name
  const slug = name.toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .substring(0, 100);
  
  let imageUrl = typeof image === 'string' ? image : null;
  
  if (image instanceof File && image.size > 0) {
    try {
      const fileName = `lawyers/${Date.now()}-${image.name}`;
      imageUrl = await uploadFile(image, fileName);
    } catch (err: any) {
      console.error("Supabase upload failed:", err);
      throw new Error("Failed to upload image. Please check storage connection.");
    }
  }

  const data = {
    name,
    title,
    bio,
    email,
    phone,
    education,
    expertise,
    languages,
    socialLinks,
    slug,
    image: imageUrl || (id ? undefined : '')
  };

  try {
    if (id) {
      await prisma.lawyer.update({ 
        where: { id }, 
        data: data as any
      });
    } else {
      await prisma.lawyer.create({ 
        data: data as any
      });
    }
    return { success: true };
  } catch (err: any) {
    console.error("Lawyer upsert error:", err);
    throw new Error(err.message || "Failed to save lawyer.");
  }
}

export async function deleteLawyer(id: string) {
  await prisma.lawyer.delete({ where: { id } });
  return { success: true };
}

// ─── PRACTICE AREA ACTIONS ───

export async function upsertPracticeArea(formData: FormData) {
  const id = formData.get('id') as string | null;
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const tags = formData.get('tags') as string | null;
  const icon = formData.get('icon') as string | null;
  const image = formData.get('image');

  // Auto-generate slug from title
  const slug = title.toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .substring(0, 100);
  
  let imageUrl = typeof image === 'string' ? image : null;
  if (image instanceof File && image.size > 0) {
    const fileName = `practice-areas/${Date.now()}-${image.name}`;
    imageUrl = await uploadFile(image, fileName);
  }

  const data = {
    title,
    description,
    tags,
    icon,
    slug,
    image: imageUrl || (id ? undefined : '')
  };

  try {
    if (id) {
      await prisma.practiceArea.update({ where: { id }, data: data as any });
    } else {
      await prisma.practiceArea.create({ data: data as any });
    }
    return { success: true };
  } catch (err: any) {
    console.error("Practice area upsert error:", err);
    throw new Error(err.message || "Failed to save practice area.");
  }
}

export async function deletePracticeArea(id: string) {
  await prisma.practiceArea.delete({ where: { id } });
  return { success: true };
}

// ─── CLIENT ACTIONS ───

export async function upsertClient(formData: FormData) {
  const id = formData.get('id') as string | null;
  const name = formData.get('name') as string;
  const website = formData.get('website') as string | null;
  const logo = formData.get('logo');
  
  let logoUrl = typeof logo === 'string' ? logo : null;
  if (logo instanceof File && logo.size > 0) {
    const fileName = `clients/${Date.now()}-${logo.name}`;
    logoUrl = await uploadFile(logo, fileName);
  }

  const data = {
    name,
    website,
    logo: logoUrl || (id ? undefined : '')
  };

  try {
    if (id) {
      await prisma.client.update({ where: { id }, data: data as any });
    } else {
      await prisma.client.create({ data: data as any });
    }
    return { success: true };
  } catch (err: any) {
    console.error("Client upsert error:", err);
    throw new Error(err.message || "Failed to save client.");
  }
}

export async function deleteClient(id: string) {
  await prisma.client.delete({ where: { id } });
  return { success: true };
}

// ─── MEDIA ACTIONS ───

export async function upsertMedia(formData: FormData) {
  const id = formData.get('id') as string | null;
  const title = formData.get('title') as string;
  const url = formData.get('url') as string | null; // Optional
  const publisher = formData.get('publisher') as string | null;
  const dateStr = formData.get('date') as string | null;
  
  const parsedDate = dateStr ? new Date(dateStr) : null;

  const data = {
    title,
    url: url || '', // Handle optional
    publisher,
    date: parsedDate,
  }

  try {
    if (id) {
      await prisma.media.update({ where: { id }, data: data as any });
    } else {
      await prisma.media.create({ data: data as any });
    }
    return { success: true };
  } catch (err: any) {
    console.error("Media coverage upsert error:", err);
    throw new Error(err.message || "Failed to save media coverage.");
  }
}

export async function deleteMedia(id: string) {
  await prisma.media.delete({ where: { id } });
  return { success: true };
}

// ─── SETTING ACTIONS ───

export async function upsertSetting(formData: FormData) {
  const id = formData.get('id') as string | null;
  const key = formData.get('key') as string;
  const value = formData.get('value') as string;

  const data = { key, value };

  try {
    if (id) {
      await prisma.setting.update({ where: { id }, data });
    } else {
      await prisma.setting.create({ data });
    }
    return { success: true };
  } catch (err: any) {
    console.error("Setting upsert error:", err);
    throw new Error(err.message || "Failed to save setting.");
  }
}

export async function deleteSetting(id: string) {
  await prisma.setting.delete({ where: { id } });
  return { success: true };
}


// ─── MEDIA LIBRARY ACTIONS ───

export async function getMediaObjects() {
  try {
    const objects = await listAllObjects()
    const bucketName = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || "lawfirm-assets"
    
    return objects.map(obj => {
      const { data: { publicUrl } } = legacySupabase.storage
        .from(bucketName)
        .getPublicUrl(obj.name)
        
      return {
        name: obj.name,
        size: obj.size,
        lastModified: new Date(obj.lastModified),
        url: publicUrl
      }
    })
  } catch (error) {
    console.error("Failed to list media objects:", error)
    return []
  }
}
