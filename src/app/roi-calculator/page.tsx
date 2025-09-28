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
  Award
} from 'lucide-react'

export default function ROICalculator() {
  const [activeTab, setActiveTab] = useState<'roi' | 'roas'>('roi')
  const [formData, setFormData] = useState({
    monthlyAdSpend: '',
    averageOrderValue: '',
    monthlyOrders: '',
    conversionRate: '',
    customerLifetimeValue: '',
    profitMargin: '',
    industry: '',
    marketingChannel: ''
  })

  const [roasData, setRoasData] = useState({
    adSpend: '',
    revenue: '',
    campaignName: '',
    platform: '',
    duration: '30'
  })

  const [results, setResults] = useState<any>(null)
  const [roasResults, setRoasResults] = useState<any>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const industries = [
    'E-commerce', 'SaaS', 'Local Business', 'Healthcare', 'Education', 
    'Real Estate', 'Finance', 'Travel & Tourism', 'Food & Beverage', 'Other'
  ]

  const channels = [
    'Facebook Ads', 'Google Ads', 'Instagram', 'LinkedIn', 'TikTok',
    'Email Marketing', 'SEO', 'Content Marketing', 'Influencer Marketing', 'Other'
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleRoasChange = (field: string, value: string) => {
    setRoasData(prev => ({ ...prev, [field]: value }))
  }

  const calculateROAS = () => {
    const adSpend = parseFloat(roasData.adSpend) || 0
    const revenue = parseFloat(roasData.revenue) || 0
    const duration = parseInt(roasData.duration) || 30

    const roas = adSpend > 0 ? revenue / adSpend : 0
    const profit = revenue - adSpend
    const profitMargin = revenue > 0 ? (profit / revenue) * 100 : 0
    const dailyAdSpend = adSpend / duration
    const dailyRevenue = revenue / duration
    const dailyROAS = dailyAdSpend > 0 ? dailyRevenue / dailyAdSpend : 0

    // Calculate efficiency scores
    const roasScore = roas >= 4 ? 100 : roas >= 3 ? 80 : roas >= 2 ? 60 : roas >= 1 ? 40 : 20
    const profitScore = profitMargin >= 50 ? 100 : profitMargin >= 30 ? 80 : profitMargin >= 15 ? 60 : profitMargin >= 0 ? 40 : 20
    const efficiencyScore = (roasScore + profitScore) / 2

    // Generate recommendations
    const recommendations = []
    const strengths = []

    if (roas >= 4) {
      strengths.push('Excellent ROAS performance')
    } else if (roas >= 3) {
      strengths.push('Good ROAS performance')
    } else if (roas >= 2) {
      recommendations.push('ROAS is acceptable but could be improved')
    } else if (roas >= 1) {
      recommendations.push('ROAS is below average - optimize campaign targeting')
    } else {
      recommendations.push('Campaign is not profitable - consider pausing or major changes')
    }

    if (profitMargin >= 50) {
      strengths.push('Exceptional profit margins')
    } else if (profitMargin >= 30) {
      strengths.push('Healthy profit margins')
    } else if (profitMargin >= 15) {
      recommendations.push('Profit margins could be improved')
    } else if (profitMargin >= 0) {
      recommendations.push('Low profit margins - review pricing or costs')
    } else {
      recommendations.push('Campaign is losing money - immediate action required')
    }

    if (dailyROAS >= 3) {
      strengths.push('Consistent daily performance')
    } else if (dailyROAS < roas * 0.8) {
      recommendations.push('Daily performance is inconsistent - analyze trends')
    }

    return {
      roas: roas.toFixed(2),
      profit: profit.toFixed(2),
      profitMargin: profitMargin.toFixed(1),
      dailyAdSpend: dailyAdSpend.toFixed(2),
      dailyRevenue: dailyRevenue.toFixed(2),
      dailyROAS: dailyROAS.toFixed(2),
      efficiencyScore: efficiencyScore.toFixed(0),
      recommendations,
      strengths,
      metrics: {
        roasScore,
        profitScore
      }
    }
  }

  const calculateROI = () => {
    const monthlyAdSpend = parseFloat(formData.monthlyAdSpend) || 0
    const averageOrderValue = parseFloat(formData.averageOrderValue) || 0
    const monthlyOrders = parseFloat(formData.monthlyOrders) || 0
    const conversionRate = parseFloat(formData.conversionRate) || 0
    const customerLifetimeValue = parseFloat(formData.customerLifetimeValue) || 0
    const profitMargin = parseFloat(formData.profitMargin) || 0

    // Calculate metrics
    const monthlyRevenue = monthlyOrders * averageOrderValue
    const monthlyProfit = monthlyRevenue * (profitMargin / 100)
    const netProfit = monthlyProfit - monthlyAdSpend
    const roi = monthlyAdSpend > 0 ? ((netProfit / monthlyAdSpend) * 100) : 0
    const roas = monthlyAdSpend > 0 ? monthlyRevenue / monthlyAdSpend : 0
    const cac = monthlyOrders > 0 ? monthlyAdSpend / monthlyOrders : 0
    const breakEvenOrders = monthlyAdSpend > 0 && averageOrderValue > 0 ? monthlyAdSpend / averageOrderValue : 0

    // Calculate efficiency scores
    const roiScore = roi >= 300 ? 100 : roi >= 200 ? 80 : roi >= 100 ? 60 : roi >= 50 ? 40 : 20
    const roasScore = roas >= 4 ? 100 : roas >= 3 ? 80 : roas >= 2 ? 60 : roas >= 1 ? 40 : 20
    const cacScore = cac <= averageOrderValue * 0.3 ? 100 : cac <= averageOrderValue * 0.5 ? 80 : cac <= averageOrderValue * 0.7 ? 60 : cac <= averageOrderValue ? 40 : 20

    const overallScore = (roiScore + roasScore + cacScore) / 3

    // Generate recommendations
    const recommendations = []
    const strengths = []

    if (roi >= 200) {
      strengths.push('Excellent ROI performance')
    } else if (roi >= 100) {
      strengths.push('Good ROI performance')
    } else if (roi > 0) {
      recommendations.push('Focus on improving conversion rates to increase ROI')
    } else {
      recommendations.push('Campaign is not profitable - consider pausing or optimizing')
    }

    if (roas >= 3) {
      strengths.push('Strong return on ad spend')
    } else if (roas >= 2) {
      recommendations.push('Optimize ad creative and targeting to improve ROAS')
    } else {
      recommendations.push('Significant improvement needed in ad performance')
    }

    if (cac <= averageOrderValue * 0.3) {
      strengths.push('Efficient customer acquisition cost')
    } else if (cac <= averageOrderValue * 0.5) {
      recommendations.push('Work on reducing customer acquisition costs')
    } else {
      recommendations.push('Customer acquisition cost is too high - review targeting and bidding')
    }

    if (conversionRate >= 5) {
      strengths.push('Strong conversion rate')
    } else if (conversionRate >= 2) {
      recommendations.push('Optimize landing pages and ad copy to improve conversions')
    } else {
      recommendations.push('Conversion rate needs significant improvement')
    }

    return {
      roi: roi.toFixed(1),
      roas: roas.toFixed(2),
      cac: cac.toFixed(2),
      breakEvenOrders: breakEvenOrders.toFixed(0),
      monthlyRevenue: monthlyRevenue.toFixed(0),
      monthlyProfit: monthlyProfit.toFixed(0),
      netProfit: netProfit.toFixed(0),
      overallScore: overallScore.toFixed(0),
      recommendations,
      strengths,
      metrics: {
        roiScore,
        roasScore,
        cacScore
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsCalculating(true)

    // Simulate calculation
    setTimeout(() => {
      if (activeTab === 'roi') {
        const calculatedResults = calculateROI()
        setResults(calculatedResults)
        setRoasResults(null)
      } else {
        const calculatedResults = calculateROAS()
        setRoasResults(calculatedResults)
        setResults(null)
      }
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden relative">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <Navigation currentPath="/roi-calculator" />

        <div className="relative z-40 container mx-auto px-6 pt-24 pb-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 px-6 py-3 rounded-full mb-6 backdrop-blur-sm border border-purple-500/30">
              <Calculator className="w-5 h-5" />
              <span className="text-sm font-medium">Marketing Calculators</span>
            </div>
            
            {/* Tab Navigation */}
            <div className="flex justify-center mb-8">
              <div className="bg-white/5 backdrop-blur-md rounded-full p-1 border border-white/10">
                <button
                  onClick={() => setActiveTab('roi')}
                  className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeTab === 'roi'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  ROI Calculator
                </button>
                <button
                  onClick={() => setActiveTab('roas')}
                  className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeTab === 'roas'
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  ROAS Calculator
                </button>
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              {activeTab === 'roi' ? 'Marketing ROI Calculator' : 'ROAS Calculator'}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {activeTab === 'roi' 
                ? 'Calculate your return on investment, analyze campaign performance, and discover opportunities to maximize your marketing effectiveness.'
                : 'Calculate your return on ad spend, measure campaign profitability, and optimize your advertising investment for maximum returns.'
              }
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
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {activeTab === 'roi' ? 'Campaign Data' : 'Ad Performance Data'}
                  </h2>
                  <p className="text-gray-300">
                    {activeTab === 'roi' 
                      ? 'Enter your campaign metrics to calculate ROI and performance'
                      : 'Enter your advertising data to calculate ROAS and profitability'
                    }
                  </p>
                </div>

                {activeTab === 'roi' ? (
                  !results ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Metrics */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <FlexibleInput
                        label="Monthly Ad Spend"
                        type="currency"
                        value={formData.monthlyAdSpend}
                        onChange={(value) => handleInputChange('monthlyAdSpend', value)}
                        options={['5000', '10000', '15000', '20000', '25000']}
                        placeholder="5000"
                        required={true}
                        language="en"
                      />
                      
                      <FlexibleInput
                        label="Average Order Value"
                        type="currency"
                        value={formData.averageOrderValue}
                        onChange={(value) => handleInputChange('averageOrderValue', value)}
                        options={['100', '250', '500', '750', '1000']}
                        placeholder="250"
                        required={true}
                        language="en"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FlexibleInput
                        label="Monthly Orders"
                        type="number"
                        value={formData.monthlyOrders}
                        onChange={(value) => handleInputChange('monthlyOrders', value)}
                        options={['50', '100', '200', '500', '1000']}
                        placeholder="100"
                        required={true}
                        language="en"
                      />
                      
                      <FlexibleInput
                        label="Conversion Rate"
                        type="percentage"
                        value={formData.conversionRate}
                        onChange={(value) => handleInputChange('conversionRate', value)}
                        options={['1', '2.5', '5', '7.5', '10']}
                        placeholder="2.5"
                        required={true}
                        language="en"
                      />
                    </div>

                    {/* Advanced Metrics */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <FlexibleInput
                        label="Customer Lifetime Value"
                        type="currency"
                        value={formData.customerLifetimeValue}
                        onChange={(value) => handleInputChange('customerLifetimeValue', value)}
                        options={['500', '750', '1000', '1500', '2000']}
                        placeholder="750"
                        required={false}
                        language="en"
                      />
                      
                      <FlexibleInput
                        label="Profit Margin"
                        type="percentage"
                        value={formData.profitMargin}
                        onChange={(value) => handleInputChange('profitMargin', value)}
                        options={['15', '25', '35', '50', '65']}
                        placeholder="30"
                        required={false}
                        language="en"
                      />
                    </div>

                    {/* Context Information */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                          <Activity className="w-4 h-4 text-purple-400" />
                          Industry
                        </label>
                        <select
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white appearance-none cursor-pointer"
                          value={formData.industry}
                          onChange={(e) => handleInputChange('industry', e.target.value)}
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23a78bfa' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
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
                          <Zap className="w-4 h-4 text-purple-400" />
                          Marketing Channel
                        </label>
                        <select
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white appearance-none cursor-pointer"
                          value={formData.marketingChannel}
                          onChange={(e) => handleInputChange('marketingChannel', e.target.value)}
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23a78bfa' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                            backgroundPosition: `right 0.5rem center`,
                            backgroundRepeat: `no-repeat`,
                            backgroundSize: `1.5em 1.5em`,
                            paddingRight: `2.5rem`
                          }}
                        >
                          <option value="" className="bg-gray-900 text-white">Select channel</option>
                          {channels.map(channel => (
                            <option key={channel} value={channel} className="bg-gray-900 text-white">{channel}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isCalculating}
                      className="w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isCalculating ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Calculating...
                        </>
                      ) : (
                        <>
                          <Calculator className="w-5 h-5" />
                          Calculate ROI
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  /* ROI Results Section */
                  <EnhancedResultsDisplay
                    title="ROI Analysis Complete"
                    subtitle="Your campaign performance breakdown"
                    results={results}
                    language="en"
                    toolType="roi-calculator"
                    onNewCalculation={() => {
                      setResults(null)
                      setFormData({
                        monthlyAdSpend: '',
                        averageOrderValue: '',
                        monthlyOrders: '',
                        conversionRate: '',
                        customerLifetimeValue: '',
                        profitMargin: '',
                        industry: '',
                        marketingChannel: ''
                      })
                    }}
                  />
                )
              ) : (
                <>
                {/* ROAS Form */}
                {!roasResults ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic ROAS Metrics */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <FlexibleInput
                        label="Ad Spend"
                        type="currency"
                        value={roasData.adSpend}
                        onChange={(value) => handleRoasChange('adSpend', value)}
                        options={['1000', '2500', '5000', '10000', '15000']}
                        placeholder="5000"
                        required={true}
                        language="en"
                      />
                      
                      <FlexibleInput
                        label="Revenue Generated"
                        type="currency"
                        value={roasData.revenue}
                        onChange={(value) => handleRoasChange('revenue', value)}
                        options={['5000', '10000', '15000', '25000', '50000']}
                        placeholder="15000"
                        required={true}
                        language="en"
                      />
                    </div>

                    {/* Campaign Details */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                          <Target className="w-4 h-4 text-blue-400" />
                          Campaign Name
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-white placeholder-gray-400"
                          value={roasData.campaignName}
                          onChange={(e) => handleRoasChange('campaignName', e.target.value)}
                          placeholder="Summer Sale Campaign"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                          <Zap className="w-4 h-4 text-blue-400" />
                          Platform
                        </label>
                        <select
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-white appearance-none cursor-pointer"
                          value={roasData.platform}
                          onChange={(e) => handleRoasChange('platform', e.target.value)}
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2360a5fa' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                            backgroundPosition: `right 0.5rem center`,
                            backgroundRepeat: `no-repeat`,
                            backgroundSize: `1.5em 1.5em`,
                            paddingRight: `2.5rem`
                          }}
                        >
                          <option value="" className="bg-gray-900 text-white">Select platform</option>
                          <option value="Facebook Ads" className="bg-gray-900 text-white">Facebook Ads</option>
                          <option value="Google Ads" className="bg-gray-900 text-white">Google Ads</option>
                          <option value="Instagram" className="bg-gray-900 text-white">Instagram</option>
                          <option value="LinkedIn" className="bg-gray-900 text-white">LinkedIn</option>
                          <option value="TikTok" className="bg-gray-900 text-white">TikTok</option>
                          <option value="Other" className="bg-gray-900 text-white">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                          <Activity className="w-4 h-4 text-blue-400" />
                          Campaign Duration (days)
                        </label>
                        <select
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-white appearance-none cursor-pointer"
                          value={roasData.duration}
                          onChange={(e) => handleRoasChange('duration', e.target.value)}
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2360a5fa' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
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

                    <button
                      type="submit"
                      disabled={isCalculating}
                      className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isCalculating ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Calculating...
                        </>
                      ) : (
                        <>
                          <Calculator className="w-5 h-5" />
                          Calculate ROAS
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  /* ROAS Results Section */
                  <EnhancedResultsDisplay
                    title="ROAS Analysis Complete"
                    subtitle="Your ad performance breakdown"
                    results={roasResults}
                    language="en"
                    toolType="roas-calculator"
                    onNewCalculation={() => {
                      setRoasResults(null)
                      setRoasData({
                        adSpend: '',
                        revenue: '',
                        campaignName: '',
                        platform: '',
                        duration: '30'
                      })
                    }}
                  />
                )}
                </>
              )}
            </div>
          </motion.div>

          {/* Sidebar Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-6 rounded-3xl border border-purple-500/30 backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-4">Key Metrics Explained</h3>
              <div className="space-y-4">
                <div className="p-3 bg-white/5 rounded-lg">
                  <h4 className="font-semibold text-purple-300 mb-1">ROI (Return on Investment)</h4>
                  <p className="text-xs text-gray-300">Net profit divided by ad spend, shown as percentage</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <h4 className="font-semibold text-blue-300 mb-1">ROAS (Return on Ad Spend)</h4>
                  <p className="text-xs text-gray-300">Revenue divided by ad spend, shown as multiplier</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <h4 className="font-semibold text-green-300 mb-1">CAC (Customer Acquisition Cost)</h4>
                  <p className="text-xs text-gray-300">Ad spend divided by number of customers acquired</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <h4 className="font-semibold text-yellow-300 mb-1">Break-even Point</h4>
                  <p className="text-xs text-gray-300">Number of orders needed to cover ad spend</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-6 rounded-3xl border border-green-500/30 backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-4">Benchmark Averages</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Good ROI</span>
                  <span className="text-sm font-semibold text-green-400">200%+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Good ROAS</span>
                  <span className="text-sm font-semibold text-green-400">3x+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Good CAC</span>
                  <span className="text-sm font-semibold text-green-400">&lt; 30% of AOV</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Good Conversion Rate</span>
                  <span className="text-sm font-semibold text-green-400">2%+</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-6 rounded-3xl border border-blue-500/30 backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-4">Optimization Tips</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2 text-blue-300">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Test different ad creatives and copy</span>
                </li>
                <li className="flex items-start gap-2 text-blue-300">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Optimize landing page experience</span>
                </li>
                <li className="flex items-start gap-2 text-blue-300">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Refine audience targeting</span>
                </li>
                <li className="flex items-start gap-2 text-blue-300">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Monitor and adjust bids regularly</span>
                </li>
                <li className="flex items-start gap-2 text-blue-300">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Use A/B testing for optimization</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}