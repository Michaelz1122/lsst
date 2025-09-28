'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import RTLWrapper from '@/components/RTLWrapper'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
  Scale,
  Package,
  TrendingDown,
  Clock
} from 'lucide-react'

export default function BreakEvenCalculatorArabic() {
  const [formData, setFormData] = useState({
    fixedCosts: '',
    variableCostPerUnit: '',
    sellingPricePerUnit: '',
    expectedSalesVolume: '',
    timePeriod: 'monthly',
    industry: '',
    businessModel: ''
  })

  const [results, setResults] = useState<any>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const industries = [
    'التجارة الإلكترونية', 'البرمجيات كخدمة', 'الأعمال المحلية', 'الرعاية الصحية', 'التعليم', 
    'العقارات', 'التمويل', 'السفر والسياحة', 'المطاعم والمشروبات', 'أخرى'
  ]

  const businessModels = [
    'قائم على المنتجات', 'قائم على الخدمات', 'اشتراك', 'هجين', 'سوق', 'أخرى'
  ]

  const timePeriods = [
    { value: 'daily', label: 'يومي' },
    { value: 'weekly', label: 'أسبوعي' },
    { value: 'monthly', label: 'شهري' },
    { value: 'quarterly', label: 'ربع سنوي' },
    { value: 'yearly', label: 'سنوي' }
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const calculateBreakEven = () => {
    const fixedCosts = parseFloat(formData.fixedCosts) || 0
    const variableCostPerUnit = parseFloat(formData.variableCostPerUnit) || 0
    const sellingPricePerUnit = parseFloat(formData.sellingPricePerUnit) || 0
    const expectedSalesVolume = parseFloat(formData.expectedSalesVolume) || 0

    // Calculate contribution margin
    const contributionMarginPerUnit = sellingPricePerUnit - variableCostPerUnit
    const contributionMarginRatio = sellingPricePerUnit > 0 ? 
      (contributionMarginPerUnit / sellingPricePerUnit) * 100 : 0

    // Calculate break-even point
    const breakEvenUnits = contributionMarginPerUnit > 0 ? 
      fixedCosts / contributionMarginPerUnit : 0
    const breakEvenRevenue = breakEvenUnits * sellingPricePerUnit

    // Calculate margin of safety
    const marginOfSafetyUnits = expectedSalesVolume > breakEvenUnits ? 
      expectedSalesVolume - breakEvenUnits : 0
    const marginOfSafetyRevenue = marginOfSafetyUnits * sellingPricePerUnit
    const marginOfSafetyPercentage = expectedSalesVolume > 0 ? 
      (marginOfSafetyUnits / expectedSalesVolume) * 100 : 0

    // Calculate profit/loss at expected sales
    const totalVariableCosts = expectedSalesVolume * variableCostPerUnit
    const totalRevenue = expectedSalesVolume * sellingPricePerUnit
    const totalCosts = fixedCosts + totalVariableCosts
    const netProfit = totalRevenue - totalCosts

    // Calculate time-based metrics
    const timeMultiplier = getTimeMultiplier(formData.timePeriod)
    const breakEvenPerPeriod = breakEvenUnits / timeMultiplier
    const expectedSalesPerPeriod = expectedSalesVolume / timeMultiplier

    // Calculate scores
    const marginScore = contributionMarginRatio >= 50 ? 100 : 
                      contributionMarginRatio >= 30 ? 80 : 
                      contributionMarginRatio >= 20 ? 60 : 
                      contributionMarginRatio >= 10 ? 40 : 20

    const safetyScore = marginOfSafetyPercentage >= 50 ? 100 : 
                      marginOfSafetyPercentage >= 30 ? 80 : 
                      marginOfSafetyPercentage >= 15 ? 60 : 
                      marginOfSafetyPercentage >= 5 ? 40 : 20

    const profitabilityScore = netProfit >= 0 ? 100 : 0
    const overallScore = (marginScore + safetyScore + profitabilityScore) / 3

    // Generate recommendations
    const recommendations = []
    const strengths = []

    // Contribution margin analysis
    if (contributionMarginRatio >= 40) {
      strengths.push('هامش مساهمة ممتاز')
    } else if (contributionMarginRatio >= 25) {
      strengths.push('هامش مساهمة جيد')
    } else if (contributionMarginRatio < 15) {
      recommendations.push('هامش مساهمة منخفض - فكر في زيادة الأسعار أو تقليل التكاليف')
    }

    // Margin of safety analysis
    if (marginOfSafetyPercentage >= 40) {
      strengths.push('هامش أمان قوي')
    } else if (marginOfSafetyPercentage >= 20) {
      strengths.push('هامش أمان جيد')
    } else if (marginOfSafetyPercentage < 10) {
      recommendations.push('هامش أمان منخفض - مخاطر عالية للخسائر')
    }

    // Profitability analysis
    if (netProfit > 0) {
      strengths.push('مربح حالياً عند حجم المبيعات المتوقع')
    } else if (netProfit < 0) {
      recommendations.push('يعمل بخسارة عند حجم المبيعات المتوقع')
    }

    // Break-even analysis
    if (breakEvenUnits <= expectedSalesVolume * 0.5) {
      strengths.push('نقطة التعادل منخفضة نسبياً للمبيعات المتوقعة')
    } else if (breakEvenUnits > expectedSalesVolume) {
      recommendations.push('نقطة التعادل تتجاوز المبيعات المتوقعة - مخاطر عالية')
    }

    return {
      breakEvenUnits: breakEvenUnits.toFixed(0),
      breakEvenRevenue: breakEvenRevenue.toFixed(2),
      contributionMarginPerUnit: contributionMarginPerUnit.toFixed(2),
      contributionMarginRatio: contributionMarginRatio.toFixed(1),
      marginOfSafetyUnits: marginOfSafetyUnits.toFixed(0),
      marginOfSafetyRevenue: marginOfSafetyRevenue.toFixed(2),
      marginOfSafetyPercentage: marginOfSafetyPercentage.toFixed(1),
      netProfit: netProfit.toFixed(2),
      totalRevenue: totalRevenue.toFixed(2),
      totalCosts: totalCosts.toFixed(2),
      breakEvenPerPeriod: breakEvenPerPeriod.toFixed(0),
      expectedSalesPerPeriod: expectedSalesPerPeriod.toFixed(0),
      overallScore: overallScore.toFixed(0),
      recommendations,
      strengths,
      metrics: {
        marginScore,
        safetyScore,
        profitabilityScore
      }
    }
  }

  const getTimeMultiplier = (period: string) => {
    switch (period) {
      case 'daily': return 365
      case 'weekly': return 52
      case 'monthly': return 12
      case 'quarterly': return 4
      case 'yearly': return 1
      default: return 12
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsCalculating(true)

    // Simulate calculation
    setTimeout(() => {
      const calculatedResults = calculateBreakEven()
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
    if (score >= 80) return 'ممتاز'
    if (score >= 60) return 'جيد'
    if (score >= 40) return 'مقبول'
    return 'ضعيف'
  }

  const formatCurrency = (value: string) => {
    const num = parseFloat(value)
    return new Intl.NumberFormat('ar-EG', {
      style: 'currency',
      currency: 'EGP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num)
  }

  const resetForm = () => {
    setFormData({
      fixedCosts: '',
      variableCostPerUnit: '',
      sellingPricePerUnit: '',
      expectedSalesVolume: '',
      timePeriod: 'monthly',
      industry: '',
      businessModel: ''
    })
    setResults(null)
  }

  return (
    <RTLWrapper className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <Navigation currentPath="/break-even-calculator-ar" />

      <div className="relative z-40 container mx-auto px-6 pt-24 pb-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500/20 to-orange-500/20 text-red-300 px-6 py-3 rounded-full mb-6 backdrop-blur-sm border border-red-500/30">
            <Calculator className="w-5 h-5" />
            <span className="text-sm font-medium">حاسبة نقطة التعادل</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
            حاسبة نقطة التعادل
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            احسب نقطة تعادلك، حلل الربحية، واتخذ قرارات تسعير وتكلفة مستنيرة لأعمالك.
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
            <Card className="bg-white/5 backdrop-blur-md border-white/10 shadow-2xl">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-bold text-white mb-2">
                  بيانات التكاليف والتسعير
                </CardTitle>
                <p className="text-gray-300">
                  أدخل هيكل التكاليف ومعلومات التسعير الخاصة بك
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                {!results ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Cost Structure */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-red-400" />
                          التكاليف الثابتة *
                        </label>
                        <input
                          type="number"
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 text-white placeholder-gray-400"
                          value={formData.fixedCosts}
                          onChange={(e) => handleInputChange('fixedCosts', e.target.value)}
                          placeholder="50000"
                          min="0"
                          step="1000"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                          <Package className="w-4 h-4 text-red-400" />
                          التكلفة المتغيرة للوحدة *
                        </label>
                        <input
                          type="number"
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 text-white placeholder-gray-400"
                          value={formData.variableCostPerUnit}
                          onChange={(e) => handleInputChange('variableCostPerUnit', e.target.value)}
                          placeholder="30"
                          min="0"
                          step="1"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                          <Target className="w-4 h-4 text-red-400" />
                          سعر البيع للوحدة *
                        </label>
                        <input
                          type="number"
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 text-white placeholder-gray-400"
                          value={formData.sellingPricePerUnit}
                          onChange={(e) => handleInputChange('sellingPricePerUnit', e.target.value)}
                          placeholder="100"
                          min="0"
                          step="1"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                          <Users className="w-4 h-4 text-red-400" />
                          حجم المبيعات المتوقع *
                        </label>
                        <input
                          type="number"
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 text-white placeholder-gray-400"
                          value={formData.expectedSalesVolume}
                          onChange={(e) => handleInputChange('expectedSalesVolume', e.target.value)}
                          placeholder="1000"
                          min="0"
                          step="10"
                          required
                        />
                      </div>
                    </div>

                    {/* Time Period */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-red-400" />
                        الفترة الزمنية *
                      </label>
                      <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                        {timePeriods.map((period) => (
                          <button
                            key={period.value}
                            type="button"
                            onClick={() => handleInputChange('timePeriod', period.value)}
                            className={`p-3 rounded-lg border transition-all duration-300 text-center ${
                              formData.timePeriod === period.value
                                ? 'bg-red-500/20 border-red-500/50 text-red-300'
                                : 'bg-white/5 border-white/20 text-gray-300 hover:bg-white/10'
                            }`}
                          >
                            <div className="text-sm font-medium">{period.label}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Context Information */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                          <Activity className="w-4 h-4 text-red-400" />
                          الصناعة
                        </label>
                        <select
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 text-white appearance-none cursor-pointer"
                          value={formData.industry}
                          onChange={(e) => handleInputChange('industry', e.target.value)}
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ef4444' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                            backgroundPosition: `left 0.5rem center`,
                            backgroundRepeat: `no-repeat`,
                            backgroundSize: `1.5em 1.5em`,
                            paddingLeft: `2.5rem`
                          }}
                        >
                          <option value="">اختر الصناعة</option>
                          {industries.map((industry) => (
                            <option key={industry} value={industry} className="bg-gray-900 text-white">
                              {industry}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                          <Scale className="w-4 h-4 text-red-400" />
                          نموذج العمل
                        </label>
                        <select
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 text-white appearance-none cursor-pointer"
                          value={formData.businessModel}
                          onChange={(e) => handleInputChange('businessModel', e.target.value)}
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ef4444' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                            backgroundPosition: `left 0.5rem center`,
                            backgroundRepeat: `no-repeat`,
                            backgroundSize: `1.5em 1.5em`,
                            paddingLeft: `2.5rem`
                          }}
                        >
                          <option value="">اختر النموذج</option>
                          {businessModels.map((model) => (
                            <option key={model} value={model} className="bg-gray-900 text-white">
                              {model}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button
                        type="submit"
                        disabled={isCalculating}
                        className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50"
                      >
                        {isCalculating ? (
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>جاري الحساب...</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            <Calculator className="w-4 h-4" />
                            <span>احسب نقطة التعادل</span>
                          </div>
                        )}
                      </Button>
                      <Button
                        type="button"
                        onClick={resetForm}
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10 font-medium py-3 px-6 rounded-lg transition-all duration-300"
                      >
                        إعادة تعيين
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-white">نتائج نقطة التعادل</h3>
                      <Button
                        onClick={resetForm}
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10 text-sm font-medium py-2 px-4 rounded-lg transition-all duration-300"
                      >
                        حساب جديد
                      </Button>
                    </div>

                    {/* Break-even Summary */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <div className="text-sm text-gray-400 mb-1">وحدات التعادل</div>
                        <div className="text-xl font-bold text-red-400">{results.breakEvenUnits}</div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <div className="text-sm text-gray-400 mb-1">إيرادات التعادل</div>
                        <div className="text-xl font-bold text-orange-400">{formatCurrency(results.breakEvenRevenue)}</div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <div className="text-sm text-gray-400 mb-1">تقييم الأداء</div>
                        <div className={`text-xl font-bold ${getScoreColor(parseInt(results.overallScore))}`}>
                          {getScoreLabel(parseInt(results.overallScore))}
                        </div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <div className="text-sm text-gray-400 mb-1">الربح الصافي</div>
                        <div className={`text-xl font-bold ${parseFloat(results.netProfit) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {formatCurrency(results.netProfit)}
                        </div>
                      </div>
                    </div>

                    {/* Break-even Analysis */}
                    <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                      <h4 className="text-lg font-bold text-white mb-4">تحليل التعادل</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">هامش المساهمة للوحدة</span>
                          <span className="font-bold text-green-400">{formatCurrency(results.contributionMarginPerUnit)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">نسبة هامش المساهمة</span>
                          <span className="font-bold text-blue-400">{results.contributionMarginRatio}%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">هامش الأمان (وحدات)</span>
                          <span className="font-bold text-purple-400">{results.marginOfSafetyUnits}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">هامش الأمان (%)</span>
                          <span className="font-bold text-cyan-400">{results.marginOfSafetyPercentage}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Financial Performance */}
                    <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                      <h4 className="text-lg font-bold text-white mb-4">الأداء المالي</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-gray-400 mb-1">إجمالي الإيرادات</div>
                          <div className="text-lg font-bold text-green-400">{formatCurrency(results.totalRevenue)}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-400 mb-1">إجمالي التكاليف</div>
                          <div className="text-lg font-bold text-red-400">{formatCurrency(results.totalCosts)}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-400 mb-1">التعادل لكل فترة</div>
                          <div className="text-lg font-bold text-orange-400">{results.breakEvenPerPeriod}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-400 mb-1">المبيعات المتوقعة لكل فترة</div>
                          <div className="text-lg font-bold text-blue-400">{results.expectedSalesPerPeriod}</div>
                        </div>
                      </div>
                    </div>

                    {/* Recommendations */}
                    {results.recommendations.length > 0 && (
                      <div className="bg-orange-500/10 rounded-lg p-6 border border-orange-500/30">
                        <h4 className="text-lg font-bold text-orange-400 mb-4 flex items-center gap-2">
                          <AlertCircle className="w-5 h-5" />
                          توصيات للتحسين
                        </h4>
                        <ul className="space-y-2">
                          {results.recommendations.map((rec: string, index: number) => (
                            <li key={index} className="text-gray-300 flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Strengths */}
                    {results.strengths.length > 0 && (
                      <div className="bg-green-500/10 rounded-lg p-6 border border-green-500/30">
                        <h4 className="text-lg font-bold text-green-400 mb-4 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5" />
                          نقاط القوة
                        </h4>
                        <ul className="space-y-2">
                          {results.strengths.map((strength: string, index: number) => (
                            <li key={index} className="text-gray-300 flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                              {strength}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <Card className="bg-white/5 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-red-400" />
                  لماذا هذه الأداة؟
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-3">
                <p>تساعدك هذه الأداة على:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    تحديد نقطة التعادل لوحدات والإيرادات
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    تحليل هيكل التكاليف والربحية
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    تقييم هامش الأمان والمخاطر
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    اتخاذ قرارات تسعير مستنيرة
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-red-400" />
                  مفاهيم أساسية
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-3">
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <h4 className="font-bold text-red-400 mb-1">نقطة التعادل</h4>
                  <p className="text-sm">النقطة التي تساوي فيها الإيرادات التكاليف الكلية</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <h4 className="font-bold text-red-400 mb-1">هامش المساهمة</h4>
                  <p className="text-sm">الفرق بين سعر البيع والتكلفة المتغيرة</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <h4 className="font-bold text-red-400 mb-1">هامش الأمان</h4>
                  <p className="text-sm">الفرق بين المبيعات الفعلية ومبيعات التعادل</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                  <Download className="w-5 h-5 text-red-400" />
                  موارد إضافية
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 justify-start">
                  <ArrowRight className="w-4 h-4 ml-2" />
                  دليل التسعير الاستراتيجي
                </Button>
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 justify-start">
                  <ArrowRight className="w-4 h-4 ml-2" />
                  تحليل التكاليف الهيكلية
                </Button>
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 justify-start">
                  <ArrowRight className="w-4 h-4 ml-2" />
                  استراتيجيات تحسين الربحية
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </RTLWrapper>
  )
}