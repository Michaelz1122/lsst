'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Globe, 
  Search, 
  TrendingUp, 
  Target, 
  FileText, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Download, 
  Upload, 
  BarChart3, 
  AlertTriangle, 
  CheckCircle,
  RefreshCw,
  Filter,
  Settings,
  Activity,
  Zap,
  Shield,
  FileCheck,
  Globe2,
  Megaphone,
  BarChart,
  PieChart
} from 'lucide-react'

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

interface SEOAudit {
  id: string
  page: string
  issue: string
  severity: 'high' | 'medium' | 'low'
  description: string
  recommendation: string
  status: 'open' | 'in-progress' | 'resolved'
}

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

export default function AdminSEOManagement() {
  const [pages, setPages] = useState<SEOPage[]>([])
  const [audits, setAudits] = useState<SEOAudit[]>([])
  const [settings, setSettings] = useState<SEOSettings | null>(null)
  const [selectedPage, setSelectedPage] = useState<SEOPage | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isAuditDialogOpen, setIsAuditDialogOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [auditing, setAuditing] = useState(false)
  const [activeTab, setActiveTab] = useState('pages')
  const [filterStatus, setFilterStatus] = useState<string>('')
  const [filterSeverity, setFilterSeverity] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState('')
  const [auditReport, setAuditReport] = useState<SEOAuditReport | null>(null)
  const [pageStats, setPageStats] = useState<any>(null)

  // Fetch SEO data
  useEffect(() => {
    fetchSEOData()
  }, [])

  const fetchSEOData = async () => {
    try {
      setLoading(true)
      
      // Fetch pages
      const pagesResponse = await fetch('/api/admin/seo/pages')
      if (pagesResponse.ok) {
        const pagesData = await pagesResponse.json()
        setPages(pagesData.pages)
        setPageStats(pagesData.stats)
      }

      // Fetch audits
      const auditsResponse = await fetch('/api/admin/seo/audits')
      if (auditsResponse.ok) {
        const auditsData = await auditsResponse.json()
        setAudits(auditsData.audits)
      }

      // Fetch settings
      const settingsResponse = await fetch('/api/admin/seo/settings')
      if (settingsResponse.ok) {
        const settingsData = await settingsResponse.json()
        setSettings(settingsData.settings)
      }
    } catch (error) {
      console.error('Error fetching SEO data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEditPage = (page: SEOPage) => {
    setSelectedPage(page)
    setIsEditing(true)
  }

  const handleSavePage = async () => {
    if (!selectedPage) return

    try {
      setSaving(true)
      
      const response = await fetch('/api/admin/seo/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedPage)
      })

      if (response.ok) {
        const result = await response.json()
        setPages(pages.map(page => 
          page.id === selectedPage.id ? result.page : page
        ))
        setIsEditing(false)
        setSelectedPage(null)
      } else {
        throw new Error('Failed to save page')
      }
    } catch (error) {
      console.error('Error saving page:', error)
    } finally {
      setSaving(false)
    }
  }

  const runSEOAudit = async () => {
    try {
      setAuditing(true)
      
      const response = await fetch('/api/admin/seo/audit', {
        method: 'POST'
      })

      if (response.ok) {
        const report = await response.json()
        setAuditReport(report)
        setActiveTab('analytics')
        
        // Refresh data after audit
        fetchSEOData()
      } else {
        throw new Error('Failed to run SEO audit')
      }
    } catch (error) {
      console.error('Error running SEO audit:', error)
    } finally {
      setAuditing(false)
    }
  }

  const generateSitemap = async () => {
    try {
      const response = await fetch('/api/admin/seo/sitemap', {
        method: 'POST'
      })

      if (response.ok) {
        const result = await response.json()
        
        // Download sitemap
        const sitemapResponse = await fetch('/api/admin/seo/sitemap')
        if (sitemapResponse.ok) {
          const blob = await sitemapResponse.blob()
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = 'sitemap.xml'
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
          URL.revokeObjectURL(url)
        }
        
        alert('Sitemap generated and downloaded successfully!')
      }
    } catch (error) {
      console.error('Error generating sitemap:', error)
    }
  }

  const exportSEOData = async () => {
    try {
      const data = {
        pages,
        audits,
        settings,
        exportedAt: new Date().toISOString()
      }
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `seo-data-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      
      alert('SEO data exported successfully!')
    } catch (error) {
      console.error('Error exporting SEO data:', error)
    }
  }

  const saveSettings = async () => {
    if (!settings) return

    try {
      setSaving(true)
      
      const response = await fetch('/api/admin/seo/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      })

      if (response.ok) {
        alert('SEO settings saved successfully!')
      } else {
        throw new Error('Failed to save settings')
      }
    } catch (error) {
      console.error('Error saving settings:', error)
    } finally {
      setSaving(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
      'optimized': 'default',
      'needs-improvement': 'secondary',
      'not-optimized': 'destructive'
    }
    
    const colors: { [key: string]: string } = {
      'optimized': 'bg-green-500',
      'needs-improvement': 'bg-yellow-500',
      'not-optimized': 'bg-red-500'
    }
    
    return (
      <Badge variant={variants[status] || 'outline'} className={colors[status]}>
        {status.replace('-', ' ')}
      </Badge>
    )
  }

  const getSeverityBadge = (severity: string) => {
    const variants: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
      'high': 'destructive',
      'medium': 'secondary',
      'low': 'outline'
    }
    
    return (
      <Badge variant={variants[severity] || 'outline'}>
        {severity}
      </Badge>
    )
  }

  const getAuditStatusBadge = (status: string) => {
    const variants: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
      'open': 'destructive',
      'in-progress': 'secondary',
      'resolved': 'default'
    }
    
    const icons = {
      'open': <AlertTriangle className="w-3 h-3" />,
      'in-progress': <Target className="w-3 h-3" />,
      'resolved': <CheckCircle className="w-3 h-3" />
    }
    
    return (
      <Badge variant={variants[status] || 'outline'} className="flex items-center gap-1">
        {icons[status]}
        {status.replace('-', ' ')}
      </Badge>
    )
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">SEO Management</h1>
            <p className="text-muted-foreground">
              Loading SEO data...
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center py-12">
          <RefreshCw className="w-8 h-8 animate-spin" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">SEO Management</h1>
          <p className="text-muted-foreground">
            Optimize your website for search engines and improve visibility
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={runSEOAudit} disabled={auditing}>
            <BarChart3 className={`mr-2 h-4 w-4 ${auditing ? 'animate-spin' : ''}`} />
            {auditing ? 'Running Audit...' : 'Run SEO Audit'}
          </Button>
          <Button variant="outline" onClick={generateSitemap}>
            <Upload className="mr-2 h-4 w-4" />
            Generate Sitemap
          </Button>
          <Button variant="outline" onClick={exportSEOData}>
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      {/* SEO Stats Overview */}
      {pageStats && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Pages</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pageStats.total}</div>
              <p className="text-xs text-muted-foreground">
                Pages tracked
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Optimized</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{pageStats.optimized}</div>
              <p className="text-xs text-muted-foreground">
                Well optimized pages
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Needs Work</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{pageStats.needsImprovement}</div>
              <p className="text-xs text-muted-foreground">
                Pages need improvement
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${getScoreColor(pageStats.averageScore)}`}>
                {pageStats.averageScore}%
              </div>
              <p className="text-xs text-muted-foreground">
                Average SEO score
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="pages">Page SEO</TabsTrigger>
          <TabsTrigger value="audits">SEO Audits</TabsTrigger>
          <TabsTrigger value="settings">Global Settings</TabsTrigger>
          <TabsTrigger value="analytics">SEO Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="pages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Page SEO Optimization
              </CardTitle>
              <CardDescription>
                Manage SEO settings for individual pages
              </CardDescription>
              <div className="flex gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-1"
                  >
                    <option value="">All Status</option>
                    <option value="optimized">Optimized</option>
                    <option value="needs-improvement">Needs Improvement</option>
                    <option value="not-optimized">Not Optimized</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  <Input
                    placeholder="Search pages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Page</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead>Meta Title</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Analyzed</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pages.map((page) => (
                    <TableRow key={page.id}>
                      <TableCell className="font-medium">{page.title}</TableCell>
                      <TableCell>{page.url}</TableCell>
                      <TableCell>
                        <div className="max-w-xs truncate">
                          {page.metaTitle}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                page.score >= 80 ? 'bg-green-500' : 
                                page.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${page.score}%` }}
                            />
                          </div>
                          <span className={`text-sm font-medium ${getScoreColor(page.score)}`}>
                            {page.score}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(page.status)}</TableCell>
                      <TableCell>{page.lastAnalyzed}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditPage(page)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <a href={page.url} target="_blank">
                              <Eye className="h-4 w-4" />
                            </a>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audits" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                SEO Audits & Issues
              </CardTitle>
              <CardDescription>
                Track and resolve SEO optimization issues
              </CardDescription>
              <div className="flex justify-between items-center mt-4">
                <div className="flex gap-2">
                  <Badge variant="outline" className="bg-red-100 text-red-800">
                    {audits.filter(a => a.severity === 'high').length} High Priority
                  </Badge>
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                    {audits.filter(a => a.severity === 'medium').length} Medium Priority
                  </Badge>
                  <Badge variant="outline" className="bg-blue-100 text-blue-800">
                    {audits.filter(a => a.severity === 'low').length} Low Priority
                  </Badge>
                </div>
                <Button onClick={() => setIsAuditDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  New Audit
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Page</TableHead>
                    <TableHead>Issue</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {audits.map((audit) => (
                    <TableRow key={audit.id}>
                      <TableCell className="font-medium">{audit.page}</TableCell>
                      <TableCell>{audit.issue}</TableCell>
                      <TableCell>{getSeverityBadge(audit.severity)}</TableCell>
                      <TableCell>
                        <div className="max-w-xs truncate">
                          {audit.description}
                        </div>
                      </TableCell>
                      <TableCell>{getAuditStatusBadge(audit.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          <Target className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          {settings && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Global SEO Settings
                </CardTitle>
                <CardDescription>
                  Configure global SEO settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input
                      id="siteName"
                      value={settings.siteName}
                      onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="defaultMetaDescription">Default Meta Description</Label>
                    <Textarea
                      id="defaultMetaDescription"
                      value={settings.defaultMetaDescription}
                      onChange={(e) => setSettings({ ...settings, defaultMetaDescription: e.target.value })}
                      rows={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="defaultKeywords">Default Keywords</Label>
                    <Input
                      id="defaultKeywords"
                      value={settings.defaultKeywords}
                      onChange={(e) => setSettings({ ...settings, defaultKeywords: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="googleAnalyticsId">Google Analytics ID</Label>
                    <Input
                      id="googleAnalyticsId"
                      value={settings.googleAnalyticsId}
                      onChange={(e) => setSettings({ ...settings, googleAnalyticsId: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Advanced Settings</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="enableSitemap"
                        checked={settings.enableSitemap}
                        onCheckedChange={(checked) => setSettings({ ...settings, enableSitemap: checked })}
                      />
                      <Label htmlFor="enableSitemap">Enable Sitemap</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="enableRobotsTxt"
                        checked={settings.enableRobotsTxt}
                        onCheckedChange={(checked) => setSettings({ ...settings, enableRobotsTxt: checked })}
                      />
                      <Label htmlFor="enableRobotsTxt">Enable Robots.txt</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="enableCanonicalUrls"
                        checked={settings.enableCanonicalUrls}
                        onCheckedChange={(checked) => setSettings({ ...settings, enableCanonicalUrls: checked })}
                      />
                      <Label htmlFor="enableCanonicalUrls">Canonical URLs</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="enableStructuredData"
                        checked={settings.enableStructuredData}
                        onCheckedChange={(checked) => setSettings({ ...settings, enableStructuredData: checked })}
                      />
                      <Label htmlFor="enableStructuredData">Structured Data</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="enableOpenGraph"
                        checked={settings.enableOpenGraph}
                        onCheckedChange={(checked) => setSettings({ ...settings, enableOpenGraph: checked })}
                      />
                      <Label htmlFor="enableOpenGraph">Open Graph</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="enableTwitterCards"
                        checked={settings.enableTwitterCards}
                        onCheckedChange={(checked) => setSettings({ ...settings, enableTwitterCards: checked })}
                      />
                      <Label htmlFor="enableTwitterCards">Twitter Cards</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="robotsTxt">Robots.txt</Label>
                  <Textarea
                    id="robotsTxt"
                    value={settings.robotsTxt}
                    onChange={(e) => setSettings({ ...settings, robotsTxt: e.target.value })}
                    rows={4}
                    className="font-mono text-sm"
                  />
                </div>

                <Button onClick={saveSettings} disabled={saving}>
                  <Settings className="mr-2 h-4 w-4" />
                  {saving ? 'Saving...' : 'Save Settings'}
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          {auditReport ? (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    SEO Audit Report
                  </CardTitle>
                  <CardDescription>
                    Comprehensive SEO analysis performed on {new Date(auditReport.timestamp).toLocaleString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="text-center">
                      <div className={`text-3xl font-bold ${getScoreColor(auditReport.overallScore)}`}>
                        {auditReport.overallScore}%
                      </div>
                      <p className="text-sm text-muted-foreground">Overall Score</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold">{auditReport.pagesAnalyzed}</div>
                      <p className="text-sm text-muted-foreground">Pages Analyzed</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-red-600">{auditReport.summary.highPriority}</div>
                      <p className="text-sm text-muted-foreground">High Priority</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold">{auditReport.summary.totalIssues}</div>
                      <p className="text-sm text-muted-foreground">Total Issues</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-6">
                {auditReport.results.map((result, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{result.page}</span>
                        <Badge className={getScoreColor(result.score)}>
                          {result.score}%
                        </Badge>
                      </CardTitle>
                      <CardDescription>{result.url}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {result.issues.length > 0 && (
                          <div>
                            <h4 className="font-medium mb-2">Issues Found</h4>
                            <div className="space-y-2">
                              {result.issues.map((issue, issueIndex) => (
                                <Alert key={issueIndex}>
                                  <AlertTriangle className="h-4 w-4" />
                                  <AlertDescription>
                                    <div className="font-medium">{issue.message}</div>
                                    <div className="text-sm text-muted-foreground mt-1">
                                      {issue.recommendation}
                                    </div>
                                  </AlertDescription>
                                </Alert>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {result.recommendations.length > 0 && (
                          <div>
                            <h4 className="font-medium mb-2">Recommendations</h4>
                            <ul className="list-disc list-inside space-y-1">
                              {result.recommendations.map((rec, recIndex) => (
                                <li key={recIndex} className="text-sm">{rec}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No SEO Audit Data</h3>
                <p className="text-muted-foreground mb-4">
                  Run an SEO audit to get detailed insights about your website's SEO performance
                </p>
                <Button onClick={runSEOAudit} disabled={auditing}>
                  <BarChart3 className={`mr-2 h-4 w-4 ${auditing ? 'animate-spin' : ''}`} />
                  {auditing ? 'Running Audit...' : 'Run SEO Audit'}
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Edit Page Dialog */}
      {selectedPage && (
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit SEO Settings - {selectedPage.title}</DialogTitle>
              <DialogDescription>
                Update SEO metadata for {selectedPage.title}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Meta Title</Label>
                <Input
                  value={selectedPage.metaTitle}
                  onChange={(e) => setSelectedPage({ ...selectedPage, metaTitle: e.target.value })}
                  placeholder="SEO title (60 characters max)"
                  maxLength={60}
                />
                <p className="text-xs text-muted-foreground">
                  {selectedPage.metaTitle.length}/60 characters
                </p>
              </div>
              
              <div className="space-y-2">
                <Label>Meta Description</Label>
                <Textarea
                  value={selectedPage.metaDescription}
                  onChange={(e) => setSelectedPage({ ...selectedPage, metaDescription: e.target.value })}
                  placeholder="Meta description (160 characters max)"
                  rows={3}
                  maxLength={160}
                />
                <p className="text-xs text-muted-foreground">
                  {selectedPage.metaDescription.length}/160 characters
                </p>
              </div>
              
              <div className="space-y-2">
                <Label>Keywords</Label>
                <Input
                  value={selectedPage.keywords}
                  onChange={(e) => setSelectedPage({ ...selectedPage, keywords: e.target.value })}
                  placeholder="keyword1, keyword2, keyword3"
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSavePage} disabled={saving}>
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}