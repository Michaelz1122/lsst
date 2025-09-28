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
  Palette, 
  Download, 
  Upload, 
  Save, 
  Eye, 
  Edit3, 
  Trash2, 
  Plus,
  Copy,
  Sparkles,
  Settings,
  Check,
  X,
  Moon,
  Sun,
  Monitor,
  Brush,
  Layout,
  Type,
  Sliders
} from 'lucide-react'

interface Theme {
  id: string
  name: string
  description: string | null
  isActive: boolean
  settings: string
  createdAt: string
  updatedAt: string
}

interface ThemeSettings {
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    surface: string
    text: string
    textSecondary: string
    border: string
  }
  typography: {
    fontFamily: string
    fontSize: {
      xs: string
      sm: string
      base: string
      lg: string
      xl: string
      '2xl': string
      '3xl': string
    }
    fontWeight: {
      light: string
      normal: string
      medium: string
      semibold: string
      bold: string
    }
  }
  spacing: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
    '2xl': string
  }
  borderRadius: {
    none: string
    sm: string
    md: string
    lg: string
    full: string
  }
  shadows: {
    sm: string
    md: string
    lg: string
    xl: string
  }
  customCSS: string
  isDefault: boolean
}

export default function ThemesPage() {
  const [themes, setThemes] = useState<Theme[]>([])
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null)
  const [selectedThemeSettings, setSelectedThemeSettings] = useState<ThemeSettings | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState('colors')
  const [previewMode, setPreviewMode] = useState<'light' | 'dark' | 'auto'>('auto')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [newTheme, setNewTheme] = useState({
    name: '',
    description: ''
  })

  useEffect(() => {
    fetchThemes()
  }, [])

  const fetchThemes = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/themes')
      if (!response.ok) throw new Error('Failed to fetch themes')
      
      const data = await response.json()
      setThemes(data)
      
      if (data.length > 0) {
        setSelectedTheme(data[0])
        const settings = JSON.parse(data[0].settings)
        setSelectedThemeSettings(settings)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch themes')
    } finally {
      setLoading(false)
    }
  }

  const createNewTheme = async () => {
    if (!newTheme.name) return

    try {
      setLoading(true)
      const defaultSettings: ThemeSettings = {
        colors: {
          primary: '#8b5cf6',
          secondary: '#ec4899',
          accent: '#f59e0b',
          background: '#0f172a',
          surface: '#1e293b',
          text: '#f8fafc',
          textSecondary: '#94a3b8',
          border: '#334155'
        },
        typography: {
          fontFamily: 'Inter, sans-serif',
          fontSize: {
            xs: '0.75rem',
            sm: '0.875rem',
            base: '1rem',
            lg: '1.125rem',
            xl: '1.25rem',
            '2xl': '1.5rem',
            '3xl': '1.875rem'
          },
          fontWeight: {
            light: '300',
            normal: '400',
            medium: '500',
            semibold: '600',
            bold: '700'
          }
        },
        spacing: {
          xs: '0.5rem',
          sm: '0.75rem',
          md: '1rem',
          lg: '1.5rem',
          xl: '2rem',
          '2xl': '3rem'
        },
        borderRadius: {
          none: '0px',
          sm: '0.125rem',
          md: '0.375rem',
          lg: '0.5rem',
          full: '9999px'
        },
        shadows: {
          sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
          md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
          lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
          xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)'
        },
        customCSS: '',
        isDefault: false
      }

      const response = await fetch('/api/admin/themes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newTheme.name,
          description: newTheme.description,
          settings: defaultSettings
        })
      })

      if (!response.ok) throw new Error('Failed to create theme')

      const newThemeData = await response.json()
      setThemes([newThemeData, ...themes])
      setSelectedTheme(newThemeData)
      setSelectedThemeSettings(defaultSettings)
      setIsEditing(true)
      
      setNewTheme({ name: '', description: '' })
      
      // Hide modal
      const modal = document.getElementById('createThemeModal')
      if (modal) modal.classList.add('hidden')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create theme')
    } finally {
      setLoading(false)
    }
  }

  const updateTheme = async () => {
    if (!selectedTheme || !selectedThemeSettings) return

    try {
      setLoading(true)
      const response = await fetch(`/api/admin/themes/${selectedTheme.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: selectedTheme.name,
          description: selectedTheme.description,
          settings: selectedThemeSettings
        })
      })

      if (!response.ok) throw new Error('Failed to update theme')

      const updatedTheme = await response.json()
      setThemes(themes.map(t => t.id === selectedTheme.id ? updatedTheme : t))
      setSelectedTheme(updatedTheme)
      setIsEditing(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update theme')
    } finally {
      setLoading(false)
    }
  }

  const deleteTheme = async (themeId: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/admin/themes/${themeId}`, {
        method: 'DELETE'
      })

      if (!response.ok) throw new Error('Failed to delete theme')

      setThemes(themes.filter(t => t.id !== themeId))
      if (selectedTheme?.id === themeId) {
        const remainingThemes = themes.filter(t => t.id !== themeId)
        setSelectedTheme(remainingThemes[0] || null)
        if (remainingThemes[0]) {
          setSelectedThemeSettings(JSON.parse(remainingThemes[0].settings))
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete theme')
    } finally {
      setLoading(false)
    }
  }

  const activateTheme = async (themeId: string) => {
    try {
      setLoading(true)
      const theme = themes.find(t => t.id === themeId)
      if (!theme) return

      const settings = JSON.parse(theme.settings)
      settings.isActive = true

      const response = await fetch(`/api/admin/themes/${themeId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: theme.name,
          description: theme.description,
          settings
        })
      })

      if (!response.ok) throw new Error('Failed to activate theme')

      fetchThemes() // Refresh to get updated active status
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to activate theme')
    } finally {
      setLoading(false)
    }
  }

  const generateCSS = (settings: ThemeSettings) => {
    return `
:root {
  /* Colors */
  --color-primary: ${settings.colors.primary};
  --color-secondary: ${settings.colors.secondary};
  --color-accent: ${settings.colors.accent};
  --color-background: ${settings.colors.background};
  --color-surface: ${settings.colors.surface};
  --color-text: ${settings.colors.text};
  --color-text-secondary: ${settings.colors.textSecondary};
  --color-border: ${settings.colors.border};
  
  /* Typography */
  --font-family: ${settings.typography.fontFamily};
  --font-size-xs: ${settings.typography.fontSize.xs};
  --font-size-sm: ${settings.typography.fontSize.sm};
  --font-size-base: ${settings.typography.fontSize.base};
  --font-size-lg: ${settings.typography.fontSize.lg};
  --font-size-xl: ${settings.typography.fontSize.xl};
  --font-size-2xl: ${settings.typography.fontSize['2xl']};
  --font-size-3xl: ${settings.typography.fontSize['3xl']};
  --font-weight-light: ${settings.typography.fontWeight.light};
  --font-weight-normal: ${settings.typography.fontWeight.normal};
  --font-weight-medium: ${settings.typography.fontWeight.medium};
  --font-weight-semibold: ${settings.typography.fontWeight.semibold};
  --font-weight-bold: ${settings.typography.fontWeight.bold};
  
  /* Spacing */
  --spacing-xs: ${settings.spacing.xs};
  --spacing-sm: ${settings.spacing.sm};
  --spacing-md: ${settings.spacing.md};
  --spacing-lg: ${settings.spacing.lg};
  --spacing-xl: ${settings.spacing.xl};
  --spacing-2xl: ${settings.spacing['2xl']};
  
  /* Border Radius */
  --radius-none: ${settings.borderRadius.none};
  --radius-sm: ${settings.borderRadius.sm};
  --radius-md: ${settings.borderRadius.md};
  --radius-lg: ${settings.borderRadius.lg};
  --radius-full: ${settings.borderRadius.full};
  
  /* Shadows */
  --shadow-sm: ${settings.shadows.sm};
  --shadow-md: ${settings.shadows.md};
  --shadow-lg: ${settings.shadows.lg};
  --shadow-xl: ${settings.shadows.xl};
}

${settings.customCSS}
    `.trim()
  }

  const downloadTheme = () => {
    if (!selectedThemeSettings) return

    const css = generateCSS(selectedThemeSettings)
    const blob = new Blob([css], { type: 'text/css' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${selectedTheme?.name.toLowerCase().replace(/\s+/g, '-')}-theme.css`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (loading && themes.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading themes...</p>
        </div>
      </div>
    )
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
                Theme Manager
              </h1>
              <p className="text-gray-200 mt-2">Create, customize, and manage website themes with our powerful theme editor</p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => {
                  const modal = document.getElementById('createThemeModal')
                  if (modal) modal.classList.remove('hidden')
                }}
                className="bg-gradient-to-r from-purple-500 to-pink-500"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Theme
              </Button>
            </div>
          </div>
        </motion.div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg">
            <p className="text-red-200">{error}</p>
          </div>
        )}

        {/* Create Theme Modal */}
        <div id="createThemeModal" className="hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Create New Theme</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Theme Name</label>
                <Input
                  value={newTheme.name}
                  onChange={(e) => setNewTheme({ ...newTheme, name: e.target.value })}
                  placeholder="Enter theme name"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Textarea
                  value={newTheme.description}
                  onChange={(e) => setNewTheme({ ...newTheme, description: e.target.value })}
                  placeholder="Theme description"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button
                onClick={createNewTheme}
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500"
              >
                {loading ? 'Creating...' : 'Create Theme'}
              </Button>
              <Button
                onClick={() => {
                  const modal = document.getElementById('createThemeModal')
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

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Themes List */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Themes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {themes.map((theme) => {
                  const settings = JSON.parse(theme.settings) as ThemeSettings
                  return (
                    <div
                      key={theme.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedTheme?.id === theme.id
                          ? 'border-purple-500 bg-purple-500/20'
                          : 'border-gray-600'
                      }`}
                      onClick={() => {
                        setSelectedTheme(theme)
                        setSelectedThemeSettings(settings)
                        setIsEditing(false)
                      }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-white">{theme.name}</h4>
                            {theme.isActive && <Badge className="bg-green-500 text-white">Active</Badge>}
                            {settings.isDefault && <Badge className="bg-blue-500 text-white">Default</Badge>}
                          </div>
                          <p className="text-sm text-gray-200">{theme.description}</p>
                          <div className="flex gap-1 mt-2">
                            <div 
                              className="w-4 h-4 rounded-full border border-gray-600"
                              style={{ backgroundColor: settings.colors.primary }}
                            />
                            <div 
                              className="w-4 h-4 rounded-full border border-gray-600"
                              style={{ backgroundColor: settings.colors.secondary }}
                            />
                            <div 
                              className="w-4 h-4 rounded-full border border-gray-600"
                              style={{ backgroundColor: settings.colors.accent }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>

          {/* Theme Editor */}
          <div className="lg:col-span-3">
            {selectedTheme && selectedThemeSettings ? (
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Brush className="w-5 h-5" />
                        {selectedTheme.name}
                      </CardTitle>
                      <CardDescription className="text-gray-200">
                        {selectedTheme.description}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => activateTheme(selectedTheme.id)}
                        disabled={selectedTheme.isActive || loading}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Check className="w-4 h-4 mr-2" />
                        {selectedTheme.isActive ? 'Active' : 'Activate'}
                      </Button>
                      <Button
                        onClick={downloadTheme}
                        size="sm"
                        variant="outline"
                        className="border-gray-600"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Export
                      </Button>
                      <Button
                        onClick={() => deleteTheme(selectedTheme.id)}
                        disabled={loading}
                        size="sm"
                        variant="outline"
                        className="border-red-600 text-red-400 hover:bg-red-600/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-5">
                      <TabsTrigger value="colors" className="flex items-center gap-2">
                        <Palette className="w-4 h-4" />
                        Colors
                      </TabsTrigger>
                      <TabsTrigger value="typography" className="flex items-center gap-2">
                        <Type className="w-4 h-4" />
                        Typography
                      </TabsTrigger>
                      <TabsTrigger value="spacing" className="flex items-center gap-2">
                        <Layout className="w-4 h-4" />
                        Spacing
                      </TabsTrigger>
                      <TabsTrigger value="advanced" className="flex items-center gap-2">
                        <Sliders className="w-4 h-4" />
                        Advanced
                      </TabsTrigger>
                      <TabsTrigger value="preview" className="flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        Preview
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="colors" className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {Object.entries(selectedThemeSettings.colors).map(([key, value]) => (
                          <div key={key} className="space-y-2">
                            <label className="text-sm font-medium text-gray-200 capitalize">
                              {key}
                            </label>
                            <div className="flex gap-2">
                              <Input
                                type="color"
                                value={value}
                                onChange={(e) => {
                                  if (!isEditing) setIsEditing(true)
                                  setSelectedThemeSettings({
                                    ...selectedThemeSettings,
                                    colors: {
                                      ...selectedThemeSettings.colors,
                                      [key]: e.target.value
                                    }
                                  })
                                }}
                                className="w-12 h-10 p-1 bg-gray-700 border-gray-600"
                              />
                              <Input
                                type="text"
                                value={value}
                                onChange={(e) => {
                                  if (!isEditing) setIsEditing(true)
                                  setSelectedThemeSettings({
                                    ...selectedThemeSettings,
                                    colors: {
                                      ...selectedThemeSettings.colors,
                                      [key]: e.target.value
                                    }
                                  })
                                }}
                                className="flex-1 bg-gray-700 border-gray-600 text-white"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="typography" className="space-y-4">
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-200">Font Family</label>
                          <Input
                            value={selectedThemeSettings.typography.fontFamily}
                            onChange={(e) => {
                              if (!isEditing) setIsEditing(true)
                              setSelectedThemeSettings({
                                ...selectedThemeSettings,
                                typography: {
                                  ...selectedThemeSettings.typography,
                                  fontFamily: e.target.value
                                }
                              })
                            }}
                            className="bg-gray-700 border-gray-600 text-white"
                          />
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {Object.entries(selectedThemeSettings.typography.fontSize).map(([key, value]) => (
                            <div key={key} className="space-y-2">
                              <label className="text-sm font-medium text-gray-200 capitalize">
                                {key}
                              </label>
                              <Input
                                type="text"
                                value={value}
                                onChange={(e) => {
                                  if (!isEditing) setIsEditing(true)
                                  setSelectedThemeSettings({
                                    ...selectedThemeSettings,
                                    typography: {
                                      ...selectedThemeSettings.typography,
                                      fontSize: {
                                        ...selectedThemeSettings.typography.fontSize,
                                        [key]: e.target.value
                                      }
                                    }
                                  })
                                }}
                                className="bg-gray-700 border-gray-600 text-white"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="spacing" className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {Object.entries(selectedThemeSettings.spacing).map(([key, value]) => (
                          <div key={key} className="space-y-2">
                            <label className="text-sm font-medium text-gray-200 capitalize">
                              {key}
                            </label>
                            <Input
                              type="text"
                              value={value}
                              onChange={(e) => {
                                if (!isEditing) setIsEditing(true)
                                setSelectedThemeSettings({
                                  ...selectedThemeSettings,
                                  spacing: {
                                    ...selectedThemeSettings.spacing,
                                    [key]: e.target.value
                                  }
                                })
                              }}
                              className="bg-gray-700 border-gray-600 text-white"
                            />
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="advanced" className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {Object.entries(selectedThemeSettings.borderRadius).map(([key, value]) => (
                          <div key={key} className="space-y-2">
                            <label className="text-sm font-medium text-gray-200 capitalize">
                              Border {key}
                            </label>
                            <Input
                              type="text"
                              value={value}
                              onChange={(e) => {
                                if (!isEditing) setIsEditing(true)
                                setSelectedThemeSettings({
                                  ...selectedThemeSettings,
                                  borderRadius: {
                                    ...selectedThemeSettings.borderRadius,
                                    [key]: e.target.value
                                  }
                                })
                              }}
                              className="bg-gray-700 border-gray-600 text-white"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-sm font-medium text-gray-200">Custom CSS</h4>
                        <Textarea
                          value={selectedThemeSettings.customCSS}
                          onChange={(e) => {
                            if (!isEditing) setIsEditing(true)
                            setSelectedThemeSettings({
                              ...selectedThemeSettings,
                              customCSS: e.target.value
                            })
                          }}
                          placeholder="Enter custom CSS rules..."
                          className="bg-gray-700 border-gray-600 text-white min-h-[200px] font-mono text-sm"
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="preview" className="space-y-4">
                      <div className="bg-gray-900 rounded-lg p-6">
                        <h4 className="text-lg font-semibold mb-4" style={{ 
                          color: selectedThemeSettings.colors.text,
                          fontFamily: selectedThemeSettings.typography.fontFamily,
                          fontSize: selectedThemeSettings.typography.fontSize.lg
                        }}>
                          Theme Preview
                        </h4>
                        <div className="space-y-4">
                          <div className="p-4 rounded-lg" style={{ 
                            backgroundColor: selectedThemeSettings.colors.surface,
                            border: `1px solid ${selectedThemeSettings.colors.border}`
                          }}>
                            <h5 className="font-medium mb-2" style={{ 
                              color: selectedThemeSettings.colors.text,
                              fontFamily: selectedThemeSettings.typography.fontFamily
                            }}>
                              Sample Card
                            </h5>
                            <p className="text-sm" style={{ 
                              color: selectedThemeSettings.colors.textSecondary,
                              fontFamily: selectedThemeSettings.typography.fontFamily
                            }}>
                              This is a sample card showing how your theme will look.
                            </p>
                            <button 
                              className="mt-3 px-4 py-2 rounded text-white font-medium text-sm"
                              style={{ backgroundColor: selectedThemeSettings.colors.primary }}
                            >
                              Sample Button
                            </button>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>

                  {isEditing && (
                    <div className="flex gap-3 mt-6 pt-6 border-t border-gray-700">
                      <Button
                        onClick={updateTheme}
                        disabled={loading}
                        className="bg-gradient-to-r from-purple-500 to-pink-500"
                      >
                        {loading ? 'Saving...' : 'Save Changes'}
                      </Button>
                      <Button
                        onClick={() => {
                          setIsEditing(false)
                          if (selectedTheme) {
                            const settings = JSON.parse(selectedTheme.settings)
                            setSelectedThemeSettings(settings)
                          }
                        }}
                        variant="outline"
                        className="border-gray-600"
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <Palette className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400">Select a theme to start editing</p>
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