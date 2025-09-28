'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Plus, 
  Save, 
  Eye, 
  Code, 
  Settings, 
  Trash2, 
  Copy, 
  Download,
  Upload,
  FileText,
  Globe,
  BarChart3,
  Palette,
  Layout,
  Sparkles,
  Play,
  Edit3,
  Monitor,
  Smartphone,
  Tablet,
  Link,
  ExternalLink,
  Menu,
  X,
  ChevronUp,
  ChevronDown,
  ToggleLeft,
  ToggleRight,
  Navigation
} from 'lucide-react'

interface LandingPage {
  id: string
  title: string
  slug: string
  description: string
  htmlContent: string
  cssContent: string
  jsContent: string
  status: 'draft' | 'published'
  createdAt: string
  updatedAt: string
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string
  navigationSettings?: {
    showInNavigation: boolean
    navTitle?: string
    navOrder?: number
    parentPage?: string
    externalLink?: string
    openInNewTab?: boolean
  }
  advancedSettings?: {
    customHead?: string
    customBody?: string
    trackingScripts?: string
    customMeta?: Array<{ name: string; content: string }>
  }
}

export default function LandingPageMaker() {
  const [pages, setPages] = useState<LandingPage[]>([])
  const [selectedPage, setSelectedPage] = useState<LandingPage | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile' | 'tablet'>('desktop')
  const [activeTab, setActiveTab] = useState('html')
  const [activeSettingsTab, setActiveSettingsTab] = useState('seo')
  
  const [newPage, setNewPage] = useState({
    title: '',
    slug: '',
    description: '',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: ''
  })

  const [codeEditor, setCodeEditor] = useState({
    html: '',
    css: '',
    js: ''
  })

  const [navigationSettings, setNavigationSettings] = useState({
    showInNavigation: false,
    navTitle: '',
    navOrder: 0,
    parentPage: '',
    externalLink: '',
    openInNewTab: false
  })

  const [advancedSettings, setAdvancedSettings] = useState({
    customHead: '',
    customBody: '',
    trackingScripts: '',
    customMeta: [] as Array<{ name: string; content: string }>
  })

  // Mock data for demonstration
  useEffect(() => {
    const mockPages: LandingPage[] = [
      {
        id: '1',
        title: 'Product Launch Page',
        slug: 'product-launch',
        description: 'New product announcement landing page',
        htmlContent: '<!DOCTYPE html>\n<html>\n<head>\n    <title>Product Launch</title>\n</head>\n<body>\n    <h1>New Product Launch</h1>\n    <p>Exciting new product coming soon!</p>\n</body>\n</html>',
        cssContent: 'body { font-family: Arial, sans-serif; }',
        jsContent: '// JavaScript code here',
        status: 'published',
        createdAt: '2024-01-15',
        updatedAt: '2024-01-20',
        seoTitle: 'New Product Launch - Coming Soon',
        seoDescription: 'Get ready for our exciting new product launch. Stay tuned for updates!',
        seoKeywords: 'product launch, new product, coming soon',
        navigationSettings: {
          showInNavigation: true,
          navTitle: 'Product Launch',
          navOrder: 1,
          parentPage: '',
          externalLink: '',
          openInNewTab: false
        },
        advancedSettings: {
          customHead: '<meta name="author" content="Your Company">',
          customBody: '',
          trackingScripts: '// Google Analytics code here',
          customMeta: [{ name: 'author', content: 'Your Company' }]
        }
      },
      {
        id: '2',
        title: 'Lead Generation Page',
        slug: 'lead-generation',
        description: 'Capture leads with this optimized landing page',
        htmlContent: '<!DOCTYPE html>\n<html>\n<head>\n    <title>Lead Generation</title>\n</head>\n<body>\n    <h1>Get Your Free Guide</h1>\n    <form>\n        <input type="email" placeholder="Enter your email">\n        <button type="submit">Download</button>\n    </form>\n</body>\n</html>',
        cssContent: 'body { font-family: Arial, sans-serif; text-align: center; }',
        jsContent: '// Form validation and submission',
        status: 'draft',
        createdAt: '2024-01-10',
        updatedAt: '2024-01-18',
        navigationSettings: {
          showInNavigation: false,
          navTitle: 'Lead Gen',
          navOrder: 2,
          parentPage: '',
          externalLink: '',
          openInNewTab: false
        }
      }
    ]
    setPages(mockPages)
  }, [])

  const createNewPage = () => {
    if (!newPage.title || !newPage.slug) return

    const page: LandingPage = {
      id: Date.now().toString(),
      title: newPage.title,
      slug: newPage.slug,
      description: newPage.description,
      htmlContent: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${newPage.title}</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 2rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            min-height: 100vh;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            text-align: center;
        }
        h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
        }
        p {
            font-size: 1.2rem;
            margin-bottom: 2rem;
        }
        .cta-button {
            background: white;
            color: #667eea;
            padding: 1rem 2rem;
            border: none;
            border-radius: 50px;
            font-size: 1.1rem;
            cursor: pointer;
            transition: transform 0.2s;
        }
        .cta-button:hover {
            transform: scale(1.05);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>${newPage.title}</h1>
        <p>${newPage.description || 'Welcome to our landing page'}</p>
        <button class="cta-button">Get Started</button>
    </div>
</body>
</html>`,
      cssContent: '',
      jsContent: '',
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      seoTitle: newPage.seoTitle || newPage.title,
      seoDescription: newPage.seoDescription,
      seoKeywords: newPage.seoKeywords,
      navigationSettings: {
        showInNavigation: false,
        navTitle: newPage.title,
        navOrder: pages.length + 1,
        parentPage: '',
        externalLink: '',
        openInNewTab: false
      },
      advancedSettings: {
        customHead: '',
        customBody: '',
        trackingScripts: '',
        customMeta: []
      }
    }

    setPages([page, ...pages])
    setSelectedPage(page)
    setCodeEditor({
      html: page.htmlContent,
      css: page.cssContent,
      js: page.jsContent
    })
    setNavigationSettings(page.navigationSettings ? {
      showInNavigation: page.navigationSettings.showInNavigation,
      navTitle: page.navigationSettings.navTitle || page.title,
      navOrder: page.navigationSettings.navOrder || pages.length + 1,
      parentPage: page.navigationSettings.parentPage || '',
      externalLink: page.navigationSettings.externalLink || '',
      openInNewTab: page.navigationSettings.openInNewTab || false
    } : {
      showInNavigation: false,
      navTitle: page.title,
      navOrder: pages.length + 1,
      parentPage: '',
      externalLink: '',
      openInNewTab: false
    })
    setAdvancedSettings(page.advancedSettings ? {
      customHead: page.advancedSettings.customHead || '',
      customBody: page.advancedSettings.customBody || '',
      trackingScripts: page.advancedSettings.trackingScripts || '',
      customMeta: page.advancedSettings.customMeta || []
    } : {
      customHead: '',
      customBody: '',
      trackingScripts: '',
      customMeta: []
    })
    setIsEditing(true)
    
    // Reset form
    setNewPage({
      title: '',
      slug: '',
      description: '',
      seoTitle: '',
      seoDescription: '',
      seoKeywords: ''
    })
  }

  const updatePage = () => {
    if (!selectedPage) return

    const updatedPage = {
      ...selectedPage,
      htmlContent: codeEditor.html,
      cssContent: codeEditor.css,
      jsContent: codeEditor.js,
      navigationSettings,
      advancedSettings,
      updatedAt: new Date().toISOString()
    }

    setPages(pages.map(p => p.id === selectedPage.id ? updatedPage : p))
    setSelectedPage(updatedPage)
  }

  const deletePage = (pageId: string) => {
    setPages(pages.filter(p => p.id !== pageId))
    if (selectedPage?.id === pageId) {
      setSelectedPage(null)
      setIsEditing(false)
    }
  }

  const duplicatePage = (page: LandingPage) => {
    const duplicatedPage = {
      ...page,
      id: Date.now().toString(),
      title: `${page.title} (Copy)`,
      slug: `${page.slug}-copy`,
      status: 'draft' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    setPages([duplicatedPage, ...pages])
  }

  const publishPage = (pageId: string) => {
    setPages(pages.map(p => 
      p.id === pageId 
        ? { ...p, status: 'published' as const, updatedAt: new Date().toISOString() }
        : p
    ))
    if (selectedPage?.id === pageId) {
      setSelectedPage({ ...selectedPage, status: 'published' as const })
    }
  }

  const unpublishPage = (pageId: string) => {
    setPages(pages.map(p => 
      p.id === pageId 
        ? { ...p, status: 'draft' as const, updatedAt: new Date().toISOString() }
        : p
    ))
    if (selectedPage?.id === pageId) {
      setSelectedPage({ ...selectedPage, status: 'draft' as const })
    }
  }

  const generatePreview = () => {
    if (!selectedPage) return ''

    const html = codeEditor.html
    const css = codeEditor.css
    const js = codeEditor.js

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          ${css}
          body { margin: 0; padding: 0; }
        </style>
      </head>
      <body>
        ${html}
        <script>
          ${js}
        </script>
      </body>
      </html>
    `
  }

  const downloadPage = () => {
    if (!selectedPage) return

    const content = generatePreview()
    const blob = new Blob([content], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${selectedPage.slug}.html`
    a.click()
    URL.revokeObjectURL(url)
  }

  const getPreviewWidth = () => {
    switch (previewMode) {
      case 'mobile': return '375px'
      case 'tablet': return '768px'
      default: return '100%'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white">
                Landing Page Maker
              </h1>
              <p className="text-gray-200 mt-2">Create and manage stunning landing pages with our powerful HTML editor</p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => {
                  const modal = document.getElementById('createPageModal')
                  if (modal) modal.classList.remove('hidden')
                }}
                className="bg-gradient-to-r from-purple-500 to-pink-500"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Page
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Create Page Modal */}
        <div id="createPageModal" className="hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Create New Landing Page</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Page Title</label>
                <Input
                  value={newPage.title}
                  onChange={(e) => setNewPage({ ...newPage, title: e.target.value })}
                  placeholder="Enter page title"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">URL Slug</label>
                <Input
                  value={newPage.slug}
                  onChange={(e) => setNewPage({ ...newPage, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                  placeholder="url-slug"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Textarea
                  value={newPage.description}
                  onChange={(e) => setNewPage({ ...newPage, description: e.target.value })}
                  placeholder="Page description"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">SEO Title</label>
                <Input
                  value={newPage.seoTitle}
                  onChange={(e) => setNewPage({ ...newPage, seoTitle: e.target.value })}
                  placeholder="SEO title"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">SEO Description</label>
                <Textarea
                  value={newPage.seoDescription}
                  onChange={(e) => setNewPage({ ...newPage, seoDescription: e.target.value })}
                  placeholder="SEO description"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">SEO Keywords</label>
                <Input
                  value={newPage.seoKeywords}
                  onChange={(e) => setNewPage({ ...newPage, seoKeywords: e.target.value })}
                  placeholder="keyword1, keyword2, keyword3"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button
                onClick={createNewPage}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500"
              >
                Create Page
              </Button>
              <Button
                onClick={() => {
                  const modal = document.getElementById('createPageModal')
                  if (modal) modal.classList.add('hidden')
                }}
                variant="outline"
                className="border-gray-600"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>

        {/* Templates Section */}
        <Card className="bg-gray-800/50 border-gray-700 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layout className="w-5 h-5" />
              Landing Page Templates
            </CardTitle>
            <CardDescription className="text-gray-200">
              Choose from professionally designed templates to get started quickly
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="group cursor-pointer" onClick={() => {
                const modal = document.getElementById('createPageModal')
                if (modal) {
                  setNewPage({
                    title: 'Modern Business Landing Page',
                    slug: 'modern-business',
                    description: 'Clean and professional business landing page',
                    seoTitle: 'Modern Business Landing Page',
                    seoDescription: 'Professional business landing page with modern design',
                    seoKeywords: 'business, landing page, modern, professional'
                  })
                  modal.classList.remove('hidden')
                }
              }}>
                <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-lg p-4">
                  <div className="h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded mb-3 flex items-center justify-center">
                    <span className="text-white font-bold">Business</span>
                  </div>
                  <h4 className="text-white font-medium mb-1">Modern Business</h4>
                  <p className="text-gray-200 text-sm">Clean, professional design perfect for businesses</p>
                </div>
              </div>
              
              <div className="group cursor-pointer" onClick={() => {
                const modal = document.getElementById('createPageModal')
                if (modal) {
                  setNewPage({
                    title: 'Product Launch Landing Page',
                    slug: 'product-launch',
                    description: 'High-converting product launch page',
                    seoTitle: 'Product Launch Landing Page',
                    seoDescription: 'High-converting landing page for product launches',
                    seoKeywords: 'product launch, landing page, conversion, marketing'
                  })
                  modal.classList.remove('hidden')
                }
              }}>
                <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-lg p-4">
                  <div className="h-32 bg-gradient-to-br from-green-500 to-emerald-500 rounded mb-3 flex items-center justify-center">
                    <span className="text-white font-bold">Launch</span>
                  </div>
                  <h4 className="text-white font-medium mb-1">Product Launch</h4>
                  <p className="text-gray-200 text-sm">High-converting pages for product launches</p>
                </div>
              </div>
              
              <div className="group cursor-pointer" onClick={() => {
                const modal = document.getElementById('createPageModal')
                if (modal) {
                  setNewPage({
                    title: 'Lead Generation Landing Page',
                    slug: 'lead-generation',
                    description: 'Optimized page for capturing leads',
                    seoTitle: 'Lead Generation Landing Page',
                    seoDescription: 'Optimized landing page designed for maximum lead capture',
                    seoKeywords: 'lead generation, landing page, leads, conversion'
                  })
                  modal.classList.remove('hidden')
                }
              }}>
                <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-lg p-4">
                  <div className="h-32 bg-gradient-to-br from-orange-500 to-red-500 rounded mb-3 flex items-center justify-center">
                    <span className="text-white font-bold">Leads</span>
                  </div>
                  <h4 className="text-white font-medium mb-1">Lead Generation</h4>
                  <p className="text-gray-200 text-sm">Optimized for capturing quality leads</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Components Library */}
        <Card className="bg-gray-800/50 border-gray-700 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Components Library
            </CardTitle>
            <CardDescription className="text-gray-200">
              Drag and drop components to build your landing page quickly
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              <button className="p-3 bg-gray-700/50 border border-gray-600 rounded-lg transition-colors text-center">
                <div className="text-2xl mb-1">📝</div>
                <div className="text-xs text-gray-200">Hero Section</div>
              </button>
              <button className="p-3 bg-gray-700/50 border border-gray-600 rounded-lg transition-colors text-center">
                <div className="text-2xl mb-1">🎯</div>
                <div className="text-xs text-gray-200">Features</div>
              </button>
              <button className="p-3 bg-gray-700/50 border border-gray-600 rounded-lg transition-colors text-center">
                <div className="text-2xl mb-1">💬</div>
                <div className="text-xs text-gray-200">Testimonials</div>
              </button>
              <button className="p-3 bg-gray-700/50 border border-gray-600 rounded-lg transition-colors text-center">
                <div className="text-2xl mb-1">💰</div>
                <div className="text-xs text-gray-200">Pricing</div>
              </button>
              <button className="p-3 bg-gray-700/50 border border-gray-600 rounded-lg transition-colors text-center">
                <div className="text-2xl mb-1">📞</div>
                <div className="text-xs text-gray-200">Contact Form</div>
              </button>
              <button className="p-3 bg-gray-700/50 border border-gray-600 rounded-lg transition-colors text-center">
                <div className="text-2xl mb-1">📱</div>
                <div className="text-xs text-gray-200">CTA Buttons</div>
              </button>
              <button className="p-3 bg-gray-700/50 border border-gray-600 rounded-lg transition-colors text-center">
                <div className="text-2xl mb-1">🖼️</div>
                <div className="text-xs text-gray-200">Image Gallery</div>
              </button>
              <button className="p-3 bg-gray-700/50 border border-gray-600 rounded-lg transition-colors text-center">
                <div className="text-2xl mb-1">📊</div>
                <div className="text-xs text-gray-200">Statistics</div>
              </button>
              <button className="p-3 bg-gray-700/50 border border-gray-600 rounded-lg transition-colors text-center">
                <div className="text-2xl mb-1">👥</div>
                <div className="text-xs text-gray-200">Team</div>
              </button>
              <button className="p-3 bg-gray-700/50 border border-gray-600 rounded-lg transition-colors text-center">
                <div className="text-2xl mb-1">🎨</div>
                <div className="text-xs text-gray-200">Accordion</div>
              </button>
              <button className="p-3 bg-gray-700/50 border border-gray-600 rounded-lg transition-colors text-center">
                <div className="text-2xl mb-1">📅</div>
                <div className="text-xs text-gray-200">Timeline</div>
              </button>
              <button className="p-3 bg-gray-700/50 border border-gray-600 rounded-lg transition-colors text-center">
                <div className="text-2xl mb-1">🔧</div>
                <div className="text-xs text-gray-200">More</div>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Pages List */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Landing Pages
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {pages.map((page) => (
                  <div
                    key={page.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedPage?.id === page.id
                        ? 'border-purple-500 bg-purple-500/20'
                        : 'border-gray-600'
                    }`}
                    onClick={() => {
                      setSelectedPage(page)
                      setCodeEditor({
                        html: page.htmlContent,
                        css: page.cssContent,
                        js: page.jsContent
                      })
                      setNavigationSettings(page.navigationSettings ? {
                        showInNavigation: page.navigationSettings.showInNavigation,
                        navTitle: page.navigationSettings.navTitle || page.title,
                        navOrder: page.navigationSettings.navOrder || 0,
                        parentPage: page.navigationSettings.parentPage || '',
                        externalLink: page.navigationSettings.externalLink || '',
                        openInNewTab: page.navigationSettings.openInNewTab || false
                      } : {
                        showInNavigation: false,
                        navTitle: page.title,
                        navOrder: 0,
                        parentPage: '',
                        externalLink: '',
                        openInNewTab: false
                      })
                      setAdvancedSettings(page.advancedSettings ? {
                        customHead: page.advancedSettings.customHead || '',
                        customBody: page.advancedSettings.customBody || '',
                        trackingScripts: page.advancedSettings.trackingScripts || '',
                        customMeta: page.advancedSettings.customMeta || []
                      } : {
                        customHead: '',
                        customBody: '',
                        trackingScripts: '',
                        customMeta: []
                      })
                      setIsEditing(false)
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-white">{page.title}</h4>
                        <p className="text-sm text-gray-200 mt-1">{page.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge
                            variant={page.status === 'published' ? 'default' : 'secondary'}
                            className={
                              page.status === 'published'
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-600 text-gray-200'
                            }
                          >
                            {page.status}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {new Date(page.updatedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Editor and Preview */}
          <div className="lg:col-span-3">
            {selectedPage ? (
              <div className="space-y-6">
                {/* Page Actions */}
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-white">{selectedPage.title}</h3>
                        <p className="text-gray-200">{selectedPage.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setIsEditing(!isEditing)}
                          variant={isEditing ? 'outline' : 'default'}
                          size="sm"
                          className={isEditing ? 'border-gray-600' : 'bg-blue-500'}
                        >
                          <Edit3 className="w-4 h-4 mr-2" />
                          {isEditing ? 'Preview' : 'Edit'}
                        </Button>
                        <Button
                          onClick={() => duplicatePage(selectedPage)}
                          variant="outline"
                          size="sm"
                          className="border-gray-600"
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Duplicate
                        </Button>
                        {selectedPage.status === 'draft' ? (
                          <Button
                            onClick={() => publishPage(selectedPage.id)}
                            size="sm"
                            className="bg-green-500"
                          >
                            <Sparkles className="w-4 h-4 mr-2" />
                            Publish
                          </Button>
                        ) : (
                          <Button
                            onClick={() => unpublishPage(selectedPage.id)}
                            variant="outline"
                            size="sm"
                            className="border-gray-600"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Unpublish
                          </Button>
                        )}
                        <Button
                          onClick={downloadPage}
                          variant="outline"
                          size="sm"
                          className="border-gray-600"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                        <Button
                          onClick={() => deletePage(selectedPage.id)}
                          variant="outline"
                          size="sm"
                          className="border-red-600 text-red-400"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Editor and Preview Tabs */}
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-0">
                    {isEditing ? (
                      <div className="h-[600px]">
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
                          <TabsList className="grid w-full grid-cols-4 border-b border-gray-700">
                            <TabsTrigger value="html" className="data-[state=active]:bg-purple-500">
                              <Code className="w-4 h-4 mr-2" />
                              HTML
                            </TabsTrigger>
                            <TabsTrigger value="css" className="data-[state=active]:bg-purple-500">
                              <Palette className="w-4 h-4 mr-2" />
                              CSS
                            </TabsTrigger>
                            <TabsTrigger value="js" className="data-[state=active]:bg-purple-500">
                              <Settings className="w-4 h-4 mr-2" />
                              JavaScript
                            </TabsTrigger>
                            <TabsTrigger value="settings" className="data-[state=active]:bg-purple-500">
                              <Navigation className="w-4 h-4 mr-2" />
                              Settings
                            </TabsTrigger>
                          </TabsList>
                          
                          <TabsContent value="html" className="h-[calc(100%-48px)] p-0">
                            <div className="h-full flex">
                              <Textarea
                                value={codeEditor.html}
                                onChange={(e) => setCodeEditor({ ...codeEditor, html: e.target.value })}
                                className="flex-1 resize-none border-0 rounded-none bg-gray-900 text-green-400 font-mono text-sm p-4"
                                placeholder="Enter your HTML code here..."
                              />
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="css" className="h-[calc(100%-48px)] p-0">
                            <div className="h-full flex">
                              <Textarea
                                value={codeEditor.css}
                                onChange={(e) => setCodeEditor({ ...codeEditor, css: e.target.value })}
                                className="flex-1 resize-none border-0 rounded-none bg-gray-900 text-blue-400 font-mono text-sm p-4"
                                placeholder="Enter your CSS code here..."
                              />
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="js" className="h-[calc(100%-48px)] p-0">
                            <div className="h-full flex">
                              <Textarea
                                value={codeEditor.js}
                                onChange={(e) => setCodeEditor({ ...codeEditor, js: e.target.value })}
                                className="flex-1 resize-none border-0 rounded-none bg-gray-900 text-yellow-400 font-mono text-sm p-4"
                                placeholder="Enter your JavaScript code here..."
                              />
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="settings" className="h-[calc(100%-48px)] p-0">
                            <div className="h-full overflow-auto">
                              <Tabs value={activeSettingsTab} onValueChange={setActiveSettingsTab} className="h-full">
                                <TabsList className="grid w-full grid-cols-3 border-b border-gray-700">
                                  <TabsTrigger value="seo" className="data-[state=active]:bg-purple-500">
                                    <Globe className="w-4 h-4 mr-2" />
                                    SEO
                                  </TabsTrigger>
                                  <TabsTrigger value="navigation" className="data-[state=active]:bg-purple-500">
                                    <Menu className="w-4 h-4 mr-2" />
                                    Navigation
                                  </TabsTrigger>
                                  <TabsTrigger value="advanced" className="data-[state=active]:bg-purple-500">
                                    <Settings className="w-4 h-4 mr-2" />
                                    Advanced
                                  </TabsTrigger>
                                </TabsList>
                                
                                <TabsContent value="seo" className="p-6 space-y-6">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-200 mb-2">
                                      SEO Title
                                    </label>
                                    <Input
                                      value={selectedPage?.seoTitle || ''}
                                      onChange={(e) => setSelectedPage(prev => prev ? { ...prev, seoTitle: e.target.value } : null)}
                                      className="bg-gray-700 border-gray-600 text-white"
                                      placeholder="SEO title"
                                    />
                                  </div>
                                  
                                  <div>
                                    <label className="block text-sm font-medium text-gray-200 mb-2">
                                      SEO Description
                                    </label>
                                    <Textarea
                                      value={selectedPage?.seoDescription || ''}
                                      onChange={(e) => setSelectedPage(prev => prev ? { ...prev, seoDescription: e.target.value } : null)}
                                      className="bg-gray-700 border-gray-600 text-white"
                                      placeholder="SEO description"
                                      rows={3}
                                    />
                                  </div>
                                  
                                  <div>
                                    <label className="block text-sm font-medium text-gray-200 mb-2">
                                      SEO Keywords
                                    </label>
                                    <Input
                                      value={selectedPage?.seoKeywords || ''}
                                      onChange={(e) => setSelectedPage(prev => prev ? { ...prev, seoKeywords: e.target.value } : null)}
                                      className="bg-gray-700 border-gray-600 text-white"
                                      placeholder="keyword1, keyword2, keyword3"
                                    />
                                  </div>
                                </TabsContent>
                                
                                <TabsContent value="navigation" className="p-6 space-y-6">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <h4 className="text-white font-medium">Show in Navigation</h4>
                                      <p className="text-gray-200 text-sm">Include this page in the main navigation menu</p>
                                    </div>
                                    <button
                                      onClick={() => setNavigationSettings(prev => ({ ...prev, showInNavigation: !prev.showInNavigation }))}
                                      className={`p-2 rounded-lg transition-colors ${
                                        navigationSettings.showInNavigation ? 'bg-green-500/20 text-green-400' : 'bg-gray-700 text-gray-200'
                                      }`}
                                    >
                                      {navigationSettings.showInNavigation ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
                                    </button>
                                  </div>
                                  
                                  <div>
                                    <label className="block text-sm font-medium text-gray-200 mb-2">
                                      Navigation Title
                                    </label>
                                    <Input
                                      value={navigationSettings.navTitle}
                                      onChange={(e) => setNavigationSettings(prev => ({ ...prev, navTitle: e.target.value }))}
                                      className="bg-gray-700 border-gray-600 text-white"
                                      placeholder="Title for navigation menu"
                                    />
                                  </div>
                                  
                                  <div>
                                    <label className="block text-sm font-medium text-gray-200 mb-2">
                                      Navigation Order
                                    </label>
                                    <Input
                                      type="number"
                                      value={navigationSettings.navOrder}
                                      onChange={(e) => setNavigationSettings(prev => ({ ...prev, navOrder: parseInt(e.target.value) || 0 }))}
                                      className="bg-gray-700 border-gray-600 text-white"
                                      placeholder="0"
                                    />
                                  </div>
                                  
                                  <div>
                                    <label className="block text-sm font-medium text-gray-200 mb-2">
                                      Parent Page
                                    </label>
                                    <Select
                                      value={navigationSettings.parentPage}
                                      onValueChange={(value) => setNavigationSettings(prev => ({ ...prev, parentPage: value }))}
                                    >
                                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                                        <SelectValue placeholder="Select parent page" />
                                      </SelectTrigger>
                                      <SelectContent className="bg-gray-700 border-gray-600">
                                        <SelectItem value="">None (Top Level)</SelectItem>
                                        {pages.filter(p => p.id !== selectedPage?.id).map(page => (
                                          <SelectItem key={page.id} value={page.id}>
                                            {page.title}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  
                                  <div>
                                    <label className="block text-sm font-medium text-gray-200 mb-2">
                                      External Link
                                    </label>
                                    <Input
                                      value={navigationSettings.externalLink}
                                      onChange={(e) => setNavigationSettings(prev => ({ ...prev, externalLink: e.target.value }))}
                                      className="bg-gray-700 border-gray-600 text-white"
                                      placeholder="https://example.com"
                                    />
                                  </div>
                                  
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <h4 className="text-white font-medium">Open in New Tab</h4>
                                      <p className="text-gray-200 text-sm">Open link in new browser tab</p>
                                    </div>
                                    <button
                                      onClick={() => setNavigationSettings(prev => ({ ...prev, openInNewTab: !prev.openInNewTab }))}
                                      className={`p-2 rounded-lg transition-colors ${
                                        navigationSettings.openInNewTab ? 'bg-green-500/20 text-green-400' : 'bg-gray-700 text-gray-200'
                                      }`}
                                    >
                                      {navigationSettings.openInNewTab ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
                                    </button>
                                  </div>
                                </TabsContent>
                                
                                <TabsContent value="advanced" className="p-6 space-y-6">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-200 mb-2">
                                      Custom Head Code
                                    </label>
                                    <Textarea
                                      value={advancedSettings.customHead}
                                      onChange={(e) => setAdvancedSettings(prev => ({ ...prev, customHead: e.target.value }))}
                                      className="bg-gray-700 border-gray-600 text-white font-mono text-sm"
                                      placeholder="Custom HTML head code"
                                      rows={4}
                                    />
                                  </div>
                                  
                                  <div>
                                    <label className="block text-sm font-medium text-gray-200 mb-2">
                                      Custom Body Code
                                    </label>
                                    <Textarea
                                      value={advancedSettings.customBody}
                                      onChange={(e) => setAdvancedSettings(prev => ({ ...prev, customBody: e.target.value }))}
                                      className="bg-gray-700 border-gray-600 text-white font-mono text-sm"
                                      placeholder="Custom HTML body code"
                                      rows={4}
                                    />
                                  </div>
                                  
                                  <div>
                                    <label className="block text-sm font-medium text-gray-200 mb-2">
                                      Tracking Scripts
                                    </label>
                                    <Textarea
                                      value={advancedSettings.trackingScripts}
                                      onChange={(e) => setAdvancedSettings(prev => ({ ...prev, trackingScripts: e.target.value }))}
                                      className="bg-gray-700 border-gray-600 text-white font-mono text-sm"
                                      placeholder="Google Analytics, Facebook Pixel, etc."
                                      rows={4}
                                    />
                                  </div>
                                  
                                  <div>
                                    <label className="block text-sm font-medium text-gray-200 mb-2">
                                      Custom Meta Tags
                                    </label>
                                    <div className="space-y-3">
                                      {advancedSettings.customMeta.map((meta, index) => (
                                        <div key={index} className="flex gap-2">
                                          <Input
                                            value={meta.name}
                                            onChange={(e) => {
                                              const newMeta = [...advancedSettings.customMeta]
                                              newMeta[index].name = e.target.value
                                              setAdvancedSettings(prev => ({ ...prev, customMeta: newMeta }))
                                            }}
                                            className="bg-gray-700 border-gray-600 text-white"
                                            placeholder="Meta name"
                                          />
                                          <Input
                                            value={meta.content}
                                            onChange={(e) => {
                                              const newMeta = [...advancedSettings.customMeta]
                                              newMeta[index].content = e.target.value
                                              setAdvancedSettings(prev => ({ ...prev, customMeta: newMeta }))
                                            }}
                                            className="bg-gray-700 border-gray-600 text-white"
                                            placeholder="Meta content"
                                          />
                                          <Button
                                            onClick={() => {
                                              const newMeta = advancedSettings.customMeta.filter((_, i) => i !== index)
                                              setAdvancedSettings(prev => ({ ...prev, customMeta: newMeta }))
                                            }}
                                            variant="outline"
                                            size="sm"
                                            className="border-red-600 text-red-400"
                                          >
                                            <X className="w-4 h-4" />
                                          </Button>
                                        </div>
                                      ))}
                                      <Button
                                        onClick={() => {
                                          setAdvancedSettings(prev => ({
                                            ...prev,
                                            customMeta: [...prev.customMeta, { name: '', content: '' }]
                                          }))
                                        }}
                                        variant="outline"
                                        size="sm"
                                        className="border-gray-600"
                                      >
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add Meta Tag
                                      </Button>
                                    </div>
                                  </div>

                                  {/* Design Tools Section */}
                                  <div className="border-t border-gray-700 pt-6">
                                    <h4 className="text-white font-medium mb-4 flex items-center gap-2">
                                      <Palette className="w-4 h-4" />
                                      Design Tools
                                    </h4>
                                    
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <label className="block text-sm font-medium text-gray-200 mb-2">
                                          Color Scheme
                                        </label>
                                        <Select>
                                          <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                                            <SelectValue placeholder="Select color scheme" />
                                          </SelectTrigger>
                                          <SelectContent className="bg-gray-700 border-gray-600">
                                            <SelectItem value="modern">Modern (Blue/Purple)</SelectItem>
                                            <SelectItem value="warm">Warm (Orange/Red)</SelectItem>
                                            <SelectItem value="cool">Cool (Green/Teal)</SelectItem>
                                            <SelectItem value="minimal">Minimal (Grayscale)</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                      
                                      <div>
                                        <label className="block text-sm font-medium text-gray-200 mb-2">
                                          Typography
                                        </label>
                                        <Select>
                                          <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                                            <SelectValue placeholder="Select font family" />
                                          </SelectTrigger>
                                          <SelectContent className="bg-gray-700 border-gray-600">
                                            <SelectItem value="inter">Inter</SelectItem>
                                            <SelectItem value="roboto">Roboto</SelectItem>
                                            <SelectItem value="opensans">Open Sans</SelectItem>
                                            <SelectItem value="lato">Lato</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                      
                                      <div>
                                        <label className="block text-sm font-medium text-gray-200 mb-2">
                                          Border Radius
                                        </label>
                                        <Select>
                                          <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                                            <SelectValue placeholder="Select border radius" />
                                          </SelectTrigger>
                                          <SelectContent className="bg-gray-700 border-gray-600">
                                            <SelectItem value="none">None (Sharp)</SelectItem>
                                            <SelectItem value="small">Small (4px)</SelectItem>
                                            <SelectItem value="medium">Medium (8px)</SelectItem>
                                            <SelectItem value="large">Large (16px)</SelectItem>
                                            <SelectItem value="rounded">Rounded (24px)</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                      
                                      <div>
                                        <label className="block text-sm font-medium text-gray-200 mb-2">
                                          Spacing
                                        </label>
                                        <Select>
                                          <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                                            <SelectValue placeholder="Select spacing" />
                                          </SelectTrigger>
                                          <SelectContent className="bg-gray-700 border-gray-600">
                                            <SelectItem value="compact">Compact</SelectItem>
                                            <SelectItem value="normal">Normal</SelectItem>
                                            <SelectItem value="spacious">Spacious</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                    </div>
                                    
                                    <div className="mt-4">
                                      <label className="block text-sm font-medium text-gray-200 mb-2">
                                        Animation Presets
                                      </label>
                                      <div className="grid grid-cols-3 gap-2">
                                        <button className="p-2 bg-gray-700 border border-gray-600 rounded transition-colors text-sm">
                                          Fade In
                                        </button>
                                        <button className="p-2 bg-gray-700 border border-gray-600 rounded transition-colors text-sm">
                                          Slide Up
                                        </button>
                                        <button className="p-2 bg-gray-700 border border-gray-600 rounded transition-colors text-sm">
                                          Bounce
                                        </button>
                                      </div>
                                    </div>
                                    
                                    <div className="mt-4">
                                      <Button
                                        onClick={() => {
                                          // Apply design system to current HTML
                                          const designSystem = {
                                            modern: {
                                              colors: {
                                                primary: '#667eea',
                                                secondary: '#764ba2',
                                                accent: '#f093fb'
                                              },
                                              fonts: {
                                                heading: 'Inter, sans-serif',
                                                body: 'Inter, sans-serif'
                                              }
                                            }
                                          }
                                          
                                          // This would integrate with a real design system
                                          alert('Design system applied! This would update your HTML/CSS with the selected design system.')
                                        }}
                                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500"
                                      >
                                        Apply Design System
                                      </Button>
                                    </div>
                                  </div>
                                </TabsContent>
                              </Tabs>
                            </div>
                          </TabsContent>
                        </Tabs>
                        
                        {/* Save Button */}
                        <div className="absolute bottom-4 right-4">
                          <Button
                            onClick={updatePage}
                            className="bg-gradient-to-r from-purple-500 to-pink-500"
                          >
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="h-[600px]">
                        {/* Preview Controls */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-700">
                          <div className="flex items-center gap-2">
                            <Button
                              variant={previewMode === 'desktop' ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => setPreviewMode('desktop')}
                              className={previewMode === 'desktop' ? 'bg-purple-500' : 'border-gray-600'}
                            >
                              <Monitor className="w-4 h-4 mr-2" />
                              Desktop
                            </Button>
                            <Button
                              variant={previewMode === 'tablet' ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => setPreviewMode('tablet')}
                              className={previewMode === 'tablet' ? 'bg-purple-500' : 'border-gray-600'}
                            >
                              <Tablet className="w-4 h-4 mr-2" />
                              Tablet
                            </Button>
                            <Button
                              variant={previewMode === 'mobile' ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => setPreviewMode('mobile')}
                              className={previewMode === 'mobile' ? 'bg-purple-500' : 'border-gray-600'}
                            >
                              <Smartphone className="w-4 h-4 mr-2" />
                              Mobile
                            </Button>
                          </div>
                          <Button
                            onClick={() => {
                              const preview = generatePreview()
                              const newWindow = window.open('', '_blank')
                              if (newWindow) {
                                newWindow.document.write(preview)
                                newWindow.document.close()
                              }
                            }}
                            variant="outline"
                            size="sm"
                            className="border-gray-600"
                          >
                            <Play className="w-4 h-4 mr-2" />
                            Open in New Tab
                          </Button>
                        </div>
                        
                        {/* Preview */}
                        <div className="h-[calc(100%-64px)] flex items-center justify-center bg-gray-900 overflow-auto">
                          <div 
                            className="bg-white shadow-2xl"
                            style={{ 
                              width: getPreviewWidth(),
                              height: previewMode === 'mobile' ? '667px' : '600px',
                              overflow: 'auto'
                            }}
                          >
                            <iframe
                              srcDoc={generatePreview()}
                              className="w-full h-full border-0"
                              title="Landing Page Preview"
                              sandbox="allow-scripts allow-same-origin"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="flex items-center justify-center h-[600px]">
                  <div className="text-center">
                    <Layout className="w-16 h-16 mx-auto mb-4 text-gray-200" />
                    <h3 className="text-xl font-bold text-white mb-2">No Page Selected</h3>
                    <p className="text-gray-200 mb-4">Select a landing page from the list or create a new one to get started</p>
                    <Button
                      onClick={() => {
                        const modal = document.getElementById('createPageModal')
                        if (modal) modal.classList.remove('hidden')
                      }}
                      className="bg-gradient-to-r from-purple-500 to-pink-500"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create Your First Page
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}