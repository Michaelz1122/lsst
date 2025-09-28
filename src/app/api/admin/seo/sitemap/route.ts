import { NextRequest, NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/admin-auth'
import { db } from '@/lib/db'

interface SitemapURL {
  loc: string
  lastmod: string
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority: number
}

interface SitemapGenerationResult {
  sitemapUrl: string
  totalUrls: number
  generatedAt: string
  urls: SitemapURL[]
}

// POST /api/admin/seo/sitemap - Generate sitemap
export async function POST(request: NextRequest) {
  try {
    const user = getUserFromRequest(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Generate sitemap URLs
    const sitemapUrls: SitemapURL[] = [
      {
        loc: 'https://michaelzahy.com/',
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: 1.0
      },
      {
        loc: 'https://michaelzahy.com/services',
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: 0.8
      },
      {
        loc: 'https://michaelzahy.com/about',
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: 0.7
      },
      {
        loc: 'https://michaelzahy.com/contact',
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: 0.6
      },
      {
        loc: 'https://michaelzahy.com/blog',
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: 0.9
      }
    ]

    // Generate XML sitemap
    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`

    const result: SitemapGenerationResult = {
      sitemapUrl: 'https://michaelzahy.com/sitemap.xml',
      totalUrls: sitemapUrls.length,
      generatedAt: new Date().toISOString(),
      urls: sitemapUrls
    }

    // Log the sitemap generation
    await db.securityLog.create({
      data: {
        level: 'info',
        message: `Sitemap generated with ${sitemapUrls.length} URLs`,
        user: user.username,
        ip: request.headers.get('x-forwarded-for') || 'unknown',
        action: 'sitemap_generation'
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Sitemap generated successfully',
      result,
      sitemapXml
    })
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET /api/admin/seo/sitemap - Download sitemap
export async function GET(request: NextRequest) {
  try {
    const user = getUserFromRequest(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Generate sitemap (same as POST)
    const sitemapUrls: SitemapURL[] = [
      {
        loc: 'https://michaelzahy.com/',
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: 1.0
      },
      {
        loc: 'https://michaelzahy.com/services',
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: 0.8
      },
      {
        loc: 'https://michaelzahy.com/about',
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: 0.7
      },
      {
        loc: 'https://michaelzahy.com/contact',
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: 0.6
      }
    ]

    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`

    return new NextResponse(sitemapXml, {
      headers: {
        'Content-Type': 'application/xml',
        'Content-Disposition': 'attachment; filename="sitemap.xml"'
      }
    })
  } catch (error) {
    console.error('Error downloading sitemap:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}