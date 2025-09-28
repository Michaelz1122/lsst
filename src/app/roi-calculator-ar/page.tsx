'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import RTLWrapper from '@/components/RTLWrapper'
import FlexibleInput from '@/components/ui/FlexibleInput'
import EnhancedResultsDisplay from '@/components/ui/EnhancedResultsDisplay'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
  RefreshCw,
  Star,
  Lightbulb
} from 'lucide-react'

export default function ROICalculatorArabic() {
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
    'التجارة الإلكترونية', 'البرمجيات كخدمة', 'الأعمال المحلية', 'الرعاية الصحية', 'التعليم', 
    'العقارات', 'التمويل', 'السفر والسياحة', 'المطاعم والمشروبات', 'أخرى'
  ]

  const channels = [
    'إعلانات فيسبوك', 'إعلانات جوجل', 'إنستغرام', 'لينكدإن', 'تيك توك',
    'التسويق عبر البريد', 'السيو', 'تسويق المحتوى', 'تسويق المؤثرين', 'أخرى'
  ]

  const platforms = [
    'فيسبوك', 'جوجل', 'إنستغرام', 'تيك توك', 'لينكدإن', 'بنترست', 'سناب شات', 'يوتيوب'
  ]

  const durations = [
    '7', '15', '30', '60', '90'
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
      strengths.push('أداء ROAS ممتاز')
    } else if (roas >= 3) {
      strengths.push('أداء ROAS جيد')
    } else if (roas >= 2) {
      recommendations.push('ROAS مقبول ولكن يمكن تحسينه')
    } else if (roas >= 1) {
      recommendations.push('ROAS أقل من المتوسط - قم بتحسين استهداف الحملة')
    } else {
      recommendations.push('الحملة غير مربحة - فكر في إيقافها أو إجراء تغييرات كبيرة')
    }

    if (profitMargin >= 50) {
      strengths.push('هوامش ربح استثنائية')
    } else if (profitMargin >= 30) {
      strengths.push('هوامش ربح صحية')
    } else if (profitMargin >= 15) {
      recommendations.push('يمكن تحسين هوامش الربح')
    } else if (profitMargin >= 0) {
      recommendations.push('هوامش ربح منخفضة - راجع التسعير أو التكاليف')
    } else {
      recommendations.push('الحملة تخسر أموالاً - إجراء فوري مطلوب')
    }

    if (dailyROAS >= 3) {
      strengths.push('أداء يومي متسق')
    } else if (dailyROAS < roas * 0.8) {
      recommendations.push('الأداء اليومي غير متسق - حلل الاتجاهات')
    }

    return {
      content: generateROASContent({
        roas, profit, profitMargin, dailyAdSpend, dailyRevenue, dailyROAS,
        campaignName: roasData.campaignName || 'حملة غير مسماة',
        platform: roasData.platform || 'منصة غير محددة',
        duration: roasData.duration
      }),
      metrics: [
        {
          label: 'العائد على إنفاق الإعلانات',
          value: roas.toFixed(2) + 'x',
          color: roas >= 3 ? '#22c55e' : roas >= 2 ? '#eab308' : '#ef4444',
          icon: <TrendingUp className="w-4 h-4" />
        },
        {
          label: 'صافي الربح',
          value: formatCurrency(profit.toString()),
          color: profit >= 0 ? '#22c55e' : '#ef4444',
          icon: <DollarSign className="w-4 h-4" />
        },
        {
          label: 'هامش الربح',
          value: profitMargin.toFixed(1) + '%',
          color: profitMargin >= 30 ? '#22c55e' : profitMargin >= 15 ? '#eab308' : '#ef4444',
          icon: <PieChart className="w-4 h-4" />
        },
        {
          label: 'متوسط الإنفاق اليومي',
          value: formatCurrency(dailyAdSpend.toString()),
          icon: <BarChart3 className="w-4 h-4" />
        },
        {
          label: 'متوسط الإيرادات اليومية',
          value: formatCurrency(dailyRevenue.toString()),
          icon: <TrendingUp className="w-4 h-4" />
        },
        {
          label: 'درجة الكفاءة',
          value: efficiencyScore.toFixed(0) + '/100',
          color: efficiencyScore >= 80 ? '#22c55e' : efficiencyScore >= 60 ? '#eab308' : '#ef4444',
          icon: <Star className="w-4 h-4" />
        }
      ],
      recommendations,
      strengths,
      score: Math.round(efficiencyScore)
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
      strengths.push('أداء ROI ممتاز')
    } else if (roi >= 100) {
      strengths.push('أداء ROI جيد')
    } else if (roi > 0) {
      recommendations.push('ركز على تحسين معدلات التحويل لزيادة ROI')
    } else {
      recommendations.push('الحملة غير مربحة - فكر في الإيقاف أو التحسين')
    }

    if (roas >= 3) {
      strengths.push('عائد قوي على إنفاق الإعلانات')
    } else if (roas >= 2) {
      recommendations.push('حسن الإعلانات الإبداعية والاستهداف لتحسين ROAS')
    } else {
      recommendations.push('تحسين كبير مطلوب في أداء الإعلانات')
    }

    if (cac <= averageOrderValue * 0.3) {
      strengths.push('تكلفة اكتساب العملاء فعالة')
    } else if (cac <= averageOrderValue * 0.5) {
      recommendations.push('اعمل على تقليل تكلفة اكتساب العملاء')
    } else {
      recommendations.push('تكلفة اكتساب العملاء مرتفعة جداً - راجع الاستهداف والمزايدة')
    }

    if (conversionRate >= 5) {
      strengths.push('معدل تحويل قوي')
    } else if (conversionRate >= 2) {
      recommendations.push('حسن صفحات الهبوط ونصوص الإعلانات لتحسين التحويلات')
    } else {
      recommendations.push('معدل التحويل يحتاج إلى تحسين كبير')
    }

    return {
      content: generateROIContent({
        roi, roas, cac, breakEvenOrders, monthlyRevenue, monthlyProfit, netProfit,
        industry: formData.industry || 'صناعة غير محددة',
        channel: formData.marketingChannel || 'قناة غير محددة'
      }),
      metrics: [
        {
          label: 'العائد على الاستثمار',
          value: roi.toFixed(1) + '%',
          color: roi >= 100 ? '#22c55e' : roi >= 50 ? '#eab308' : '#ef4444',
          icon: <TrendingUp className="w-4 h-4" />
        },
        {
          label: 'العائد على إنفاق الإعلانات',
          value: roas.toFixed(2) + 'x',
          color: roas >= 3 ? '#22c55e' : roas >= 2 ? '#eab308' : '#ef4444',
          icon: <BarChart3 className="w-4 h-4" />
        },
        {
          label: 'تكلفة اكتساب العميل',
          value: formatCurrency(cac.toString()),
          color: cac <= averageOrderValue * 0.5 ? '#22c55e' : cac <= averageOrderValue ? '#eab308' : '#ef4444',
          icon: <Users className="w-4 h-4" />
        },
        {
          label: 'الإيرادات الشهرية',
          value: formatCurrency(monthlyRevenue.toString()),
          color: '#3b82f6',
          icon: <DollarSign className="w-4 h-4" />
        },
        {
          label: 'صافي الربح الشهري',
          value: formatCurrency(netProfit.toString()),
          color: netProfit >= 0 ? '#22c55e' : '#ef4444',
          icon: <PieChart className="w-4 h-4" />
        },
        {
          label: 'طلبات التعادل',
          value: Math.ceil(breakEvenOrders).toString(),
          color: breakEvenOrders <= monthlyOrders ? '#22c55e' : '#ef4444',
          icon: <Target className="w-4 h-4" />
        }
      ],
      recommendations,
      strengths,
      score: Math.round(overallScore)
    }
  }

  const generateROIContent = (data: any) => {
    return `
### 📊 تحليل أداء الاستثمار التسويقي

#### 🎯 نظرة عامة على الحملة
- **الصناعة**: ${data.industry}
- **قناة التسويق**: ${data.channel}
- **العائد على الاستثمار**: ${data.roi.toFixed(1)}%
- **العائد على إنفاق الإعلانات**: ${data.roas.toFixed(2)}x

#### 💰 التحليل المالي
**📈 الإيرادات والأرباح**
- الإيرادات الشهرية: ${formatCurrency(data.monthlyRevenue.toString())}
- صافي الربح الشهري: ${formatCurrency(data.netProfit.toString())}
- هامش الربح الصافي: ${data.netProfit > 0 ? ((data.netProfit / data.monthlyRevenue) * 100).toFixed(1) : 0}%

**🎯 تكاليف اكتساب العملاء**
- تكلفة اكتساب العميل (CAC): ${formatCurrency(data.cac.toString())}
- عدد الطلبات المطلوبة للتعادل: ${Math.ceil(data.breakEvenOrders)} طلب

#### 🏆 تقييم الأداء
${data.roi >= 200 ? '✅ **أداء استثنائي**: عائد استثمار ممتاز يفوق معايير الصناعة' : ''}
${data.roi >= 100 && data.roi < 200 ? '✅ **أداء جيد**: عائد استثمار إيجابي ومستقر' : ''}
${data.roi > 0 && data.roi < 100 ? '⚠️ **أداء مقبول**: هناك مجال للتحسين في العائد' : ''}
${data.roi <= 0 ? '❌ **أداء ضعيف**: الحملة غير مربحة وتحتاج إلى مراجعة' : ''}

${data.roas >= 3 ? '✅ **ROAS ممتاز**: عائد قوي على إنفاق الإعلانات' : ''}
${data.roas >= 2 && data.roas < 3 ? '✅ **ROAS جيد**: أداء إعلاني مقبول' : ''}
${data.roas >= 1 && data.roas < 2 ? '⚠️ **ROAS يحتاج تحسين**: يمكن تحسين أداء الإعلانات' : ''}
${data.roas < 1 ? '❌ **ROAS ضعيف**: الإنفاق الإعلاني يتجاوز الإيرادات' : ''}

#### 📋 توصيات التحسين
- راقب أداء الحملة بانتظام وقم بتعديل الميزانية حسب النتائج
- اختبر إبداعات إعلانية مختلفة لتحسين معدلات التحويل
- استهدف شرائح جمهور أكثر دقة لتحسين تكلفة اكتساب العميل
- فكر في توسيع القنوات الناجحة وتقليل الإنفاق على القنوات الأقل أداءً

#### 🔍 الخطوات التالية
1. **تحليل الجمهور**: افهم بشكل أفضل من هم عملاؤك الأكثر قيمة
2. **تحسين الإعلانات**: اختبر عناصر إبداعية ورسائل مختلفة
3. **تحسين التحويل**: حسّن صفحات الهبوط لتقليل تكلفة اكتساب العميل
4. **قياس النتائج**: تتبع المقاييس الرئيسية بانتظام واتخذ قرارات مبنية على البيانات
    `.trim()
  }

  const generateROASContent = (data: any) => {
    return `
### 📊 تحليل أداء الإعلانات (ROAS)

#### 🎯 معلومات الحملة
- **اسم الحملة**: ${data.campaignName}
- **المنصة**: ${data.platform}
- **المدة**: ${data.duration} يوم
- **العائد على إنفاق الإعلانات**: ${data.roas.toFixed(2)}x

#### 💰 الأداء المالي
**📈 الإيرادات والتكاليف**
- إجمالي الإيرادات: ${formatCurrency(data.revenue.toString())}
- إجمالي الإنفاق: ${formatCurrency(data.adSpend.toString())}
- صافي الربح: ${formatCurrency(data.profit.toString())}
- هامش الربح: ${data.profitMargin.toFixed(1)}%

**📊 الأداء اليومي**
- متوسط الإنفاق اليومي: ${formatCurrency(data.dailyAdSpend.toString())}
- متوسط الإيرادات اليومية: ${formatCurrency(data.dailyRevenue.toString())}
- ROAS اليومي: ${data.dailyROAS.toFixed(2)}x

#### 🏆 تقييم الأداء
${data.roas >= 4 ? '🌟 **أداء استثنائي**: ROAS ممتاز يفوق توقعات الصناعة' : ''}
${data.roas >= 3 && data.roas < 4 ? '✅ **أداء جيد**: ROAS صحي ومربح' : ''}
${data.roas >= 2 && data.roas < 3 ? '⚠️ **أداء مقبول**: هناك مجال للتحسين' : ''}
${data.roas >= 1 && data.roas < 2 ? '⚠️ **أداء ضعيف**: هوامش ربح منخفضة' : ''}
${data.roas < 1 ? '❌ **أداء سيء**: الحملة تخسر المال' : ''}

${data.profitMargin >= 50 ? '💎 **هوامش ربح استثنائية**: ربحية ممتازة' : ''}
${data.profitMargin >= 30 && data.profitMargin < 50 ? '✅ **هوامش ربح صحية**: أداء مالي جيد' : ''}
${data.profitMargin >= 15 && data.profitMargin < 30 ? '⚠️ **هوامش ربح مقبولة**: يمكن تحسينها' : ''}
${data.profitMargin >= 0 && data.profitMargin < 15 ? '⚠️ **هوامش ربح منخفضة**: راجع التسعير' : ''}
${data.profitMargin < 0 ? '❌ **خسارة**: الحملة غير مربحة' : ''}

#### 📋 توصيات التحسين
- قم بتحليل الإعلانات الأعلى أداءً وزيادة ميزانيتها
- اختبر جماهير مختلفة لتحسين الاستهداف
- راقب الأداء اليومي وتأكد من الاستقرار
- فكر في تغيير الإبداعات إذا كان الأداء ضعيفاً

#### 🔍 الخطوات التالية
1. **تحليل الإعلانات**: حدد الإعلانات الأعلى ROAS
2. **تحسين الاستهداف**: ضبط الجمهور وال demographics
3. **اختبار A/B**: جرب عناصر إبداعية مختلفة
4. **مراقبة الأداء**: تتبع التغيرات اليومية والأسبوعية
    `.trim()
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

  const resetForm = () => {
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
    setRoasData({
      adSpend: '',
      revenue: '',
      campaignName: '',
      platform: '',
      duration: '30'
    })
    setResults(null)
    setRoasResults(null)
  }

  return (
    <RTLWrapper language="ar" className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <Navigation currentPath="/roi-calculator-ar" />

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
            <span className="text-sm font-medium">حاسبات التسويق</span>
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
                حاسبة العائد على الاستثمار
              </button>
              <button
                onClick={() => setActiveTab('roas')}
                className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === 'roas'
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                حاسبة العائد على إنفاق الإعلانات
              </button>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            {activeTab === 'roi' ? 'حاسبة العائد على الاستثمار التسويقي' : 'حاسبة العائد على إنفاق الإعلانات'}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {activeTab === 'roi' 
              ? 'احسب عائدك على الاستثمار، حلل أداء الحملة، واكتشف الفرص لتعظيم فعالية تسويقك.'
              : 'احسب عائدك على إنفاق الإعلانات، قس ربحية الحملة، وحسن استثمارك الإعلاني لأقصى عائد.'
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
            <Card className="bg-white/5 backdrop-blur-md border-white/10 shadow-2xl">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-bold text-white mb-2">
                  {activeTab === 'roi' ? 'بيانات الحملة' : 'بيانات أداء الإعلانات'}
                </CardTitle>
                <p className="text-gray-300">
                  {activeTab === 'roi' 
                    ? 'أدخل مقاييس حملتك لحساب العائد على الاستثمار والأداء'
                    : 'أدخل بيانات إعلاناتك لحساب العائد على إنفاق الإعلانات والربحية'
                  }
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {activeTab === 'roi' ? (
                    !results ? (
                      <>
                        {/* Basic Metrics */}
                        <div className="grid md:grid-cols-2 gap-6">
                          <FlexibleInput
                            label="الإنفاق الإعلاني الشهري"
                            value={formData.monthlyAdSpend}
                            onChange={(value) => handleInputChange('monthlyAdSpend', value)}
                            type="currency"
                            placeholder="5000"
                            required
                            language="ar"
                          />
                          
                          <FlexibleInput
                            label="متوسط قيمة الطلب"
                            value={formData.averageOrderValue}
                            onChange={(value) => handleInputChange('averageOrderValue', value)}
                            type="currency"
                            placeholder="250"
                            required
                            language="ar"
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <FlexibleInput
                            label="الطلبات الشهرية"
                            value={formData.monthlyOrders}
                            onChange={(value) => handleInputChange('monthlyOrders', value)}
                            type="number"
                            placeholder="100"
                            required
                            language="ar"
                          />
                          
                          <FlexibleInput
                            label="معدل التحويل (%)"
                            value={formData.conversionRate}
                            onChange={(value) => handleInputChange('conversionRate', value)}
                            type="percentage"
                            placeholder="2.5"
                            language="ar"
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <FlexibleInput
                            label="هامش الربح (%)"
                            value={formData.profitMargin}
                            onChange={(value) => handleInputChange('profitMargin', value)}
                            type="percentage"
                            placeholder="30"
                            language="ar"
                          />
                          
                          <FlexibleInput
                            label="قيمة العميل مدى الحياة"
                            value={formData.customerLifetimeValue}
                            onChange={(value) => handleInputChange('customerLifetimeValue', value)}
                            type="currency"
                            placeholder="1000"
                            language="ar"
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <FlexibleInput
                            label="الصناعة"
                            value={formData.industry}
                            onChange={(value) => handleInputChange('industry', value)}
                            type="text"
                            options={industries}
                            language="ar"
                          />
                          
                          <FlexibleInput
                            label="قناة التسويق"
                            value={formData.marketingChannel}
                            onChange={(value) => handleInputChange('marketingChannel', value)}
                            type="text"
                            options={channels}
                            language="ar"
                          />
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-8">
                        <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">
                          تم حساب العائد على الاستثمار بنجاح
                        </h3>
                        <p className="text-gray-400">
                          يمكنك عرض النتائج التفصيلية في الجانب الأيمن أو إعادة تعيين النموذج لحساب جديد
                        </p>
                      </div>
                    )
                  ) : (
                    !roasResults ? (
                      <>
                        {/* ROAS Form */}
                        <div className="grid md:grid-cols-2 gap-6">
                          <FlexibleInput
                            label="الإنفاق الإعلاني"
                            value={roasData.adSpend}
                            onChange={(value) => handleRoasChange('adSpend', value)}
                            type="currency"
                            placeholder="5000"
                            required
                            language="ar"
                          />
                          
                          <FlexibleInput
                            label="الإيرادات"
                            value={roasData.revenue}
                            onChange={(value) => handleRoasChange('revenue', value)}
                            type="currency"
                            placeholder="15000"
                            required
                            language="ar"
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <FlexibleInput
                            label="اسم الحملة"
                            value={roasData.campaignName}
                            onChange={(value) => handleRoasChange('campaignName', value)}
                            type="text"
                            placeholder="حملة رمضان 2024"
                            language="ar"
                          />
                          
                          <FlexibleInput
                            label="المنصة"
                            value={roasData.platform}
                            onChange={(value) => handleRoasChange('platform', value)}
                            type="text"
                            options={platforms}
                            language="ar"
                          />
                        </div>

                        <FlexibleInput
                          label="مدة الحملة (أيام)"
                          value={roasData.duration}
                          onChange={(value) => handleRoasChange('duration', value)}
                          type="number"
                          options={durations}
                          language="ar"
                        />
                      </>
                    ) : (
                      <div className="text-center py-8">
                        <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">
                          تم حساب العائد على إنفاق الإعلانات بنجاح
                        </h3>
                        <p className="text-gray-400">
                          يمكنك عرض النتائج التفصيلية في الجانب الأيمن أو إعادة تعيين النموذج لحساب جديد
                        </p>
                      </div>
                    )
                  )}

                  <div className="flex gap-4 pt-4">
                    <Button
                      type="submit"
                      disabled={isCalculating || (activeTab === 'roi' ? (!formData.monthlyAdSpend || !formData.averageOrderValue || !formData.monthlyOrders) : (!roasData.adSpend || !roasData.revenue))}
                      className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isCalculating ? (
                        <>
                          <RefreshCw className="w-4 h-4 ml-2 animate-spin" />
                          جاري الحساب...
                        </>
                      ) : (
                        <>
                          <Calculator className="w-4 h-4 ml-2" />
                          احسب العائد
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
                title="تحليل العائد على الاستثمار"
                results={results}
                language="ar"
                toolType="roi-calculator"
              />
            )}
            
            {roasResults && (
              <EnhancedResultsDisplay
                title="تحليل العائد على إنفاق الإعلانات"
                results={roasResults}
                language="ar"
                toolType="roas-calculator"
              />
            )}

            {!results && !roasResults && (
              <Card className="bg-white/5 backdrop-blur-md border-white/10 shadow-2xl">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Calculator className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    جاهز للحساب
                  </h3>
                  <p className="text-gray-400 mb-6">
                    أدخل بيانات حملتك في النموذج واحصل على تحليل مفصل للأداء والتوصيات الذكية
                  </p>
                  <div className="space-y-3 text-left">
                    <div className="flex items-center gap-3 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>تحليل شامل للأداء</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>توصيات ذكية مخصصة</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>تصدير النتائج بصيغ متعددة</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>مقاييس تفصيلية ورسوم بيانية</span>
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