'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { prisma } from "@/lib/prisma";
import { uploadFile, listAllObjects, deleteFile } from "@/lib/minio";
import slugify from 'slugify';

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    const user = await prisma.user.findUnique({
      where: { email } as any
    });

    if (user && user.password === password) {
      const cookieStore = await cookies();
      cookieStore.set('admin_session', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
      });

      return { success: true };
    }

    return { error: 'Invalid email or password' };
  } catch (err: any) {
    return { error: "Database connection error. Please ensure your database is running." };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  redirect('/admin/login');
}

// ─── ARTICLE ACTIONS ───

export async function upsertArticle(formData: FormData) {
  try {
    const idStr = formData.get('id');
    // Ensure we parse to number but cast to any to avoid stale type errors
    const id = idStr ? Number(idStr) : null;

    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const excerpt = formData.get('excerpt') as string | null;
    const category = formData.get('category') as string | "article";
    const published = formData.get('published') === 'true';
    const authorName = formData.get('authorName') as string | null;
    const readingTime = formData.get('readingTime') as string | null;
    const keyTakeaways = formData.get('keyTakeaways') as string | null;
    const image = formData.get('image');
    const eventDate = formData.get('eventDate') as string | null;
    const location = formData.get('location') as string | null;
    const jobType = formData.get('jobType') as string | null;

    const slug = slugify(title, { lower: true, strict: true }).substring(0, 100);

    let imageUrl = typeof image === 'string' ? image : null;
    if (image instanceof File && image.size > 0) {
      imageUrl = await uploadFile(image);
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
      eventDate: (eventDate && !isNaN(Date.parse(eventDate))) ? new Date(eventDate) : null,
      location,
      jobType,
      image: imageUrl || (id ? undefined : '')
    };

    if (id) {
      // Direct cast to any to bypass stale LawyerWhereUniqueInput/ArticleWhereUniqueInput checks
      await prisma.article.update({ where: { id: id as any }, data: data as any });
    } else {
      await prisma.article.create({ data: data as any });
    }
    
    revalidatePath('/admin/articles');
    
    // Special handling for singular folder names
    const pathMap: Record<string, string> = {
      'article': 'articles',
      'career': 'career',
      'research': 'research',
      'event': 'events',
      'award': 'awards'
    };
    const path = pathMap[category] || `${category}s`;
    revalidatePath(`/admin/${path}`);
    
    revalidatePath('/');
    
    return { success: true };
  } catch (err: any) {
    return { error: err.message || "Failed to save article." };
  }
}

export async function deleteArticle(id: number) {
  try {
    const article = await prisma.article.findUnique({ where: { id: id as any } });
    if (!article) return { error: "Article not found" };

    const category = article.category;
    await prisma.article.delete({ where: { id: id as any } });

    revalidatePath('/admin/articles');
    const pathMap: Record<string, string> = {
      'article': 'articles',
      'career': 'career',
      'research': 'research',
      'event': 'events',
      'award': 'awards'
    };
    const path = pathMap[category] || `${category}s`;
    revalidatePath(`/admin/${path}`);
    revalidatePath('/');

    return { success: true };
  } catch (err: any) {
    return { error: err.message || "Failed to delete item." };
  }
}

// ─── LAWYER ACTIONS ───

