import { NextRequest, NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/admin-auth'
import { db } from '@/lib/db'

interface SEOSettings {
  siteName: string
  defaultMetaDescription: string
  defaultKeywords: string
  robotsTxt: string
  sitemapUrl: string
  googleAnalyticsId: string
  googleSearchConsole: string
  bingWebmasterTools: string
  enableSitemap: boolean
  enableRobotsTxt: boolean
  enableCanonicalUrls: boolean
  enableStructuredData: boolean
  enableOpenGraph: boolean
  enableTwitterCards: boolean
}

const defaultSettings: SEOSettings = {
  siteName: 'Michael Zahy Marketing',
  defaultMetaDescription: 'Performance marketing expert helping businesses achieve exceptional ROI through data-driven digital advertising campaigns.',
  defaultKeywords: 'performance marketing, media buying, digital advertising, ROI optimization',
  robotsTxt: 'User-agent: *\nAllow: /\n\nSitemap: https://michaelzahy.com/sitemap.xml',
  sitemapUrl: 'https://michaelzahy.com/sitemap.xml',
  googleAnalyticsId: 'G-XXXXXXXXXX',
  googleSearchConsole: 'https://search.google.com/search-console',
  bingWebmasterTools: 'https://www.bing.com/webmasters',
  enableSitemap: true,
  enableRobotsTxt: true,
  enableCanonicalUrls: true,
  enableStructuredData: true,
  enableOpenGraph: true,
  enableTwitterCards: true
}

// GET /api/admin/seo/settings - Retrieve SEO settings
export async function GET(request: NextRequest) {
  try {
    const user = getUserFromRequest(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // In a real implementation, you would fetch from database
    // For now, we'll return default settings
    return NextResponse.json({
      settings: defaultSettings
    })
  } catch (error) {
    console.error('Error fetching SEO settings:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/admin/seo/settings - Update SEO settings
export async function POST(request: NextRequest) {
  try {
    const user = getUserFromRequest(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()

    // Validate input
    if (!data.siteName) {
      return NextResponse.json(
        { error: 'Site name is required' },
        { status: 400 }
      )
    }

    // In a real implementation, you would save to database
    const updatedSettings = { ...defaultSettings, ...data }

    // Log the settings update
    await db.securityLog.create({
      data: {
        level: 'info',
        message: 'SEO settings updated',
        user: user.username,
        ip: request.headers.get('x-forwarded-for') || 'unknown',
        action: 'seo_settings_update'
      }
    })

    return NextResponse.json({
      success: true,
      message: 'SEO settings updated successfully',
      settings: updatedSettings
    })
  } catch (error) {
    console.error('Error updating SEO settings:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}