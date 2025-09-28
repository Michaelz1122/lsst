'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import FlexibleInput from '@/components/ui/FlexibleInput'
import EnhancedResultsDisplay from '@/components/ui/EnhancedResultsDisplay'
import { 
  Calculator, 
  Users, 
  DollarSign, 
  TrendingUp, 
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
  ShoppingCart
} from 'lucide-react'

export default function CACCalculator() {
  const [formData, setFormData] = useState({
    totalAdSpend: '',
    totalSalesTeamCost: '',
    totalMarketingCost: '',
    otherAcquisitionCosts: '',
    newCustomers: '',
    timePeriod: '30',
    industry: '',
    customerSegment: ''
  })

  const [results, setResults] = useState<any>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const industries = [
    'E-commerce', 'SaaS', 'Local Business', 'Healthcare', 'Education', 
    'Real Estate', 'Finance', 'Travel & Tourism', 'Food & Beverage', 'Other'
  ]

  const customerSegments = [
    'B2B', 'B2C', 'Enterprise', 'SMB', 'Startup', 'Individual', 'Other'
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const calculateCAC = () => {
    const totalAdSpend = parseFloat(formData.totalAdSpend) || 0
    const totalSalesTeamCost = parseFloat(formData.totalSalesTeamCost) || 0
    const totalMarketingCost = parseFloat(formData.totalMarketingCost) || 0
    const otherAcquisitionCosts = parseFloat(formData.otherAcquisitionCosts) || 0
    const newCustomers = parseFloat(formData.newCustomers) || 0
    const timePeriod = parseInt(formData.timePeriod) || 30

    // Calculate CAC
    const totalAcquisitionCost = totalAdSpend + totalSalesTeamCost + totalMarketingCost + otherAcquisitionCosts
    const cac = newCustomers > 0 ? totalAcquisitionCost / newCustomers : 0
    const monthlyCAC = cac * (30 / timePeriod)

    // Calculate efficiency metrics
    const costBreakdown = {
      adSpend: totalAdSpend / totalAcquisitionCost * 100,
      salesTeam: totalSalesTeamCost / totalAcquisitionCost * 100,
      marketing: totalMarketingCost / totalAcquisitionCost * 100,
      other: otherAcquisitionCosts / totalAcquisitionCost * 100
    }

    // Calculate scores
    const cacScore = cac <= 100 ? 100 : cac <= 250 ? 80 : cac <= 500 ? 60 : cac <= 1000 ? 40 : 20
    const efficiencyScore = Object.values(costBreakdown).some(cost => cost > 70) ? 60 : 80
    const overallScore = (cacScore + efficiencyScore) / 2

    // Generate recommendations
    const recommendations = []
    const strengths = []

    if (cac <= 100) {
      strengths.push('Excellent customer acquisition cost')
    } else if (cac <= 250) {
      strengths.push('Good customer acquisition cost')
    } else if (cac <= 500) {
      recommendations.push('CAC is above average - consider optimization')
    } else {
      recommendations.push('CAC is too high - immediate optimization needed')
    }

    if (costBreakdown.adSpend > 60) {
      recommendations.push('Ad spend is too high - diversify acquisition channels')
    } else if (costBreakdown.adSpend <= 40) {
      strengths.push('Well-balanced ad spend allocation')
    }

    if (costBreakdown.salesTeam > 50) {
      recommendations.push('Sales team costs are high - consider automation')
    }

    if (newCustomers >= 50) {
      strengths.push('Good customer acquisition volume')
    } else if (newCustomers < 10) {
      recommendations.push('Low customer volume - scale acquisition efforts')
    }

    return {
      cac: cac.toFixed(2),
      monthlyCAC: monthlyCAC.toFixed(2),
      totalAcquisitionCost: totalAcquisitionCost.toFixed(2),
      costBreakdown: {
        adSpend: costBreakdown.adSpend.toFixed(1),
        salesTeam: costBreakdown.salesTeam.toFixed(1),
        marketing: costBreakdown.marketing.toFixed(1),
        other: costBreakdown.other.toFixed(1)
      },
      overallScore: overallScore.toFixed(0),
      recommendations,
      strengths,
      metrics: {
        cacScore,
        efficiencyScore
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsCalculating(true)

    // Simulate calculation
    setTimeout(() => {
      const calculatedResults = calculateCAC()
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden relative">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-900/20 via-transparent to-transparent"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <Navigation currentPath="/cac-calculator" />

        <div className="relative z-40 container mx-auto px-6 pt-24 pb-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 px-6 py-3 rounded-full mb-6 backdrop-blur-sm border border-green-500/30">
              <Calculator className="w-5 h-5" />
              <span className="text-sm font-medium">CAC Calculator Tool</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Customer Acquisition Cost Calculator
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Calculate your customer acquisition cost, analyze cost efficiency, and optimize your marketing and sales spend for maximum ROI.
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
                  <h2 className="text-2xl font-bold text-white mb-2">Acquisition Cost Data</h2>
                  <p className="text-gray-300">Enter your costs and customer data to calculate CAC</p>
                </div>

                {!results ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Cost Inputs */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <FlexibleInput
                        label="Total Ad Spend"
                        type="currency"
                        value={formData.totalAdSpend}
                        onChange={(value) => handleInputChange('totalAdSpend', value)}
                        options={['5000', '10000', '15000', '20000', '25000']}
                        placeholder="10000"
                        required={true}
                        language="en"
                      />
                      
                      <FlexibleInput
                        label="Sales Team Cost"
                        type="currency"
                        value={formData.totalSalesTeamCost}
                        onChange={(value) => handleInputChange('totalSalesTeamCost', value)}
                        options={['3000', '5000', '7500', '10000', '15000']}
                        placeholder="5000"
                        required={true}
                        language="en"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FlexibleInput
                        label="Marketing Cost"
                        type="currency"
                        value={formData.totalMarketingCost}
                        onChange={(value) => handleInputChange('totalMarketingCost', value)}
                        options={['2000', '3000', '5000', '7500', '10000']}
                        placeholder="3000"
                        required={true}
                        language="en"
                      />
                      
                      <FlexibleInput
                        label="Other Acquisition Costs"
                        type="currency"
                        value={formData.otherAcquisitionCosts}
                        onChange={(value) => handleInputChange('otherAcquisitionCosts', value)}
                        options={['1000', '2000', '3000', '5000', '7500']}
                        placeholder="2000"
                        required={false}
                        language="en"
                      />
                    </div>

                    {/* Customer Data */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <FlexibleInput
                        label="New Customers Acquired"
                        type="number"
                        value={formData.newCustomers}
                        onChange={(value) => handleInputChange('newCustomers', value)}
                        options={['10', '25', '50', '100', '200']}
                        placeholder="50"
                        required={true}
                        language="en"
                      />
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                          <Clock className="w-4 h-4 text-green-400" />
                          Time Period (days)
                        </label>
                        <select
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 text-white appearance-none cursor-pointer"
                          value={formData.timePeriod}
                          onChange={(e) => handleInputChange('timePeriod', e.target.value)}
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2334d399' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
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
                          <Target className="w-4 h-4 text-green-400" />
                          Industry
                        </label>
                        <select
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 text-white appearance-none cursor-pointer"
                          value={formData.industry}
                          onChange={(e) => handleInputChange('industry', e.target.value)}
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2334d399' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
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
                          <Zap className="w-4 h-4 text-green-400" />
                          Customer Segment
                        </label>
                        <select
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 text-white appearance-none cursor-pointer"
                          value={formData.customerSegment}
                          onChange={(e) => handleInputChange('customerSegment', e.target.value)}
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2334d399' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                            backgroundPosition: `right 0.5rem center`,
                            backgroundRepeat: `no-repeat`,
                            backgroundSize: `1.5em 1.5em`,
                            paddingRight: `2.5rem`
                          }}
                        >
                          <option value="" className="bg-gray-900 text-white">Select segment</option>
                          {customerSegments.map(segment => (
                            <option key={segment} value={segment} className="bg-gray-900 text-white">{segment}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isCalculating}
                      className="w-full px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isCalculating ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Calculating...
                        </>
                      ) : (
                        <>
                          <Calculator className="w-5 h-5" />
                          Calculate CAC
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  /* Results Section */
                  <EnhancedResultsDisplay
                    title="CAC Analysis Complete"
                    subtitle="Your customer acquisition cost breakdown"
                    results={results}
                    language="en"
                    toolType="cac-calculator"
                    onNewCalculation={() => {
                      setResults(null)
                      setFormData({
                        totalAdSpend: '',
                        totalSalesTeamCost: '',
                        totalMarketingCost: '',
                        otherAcquisitionCosts: '',
                        newCustomers: '',
                        timePeriod: '30',
                        industry: '',
                        customerSegment: ''
                      })
                    }}
                  />
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
              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-6 rounded-3xl border border-green-500/30 backdrop-blur-md">
                <h3 className="text-xl font-bold text-white mb-4">CAC Explained</h3>
                <div className="space-y-4">
                  <div className="p-3 bg-white/5 rounded-lg">
                    <h4 className="font-semibold text-green-300 mb-1">What is CAC?</h4>
                    <p className="text-xs text-gray-300">Total cost to acquire a new customer, including all marketing and sales expenses</p>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg">
                    <h4 className="font-semibold text-emerald-300 mb-1">Why it Matters</h4>
                    <p className="text-xs text-gray-300">Lower CAC means more efficient customer acquisition and higher profitability</p>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg">
                    <h4 className="font-semibold text-teal-300 mb-1">Industry Benchmarks</h4>
                    <p className="text-xs text-gray-300">Varies by industry: SaaS (~$395), E-commerce (~$45), Finance (~$750)</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-6 rounded-3xl border border-blue-500/30 backdrop-blur-md">
                <h3 className="text-xl font-bold text-white mb-4">Cost Breakdown</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-300">Ad Spend</span>
                    <span className="text-sm font-semibold text-blue-400">40-60%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-300">Sales Team</span>
                    <span className="text-sm font-semibold text-blue-400">20-30%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-300">Marketing</span>
                    <span className="text-sm font-semibold text-blue-400">15-25%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-300">Other Costs</span>
                    <span className="text-sm font-semibold text-blue-400">5-15%</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-6 rounded-3xl border border-purple-500/30 backdrop-blur-md">
                <h3 className="text-xl font-bold text-white mb-4">Optimization Tips</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2 text-purple-300">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Focus on high-converting channels</span>
                  </li>
                  <li className="flex items-start gap-2 text-purple-300">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Improve lead qualification process</span>
                  </li>
                  <li className="flex items-start gap-2 text-purple-300">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Optimize sales team efficiency</span>
                  </li>
                  <li className="flex items-start gap-2 text-purple-300">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Use customer retention strategies</span>
                  </li>
                  <li className="flex items-start gap-2 text-purple-300">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Track and analyze CAC trends</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    )
}