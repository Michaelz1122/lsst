'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import FlexibleInput from '@/components/ui/FlexibleInput'
import EnhancedResultsDisplay from '@/components/ui/EnhancedResultsDisplay'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Edit, 
  FileText, 
  MessageSquare, 
  Hash, 
  Mail, 
  Copy,
  Download,
  RefreshCw,
  CheckCircle,
  Lightbulb,
  Target,
  Users,
  Zap,
  ArrowRight,
  Clock
} from 'lucide-react'

export default function CopywritingToolsAR() {
  const [formData, setFormData] = useState({
    product: '',
    audience: '',
    tone: 'professional',
    keyPoints: '',
    cta: ''
  })
  const [generatedCopy, setGeneratedCopy] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [activeTool, setActiveTool] = useState('headlines')
  const [results, setResults] = useState<any>(null)

  const tools = [
    { id: 'headlines', title: 'عناوين جذابة', icon: Edit, color: 'from-purple-500 to-pink-500' },
    { id: 'social-posts', title: 'منشورات تواصل اجتماعي', icon: MessageSquare, color: 'from-blue-500 to-cyan-500' },
    { id: 'email-subjects', title: 'عناوين البريد الإلكتروني', icon: Mail, color: 'from-green-500 to-emerald-500' },
    { id: 'hashtags', title: 'هاشتاجات', icon: Hash, color: 'from-orange-500 to-red-500' }
  ]

  const toneOptions = [
    { value: 'professional', label: 'احترافي' },
    { value: 'casual', label: 'ودود' },
    { value: 'urgent', label: 'عاجل' },
    { value: 'emotional', label: 'عاطفي' },
    { value: 'humorous', label: 'مرح' }
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const generateHeadlines = () => {
    const headlines = [
      `📰 **عناوين جذابة لـ ${formData.product}**`,
      '',
      '### 🔥 **العناوين الرئيسية:**',
      `1. ${formData.product}: الحل الذي كنت تنتظره!`,
      `2. اكتشف سر التميز مع ${formData.product}`,
      `3. ${formData.product} - ثورة في عالم ${formData.audience}`,
      `4. لماذا يختار الجميع ${formData.product}؟`,
      `5. ${formData.product}: الاستثمار الذكي لمستقبلك`,
      '',
      '### 💡 **عناوين ثانوية:**',
      `• لا تفوت فرصة الحصول على ${formData.product}`,
      `• ${formData.product} - الجودة التي تستحقها`,
      `• تجربة لا تُنسى مع ${formData.product}`,
      `• ${formData.product}: ابتسامة رضا مضمونة`,
      `• اكتشف الفرق مع ${formData.product}`,
      '',
      '#عناوين_جذابة #تسويق #إعلانات'
    ].join('\n')

    return headlines
  }

  const generateSocialPosts = () => {
    const toneText = {
      professional: 'احترافي',
      casual: 'ودود',
      urgent: 'عاجل',
      emotional: 'عاطفي',
      humorous: 'مرح'
    }[formData.tone]

    const socialPosts = [
      `📱 **منشورات تواصل اجتماعي لـ ${formData.product}**`,
      '',
      '### 📸 **منشور إنستغرام:**',
      `📷 ${formData.product}`,
      '',
      `اكتشف عالم الجديد مع ${formData.product}! 🌟 منتج مصمم خصيصاً لـ ${formData.audience} يوفر لك تجربة فريدة من نوعها.`,
      '',
      formData.keyPoints ? `✨ **المميزات:**\n${formData.keyPoints.split('\n').map(point => `• ${point.trim()}`).join('\n')}` : '',
      '',
      formData.cta ? `👆 ${formData.cta}` : '👆 راسلنا للمزيد من التفاصيل!',
      '',
      '#منتج_جديد #عروض #تخفيضات',
      '',
      '---',
      '',
      '### 💬 **منشور فيسبوك:**',
      `🔥 **عرض خاص على ${formData.product}!** 🔥`,
      '',
      `الجمهور: ${formData.audience}`,
      `النبرة: ${toneText}`,
      '',
      `${formData.product} هو الحل الأمثل الذي تبحث عنه. منتجنا يتميز بالجودة العالية والسعر التنافسي بدءاً من 500 ج.م.`,
      '',
      formData.cta ? `➡️ ${formData.cta}` : '➡️ اطلب الآن واحصل على خصم خاص!',
      '',
      '#عروض_خاصة #جودة #أسعار_مناسبة',
      '',
      '---',
      '',
      '### 🐦 **منشور تويتر:**',
      `🚀 ${formData.product} - الحل الأمثل لـ ${formData.audience}!`,
      '',
      'جودة عالية ✓ أسعار تبدأ من 500 ج.م ✓ خدمة ممتازة ✓',
      '',
      formData.cta || 'اطلب الآن واستمتع بالتميز!',
      '',
      '#تخفيضات #عروض #جودة_عالية'
    ].join('\n')

    return socialPosts
  }

  const generateEmailSubjects = () => {
    const emailSubjects = [
      `📧 **عناوين بريد إلكتروني لـ ${formData.product}**`,
      '',
      '### 🔥 **عناوين رئيسية:**',
      `• 🎯 لا تفوت العرض الخاص على ${formData.product} - خصم 20% لفترة محدودة!`,
      `• ✨ ${formData.product}: الحل الأمثل لـ ${formData.audience} موجود الآن!`,
      `• 🚀 اكتشف لماذا يختار الجميع ${formData.product} - راجع التقييمات!`,
      `• 💡 ${formData.product} - ثورة في عالم ${formData.audience} بأسعار تبدأ من 500 ج.م!`,
      `• 🎁 عرض حصري: احصل على ${formData.product} مع هدية مجانية!`,
      '',
      '### 💼 **عناوين احترافية:**',
      `• 📊 تحليل أداء ${formData.product} مقارنة بالمنتجات المنافسة`,
      `• 🎯 ${formData.product}: الحل الاستراتيجي لـ ${formData.audience}`,
      `• 💼 كيف يمكن لـ ${formData.product} أن يحسن كفاءة عملك بنسبة 80%؟`,
      `• 📈 النتائج تتحدث: ${formData.product} يحصل على 4.8/5 من العملاء!`,
      `• 🔍 دراسة شاملة: لماذا ${formData.product} هو الخيار الأفضل لـ ${formData.audience}؟`,
      '',
      '### ⚡ **عناوين عاجلة:**',
      `• ⏰ العرض ينتهي بعد 24 ساعة فقط! ${formData.product} بخصم 25%!`,
      `• 🔥 متبقي 10 قطع فقط من ${formData.product} - احجز الآن!`,
      `• ⚡ خصم محدود: ${formData.product} بسعر 500 ج.م بدلاً من 1000 ج.م!`,
      `• 🎁 هدية مجانية مع كل طلب ${formData.product} - اليوم فقط!`,
      `• 🚨 آخر فرصة للحصول على ${formData.product} قبل نفاد الكمية!`,
      '',
      '#بريد_إلكتروني #تسويق #عروض'
    ].join('\n')

    return emailSubjects
  }

  const generateHashtags = () => {
    const hashtags = [
      `🏷️ **هاشتاجات فعالة لـ ${formData.product}**`,
      '',
      '### 🔥 **الهاشتاجات الرئيسية:**',
      `#${formData.product.replace(/\s+/g, '_')}`,
      `#${formData.audience.replace(/\s+/g, '_')}`,
      '#تخفيضات',
      '#عروض_خاصة',
      '#جودة_عالية',
      '#أسعار_مناسبة',
      '#منتج_جديد',
      '#توصيل_سريع',
      '#خدمة_عملاء',
      '#رضا_عملاء',
      '',
      '### 💡 **هاشتاجات ثانوية:**',
      `#${formData.product}_مميز`,
      `#${formData.audience}_مثالي`,
      '#تسويق_رقمي',
      '#عروض_محدودة',
      '#خصومات_خاصة',
      '#جودة_فائقة',
      '#سعر_منافس',
      '#توصيل_مجاني',
      '#ضمان_السعادة',
      '',
      '### 🎯 **هاشتاجات مستهدفة:**',
      `#تسوق_الآن_${formData.audience}`,
      `#${formData.product}_الأفضل`,
      '#عروض_الساعة',
      '#خصم_يومي',
      '#منتجات_متميزة',
      '#تسويق_ذكي',
      '#عروض_ساخنة',
      '#جودة_مضمونة',
      '#سعر_مذهل',
      '#خدمة_ممتازة',
      '',
      '#تخفيضات #عروض #جودة_عالية #تسويق'
    ].join('\n')

    return hashtags
  }

  const generateContent = async () => {
    setIsGenerating(true)
    try {
      let content = ''
      
      switch (activeTool) {
        case 'headlines':
          content = generateHeadlines()
          break
        case 'social-posts':
          content = generateSocialPosts()
          break
        case 'email-subjects':
          content = generateEmailSubjects()
          break
        case 'hashtags':
          content = generateHashtags()
          break
        default:
          content = generateHeadlines()
      }

      setGeneratedCopy(content)
      setResults({
        summary: `تم إنشاء محتوى لـ ${formData.product}`,
        tool: activeTool,
        wordCount: content.split(' ').length,
        generatedAt: new Date().toISOString()
      })
      
      setTimeout(() => setIsGenerating(false), 1500)
    } catch (error) {
      console.error('Error generating content:', error)
      setIsGenerating(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCopy)
  }

  const downloadContent = () => {
    const blob = new Blob([generatedCopy], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${activeTool}-${formData.product}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <Navigation currentPath="/copywriting-tools-ar" />

      <div className="relative z-10 pt-25 pb-12">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-300 px-6 py-3 rounded-full mb-6 backdrop-blur-sm border border-purple-500/30">
              <Edit className="w-5 h-5" />
              <span className="text-sm font-medium">أدوات كتابة الإعلانات</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              أدوات كتابة الإعلانات الاحترافية
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              أنشئ محتوى تسويقي مقنع وعناوين جذابة ومنشورات تواصل اجتماعي وهاشتاجات فعالة لمنتجاتك.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Input Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-2xl">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-2">معلومات المنتج</h2>
                  <p className="text-gray-300">أدخل تفاصيل المنتج لإنشاء محتوى تسويقي مقنع</p>
                </div>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FlexibleInput
                      label="اسم المنتج"
                      type="text"
                      value={formData.product}
                      onChange={(value) => handleInputChange('product', value)}
                      options={['هاتف ذكي', 'لابتوب', 'ساعة ذكية', 'سماعات', 'كاميرا']}
                      placeholder="هاتف ذكي"
                      language="ar"
                    />
                    
                    <FlexibleInput
                      label="الجمهور المستهدف"
                      type="text"
                      value={formData.audience}
                      onChange={(value) => handleInputChange('audience', value)}
                      options={['الشباب', 'المحترفون', 'الطلاب', 'الرياضيون', 'المسافرون']}
                      placeholder="الشباب"
                      language="ar"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        نبرة الكتابة
                      </label>
                      <select
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white appearance-none cursor-pointer"
                        value={formData.tone}
                        onChange={(e) => handleInputChange('tone', e.target.value)}
                      >
                        {toneOptions.map(option => (
                          <option key={option.value} value={option.value} className="bg-gray-900 text-white">
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="flex items-end">
                      <Button
                        onClick={() => setActiveTool('headlines')}
                        className={`flex-1 ${activeTool === 'headlines' ? 'bg-purple-500' : 'bg-white/10'} hover:bg-purple-600 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300`}
                      >
                        <Edit className="w-4 h-4 ml-2" />
                        عناوين
                      </Button>
                    </div>
                  </div>

                  <FlexibleInput
                    label="نقاط رئيسية (اختياري)"
                    type="textarea"
                    value={formData.keyPoints}
                    onChange={(value) => handleInputChange('keyPoints', value)}
                    placeholder="جودة عالية&#10;سعر تنافسي&#10;ضمان سنة"
                    language="ar"
                  />

                  <FlexibleInput
                    label="دعوة للعمل (CTA) (اختياري)"
                    type="text"
                    value={formData.cta}
                    onChange={(value) => handleInputChange('cta', value)}
                    options={['اطلب الآن', 'اشترِ الآن', 'احجز مكانك', 'تواصل معنا', 'زُر موقعنا']}
                    placeholder="اطلب الآن"
                    language="ar"
                  />

                  <Button
                    onClick={generateContent}
                    disabled={isGenerating || !formData.product || !formData.audience}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                  >
                    {isGenerating ? (
                      <div className="flex items-center gap-3">
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        جاري إنشاء المحتوى...
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <Edit className="w-5 h-5" />
                        إنشاء المحتوى
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Tools Selection */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-2xl">
                <h3 className="text-xl font-bold text-white mb-4">أدوات الكتابة</h3>
                <div className="space-y-4">
                  {tools.map((tool, index) => (
                    <motion.div
                      key={tool.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`bg-white/5 rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer ${activeTool === tool.id ? 'border-purple-500/50 bg-purple-500/10' : ''}`}
                      onClick={() => setActiveTool(tool.id)}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center flex-shrink-0`}>
                          <tool.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-white mb-1">{tool.title}</h4>
                          <p className="text-sm text-gray-300">
                            {tool.id === 'headlines' && 'أنشئ عناوين جذابة للإعلانات والمقالات'}
                            {tool.id === 'social-posts' && 'اكتب منشورات تواصل اجتماعي فعالة'}
                            {tool.id === 'email-subjects' && 'صمم عناوين بريد إلكتروني مشجعة للفتح'}
                            {tool.id === 'hashtags' && 'ولد هاشتاجات مستهدفة لزيادة الوصول'}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Quick Info */}
              <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-2xl">
                <h3 className="text-xl font-bold text-white mb-4">نصائح سريعة</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-white mb-1">كن محددًا</h4>
                      <p className="text-sm text-gray-300">كلما كانت تفاصيل المنتج أكثر تحديدًا، كان المحتوى أفضل</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Target className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-white mb-1">اعرف جمهورك</h4>
                      <p className="text-sm text-gray-300">اختر النبرة المناسبة للجمهور المستهدف</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-white mb-1">اختبر الأدوات</h4>
                      <p className="text-sm text-gray-300">جرب كل أداة لترى أيها يناسب احتياجاتك أفضل</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Results Section */}
          {generatedCopy && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-16"
            >
              <EnhancedResultsDisplay
                title="المحتوى المُنشأ"
                subtitle={`محتوى تسويقي لـ ${formData.product} مخصص لـ ${formData.audience}`}
                results={results}
                metrics={[]}
                recommendations={[]}
                onCopy={copyToClipboard}
                onDownload={downloadContent}
                generatedContent={generatedCopy}
              />
            </motion.div>
          )}

          {/* Features Section */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-24"
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">مميزات الكتابة الاحترافية</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                أدوات متقدمة لمساعدتك في إنشاء محتوى تسويقي مقنع وفعال
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Edit,
                  title: 'عناوين جذابة',
                  description: 'أنشئ عناوين تجذب الانتباه وتزيد من نسبة النقر.',
                  color: 'from-purple-500 to-pink-500'
                },
                {
                  icon: MessageSquare,
                  title: 'منشورات تواصل اجتماعي',
                  description: 'صمم منشورات لجميع منصات التواصل الاجتماعي.',
                  color: 'from-blue-500 to-cyan-500'
                },
                {
                  icon: Mail,
                  title: 'عناوين بريد إلكتروني',
                  description: 'اكتب عناوين بريد إلكتروني تشجع على الفتح.',
                  color: 'from-green-500 to-emerald-500'
                },
                {
                  icon: Hash,
                  title: 'هاشتاجات مستهدفة',
                  description: 'ولد هاشتاجات تزيد من وصول منشوراتك.',
                  color: 'from-orange-500 to-red-500'
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-white/30 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  )
}