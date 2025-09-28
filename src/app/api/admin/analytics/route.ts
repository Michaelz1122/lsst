import { NextRequest, NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/admin-auth'

// Mock analytics data - in a real implementation, this would come from 
// Google Analytics, Plausible, or another analytics service
const generateAnalyticsData = () => {
  const now = new Date()
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(now)
    date.setDate(date.getDate() - (29 - i))
    return {
      date: date.toISOString().split('T')[0],
      visitors: Math.floor(Math.random() * 1000) + 500,
      pageViews: Math.floor(Math.random() * 2000) + 1000,
      sessions: Math.floor(Math.random() * 800) + 400
    }
  })

  return {
    overview: {
      totalVisitors: 45231,
      totalPageViews: 123450,
      bounceRate: 32.1,
      avgSessionDuration: '3m 24s',
      monthlyGrowth: 20.1
    },
    dailyData: last30Days,
    topPages: [
      { page: '/', views: 15420, visitors: 8920, bounceRate: 28.5, avgDuration: '2m 45s' },
      { page: '/services', views: 8320, visitors: 5420, bounceRate: 35.2, avgDuration: '3m 12s' },
      { page: '/about', views: 6420, visitors: 4210, bounceRate: 31.8, avgDuration: '4m 01s' },
      { page: '/contact', views: 4230, visitors: 3120, bounceRate: 42.1, avgDuration: '1m 58s' },
      { page: '/case-studies', views: 3210, visitors: 2450, bounceRate: 38.7, avgDuration: '3m 33s' }
    ],
    devices: [
      { device: 'Desktop', percentage: 65, visitors: 29400, sessions: 18900 },
      { device: 'Mobile', percentage: 28, visitors: 12664, sessions: 8150 },
      { device: 'Tablet', percentage: 7, visitors: 3167, sessions: 2040 }
    ],
    locations: [
      { country: 'United States', visitors: 15420, percentage: 34.1, city: 'New York' },
      { country: 'United Kingdom', visitors: 6420, percentage: 14.2, city: 'London' },
      { country: 'Canada', visitors: 4230, percentage: 9.4, city: 'Toronto' },
      { country: 'Germany', visitors: 3210, percentage: 7.1, city: 'Berlin' },
      { country: 'Australia', visitors: 2450, percentage: 5.4, city: 'Sydney' }
    ],
    browsers: [
      { browser: 'Chrome', percentage: 68, visitors: 30757 },
      { browser: 'Safari', percentage: 19, visitors: 8594 },
      { browser: 'Firefox', percentage: 8, visitors: 3618 },
      { browser: 'Edge', percentage: 5, visitors: 2262 }
    ],
    trafficSources: [
      { source: 'Organic Search', percentage: 45, visitors: 20354 },
      { source: 'Direct', percentage: 25, visitors: 11308 },
      { source: 'Social Media', percentage: 18, visitors: 8142 },
      { source: 'Referral', percentage: 12, visitors: 5428 }
    ]
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = getUserFromRequest(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Generate analytics data
    const analyticsData = generateAnalyticsData()

    return NextResponse.json(analyticsData)
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}