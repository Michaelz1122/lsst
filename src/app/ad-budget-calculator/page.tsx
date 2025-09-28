'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import FlexibleInput from '@/components/ui/FlexibleInput'
import EnhancedResultsDisplay from '@/components/ui/EnhancedResultsDisplay'
import { 
  Calculator, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Target, 
  BarChart3, 
  Download,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  PieChart,
  Activity,
  Zap,
  Award,
  Clock,
  Layers,
  Percent
} from 'lucide-react'

export default function AdBudgetCalculator() {
  const [formData, setFormData] = useState({
    totalRevenue: '',
    marketingBudgetPercent: '',
    targetROAS: '',
    averageOrderValue: '',
    conversionRate: '',
    campaignDuration: '30',
    industry: '',
    businessGoal: ''
  })

  const [results, setResults] = useState<any>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const industries = [
    'E-commerce', 'SaaS', 'Local Business', 'Healthcare', 'Education', 
    'Real Estate', 'Finance', 'Travel & Tourism', 'Food & Beverage', 'Other'
  ]

  const businessGoals = [
    'Brand Awareness', 'Lead Generation', 'Sales', 'Customer Retention', 'Market Expansion', 'Other'
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const calculateAdBudget = () => {
    const totalRevenue = parseFloat(formData.totalRevenue) || 0
    const marketingBudgetPercent = parseFloat(formData.marketingBudgetPercent) || 0
    const targetROAS = parseFloat(formData.targetROAS) || 0
    const averageOrderValue = parseFloat(formData.averageOrderValue) || 0
    const conversionRate = parseFloat(formData.conversionRate) || 0
    const campaignDuration = parseInt(formData.campaignDuration) || 30

    // Calculate budget allocations
    const totalMarketingBudget = totalRevenue * (marketingBudgetPercent / 100)
    const adBudget = totalMarketingBudget * 0.7 // 70% of marketing budget for ads
    const monthlyAdBudget = adBudget / 12
    const dailyAdBudget = monthlyAdBudget / 30

    // Calculate campaign-specific metrics
    const campaignAdBudget = (adBudget / 365) * campaignDuration
    const targetRevenue = campaignAdBudget * targetROAS
    const targetOrders = targetRevenue / averageOrderValue
    const targetVisitors = targetOrders / (conversionRate / 100)
    const costPerVisitor = campaignAdBudget / targetVisitors
    const costPerOrder = campaignAdBudget / targetOrders

    // Calculate channel allocation (suggested)
    const channelAllocation = {
      facebook: adBudget * 0.35,
      google: adBudget * 0.30,
      instagram: adBudget * 0.20,
      linkedin: adBudget * 0.10,
      other: adBudget * 0.05
    }

    // Calculate efficiency scores
    const budgetScore = marketingBudgetPercent >= 10 && marketingBudgetPercent <= 20 ? 100 : 
                       marketingBudgetPercent >= 5 && marketingBudgetPercent <= 25 ? 80 : 
                       marketingBudgetPercent >= 3 && marketingBudgetPercent <= 30 ? 60 : 40
    const roasScore = targetROAS >= 4 ? 100 : targetROAS >= 3 ? 80 : targetROAS >= 2 ? 60 : targetROAS >= 1 ? 40 : 20
    const conversionScore = conversionRate >= 3 ? 100 : conversionRate >= 2 ? 80 : conversionRate >= 1 ? 60 : conversionRate >= 0.5 ? 40 : 20
    const overallScore = (budgetScore + roasScore + conversionScore) / 3

    // Generate recommendations
    const recommendations = []
    const strengths = []

    if (marketingBudgetPercent >= 10 && marketingBudgetPercent <= 20) {
      strengths.push('Optimal marketing budget allocation')
    } else if (marketingBudgetPercent < 5) {
      recommendations.push('Consider increasing marketing budget for better results')
    } else if (marketingBudgetPercent > 25) {
      recommendations.push('Marketing budget may be too high - optimize spending')
    }

    if (targetROAS >= 3) {
      strengths.push('Realistic ROAS target')
    } else if (targetROAS < 2) {
      recommendations.push('ROAS target may be too low - aim for higher returns')
    }

    if (conversionRate >= 2) {
      strengths.push('Good conversion rate expectations')
    } else if (conversionRate < 1) {
      recommendations.push('Conversion rate target is low - optimize landing pages')
    }

    if (averageOrderValue >= 100) {
      strengths.push('Healthy average order value')
    } else if (averageOrderValue < 50) {
      recommendations.push('Consider increasing average order value')
    }

    return {
      totalMarketingBudget: totalMarketingBudget.toFixed(2),
      adBudget: adBudget.toFixed(2),
      monthlyAdBudget: monthlyAdBudget.toFixed(2),
      dailyAdBudget: dailyAdBudget.toFixed(2),
      campaignAdBudget: campaignAdBudget.toFixed(2),
      targetRevenue: targetRevenue.toFixed(2),
      targetOrders: targetOrders.toFixed(0),
      targetVisitors: targetVisitors.toFixed(0),
      costPerVisitor: costPerVisitor.toFixed(2),
      costPerOrder: costPerOrder.toFixed(2),
      channelAllocation: {
        facebook: channelAllocation.facebook.toFixed(2),
        google: channelAllocation.google.toFixed(2),
        instagram: channelAllocation.instagram.toFixed(2),
        linkedin: channelAllocation.linkedin.toFixed(2),
        other: channelAllocation.other.toFixed(2)
      },
      overallScore: overallScore.toFixed(0),
      recommendations,
      strengths,
      metrics: {
        budgetScore,
        roasScore,
        conversionScore
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsCalculating(true)

    // Simulate calculation
    setTimeout(() => {
      const calculatedResults = calculateAdBudget()
      setResults(calculatedResults)
      setIsCalculating(false)
    }, 1500)
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent'
    if (score >= 60) return 'Good'
    if (score >= 40) return 'Fair'
    return 'Poor'
  }

  const formatCurrency = (value: string) => {
    const num = parseFloat(value)
    return new Intl.NumberFormat('en-EG', {
      style: 'currency',
      currency: 'EGP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num)
  }

  const getExportData = () => {
    if (!results) return null

    return {
      title: 'Ad Budget Analysis Report',
      date: new Date().toLocaleDateString(),
      sections: [
        {
          title: 'Budget Overview',
          data: [
            { label: 'Total Marketing Budget', value: formatCurrency(results.totalMarketingBudget) },
            { label: 'Ad Budget', value: formatCurrency(results.adBudget) },
            { label: 'Monthly Ad Budget', value: formatCurrency(results.monthlyAdBudget) },
            { label: 'Daily Ad Budget', value: formatCurrency(results.dailyAdBudget) },
            { label: 'Campaign Budget', value: formatCurrency(results.campaignAdBudget) }
          ]
        },
        {
          title: 'Performance Targets',
          data: [
            { label: 'Target Revenue', value: formatCurrency(results.targetRevenue) },
            { label: 'Target Orders', value: results.targetOrders },
            { label: 'Target Visitors', value: results.targetVisitors },
            { label: 'Cost Per Order', value: formatCurrency(results.costPerOrder) },
            { label: 'Cost Per Visitor', value: formatCurrency(results.costPerVisitor) }
          ]
        },
        {
          title: 'Channel Allocation',
          data: [
            { label: 'Facebook', value: formatCurrency(results.channelAllocation.facebook) },
            { label: 'Google', value: formatCurrency(results.channelAllocation.google) },
            { label: 'Instagram', value: formatCurrency(results.channelAllocation.instagram) },
            { label: 'LinkedIn', value: formatCurrency(results.channelAllocation.linkedin) },
            { label: 'Other', value: formatCurrency(results.channelAllocation.other) }
          ]
        },
        {
          title: 'Analysis',
          data: [
            { label: 'Overall Score', value: `${results.overallScore}/100` },
            { label: 'Performance Rating', value: getScoreLabel(parseFloat(results.overallScore)) }
          ]
        }
      ],
      strengths: results.strengths,
      recommendations: results.recommendations
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-900/20 via-transparent to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <Navigation currentPath="/ad-budget-calculator" />

      <div className="relative z-40 container mx-auto px-6 pt-24 pb-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-orange-300 px-6 py-3 rounded-full mb-6 backdrop-blur-sm border border-orange-500/30">
            <Calculator className="w-5 h-5" />
            <span className="text-sm font-medium">Ad Budget Calculator</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
            Ad Budget Calculator
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Calculate optimal advertising budgets, allocate spending across channels, and maximize your marketing ROI with data-driven budget planning.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Calculator Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-2xl">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Budget Planning Data</h2>
                <p className="text-gray-300">Enter your business metrics to calculate optimal ad budget</p>
              </div>

              {!results ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Business Metrics */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <FlexibleInput
                      label="Total Annual Revenue"
                      type="currency"
                      value={formData.totalRevenue}
                      onChange={(value) => handleInputChange('totalRevenue', value)}
                      options={['500000', '1000000', '2000000', '5000000', '10000000']}
                      placeholder="1000000"
                      required={true}
                      language="en"
                    />
                    
                    <FlexibleInput
                      label="Marketing Budget (%)"
                      type="percentage"
                      value={formData.marketingBudgetPercent}
                      onChange={(value) => handleInputChange('marketingBudgetPercent', value)}
                      options={['5', '10', '15', '20', '25']}
                      placeholder="15"
                      required={true}
                      language="en"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <FlexibleInput
                      label="Target ROAS"
                      type="number"
                      value={formData.targetROAS}
                      onChange={(value) => handleInputChange('targetROAS', value)}
                      options={['2', '3', '4', '5', '6']}
                      placeholder="3"
                      required={true}
                      language="en"
                    />
                    
                    <FlexibleInput
                      label="Average Order Value"
                      type="currency"
                      value={formData.averageOrderValue}
                      onChange={(value) => handleInputChange('averageOrderValue', value)}
                      options={['50', '100', '150', '200', '250']}
                      placeholder="150"
                      required={true}
                      language="en"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <FlexibleInput
                      label="Conversion Rate (%)"
                      type="percentage"
                      value={formData.conversionRate}
                      onChange={(value) => handleInputChange('conversionRate', value)}
                      options={['1', '2', '2.5', '3', '5']}
                      placeholder="2.5"
                      required={true}
                      language="en"
                    />
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-orange-400" />
                        Campaign Duration (days)
                      </label>
                      <select
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 text-white appearance-none cursor-pointer"
                        value={formData.campaignDuration}
                        onChange={(e) => handleInputChange('campaignDuration', e.target.value)}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23fb923c' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                          backgroundPosition: `right 0.5rem center`,
                          backgroundRepeat: `no-repeat`,
                          backgroundSize: `1.5em 1.5em`,
                          paddingRight: `2.5rem`
                        }}
                      >
                        <option value="7" className="bg-gray-900 text-white">7 days</option>
                        <option value="14" className="bg-gray-900 text-white">14 days</option>
                        <option value="30" className="bg-gray-900 text-white">30 days</option>
                        <option value="60" className="bg-gray-900 text-white">60 days</option>
                        <option value="90" className="bg-gray-900 text-white">90 days</option>
                      </select>
                    </div>
                  </div>

                  {/* Context Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <Activity className="w-4 h-4 text-orange-400" />
                        Industry
                      </label>
                      <select
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 text-white appearance-none cursor-pointer"
                        value={formData.industry}
                        onChange={(e) => handleInputChange('industry', e.target.value)}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23fb923c' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                          backgroundPosition: `right 0.5rem center`,
                          backgroundRepeat: `no-repeat`,
                          backgroundSize: `1.5em 1.5em`,
                          paddingRight: `2.5rem`
                        }}
                      >
                        <option value="" className="bg-gray-900 text-white">Select industry</option>
                        {industries.map(industry => (
                          <option key={industry} value={industry} className="bg-gray-900 text-white">{industry}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-orange-400" />
                        Business Goal
                      </label>
                      <select
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 text-white appearance-none cursor-pointer"
                        value={formData.businessGoal}
                        onChange={(e) => handleInputChange('businessGoal', e.target.value)}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23fb923c' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                          backgroundPosition: `right 0.5rem center`,
                          backgroundRepeat: `no-repeat`,
                          backgroundSize: `1.5em 1.5em`,
                          paddingRight: `2.5rem`
                        }}
                      >
                        <option value="" className="bg-gray-900 text-white">Select goal</option>
                        {businessGoals.map(goal => (
                          <option key={goal} value={goal} className="bg-gray-900 text-white">{goal}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isCalculating}
                    className="w-full px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isCalculating ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Calculating...
                      </>
                    ) : (
                      <>
                        <Calculator className="w-5 h-5" />
                        Calculate Budget
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <EnhancedResultsDisplay
                  title="Ad Budget Analysis"
                  subtitle="Your advertising budget optimization breakdown"
                  results={results}
                  metrics={[
                    {
                      name: 'Budget Efficiency',
                      value: `${results.efficiencyScore || '0'}%`,
                      unit: 'Score',
                      status: (results.efficiencyScore || 0) > 80 ? 'good' : (results.efficiencyScore || 0) > 60 ? 'neutral' : 'poor'
                    },
                    {
                      name: 'Recommended Budget',
                      value: `$${results.recommendedBudget?.toLocaleString() || '0'}`,
                      unit: 'USD',
                      status: 'good'
                    }
                  ]}
                  recommendations={[
                    "Focus on high-performing marketing channels",
                    "Optimize ad spend based on ROI data",
                    "Consider seasonal adjustments to your budget"
                  ]}
                  onCopy={(text) => {
                    navigator.clipboard.writeText(text)
                  }}
                  onDownload={() => {
                    const exportData = getExportData()
                    const content = JSON.stringify(exportData, null, 2)
                    const blob = new Blob([content], { type: 'application/json' })
                    const url = URL.createObjectURL(blob)
                    const a = document.createElement('a')
                    a.href = url
                    a.download = 'ad-budget-analysis.json'
                    document.body.appendChild(a)
                    a.click()
                    document.body.removeChild(a)
                    URL.revokeObjectURL(url)
                  }}
                  onReset={() => {
                    setResults(null)
                    setFormData({
                      totalRevenue: '',
                      marketingBudgetPercent: '',
                      targetROAS: '',
                      averageOrderValue: '',
                      conversionRate: '',
                      campaignDuration: '30',
                      industry: '',
                      businessGoal: ''
                    })
                  }}
                  score={results.efficiencyScore || 75}
                  scoreColor={(results.efficiencyScore || 0) > 80 ? "text-green-400" : (results.efficiencyScore || 0) > 60 ? "text-yellow-400" : "text-red-400"}
                  generatedContent={JSON.stringify(results, null, 2)}
                />
              )}
            </div>
          </motion.div>

          {/* Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-1"
          >
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-orange-400" />
                  How to Use
                </h3>
                <ul className="space-y-3 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                    Enter your annual revenue and marketing budget percentage
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                    Set realistic ROAS targets and conversion rates
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                    Choose campaign duration for specific calculations
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                    Review channel allocation recommendations
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-orange-400" />
                  Key Metrics
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-400">Ad Budget</span>
                      <span className="text-xs text-orange-400">70% of marketing budget</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-400">Target ROAS</span>
                      <span className="text-xs text-orange-400">Industry average: 3-4x</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div className="bg-amber-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-400">Channel Diversification</span>
                      <span className="text-xs text-orange-400">5 channels recommended</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-2xl p-6 border border-orange-500/30">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-orange-400" />
                  Pro Tips
                </h3>
                <div className="space-y-3 text-sm text-orange-100">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-orange-300" />
                    <span>Allocate 10-20% of revenue to marketing for optimal growth</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-orange-300" />
                    <span>Target ROAS of 3-4x for healthy campaign performance</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-orange-300" />
                    <span>Diversify across multiple channels to reduce risk</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-orange-300" />
                    <span>Monitor and adjust budgets based on performance data</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}