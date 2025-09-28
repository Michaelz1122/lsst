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
  FlaskConical,
  GitBranch,
  Percent
} from 'lucide-react'

export default function ABTestCalculatorArabic() {
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
    { value: 'two_tailed', label: 'ثنائي الذيل' },
    { value: 'one_tailed', label: 'أحادي الذيل' }
  ]

  const hypothesisTypes = [
    { value: 'superiority', label: 'تفوق' },
    { value: 'non_inferiority', label: 'عدم الدونية' },
    { value: 'equivalence', label: 'تكافؤ' }
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
        title: 'ذو دلالة إحصائية',
        message: `الفرق ذو دلالة إحصائية (p = ${pValue.toFixed(4)})`
      })
      
      if (relativeImprovement > 0) {
        insights.push({
          type: 'success',
          title: 'تأثير إيجابي',
          message: `النسخة التجريبية تظهر تحسناً بنسبة ${relativeImprovement.toFixed(1)}% مقارنة بالنسخة الضابطة`
        })
      } else {
        insights.push({
          type: 'warning',
          title: 'تأثير سلبي',
          message: `النسخة التجريبية تظهر انخفاضاً بنسبة ${Math.abs(relativeImprovement).toFixed(1)}% في الأداء`
        })
      }
    } else {
      insights.push({
        type: 'info',
        title: 'ليس ذا دلالة إحصائية',
        message: `لم يتم اكتشاف فرق ذي دلالة إحصائية (p = ${pValue.toFixed(4)})`
      })
    }
    
    if (power < 0.8) {
      insights.push({
        type: 'warning',
        title: 'قوة إحصائية منخفضة',
        message: `قوة الاختبار ${(power * 100).toFixed(1)}%. فكر في حجم عينة أكبر.`
      })
    }
    
    if (controlRate < 0.01) {
      insights.push({
        type: 'info',
        title: 'معدل تحويل منخفض',
        message: 'معدلات التحويل المنخفضة جداً قد تتطلب أحجام عينات أكبر'
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

  const formatPercent = (value: string) => {
    return `${value}%`
  }

  const resetForm = () => {
    setFormData({
      controlVisitors: '',
      controlConversions: '',
      variantVisitors: '',
      variantConversions: '',
      confidenceLevel: '95',
      testType: 'two_tailed',
      hypothesisType: 'superiority'
    })
    setResults(null)
  }

  return (
    <RTLWrapper className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <Navigation currentPath="/ab-test-calculator-ar" />

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
            <span className="text-sm font-medium">حاسبة اختبار A/B</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            حاسبة دلالة اختبار A/B
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            احسب الدلالة الإحصائية، حلل نتائج الاختبار، واتخذ قرارات قائمة على البيانات مع فترات الثقة وتحليل القوة.
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
                  بيانات الاختبار
                </CardTitle>
                <p className="text-gray-300">
                  أدخل نتائج اختبار A/B الخاص بك
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                {!results ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Test Results */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                          <FlaskConical className="w-4 h-4 text-indigo-400" />
                          زوار المجموعة الضابطة *
                        </label>
                        <input
                          type="number"
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 text-white placeholder-gray-400"
                          value={formData.controlVisitors}
                          onChange={(e) => handleInputChange('controlVisitors', e.target.value)}
                          placeholder="10000"
                          min="0"
                          step="100"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                          <Target className="w-4 h-4 text-indigo-400" />
                          تحويلات المجموعة الضابطة *
                        </label>
                        <input
                          type="number"
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 text-white placeholder-gray-400"
                          value={formData.controlConversions}
                          onChange={(e) => handleInputChange('controlConversions', e.target.value)}
                          placeholder="500"
                          min="0"
                          step="1"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                          <GitBranch className="w-4 h-4 text-indigo-400" />
                          زوار المجموعة التجريبية *
                        </label>
                        <input
                          type="number"
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 text-white placeholder-gray-400"
                          value={formData.variantVisitors}
                          onChange={(e) => handleInputChange('variantVisitors', e.target.value)}
                          placeholder="10000"
                          min="0"
                          step="100"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                          <Users className="w-4 h-4 text-indigo-400" />
                          تحويلات المجموعة التجريبية *
                        </label>
                        <input
                          type="number"
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 text-white placeholder-gray-400"
                          value={formData.variantConversions}
                          onChange={(e) => handleInputChange('variantConversions', e.target.value)}
                          placeholder="600"
                          min="0"
                          step="1"
                          required
                        />
                      </div>
                    </div>

                    {/* Test Configuration */}
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                          <Percent className="w-4 h-4 text-indigo-400" />
                          مستوى الثقة
                        </label>
                        <select
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 text-white appearance-none cursor-pointer"
                          value={formData.confidenceLevel}
                          onChange={(e) => handleInputChange('confidenceLevel', e.target.value)}
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%238b5cf6' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                            backgroundPosition: `left 0.5rem center`,
                            backgroundRepeat: `no-repeat`,
                            backgroundSize: `1.5em 1.5em`,
                            paddingLeft: `2.5rem`
                          }}
                        >
                          {confidenceLevels.map((level) => (
                            <option key={level.value} value={level.value} className="bg-gray-900 text-white">
                              {level.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                          <Activity className="w-4 h-4 text-indigo-400" />
                          نوع الاختبار
                        </label>
                        <select
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 text-white appearance-none cursor-pointer"
                          value={formData.testType}
                          onChange={(e) => handleInputChange('testType', e.target.value)}
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%238b5cf6' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                            backgroundPosition: `left 0.5rem center`,
                            backgroundRepeat: `no-repeat`,
                            backgroundSize: `1.5em 1.5em`,
                            paddingLeft: `2.5rem`
                          }}
                        >
                          {testTypes.map((type) => (
                            <option key={type.value} value={type.value} className="bg-gray-900 text-white">
                              {type.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                          <BarChart3 className="w-4 h-4 text-indigo-400" />
                          نوع الفرضية
                        </label>
                        <select
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 text-white appearance-none cursor-pointer"
                          value={formData.hypothesisType}
                          onChange={(e) => handleInputChange('hypothesisType', e.target.value)}
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%238b5cf6' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                            backgroundPosition: `left 0.5rem center`,
                            backgroundRepeat: `no-repeat`,
                            backgroundSize: `1.5em 1.5em`,
                            paddingLeft: `2.5rem`
                          }}
                        >
                          {hypothesisTypes.map((type) => (
                            <option key={type.value} value={type.value} className="bg-gray-900 text-white">
                              {type.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button
                        type="submit"
                        disabled={isCalculating}
                        className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50"
                      >
                        {isCalculating ? (
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>جاري الحساب...</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            <Calculator className="w-4 h-4" />
                            <span>احسب الدلالة الإحصائية</span>
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
                      <h3 className="text-xl font-bold text-white">نتائج اختبار A/B</h3>
                      <Button
                        onClick={resetForm}
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10 text-sm font-medium py-2 px-4 rounded-lg transition-all duration-300"
                      >
                        اختبار جديد
                      </Button>
                    </div>

                    {/* Conversion Rates Summary */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <div className="text-sm text-gray-400 mb-1">معدل الضابطة</div>
                        <div className="text-xl font-bold text-blue-400">{formatPercent(results.controlRate)}</div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <div className="text-sm text-gray-400 mb-1">معدل التجريبية</div>
                        <div className="text-xl font-bold text-purple-400">{formatPercent(results.variantRate)}</div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <div className="text-sm text-gray-400 mb-1">الدلالة</div>
                        <div className={`text-xl font-bold ${results.isSignificant ? 'text-green-400' : 'text-red-400'}`}>
                          {results.isSignificant ? 'ذو دلالة' : 'ليس ذا دلالة'}
                        </div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <div className="text-sm text-gray-400 mb-1">التحسين النسبي</div>
                        <div className={`text-xl font-bold ${parseFloat(results.relativeImprovement) > 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {formatPercent(results.relativeImprovement)}
                        </div>
                      </div>
                    </div>

                    {/* Statistical Results */}
                    <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                      <h4 className="text-lg font-bold text-white mb-4">النتائج الإحصائية</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-gray-400 mb-1">قيمة Z</div>
                          <div className="text-lg font-bold text-indigo-400">{results.zScore}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-400 mb-1">قيمة P</div>
                          <div className="text-lg font-bold text-purple-400">{results.pValue}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-400 mb-1">القوة الإحصائية</div>
                          <div className="text-lg font-bold text-green-400">{formatPercent(results.power)}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-400 mb-1">مستوى الثقة</div>
                          <div className="text-lg font-bold text-cyan-400">{results.confidenceLevel}%</div>
                        </div>
                      </div>
                    </div>

                    {/* Confidence Interval */}
                    <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                      <h4 className="text-lg font-bold text-white mb-4">فترة الثقة</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">الفرق في معدلات التحويل</span>
                          <span className="font-bold text-yellow-400">{formatPercent(results.difference)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">الحد الأدنى لفترة الثقة</span>
                          <span className="font-bold text-blue-400">{formatPercent(results.confidenceInterval.lower)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">الحد الأعلى لفترة الثقة</span>
                          <span className="font-bold text-purple-400">{formatPercent(results.confidenceInterval.upper)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Sample Size Requirement */}
                    <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                      <h4 className="text-lg font-bold text-white mb-4">متطلبات حجم العينة</h4>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-cyan-400 mb-2">{results.requiredSampleSize}</div>
                        <div className="text-gray-300">الحجم الإجمالي الموصى به للعينة</div>
                      </div>
                    </div>

                    {/* Insights */}
                    <div className="space-y-4">
                      {results.insights.map((insight: any, index: number) => (
                        <div 
                          key={index} 
                          className={`rounded-lg p-4 border ${
                            insight.type === 'success' ? 'bg-green-500/10 border-green-500/30' :
                            insight.type === 'warning' ? 'bg-yellow-500/10 border-yellow-500/30' :
                            'bg-blue-500/10 border-blue-500/30'
                          }`}
                        >
                          <h5 className={`font-bold mb-2 ${
                            insight.type === 'success' ? 'text-green-400' :
                            insight.type === 'warning' ? 'text-yellow-400' :
                            'text-blue-400'
                          }`}>
                            {insight.title}
                          </h5>
                          <p className="text-gray-300 text-sm">{insight.message}</p>
                        </div>
                      ))}
                    </div>
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
                  <Award className="w-5 h-5 text-indigo-400" />
                  لماذا هذه الأداة؟
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-3">
                <p>تساعدك هذه الأداة على:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    تحديد الدلالة الإحصائية لنتائج الاختبار
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    حساب فترات الثقة والهوامش الخطأ
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    تقييم القوة الإحصائية للاختبار
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    تقدير حجم العينة المطلوب
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-indigo-400" />
                  مفاهيم إحصائية
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-3">
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <h4 className="font-bold text-indigo-400 mb-1">قيمة P</h4>
                  <p className="text-sm">احتمال الحصول على النتائج observed إذا لم يكن هناك فرق حقيقي</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <h4 className="font-bold text-indigo-400 mb-1">فترة الثقة</h4>
                  <p className="text-sm">نطاق القيم الذي يحتمل أن يحتوي على الفرق الحقيقي</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <h4 className="font-bold text-indigo-400 mb-1">القوة الإحصائية</h4>
                  <p className="text-sm">قدرة الاختبار على اكتشاف الفرق عندما يكون موجوداً</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                  <Download className="w-5 h-5 text-indigo-400" />
                  موارد إضافية
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 justify-start">
                  <ArrowRight className="w-4 h-4 ml-2" />
                  دليل اختبارات A/B
                </Button>
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 justify-start">
                  <ArrowRight className="w-4 h-4 ml-2" />
                  أفضل الممارسات الإحصائية
                </Button>
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 justify-start">
                  <ArrowRight className="w-4 h-4 ml-2" />
                  تحليل النتائج والتوصيات
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </RTLWrapper>
  )
}