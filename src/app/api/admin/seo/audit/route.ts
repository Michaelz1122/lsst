import { NextRequest, NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/admin-auth'
import { db } from '@/lib/db'

interface SEOAuditResult {
  page: string
  url: string
  score: number
  issues: {
    type: string
    severity: 'high' | 'medium' | 'low'
    message: string
    recommendation: string
  }[]
  recommendations: string[]
}

interface SEOAuditReport {
  overallScore: number
  pagesAnalyzed: number
  results: SEOAuditResult[]
  timestamp: string
  scannedBy: string
  summary: {
    totalIssues: number
    highPriority: number
    mediumPriority: number
    lowPriority: number
  }
}

// POST /api/admin/seo/audit - Perform SEO audit
export async function POST(request: NextRequest) {
  try {
    const user = getUserFromRequest(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Simulate SEO audit by analyzing pages
    const auditResults: SEOAuditResult[] = [
      {
        page: 'Home',
        url: '/',
        score: 92,
        issues: [
          {
            type: 'Content',
            severity: 'low',
            message: 'Content could be more comprehensive',
            recommendation: 'Add more detailed content about services and expertise'
          }
        ],
        recommendations: [
          'Add more internal links',
          'Include customer testimonials',
          'Add case studies'
        ]
      },
      {
        page: 'Services',
        url: '/services',
        score: 78,
        issues: [
          {
            type: 'Meta',
            severity: 'medium',
            message: 'Meta description is too long',
            recommendation: 'Shorten meta description to 150-160 characters'
          },
          {
            type: 'Content',
            severity: 'low',
            message: 'Missing schema markup',
            recommendation: 'Add Service schema markup for better SEO'
          }
        ],
        recommendations: [
          'Optimize meta description',
          'Add structured data',
          'Include pricing information'
        ]
      },
      {
        page: 'About',
        url: '/about',
        score: 88,
        issues: [
          {
            type: 'Technical',
            severity: 'medium',
            message: 'Page load speed could be improved',
            recommendation: 'Optimize images and enable caching'
          }
        ],
        recommendations: [
          'Compress images',
          'Enable browser caching',
          'Add more personal details'
        ]
      },
      {
        page: 'Contact',
        url: '/contact',
        score: 65,
        issues: [
          {
            type: 'Content',
            severity: 'high',
            message: 'Missing contact form schema',
            recommendation: 'Add ContactForm schema markup'
          },
          {
            type: 'Technical',
            severity: 'medium',
            message: 'Missing alt text on images',
            recommendation: 'Add descriptive alt text to all images'
          },
          {
            type: 'Meta',
            severity: 'low',
            message: 'Meta title could be more descriptive',
            recommendation: 'Include primary keywords in meta title'
          }
        ],
        recommendations: [
          'Add contact form schema',
          'Optimize images with alt text',
          'Improve meta title',
          'Add business hours',
          'Include Google Maps embed'
        ]
      }
    ]

    // Calculate overall statistics
    const totalIssues = auditResults.reduce((sum, page) => sum + page.issues.length, 0)
    const highPriority = auditResults.reduce((sum, page) => 
      sum + page.issues.filter(issue => issue.severity === 'high').length, 0
    )
    const mediumPriority = auditResults.reduce((sum, page) => 
      sum + page.issues.filter(issue => issue.severity === 'medium').length, 0
    )
    const lowPriority = auditResults.reduce((sum, page) => 
      sum + page.issues.filter(issue => issue.severity === 'low').length, 0
    )

    const overallScore = Math.round(
      auditResults.reduce((sum, page) => sum + page.score, 0) / auditResults.length
    )

    const auditReport: SEOAuditReport = {
      overallScore,
      pagesAnalyzed: auditResults.length,
      results: auditResults,
      timestamp: new Date().toISOString(),
      scannedBy: user.username,
      summary: {
        totalIssues,
        highPriority,
        mediumPriority,
        lowPriority
      }
    }

    // Log the SEO audit
    await db.securityLog.create({
      data: {
        level: 'info',
        message: `SEO audit completed with score: ${overallScore}%`,
        user: user.username,
        ip: request.headers.get('x-forwarded-for') || 'unknown',
        action: 'seo_audit'
      }
    })

    return NextResponse.json(auditReport)
  } catch (error) {
    console.error('Error performing SEO audit:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}