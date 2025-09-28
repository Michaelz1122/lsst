import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    const landingPage = await db.landingPage.findUnique({
      where: { id: params.id }
    })

    if (!landingPage) {
      return NextResponse.json(
        { error: 'Landing page not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(landingPage)
  } catch (error) {
    console.error('Get landing page error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    const { title, slug, content, seoTitle, seoDescription, seoKeywords, isPublished } = await request.json()

    const existingPage = await db.landingPage.findUnique({
      where: { id: params.id }
    })

    if (!existingPage) {
      return NextResponse.json(
        { error: 'Landing page not found' },
        { status: 404 }
      )
    }

    // Check if new slug conflicts with existing pages
    if (slug && slug !== existingPage.slug) {
      const slugConflict = await db.landingPage.findUnique({
        where: { slug }
      })

      if (slugConflict) {
        return NextResponse.json(
          { error: 'Landing page with this slug already exists' },
          { status: 400 }
        )
      }
    }

    const landingPage = await db.landingPage.update({
      where: { id: params.id },
      data: {
        ...(title && { title }),
        ...(slug && { slug }),
        ...(content !== undefined && { content }),
        ...(seoTitle !== undefined && { seoTitle }),
        ...(seoDescription !== undefined && { seoDescription }),
        ...(seoKeywords !== undefined && { seoKeywords }),
        ...(isPublished !== undefined && { isPublished })
      }
    })

    return NextResponse.json(landingPage)
  } catch (error) {
    console.error('Update landing page error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    const landingPage = await db.landingPage.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Landing page deleted successfully' })
  } catch (error) {
    console.error('Delete landing page error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}