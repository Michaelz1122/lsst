'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'
import { 
  LayoutDashboard, 
  FileText, 
  BarChart3, 
  Settings, 
  Users, 
  Globe, 
  Palette, 
  Database, 
  Shield,
  Activity,
  LogOut,
  Menu,
  X,
  Key
} from 'lucide-react'

const adminNavItems = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    title: 'Manage Content',
    href: '/admin/manage-content',
    icon: FileText,
  },
  {
    title: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3,
  },
  {
    title: 'SEO Management',
    href: '/admin/seo-management',
    icon: Globe,
  },
  {
    title: 'Tracking Codes',
    href: '/admin/tracking-codes',
    icon: Activity,
  },
  {
    title: 'Themes',
    href: '/admin/themes',
    icon: Palette,
  },
  {
    title: 'Page Builder',
    href: '/admin/page-builder',
    icon: Settings,
  },
  {
    title: 'Landing Page Maker',
    href: '/admin/landing-page-maker',
    icon: Settings,
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: Settings,
  },
  {
    title: 'Security',
    href: '/admin/security',
    icon: Shield,
  },
  {
    title: 'Backup',
    href: '/admin/backup',
    icon: Database,
  },
  {
    title: 'Database Management',
    href: '/admin/database',
    icon: Database,
  },
  {
    title: 'Environment Config',
    href: '/admin/environment-config',
    icon: Key,
  },
]

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(true) // Set to true by default
  const [isLoading, setIsLoading] = useState(false) // Set to false by default

  // Check authentication on mount and when pathname changes
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // For development: Skip authentication check temporarily
        // TODO: Re-enable this in production
        setIsAuthenticated(true)
        setIsLoading(false)
        return
        
        const response = await fetch('/api/admin/auth/check')
        
        if (response.ok) {
          setIsAuthenticated(true)
        } else {
          setIsAuthenticated(false)
          // Redirect to login if not on login page
          if (pathname !== '/admin/login') {
            router.push('/admin/login')
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        setIsAuthenticated(false)
        if (pathname !== '/admin/login') {
          router.push('/admin/login')
        }
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [pathname, router])

  // Handle logout
  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', {
        method: 'POST'
      })
      setIsAuthenticated(false)
      toast.success('Logged out successfully')
      router.push('/admin/login')
    } catch (error) {
      console.error('Logout failed:', error)
      toast.error('Failed to logout')
    }
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-gray-300">Loading...</p>
        </div>
      </div>
    )
  }

  // If not authenticated and not on login page, redirect will happen in useEffect
  if (!isAuthenticated && pathname !== '/admin/login') {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-gray-300">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  // If on login page, don't show admin layout
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Sidebar */}
      <div className={cn(
        'fixed inset-y-0 left-0 z-50 w-64 bg-gray-800/90 backdrop-blur-sm border-r border-gray-700 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center border-b border-gray-700 px-6">
            <h2 className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Admin Panel</h2>
            <Button
              variant="ghost"
              size="sm"
              className="ml-auto lg:hidden text-gray-400 hover:text-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <ScrollArea className="flex-1 px-4 py-4">
            <nav className="grid gap-2">
              {adminNavItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-gray-700/50',
                      isActive 
                        ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-purple-500/30 shadow-lg' 
                        : 'text-gray-300 hover:text-white'
                    )}
                  >
                    <item.icon className={cn(
                      "h-4 w-4",
                      isActive ? "text-purple-400" : "text-gray-400"
                    )} />
                    {item.title}
                  </Link>
                )
              })}
            </nav>
          </ScrollArea>
          <div className="border-t border-gray-700 p-4">
            <Button 
              variant="outline" 
              className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-hidden">
        {/* Mobile header */}
        <div className="lg:hidden flex h-16 items-center border-b border-gray-700 bg-gray-800/50 backdrop-blur-sm px-6">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-4 w-4" />
          </Button>
          <h2 className="ml-4 text-lg font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Admin Panel</h2>
        </div>

        {/* Page content */}
        <ScrollArea className="h-[calc(100vh-4rem)] lg:h-screen">
          <div className="p-6">
            {children}
          </div>
        </ScrollArea>
      </div>

      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Toaster for notifications */}
      <Toaster />
    </div>
  )
}