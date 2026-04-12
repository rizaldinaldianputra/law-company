import { NextRequest, NextResponse } from "next/server"
export const dynamic = "force-dynamic"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get("category")

    const articles = await prisma.article.findMany({
      where: category ? { category } : {},
      orderBy: { createdAt: "desc" }
    })
    return NextResponse.json(articles)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const article = await prisma.article.create({
      data: {
        title: data.title,
        slug: data.slug,
        content: data.content,
        excerpt: data.excerpt,
        image: data.image,
        category: data.category,
        published: data.published,
      }
    })
    return NextResponse.json(article, { status: 201 })
  } catch (error) {
    console.error("Create error:", error)
    return NextResponse.json({ error: "Failed to create article" }, { status: 500 })
  }
}
