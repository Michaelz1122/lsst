'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import FlexibleInput from '@/components/ui/FlexibleInput'
import EnhancedResultsDisplay from '@/components/ui/EnhancedResultsDisplay'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Eye,
  MousePointer,
  Users,
  Activity,
  Zap,
  RefreshCw,
  Download,
  Copy,
  ArrowRight,
  Clock,
  DollarSign,
  Percent,
  Gauge
} from 'lucide-react'

export default function MetricsAnalysisTool() {
  const [formData, setFormData] = useState({
    cpm: '',
    ctrAll: '',
    ctrLink: '',
    ctrUnique: '',
    outboundCtr: '',
    landingPageViews: '',
    adSpend: '',
    impressions: '',
    clicks: '',
    conversions: ''
  })
  const [generatedAnalysis, setGeneratedAnalysis] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [metrics, setMetrics] = useState<any[]>([])
  const [recommendations, setRecommendations] = useState<string[]>([])
  const [score, setScore] = useState<number | undefined>(undefined)
  const [results, setResults] = useState<any>(null)

  const analysisTools = [
    {
      id: 'ctr-analysis',
      title: 'CTR Analysis',
      description: 'Analyze click-through rates across different metrics',
      icon: MousePointer,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'conversion-analysis',
      title: 'Conversion Analysis',
      description: 'Evaluate conversion rates and performance',
      icon: Target,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'cost-analysis',
      title: 'Cost Analysis',
      description: 'Break down costs and efficiency metrics',
      icon: DollarSign,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'performance-scoring',
      title: 'Performance Scoring',
      description: 'Get overall performance scores and ratings',
      icon: Gauge,
      color: 'from-orange-500 to-red-500'
    }
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const calculateMetrics = () => {
    const cpm = parseFloat(formData.cpm) || 0
    const ctrAll = parseFloat(formData.ctrAll) || 0
    const ctrLink = parseFloat(formData.ctrLink) || 0
    const ctrUnique = parseFloat(formData.ctrUnique) || 0
    const outboundCtr = parseFloat(formData.outboundCtr) || 0
    const landingPageViews = parseFloat(formData.landingPageViews) || 0
    const adSpend = parseFloat(formData.adSpend) || 0
    const impressions = parseFloat(formData.impressions) || 0
    const clicks = parseFloat(formData.clicks) || 0
    const conversions = parseFloat(formData.conversions) || 0

    // Calculate derived metrics
    const cpc = clicks > 0 ? adSpend / clicks : 0
    const cpa = conversions > 0 ? adSpend / conversions : 0
    const conversionRate = clicks > 0 ? (conversions / clicks) * 100 : 0
    const costPerImpression = impressions > 0 ? adSpend / impressions : 0

    // Generate recommendations
    const newRecommendations = []
    if (cpm > 10) newRecommendations.push('CPM is high - consider optimizing targeting')
    if (ctrAll < 1) newRecommendations.push('Low CTR - improve ad creative or targeting')
    if (conversionRate < 2) newRecommendations.push('Low conversion rate - optimize landing page')
    if (cpc > 5) newRecommendations.push('High CPC - review keyword selection')

    // Calculate performance score
    const scoreValue = Math.min(100, Math.max(0, 
      (ctrAll > 2 ? 20 : 0) + 
      (conversionRate > 3 ? 30 : 0) + 
      (cpm < 5 ? 25 : 0) + 
      (cpc < 2 ? 25 : 0)
    ))

    setMetrics([
      { name: 'CPM', value: cpm.toFixed(2), unit: '$', status: cpm < 5 ? 'good' : 'warning' },
      { name: 'CTR All', value: ctrAll.toFixed(2), unit: '%', status: ctrAll > 2 ? 'good' : 'warning' },
      { name: 'CTR Link', value: ctrLink.toFixed(2), unit: '%', status: ctrLink > 1 ? 'good' : 'warning' },
      { name: 'CTR Unique', value: ctrUnique.toFixed(2), unit: '%', status: ctrUnique > 0.5 ? 'good' : 'warning' },
      { name: 'CPC', value: cpc.toFixed(2), unit: '$', status: cpc < 2 ? 'good' : 'warning' },
      { name: 'CPA', value: cpa.toFixed(2), unit: '$', status: cpa < 50 ? 'good' : 'warning' },
      { name: 'Conversion Rate', value: conversionRate.toFixed(2), unit: '%', status: conversionRate > 2 ? 'good' : 'warning' }
    ])
    setRecommendations(newRecommendations)
    setScore(scoreValue)
    setResults({
      summary: `Campaign Performance Analysis`,
      totalScore: scoreValue,
      metricsCount: metrics.length,
      recommendationsCount: newRecommendations.length
    })
  }

  const generateAnalysis = async () => {
    setIsGenerating(true)
    try {
      // Simulate API call
      setTimeout(() => {
        calculateMetrics()
        setIsGenerating(false)
      }, 2000)
    } catch (error) {
      console.error('Error generating analysis:', error)
      setIsGenerating(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const downloadAnalysis = () => {
    const analysisText = `Metrics Analysis Report\n\n` +
      `Metrics:\n${metrics.map(m => `${m.name}: ${m.value}${m.unit}`).join('\n')}\n\n` +
      `Recommendations:\n${recommendations.join('\n')}\n\n` +
      `Overall Score: ${score}/100`
    
    const blob = new Blob([analysisText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'metrics-analysis.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <Navigation currentPath="/metrics-analysis-tool" />

      <div className="relative z-10 pt-25 pb-12">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-6 py-3 rounded-full mb-6 backdrop-blur-sm border border-blue-500/30">
              <BarChart3 className="w-5 h-5" />
              <span className="text-sm font-medium">Metrics Analysis Tool</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Marketing Metrics Analysis
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Analyze your marketing campaign performance with comprehensive metrics evaluation and actionable insights.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Input Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-2xl">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-2">Campaign Metrics</h2>
                  <p className="text-gray-300">Enter your campaign performance data to analyze</p>
                </div>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FlexibleInput
                      label="CPM (Cost Per Mille)"
                      type="currency"
                      value={formData.cpm}
                      onChange={(value) => handleInputChange('cpm', value)}
                      options={['5', '10', '15', '20', '25']}
                      placeholder="10"
                      language="en"
                    />
                    
                    <FlexibleInput
                      label="CTR All (%)"
                      type="percentage"
                      value={formData.ctrAll}
                      onChange={(value) => handleInputChange('ctrAll', value)}
                      options={['1', '2', '3', '5', '10']}
                      placeholder="2.5"
                      language="en"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <FlexibleInput
                      label="CTR Link (%)"
                      type="percentage"
                      value={formData.ctrLink}
                      onChange={(value) => handleInputChange('ctrLink', value)}
                      options={['0.5', '1', '1.5', '2', '3']}
                      placeholder="1.5"
                      language="en"
                    />
                    
                    <FlexibleInput
                      label="CTR Unique (%)"
                      type="percentage"
                      value={formData.ctrUnique}
                      onChange={(value) => handleInputChange('ctrUnique', value)}
                      options={['0.2', '0.5', '1', '1.5', '2']}
                      placeholder="0.8"
                      language="en"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <FlexibleInput
                      label="Outbound CTR (%)"
                      type="percentage"
                      value={formData.outboundCtr}
                      onChange={(value) => handleInputChange('outboundCtr', value)}
                      options={['0.1', '0.3', '0.5', '1', '1.5']}
                      placeholder="0.5"
                      language="en"
                    />
                    
                    <FlexibleInput
                      label="Landing Page Views"
                      type="number"
                      value={formData.landingPageViews}
                      onChange={(value) => handleInputChange('landingPageViews', value)}
                      options={['1000', '5000', '10000', '25000', '50000']}
                      placeholder="10000"
                      language="en"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <FlexibleInput
                      label="Ad Spend ($)"
                      type="currency"
                      value={formData.adSpend}
                      onChange={(value) => handleInputChange('adSpend', value)}
                      options={['1000', '5000', '10000', '25000', '50000']}
                      placeholder="10000"
                      language="en"
                    />
                    
                    <FlexibleInput
                      label="Impressions"
                      type="number"
                      value={formData.impressions}
                      onChange={(value) => handleInputChange('impressions', value)}
                      options={['100000', '500000', '1000000', '2500000', '5000000']}
                      placeholder="1000000"
                      language="en"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <FlexibleInput
                      label="Clicks"
                      type="number"
                      value={formData.clicks}
                      onChange={(value) => handleInputChange('clicks', value)}
                      options={['1000', '5000', '10000', '25000', '50000']}
                      placeholder="10000"
                      language="en"
                    />
                    
                    <FlexibleInput
                      label="Conversions"
                      type="number"
                      value={formData.conversions}
                      onChange={(value) => handleInputChange('conversions', value)}
                      options={['100', '500', '1000', '2500', '5000']}
                      placeholder="500"
                      language="en"
                    />
                  </div>

                  <Button
                    onClick={generateAnalysis}
                    disabled={isGenerating}
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
                  >
                    {isGenerating ? (
                      <div className="flex items-center gap-3">
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        Analyzing Metrics...
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <BarChart3 className="w-5 h-5" />
                        Analyze Performance
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Analysis Tools */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-2xl">
                <h3 className="text-xl font-bold text-white mb-4">Analysis Tools</h3>
                <div className="space-y-4">
                  {analysisTools.map((tool, index) => (
                    <motion.div
                      key={tool.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center flex-shrink-0`}>
                          <tool.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-white mb-1">{tool.title}</h4>
                          <p className="text-sm text-gray-300">{tool.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              {score !== undefined && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-2xl"
                >
                  <h3 className="text-xl font-bold text-white mb-4">Performance Score</h3>
                  <div className="text-center">
                    <div className={`text-4xl font-bold mb-2 ${
                      score >= 80 ? 'text-green-400' : score >= 60 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {score}/100
                    </div>
                    <div className="text-sm text-gray-300">
                      {score >= 80 ? 'Excellent Performance' : score >= 60 ? 'Good Performance' : 'Needs Improvement'}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Results Section */}
          {results && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-16"
            >
              <EnhancedResultsDisplay
                title="Campaign Analysis Results"
                subtitle="Comprehensive metrics analysis with actionable insights"
                results={results}
                metrics={metrics}
                recommendations={recommendations}
                onCopy={copyToClipboard}
                onDownload={downloadAnalysis}
                score={score}
                scoreColor={score >= 80 ? 'text-green-400' : score >= 60 ? 'text-yellow-400' : 'text-red-400'}
              />
            </motion.div>
          )}

          {/* Features Section */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-24"
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Advanced Analysis Features</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Powerful tools to help you understand and optimize your marketing performance
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: BarChart3,
                  title: 'Real-time Analytics',
                  description: 'Monitor your campaign performance with live data updates and instant insights.',
                  color: 'from-blue-500 to-cyan-500'
                },
                {
                  icon: Target,
                  title: 'Conversion Tracking',
                  description: 'Track conversions across all channels and optimize for better results.',
                  color: 'from-green-500 to-emerald-500'
                },
                {
                  icon: TrendingUp,
                  title: 'Performance Trends',
                  description: 'Identify trends and patterns in your campaign data over time.',
                  color: 'from-purple-500 to-pink-500'
                },
                {
                  icon: Zap,
                  title: 'Smart Insights',
                  description: 'Get AI-powered recommendations to improve your marketing strategy.',
                  color: 'from-orange-500 to-red-500'
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-white/30 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  )
}