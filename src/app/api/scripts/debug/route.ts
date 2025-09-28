import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const scripts = await db.script.findMany({
      where: { isActive: true },
      orderBy: { updatedAt: 'desc' }
    })

    // Group scripts by placement
    const scriptsByPlacement = {
      head: scripts.filter(s => s.placement === 'head'),
      body_start: scripts.filter(s => s.placement === 'body_start'),
      body_end: scripts.filter(s => s.placement === 'body_end')
    }

    // Get pages for page-specific scripts
    const pages = await db.page.findMany({
      select: { id: true, title: true, slug: true }
    })

    const landingPages = await db.landingPage.findMany({
      select: { id: true, title: true, slug: true }
    })

    return NextResponse.json({
      scriptsByPlacement,
      allScripts: scripts,
      pages: [...pages, ...landingPages],
      summary: {
        total: scripts.length,
        active: scripts.filter(s => s.isActive).length,
        global: scripts.filter(s => s.isGlobal).length,
        pageSpecific: scripts.filter(s => !s.isGlobal).length,
        byType: {
          pixel: scripts.filter(s => s.type === 'pixel').length,
          analytics: scripts.filter(s => s.type === 'analytics').length,
          custom: scripts.filter(s => s.type === 'custom').length
        }
      }
    })
  } catch (error) {
    console.error('Debug scripts error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}