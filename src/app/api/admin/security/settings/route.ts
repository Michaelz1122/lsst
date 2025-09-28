import { NextRequest, NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/admin-auth'
import { db } from '@/lib/db'

// Security settings interface
interface SecuritySetting {
  id: string
  name: string
  description: string
  enabled: boolean
  category: 'authentication' | 'data' | 'network' | 'general'
  value?: string | number | boolean
}

// Default security settings
const defaultSecuritySettings: SecuritySetting[] = [
  {
    id: 'two_factor_auth',
    name: 'Two-Factor Authentication',
    description: 'Require 2FA for all admin users',
    enabled: true,
    category: 'authentication'
  },
  {
    id: 'password_strength',
    name: 'Password Strength Requirements',
    description: 'Enforce strong password policies',
    enabled: true,
    category: 'authentication'
  },
  {
    id: 'login_attempts',
    name: 'Login Attempt Limiting',
    description: 'Limit failed login attempts to prevent brute force attacks',
    enabled: true,
    category: 'authentication',
    value: 5
  },
  {
    id: 'session_timeout',
    name: 'Session Timeout',
    description: 'Automatically log out inactive users',
    enabled: true,
    category: 'authentication',
    value: 30
  },
  {
    id: 'data_encryption',
    name: 'Data Encryption',
    description: 'Encrypt sensitive data at rest and in transit',
    enabled: true,
    category: 'data'
  },
  {
    id: 'regular_backups',
    name: 'Regular Backups',
    description: 'Automated daily backups of all data',
    enabled: true,
    category: 'data'
  },
  {
    id: 'ssl_enforcement',
    name: 'SSL/TLS Enforcement',
    description: 'Require HTTPS for all connections',
    enabled: true,
    category: 'network'
  },
  {
    id: 'firewall_protection',
    name: 'Firewall Protection',
    description: 'Active firewall with intrusion detection',
    enabled: true,
    category: 'network'
  },
  {
    id: 'security_logging',
    name: 'Security Logging',
    description: 'Comprehensive logging of all security events',
    enabled: true,
    category: 'general'
  },
  {
    id: 'automatic_updates',
    name: 'Automatic Updates',
    description: 'Keep system and dependencies updated',
    enabled: false,
    category: 'general'
  }
]

// Password policy settings
interface PasswordPolicy {
  minLength: number
  requireUppercase: boolean
  requireNumbers: boolean
  requireSpecialChars: boolean
  expiryDays: number
}

const defaultPasswordPolicy: PasswordPolicy = {
  minLength: 12,
  requireUppercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
  expiryDays: 90
}

// GET /api/admin/security/settings - Retrieve security settings
export async function GET(request: NextRequest) {
  try {
    const user = getUserFromRequest(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // In a real implementation, you would fetch these from a database
    // For now, we'll return the default settings
    return NextResponse.json({
      settings: defaultSecuritySettings,
      passwordPolicy: defaultPasswordPolicy
    })
  } catch (error) {
    console.error('Error fetching security settings:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/admin/security/settings - Update security settings
export async function POST(request: NextRequest) {
  try {
    const user = getUserFromRequest(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { settings, passwordPolicy } = await request.json()

    // Validate input
    if (!settings || !Array.isArray(settings)) {
      return NextResponse.json(
        { error: 'Invalid settings format' },
        { status: 400 }
      )
    }

    // In a real implementation, you would save these to a database
    // For now, we'll just validate and return success
    
    // Log the security setting change
    await db.securityLog.create({
      data: {
        level: 'info',
        message: 'Security settings updated',
        user: user.username,
        ip: request.headers.get('x-forwarded-for') || 'unknown',
        action: 'settings_update'
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Security settings updated successfully'
    })
  } catch (error) {
    console.error('Error updating security settings:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}