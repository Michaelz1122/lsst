import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getUserFromRequest } from '@/lib/admin-auth'

export async function GET(request: NextRequest) {
  try {
    const user = getUserFromRequest(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const themes = await db.theme.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(themes)
  } catch (error) {
    console.error('Error fetching themes:', error)
    return NextResponse.json({ error: 'Failed to fetch themes' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = getUserFromRequest(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, description, settings } = body

    if (!name) {
      return NextResponse.json({ error: 'Theme name is required' }, { status: 400 })
    }

    // If this is set as active, deactivate all other themes
    if (settings?.isActive) {
      await db.theme.updateMany({
        where: { isActive: true },
        data: { isActive: false }
      })
    }

    const theme = await db.theme.create({
      data: {
        name,
        description,
        settings: JSON.stringify(settings),
        isActive: settings?.isActive || false
      }
    })

    return NextResponse.json(theme)
  } catch (error) {
    console.error('Error creating theme:', error)
    return NextResponse.json({ error: 'Failed to create theme' }, { status: 500 })
  }
}