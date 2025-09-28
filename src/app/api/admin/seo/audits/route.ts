import { NextRequest, NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/admin-auth'
import { db } from '@/lib/db'

interface SEOAudit {
  id: string
  page: string
  issue: string
  severity: 'high' | 'medium' | 'low'
  description: string
  recommendation: string
  status: 'open' | 'in-progress' | 'resolved'
}

// GET /api/admin/seo/audits - Retrieve all SEO audits
export async function GET(request: NextRequest) {
  try {
    const user = getUserFromRequest(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const severity = searchParams.get('severity')
    const status = searchParams.get('status')
    const page = searchParams.get('page')

    // In a real implementation, you would fetch from database
    // For now, we'll return mock data
    
    let mockAudits: SEOAudit[] = [
      {
        id: '1',
        page: 'Home',
        issue: 'Missing H1 tag',
        severity: 'high',
        description: 'The home page is missing a proper H1 tag',
        recommendation: 'Add a descriptive H1 tag that includes main keywords',
        status: 'open'
      },
      {
        id: '2',
        page: 'Services',
        issue: 'Meta description too long',
        severity: 'medium',
        description: 'Meta description exceeds 160 characters',
        recommendation: 'Shorten meta description to 150-160 characters',
        status: 'in-progress'
      },
      {
        id: '3',
        page: 'Contact',
        issue: 'Missing alt text on images',
        severity: 'medium',
        description: 'Images are missing descriptive alt text',
        recommendation: 'Add descriptive alt text to all images',
        status: 'open'
      },
      {
        id: '4',
        page: 'About',
        issue: 'Slow page load speed',
        severity: 'high',
        description: 'Page load time exceeds 3 seconds',
        recommendation: 'Optimize images and minify CSS/JS files',
        status: 'resolved'
      },
      {
        id: '5',
        page: 'Services',
        issue: 'Duplicate meta titles',
        severity: 'high',
        description: 'Meta title is similar to another page',
        recommendation: 'Create unique meta titles for each page',
        status: 'open'
      },
      {
        id: '6',
        page: 'Home',
        issue: 'Missing structured data',
        severity: 'low',
        description: 'Page lacks structured data markup',
        recommendation: 'Add JSON-LD structured data for better SEO',
        status: 'in-progress'
      }
    ]

    // Apply filters
    if (severity) {
      mockAudits = mockAudits.filter(audit => audit.severity === severity)
    }
    if (status) {
      mockAudits = mockAudits.filter(audit => audit.status === status)
    }
    if (page) {
      mockAudits = mockAudits.filter(audit => audit.page.toLowerCase().includes(page.toLowerCase()))
    }

    // Calculate statistics
    const stats = {
      total: mockAudits.length,
      high: mockAudits.filter(a => a.severity === 'high').length,
      medium: mockAudits.filter(a => a.severity === 'medium').length,
      low: mockAudits.filter(a => a.severity === 'low').length,
      open: mockAudits.filter(a => a.status === 'open').length,
      inProgress: mockAudits.filter(a => a.status === 'in-progress').length,
      resolved: mockAudits.filter(a => a.status === 'resolved').length
    }

    return NextResponse.json({
      audits: mockAudits,
      stats
    })
  } catch (error) {
    console.error('Error fetching SEO audits:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/admin/seo/audits - Create new SEO audit
export async function POST(request: NextRequest) {
  try {
    const user = getUserFromRequest(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()

    // Validate input
    if (!data.page || !data.issue || !data.severity) {
      return NextResponse.json(
        { error: 'Page, issue, and severity are required' },
        { status: 400 }
      )
    }

    // In a real implementation, you would save to database
    const newAudit: SEOAudit = {
      id: `audit_${Date.now()}`,
      page: data.page,
      issue: data.issue,
      severity: data.severity,
      description: data.description || '',
      recommendation: data.recommendation || '',
      status: data.status || 'open'
    }

    // Log the audit creation
    await db.securityLog.create({
      data: {
        level: 'info',
        message: `New SEO audit created: ${data.issue} on ${data.page}`,
        user: user.username,
        ip: request.headers.get('x-forwarded-for') || 'unknown',
        action: 'seo_audit_create'
      }
    })

    return NextResponse.json({
      success: true,
      message: 'SEO audit created successfully',
      audit: newAudit
    })
  } catch (error) {
    console.error('Error creating SEO audit:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}