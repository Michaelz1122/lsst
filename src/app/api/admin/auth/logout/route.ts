import { NextRequest, NextResponse } from 'next/server'
import { clearAuthResponse, getUserFromRequest } from '@/lib/admin-auth'

export async function POST(request: NextRequest) {
  try {
    const user = getUserFromRequest(request)
    
    if (user) {
      return clearAuthResponse()
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}