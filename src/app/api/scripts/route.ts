import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const scripts = await db.script.findMany({
      orderBy: { updatedAt: 'desc' }
    })

    return NextResponse.json(scripts)
  } catch (error) {
    console.error('Get scripts error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, code, type, placement, isGlobal, pageId, conditions, isActive } = await request.json()

    if (!name || !code || !type || !placement) {
      return NextResponse.json(
        { error: 'Name, code, type, and placement are required' },
        { status: 400 }
      )
    }

    const script = await db.script.create({
      data: {
        name,
        code,
        type,
        placement,
        isGlobal: isGlobal || false,
        pageId,
        conditions,
        isActive: isActive !== undefined ? isActive : true
      }
    })

    return NextResponse.json(script)
  } catch (error) {
    console.error('Create script error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}