import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const settings = await db.setting.findMany({
      orderBy: { key: 'asc' }
    })

    // Convert to key-value object
    const settingsObj: Record<string, any> = {}
    settings.forEach(setting => {
      try {
        settingsObj[setting.key] = JSON.parse(setting.value)
      } catch {
        settingsObj[setting.key] = setting.value
      }
    })

    return NextResponse.json(settingsObj)
  } catch (error) {
    console.error('Get settings error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { key, value } = await request.json()

    if (!key || value === undefined) {
      return NextResponse.json(
        { error: 'Key and value are required' },
        { status: 400 }
      )
    }

    // Check if setting exists
    const existingSetting = await db.setting.findUnique({
      where: { key }
    })

    let setting
    if (existingSetting) {
      // Update existing setting
      setting = await db.setting.update({
        where: { key },
        data: { value: typeof value === 'string' ? value : JSON.stringify(value) }
      })
    } else {
      // Create new setting
      setting = await db.setting.create({
        data: {
          key,
          value: typeof value === 'string' ? value : JSON.stringify(value)
        }
      })
    }

    return NextResponse.json({ success: true, setting })
  } catch (error) {
    console.error('Update setting error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}