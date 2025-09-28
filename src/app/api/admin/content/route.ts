import { NextRequest, NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/admin-auth'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const user = getUserFromRequest(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Fetch actual content from database
    const content = await db.content.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' }
    })

    // Group content by page
    const groupedContent = content.reduce((acc, item) => {
      const page = item.page || 'global'
      if (!acc[page]) {
        acc[page] = []
      }
      acc[page].push({
        id: item.id,
        key: item.key,
        title: item.title,
        content: item.content,
        type: item.type,
        section: item.section,
        lastModified: item.updatedAt
      })
      return acc
    }, {} as Record<string, any[]>)

    return NextResponse.json({ 
      pages: Object.keys(groupedContent).map(page => ({
        id: page,
        title: page.charAt(0).toUpperCase() + page.slice(1),
        path: page === 'home' ? '/' : `/${page}`,
        sections: groupedContent[page]
      }))
    })
  } catch (error) {
    console.error('Error fetching content:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = getUserFromRequest(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { pageId, sectionId, content: newContent, title, type, key } = await request.json()

    if (!pageId || !sectionId || !newContent) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Check if content exists, if not create it
    const existingContent = await db.content.findFirst({
      where: { 
        AND: [
          { page: pageId },
          { section: sectionId }
        ]
      }
    })

    let savedContent
    if (existingContent) {
      // Update existing content
      savedContent = await db.content.update({
        where: { id: existingContent.id },
        data: {
          content: newContent,
          title: title || existingContent.title,
          type: type || existingContent.type,
          key: key || existingContent.key,
          updatedAt: new Date()
        }
      })
    } else {
      // Create new content
      savedContent = await db.content.create({
        data: {
          page: pageId,
          section: sectionId,
          content: newContent,
          title: title || `${pageId} - ${sectionId}`,
          type: type || 'text',
          key: key || `${pageId}_${sectionId}`
        }
      })
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Content saved successfully',
      data: { 
        id: savedContent.id,
        pageId, 
        sectionId, 
        content: newContent,
        lastModified: savedContent.updatedAt
      }
    })
  } catch (error) {
    console.error('Error saving content:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}