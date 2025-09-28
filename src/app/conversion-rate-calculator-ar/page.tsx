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
  MousePointer,
  ShoppingCart,
  Eye
} from 'lucide-react'

export default function ConversionRateCalculatorArabic() {
  const [formData, setFormData] = useState({
    visitors: '',
    leads: '',
    customers: '',
    pageViews: '',
    sessions: '',
    conversionType: 'visitor_to_customer',
    industry: '',
    trafficSource: ''
  })

  const [results, setResults] = useState<any>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const industries = [
    'التجارة الإلكترونية', 'البرمجيات كخدمة', 'الأعمال المحلية', 'الرعاية الصحية', 'التعليم', 
    'العقارات', 'التمويل', 'السفر والسياحة', 'المطاعم والمشروبات', 'أخرى'
  ]

  const trafficSources = [
    'البحث العضوي', 'البحث المدفوع', 'وسائل التواصل الاجتماعي', 'البريد الإلكتروني', 'مباشر', 'إحالة', 'أخرى'
  ]

  const conversionTypes = [
    { value: 'visitor_to_lead', label: 'زائر إلى عميل محتمل', icon: Users },
    { value: 'lead_to_customer', label: 'عميل محتمل إلى عميل', icon: ShoppingCart },
    { value: 'visitor_to_customer', label: 'زائر إلى عميل', icon: Target },
    { value: 'click_to_lead', label: 'نقرة إلى عميل محتمل', icon: MousePointer },
    { value: 'page_view_to_conversion', label: 'مشاهدة الصفحة إلى تحويل', icon: Eye }
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const calculateConversionRates = () => {
    const visitors = parseFloat(formData.visitors) || 0
    const leads = parseFloat(formData.leads) || 0
    const customers = parseFloat(formData.customers) || 0
    const pageViews = parseFloat(formData.pageViews) || 0
    const sessions = parseFloat(formData.sessions) || 0

    // Calculate conversion rates based on type
    let conversionRates: any = {}

    switch (formData.conversionType) {
      case 'visitor_to_lead':
        conversionRates = {
          primary: visitors > 0 ? (leads / visitors) * 100 : 0,
          visitorToCustomer: visitors > 0 ? (customers / visitors) * 100 : 0,
          leadToCustomer: leads > 0 ? (customers / leads) * 100 : 0
        }
        break
      case 'lead_to_customer':
        conversionRates = {
          primary: leads > 0 ? (customers / leads) * 100 : 0,
          visitorToCustomer: visitors > 0 ? (customers / visitors) * 100 : 0,
          visitorToLead: visitors > 0 ? (leads / visitors) * 100 : 0
        }
        break
      case 'visitor_to_customer':
        conversionRates = {
          primary: visitors > 0 ? (customers / visitors) * 100 : 0,
          visitorToLead: visitors > 0 ? (leads / visitors) * 100 : 0,
          leadToCustomer: leads > 0 ? (customers / leads) * 100 : 0
        }
        break
      case 'click_to_lead':
        conversionRates = {
          primary: visitors > 0 ? (leads / visitors) * 100 : 0,
          visitorToCustomer: visitors > 0 ? (customers / visitors) * 100 : 0,
          leadToCustomer: leads > 0 ? (customers / leads) * 100 : 0
        }
        break
      case 'page_view_to_conversion':
        conversionRates = {
          primary: pageViews > 0 ? (customers / pageViews) * 100 : 0,
          visitorToCustomer: visitors > 0 ? (customers / visitors) * 100 : 0,
          visitorToLead: visitors > 0 ? (leads / visitors) * 100 : 0
        }
        break
    }

    // Calculate additional metrics
    const bounceRate = sessions > 0 ? Math.max(0, (sessions - visitors) / sessions * 100) : 0
    const pagesPerSession = sessions > 0 ? pageViews / sessions : 0
    const avgSessionDuration = 180 // Assuming 3 minutes average

    // Calculate funnel metrics
    const funnelDropOff = {
      visitorToLead: visitors > 0 ? ((visitors - leads) / visitors) * 100 : 0,
      leadToCustomer: leads > 0 ? ((leads - customers) / leads) * 100 : 0,
      overall: visitors > 0 ? ((visitors - customers) / visitors) * 100 : 0
    }

    // Calculate scores
    const primaryScore = conversionRates.primary >= 5 ? 100 : 
                         conversionRates.primary >= 3 ? 80 : 
                         conversionRates.primary >= 1.5 ? 60 : 
                         conversionRates.primary >= 0.5 ? 40 : 20
    
    const funnelScore = funnelDropOff.overall <= 80 ? 100 : 
                       funnelDropOff.overall <= 90 ? 80 : 
                       funnelDropOff.overall <= 95 ? 60 : 40
    
    const engagementScore = pagesPerSession >= 3 ? 100 : 
                           pagesPerSession >= 2 ? 80 : 
                           pagesPerSession >= 1.5 ? 60 : 40
    
    const overallScore = (primaryScore + funnelScore + engagementScore) / 3

    // Generate recommendations
    const recommendations = []
    const strengths = []

    // Primary conversion rate analysis
    if (conversionRates.primary >= 5) {
      strengths.push('معدل تحويل أساسي ممتاز')
    } else if (conversionRates.primary >= 3) {
      strengths.push('معدل تحويل أساسي جيد')
    } else if (conversionRates.primary >= 1.5) {
      recommendations.push('معدل التحويل الأساسي مقبول ولكن يمكن تحسينه')
    } else {
      recommendations.push('معدل التحويل الأساسي يحتاج إلى تحسين كبير')
    }

    // Funnel analysis
    if (funnelDropOff.visitorToLead <= 70) {
      strengths.push('تحويل زائر إلى عميل محتمل جيد')
    } else if (funnelDropOff.visitorToLead > 85) {
      recommendations.push('معدل مغادرة الزوار مرتفع - حسّن جذب العملاء المحتملين')
    }

    if (funnelDropOff.leadToCustomer <= 50) {
      strengths.push('تحويل عميل محتمل إلى عميل جيد')
    } else if (funnelDropOff.leadToCustomer > 70) {
      recommendations.push('معدل مغادرة العملاء المحتملين مرتفع - حسّن عملية المبيعات')
    }

    // Engagement analysis
    if (pagesPerSession >= 3) {
      strengths.push('مشاركة المستخدمين جيدة')
    } else if (pagesPerSession < 1.5) {
      recommendations.push('مشاركة المستخدمين منخفضة - حسّن المحتوى وتجربة المستخدم')
    }

    // Traffic quality analysis
    if (bounceRate <= 40) {
      strengths.push('معدل الارتداد المنخفض يشير إلى جودة الزوار')
    } else if (bounceRate > 60) {
      recommendations.push('معدل الارتداد مرتفع - راجع الاستهداف وصفحات الهبوط')
    }

    return {
      conversionRates: {
        primary: conversionRates.primary.toFixed(2),
        visitorToLead: conversionRates.visitorToLead?.toFixed(2) || '0.00',
        leadToCustomer: conversionRates.leadToCustomer?.toFixed(2) || '0.00',
        visitorToCustomer: conversionRates.visitorToCustomer?.toFixed(2) || '0.00'
      },
      funnelMetrics: {
        bounceRate: bounceRate.toFixed(1),
        pagesPerSession: pagesPerSession.toFixed(1),
        avgSessionDuration: avgSessionDuration
      },
      funnelDropOff: {
        visitorToLead: funnelDropOff.visitorToLead.toFixed(1),
        leadToCustomer: funnelDropOff.leadToCustomer.toFixed(1),
        overall: funnelDropOff.overall.toFixed(1)
      },
      overallScore: overallScore.toFixed(0),
      recommendations,
      strengths,
      metrics: {
        primaryScore,
        funnelScore,
        engagementScore
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsCalculating(true)

    // Simulate calculation
    setTimeout(() => {
      const calculatedResults = calculateConversionRates()
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

  const getConversionTypeLabel = () => {
    const type = conversionTypes.find(t => t.value === formData.conversionType)
    return type ? type.label : 'معدل التحويل'
  }

  const resetForm = () => {
    setFormData({
      visitors: '',
      leads: '',
      customers: '',
      pageViews: '',
      sessions: '',
      conversionType: 'visitor_to_customer',
      industry: '',
      trafficSource: ''
    })
    setResults(null)
  }

  return (
    <RTLWrapper className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <Navigation currentPath="/conversion-rate-calculator-ar" />

      <div className="relative z-40 container mx-auto px-6 pt-24 pb-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 px-6 py-3 rounded-full mb-6 backdrop-blur-sm border border-cyan-500/30">
            <Calculator className="w-5 h-5" />
            <span className="text-sm font-medium">حاسبة معدل التحويل</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
            حاسبة معدل التحويل
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            حلل قمع التحويل الخاص بك، وحدد فرص التحسين، وحقق أقصى فعالية لتسويقك من خلال رؤى قائمة على البيانات.
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
                  بيانات التحويل
                </CardTitle>
                <p className="text-gray-300">
                  أدخل مقاييس حركة المرور والتحويل الخاصة بك
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                {!results ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Conversion Type Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                        <Target className="w-4 h-4 text-cyan-400" />
                        نوع التحويل *
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {conversionTypes.map((type) => {
                          const Icon = type.icon
                          return (
                            <button
                              key={type.value}
                              type="button"
                              onClick={() => handleInputChange('conversionType', type.value)}
                              className={`p-4 rounded-lg border transition-all duration-300 text-right ${
                                formData.conversionType === type.value
                                  ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300'
                                  : 'bg-white/5 border-white/20 text-gray-300 hover:bg-white/10'
                              }`}
                            >
                              <div className="flex items-center gap-3 flex-row-reverse">
                                <Icon className="w-5 h-5" />
                                <div>
                                  <div className="font-medium">{type.label}</div>
                                  <div className="text-xs opacity-70">المقياس الأساسي</div>
                                </div>
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Traffic Metrics */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                          <Eye className="w-4 h-4 text-cyan-400" />
                          الزوار *
                        </label>
                        <input
                          type="number"
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 text-white placeholder-gray-400"
                          value={formData.visitors}
                          onChange={(e) => handleInputChange('visitors', e.target.value)}
                          placeholder="10000"
                          min="0"
                          step="100"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                          <Users className="w-4 h-4 text-cyan-400" />
                          العملاء المحتملون *
                        </label>
                        <input
                          type="number"
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 text-white placeholder-gray-400"
                          value={formData.leads}
                          onChange={(e) => handleInputChange('leads', e.target.value)}
                          placeholder="500"
                          min="0"
                          step="10"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                          <ShoppingCart className="w-4 h-4 text-cyan-400" />
                          العملاء *
                        </label>
                        <input
                          type="number"
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 text-white placeholder-gray-400"
                          value={formData.customers}
                          onChange={(e) => handleInputChange('customers', e.target.value)}
                          placeholder="100"
                          min="0"
                          step="1"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                          <BarChart3 className="w-4 h-4 text-cyan-400" />
                          مشاهدات الصفحة
                        </label>
                        <input
                          type="number"
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 text-white placeholder-gray-400"
                          value={formData.pageViews}
                          onChange={(e) => handleInputChange('pageViews', e.target.value)}
                          placeholder="25000"
                          min="0"
                          step="100"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                          <Activity className="w-4 h-4 text-cyan-400" />
                          الجلسات
                        </label>
                        <input
                          type="number"
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 text-white placeholder-gray-400"
                          value={formData.sessions}
                          onChange={(e) => handleInputChange('sessions', e.target.value)}
                          placeholder="8000"
                          min="0"
                          step="100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                          <Target className="w-4 h-4 text-cyan-400" />
                          الصناعة
                        </label>
                        <select
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 text-white appearance-none cursor-pointer"
                          value={formData.industry}
                          onChange={(e) => handleInputChange('industry', e.target.value)}
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2306b6d4' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
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
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-cyan-400" />
                        مصدر الزيارات
                      </label>
                      <select
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 text-white appearance-none cursor-pointer"
                        value={formData.trafficSource}
                        onChange={(e) => handleInputChange('trafficSource', e.target.value)}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2306b6d4' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                          backgroundPosition: `left 0.5rem center`,
                          backgroundRepeat: `no-repeat`,
                          backgroundSize: `1.5em 1.5em`,
                          paddingLeft: `2.5rem`
                        }}
                      >
                        <option value="">اختر المصدر</option>
                        {trafficSources.map((source) => (
                          <option key={source} value={source} className="bg-gray-900 text-white">
                            {source}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button
                        type="submit"
                        disabled={isCalculating}
                        className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50"
                      >
                        {isCalculating ? (
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>جاري الحساب...</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            <Calculator className="w-4 h-4" />
                            <span>احسب معدل التحويل</span>
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
                      <h3 className="text-xl font-bold text-white">نتائج معدل التحويل</h3>
                      <Button
                        onClick={resetForm}
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10 text-sm font-medium py-2 px-4 rounded-lg transition-all duration-300"
                      >
                        حساب جديد
                      </Button>
                    </div>

                    {/* Conversion Rates Summary */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <div className="text-sm text-gray-400 mb-1">{getConversionTypeLabel()}</div>
                        <div className="text-xl font-bold text-cyan-400">{results.conversionRates.primary}%</div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <div className="text-sm text-gray-400 mb-1">زائر إلى عميل</div>
                        <div className="text-xl font-bold text-blue-400">{results.conversionRates.visitorToCustomer}%</div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <div className="text-sm text-gray-400 mb-1">تقييم الأداء</div>
                        <div className={`text-xl font-bold ${getScoreColor(parseInt(results.overallScore))}`}>
                          {getScoreLabel(parseInt(results.overallScore))}
                        </div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <div className="text-sm text-gray-400 mb-1">معدل المغادرة</div>
                        <div className="text-xl font-bold text-orange-400">{results.funnelDropOff.overall}%</div>
                      </div>
                    </div>

                    {/* Detailed Conversion Rates */}
                    <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                      <h4 className="text-lg font-bold text-white mb-4">معدلات التحويل التفصيلية</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">زائر إلى عميل محتمل</span>
                          <span className="font-bold text-green-400">{results.conversionRates.visitorToLead}%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">عميل محتمل إلى عميل</span>
                          <span className="font-bold text-blue-400">{results.conversionRates.leadToCustomer}%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">زائر إلى عميل</span>
                          <span className="font-bold text-purple-400">{results.conversionRates.visitorToCustomer}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Funnel Metrics */}
                    <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                      <h4 className="text-lg font-bold text-white mb-4">مقاييس القمع</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-gray-400 mb-1">معدل الارتداد</div>
                          <div className="text-lg font-bold text-red-400">{results.funnelMetrics.bounceRate}%</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-400 mb-1">صفحات لكل جلسة</div>
                          <div className="text-lg font-bold text-cyan-400">{results.funnelMetrics.pagesPerSession}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-400 mb-1">مغادرة الزوار</div>
                          <div className="text-lg font-bold text-orange-400">{results.funnelDropOff.visitorToLead}%</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-400 mb-1">مغادرة العملاء المحتملين</div>
                          <div className="text-lg font-bold text-pink-400">{results.funnelDropOff.leadToCustomer}%</div>
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
                  <Award className="w-5 h-5 text-cyan-400" />
                  لماذا هذه الأداة؟
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-3">
                <p>تساعدك هذه الأداة على:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    تحليل قمع التحويل الخاص بك بالتفصيل
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    تحديد نقاط الضعف والفرص للتحسين
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    قياس جودة حركة المرور والمشاركة
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    تحسين معدلات التحويل بشكل استراتيجي
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-cyan-400" />
                  معايير الصناعة
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-3">
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <h4 className="font-bold text-cyan-400 mb-1">التجارة الإلكترونية</h4>
                  <p className="text-sm">معدل تحويل متوسط: 2-3%</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <h4 className="font-bold text-cyan-400 mb-1">البرمجيات كخدمة</h4>
                  <p className="text-sm">معدل تحويل متوسط: 5-7%</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <h4 className="font-bold text-cyan-400 mb-1">الخدمات المحلية</h4>
                  <p className="text-sm">معدل تحويل متوسط: 10-15%</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                  <Download className="w-5 h-5 text-cyan-400" />
                  موارد إضافية
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 justify-start">
                  <ArrowRight className="w-4 h-4 ml-2" />
                  دليل تحسين التحويلات
                </Button>
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 justify-start">
                  <ArrowRight className="w-4 h-4 ml-2" />
                  تحليل القمع التسويقي
                </Button>
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 justify-start">
                  <ArrowRight className="w-4 h-4 ml-2" />
                  استراتيجيات التحسين
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </RTLWrapper>
  )
}