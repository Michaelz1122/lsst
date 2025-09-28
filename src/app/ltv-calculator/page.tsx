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
  Repeat,
  Star
} from 'lucide-react'

export default function LTVCalculator() {
  const [formData, setFormData] = useState({
    averageOrderValue: '',
    purchaseFrequency: '',
    customerLifespan: '',
    retentionRate: '',
    profitMargin: '',
    discountRate: '',
    industry: '',
    businessModel: ''
  })

  const [results, setResults] = useState<any>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const industries = [
    'E-commerce', 'SaaS', 'Local Business', 'Healthcare', 'Education', 
    'Real Estate', 'Finance', 'Travel & Tourism', 'Food & Beverage', 'Other'
  ]

  const businessModels = [
    'Subscription', 'Transaction-based', 'Hybrid', 'Freemium', 'Marketplace', 'Other'
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const calculateLTV = () => {
    const averageOrderValue = parseFloat(formData.averageOrderValue) || 0
    const purchaseFrequency = parseFloat(formData.purchaseFrequency) || 0
    const customerLifespan = parseFloat(formData.customerLifespan) || 0
    const retentionRate = parseFloat(formData.retentionRate) || 0
    const profitMargin = parseFloat(formData.profitMargin) || 0
    const discountRate = parseFloat(formData.discountRate) || 10

    // Calculate LTV using different methods
    const simpleLTV = averageOrderValue * purchaseFrequency * customerLifespan
    const profitLTV = simpleLTV * (profitMargin / 100)
    
    // Calculate retention-based LTV
    const monthlyRevenue = averageOrderValue * purchaseFrequency
    const monthlyRetentionRate = retentionRate / 100
    const churnRate = 1 - monthlyRetentionRate
    const retentionLTV = monthlyRetentionRate > 0 && churnRate > 0 ? 
      (monthlyRevenue * monthlyRetentionRate) / churnRate : simpleLTV

    // Calculate discounted LTV
    const monthlyDiscountRate = discountRate / 100 / 12
    const discountedLTV = monthlyDiscountRate > 0 && monthlyRetentionRate > monthlyDiscountRate ?
      (monthlyRevenue * monthlyRetentionRate) / (monthlyDiscountRate - (monthlyRetentionRate - 1)) : simpleLTV

    // Calculate customer equity metrics
    const clvRatio = profitLTV > 0 ? profitLTV / (averageOrderValue * 0.3) : 0 // Assuming CAC is 30% of AOV
    const paybackPeriod = averageOrderValue > 0 && monthlyRevenue > 0 ? 
      (averageOrderValue * 0.3) / monthlyRevenue : 0 // Assuming CAC is 30% of AOV

    // Calculate scores
    const ltvScore = simpleLTV >= 10000 ? 100 : simpleLTV >= 5000 ? 80 : simpleLTV >= 2000 ? 60 : simpleLTV >= 1000 ? 40 : 20
    const retentionScore = retentionRate >= 80 ? 100 : retentionRate >= 60 ? 80 : retentionRate >= 40 ? 60 : retentionRate >= 20 ? 40 : 20
    const profitScore = profitMargin >= 50 ? 100 : profitMargin >= 30 ? 80 : profitMargin >= 15 ? 60 : profitMargin >= 5 ? 40 : 20
    const overallScore = (ltvScore + retentionScore + profitScore) / 3

    // Generate recommendations
    const recommendations = []
    const strengths = []

    if (simpleLTV >= 10000) {
      strengths.push('Excellent customer lifetime value')
    } else if (simpleLTV >= 5000) {
      strengths.push('Good customer lifetime value')
    } else if (simpleLTV >= 2000) {
      recommendations.push('LTV is acceptable but could be improved')
    } else {
      recommendations.push('LTV is below average - focus on customer retention')
    }

    if (retentionRate >= 80) {
      strengths.push('Exceptional customer retention rate')
    } else if (retentionRate >= 60) {
      strengths.push('Good customer retention rate')
    } else if (retentionRate < 40) {
      recommendations.push('Low retention rate - implement retention strategies')
    }

    if (clvRatio >= 5) {
      strengths.push('Excellent customer value ratio')
    } else if (clvRatio >= 3) {
      strengths.push('Good customer value ratio')
    } else if (clvRatio < 2) {
      recommendations.push('Customer value ratio is low - improve monetization')
    }

    if (paybackPeriod <= 3) {
      strengths.push('Fast customer payback period')
    } else if (paybackPeriod > 6) {
      recommendations.push('Long payback period - optimize acquisition costs')
    }

    return {
      simpleLTV: simpleLTV.toFixed(2),
      profitLTV: profitLTV.toFixed(2),
      retentionLTV: retentionLTV.toFixed(2),
      discountedLTV: discountedLTV.toFixed(2),
      clvRatio: clvRatio.toFixed(2),
      paybackPeriod: paybackPeriod.toFixed(1),
      monthlyRevenue: monthlyRevenue.toFixed(2),
      overallScore: overallScore.toFixed(0),
      recommendations,
      strengths,
      metrics: {
        ltvScore,
        retentionScore,
        profitScore
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsCalculating(true)

    // Simulate calculation
    setTimeout(() => {
      const calculatedResults = calculateLTV()
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
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <Navigation currentPath="/ltv-calculator" />

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
              <span className="text-sm font-medium">LTV Calculator Tool</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
              Lifetime Value Calculator
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Calculate customer lifetime value, analyze retention patterns, and optimize your business for long-term profitability and growth.
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
                  <h2 className="text-2xl font-bold text-white mb-2">Customer Value Data</h2>
                  <p className="text-gray-300">Enter your customer metrics to calculate lifetime value</p>
                </div>

                {!results ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Core LTV Metrics */}
                    <div className="grid md:grid-cols-2 gap-6">
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
                      
                      <FlexibleInput
                        label="Purchase Frequency (per year)"
                        type="number"
                        value={formData.purchaseFrequency}
                        onChange={(value) => handleInputChange('purchaseFrequency', value)}
                        options={['2', '4', '6', '12', '24']}
                        placeholder="4"
                        required={true}
                        language="en"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FlexibleInput
                        label="Customer Lifespan (years)"
                        type="number"
                        value={formData.customerLifespan}
                        onChange={(value) => handleInputChange('customerLifespan', value)}
                        options={['1', '2', '3', '5', '10']}
                        placeholder="3"
                        required={true}
                        language="en"
                      />
                      
                      <FlexibleInput
                        label="Retention Rate"
                        type="percentage"
                        value={formData.retentionRate}
                        onChange={(value) => handleInputChange('retentionRate', value)}
                        options={['50', '60', '70', '80', '90']}
                        placeholder="70"
                        required={true}
                        language="en"
                      />
                    </div>

                    {/* Financial Metrics */}
                    <div className="grid md:grid-cols-2 gap-6">
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
                      
                      <FlexibleInput
                        label="Discount Rate"
                        type="percentage"
                        value={formData.discountRate}
                        onChange={(value) => handleInputChange('discountRate', value)}
                        options={['5', '10', '15', '20', '25']}
                        placeholder="10"
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
                          Business Model
                        </label>
                        <select
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white appearance-none cursor-pointer"
                          value={formData.businessModel}
                          onChange={(e) => handleInputChange('businessModel', e.target.value)}
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23a78bfa' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                            backgroundPosition: `right 0.5rem center`,
                            backgroundRepeat: `no-repeat`,
                            backgroundSize: `1.5em 1.5em`,
                            paddingRight: `2.5rem`
                          }}
                        >
                          <option value="" className="bg-gray-900 text-white">Select model</option>
                          {businessModels.map(model => (
                            <option key={model} value={model} className="bg-gray-900 text-white">{model}</option>
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
                          Calculate LTV
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  /* Results Section */
                  <EnhancedResultsDisplay
                    title="LTV Analysis Complete"
                    subtitle="Your customer lifetime value breakdown"
                    results={results}
                    language="en"
                    toolType="ltv-calculator"
                    onNewCalculation={() => {
                      setResults(null)
                      setFormData({
                        averageOrderValue: '',
                        purchaseFrequency: '',
                        customerLifespan: '',
                        retentionRate: '',
                        profitMargin: '',
                        discountRate: '',
                        industry: '',
                        businessModel: ''
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
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-6 rounded-3xl border border-purple-500/30 backdrop-blur-md">
                <h3 className="text-xl font-bold text-white mb-4">LTV Explained</h3>
                <div className="space-y-4">
                  <div className="p-3 bg-white/5 rounded-lg">
                    <h4 className="font-semibold text-purple-300 mb-1">What is LTV?</h4>
                    <p className="text-xs text-gray-300">Total revenue a business can expect from a single customer account</p>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg">
                    <h4 className="font-semibold text-pink-300 mb-1">Why it Matters</h4>
                    <p className="text-xs text-gray-300">Higher LTV means more valuable customers and better business sustainability</p>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg">
                    <h4 className="font-semibold text-indigo-300 mb-1">Industry Benchmarks</h4>
                    <p className="text-xs text-gray-300">SaaS: $5,000-$20,000, E-commerce: $500-$5,000, Finance: $10,000-$50,000</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-6 rounded-3xl border border-blue-500/30 backdrop-blur-md">
                <h3 className="text-xl font-bold text-white mb-4">LTV Calculation Methods</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-300">Simple LTV</span>
                    <span className="text-sm font-semibold text-blue-400">AOV × Frequency × Lifespan</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-300">Profit LTV</span>
                    <span className="text-sm font-semibold text-blue-400">Simple LTV × Profit Margin</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-300">Retention LTV</span>
                    <span className="text-sm font-semibold text-blue-400">Revenue × Retention / Churn</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-300">Discounted LTV</span>
                    <span className="text-sm font-semibold text-blue-400">Present Value of Future Cash</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-6 rounded-3xl border border-green-500/30 backdrop-blur-md">
                <h3 className="text-xl font-bold text-white mb-4">Optimization Tips</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2 text-green-300">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Improve customer retention programs</span>
                  </li>
                  <li className="flex items-start gap-2 text-green-300">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Increase average order value</span>
                  </li>
                  <li className="flex items-start gap-2 text-green-300">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Enhance customer experience</span>
                  </li>
                  <li className="flex items-start gap-2 text-green-300">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Implement loyalty programs</span>
                  </li>
                  <li className="flex items-start gap-2 text-green-300">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Focus on high-value segments</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    )
}