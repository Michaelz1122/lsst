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
  Layers,
  Percent
} from 'lucide-react'

export default function AdBudgetCalculatorArabic() {
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
    'التجارة الإلكترونية', 'البرمجيات كخدمة', 'الأعمال المحلية', 'الرعاية الصحية', 'التعليم', 
    'العقارات', 'التمويل', 'السفر والسياحة', 'المطاعم والمشروبات', 'أخرى'
  ]

  const businessGoals = [
    'زيادة الوعي بالعلامة التجارية', 'توليد العملاء المحتملين', 'المبيعات', 'احتفاظ العملاء', 'التوسع في السوق', 'أخرى'
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
      strengths.push('تخصيص الميزانية التسويقية الأمثل')
    } else if (marketingBudgetPercent < 5) {
      recommendations.push('فكر في زيادة الميزانية التسويقية لتحقيق نتائج أفضل')
    } else if (marketingBudgetPercent > 25) {
      recommendations.push('الميزانية التسويقية قد تكون مرتفعة جداً - قم بتحسين الإنفاق')
    }

    if (targetROAS >= 3) {
      strengths.push('هدف ROAS واقعي')
    } else if (targetROAS < 2) {
      recommendations.push('هدف ROAS قد يكون منخفضاً جداً - استهدف عوائد أعلى')
    }

    if (conversionRate >= 2) {
      strengths.push('توقعات معدل تحويل جيدة')
    } else if (conversionRate < 1) {
      recommendations.push('هدف معدل التحويل منخفض - قم بتحسين صفحات الهبوط')
    }

    if (averageOrderValue >= 100) {
      strengths.push('متوسط قيمة الطلب صحي')
    } else if (averageOrderValue < 50) {
      recommendations.push('فكر في زيادة متوسط قيمة الطلب')
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
      totalRevenue: '',
      marketingBudgetPercent: '',
      targetROAS: '',
      averageOrderValue: '',
      conversionRate: '',
      campaignDuration: '30',
      industry: '',
      businessGoal: ''
    })
    setResults(null)
  }

  return (
    <RTLWrapper className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-900/20 via-transparent to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <Navigation currentPath="/ad-budget-calculator-ar" />

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
            <span className="text-sm font-medium">حاسبة الميزانية الإعلانية</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
            حاسبة الميزانية الإعلانية
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            احسب الميزانيات الإعلانية المثلى، وزع الإنفاق عبر القنوات، وحقق أقصى عائد من استثمارك التسويقي باستخدام تخطيط الميزانية القائم على البيانات.
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
                  بيانات تخطيط الميزانية
                </CardTitle>
                <p className="text-gray-300">
                  أدخل مقاييس عملك لحساب الميزانية الإعلانية المثلى
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                {!results ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Business Metrics */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-orange-400" />
                          الإيرادات السنوية الإجمالية *
                        </label>
                        <input
                          type="number"
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 text-white placeholder-gray-400"
                          value={formData.totalRevenue}
                          onChange={(e) => handleInputChange('totalRevenue', e.target.value)}
                          placeholder="1000000"
                          min="0"
                          step="10000"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                          <Percent className="w-4 h-4 text-orange-400" />
                          الميزانية التسويقية (%) *
                        </label>
                        <input
                          type="number"
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 text-white placeholder-gray-400"
                          value={formData.marketingBudgetPercent}
                          onChange={(e) => handleInputChange('marketingBudgetPercent', e.target.value)}
                          placeholder="15"
                          min="0"
                          max="100"
                          step="1"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                          <Target className="w-4 h-4 text-orange-400" />
                          هدف ROAS *
                        </label>
                        <input
                          type="number"
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 text-white placeholder-gray-400"
                          value={formData.targetROAS}
                          onChange={(e) => handleInputChange('targetROAS', e.target.value)}
                          placeholder="3"
                          min="0"
                          step="0.1"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                          <BarChart3 className="w-4 h-4 text-orange-400" />
                          متوسط قيمة الطلب *
                        </label>
                        <input
                          type="number"
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 text-white placeholder-gray-400"
                          value={formData.averageOrderValue}
                          onChange={(e) => handleInputChange('averageOrderValue', e.target.value)}
                          placeholder="150"
                          min="0"
                          step="10"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-orange-400" />
                          معدل التحويل (%) *
                        </label>
                        <input
                          type="number"
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 text-white placeholder-gray-400"
                          value={formData.conversionRate}
                          onChange={(e) => handleInputChange('conversionRate', e.target.value)}
                          placeholder="2.5"
                          min="0"
                          max="100"
                          step="0.1"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                          <Clock className="w-4 h-4 text-orange-400" />
                          مدة الحملة (أيام)
                        </label>
                        <select
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 text-white appearance-none cursor-pointer"
                          value={formData.campaignDuration}
                          onChange={(e) => handleInputChange('campaignDuration', e.target.value)}
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23fb923c' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                            backgroundPosition: `left 0.5rem center`,
                            backgroundRepeat: `no-repeat`,
                            backgroundSize: `1.5em 1.5em`,
                            paddingLeft: `2.5rem`
                          }}
                        >
                          <option value="7" className="bg-gray-900 text-white">7 أيام</option>
                          <option value="14" className="bg-gray-900 text-white">14 يوم</option>
                          <option value="30" className="bg-gray-900 text-white">30 يوم</option>
                          <option value="60" className="bg-gray-900 text-white">60 يوم</option>
                          <option value="90" className="bg-gray-900 text-white">90 يوم</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                          <Layers className="w-4 h-4 text-orange-400" />
                          الصناعة
                        </label>
                        <select
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 text-white appearance-none cursor-pointer"
                          value={formData.industry}
                          onChange={(e) => handleInputChange('industry', e.target.value)}
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23fb923c' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
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
                          <Target className="w-4 h-4 text-orange-400" />
                          الهدف التجاري
                        </label>
                        <select
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 text-white appearance-none cursor-pointer"
                          value={formData.businessGoal}
                          onChange={(e) => handleInputChange('businessGoal', e.target.value)}
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23fb923c' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                            backgroundPosition: `left 0.5rem center`,
                            backgroundRepeat: `no-repeat`,
                            backgroundSize: `1.5em 1.5em`,
                            paddingLeft: `2.5rem`
                          }}
                        >
                          <option value="">اختر الهدف</option>
                          {businessGoals.map((goal) => (
                            <option key={goal} value={goal} className="bg-gray-900 text-white">
                              {goal}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button
                        type="submit"
                        disabled={isCalculating}
                        className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50"
                      >
                        {isCalculating ? (
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>جاري الحساب...</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            <Calculator className="w-4 h-4" />
                            <span>احسب الميزانية</span>
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
                      <h3 className="text-xl font-bold text-white">نتائج الميزانية المحسوبة</h3>
                      <Button
                        onClick={resetForm}
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10 text-sm font-medium py-2 px-4 rounded-lg transition-all duration-300"
                      >
                        حساب جديد
                      </Button>
                    </div>

                    {/* Budget Summary */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <div className="text-sm text-gray-400 mb-1">الميزانية التسويقية</div>
                        <div className="text-xl font-bold text-orange-400">{formatCurrency(results.totalMarketingBudget)}</div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <div className="text-sm text-gray-400 mb-1">ميزانية الإعلانات</div>
                        <div className="text-xl font-bold text-orange-400">{formatCurrency(results.adBudget)}</div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <div className="text-sm text-gray-400 mb-1">ميزانية الحملة</div>
                        <div className="text-xl font-bold text-orange-400">{formatCurrency(results.campaignAdBudget)}</div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <div className="text-sm text-gray-400 mb-1">تقييم الأداء</div>
                        <div className={`text-xl font-bold ${getScoreColor(parseInt(results.overallScore))}`}>
                          {getScoreLabel(parseInt(results.overallScore))}
                        </div>
                      </div>
                    </div>

                    {/* Channel Allocation */}
                    <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                      <h4 className="text-lg font-bold text-white mb-4">توزيع القنوات المقترح</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">فيسبوك</span>
                          <span className="font-bold text-blue-400">{formatCurrency(results.channelAllocation.facebook)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">جوجل</span>
                          <span className="font-bold text-green-400">{formatCurrency(results.channelAllocation.google)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">إنستجرام</span>
                          <span className="font-bold text-pink-400">{formatCurrency(results.channelAllocation.instagram)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">لينكدإن</span>
                          <span className="font-bold text-blue-400">{formatCurrency(results.channelAllocation.linkedin)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">أخرى</span>
                          <span className="font-bold text-gray-400">{formatCurrency(results.channelAllocation.other)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                      <h4 className="text-lg font-bold text-white mb-4">مقاييس الأداء المتوقعة</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-gray-400 mb-1">الإيرادات المستهدفة</div>
                          <div className="text-lg font-bold text-green-400">{formatCurrency(results.targetRevenue)}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-400 mb-1">الطلبات المستهدفة</div>
                          <div className="text-lg font-bold text-blue-400">{results.targetOrders}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-400 mb-1">الزوار المستهدفين</div>
                          <div className="text-lg font-bold text-purple-400">{results.targetVisitors}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-400 mb-1">التكلفة لكل طلب</div>
                          <div className="text-lg font-bold text-orange-400">{formatCurrency(results.costPerOrder)}</div>
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
                  <Award className="w-5 h-5 text-orange-400" />
                  لماذا هذه الأداة؟
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-3">
                <p>تساعدك هذه الأداة على:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    تحديد الميزانية الإعلانية المثلى لعملك
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    توزيع الميزانية بذكاء عبر القنوات المختلفة
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    التنبؤ بالإيرادات والأداء المستقبلي
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    تحسين عائد الاستثمار التسويقي
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-orange-400" />
                  نصائح احترافية
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-3">
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <h4 className="font-bold text-orange-400 mb-1">قاعدة 70-30</h4>
                  <p className="text-sm">خصص 70% من الميزانية التسويقية للإعلانات المدفوعة و30% للمحتوى والعلاقات العامة.</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <h4 className="font-bold text-orange-400 mb-1">اختبار A/B</h4>
                  <p className="text-sm">خصص دائماً 15-20% من الميزانية لاختبار إعلانات واستراتيجيات جديدة.</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <h4 className="font-bold text-orange-400 mb-1">مراقبة الأداء</h4>
                  <p className="text-sm">راجع أداء الحملات أسبوعياً واضبط الميزانية بناءً على النتائج.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                  <Download className="w-5 h-5 text-orange-400" />
                  موارد إضافية
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 justify-start">
                  <ArrowRight className="w-4 h-4 ml-2" />
                  دليل التسويق الرقمي
                </Button>
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 justify-start">
                  <ArrowRight className="w-4 h-4 ml-2" />
                  استراتيجيات الميزانية
                </Button>
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 justify-start">
                  <ArrowRight className="w-4 h-4 ml-2" />
                  تحليل المنافسين
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </RTLWrapper>
  )
}