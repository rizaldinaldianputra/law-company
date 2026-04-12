import { NextRequest, NextResponse } from "next/server"
export const dynamic = "force-dynamic"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
  try {
    const lawyers = await prisma.lawyer.findMany({
      orderBy: { createdAt: "desc" }
    })
    return NextResponse.json(lawyers)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch lawyers" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const lawyer = await prisma.lawyer.create({
      data: {
        name: data.name,
        title: data.title,
        slug: data.slug,
        bio: data.bio,
        image: data.image,
        email: data.email,
        phone: data.phone,
      }
    })
    return NextResponse.json(lawyer, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create lawyer" }, { status: 500 })
  }
}
