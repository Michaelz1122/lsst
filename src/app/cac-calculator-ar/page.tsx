'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import RTLWrapper from '@/components/RTLWrapper'
import FlexibleInput from '@/components/ui/FlexibleInput'
import EnhancedResultsDisplay from '@/components/ui/EnhancedResultsDisplay'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
  RefreshCw,
  Star,
  Lightbulb
} from 'lucide-react'

export default function CACCalculatorArabic() {
  const [formData, setFormData] = useState({
    totalAdSpend: '',
    totalLeads: '',
    totalCustomers: '',
    salesTeamCosts: '',
    marketingTeamCosts: '',
    overheadCosts: '',
    timePeriod: 'monthly',
    industry: '',
    avgCustomerValue: ''
  })

  const [results, setResults] = useState<any>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const industries = [
    'التجارة الإلكترونية', 'البرمجيات كخدمة', 'الأعمال المحلية', 'الرعاية الصحية', 'التعليم', 
    'العقارات', 'التمويل', 'السفر والسياحة', 'المطاعم والمشروبات', 'أخرى'
  ]

  const timePeriods = [
    { value: 'monthly', label: 'شهري' },
    { value: 'quarterly', label: 'ربع سنوي' },
    { value: 'yearly', label: 'سنوي' }
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const calculateCAC = () => {
    const totalAdSpend = parseFloat(formData.totalAdSpend) || 0
    const totalLeads = parseFloat(formData.totalLeads) || 0
    const totalCustomers = parseFloat(formData.totalCustomers) || 0
    const salesTeamCosts = parseFloat(formData.salesTeamCosts) || 0
    const marketingTeamCosts = parseFloat(formData.marketingTeamCosts) || 0
    const overheadCosts = parseFloat(formData.overheadCosts) || 0
    const avgCustomerValue = parseFloat(formData.avgCustomerValue) || 0

    // Calculate CAC
    const totalMarketingCosts = totalAdSpend + marketingTeamCosts + overheadCosts
    const totalSalesCosts = salesTeamCosts
    const totalAcquisitionCosts = totalMarketingCosts + totalSalesCosts
    
    const cac = totalCustomers > 0 ? totalAcquisitionCosts / totalCustomers : 0
    const marketingCAC = totalCustomers > 0 ? totalMarketingCosts / totalCustomers : 0
    const salesCAC = totalCustomers > 0 ? totalSalesCosts / totalCustomers : 0
    
    // Calculate Lead to Customer Rate
    const leadToCustomerRate = totalLeads > 0 ? (totalCustomers / totalLeads) * 100 : 0
    const costPerLead = totalLeads > 0 ? totalMarketingCosts / totalLeads : 0
    
    // Calculate ROI and Payback Period
    const customerLTV = avgCustomerValue || (cac * 3) // Estimate LTV if not provided
    const roi = cac > 0 ? ((customerLTV - cac) / cac) * 100 : 0
    const paybackPeriod = cac > 0 && avgCustomerValue > 0 ? cac / avgCustomerValue : 0
    
    // Calculate efficiency scores
    const cacScore = cac <= customerLTV * 0.3 ? 100 : cac <= customerLTV * 0.5 ? 80 : cac <= customerLTV * 0.7 ? 60 : cac <= customerLTV ? 40 : 20
    const conversionScore = leadToCustomerRate >= 10 ? 100 : leadToCustomerRate >= 5 ? 80 : leadToCustomerRate >= 2 ? 60 : leadToCustomerRate >= 1 ? 40 : 20
    const roiScore = roi >= 200 ? 100 : roi >= 100 ? 80 : roi >= 50 ? 60 : roi >= 0 ? 40 : 20
    
    const overallScore = (cacScore + conversionScore + roiScore) / 3

    // Generate recommendations
    const recommendations = []
    const strengths = []

    if (cac <= customerLTV * 0.3) {
      strengths.push('تكلفة اكتساب العملاء ممتازة وفعالة')
    } else if (cac <= customerLTV * 0.5) {
      strengths.push('تكلفة اكتساب العملاء جيدة')
    } else if (cac <= customerLTV * 0.7) {
      recommendations.push('يمكن تحسين تكلفة اكتساب العملاء')
    } else if (cac <= customerLTV) {
      recommendations.push('تكلفة اكتساب العملاء مرتفعة - راجع استراتيجيات التسويق')
    } else {
      recommendations.push('تكلفة اكتساب العملاء أعلى من قيمة العميل - إجراء فوري مطلوب')
    }

    if (leadToCustomerRate >= 10) {
      strengths.push('معدل تحويل العملاء ممتاز')
    } else if (leadToCustomerRate >= 5) {
      strengths.push('معدل تحويل العملاء جيد')
    } else if (leadToCustomerRate >= 2) {
      recommendations.push('حسن عملية تحويل العملاء المحتملين')
    } else {
      recommendations.push('معدل تحويل العملاء منخفض - ركز على تحسين جودة العملاء المحتملين')
    }

    if (roi >= 200) {
      strengths.push('عائد استثمار ممتاز على اكتساب العملاء')
    } else if (roi >= 100) {
      strengths.push('عائد استثمار جيد على اكتساب العملاء')
    } else if (roi >= 50) {
      recommendations.push('ركز على زيادة قيمة العميل لتحسين العائد')
    } else {
      recommendations.push('عائد استثمار منخفض - راجع نموذج التسعير واستراتيجية اكتساب العملاء')
    }

    return {
      content: generateCACContent({
        cac, marketingCAC, salesCAC, costPerLead, leadToCustomerRate, roi, paybackPeriod,
        totalMarketingCosts, totalSalesCosts, totalAcquisitionCosts,
        industry: formData.industry || 'صناعة غير محددة',
        timePeriod: formData.timePeriod
      }),
      metrics: [
        {
          label: 'تكلفة اكتساب العميل (CAC)',
          value: formatCurrency(cac.toString()),
          color: cac <= customerLTV * 0.5 ? '#22c55e' : cac <= customerLTV ? '#eab308' : '#ef4444',
          icon: <Users className="w-4 h-4" />
        },
        {
          label: 'تكلفة العميل التسويقية',
          value: formatCurrency(marketingCAC.toString()),
          color: marketingCAC <= customerLTV * 0.3 ? '#22c55e' : marketingCAC <= customerLTV * 0.5 ? '#eab308' : '#ef4444',
          icon: <DollarSign className="w-4 h-4" />
        },
        {
          label: 'تكلفة العميل البيعية',
          value: formatCurrency(salesCAC.toString()),
          color: salesCAC <= customerLTV * 0.2 ? '#22c55e' : salesCAC <= customerLTV * 0.4 ? '#eab308' : '#ef4444',
          icon: <Target className="w-4 h-4" />
        },
        {
          label: 'تكلفة العميل المحتمل',
          value: formatCurrency(costPerLead.toString()),
          color: costPerLead <= cac * 0.5 ? '#22c55e' : costPerLead <= cac ? '#eab308' : '#ef4444',
          icon: <BarChart3 className="w-4 h-4" />
        },
        {
          label: 'معدل تحويل العميل (%)',
          value: leadToCustomerRate.toFixed(1) + '%',
          color: leadToCustomerRate >= 5 ? '#22c55e' : leadToCustomerRate >= 2 ? '#eab308' : '#ef4444',
          icon: <TrendingUp className="w-4 h-4" />
        },
        {
          label: 'العائد على الاستثمار (%)',
          value: roi.toFixed(1) + '%',
          color: roi >= 100 ? '#22c55e' : roi >= 50 ? '#eab308' : '#ef4444',
          icon: <PieChart className="w-4 h-4" />
        }
      ],
      recommendations,
      strengths,
      score: Math.round(overallScore)
    }
  }

  const generateCACContent = (data: any) => {
    return `
### 📊 تحليل تكلفة اكتساب العملاء (CAC)

#### 🎯 نظرة عامة
- **الصناعة**: ${data.industry}
- **الفترة**: ${data.timePeriod === 'monthly' ? 'شهري' : data.timePeriod === 'quarterly' ? 'ربع سنوي' : 'سنوي'}
- **تكلفة اكتساب العميل الإجمالية**: ${formatCurrency(data.cac.toString())}

#### 💰 تحليل التكاليف
**📈 التكاليف التسويقية**
- إجمالي التكاليف التسويقية: ${formatCurrency(data.totalMarketingCosts.toString())}
- تكلفة العميل التسويقية: ${formatCurrency(data.marketingCAC.toString())}
- تكلفة العميل المحتمل: ${formatCurrency(data.costPerLead.toString())}

**🎯 التكاليف البيعية**
- إجمالي التكاليف البيعية: ${formatCurrency(data.totalSalesCosts.toString())}
- تكلفة العميل البيعية: ${formatCurrency(data.salesCAC.toString())}

**📊 التكلفة الإجمالية**
- إجمالي تكاليف الاكتساب: ${formatCurrency((parseFloat(data.totalMarketingCosts) + parseFloat(data.totalSalesCosts)).toString())}
- تكلفة اكتساب العميل (CAC): ${formatCurrency(data.cac.toString())}

#### 🔄 تحليل التحويل
- إجمالي العملاء المحتملين: ${data.totalLeads || 'غير محدد'}
- إجمالي العملاء: ${data.totalCustomers || 'غير محدد'}
- معدل تحويل العميل: ${data.leadToCustomerRate}%
- تكلفة كل عميل محتمل: ${formatCurrency(data.costPerLead.toString())}

#### 📈 تحليل الربحية
- العائد على الاستثمار: ${data.roi}%
- فترة استرداد التكاليف: ${data.paybackPeriod} فترة
- تكلفة اكتساب العميل مقابل القيمة: ${data.cac <= (data.avgCustomerValue || data.cac * 3) * 0.5 ? 'منخفضة' : 'مرتفعة'}

#### 🏆 تقييم الأداء
${data.cac <= (data.avgCustomerValue || data.cac * 3) * 0.3 ? '🌟 **CAC ممتاز**: تكلفة اكتساب عملاء فعالة جداً' : ''}
${data.cac <= (data.avgCustomerValue || data.cac * 3) * 0.5 && data.cac > (data.avgCustomerValue || data.cac * 3) * 0.3 ? '✅ **CAC جيد**: تكلفة اكتساب عملاء معقولة' : ''}
${data.cac <= (data.avgCustomerValue || data.cac * 3) && data.cac > (data.avgCustomerValue || data.cac * 3) * 0.5 ? '⚠️ **CAC مقبول**: هناك مجال للتحسين' : ''}
${data.cac > (data.avgCustomerValue || data.cac * 3) ? '❌ **CAC ضعيف**: تكلفة اكتساب عملاء أعلى من القيمة' : ''}

${data.leadToCustomerRate >= 10 ? '🌟 **تحويل ممتاز**: معدل تحويل عملاء عالي جداً' : ''}
${data.leadToCustomerRate >= 5 && data.leadToCustomerRate < 10 ? '✅ **تحويل جيد**: معدل تحويل عملاء جيد' : ''}
${data.leadToCustomerRate >= 2 && data.leadToCustomerRate < 5 ? '⚠️ **تحويل مقبول**: يمكن تحسين معدل التحويل' : ''}
${data.leadToCustomerRate < 2 ? '❌ **تحويل ضعيف**: معدل تحويل عملاء منخفض' : ''}

#### 📋 توصيات التحسين
- ركز على تحسين جودة العملاء المحتملين لزيادة معدل التحويل
- اختبر قنوات تسويق مختلفة لتقليل تكلفة اكتساب العملاء
- حسّن كفاءة فريق المبيعات لتقليل تكاليف الاكتساب البيعية
- راقب مقاييس الأداء بانتظام وعدل الاستراتيجية حسب النتائج

#### 🔍 الخطوات التالية
1. **تحليل الجمهور**: افهم بشكل أفضل من هم عملاؤك الأكثر قيمة
2. **تحسين التسويق**: اختبر قنوات وإبداعات مختلفة
3. **تحسين المبيعات**: درّب فريق المبيعات على تحسين معدلات التحويل
4. **قياس النتائج**: تتبع CAC ومقاييس الأداء الرئيسية بانتظام
    `.trim()
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
      totalAdSpend: '',
      totalLeads: '',
      totalCustomers: '',
      salesTeamCosts: '',
      marketingTeamCosts: '',
      overheadCosts: '',
      timePeriod: 'monthly',
      industry: '',
      avgCustomerValue: ''
    })
    setResults(null)
  }

  return (
    <RTLWrapper language="ar" className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <Navigation currentPath="/cac-calculator-ar" />

      <div className="relative z-40 container mx-auto px-6 pt-24 pb-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 px-6 py-3 rounded-full mb-6 backdrop-blur-sm border border-blue-500/30">
            <Calculator className="w-5 h-5" />
            <span className="text-sm font-medium">حاسبة تكلفة اكتساب العملاء</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
            حاسبة تكلفة اكتساب العملاء (CAC)
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            احسب تكلفة اكتساب العملاء، حلل كفاءة حملاتك التسويقية، واكتشف الفرص لتحسين عائد استثمارك في التسويق والمبيعات.
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
                  بيانات اكتساب العملاء
                </CardTitle>
                <p className="text-gray-300">
                  أدخل بيانات تسويقك ومبيعاتك لحساب تكلفة اكتساب العملاء وتحليل الأداء
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                {!results ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Marketing Costs */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-blue-400 mb-3">التكاليف التسويقية</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <FlexibleInput
                          label="إجمالي الإنفاق الإعلاني"
                          value={formData.totalAdSpend}
                          onChange={(value) => handleInputChange('totalAdSpend', value)}
                          type="currency"
                          placeholder="10000"
                          required
                          language="ar"
                        />
                        
                        <FlexibleInput
                          label="تكاليف فريق التسويق"
                          value={formData.marketingTeamCosts}
                          onChange={(value) => handleInputChange('marketingTeamCosts', value)}
                          type="currency"
                          placeholder="5000"
                          language="ar"
                        />
                      </div>
                      
                      <FlexibleInput
                        label="التكاليف العامة (overhead)"
                        value={formData.overheadCosts}
                        onChange={(value) => handleInputChange('overheadCosts', value)}
                        type="currency"
                        placeholder="2000"
                        language="ar"
                      />
                    </div>

                    {/* Sales Costs */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-purple-400 mb-3">التكاليف البيعية</h3>
                      <FlexibleInput
                        label="تكاليف فريق المبيعات"
                        value={formData.salesTeamCosts}
                        onChange={(value) => handleInputChange('salesTeamCosts', value)}
                        type="currency"
                        placeholder="8000"
                        language="ar"
                      />
                    </div>

                    {/* Results */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-green-400 mb-3">النتائج</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <FlexibleInput
                          label="إجمالي العملاء المحتملين (Leads)"
                          value={formData.totalLeads}
                          onChange={(value) => handleInputChange('totalLeads', value)}
                          type="number"
                          placeholder="500"
                          required
                          language="ar"
                        />
                        
                        <FlexibleInput
                          label="إجمالي العملاء"
                          value={formData.totalCustomers}
                          onChange={(value) => handleInputChange('totalCustomers', value)}
                          type="number"
                          placeholder="50"
                          required
                          language="ar"
                        />
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-yellow-400 mb-3">معلومات إضافية</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <FlexibleInput
                          label="متوسط قيمة العميل"
                          value={formData.avgCustomerValue}
                          onChange={(value) => handleInputChange('avgCustomerValue', value)}
                          type="currency"
                          placeholder="1500"
                          language="ar"
                        />
                        
                        <FlexibleInput
                          label="الصناعة"
                          value={formData.industry}
                          onChange={(value) => handleInputChange('industry', value)}
                          type="text"
                          options={industries}
                          language="ar"
                        />
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button
                        type="submit"
                        disabled={isCalculating || !formData.totalAdSpend || !formData.totalLeads || !formData.totalCustomers}
                        className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {isCalculating ? (
                          <>
                            <RefreshCw className="w-4 h-4 ml-2 animate-spin" />
                            جاري الحساب...
                          </>
                        ) : (
                          <>
                            <Calculator className="w-4 h-4 ml-2" />
                            احسب CAC
                          </>
                        )}
                      </Button>
                      <Button
                        type="button"
                        onClick={resetForm}
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10 font-medium py-3 px-6 rounded-lg transition-all duration-300"
                      >
                        <RefreshCw className="w-4 h-4 ml-2" />
                        إعادة تعيين
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">
                      تم حساب تكلفة اكتساب العملاء بنجاح
                    </h3>
                    <p className="text-gray-400">
                      يمكنك عرض النتائج التفصيلية في الجانب الأيمن أو إعادة تعيين النموذج لحساب جديد
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-1"
          >
            {results && (
              <EnhancedResultsDisplay
                title="تحليل تكلفة اكتساب العملاء"
                results={results}
                language="ar"
                toolType="cac-calculator"
              />
            )}

            {!results && (
              <Card className="bg-white/5 backdrop-blur-md border-white/10 shadow-2xl">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    جاهز لحساب CAC
                  </h3>
                  <p className="text-gray-400 mb-6">
                    أدخل بيانات تسويقك ومبيعاتك واحصل على تحليل مفصل لتكلفة اكتساب العملاء والتوصيات الذكية
                  </p>
                  <div className="space-y-3 text-left">
                    <div className="flex items-center gap-3 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>تحليل شامل لتكاليف الاكتساب</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>تقييم كفاءة التحويل</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>توصيات ذكية مخصصة</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>تصدير النتائج بصيغ متعددة</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </RTLWrapper>
  )
}