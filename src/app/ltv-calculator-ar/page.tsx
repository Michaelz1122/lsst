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
  Clock,
  Repeat,
  Star
} from 'lucide-react'

export default function LTVCalculatorArabic() {
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
    'التجارة الإلكترونية', 'البرمجيات كخدمة', 'الأعمال المحلية', 'الرعاية الصحية', 'التعليم', 
    'العقارات', 'التمويل', 'السفر والسياحة', 'المطاعم والمشروبات', 'أخرى'
  ]

  const businessModels = [
    'اشتراك', 'قائم على المعاملات', 'هجين', 'مجاني مع مدفوع', 'سوق', 'أخرى'
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
      strengths.push('قيمة عمر العميل الممتازة')
    } else if (simpleLTV >= 5000) {
      strengths.push('قيمة عمر العميل الجيدة')
    } else if (simpleLTV >= 2000) {
      recommendations.push('قيمة العميل مقبولة ولكن يمكن تحسينها')
    } else {
      recommendations.push('قيمة العميل أقل من المتوسط - ركز على احتفاظ العملاء')
    }

    if (retentionRate >= 80) {
      strengths.push('معدل احتفاظ استثنائي بالعملاء')
    } else if (retentionRate >= 60) {
      strengths.push('معدل احتفاظ جيد بالعملاء')
    } else if (retentionRate < 40) {
      recommendations.push('معدل احتفاظ منخفض - طبق استراتيجيات الاحتفاظ')
    }

    if (clvRatio >= 5) {
      strengths.push('نسبة قيمة العميل الممتازة')
    } else if (clvRatio >= 3) {
      strengths.push('نسبة قيمة العميل الجيدة')
    } else if (clvRatio < 2) {
      recommendations.push('نسبة قيمة العميل منخفضة - حسّن تحقيق الإيرادات')
    }

    if (paybackPeriod <= 3) {
      strengths.push('فترة استرداد سريعة للعميل')
    } else if (paybackPeriod > 6) {
      recommendations.push('فترة استرداد طويلة - حسّن تكاليف الاكتساب')
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
      averageOrderValue: '',
      purchaseFrequency: '',
      customerLifespan: '',
      retentionRate: '',
      profitMargin: '',
      discountRate: '',
      industry: '',
      businessModel: ''
    })
    setResults(null)
  }

  return (
    <RTLWrapper className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <Navigation currentPath="/ltv-calculator-ar" />

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
            <span className="text-sm font-medium">حاسبة قيمة العميل</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
            حاسبة قيمة العميل مدى الحياة
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            احسب قيمة العميل مدى الحياة، حلل أنماط الاحتفاظ، وضبط أعمالك للربحية والنمو على المدى الطويل.
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
                  بيانات قيمة العميل
                </CardTitle>
                <p className="text-gray-300">
                  أدخل مقاييس عملائك لحساب القيمة مدى الحياة
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                {!results ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Core LTV Metrics */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-purple-400" />
                          متوسط قيمة الطلب *
                        </label>
                        <input
                          type="number"
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white placeholder-gray-400"
                          value={formData.averageOrderValue}
                          onChange={(e) => handleInputChange('averageOrderValue', e.target.value)}
                          placeholder="250"
                          min="0"
                          step="10"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                          <Repeat className="w-4 h-4 text-purple-400" />
                          تكرار الشراء (سنوياً) *
                        </label>
                        <input
                          type="number"
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white placeholder-gray-400"
                          value={formData.purchaseFrequency}
                          onChange={(e) => handleInputChange('purchaseFrequency', e.target.value)}
                          placeholder="4"
                          min="0"
                          step="0.1"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                          <Clock className="w-4 h-4 text-purple-400" />
                          عمر العميل (سنوات) *
                        </label>
                        <input
                          type="number"
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white placeholder-gray-400"
                          value={formData.customerLifespan}
                          onChange={(e) => handleInputChange('customerLifespan', e.target.value)}
                          placeholder="3"
                          min="0"
                          step="0.5"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                          <Star className="w-4 h-4 text-purple-400" />
                          معدل الاحتفاظ (%) *
                        </label>
                        <input
                          type="number"
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white placeholder-gray-400"
                          value={formData.retentionRate}
                          onChange={(e) => handleInputChange('retentionRate', e.target.value)}
                          placeholder="70"
                          min="0"
                          max="100"
                          step="1"
                          required
                        />
                      </div>
                    </div>

                    {/* Financial Metrics */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                          <PieChart className="w-4 h-4 text-purple-400" />
                          هامش الربح (%)
                        </label>
                        <input
                          type="number"
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white placeholder-gray-400"
                          value={formData.profitMargin}
                          onChange={(e) => handleInputChange('profitMargin', e.target.value)}
                          placeholder="30"
                          min="0"
                          max="100"
                          step="1"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                          <Target className="w-4 h-4 text-purple-400" />
                          معدل الخصم (%)
                        </label>
                        <input
                          type="number"
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white placeholder-gray-400"
                          value={formData.discountRate}
                          onChange={(e) => handleInputChange('discountRate', e.target.value)}
                          placeholder="10"
                          min="0"
                          max="50"
                          step="1"
                        />
                      </div>
                    </div>

                    {/* Context Information */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                          <Activity className="w-4 h-4 text-purple-400" />
                          الصناعة
                        </label>
                        <select
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white appearance-none cursor-pointer"
                          value={formData.industry}
                          onChange={(e) => handleInputChange('industry', e.target.value)}
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23a78bfa' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
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
                          <Zap className="w-4 h-4 text-purple-400" />
                          نموذج العمل
                        </label>
                        <select
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white appearance-none cursor-pointer"
                          value={formData.businessModel}
                          onChange={(e) => handleInputChange('businessModel', e.target.value)}
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23a78bfa' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
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
                        className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50"
                      >
                        {isCalculating ? (
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>جاري الحساب...</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            <Calculator className="w-4 h-4" />
                            <span>احسب القيمة مدى الحياة</span>
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
                      <h3 className="text-xl font-bold text-white">نتائج قيمة العميل</h3>
                      <Button
                        onClick={resetForm}
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10 text-sm font-medium py-2 px-4 rounded-lg transition-all duration-300"
                      >
                        حساب جديد
                      </Button>
                    </div>

                    {/* LTV Summary */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <div className="text-sm text-gray-400 mb-1">القيمة البسيطة</div>
                        <div className="text-xl font-bold text-purple-400">{formatCurrency(results.simpleLTV)}</div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <div className="text-sm text-gray-400 mb-1">القيمة الربحية</div>
                        <div className="text-xl font-bold text-green-400">{formatCurrency(results.profitLTV)}</div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <div className="text-sm text-gray-400 mb-1">تقييم الأداء</div>
                        <div className={`text-xl font-bold ${getScoreColor(parseInt(results.overallScore))}`}>
                          {getScoreLabel(parseInt(results.overallScore))}
                        </div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <div className="text-sm text-gray-400 mb-1">نسبة القيمة</div>
                        <div className="text-xl font-bold text-blue-400">{results.clvRatio}x</div>
                      </div>
                    </div>

                    {/* Detailed LTV Calculations */}
                    <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                      <h4 className="text-lg font-bold text-white mb-4">طرق حساب القيمة مدى الحياة</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">القيمة البسيطة (AOV × تكرار × العمر)</span>
                          <span className="font-bold text-purple-400">{formatCurrency(results.simpleLTV)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">القيمة الربحية (بعد خصم التكاليف)</span>
                          <span className="font-bold text-green-400">{formatCurrency(results.profitLTV)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">القيمة على أساس الاحتفاظ</span>
                          <span className="font-bold text-blue-400">{formatCurrency(results.retentionLTV)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">القيمة المخصومة (القيمة الحالية)</span>
                          <span className="font-bold text-indigo-400">{formatCurrency(results.discountedLTV)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Customer Metrics */}
                    <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                      <h4 className="text-lg font-bold text-white mb-4">مقاييس العميل</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-gray-400 mb-1">الإيرادات الشهرية</div>
                          <div className="text-lg font-bold text-cyan-400">{formatCurrency(results.monthlyRevenue)}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-400 mb-1">فترة الاسترداد (شهور)</div>
                          <div className="text-lg font-bold text-orange-400">{results.paybackPeriod}</div>
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
                  <Award className="w-5 h-5 text-purple-400" />
                  لماذا هذه الأداة؟
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-3">
                <p>تساعدك هذه الأداة على:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    حساب القيمة الحقيقية للعميل على المدى الطويل
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    تحليل فعالية استراتيجيات الاحتفاظ بالعملاء
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    تحديد ميزانية اكتساب العملاء المثلى
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    تحسين الربحية والنمو المستدام
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-purple-400" />
                  طرق حساب LTV
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-3">
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <h4 className="font-bold text-purple-400 mb-1">القيمة البسيطة</h4>
                  <p className="text-sm">AOV × تكرار الشراء × عمر العميل</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <h4 className="font-bold text-purple-400 mb-1">القيمة على أساس الاحتفاظ</h4>
                  <p className="text-sm">(الإيرادات × معدل الاحتفاظ) / معدل المغادرة</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <h4 className="font-bold text-purple-400 mb-1">القيمة المخصومة</h4>
                  <p className="text-sm">القيمة الحالية للإيرادات المستقبلية</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                  <Download className="w-5 h-5 text-purple-400" />
                  موارد إضافية
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 justify-start">
                  <ArrowRight className="w-4 h-4 ml-2" />
                  دليل احتفاظ العملاء
                </Button>
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 justify-start">
                  <ArrowRight className="w-4 h-4 ml-2" />
                  استراتيجيات زيادة القيمة
                </Button>
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 justify-start">
                  <ArrowRight className="w-4 h-4 ml-2" />
                  تحليل شرائح العملاء
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </RTLWrapper>
  )
}