'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import FlexibleInput from '@/components/ui/FlexibleInput'
import EnhancedResultsDisplay from '@/components/ui/EnhancedResultsDisplay'
import { 
  Calculator, 
  TrendingUp, 
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
  FlaskConical,
  GitBranch,
  Percent
} from 'lucide-react'

export default function ABTestCalculator() {
  const [formData, setFormData] = useState({
    controlVisitors: '',
    controlConversions: '',
    variantVisitors: '',
    variantConversions: '',
    confidenceLevel: '95',
    testType: 'two_tailed',
    hypothesisType: 'superiority'
  })

  const [results, setResults] = useState<any>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const confidenceLevels = [
    { value: '90', label: '90%' },
    { value: '95', label: '95%' },
    { value: '99', label: '99%' }
  ]

  const testTypes = [
    { value: 'two_tailed', label: 'Two-tailed' },
    { value: 'one_tailed', label: 'One-tailed' }
  ]

  const hypothesisTypes = [
    { value: 'superiority', label: 'Superiority' },
    { value: 'non_inferiority', label: 'Non-inferiority' },
    { value: 'equivalence', label: 'Equivalence' }
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // Z-score calculation for normal distribution
  const getZScore = (confidenceLevel: number) => {
    const zScores: { [key: number]: number } = {
      90: 1.645,
      95: 1.96,
      99: 2.576
    }
    return zScores[confidenceLevel] || 1.96
  }

  // Calculate p-value using normal approximation
  const calculatePValue = (zScore: number, testType: string) => {
    // Simplified p-value calculation (in practice, you'd use a statistical library)
    const absZ = Math.abs(zScore)
    let pValue
    
    if (testType === 'one_tailed') {
      pValue = 1 - (0.5 * (1 + Math.sign(zScore) * (1 - Math.exp(-2 * absZ * absZ / Math.PI))))
    } else {
      pValue = 2 * (1 - (0.5 * (1 + Math.sign(absZ) * (1 - Math.exp(-2 * absZ * absZ / Math.PI)))))
    }
    
    return Math.min(Math.max(pValue, 0.0001), 0.9999)
  }

  const calculateABTest = () => {
    const controlVisitors = parseFloat(formData.controlVisitors) || 0
    const controlConversions = parseFloat(formData.controlConversions) || 0
    const variantVisitors = parseFloat(formData.variantVisitors) || 0
    const variantConversions = parseFloat(formData.variantConversions) || 0
    const confidenceLevel = parseFloat(formData.confidenceLevel) || 95
    const testType = formData.testType
    const hypothesisType = formData.hypothesisType

    // Calculate conversion rates
    const controlRate = controlVisitors > 0 ? controlConversions / controlVisitors : 0
    const variantRate = variantVisitors > 0 ? variantConversions / variantVisitors : 0

    // Calculate pooled proportion
    const totalConversions = controlConversions + variantConversions
    const totalVisitors = controlVisitors + variantVisitors
    const pooledProportion = totalVisitors > 0 ? totalConversions / totalVisitors : 0

    // Calculate standard error
    const standardError = Math.sqrt(
      pooledProportion * (1 - pooledProportion) * (1/controlVisitors + 1/variantVisitors)
    )

    // Calculate z-score
    const zScore = standardError > 0 ? 
      (variantRate - controlRate) / standardError : 0

    // Calculate p-value
    const pValue = calculatePValue(zScore, testType)

    // Calculate confidence interval
    const zCritical = getZScore(confidenceLevel)
    const marginOfError = zCritical * standardError
    const difference = variantRate - controlRate
    const ciLower = difference - marginOfError
    const ciUpper = difference + marginOfError

    // Calculate relative improvement
    const relativeImprovement = controlRate > 0 ? 
      ((variantRate - controlRate) / controlRate) * 100 : 0

    // Calculate statistical power
    const effectSize = Math.abs(variantRate - controlRate)
    const power = calculatePower(effectSize, controlVisitors, variantVisitors, confidenceLevel)

    // Determine significance
    const alpha = 1 - (confidenceLevel / 100)
    const isSignificant = pValue < alpha

    // Calculate sample size requirements
    const requiredSampleSize = calculateSampleSize(controlRate, effectSize, confidenceLevel, testType)

    // Generate insights
    const insights = generateInsights(
      controlRate, variantRate, isSignificant, pValue, relativeImprovement, power
    )

    return {
      controlRate: (controlRate * 100).toFixed(2),
      variantRate: (variantRate * 100).toFixed(2),
      difference: (difference * 100).toFixed(2),
      relativeImprovement: relativeImprovement.toFixed(1),
      zScore: zScore.toFixed(3),
      pValue: pValue.toFixed(4),
      confidenceInterval: {
        lower: (ciLower * 100).toFixed(2),
        upper: (ciUpper * 100).toFixed(2)
      },
      isSignificant,
      power: (power * 100).toFixed(1),
      requiredSampleSize: requiredSampleSize.toFixed(0),
      insights,
      confidenceLevel
    }
  }

  const calculatePower = (effectSize: number, n1: number, n2: number, confidenceLevel: number) => {
    // Simplified power calculation
    const alpha = 1 - (confidenceLevel / 100)
    const zAlpha = getZScore(confidenceLevel)
    const n = (n1 + n2) / 2
    
    if (effectSize === 0 || n === 0) return 0.5
    
    const zBeta = (effectSize * Math.sqrt(n / 2)) - zAlpha
    const power = 0.5 + (0.5 * Math.sign(zBeta) * (1 - Math.exp(-2 * zBeta * zBeta / Math.PI)))
    
    return Math.min(Math.max(power, 0.1), 0.99)
  }

  const calculateSampleSize = (baselineRate: number, effectSize: number, confidenceLevel: number, testType: string) => {
    // Simplified sample size calculation
    const alpha = 1 - (confidenceLevel / 100)
    const zAlpha = getZScore(confidenceLevel)
    const zBeta = 0.84 // 80% power
    
    if (baselineRate === 0 || effectSize === 0) return 1000
    
    const p1 = baselineRate
    const p2 = baselineRate + effectSize
    const pBar = (p1 + p2) / 2
    
    const sampleSizePerGroup = Math.ceil(
      (zAlpha + zBeta) ** 2 * (p1 * (1 - p1) + p2 * (1 - p2)) / (effectSize ** 2)
    )
    
    return sampleSizePerGroup * 2
  }

  const generateInsights = (
    controlRate: number, 
    variantRate: number, 
    isSignificant: boolean, 
    pValue: number, 
    relativeImprovement: number, 
    power: number
  ) => {
    const insights: any[] = []
    
    if (isSignificant) {
      insights.push({
        type: 'success',
        title: 'Statistically Significant',
        message: `The difference is statistically significant (p = ${pValue.toFixed(4)})`
      })
      
      if (relativeImprovement > 0) {
        insights.push({
          type: 'success',
          title: 'Positive Impact',
          message: `Variant shows ${relativeImprovement.toFixed(1)}% improvement over control`
        })
      } else {
        insights.push({
          type: 'warning',
          title: 'Negative Impact',
          message: `Variant shows ${Math.abs(relativeImprovement).toFixed(1)}% decrease in performance`
        })
      }
    } else {
      insights.push({
        type: 'info',
        title: 'Not Statistically Significant',
        message: `No significant difference detected (p = ${pValue.toFixed(4)})`
      })
    }
    
    if (power < 0.8) {
      insights.push({
        type: 'warning',
        title: 'Low Statistical Power',
        message: `Test power is ${(power * 100).toFixed(1)}%. Consider larger sample size.`
      })
    }
    
    if (controlRate < 0.01) {
      insights.push({
        type: 'info',
        title: 'Low Conversion Rate',
        message: 'Very low conversion rates may require larger sample sizes'
      })
    }
    
    return insights
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsCalculating(true)

    // Simulate calculation
    setTimeout(() => {
      const calculatedResults = calculateABTest()
      setResults(calculatedResults)
      setIsCalculating(false)
    }, 1500)
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  // Helper functions for EnhancedResultsDisplay
  const getMetrics = () => {
    if (!results) return []
    return [
      {
        name: 'Control Conversion Rate',
        value: `${((results.controlConversions / results.controlVisitors) * 100).toFixed(2)}%`,
        unit: 'Conversion Rate',
        status: 'good'
      },
      {
        name: 'Variant Conversion Rate',
        value: `${((results.variantConversions / results.variantVisitors) * 100).toFixed(2)}%`,
        unit: 'Conversion Rate',
        status: 'good'
      },
      {
        name: 'P-Value',
        value: results.pValue.toFixed(4),
        unit: 'Statistical Significance',
        status: results.pValue < 0.05 ? 'good' : 'warning'
      }
    ]
  }

  const getRecommendations = () => {
    if (!results) return []
    const recommendations = []
    
    if (results.pValue < 0.05) {
      recommendations.push('The result is statistically significant. Consider implementing the winning variant.')
    } else {
      recommendations.push('The result is not statistically significant. Continue testing or increase sample size.')
    }
    
    if (results.relativeImprovement > 0) {
      recommendations.push('The variant shows improvement over the control.')
    } else {
      recommendations.push('The variant does not show improvement over the control.')
    }
    
    return recommendations
  }

  const getOverallScore = () => {
    if (!results) return 0
    let score = 50
    
    if (results.pValue < 0.05) score += 30
    if (results.power > 0.8) score += 20
    
    return Math.min(score, 100)
  }

  const getGeneratedContent = () => {
    if (!results) return ''
    
    return `# A/B Test Results Summary

## Test Overview
- Control Group: ${results.controlVisitors} visitors, ${results.controlConversions} conversions
- Variant Group: ${results.variantVisitors} visitors, ${results.variantConversions} conversions
- Confidence Level: ${formData.confidenceLevel}%

## Results
- P-Value: ${results.pValue.toFixed(4)}
- Statistical Significance: ${results.pValue < 0.05 ? 'Significant' : 'Not Significant'}
- Relative Improvement: ${results.relativeImprovement.toFixed(2)}%
- Statistical Power: ${(results.power * 100).toFixed(1)}%

## Recommendation
${results.pValue < 0.05 && results.relativeImprovement > 0 ? 
  'The variant shows statistically significant improvement. Implement the variant.' :
  'Continue testing or increase sample size for more reliable results.'
}`
  }

  const downloadReport = () => {
    if (!results) return
    
    const content = getGeneratedContent()
    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'ab-test-results.md'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent'
    if (score >= 60) return 'Good'
    if (score >= 40) return 'Fair'
    return 'Poor'
  }

  const formatPercent = (value: string) => {
    return `${value}%`
  }

  const getExportData = () => {
    if (!results) return null

    return {
      title: 'A/B Test Analysis Report',
      date: new Date().toLocaleDateString(),
      sections: [
        {
          title: 'Conversion Rates',
          data: [
            { label: 'Control Group Rate', value: `${results.controlRate}%` },
            { label: 'Variant Group Rate', value: `${results.variantRate}%` },
            { label: 'Difference', value: `${results.difference}%` },
            { label: 'Relative Improvement', value: `${results.relativeImprovement}%` }
          ]
        },
        {
          title: 'Statistical Analysis',
          data: [
            { label: 'Z-Score', value: results.zScore },
            { label: 'P-Value', value: results.pValue },
            { label: 'Confidence Level', value: `${results.confidenceLevel}%` },
            { label: 'Statistical Power', value: `${results.power}%` }
          ]
        },
        {
          title: 'Confidence Interval',
          data: [
            { label: 'Lower Bound', value: `${results.confidenceInterval.lower}%` },
            { label: 'Upper Bound', value: `${results.confidenceInterval.upper}%` },
            { label: 'Significance', value: results.isSignificant ? 'Significant' : 'Not Significant' }
          ]
        },
        {
          title: 'Sample Size Requirements',
          data: [
            { label: 'Required Sample Size', value: results.requiredSampleSize },
            { label: 'Current Sample Size', value: (parseInt(formData.controlVisitors) + parseInt(formData.variantVisitors)).toString() }
          ]
        }
      ],
      strengths: results.insights.filter((insight: any) => insight.type === 'success').map((insight: any) => insight.title + ': ' + insight.message),
      recommendations: results.insights.filter((insight: any) => insight.type === 'warning' || insight.type === 'info').map((insight: any) => insight.title + ': ' + insight.message)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <Navigation currentPath="/ab-test-calculator" />

      <div className="relative z-40 container mx-auto px-6 pt-24 pb-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-300 px-6 py-3 rounded-full mb-6 backdrop-blur-sm border border-indigo-500/30">
            <Calculator className="w-5 h-5" />
            <span className="text-sm font-medium">A/B Test Calculator</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            A/B Test Significance Calculator
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Calculate statistical significance, analyze test results, and make data-driven decisions with confidence intervals and power analysis.
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
                <h2 className="text-2xl font-bold text-white mb-2">Test Data</h2>
                <p className="text-gray-300">Enter your A/B test results</p>
              </div>

              {!results ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Test Results */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <FlexibleInput
                      label="Control Group Visitors"
                      type="number"
                      value={formData.controlVisitors}
                      onChange={(value) => handleInputChange('controlVisitors', value)}
                      options={['5000', '10000', '15000', '20000', '25000']}
                      placeholder="10000"
                      required={true}
                      language="en"
                    />
                    
                    <FlexibleInput
                      label="Control Group Conversions"
                      type="number"
                      value={formData.controlConversions}
                      onChange={(value) => handleInputChange('controlConversions', value)}
                      options={['250', '500', '750', '1000', '1500']}
                      placeholder="500"
                      required={true}
                      language="en"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <FlexibleInput
                      label="Variant Group Visitors"
                      type="number"
                      value={formData.variantVisitors}
                      onChange={(value) => handleInputChange('variantVisitors', value)}
                      options={['5000', '10000', '15000', '20000', '25000']}
                      placeholder="10000"
                      required={true}
                      language="en"
                    />
                    
                    <FlexibleInput
                      label="Variant Group Conversions"
                      type="number"
                      value={formData.variantConversions}
                      onChange={(value) => handleInputChange('variantConversions', value)}
                      options={['300', '600', '900', '1200', '1500']}
                      placeholder="600"
                      required={true}
                      language="en"
                    />
                  </div>

                  {/* Test Configuration */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <Percent className="w-4 h-4 text-indigo-400" />
                        Confidence Level
                      </label>
                      <select
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 text-white appearance-none cursor-pointer"
                        value={formData.confidenceLevel}
                        onChange={(e) => handleInputChange('confidenceLevel', e.target.value)}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%238181cf' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                          backgroundPosition: `right 0.5rem center`,
                          backgroundRepeat: `no-repeat`,
                          backgroundSize: `1.5em 1.5em`,
                          paddingRight: `2.5rem`
                        }}
                      >
                        {confidenceLevels.map(level => (
                          <option key={level.value} value={level.value} className="bg-gray-900 text-white">{level.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <GitBranch className="w-4 h-4 text-indigo-400" />
                        Test Type
                      </label>
                      <select
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 text-white appearance-none cursor-pointer"
                        value={formData.testType}
                        onChange={(e) => handleInputChange('testType', e.target.value)}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%238181cf' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                          backgroundPosition: `right 0.5rem center`,
                          backgroundRepeat: `no-repeat`,
                          backgroundSize: `1.5em 1.5em`,
                          paddingRight: `2.5rem`
                        }}
                      >
                        {testTypes.map(type => (
                          <option key={type.value} value={type.value} className="bg-gray-900 text-white">{type.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <Target className="w-4 h-4 text-indigo-400" />
                        Hypothesis Type
                      </label>
                      <select
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 text-white appearance-none cursor-pointer"
                        value={formData.hypothesisType}
                        onChange={(e) => handleInputChange('hypothesisType', e.target.value)}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%238181cf' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                          backgroundPosition: `right 0.5rem center`,
                          backgroundRepeat: `no-repeat`,
                          backgroundSize: `1.5em 1.5em`,
                          paddingRight: `2.5rem`
                        }}
                      >
                        {hypothesisTypes.map(type => (
                          <option key={type.value} value={type.value} className="bg-gray-900 text-white">{type.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isCalculating}
                    className="w-full px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isCalculating ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Calculating...
                      </>
                    ) : (
                      <>
                        <Calculator className="w-5 h-5" />
                        Calculate Significance
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <EnhancedResultsDisplay
                  title="A/B Test Analysis"
                  subtitle="Statistical analysis of your A/B test results"
                  results={results}
                  metrics={getMetrics()}
                  recommendations={getRecommendations()}
                  onCopy={(text) => navigator.clipboard.writeText(text)}
                  onDownload={() => downloadReport()}
                  score={getOverallScore()}
                  scoreColor={getScoreColor(getOverallScore())}
                  generatedContent={getGeneratedContent()}
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
                  <Target className="w-5 h-5 text-indigo-400" />
                  How to Use
                </h3>
                <ul className="space-y-3 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                    Enter visitor and conversion counts for both control and variant groups
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                    Select confidence level (95% recommended for most tests)
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                    Choose test type based on your hypothesis direction
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                    Review statistical significance and confidence intervals
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-indigo-400" />
                  Key Metrics
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-400">P-Value</span>
                      <span className="text-xs text-indigo-400">Significance threshold</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-400">Statistical Power</span>
                      <span className="text-xs text-indigo-400">Target: 80%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-400">Confidence Level</span>
                      <span className="text-xs text-indigo-400">Standard: 95%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div className="bg-pink-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl p-6 border border-indigo-500/30">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-indigo-400" />
                  Statistical Insights
                </h3>
                <div className="space-y-3 text-sm text-indigo-100">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-indigo-300" />
                    <span>P-value &lt; 0.05 indicates statistical significance</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-indigo-300" />
                    <span>Statistical power ≥ 80% ensures reliable results</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-indigo-300" />
                    <span>Confidence intervals show range of true difference</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-indigo-300" />
                    <span>Sample size affects test sensitivity and reliability</span>
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