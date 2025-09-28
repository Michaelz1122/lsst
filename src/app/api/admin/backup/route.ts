import { NextRequest, NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/admin-auth'
import { exec } from 'child_process'
import { promisify } from 'util'
import fs from 'fs'
import path from 'path'

const execAsync = promisify(exec)

export async function GET(request: NextRequest) {
  try {
    const user = getUserFromRequest(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const backupDir = path.join(process.cwd(), 'backups')
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true })
    }

    const files = fs.readdirSync(backupDir)
    const backups = files
      .filter(file => file.endsWith('.sql') || file.endsWith('.zip'))
      .map(file => {
        const filePath = path.join(backupDir, file)
        const stats = fs.statSync(filePath)
        return {
          id: file,
          name: file,
          size: formatBytes(stats.size),
          createdAt: stats.mtime.toISOString(),
          type: file.endsWith('.sql') ? 'database' : 'full',
          status: 'completed',
          location: 'Local Storage',
          description: file.endsWith('.sql') ? 'Database backup' : 'Full system backup'
        }
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return NextResponse.json(backups)
  } catch (error) {
    console.error('Error fetching backups:', error)
    return NextResponse.json({ error: 'Failed to fetch backups' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = getUserFromRequest(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { type = 'full' } = body

    const backupDir = path.join(process.cwd(), 'backups')
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true })
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    let filename: string
    let command: string

    if (type === 'database') {
      filename = `backup-db-${timestamp}.sql`
      const dbPath = path.join(process.cwd(), 'db', 'custom.db')
      command = `sqlite3 "${dbPath}" .dump > "${path.join(backupDir, filename)}"`
    } else {
      filename = `backup-full-${timestamp}.zip`
      const zipCommand = `cd "${process.cwd()}" && zip -r "${path.join(backupDir, filename)}" db/ prisma/ public/ src/ --exclude="*/node_modules/*" --exclude="*/.git/*" --exclude="*/backups/*"`
      command = zipCommand
    }

    try {
      await execAsync(command)
      
      const backup = {
        id: filename,
        name: `${type.charAt(0).toUpperCase() + type.slice(1)} Backup - ${timestamp}`,
        type,
        size: formatBytes(fs.statSync(path.join(backupDir, filename)).size),
        status: 'completed',
        createdAt: new Date().toISOString(),
        location: 'Local Storage',
        description: `Manual ${type} backup created successfully`
      }

      return NextResponse.json(backup)
    } catch (execError) {
      console.error('Backup execution error:', execError)
      return NextResponse.json({ error: 'Failed to create backup' }, { status: 500 })
    }
  } catch (error) {
    console.error('Error creating backup:', error)
    return NextResponse.json({ error: 'Failed to create backup' }, { status: 500 })
  }
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}