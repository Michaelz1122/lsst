import { NextRequest, NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/admin-auth'
import fs from 'fs'
import path from 'path'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = getUserFromRequest(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const backupDir = path.join(process.cwd(), 'backups')
    const filePath = path.join(backupDir, params.id)

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Backup not found' }, { status: 404 })
    }

    const fileBuffer = fs.readFileSync(filePath)
    const stats = fs.statSync(filePath)

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Length': stats.size.toString(),
        'Content-Disposition': `attachment; filename="${params.id}"`
      }
    })
  } catch (error) {
    console.error('Error downloading backup:', error)
    return NextResponse.json({ error: 'Failed to download backup' }, { status: 500 })
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

    const backupDir = path.join(process.cwd(), 'backups')
    const filePath = path.join(backupDir, params.id)

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Backup not found' }, { status: 404 })
    }

    fs.unlinkSync(filePath)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting backup:', error)
    return NextResponse.json({ error: 'Failed to delete backup' }, { status: 500 })
  }
}