export async function upsertLawyer(formData: FormData) {
  try {
    const idStr = formData.get('id');
    const id = idStr ? Number(idStr) : null;

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

    const slug = slugify(name, { lower: true, strict: true }).substring(0, 100);

    let imageUrl = typeof image === 'string' ? image : null;
    if (image instanceof File && image.size > 0) {
      imageUrl = await uploadFile(image);
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

    if (id) {
      await prisma.lawyer.update({ where: { id: id as any }, data: data as any });
    } else {
      await prisma.lawyer.create({ data: data as any });
    }
    
    revalidatePath('/admin/lawyers');
    revalidatePath('/');
    
    return { success: true };
  } catch (err: any) {
    return { error: err.message || "Failed to save lawyer." };
  }
}

export async function deleteLawyer(id: number) {
  await prisma.lawyer.delete({ where: { id: id as any } });
  revalidatePath('/admin/lawyers');
  return { success: true };
}

// ─── PRACTICE AREA ACTIONS ───

export async function upsertPracticeArea(formData: FormData) {
  try {
    const idStr = formData.get('id');
    const id = idStr ? Number(idStr) : null;

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const tags = formData.get('tags') as string | null;
    const icon = formData.get('icon') as string | null;
    const image = formData.get('image');

    const slug = slugify(title, { lower: true, strict: true }).substring(0, 100);

    let imageUrl = typeof image === 'string' ? image : null;
    if (image instanceof File && image.size > 0) {
      imageUrl = await uploadFile(image);
    }

    const data = {
      title,
      description,
      tags,
      icon,
      slug,
      image: imageUrl || (id ? undefined : '')
    };

    if (id) {
      await prisma.practiceArea.update({ where: { id: id as any }, data: data as any });
    } else {
      await prisma.practiceArea.create({ data: data as any });
    }
    
    revalidatePath('/admin/practice-areas');
    revalidatePath('/');
    
    return { success: true };
  } catch (err: any) {
    console.error("Save error:", err);
    if (err.code === 'P2002') {
      return { error: `Another record with this ${err.meta?.target?.[0] || 'title'} already exists.` };
    }
    return { error: err.message || "Failed to save record." };
  }
}

export async function deletePracticeArea(id: number) {
  try {
    console.log("Deleting record with ID:", id);
    await prisma.practiceArea.delete({ where: { id: id as any } });
    revalidatePath('/admin/practice-areas');
    return { success: true };
  } catch (err: any) {
    console.error("Delete error:", err);
    throw err;
  }
}


// ─── CLIENT ACTIONS ───

export async function upsertClient(formData: FormData) {
  try {
    const idStr = formData.get('id');
    const id = idStr ? Number(idStr) : null;

    const name = formData.get('name') as string;
    const website = formData.get('website') as string | null;
    const logo = formData.get('logo');

    let logoUrl = typeof logo === 'string' ? logo : null;
    if (logo instanceof File && logo.size > 0) {
      logoUrl = await uploadFile(logo);
    }

    const data = {
      name,
      website,
      logo: logoUrl || (id ? undefined : '')
    };

    if (id) {
      await prisma.client.update({ where: { id: id as any }, data: data as any });
    } else {
      await prisma.client.create({ data: data as any });
    }
    
    revalidatePath('/admin/clients');
    revalidatePath('/');
    
    return { success: true };
  } catch (err: any) {
    return { error: err.message || "Failed to save client." };
  }
}

export async function deleteClient(id: number) {
  await prisma.client.delete({ where: { id: id as any } });
  revalidatePath('/admin/clients');
  return { success: true };
}

// ─── MEDIA ACTIONS ───

export async function upsertMedia(formData: FormData) {
  try {
    const idStr = formData.get('id');
    const id = idStr ? Number(idStr) : null;

    const title = formData.get('title') as string;
    const url = formData.get('url') as string | null;
    const publisher = formData.get('publisher') as string | null;
    const dateStr = formData.get('date') as string | null;

    const parsedDate = dateStr ? new Date(dateStr) : null;

    const data = {
      title,
      url: url || '',
      publisher,
      date: parsedDate,
    };

    if (id) {
      await prisma.media.update({ where: { id: id as any }, data: data as any });
    } else {
      await prisma.media.create({ data: data as any });
    }
    revalidatePath('/admin/media');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || "Failed to save media coverage." };
  }
}

export async function deleteMedia(id: number) {
  await prisma.media.delete({ where: { id: id as any } });
  revalidatePath('/admin/media');
  return { success: true };
}

// ─── SETTING ACTIONS ───

export async function upsertSetting(formData: FormData) {
  try {
    const idStr = formData.get('id');
    const id = idStr ? Number(idStr) : null;

    const key = formData.get('key') as string;
    const value = formData.get('value') as string;

    const data = { key, value };

    if (id) {
      await prisma.setting.update({ where: { id: id as any }, data: data as any });
    } else {
      await prisma.setting.create({ data: data as any });
    }
    revalidatePath('/admin/settings');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || "Failed to save setting." };
  }
}

export async function deleteSetting(id: number) {
  await prisma.setting.delete({ where: { id: id as any } });
  revalidatePath('/admin/settings');
  return { success: true };
}

// ─── MEDIA LIBRARY ACTIONS ───

export async function getMediaObjects() {
  try {
    const objects = await listAllObjects()
    const baseUrl = process.env.NEXT_PUBLIC_MINIO_URL || `http://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}`
    const bucket = process.env.MINIO_BUCKET || 'lawfirm'

    return objects.map(obj => ({
      name: obj.name,
      size: obj.size,
      lastModified: obj.lastModified,
      url: `${baseUrl}/${bucket}/${obj.name}`
    }))
  } catch (error) {
    return []
  }
}

export async function deleteMediaObject(fileName: string) {
  try {
    await deleteFile(fileName);
    revalidatePath('/admin/media-library');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || "Failed to delete file." };
  }
}
