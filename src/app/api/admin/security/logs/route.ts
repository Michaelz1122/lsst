import { NextRequest, NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/admin-auth'
import { db } from '@/lib/db'

interface SecurityLog {
  id: string
  timestamp: string
  level: 'info' | 'warning' | 'error' | 'success'
  message: string
  user: string
  ip: string
  action: string
}

// GET /api/admin/security/logs - Retrieve security logs
export async function GET(request: NextRequest) {
  try {
    const user = getUserFromRequest(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')
    const level = searchParams.get('level') as 'info' | 'warning' | 'error' | 'success' | null
    const action = searchParams.get('action')

    // Build where clause
    const where: any = {}
    if (level) where.level = level
    if (action) where.action = action

    // In a real implementation, you would fetch these from a database
    // For now, we'll generate mock data that matches the database schema
    
    // Mock logs for demonstration
    const mockLogs: SecurityLog[] = [
      {
        id: '1',
        timestamp: '2024-01-20 14:30:25',
        level: 'success',
        message: 'User login successful',
        user: 'admin@example.com',
        ip: '192.168.1.100',
        action: 'login'
      },
      {
        id: '2',
        timestamp: '2024-01-20 14:25:10',
        level: 'warning',
        message: 'Multiple failed login attempts detected',
        user: 'unknown',
        ip: '192.168.1.150',
        action: 'failed_login'
      },
      {
        id: '3',
        timestamp: '2024-01-20 14:20:45',
        level: 'info',
        message: 'Password changed for user',
        user: 'admin@example.com',
        ip: '192.168.1.100',
        action: 'password_change'
      },
      {
        id: '4',
        timestamp: '2024-01-20 14:15:30',
        level: 'error',
        message: 'Unauthorized access attempt to admin panel',
        user: 'unknown',
        ip: '192.168.1.200',
        action: 'unauthorized_access'
      },
      {
        id: '5',
        timestamp: '2024-01-20 14:10:15',
        level: 'success',
        message: 'Security scan completed',
        user: 'system',
        ip: 'localhost',
        action: 'security_scan'
      }
    ]

    // Apply filters
    let filteredLogs = mockLogs
    if (level) {
      filteredLogs = filteredLogs.filter(log => log.level === level)
    }
    if (action) {
      filteredLogs = filteredLogs.filter(log => log.action === action)
    }

    // Apply pagination
    const paginatedLogs = filteredLogs.slice(offset, offset + limit)

    // Calculate security statistics
    const securityStats = {
      totalEvents: filteredLogs.length,
      successfulLogins: filteredLogs.filter(log => log.level === 'success' && log.action === 'login').length,
      failedAttempts: filteredLogs.filter(log => log.level === 'warning' && log.action === 'failed_login').length,
      securityScore: Math.max(0, 100 - (filteredLogs.filter(log => log.level === 'error').length * 10))
    }

    return NextResponse.json({
      logs: paginatedLogs,
      stats: securityStats,
      total: filteredLogs.length,
      limit,
      offset
    })
  } catch (error) {
    console.error('Error fetching security logs:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/admin/security/logs - Add new security log entry
export async function POST(request: NextRequest) {
  try {
    const user = getUserFromRequest(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { level, message, action } = await request.json()

    // Validate input
    if (!level || !message || !action) {
      return NextResponse.json(
        { error: 'Level, message, and action are required' },
        { status: 400 }
      )
    }

    // Create security log entry
    const logEntry = await db.securityLog.create({
      data: {
        level,
        message,
        user: user.username,
        ip: request.headers.get('x-forwarded-for') || 'unknown',
        action
      }
    })

    return NextResponse.json({
      success: true,
      log: logEntry
    })
  } catch (error) {
    console.error('Error creating security log:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}