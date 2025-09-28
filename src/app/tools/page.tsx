'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowRight, 
  Calculator, 
  Target, 
  Users, 
  TrendingUp, 
  DollarSign,
  BarChart3,
  FileText,
  Edit,
  Radio,
  Lightbulb,
  Activity,
  Zap,
  File,
  Database,
  Calendar,
  Settings,
  Eye,
  Download,
  UserCheck,
  ShoppingCart,
  RefreshCw
} from 'lucide-react'

export default function ToolsPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Tools organized by category
  const toolsByCategory = {
    mediaBuyers: [
      {
        id: 'roi-calculator',
        title: 'ROI Calculator',
        description: 'Calculate your return on investment for marketing campaigns',
        icon: TrendingUp,
        color: 'from-green-500 to-emerald-500',
        arabicVersion: '/roi-calculator-ar',
        features: ['ROI Calculation', 'Campaign Analysis', 'Performance Metrics'],
      },
      {
        id: 'cac-calculator',
        title: 'CAC Calculator',
        description: 'Calculate Customer Acquisition Cost for your campaigns',
        icon: Users,
        color: 'from-blue-500 to-cyan-500',
        arabicVersion: '/cac-calculator-ar',
        features: ['CAC Calculation', 'Budget Planning', 'Cost Analysis'],
      },
      {
        id: 'ad-budget-calculator',
        title: 'Ad Budget Calculator',
        description: 'Plan and optimize your advertising budget effectively',
        icon: DollarSign,
        color: 'from-purple-500 to-pink-500',
        arabicVersion: '/ad-budget-calculator-ar',
        features: ['Budget Planning', 'Cost Optimization', 'ROI Projections'],
      },
      {
        id: 'conversion-rate-calculator',
        title: 'Conversion Rate Calculator',
        description: 'Calculate and optimize your conversion rates',
        icon: Target,
        color: 'from-orange-500 to-red-500',
        arabicVersion: '/conversion-rate-calculator-ar',
        features: ['Conversion Tracking', 'Rate Analysis', 'Optimization Tips'],
      },
      {
        id: 'ab-test-calculator',
        title: 'A/B Test Calculator',
        description: 'Calculate statistical significance for A/B tests',
        icon: Activity,
        color: 'from-yellow-500 to-amber-500',
        arabicVersion: '/ab-test-calculator-ar',
        features: ['Statistical Analysis', 'Significance Testing', 'Confidence Intervals'],
      },
      {
        id: 'media-buying-plan-tool',
        title: 'Media Buying Plan Tool',
        description: 'Create comprehensive media buying strategies',
        icon: Radio,
        color: 'from-indigo-500 to-purple-500',
        arabicVersion: '/media-buying-plan-tool-ar',
        features: ['Media Planning', 'Budget Allocation', 'Channel Strategy'],
      }
    ],
    marketers: [
      {
        id: 'ltv-calculator',
        title: 'LTV Calculator',
        description: 'Calculate Customer Lifetime Value for strategic planning',
        icon: DollarSign,
        color: 'from-green-500 to-emerald-500',
        arabicVersion: '/ltv-calculator-ar',
        features: ['LTV Calculation', 'Customer Value', 'Retention Analysis'],
      },
      {
        id: 'break-even-calculator',
        title: 'Break-even Calculator',
        description: 'Calculate break-even points for campaigns and products',
        icon: BarChart3,
        color: 'from-blue-500 to-cyan-500',
        arabicVersion: '/break-even-calculator-ar',
        features: ['Break-even Analysis', 'Cost Structure', 'Profit Planning'],
      },
      {
        id: 'marketing-strategy-tool',
        title: 'Marketing Strategy Tool',
        description: 'Develop comprehensive marketing strategies',
        icon: Lightbulb,
        color: 'from-purple-500 to-pink-500',
        arabicVersion: '/marketing-strategy-tool-ar',
        features: ['Strategy Development', 'Market Analysis', 'Goal Setting'],
      },
      {
        id: 'metrics-analysis-tool',
        title: 'Basic Metrics Analysis Tools',
        description: 'Analyze key marketing metrics and performance',
        icon: BarChart3,
        color: 'from-orange-500 to-red-500',
        arabicVersion: '/metrics-analysis-tool-ar',
        features: ['Metrics Tracking', 'Performance Analysis', 'Reporting'],
      },
      {
        id: 'external-factors-evaluation-tool',
        title: 'External Factors Evaluation Tools',
        description: 'Evaluate external factors affecting your marketing',
        icon: Target,
        color: 'from-yellow-500 to-amber-500',
        arabicVersion: '/external-factors-evaluation-tool-ar',
        features: ['External Analysis', 'Market Research', 'Risk Assessment'],
      },
      {
        id: 'comprehensive-strategy-tool',
        title: 'Comprehensive Strategy Tools',
        description: 'Build complete strategic marketing plans',
        icon: Lightbulb,
        color: 'from-indigo-500 to-purple-500',
        arabicVersion: '/comprehensive-strategy-tool-ar',
        features: ['Strategic Planning', 'Implementation', 'Monitoring'],
      },
      {
        id: 'google-sheets-docs-tool',
        title: 'Google Sheets & Docs Tools',
        description: 'Create templates and automation for Google Workspace',
        icon: File,
        color: 'from-teal-500 to-cyan-500',
        arabicVersion: '/google-sheets-docs-tool-ar',
        features: ['Template Creation', 'Automation Scripts', 'Analytics Setup'],
      }
    ],
    contentWriters: [
      {
        id: 'copywriting-tools',
        title: 'Copywriting Tools',
        description: 'Enhance your copywriting with AI-powered tools',
        icon: Edit,
        color: 'from-green-500 to-emerald-500',
        arabicVersion: '/copywriting-tools-ar',
        features: ['Copy Generation', 'Headline Optimization', 'Tone Analysis'],
      },
      {
        id: 'creative-optimization-tool',
        title: 'Creative Optimisation Tools',
        description: 'Optimize your creative content for maximum impact',
        icon: Zap,
        color: 'from-blue-500 to-cyan-500',
        arabicVersion: '/creative-optimization-tool-ar',
        features: ['Creative Analysis', 'Performance Optimization', 'A/B Testing'],
      }
    ]
  }

  const categories = [
    {
      id: 'mediaBuyers',
      title: 'Tools for Media Buyers',
      description: 'Essential tools for media planning, budgeting, and campaign optimization',
      icon: Radio,
      color: 'from-purple-500 to-pink-500',
      tools: toolsByCategory.mediaBuyers
    },
    {
      id: 'marketers',
      title: 'Tools for Marketers & Planners',
      description: 'Strategic tools for marketing planning, analysis, and growth',
      icon: Target,
      color: 'from-blue-500 to-cyan-500',
      tools: toolsByCategory.marketers
    },
    {
      id: 'contentWriters',
      title: 'Tools for Content Writers',
      description: 'Creative tools for content creation, copywriting, and optimization',
      icon: Edit,
      color: 'from-green-500 to-emerald-500',
      tools: toolsByCategory.contentWriters
    }
  ]

  const allTools = [...toolsByCategory.mediaBuyers, ...toolsByCategory.marketers, ...toolsByCategory.contentWriters];

  const filteredTools = activeCategory === 'all' 
    ? allTools 
    : categories.find(cat => cat.id === activeCategory)?.tools || []

  const searchedTools = filteredTools.filter(tool => (
    tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  ))

  const ToolCard = ({ tool }: { tool: any }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <Card className="bg-white/5 backdrop-blur-md border-white/10 h-full">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-4">
            <div className={"w-12 h-12 rounded-xl bg-gradient-to-br " + tool.color + " flex items-center justify-center"}>
              <tool.icon className="w-6 h-6 text-white" />
            </div>
            <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
              {tool.features.length} features
            </Badge>
          </div>
          <CardTitle className="text-xl font-bold text-white mb-2">{tool.title}</CardTitle>
          <p className="text-gray-300 text-sm leading-relaxed">{tool.description}</p>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {tool.features.slice(0, 3).map((feature: string, index: number) => (
                <Badge key={index} variant="outline" className="text-xs border-white/20 text-white/70">
                  {feature}
                </Badge>
              ))}
              {tool.features.length > 3 && (
                <Badge variant="outline" className="text-xs border-white/20 text-white/70">
                  +{tool.features.length - 3} more
                </Badge>
              )}
            </div>
            
            <div className="flex gap-2 pt-2">
              <Button
                onClick={() => window.location.href = `/${tool.id}`}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium py-2 px-4 rounded-lg shadow-lg"
              >
                English Version
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                onClick={() => window.location.href = tool.arabicVersion}
                className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-medium py-2 px-4 rounded-lg shadow-lg border border-emerald-400/30"
              >
                <span className="flex items-center gap-2">
                  <span className="text-xs">🇸🇦</span>
                  النسخة العربية
                </span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <Navigation currentPath="/tools" />

      <div className="relative z-10 pt-25 pb-12">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full mb-6">
              <Calculator className="w-4 h-4" />
              <span className="text-sm font-medium">Professional Marketing Tools</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent leading-tight">
              Marketing Tools Suite
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
              Professional tools designed for media buyers, marketers, and content creators to optimize their campaigns and maximize ROI
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search tools..."
                  className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300 pl-12"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-6 py-3 rounded-full transition-all duration-300 font-medium ${
                  activeCategory === 'all'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                All Tools
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={"px-6 py-3 rounded-full transition-all duration-300 font-medium flex items-center gap-2 " + (
                    activeCategory === category.id
                      ? 'bg-gradient-to-r ' + category.color + ' text-white shadow-lg'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  )}
                >
                  <category.icon className="w-4 h-4" />
                  {category.title.split(' for ')[1]}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Category Sections */}
          {activeCategory === 'all' ? (
            <div className="space-y-16">
              {categories.map((category, categoryIndex) => (
                <motion.section
                  key={category.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
                  className="scroll-mt-8"
                  id={category.id}
                >
                  <div className="text-center mb-12">
                    <div className={"inline-flex items-center gap-2 bg-gradient-to-r " + category.color + " text-white px-4 py-2 rounded-full mb-4"}>
                      <category.icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{category.title}</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">{category.title}</h2>
                    <p className="text-lg text-gray-300 max-w-3xl mx-auto">{category.description}</p>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.tools.map((tool, toolIndex) => (
                      <ToolCard key={tool.id} tool={tool} />
                    ))}
                  </div>
                </motion.section>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                  {categories.find(cat => cat.id === activeCategory)?.title}
                </h2>
                <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                  {categories.find(cat => cat.id === activeCategory)?.description}
                </p>
              </div>

              {searchedTools.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchedTools.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-lg mb-4">No tools found matching your search.</div>
                  <Button
                    onClick={() => setSearchQuery('')}
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    Clear Search
                  </Button>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}