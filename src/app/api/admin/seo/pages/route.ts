import { NextRequest, NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/admin-auth'
import { db } from '@/lib/db'

interface SEOPage {
  id: string
  title: string
  url: string
  metaTitle: string
  metaDescription: string
  keywords: string
  status: 'optimized' | 'needs-improvement' | 'not-optimized'
  lastAnalyzed: string
  score: number
}

// GET /api/admin/seo/pages - Retrieve all SEO pages
export async function GET(request: NextRequest) {
  try {
    const user = getUserFromRequest(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const search = searchParams.get('search')

    // In a real implementation, you would fetch from database
    // For now, we'll return mock data that matches the database schema
    
    let mockPages: SEOPage[] = [
      {
        id: '1',
        title: 'Home',
        url: '/',
        metaTitle: 'Michael Zahy - Performance Marketing Expert',
        metaDescription: 'Strategic media buyer and performance marketing expert dedicated to helping businesses achieve exceptional results through data-driven digital advertising campaigns.',
        keywords: 'performance marketing, media buying, digital advertising, ROI optimization',
        status: 'optimized',
        lastAnalyzed: '2024-01-20',
        score: 92
      },
      {
        id: '2',
        title: 'Services',
        url: '/services',
        metaTitle: 'Digital Marketing Services | Performance Marketing Solutions',
        metaDescription: 'Comprehensive digital marketing services including Meta Ads management, performance marketing, and growth hacking strategies for business success.',
        keywords: 'digital marketing, Meta Ads, growth hacking, marketing services',
        status: 'needs-improvement',
        lastAnalyzed: '2024-01-19',
        score: 78
      },
      {
        id: '3',
        title: 'About',
        url: '/about',
        metaTitle: 'About Michael Zahy | Performance Marketing Expert',
        metaDescription: 'Learn about Michael Zahy, a performance marketing expert with proven results in helping businesses achieve exceptional ROI through strategic digital marketing.',
        keywords: 'about, Michael Zahy, performance marketing expert, marketing consultant',
        status: 'optimized',
        lastAnalyzed: '2024-01-18',
        score: 88
      },
      {
        id: '4',
        title: 'Contact',
        url: '/contact',
        metaTitle: 'Contact Michael Zahy | Performance Marketing Consultant',
        metaDescription: 'Get in touch with Michael Zahy for performance marketing consulting and digital advertising services. Let\'s discuss how to grow your business.',
        keywords: 'contact, marketing consultant, get in touch, marketing services',
        status: 'not-optimized',
        lastAnalyzed: '2024-01-17',
        score: 65
      }
    ]

    // Apply filters
    if (status) {
      mockPages = mockPages.filter(page => page.status === status)
    }
    if (search) {
      mockPages = mockPages.filter(page => 
        page.title.toLowerCase().includes(search.toLowerCase()) ||
        page.url.toLowerCase().includes(search.toLowerCase()) ||
        page.metaTitle.toLowerCase().includes(search.toLowerCase())
      )
    }

    // Calculate statistics
    const stats = {
      total: mockPages.length,
      optimized: mockPages.filter(p => p.status === 'optimized').length,
      needsImprovement: mockPages.filter(p => p.status === 'needs-improvement').length,
      notOptimized: mockPages.filter(p => p.status === 'not-optimized').length,
      averageScore: Math.round(mockPages.reduce((sum, page) => sum + page.score, 0) / mockPages.length)
    }

    return NextResponse.json({
      pages: mockPages,
      stats
    })
  } catch (error) {
    console.error('Error fetching SEO pages:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/admin/seo/pages - Create or update SEO page
export async function POST(request: NextRequest) {
  try {
    const user = getUserFromRequest(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()

    // Validate input
    if (!data.title || !data.url) {
      return NextResponse.json(
        { error: 'Title and URL are required' },
        { status: 400 }
      )
    }

    // In a real implementation, you would save to database
    // For now, we'll just validate and return success
    
    // Log the SEO page update
    await db.securityLog.create({
      data: {
        level: 'info',
        message: `SEO page ${data.id ? 'updated' : 'created'}: ${data.title}`,
        user: user.username,
        ip: request.headers.get('x-forwarded-for') || 'unknown',
        action: 'seo_page_update'
      }
    })

    return NextResponse.json({
      success: true,
      message: `SEO page ${data.id ? 'updated' : 'created'} successfully`,
      page: {
        ...data,
        id: data.id || `page_${Date.now()}`,
        lastAnalyzed: new Date().toISOString().split('T')[0],
        score: data.score || Math.floor(Math.random() * 40) + 60 // Random score for demo
      }
    })
  } catch (error) {
    console.error('Error saving SEO page:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}