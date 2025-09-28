import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const landingPages = await db.landingPage.findMany({
      orderBy: { updatedAt: 'desc' }
    })

    return NextResponse.json(landingPages)
  } catch (error) {
    console.error('Get landing pages error:', error)
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
    const existingPage = await db.landingPage.findUnique({
      where: { slug }
    })

    if (existingPage) {
      return NextResponse.json(
        { error: 'Landing page with this slug already exists' },
        { status: 400 }
      )
    }

    const landingPage = await db.landingPage.create({
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

    return NextResponse.json(landingPage)
  } catch (error) {
    console.error('Create landing page error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}