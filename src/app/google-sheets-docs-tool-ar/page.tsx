'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import RTLWrapper from '@/components/RTLWrapper'
import ToolOutput from '@/components/ToolOutput'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  FileSpreadsheet, 
  FileText, 
  Calendar, 
  Target, 
  Users, 
  TrendingUp, 
  Download, 
  RefreshCw,
  CheckCircle,
  Zap,
  Star,
  ArrowRight,
  Loader2,
  HardDrive,
  Sheet,
  Table,
  BarChart3,
  Clock,
  Hash,
  MessageSquare,
  Eye,
  Share2,
  Heart,
  Award,
  Radio,
  Tv,
  Smartphone,
  Monitor,
  Megaphone,
  Filter,
  Settings,
  Activity
} from 'lucide-react'


export default function GoogleSheetsDocsToolArabic() {
  const [activeTab, setActiveTab] = useState('content-plan')
  const [formData, setFormData] = useState({
    projectName: '',
    industry: '',
    duration: '',
    targetAudience: '',
    mainGoals: '',
    platforms: '',
    contentType: '',
    publishingFrequency: '',
    // Content Plan specific fields
    contentThemes: '',
    keywords: '',
    contentGoals: '',
    // Media Buying specific fields
    budget: '',
    campaignObjective: '',
    targetLocations: '',
    adFormats: '',
    // Content Calendar specific fields
    startDate: '',
    contentCategories: '',
    teamMembers: '',
    // Docs Template specific fields
    documentType: '',
    brandVoice: '',
    sectionsNeeded: '',
    // Analytics Dashboard specific fields
    metricsToTrack: '',
    dataSources: '',
    reportingFrequency: '',
    // Automation Scripts specific fields
    automationTasks: '',
    integrations: '',
    complexityLevel: ''
  })
  const [generatedPlan, setGeneratedPlan] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [metrics, setMetrics] = useState<any[]>([])
  const [recommendations, setRecommendations] = useState<string[]>([])
  const [score, setScore] = useState<number | undefined>(undefined)

  const toolSections = [
    {
      id: 'content-plan',
      title: 'خطة المحتوى لجوجل شيت',
      description: 'إنشاء خطة محتوى متكاملة متوافقة مع جوجل شيت',
      icon: FileSpreadsheet,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'media-buying-plan',
      title: 'خطة الميديا باينج لجوجل شيت',
      description: 'تخطيط شراء الإعلانات متوافق مع جوجل شيت',
      icon: BarChart3,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'content-calendar',
      title: 'تقويم المحتوى لجوجل شيت',
      description: 'إنشاء تقويم محتوى تفاعلي لجوجل شيت',
      icon: Calendar,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'docs-template',
      title: 'قوالب جوجل دوكس',
      description: 'قوالب جاهزة لجوجل دوكس للمحتوى والتسويق',
      icon: FileText,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'analytics-dashboard',
      title: 'لوحة تحليلات لجوجل شيت',
      description: 'لوحة تحليلات أداء متوافقة مع جوجل شيت',
      icon: TrendingUp,
      color: 'from-yellow-500 to-amber-500'
    },
    {
      id: 'automation-scripts',
      title: 'سكربتات أتمتة لجوجل شيت',
      description: 'سكربتات جاهزة لأتمتة المهام في جوجل شيت',
      icon: Settings,
      color: 'from-indigo-500 to-purple-500'
    }
  ]

  const industryOptions = [
    { value: 'technology', label: 'التكنولوجيا' },
    { value: 'healthcare', label: 'الرعاية الصحية' },
    { value: 'education', label: 'التعليم' },
    { value: 'retail', label: 'تجارة التجزئة' },
    { value: 'food-beverage', label: 'المطاعم والمشروبات' },
    { value: 'real-estate', label: 'العقارات' },
    { value: 'automotive', label: 'السيارات' },
    { value: 'fashion', label: 'الأزياء' },
    { value: 'finance', label: 'التمويل' },
    { value: 'travel-tourism', label: 'السفر والسياحة' },
    { value: 'beauty-cosmetics', label: 'التجميل والعناية' },
    { value: 'fitness-wellness', label: 'اللياقة والصحة' },
    { value: 'entertainment', label: 'الترفيه' },
    { value: 'professional-services', label: 'الخدمات المهنية' },
    { value: 'manufacturing', label: 'التصنيع' }
  ]

  const durationOptions = [
    { value: '1-month', label: 'شهر واحد' },
    { value: '3-months', label: '3 أشهر' },
    { value: '6-months', label: '6 أشهر' },
    { value: '1-year', label: 'سنة واحدة' },
    { value: '2-years', label: 'سنتان' }
  ]

  const platformOptions = [
    { value: 'meta', label: 'ميتا (فيسبوك وإنستجرام)' },
    { value: 'tiktok', label: 'تيك توك' },
    { value: 'google', label: 'جوجل (يوتيوب وADS)' },
    { value: 'linkedin', label: 'لينكدإن' },
    { value: 'twitter', label: 'تويتر' },
    { value: 'all-platforms', label: 'جميع المنصات' }
  ]

  const contentTypeOptions = [
    { value: 'blog-posts', label: 'مقالات ومدونات' },
    { value: 'videos', label: 'فيديوهات' },
    { value: 'infographics', label: 'إنفوجرافيك' },
    { value: 'podcasts', label: 'بودكاست' },
    { value: 'social-posts', label: 'منشورات تواصل اجتماعي' },
    { value: 'email-newsletters', label: 'نشرات بريدية' },
    { value: 'webinars', label: 'ويبنارات' },
    { value: 'all-types', label: 'جميع الأنواع' }
  ]

  const frequencyOptions = [
    { value: 'daily', label: 'يومياً' },
    { value: '3-times-week', label: '3 مرات أسبوعياً' },
    { value: 'weekly', label: 'أسبوعياً' },
    { value: 'bi-weekly', label: 'مرتين أسبوعياً' },
    { value: 'monthly', label: 'شهرياً' }
  ]

  // Content Plan specific options
  const contentGoalsOptions = [
    { value: 'awareness', label: 'زيادة الوعي بالعلامة التجارية' },
    { value: 'engagement', label: 'زيادة التفاعل' },
    { value: 'leads', label: 'توليد العملاء المحتملين' },
    { value: 'sales', label: 'زيادة المبيعات' },
    { value: 'education', label: 'تثقيف الجمهور' },
    { value: 'community', label: 'بناء المجتمع' }
  ]

  // Media Buying specific options
  const budgetOptions = [
    { value: '1000-5000', label: '1,000 - 5,000 ج.م' },
    { value: '5000-10000', label: '5,000 - 10,000 ج.م' },
    { value: '10000-25000', label: '10,000 - 25,000 ج.م' },
    { value: '25000-50000', label: '25,000 - 50,000 ج.م' },
    { value: '50000+', label: '50,000+ ج.م' }
  ]

  const campaignObjectiveOptions = [
    { value: 'traffic', label: 'زيادة حركة المرور' },
    { value: 'conversions', label: 'زيادة التحويلات' },
    { value: 'brand-awareness', label: 'زيادة الوعي بالعلامة' },
    { value: 'lead-generation', label: 'توليد العملاء' },
    { value: 'sales', label: 'زيادة المبيعات' },
    { value: 'app-installs', label: 'تثبيت التطبيق' }
  ]

  const adFormatOptions = [
    { value: 'image', label: 'صور' },
    { value: 'video', label: 'فيديو' },
    { value: 'carousel', label: 'كاروسيل' },
    { value: 'stories', label: 'ستوري' },
    { value: 'collection', label: 'مجموعة' },
    { value: 'all-formats', label: 'جميع التنسيقات' }
  ]

  // Content Calendar specific options
  const contentCategoryOptions = [
    { value: 'educational', label: 'تعليمي' },
    { value: 'entertainment', label: 'ترفيهي' },
    { value: 'promotional', label: 'ترويجي' },
    { value: 'news', label: 'أخبار' },
    { value: 'user-generated', label: 'محتوى المستخدمين' },
    { value: 'mixed', label: 'مختلط' }
  ]

  // Docs Template specific options
  const documentTypeOptions = [
    { value: 'marketing-plan', label: 'خطة تسويق' },
    { value: 'business-proposal', label: 'عرض تجاري' },
    { value: 'content-strategy', label: 'استراتيجية محتوى' },
    { value: 'campaign-brief', label: 'ملخص حملة' },
    { value: 'report', label: 'تقرير' },
    { value: 'presentation', label: 'عرض تقديمي' }
  ]

  const brandVoiceOptions = [
    { value: 'professional', label: 'احترافي' },
    { value: 'casual', label: 'ودي' },
    { value: 'formal', label: 'رسمي' },
    { value: 'playful', label: 'مرح' },
    { value: 'authoritative', label: 'موثوق' },
    { value: 'inspirational', label: 'ملهم' }
  ]

  // Analytics Dashboard specific options
  const metricsOptions = [
    { value: 'reach-impressions', label: 'الوصول والانطباعات' },
    { value: 'engagement', label: 'التفاعل' },
    { value: 'clicks-ctr', label: 'النقرات ومعدل النقرة' },
    { value: 'conversions', label: 'التحويلات' },
    { value: 'roi-roas', label: 'العائد على الاستثمار' },
    { value: 'cost-metrics', label: 'مقاييس التكلفة' }
  ]

  const reportingFrequencyOptions = [
    { value: 'daily', label: 'يومي' },
    { value: 'weekly', label: 'أسبوعي' },
    { value: 'bi-weekly', label: 'مرتين أسبوعياً' },
    { value: 'monthly', label: 'شهري' },
    { value: 'quarterly', label: 'ربع سنوي' }
  ]

  // Automation Scripts specific options
  const automationTaskOptions = [
    { value: 'data-import', label: 'استيراد البيانات' },
    { value: 'report-generation', label: 'توليد التقارير' },
    { value: 'email-notifications', label: 'إشعارات البريد' },
    { value: 'data-cleaning', label: 'تنظيف البيانات' },
    { value: 'scheduled-tasks', label: 'المهام المجدولة' },
    { value: 'custom-functions', label: 'وظائف مخصصة' }
  ]

  const complexityOptions = [
    { value: 'beginner', label: 'مبتدئ' },
    { value: 'intermediate', label: 'متوسط' },
    { value: 'advanced', label: 'متقدم' },
    { value: 'expert', label: 'خبير' }
  ]

  const generateContentPlanSheet = () => {
    const industryText = industryOptions.find(opt => opt.value === formData.industry)?.label || formData.industry
    const durationText = durationOptions.find(opt => opt.value === formData.duration)?.label || formData.duration
    const platformText = platformOptions.find(opt => opt.value === formData.platforms)?.label || formData.platforms
    const contentTypeText = contentTypeOptions.find(opt => opt.value === formData.contentType)?.label || formData.contentType
    const frequencyText = frequencyOptions.find(opt => opt.value === formData.publishingFrequency)?.label || formData.publishingFrequency

    return `📊 **خطة المحتوى لجوجل شيت - ${formData.projectName}**

### 🔧 **إعداد جوجل شيت:**

#### **1. إنشاء الملف:**
• **اسم الملف:** خطة محتوى ${formData.projectName} - ${durationText}
• **الوصف:** خطة محتوى متكاملة لـ ${industryText}
• **المشاركون:** فريق التسويق، فريق المحتوى، المدير المسؤول

#### **2. هيكل الأوراق (Sheets):**

**الورقة الرئيسية: نظرة عامة**
\`\`\`
A1: خطة محتوى \${formData.projectName}
A2: الفترة: \${durationText}
A3: الصناعة: \${industryText}
A4: الجمهور المستهدف: \${formData.targetAudience}
A5: المنصات: \${platformText}
A6: نوع المحتوى: \${contentTypeText}
A7: تكرار النشر: \${frequencyText}
\`\`\`

**الورقة 2: تقويم المحتوى**
\`\`\`
الأعمدة:
A: التاريخ
B: يوم الأسبوع
C: عنوان المحتوى
D: نوع المحتوى
E: المنصة
F: الحالة (مخطط، قيد التنفيذ، منشور)
G: المسؤول
H: ملاحظات
I: رابط المحتوى
J: أداء (مشاهدات، تفاعل، تحويلات)
\`\`\`

**الورقة 3: أفكار المحتوى**
\`\`\`
الأعمدة:
A: رقم الفكرة
B: عنوان المحتوى
C: وصف الفكرة
D: نوع المحتوى
E: المنصة المستهدفة
F: الأولوية (عالية، متوسطة، منخفضة)
G: الحالة (مقترح، معتمد، قيد التنفيذ)
H: تاريخ التنفيذ المقترح
\`\`\`

**الورقة 4: تحليل الأداء**
\`\`\`
الأعمدة:
A: التاريخ
B: عنوان المحتوى
C: المنصة
D: المشاهدات
E: التفاعل (إعجابات، تعليقات، مشاركات)
F: النقرات
G: التحويلات
H: تكلفة الإعلان (إن وجدت)
I: العائد على الاستثمار
J: ملاحظات
\`\`\`

**الورقة 5: قائمة الكلمات المفتاحية**
\`\`\`
الأعمدة:
A: الكلمة المفتاحية
B: حجم البحث الشهري
C: صعوبة الكلمة المفتاحية
D: النية (معلوماتية، تجارية،.transactional)
E: المنافسة
F: الأولوية
G: الحالة (مستخدمة، مقترحة)
\`\`\`

---

### 📝 **صيغ جاهزة للنسخ واللصق:**

#### **صيغة تقويم المحتوى:**
\`\`\`
=IF(ISBLANK(A2), "", 
   IF(C2="فيديو", "🎥", 
   IF(C2="مقال", "📝", 
   IF(C2="إنفوجرافيك", "📊", 
   IF(C2="بودكاست", "🎧", "📱")))) & " " & B2
\`\`\`

#### **صيغة حساب أداء المحتوى:**
\`\`\`
=IF(ISBLANK(J2), "", 
   (E2+F2+G2)/3 & " - " & 
   IF((E2+F2+G2)/3 > 100, "ممتاز", 
   IF((E2+F2+G2)/3 > 50, "جيد", "ضعيف")))
\`\`\`

#### **صيغة تحديد الأولوية:**
\`\`\`
=IF(F2="عالية", "🔴 عالية", 
   IF(F2="متوسطة", "🟡 متوسطة", "🟢 منخفضة"))
\`\`\`

---

### 🎯 **خطة المحتوى المقترحة:**

#### **الأسبوع الأول:**
**الاثنين:**
• **العنوان:** مقدمة عن ${formData.projectName}
• **النوع:** فيديو تعريفي
• **المنصة:** ${platformText}
• **الهدف:** زيادة الوعي بالعلامة التجارية

**الأربعاء:**
• **العنوان:** 5 حقائق عن ${industryText} يجب أن تعرفها
• **النوع:** إنفوجرافيك
• **المنصة:** ${platformText}
• **الهدف:** تثقيف الجمهور

**الجمعة:**
• **العنوان:** كيف تختار أفضل ${contentTypeText} لـ ${formData.targetAudience}
• **النوع:** مقال تفصيلي
• **المنصة:** ${platformText}
• **الهدف:** توليد عملاء محتملين

#### **الأسبوع الثاني:**
**الاثنين:**
• **العنوان:** مقابلة مع خبير في ${industryText}
• **النوع:** بودكاست/فيديو
• **المنصة:** ${platformText}
• **الهدف:** بناء الثقة والمصداقية

**الأربعاء:**
• **العنوان:** أحدث التطورات في ${industryText}
• **النوع:** منشورات تواصل اجتماعي
• **المنصة:** ${platformText}
• **الهدف:** التفاعل والمشاركة

**الجمعة:**
• **العنوان:** دليل شامل لـ ${formData.targetAudience}
• **النوع:** دليل إلكتروني/كتاب
• **المنصة:** ${platformText}
• **الهدف:** تحويلات ومبيعات

---

### 📊 **مؤشرات الأداء المقترحة:**

#### **مؤشرات النجاح:**
• **نشر المحتوى:** ${frequencyText} بانتظام
• **التواصل:** 80%+ من الخطة المنفذة
• **التفاعل:** 5%+ معدل تفاعل
• **الوصول:** 10K+ وصول شهري
• **التحويلات:** 100+ تحويل شهري

#### **تتبع الأداء:**
• **يومياً:** مراجعة المنشورات والتفاعل
• **أسبوعياً:** تحليل الأداء وتعديل الاستراتيجية
• **شهرياً:** تقرير شامل عن الأداء والتقدم

---

### 🎨 **نصائح لجوجل شيت:**

#### **لتحسين الأداء:**
1. **استخدم الفلاتر** لعرض المحتوى حسب النوع أو المنصة
2. **استخدم الألوان** لتمييز حالات المحتوى
3. **أنشئ رسوم بيانية** لتتبع الأداء البصري
4. **استخدم Pivot Tables** لتحليل البيانات بعمق
5. **شارك الملف** مع الفريق للتعاون الفعال

#### **للأتمتة:**
1. **استخدم Google Forms** لجمع أفكار المحتوى تلقائياً
2. **أنشئ سكربتات** لإرسال إشعارات بالبريد الإلكتروني
3. **استخدم Zapier** لربط جوجل شيت بأدوات أخرى
4. **أنشئ لوحات تحكم** مرئية

---

### 🔗 **روابط مفيدة:**
• [دليل جوجل شيت للمبتدئين](https://support.google.com/docs)
• [قوالب جاهزة للتسويق](https://workspace.google.com/templates)
• [سكربتات جوجل شيت](https://developers.google.com/apps-script)

---

#جوجل_شيت #خطة_محتوى #تسويق #أتمتة`
  }

  const generatePlan = async () => {
    setIsGenerating(true)
    
    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tool: 'google-sheets-docs',
          formData,
          language: 'ar',
          context: `Active tab: ${activeTab}, Tool: ${toolSections.find(t => t.id === activeTab)?.title}`
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate content')
      }

      const result = await response.json()
      
      setGeneratedPlan(result.content)
      setMetrics(result.metrics || [])
      setRecommendations(result.recommendations || [])
      setScore(result.score || 85)
      
    } catch (error) {
      console.error('AI generation error:', error)
      // Fallback to original generation
      let plan = ''
      
      switch (activeTab) {
        case 'content-plan':
          plan = generateContentPlanSheet()
          break
        case 'media-buying-plan':
          plan = generateMediaBuyingSheet()
          break
        case 'content-calendar':
          plan = generateContentCalendarSheet()
          break
        case 'docs-template':
          plan = generateDocsTemplate()
          break
        case 'analytics-dashboard':
          plan = generateAnalyticsDashboard()
          break
        case 'automation-scripts':
          plan = generateAutomationScripts()
          break
        default:
          plan = generateContentPlanSheet()
      }
      
      setGeneratedPlan(plan)
    } finally {
      setIsGenerating(false)
    }
  }

  const generateMediaBuyingSheet = () => {
    return `💰 **خطة الميديا باينج لجوجل شيت - ${formData.projectName}**

### 🔧 **إعداد جوجل شيت للميديا باينج:**

#### **1. إنشاء الملف:**
• **اسم الملف:** خطة الميديا باينج ${formData.projectName}
• **الوصف:** خطة شراء إعلانات متكاملة
• **المشاركون:** فريق التسويق، المدير المالي، المدير المسؤول

#### **2. هيكل الأوراق (Sheets):**

**الورقة الرئيسية: نظرة عامة على الميزانية**
\`\`\`
A1: خطة الميديا باينج ${formData.projectName}
A2: الفترة: ${formData.duration}
A3: الصناعة: ${formData.industry}
A4: المنصات: ${formData.platforms}
A5: الميزانية الإجمالية: [أدخل الميزانية]}
A6: الهدف الرئيسي: ${formData.mainGoals}
\`\`\`

**الورقة 2: توزيع الميزانية**
\`\`\`
الأعمدة:
A: المنصة
B: النسبة المئوية من الميزانية
C: الميزانية المخصصة
D: تكلفة النقرة/المشاهدة المتوقعة
E: عدد النقرات/المشاهدات المتوقعة
F: معدل التحويل المتوقع
G: عدد التحويلات المتوقع
H: تكلفة اكتساب العميل المتوقعة
I: العائد على الاستثمار المتوقع
J: ملاحظات
\`\`\`

**الورقة 3: تفصيل الحملات الإعلانية**
\`\`\`
الأعمدة:
A: اسم الحملة
B: المنصة
C: تاريخ البدء
D: تاريخ الانتهاء
E: الميزانية اليومية
F: الميزانية الإجمالية
G: الجمهور المستهدف
H: نوع الإعلان
I: الحالة (نشطة، متوقفة، مكتملة)
J: الإنفاق الفعلي
K: النتائج الفعلية
L: الفرق بين المخطط والفعلي
\`\`\`

---

### 📝 **صيغ جاهزة للنسخ واللصق:**

#### **صيغة حساب الميزانية المخصصة:**
\`\`\`
=IF(ISBLANK(B2), "", 
   C2 * B2 & " - " & 
   "تكلفة النقرة: " & D2 & " - " & 
   "النقرات المتوقعة: " & ROUND(C2/D2, 0))
\`\`\`

#### **صيغة حساب العائد على الاستثمار:**
\`\`\`
=IF(ISBLANK(K2), "", 
   "ROI: " & ROUND((K2*100)/J2, 2) & "%" & " - " & 
   IF((K2*100)/J2 > 200, "ممتاز", 
   IF((K2*100)/J2 > 100, "جيد", "ضعيف")))
\`\`\`

---

### 📊 **خطة الميديا باينج المقترحة:**

#### **توزيع الميزانية:**
**ميتا (فيسبوك وإنستجرام): 50%**
• تكلفة النقرة: 0.5-2 ج.م
• معدل التحويل: 3-5%
• التحويلات المتوقعة: 150-250

**تيك توك: 25%**
• تكلفة المشاهدة: 0.05-0.2 ج.م
• معدل التفاعل: 10-15%
• المشاهدات المتوقعة: 500K-1M

**جوجل ADS: 20%**
• تكلفة النقرة: 2-8 ج.م
• معدل التحويل: 4-6%
• التحويلات المتوقعة: 80-120

**لينكدإن: 5%**
• تكلفة النقرة: 3-10 ج.م
• معدل التحويل: 2-4%
• التحويلات المتوقعة: 20-40

---

#جوجل_شيت #ميديا_باينج #إعلانات #تسويق_رقمي`
  }

  const generateContentCalendarSheet = () => {
    return `📅 **تقويم المحتوى لجوجل شيت - ${formData.projectName}**

### 🔧 **إعداد جوجل شيت للتقويم:**

#### **1. إنشاء الملف:**
• **اسم الملف:** تقويم محتوى ${formData.projectName}
• **الوصف:** تقويم محتوى تفاعلي
• **المشاركون:** فريق المحتوى، فريق التصميم، المدير المسؤول

#### **2. هيكل الأوراق (Sheets):**

**الورقة الرئيسية: التقويم الشهري**
\`\`\`
الأعمدة:
A: التاريخ
B: يوم الأسبوع
C: عنوان المحتوى
D: نوع المحتوى
E: المنصة
F: الحالة
G: المسؤول
H: وقت النشر
I: رابط المحتوى
J: أداء
\`\`\`

---

### 📝 **صيغ جاهزة للنسخ واللصق:**

#### **صيغة تحديد يوم الأسبوع:**
\`\`\`
=IF(ISBLANK(A2), "", 
   TEXT(A2, "dddd") & " - " & 
   TEXT(A2, "dd/mm/yyyy"))
\`\`\`

---

### 📅 **تقويم محتوى مقترح:**

#### **الأسبوع الأول:**
**الاثنين 1 يناير:**
• **العنوان:** بداية جديدة مع ${formData.projectName}
• **النوع:** فيديو تعريفي
• **المنصة:** ${formData.platforms}
• **الوقت:** 9:00 ص

**الأربعاء 3 يناير:**
• **العنوان:** 5 نصائح للنجاح في ${formData.industry}
• **النوع:** إنفوجرافيك
• **المنصة:** ${formData.platforms}
• **الوقت:** 2:00 م

---

#جوجل_شيت #تقويم_محتوى #تسويق #أتمتة`
  }

  const generateDocsTemplate = () => {
    return `📄 **قوالب جوجل دوكس - ${formData.projectName}**

### 🔧 **إعداد قوالب جوجل دوكس:**

#### **1. قالب خطة تسويق متكاملة:**
\`\`\`
# خطة تسويق ${formData.projectName}

## نظرة عامة
**اسم المشروع:** ${formData.projectName}
**الصناعة:** ${formData.industry}
**المدة:** ${formData.duration}
**الجمهور المستهدف:** ${formData.targetAudience}
**الأهداف الرئيسية:** ${formData.mainGoals}

## استراتيجية التسويق
### الرسالة الرئيسية
[أدخل الرسالة الرئيسية]}

### القنوات التسويقية
#### 1. التسويق الرقمي (70%)
- **ميتا (فيسبوك وإنستجرام):** 40%
- **تيك توك:** 20%
- **جوجل ADS:** 10%

## الميزانية
### الميزانية الإجمالية: [المبلغ]}
#### التوزيع:
- التسويق الرقمي: [المبلغ] (70%)
- التسويق التقليدي: [المبلغ] (30%)

## الجدول الزمني
### الشهر 1: بناء الأساس
- الأسبوع 1-2: [المهام]}
- الأسبوع 3-4: [المهام]}

---

#جوجل_دوكس #قوالب #تسويق #محتوى`
  }

  const generateAnalyticsDashboard = () => {
    return `📊 **لوحة تحليلات لجوجل شيت - ${formData.projectName}**

### 🔧 **إعداد لوحة التحليلات:**

#### **1. إنشاء الملف:**
• **اسم الملف:** لوحة تحليلات ${formData.projectName}
• **الوصف:** لوحة تحليلات أداء متكاملة
• **المشاركون:** فريق التسويق، المدير المسؤول

#### **2. هيكل الأوراق (Sheets):**

**الورقة الرئيسية: لوحة التحكم الرئيسية**
\`\`\`
الأعمدة:
A: المؤشر
B: القيمة الحالية
C: الهدف
D: النسبة المئوية للإنجاز
E: التغير عن الشهر الماضي
F: الحالة
G: ملاحظات
\`\`\`

---

### 📝 **صيغ جاهزة للنسخ واللصق:**

#### **صيغة حساب النسبة المئوية للإنجاز:**
\`\`\`
=IF(ISBLANK(C2), "", 
   ROUND((B2/C2)*100, 2) & "%" & " - " & 
   IF((B2/C2) >= 1, "✅ هدف متجاوز", 
   IF((B2/C2) >= 0.8, "🟡 هدف قريب", "❌ هدف لم يتحقق")))
\`\`\`

---

### 📊 **لوحة تحكم مقترحة:**

#### **المؤشرات الرئيسية:**
**الوصول الإجمالي:**
- الهدف: 1M+
- الحالي: [أدخل القيمة]}
- النسبة المئوية: [احسب النسبة]}

**التفاعل الإجمالي:**
- الهدف: 50K+
- الحالي: [أدخل القيمة]}
- النسبة المئوية: [احسب النسبة]}

---

#جوجل_شيت #تحليلات #بيانات #تسويق`
  }

  const generateAutomationScripts = () => {
    return `⚙️ **سكربتات أتمتة لجوجل شيت - ${formData.projectName}**

### 🔧 **سكربتات جاهزة للأتمتة:**

#### **1. سكربت إرسال إشعارات بالبريد الإلكتروني:**
\`\`\`javascript
function sendEmailNotification() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("لوحة التحكم الرئيسية");
  var data = sheet.getRange("A2:G").getValues();
  
  for (var i = 0; i < data.length; i++) {
    var row = data[i];
    var metric = row[0];
    var currentValue = row[1];
    var target = row[2];
    var achievement = row[3];
    var change = row[4];
    var status = row[5];
    
    if (status === "أقل من الهدف") {
      var subject = "تنبيه: " + metric + " أقل من الهدف";
      var body = "المؤشر: " + metric + "\\n" +
                 "القيمة الحالية: " + currentValue + "\\n" +
                 "الهدف: " + target + "\\n" +
                 "نسبة الإنجاز: " + achievement + "\\n" +
                 "التغير عن الشهر الماضي: " + change + "\\n\\n" +
                 "يرجى مراجعة الأداء واتخاذ الإجراءات اللازمة.";
      
      MailApp.sendEmail("your-email@example.com", subject, body);
    }
  }
}
\`\`\`

---

### ⏰ **إعداد المشغلات التلقائية (Triggers):**

#### **مشغل يومي لتحديث البيانات:**
\`\`\`javascript
function createDailyTrigger() {
  ScriptApp.newTrigger('updateDataAutomatically')
    .timeBased()
    .everyDays(1)
    .atHour(9)
    .create();
}
\`\`\`

---

#جوجل_شيت #سكربتات #أتمتة #تسويق`
  }

  const resetForm = () => {
    setFormData({
      projectName: '',
      industry: '',
      duration: '',
      targetAudience: '',
      mainGoals: '',
      platforms: '',
      contentType: '',
      publishingFrequency: '',
      // Content Plan specific fields
      contentThemes: '',
      keywords: '',
      contentGoals: '',
      // Media Buying specific fields
      budget: '',
      campaignObjective: '',
      targetLocations: '',
      adFormats: '',
      // Content Calendar specific fields
      startDate: '',
      contentCategories: '',
      teamMembers: '',
      // Docs Template specific fields
      documentType: '',
      brandVoice: '',
      sectionsNeeded: '',
      // Analytics Dashboard specific fields
      metricsToTrack: '',
      dataSources: '',
      reportingFrequency: '',
      // Automation Scripts specific fields
      automationTasks: '',
      integrations: '',
      complexityLevel: ''
    })
    setGeneratedPlan('')
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedPlan)
      alert('تم النسخ إلى الحافظة!')
    } catch (err) {
      console.error('فشل النسخ: ', err)
      alert('فشل النسخ، يرجى المحاولة مرة أخرى.')
    }
  }

  const downloadAsText = () => {
    const blob = new Blob([generatedPlan], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${activeTab}-خطة-جوجل-شيت.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <RTLWrapper className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <Navigation currentPath="/google-sheets-docs-tool-ar" />
      
      <div className="pt-25 pb-12">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-300 px-4 py-2 rounded-full mb-6">
              <HardDrive className="w-4 h-4" />
              <span className="text-sm font-medium">أدوات جوجل احترافية</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent leading-tight">
              أدوات جوجل شيت وجوجل دوكس
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
              قم بإنشاء خطط محتوى وميديا باينج متكاملة متوافقة مع جوجل شيت وجوجل دوكس بأدوات أتمتة احترافية
            </p>
          </motion.div>

          {/* Tools Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {toolSections.map((tool, index) => (
                <motion.button
                  key={tool.id}
                  onClick={() => setActiveTab(tool.id)}
                  className={`p-4 md:p-6 rounded-xl border-2 transition-all duration-300 text-center group h-full flex flex-col ${
                    activeTab === tool.id
                      ? 'bg-gradient-to-br from-green-500/20 to-blue-500/20 border-green-500/50 text-white shadow-lg shadow-green-500/25'
                      : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-green-500/30 hover:shadow-lg hover:shadow-green-500/10'
                  }`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl mb-3 md:mb-4 bg-gradient-to-br ${tool.color} group-hover:scale-110 transition-transform duration-300`}>
                    <tool.icon className={`w-6 h-6 md:w-7 md:h-7 ${
                      activeTab === tool.id ? 'text-white' : 'text-gray-300'
                    }`} />
                  </div>
                  <h3 className="text-base md:text-lg font-bold mb-2 md:mb-3">{tool.title}</h3>
                  <p className="text-xs md:text-sm opacity-80 leading-relaxed flex-1">{tool.description}</p>
                  {activeTab === tool.id && (
                    <Badge className="mt-3 md:mt-4 bg-green-500/20 text-green-300 border-green-500/50 text-xs">
                      نشط
                    </Badge>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-start">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-white/5 backdrop-blur-md border-white/10 shadow-2xl">
                <CardHeader className="pb-6">
                  <CardTitle className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3 md:gap-4">
                    <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-green-500 to-blue-500">
                      <FileSpreadsheet className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    {toolSections.find(t => t.id === activeTab)?.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 md:space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">اسم المشروع</label>
                    <input
                      type="text"
                      value={formData.projectName}
                      onChange={(e) => handleInputChange('projectName', e.target.value)}
                      className="w-full px-3 py-2 md:px-4 md:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all duration-300"
                      placeholder="أدخل اسم المشروع"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">الصناعة</label>
                    <select
                      value={formData.industry}
                      onChange={(e) => handleInputChange('industry', e.target.value)}
                      className="w-full px-3 py-2 md:px-4 md:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all duration-300"
                    >
                      <option value="">اختر الصناعة</option>
                      {industryOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">المدة</label>
                    <select
                      value={formData.duration}
                      onChange={(e) => handleInputChange('duration', e.target.value)}
                      className="w-full px-3 py-2 md:px-4 md:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all duration-300"
                    >
                      <option value="">اختر المدة</option>
                      {durationOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">الجمهور المستهدف</label>
                    <textarea
                      value={formData.targetAudience}
                      onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                      className="w-full px-3 py-2 md:px-4 md:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="صف الجمهور المستهدف"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">الأهداف الرئيسية</label>
                    <textarea
                      value={formData.mainGoals}
                      onChange={(e) => handleInputChange('mainGoals', e.target.value)}
                      className="w-full px-3 py-2 md:px-4 md:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="اذكر الأهداف الرئيسية"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">المنصات المستهدفة</label>
                    <select
                      value={formData.platforms}
                      onChange={(e) => handleInputChange('platforms', e.target.value)}
                      className="w-full px-3 py-2 md:px-4 md:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all duration-300"
                    >
                      <option value="">اختر المنصات</option>
                      {platformOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Dynamic Fields Based on Active Tab */}
                  {activeTab === 'content-plan' && (
                    <>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">محاور المحتوى</label>
                        <textarea
                          value={formData.contentThemes}
                          onChange={(e) => handleInputChange('contentThemes', e.target.value)}
                          className="w-full px-3 py-2 md:px-4 md:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all duration-300 resize-none"
                          placeholder="اذكر محاور المحتوى الرئيسية"
                          rows={2}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">الكلمات المفتاحية</label>
                        <textarea
                          value={formData.keywords}
                          onChange={(e) => handleInputChange('keywords', e.target.value)}
                          className="w-full px-3 py-2 md:px-4 md:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all duration-300 resize-none"
                          placeholder="اذكر الكلمات المفتاحية المستهدفة"
                          rows={2}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">أهداف المحتوى</label>
                        <select
                          value={formData.contentGoals}
                          onChange={(e) => handleInputChange('contentGoals', e.target.value)}
                          className="w-full px-3 py-2 md:px-4 md:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all duration-300"
                        >
                          <option value="">اختر أهداف المحتوى</option>
                          {contentGoalsOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">نوع المحتوى</label>
                        <select
                          value={formData.contentType}
                          onChange={(e) => handleInputChange('contentType', e.target.value)}
                          className="w-full px-3 py-2 md:px-4 md:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all duration-300"
                        >
                          <option value="">اختر نوع المحتوى</option>
                          {contentTypeOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">تكرار النشر</label>
                        <select
                          value={formData.publishingFrequency}
                          onChange={(e) => handleInputChange('publishingFrequency', e.target.value)}
                          className="w-full px-3 py-2 md:px-4 md:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all duration-300"
                        >
                          <option value="">اختر تكرار النشر</option>
                          {frequencyOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </>
                  )}

                  {activeTab === 'media-buying-plan' && (
                    <>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">الميزانية</label>
                        <select
                          value={formData.budget}
                          onChange={(e) => handleInputChange('budget', e.target.value)}
                          className="w-full px-3 py-2 md:px-4 md:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all duration-300"
                        >
                          <option value="">اختر الميزانية</option>
                          {budgetOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">هدف الحملة</label>
                        <select
                          value={formData.campaignObjective}
                          onChange={(e) => handleInputChange('campaignObjective', e.target.value)}
                          className="w-full px-3 py-2 md:px-4 md:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all duration-300"
                        >
                          <option value="">اختر هدف الحملة</option>
                          {campaignObjectiveOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">المناطق المستهدفة</label>
                        <textarea
                          value={formData.targetLocations}
                          onChange={(e) => handleInputChange('targetLocations', e.target.value)}
                          className="w-full px-3 py-2 md:px-4 md:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all duration-300 resize-none"
                          placeholder="اذكر المناطق الجغرافية المستهدفة"
                          rows={2}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">تنسيقات الإعلانات</label>
                        <select
                          value={formData.adFormats}
                          onChange={(e) => handleInputChange('adFormats', e.target.value)}
                          className="w-full px-3 py-2 md:px-4 md:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all duration-300"
                        >
                          <option value="">اختر تنسيقات الإعلانات</option>
                          {adFormatOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">المنصات المستهدفة</label>
                        <select
                          value={formData.platforms}
                          onChange={(e) => handleInputChange('platforms', e.target.value)}
                          className="w-full px-3 py-2 md:px-4 md:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all duration-300"
                        >
                          <option value="">اختر المنصات</option>
                          {platformOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </>
                  )}

                  {activeTab === 'content-calendar' && (
                    <>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">تاريخ البدء</label>
                        <input
                          type="date"
                          value={formData.startDate}
                          onChange={(e) => handleInputChange('startDate', e.target.value)}
                          className="w-full px-3 py-2 md:px-4 md:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all duration-300"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">تصنيفات المحتوى</label>
                        <select
                          value={formData.contentCategories}
                          onChange={(e) => handleInputChange('contentCategories', e.target.value)}
                          className="w-full px-3 py-2 md:px-4 md:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all duration-300"
                        >
                          <option value="">اختر تصنيفات المحتوى</option>
                          {contentCategoryOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">أعضاء الفريق</label>
                        <textarea
                          value={formData.teamMembers}
                          onChange={(e) => handleInputChange('teamMembers', e.target.value)}
                          className="w-full px-3 py-2 md:px-4 md:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all duration-300 resize-none"
                          placeholder="اذكر أعضاء الفريق ومسؤولياتهم"
                          rows={3}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">المنصات المستهدفة</label>
                        <select
                          value={formData.platforms}
                          onChange={(e) => handleInputChange('platforms', e.target.value)}
                          className="w-full px-3 py-2 md:px-4 md:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all duration-300"
                        >
                          <option value="">اختر المنصات</option>
                          {platformOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">تكرار النشر</label>
                        <select
                          value={formData.publishingFrequency}
                          onChange={(e) => handleInputChange('publishingFrequency', e.target.value)}
                          className="w-full px-3 py-2 md:px-4 md:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all duration-300"
                        >
                          <option value="">اختر تكرار النشر</option>
                          {frequencyOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </>
                  )}

                  {activeTab === 'docs-template' && (
                    <>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">نوع المستند</label>
                        <select
                          value={formData.documentType}
                          onChange={(e) => handleInputChange('documentType', e.target.value)}
                          className="w-full px-3 py-2 md:px-4 md:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all duration-300"
                        >
                          <option value="">اختر نوع المستند</option>
                          {documentTypeOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">نبرة العلامة التجارية</label>
                        <select
                          value={formData.brandVoice}
                          onChange={(e) => handleInputChange('brandVoice', e.target.value)}
                          className="w-full px-3 py-2 md:px-4 md:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all duration-300"
                        >
                          <option value="">اختر نبرة العلامة التجارية</option>
                          {brandVoiceOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">الأقسام المطلوبة</label>
                        <textarea
                          value={formData.sectionsNeeded}
                          onChange={(e) => handleInputChange('sectionsNeeded', e.target.value)}
                          className="w-full px-3 py-2 md:px-4 md:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all duration-300 resize-none"
                          placeholder="اذكر الأقسام المطلوبة في المستند"
                          rows={3}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">الأهداف الرئيسية</label>
                        <textarea
                          value={formData.mainGoals}
                          onChange={(e) => handleInputChange('mainGoals', e.target.value)}
                          className="w-full px-3 py-2 md:px-4 md:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all duration-300 resize-none"
                          placeholder="اذكر الأهداف الرئيسية للمستند"
                          rows={3}
                        />
                      </div>
                    </>
                  )}

                  {activeTab === 'analytics-dashboard' && (
                    <>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">المقاييس المطلوب تتبعها</label>
                        <select
                          value={formData.metricsToTrack}
                          onChange={(e) => handleInputChange('metricsToTrack', e.target.value)}
                          className="w-full px-3 py-2 md:px-4 md:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all duration-300"
                        >
                          <option value="">اختر المقاييس</option>
                          {metricsOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">مصادر البيانات</label>
                        <textarea
                          value={formData.dataSources}
                          onChange={(e) => handleInputChange('dataSources', e.target.value)}
                          className="w-full px-3 py-2 md:px-4 md:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all duration-300 resize-none"
                          placeholder="اذكر مصادر البيانات (جوجل أناليتكس، فيسبوك، إلخ)"
                          rows={2}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">تكرار التقارير</label>
                        <select
                          value={formData.reportingFrequency}
                          onChange={(e) => handleInputChange('reportingFrequency', e.target.value)}
                          className="w-full px-3 py-2 md:px-4 md:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all duration-300"
                        >
                          <option value="">اختر تكرار التقارير</option>
                          {reportingFrequencyOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">الأهداف الرئيسية</label>
                        <textarea
                          value={formData.mainGoals}
                          onChange={(e) => handleInputChange('mainGoals', e.target.value)}
                          className="w-full px-3 py-2 md:px-4 md:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all duration-300 resize-none"
                          placeholder="اذكر الأهداف الرئيسية للتحليل"
                          rows={3}
                        />
                      </div>
                    </>
                  )}

                  {activeTab === 'automation-scripts' && (
                    <>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">مهام الأتمتة</label>
                        <select
                          value={formData.automationTasks}
                          onChange={(e) => handleInputChange('automationTasks', e.target.value)}
                          className="w-full px-3 py-2 md:px-4 md:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all duration-300"
                        >
                          <option value="">اختر مهام الأتمتة</option>
                          {automationTaskOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">التكاملات المطلوبة</label>
                        <textarea
                          value={formData.integrations}
                          onChange={(e) => handleInputChange('integrations', e.target.value)}
                          className="w-full px-3 py-2 md:px-4 md:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all duration-300 resize-none"
                          placeholder="اذكر التكاملات المطلوبة (APIs، خدمات خارجية، إلخ)"
                          rows={2}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">مستوى التعقيد</label>
                        <select
                          value={formData.complexityLevel}
                          onChange={(e) => handleInputChange('complexityLevel', e.target.value)}
                          className="w-full px-3 py-2 md:px-4 md:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all duration-300"
                        >
                          <option value="">اختر مستوى التعقيد</option>
                          {complexityOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">الأهداف الرئيسية</label>
                        <textarea
                          value={formData.mainGoals}
                          onChange={(e) => handleInputChange('mainGoals', e.target.value)}
                          className="w-full px-3 py-2 md:px-4 md:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all duration-300 resize-none"
                          placeholder="اذكر الأهداف الرئيسية للأتمتة"
                          rows={3}
                        />
                      </div>
                    </>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button
                      onClick={generatePlan}
                      disabled={isGenerating || !formData.projectName || !formData.industry}
                      className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-medium py-2 md:py-3 px-4 md:px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          جاري الإنشاء...
                        </>
                      ) : (
                        <>
                          <FileSpreadsheet className="w-4 h-4 mr-2" />
                          إنشاء الخطة
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={resetForm}
                      variant="outline"
                      className="flex-1 border-white/20 text-white hover:bg-white/10 font-medium py-2 md:py-3 px-4 md:px-6 rounded-lg transition-all duration-300"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      إعادة تعيين
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Output */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <ToolOutput
                content={generatedPlan}
                isGenerating={isGenerating}
                onCopy={copyToClipboard}
                onDownload={downloadAsText}
                metrics={metrics}
                recommendations={recommendations}
                score={score}
                toolName={toolSections.find(t => t.id === activeTab)?.title || ''}
                language="ar"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </RTLWrapper>
  )
}