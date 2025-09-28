import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getUserFromRequest } from '@/lib/admin-auth'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = getUserFromRequest(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const theme = await db.theme.findUnique({
      where: { id: params.id }
    })

    if (!theme) {
      return NextResponse.json({ error: 'Theme not found' }, { status: 404 })
    }

    return NextResponse.json(theme)
  } catch (error) {
    console.error('Error fetching theme:', error)
    return NextResponse.json({ error: 'Failed to fetch theme' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = getUserFromRequest(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, description, settings } = body

    // If this is set as active, deactivate all other themes
    if (settings?.isActive) {
      await db.theme.updateMany({
        where: { isActive: true, id: { not: params.id } },
        data: { isActive: false }
      })
    }

    const theme = await db.theme.update({
      where: { id: params.id },
      data: {
        ...(name && { name }),
        ...(description !== undefined && { description }),
        ...(settings && { settings: JSON.stringify(settings) }),
        ...(settings?.isActive !== undefined && { isActive: settings.isActive })
      }
    })

    return NextResponse.json(theme)
  } catch (error) {
    console.error('Error updating theme:', error)
    return NextResponse.json({ error: 'Failed to update theme' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = getUserFromRequest(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await db.theme.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting theme:', error)
    return NextResponse.json({ error: 'Failed to delete theme' }, { status: 500 })
  }
}