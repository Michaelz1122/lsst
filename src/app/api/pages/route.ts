import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const pages = await db.page.findMany({
      orderBy: { updatedAt: 'desc' }
    })

    return NextResponse.json(pages)
  } catch (error) {
    console.error('Get pages error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, slug, content, seoTitle, seoDescription, seoKeywords, isPublished } = await request.json()

    if (!title || !slug) {
      return NextResponse.json(
        { error: 'Title and slug are required' },
        { status: 400 }
      )
    }

    // Check if slug already exists
    const existingPage = await db.page.findUnique({
      where: { slug }
    })

    if (existingPage) {
      return NextResponse.json(
        { error: 'Page with this slug already exists' },
        { status: 400 }
      )
    }

    const page = await db.page.create({
      data: {
        title,
        slug,
        content: content || '[]',
        seoTitle,
        seoDescription,
        seoKeywords,
        isPublished: isPublished || false
      }
    })

    return NextResponse.json(page)
  } catch (error) {
    console.error('Create page error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}