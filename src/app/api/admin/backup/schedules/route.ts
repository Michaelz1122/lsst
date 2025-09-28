import { NextRequest, NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/admin-auth'

export async function GET(request: NextRequest) {
  try {
    const user = getUserFromRequest(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Mock schedules for now - in a real app, this would fetch from database
    const schedules = [
      {
        id: '1',
        name: 'Daily Full Backup',
        frequency: 'daily',
        time: '02:00',
        enabled: true,
        type: 'full',
        nextRun: '2024-01-21 02:00:00',
        retention: 30
      },
      {
        id: '2',
        name: 'Weekly Database Backup',
        frequency: 'weekly',
        time: '06:00',
        enabled: true,
        type: 'full',
        nextRun: '2024-01-22 06:00:00',
        retention: 90
      },
      {
        id: '3',
        name: 'Monthly Archive',
        frequency: 'monthly',
        time: '01:00',
        enabled: false,
        type: 'full',
        nextRun: '2024-02-01 01:00:00',
        retention: 365
      }
    ]

    return NextResponse.json(schedules)
  } catch (error) {
    console.error('Error fetching backup schedules:', error)
    return NextResponse.json({ error: 'Failed to fetch backup schedules' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = getUserFromRequest(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, frequency, time, type, retention } = body

    if (!name || !frequency || !time || !type || !retention) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    // Calculate next run time based on frequency
    const nextRun = calculateNextRun(frequency, time)

    const schedule = {
      id: Date.now().toString(),
      name,
      frequency,
      time,
      enabled: true,
      type,
      nextRun,
      retention
    }

    return NextResponse.json(schedule)
  } catch (error) {
    console.error('Error creating backup schedule:', error)
    return NextResponse.json({ error: 'Failed to create backup schedule' }, { status: 500 })
  }
}

function calculateNextRun(frequency: string, time: string): string {
  const now = new Date()
  const [hours, minutes] = time.split(':').map(Number)
  
  const nextRun = new Date(now)
  nextRun.setHours(hours, minutes, 0, 0)
  
  if (nextRun <= now) {
    switch (frequency) {
      case 'daily':
        nextRun.setDate(nextRun.getDate() + 1)
        break
      case 'weekly':
        nextRun.setDate(nextRun.getDate() + 7)
        break
      case 'monthly':
        nextRun.setMonth(nextRun.getMonth() + 1)
        break
    }
  }
  
  return nextRun.toISOString()
}