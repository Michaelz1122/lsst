'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Activity, 
  BarChart3, 
  FileText, 
  Settings, 
  Users, 
  Globe, 
  Palette, 
  Database, 
  Shield,
  User,
  Bell,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  Server,
  HardDrive,
  Wifi,
  Zap,
  Target,
  Layers,
  Edit3,
  Eye,
  Plus
} from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Admin Dashboard
          </h1>
          <p className="text-gray-200 text-lg">
            Welcome back! Here's what's happening with your website today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-gray-600">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </Button>
          <Link href="/admin/profile">
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500">
              <User className="w-4 h-4 mr-2" />
              Profile
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gray-800/70 border-gray-600 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 px-6 pt-6">
            <CardTitle className="text-sm font-medium text-gray-200">Total Pages</CardTitle>
            <FileText className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="text-2xl font-bold text-white">12</div>
            <div className="flex items-center gap-2 mt-2">
              <TrendingUp className="h-3 w-3 text-green-400" />
              <p className="text-xs text-green-400">+2 from last month</p>
            </div>
            <Progress value={75} className="mt-3 h-2" />
          </CardContent>
        </Card>

        <Card className="bg-gray-800/70 border-gray-600 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 px-6 pt-6">
            <CardTitle className="text-sm font-medium text-gray-200">Active Users</CardTitle>
            <Users className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="text-2xl font-bold text-white">2,350</div>
            <div className="flex items-center gap-2 mt-2">
              <TrendingUp className="h-3 w-3 text-green-400" />
              <p className="text-xs text-green-400">+180.1% from last month</p>
            </div>
            <Progress value={85} className="mt-3 h-2" />
          </CardContent>
        </Card>

        <Card className="bg-gray-800/70 border-gray-600 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 px-6 pt-6">
            <CardTitle className="text-sm font-medium text-gray-200">Page Views</CardTitle>
            <BarChart3 className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="text-2xl font-bold text-white">12,234</div>
            <div className="flex items-center gap-2 mt-2">
              <TrendingUp className="h-3 w-3 text-green-400" />
              <p className="text-xs text-green-400">+19% from last month</p>
            </div>
            <Progress value={67} className="mt-3 h-2" />
          </CardContent>
        </Card>

        <Card className="bg-gray-800/70 border-gray-600 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 px-6 pt-6">
            <CardTitle className="text-sm font-medium text-gray-200">Active Now</CardTitle>
            <Activity className="h-4 w-4 text-orange-400" />
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="text-2xl font-bold text-white">573</div>
            <div className="flex items-center gap-2 mt-2">
              <TrendingUp className="h-3 w-3 text-green-400" />
              <p className="text-xs text-green-400">+201 since last hour</p>
            </div>
            <Progress value={45} className="mt-3 h-2" />
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gray-800/70 border-gray-600">
        <CardHeader className="px-6 pt-6 pb-4">
          <CardTitle className="flex items-center gap-2 text-white">
            <Zap className="h-5 w-5 text-yellow-400" />
            Quick Actions
          </CardTitle>
          <CardDescription className="text-gray-200 mt-1">
            Common tasks you might want to perform
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <Link href="/admin/manage-content">
              <Button variant="outline" className="w-full justify-start border-gray-600 h-11">
                <Edit3 className="mr-2 h-4 w-4" />
                Edit Content
              </Button>
            </Link>
            <Link href="/admin/page-builder">
              <Button variant="outline" className="w-full justify-start border-gray-600 h-11">
                <Plus className="mr-2 h-4 w-4" />
                New Page
              </Button>
            </Link>
            <Link href="/admin/users">
              <Button variant="outline" className="w-full justify-start border-gray-600 h-11">
                <Users className="mr-2 h-4 w-4" />
                Manage Users
              </Button>
            </Link>
            <Link href="/admin/analytics">
              <Button variant="outline" className="w-full justify-start border-gray-600 h-11">
                <Eye className="mr-2 h-4 w-4" />
                View Analytics
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Main Features Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Content Management */}
        <Card className="bg-gray-800/70 border-gray-600 transition-all duration-300">
          <CardHeader className="px-6 pt-6 pb-4">
            <CardTitle className="flex items-center gap-2 text-white">
              <FileText className="h-5 w-5 text-blue-400" />
              Content Management
            </CardTitle>
            <CardDescription className="text-gray-200 mt-1">
              Edit existing content from your website pages
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-6 space-y-3">
            <Link href="/admin/manage-content">
              <Button variant="secondary" className="w-full justify-start bg-gray-700 text-white h-10">
                <FileText className="mr-2 h-4 w-4" />
                Manage Page Content
              </Button>
            </Link>
            <Link href="/admin/content">
              <Button variant="secondary" className="w-full justify-start bg-gray-700 text-white h-10">
                <Layers className="mr-2 h-4 w-4" />
                Content Library
              </Button>
            </Link>
            <Link href="/admin/pages">
              <Button variant="secondary" className="w-full justify-start bg-gray-700 text-white h-10">
                <Target className="mr-2 h-4 w-4" />
                All Pages
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* User Management */}
        <Card className="bg-gray-800/70 border-gray-600 transition-all duration-300">
          <CardHeader className="px-6 pt-6 pb-4">
            <CardTitle className="flex items-center gap-2 text-white">
              <Users className="h-5 w-5 text-purple-400" />
              User Management
            </CardTitle>
            <CardDescription className="text-gray-200 mt-1">
              Manage users, roles, and permissions
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-6 space-y-3">
            <Link href="/admin/users">
              <Button variant="secondary" className="w-full justify-start bg-gray-700 text-white h-10">
                <Users className="mr-2 h-4 w-4" />
                All Users
              </Button>
            </Link>
            <Link href="/admin/profile">
              <Button variant="secondary" className="w-full justify-start bg-gray-700 text-white h-10">
                <User className="mr-2 h-4 w-4" />
                My Profile
              </Button>
            </Link>
            <div className="flex items-center justify-between p-2 bg-gray-700/50 rounded">
              <span className="text-sm text-gray-200">Total Users</span>
              <Badge className="bg-purple-600">4</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Analytics & SEO */}
        <Card className="bg-gray-800/70 border-gray-600 transition-all duration-300">
          <CardHeader className="px-6 pt-6 pb-4">
            <CardTitle className="flex items-center gap-2 text-white">
              <BarChart3 className="h-5 w-5 text-green-400" />
              Analytics & SEO
            </CardTitle>
            <CardDescription className="text-gray-200 mt-1">
              Track performance and optimize SEO
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-6 space-y-3">
            <Link href="/admin/analytics">
              <Button variant="secondary" className="w-full justify-start bg-gray-700 text-white h-10">
                <BarChart3 className="mr-2 h-4 w-4" />
                Analytics
              </Button>
            </Link>
            <Link href="/admin/seo-management">
              <Button variant="secondary" className="w-full justify-start bg-gray-700 text-white h-10">
                <Globe className="mr-2 h-4 w-4" />
                SEO Management
              </Button>
            </Link>
            <Link href="/admin/tracking-codes">
              <Button variant="secondary" className="w-full justify-start bg-gray-700 text-white h-10">
                <Activity className="mr-2 h-4 w-4" />
                Tracking Codes
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Design & Tools */}
        <Card className="bg-gray-800/70 border-gray-600 transition-all duration-300">
          <CardHeader className="px-6 pt-6 pb-4">
            <CardTitle className="flex items-center gap-2 text-white">
              <Palette className="h-5 w-5 text-pink-400" />
              Design & Tools
            </CardTitle>
            <CardDescription className="text-gray-200 mt-1">
              Customize appearance and use tools
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-6 space-y-3">
            <Link href="/admin/themes">
              <Button variant="secondary" className="w-full justify-start bg-gray-700 text-white h-10">
                <Palette className="mr-2 h-4 w-4" />
                Themes
              </Button>
            </Link>
            <Link href="/admin/page-builder">
              <Button variant="secondary" className="w-full justify-start bg-gray-700 text-white h-10">
                <Settings className="mr-2 h-4 w-4" />
                Page Builder
              </Button>
            </Link>
            <Link href="/admin/landing-page-maker">
              <Button variant="secondary" className="w-full justify-start bg-gray-700 text-white h-10">
                <Target className="mr-2 h-4 w-4" />
                Landing Page Maker
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Settings & Security */}
        <Card className="bg-gray-800/70 border-gray-600 transition-all duration-300">
          <CardHeader className="px-6 pt-6 pb-4">
            <CardTitle className="flex items-center gap-2 text-white">
              <Shield className="h-5 w-5 text-red-400" />
              Settings & Security
            </CardTitle>
            <CardDescription className="text-gray-200 mt-1">
              Configure settings and security
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-6 space-y-3">
            <Link href="/admin/settings">
              <Button variant="secondary" className="w-full justify-start bg-gray-700 text-white h-10">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </Link>
            <Link href="/admin/security">
              <Button variant="secondary" className="w-full justify-start bg-gray-700 text-white h-10">
                <Shield className="mr-2 h-4 w-4" />
                Security
              </Button>
            </Link>
            <div className="flex items-center justify-between p-2 bg-gray-700/50 rounded">
              <span className="text-sm text-gray-200">Security Score</span>
              <Badge className="bg-green-600">85%</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card className="bg-gray-800/70 border-gray-600 transition-all duration-300">
          <CardHeader className="px-6 pt-6 pb-4">
            <CardTitle className="flex items-center gap-2 text-white">
              <Database className="h-5 w-5 text-orange-400" />
              Data Management
            </CardTitle>
            <CardDescription className="text-gray-200 mt-1">
              Manage backups and data
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-6 space-y-3">
            <Link href="/admin/backup">
              <Button variant="secondary" className="w-full justify-start bg-gray-700 text-white h-10">
                <Database className="mr-2 h-4 w-4" />
                Backup
              </Button>
            </Link>
            <div className="flex items-center justify-between p-2 bg-gray-700/50 rounded">
              <span className="text-sm text-gray-200">Last Backup</span>
              <span className="text-xs text-gray-200">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-700/50 rounded">
              <span className="text-sm text-gray-200">Storage Used</span>
              <span className="text-xs text-gray-200">75%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card className="bg-gray-800/70 border-gray-600">
        <CardHeader className="px-6 pt-6 pb-4">
          <CardTitle className="flex items-center gap-2 text-white">
            <Server className="h-5 w-5 text-cyan-400" />
            System Status
          </CardTitle>
          <CardDescription className="text-gray-200 mt-1">
            Monitor system health and performance
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Server className="h-5 w-5 text-green-400" />
                <div>
                  <div className="text-sm font-medium text-white">System Status</div>
                  <div className="text-xs text-gray-200">All systems operational</div>
                </div>
              </div>
              <Badge className="bg-green-600 text-white">
                <CheckCircle className="w-3 h-3 mr-1" />
                Online
              </Badge>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
              <div className="flex items-center gap-3">
                <HardDrive className="h-5 w-5 text-green-400" />
                <div>
                  <div className="text-sm font-medium text-white">Database</div>
                  <div className="text-xs text-gray-200">Connected & healthy</div>
                </div>
              </div>
              <Badge className="bg-green-600 text-white">
                <CheckCircle className="w-3 h-3 mr-1" />
                Connected
              </Badge>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Wifi className="h-5 w-5 text-green-400" />
                <div>
                  <div className="text-sm font-medium text-white">Network</div>
                  <div className="text-xs text-gray-200">Stable connection</div>
                </div>
              </div>
              <Badge className="bg-green-600 text-white">
                <CheckCircle className="w-3 h-3 mr-1" />
                Stable
              </Badge>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
              <div className="flex items-center gap-3">
                <HardDrive className="h-5 w-5 text-yellow-400" />
                <div>
                  <div className="text-sm font-medium text-white">Storage</div>
                  <div className="text-xs text-gray-200">75% used</div>
                </div>
              </div>
              <Badge className="bg-yellow-600 text-white">
                <AlertTriangle className="w-3 h-3 mr-1" />
                75% Full
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="bg-gray-800/70 border-gray-600">
        <CardHeader className="px-6 pt-6 pb-4">
          <CardTitle className="flex items-center gap-2 text-white">
            <Clock className="h-5 w-5 text-indigo-400" />
            Recent Activity
          </CardTitle>
          <CardDescription className="text-gray-200 mt-1">
            Latest actions and system events
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <div>
                  <div className="text-sm text-white">Backup completed successfully</div>
                  <div className="text-xs text-gray-200">2 hours ago</div>
                </div>
              </div>
              <Badge variant="outline" className="border-green-600 text-green-400">
                Success
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-blue-400" />
                <div>
                  <div className="text-sm text-white">New user registered</div>
                  <div className="text-xs text-gray-200">3 hours ago</div>
                </div>
              </div>
              <Badge variant="outline" className="border-blue-600 text-blue-400">
                User
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Edit3 className="h-4 w-4 text-purple-400" />
                <div>
                  <div className="text-sm text-white">Page content updated</div>
                  <div className="text-xs text-gray-200">5 hours ago</div>
                </div>
              </div>
              <Badge variant="outline" className="border-purple-600 text-purple-400">
                Content
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}