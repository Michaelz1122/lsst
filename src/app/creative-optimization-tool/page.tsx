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
  Palette, 
  Eye, 
  Target, 
  Zap, 
  CheckCircle, 
  AlertTriangle,
  Lightbulb,
  Video,
  Image,
  Type,
  MousePointer,
  RefreshCw,
  Download,
  Copy,
  ArrowRight,
  Clock,
  Star,
  TrendingUp,
  Users
} from 'lucide-react'

export default function CreativeOptimizationTool() {
  const [activeTab, setActiveTab] = useState('hook-rate')
  const [formData, setFormData] = useState({
    adType: 'video',
    hookType: 'shock',
    retentionRate: '',
    ctr: '',
    audience: '',
    product: '',
    tone: 'professional',
    cta: '',
    creativeElements: ''
  })
  const [generatedAnalysis, setGeneratedAnalysis] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [metrics, setMetrics] = useState<any[]>([])
  const [recommendations, setRecommendations] = useState<string[]>([])
  const [score, setScore] = useState<number | undefined>(undefined)
  const [results, setResults] = useState<any>(null)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const optimizationTools = [
    {
      id: 'hook-rate',
      title: 'Hook Rate Analyzer',
      description: 'Measure your ad\'s ability to capture attention in the first 3 seconds',
      icon: Eye,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'creative-review',
      title: 'Creative Review Template',
      description: 'Comprehensive evaluation of your ad creative elements',
      icon: Palette,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'performance-prediction',
      title: 'Performance Prediction',
      description: 'Predict creative performance based on key factors',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500'
    }
  ]

  const adTypes = [
    { value: 'video', label: 'Video Ad' },
    { value: 'image', label: 'Image Ad' },
    { value: 'carousel', label: 'Carousel Ad' },
    { value: 'story', label: 'Story Ad' }
  ]

  const hookTypes = [
    { value: 'shock', label: 'Shock/Surprise' },
    { value: 'question', label: 'Provocative Question' },
    { value: 'problem', label: 'Problem Identification' },
    { value: 'benefit', label: 'Strong Benefit' },
    { value: 'story', label: 'Story Opening' },
    { value: 'curiosity', label: 'Curiosity Gap' }
  ]

  const generateHookRateAnalysis = () => {
    const retentionRate = parseFloat(formData.retentionRate) || 0
    const ctr = parseFloat(formData.ctr) || 0

    const getHookPerformance = (retention: number) => {
      if (retention >= 80) return { status: 'Excellent', color: 'text-green-400', icon: '🔥', message: 'Outstanding hook performance!' }
      if (retention >= 60) return { status: 'Good', color: 'text-yellow-400', icon: '⭐', message: 'Solid hook with room for improvement' }
      if (retention >= 40) return { status: 'Average', color: 'text-orange-400', icon: '⚠️', message: 'Hook needs significant improvement' }
      return { status: 'Poor', color: 'text-red-400', icon: '❌', message: 'Hook is failing to capture attention' }
    }

    const hookPerformance = getHookPerformance(retentionRate)

    const getCtrPerformance = (ctr: number) => {
      if (ctr >= 2) return { status: 'Excellent', color: 'text-green-400', icon: '🎯', message: 'Exceptional click-through rate' }
      if (ctr >= 1) return { status: 'Good', color: 'text-yellow-400', icon: '👍', message: 'Good click-through performance' }
      if (ctr >= 0.5) return { status: 'Average', color: 'text-orange-400', icon: '📊', message: 'Average CTR - can be improved' }
      return { status: 'Poor', color: 'text-red-400', icon: '📉', message: 'Low CTR needs attention' }
    }

    const ctrPerformance = getCtrPerformance(ctr)

    const calculateHookScore = (retention: number, ctr: number) => {
      let score = 0
      
      // Retention rate scoring (higher is better)
      if (retention >= 80) score += 50
      else if (retention >= 60) score += 35
      else if (retention >= 40) score += 20
      else score += 10
      
      // CTR scoring (higher is better)
      if (ctr >= 2) score += 50
      else if (ctr >= 1) score += 35
      else if (ctr >= 0.5) score += 20
      else score += 10
      
      return Math.min(100, score)
    }

    const hookScore = calculateHookScore(retentionRate, ctr)

    return `🎯 **Hook Rate Analysis Report**

## 📊 **Performance Overview**

### **Hook Effectiveness**
| Metric | Value | Status | Benchmark |
|--------|-------|---------|-----------|
| **3-Second Retention Rate** | ${retentionRate.toFixed(1)}% | ${hookPerformance.icon} ${hookPerformance.status} | >60% |
| **Click-Through Rate (CTR)** | ${ctr.toFixed(2)}% | ${ctrPerformance.icon} ${ctrPerformance.status} | >1% |
| **Overall Hook Score** | ${hookScore}/100 | ${hookScore >= 70 ? '✅ Excellent' : hookScore >= 50 ? '⚠️ Good' : '❌ Needs Work'} | >70/100 |

## 🔍 **Detailed Analysis**

### **Hook Performance Assessment**
${hookPerformance.message}

**Current Hook Type:** ${hookTypes.find(h => h.value === formData.hookType)?.label || 'Unknown'}

**Analysis:**
${retentionRate >= 80 ? 
  '✅ **Excellent Hook Performance!** Your first 3 seconds are highly effective at capturing and maintaining audience attention. This indicates strong creative execution and audience resonance.' :
  retentionRate >= 60 ? 
  '⚠️ **Good Hook Performance.** Your hook is working well but has room for optimization. Consider testing variations to improve retention further.' :
  retentionRate >= 40 ? 
  '❌ **Average Hook Performance.** Your hook is losing a significant portion of viewers in the first 3 seconds. This needs immediate attention and redesign.' :
  '❌ **Poor Hook Performance.** Your hook is failing to capture attention. Most viewers are dropping off before seeing your main message.'
}

### **CTR Analysis**
${ctrPerformance.message}

**Analysis:**
${ctr >= 2 ? 
  '✅ **Exceptional CTR!** Your creative is not only capturing attention but also compelling users to take action. This indicates strong alignment between hook and call-to-action.' :
  ctr >= 1 ? 
  '⚠️ **Good CTR.** Users are clicking through at a healthy rate. There may be opportunities to optimize the creative-to-CTA flow.' :
  ctr >= 0.5 ? 
  '❌ **Average CTR.** While your hook might be working, the transition to action needs improvement. Consider CTA clarity and creative continuity.' :
  '❌ **Low CTR.** Users are not compelled to click despite viewing your creative. This suggests a disconnect between hook and desired action.'
}

## 🛠️ **Optimization Recommendations**

### **Immediate Actions (${hookScore < 50 ? 'High Priority' : 'Medium Priority'})**
${hookScore < 50 ? 
  '🔥 **CRITICAL: Redesign your hook immediately**\\n• Test different hook types (shock, question, benefit)\\n• Improve visual quality in first 3 seconds\\n• Add stronger emotional triggers\\n• Consider A/B testing with new creatives\\n\\n🎯 **Fix CTA-creative disconnect**\\n• Make CTA more prominent and clear\\n• Ensure creative flows naturally to CTA\\n• Test different CTA placements and wording' :
  '📈 **Continue optimization**\\n• Test hook variations for incremental improvements\\n• Monitor performance across different audience segments\\n• Consider scaling successful elements to other creatives'
}

### **Hook Optimization Strategies**
Based on your current hook type (${hookTypes.find(h => h.value === formData.hookType)?.label}):

${formData.hookType === 'shock' ? 
  '**Shock/Surprise Hook Optimization:**\\n• Increase visual impact with more dramatic imagery\\n• Add unexpected elements in first 2 seconds\\n• Use sound effects or music to enhance surprise\\n• Test different shock levels (subtle vs dramatic)' :
  formData.hookType === 'question' ? 
  '**Question Hook Optimization:**\\n• Make questions more provocative and relevant\\n• Ensure questions align with audience pain points\\n• Add visual reinforcement of the question\\n• Test question placement (visual vs audio)' :
  formData.hookType === 'problem' ? 
  '**Problem Hook Optimization:**\\n• Make problem identification more immediate and clear\\n• Use relatable scenarios in first 3 seconds\\n• Add emotional weight to the problem presentation\\n• Test different problem intensities' :
  formData.hookType === 'benefit' ? 
  '**Benefit Hook Optimization:**\\n• Present benefits more visually and immediately\\n• Use stronger benefit-focused language\\n• Add social proof or credibility elements early\\n• Test different benefit presentation styles' :
  formData.hookType === 'story' ? 
  '**Story Hook Optimization:**\\n• Make story opening more compelling and immediate\\n• Use stronger visual storytelling elements\\n• Add character or conflict introduction earlier\\n• Test different story opening approaches' :
  '**General Hook Optimization:**\\n• Test multiple hook types to find best performer\\n• Improve production quality and visual appeal\\n• Add stronger emotional or psychological triggers\\n• Ensure hook aligns with target audience preferences'
}

### **Creative Enhancement Suggestions**
• **Visual Quality:** Upgrade production value, lighting, and composition
• **Audio Enhancement:** Add compelling music or sound effects
• **Text Overlay:** Include key messages in first 3 seconds
• **Color Psychology:** Use colors that evoke desired emotions
• **Pacing:** Adjust timing for maximum impact

## 📈 **Performance Prediction**

Based on current metrics, predicted performance after optimization:

| Metric | Current | Optimized | Improvement |
|--------|---------|------------|-------------|
| **Retention Rate** | ${retentionRate.toFixed(1)}% | ${Math.min(95, retentionRate + 20).toFixed(1)}% | +${Math.min(20, 95 - retentionRate).toFixed(1)}% |
| **CTR** | ${ctr.toFixed(2)}% | ${Math.min(5, ctr + 1).toFixed(2)}% | +${Math.min(1, 5 - ctr).toFixed(2)}% |
| **Hook Score** | ${hookScore}/100 | ${Math.min(100, hookScore + 25)}/100 | +${Math.min(25, 100 - hookScore)} points |

## 🎯 **Testing Strategy**

### **A/B Test Framework**
1. **Test Variable:** Hook type and creative elements
2. **Sample Size:** Minimum 1,000 impressions per variation
3. **Duration:** 3-7 days depending on traffic
4. **Success Metrics:** Retention rate >70%, CTR >1.5%

### **Test Variations to Consider**
- **Variation A:** ${hookTypes.find(h => h.value === formData.hookType)?.label} (current)
- **Variation B:** ${hookTypes.find(h => h => h.value !== formData.hookType)?.label || 'Alternative hook type'}
- **Variation C:** Enhanced visual quality with same hook
- **Variation D:** Same hook with improved CTA presentation

## 📊 **Next Steps**
1. **Week 1:** Implement immediate optimization recommendations
2. **Week 2:** Launch A/B tests with new creative variations
3. **Week 3:** Analyze test results and identify winners
4. **Week 4:** Scale successful creatives and document learnings

---
*Hook rate analysis based on industry benchmarks and creative best practices*`
  }

  const generateCreativeReview = () => {
    const creativeElements = formData.creativeElements || 'visual, copy, cta'
    const elements = creativeElements.split(',').map(e => e.trim())

    const reviewTemplate = `🎨 **Creative Review Template**

## 📋 **Creative Assessment**

### **Basic Information**
- **Ad Type:** ${adTypes.find(a => a.value === formData.adType)?.label || 'Unknown'}
- **Product/Service:** ${formData.product || 'Not specified'}
- **Target Audience:** ${formData.audience || 'Not specified'}
- **Tone:** ${formData.tone || 'Professional'}
- **Creative Elements:** ${elements.join(', ')}

## 🔍 **Element-by-Element Review**

### **1. Visual Elements ${elements.includes('visual') ? '✅' : '⚠️'}**
${elements.includes('visual') ? 
  '**Assessment:** Visual elements are included in review\\n\\n**Key Questions:**\\n• Does the visual clearly show the product/service?\\n• Is the visual quality professional and appealing?\\n• Does the visual stand out in the feed?\\n• Does the visual support the main message?\\n\\n**Recommendations:**\\n• Ensure high-resolution, professional imagery\\n• Use colors that align with brand and evoke desired emotions\\n• Include product prominently and clearly\\n• Test different visual compositions and layouts' :
  '**Assessment:** Visual elements not specified\\n\\n**Recommendations:**\\n• Add visual assessment to your review process\\n• Include evaluation of image/video quality\\n• Assess visual alignment with brand guidelines\\n• Review visual impact in feed environment'
}

### **2. Copy/Messaging ${elements.includes('copy') ? '✅' : '⚠️'}**
${elements.includes('copy') ? 
  '**Assessment:** Copy elements are included in review\\n\\n**Key Questions:**\\n• Does the copy clearly communicate the value proposition?\\n• Does it address customer pain points or desires?\\n• Is the message concise and easy to understand?\\n• Does it include a clear call-to-action?\\n\\n**Recommendations:**\\n• Focus on benefits rather than features\\n• Use customer-centric language\\n• Keep messages short and scannable\\n• Include strong, action-oriented CTAs' :
  '**Assessment:** Copy elements not specified\\n\\n**Recommendations:**\\n• Add copy assessment to your review process\\n• Evaluate message clarity and impact\\n• Assess CTA effectiveness and prominence\\n• Review copy alignment with target audience'
}

### **3. Call-to-Action (CTA) ${elements.includes('cta') ? '✅' : '⚠️'}**
${elements.includes('cta') ? 
  '**Assessment:** CTA elements are included in review\\n\\n**Key Questions:**\\n• Is the CTA clearly visible and understandable?\\n• Does it use action-oriented language?\\n• Is the benefit of clicking clear?\\n• Does it create urgency or incentive?\\n\\n**Recommendations:**\\n• Use clear, direct action words (Buy Now, Get Started, Learn More)\\n• Make CTA buttons visually prominent\\n• Include value proposition in or near CTA\\n• Test different CTA placements and wording' :
  '**Assessment:** CTA elements not specified\\n\\n**Recommendations:**\\n• Add CTA assessment to your review process\\n• Evaluate CTA clarity and prominence\\n• Assess CTA alignment with campaign goals\\n• Review CTA effectiveness in driving action'
}

## 🎯 **Overall Creative Effectiveness**

### **Scoring Framework**
Rate each element on a scale of 1-10:

| Element | Score (1-10) | Weight | Weighted Score | Notes |
|---------|--------------|--------|----------------|-------|
| **Visual Impact** | [Score] | 30% | [Calculated] | [Assessment notes] |
| **Message Clarity** | [Score] | 30% | [Calculated] | [Assessment notes] |
| **Brand Alignment** | [Score] | 20% | [Calculated] | [Assessment notes] |
| **CTA Effectiveness** | [Score] | 20% | [Calculated] | [Assessment notes] |
| **TOTAL SCORE** | | **100%** | **[Total]** | **[Overall Assessment]** |

### **Performance Indicators**
**Excellent (8-10):** Creative is highly effective and ready to scale
**Good (6-7):** Creative is working well with minor optimization needed
**Average (4-5):** Creative has potential but needs significant improvement
**Poor (1-3):** Creative needs complete redesign

## 🛠️ **Optimization Checklist**

### **High Priority Items**
- [ ] Visual quality meets professional standards
- [ ] Message is clear and compelling
- [ ] CTA is prominent and action-oriented
- [ ] Creative aligns with brand guidelines
- [ ] Creative stands out in competitive environment

### **Medium Priority Items**
- [ ] Color scheme evokes desired emotions
- [ ] Typography is readable and on-brand
- [ ] Layout guides eye to key elements
- [ ] Creative works across different placements
- [ ] Message resonates with target audience

### **Low Priority Items**
- [ ] Creative includes subtle brand elements
- [ ] Animation/motion is smooth and purposeful
- [ ] Creative has shareable qualities
- [ ] Creative supports A/B testing framework
- [ ] Creative documentation is complete

## 📊 **Testing Recommendations**

### **A/B Test Ideas**
1. **Visual Test:** Same message, different visual execution
2. **Copy Test:** Same visual, different messaging approach
3. **CTA Test:** Same creative, different call-to-action
4. **Layout Test:** Same elements, different arrangement

### **Success Metrics**
- **Primary:** CTR lift of 20% or more
- **Secondary:** Conversion rate improvement
- **Tertiary:** Brand lift and recall metrics

## 🎯 **Next Steps**
1. **Complete Review:** Fill in the scoring framework above
2. **Identify Gaps:** Note areas needing improvement
3. **Create Variations:** Develop optimized versions
4. **Test & Learn:** Launch A/B tests and measure results
5. **Scale Winners:** Roll out successful creatives broadly

---
*Creative review template based on industry best practices and conversion optimization principles*`
  }

  const generatePerformancePrediction = () => {
    const adType = formData.adType
    const hookType = formData.hookType
    const audience = formData.audience
    const product = formData.product

    const getAdTypeScore = (type: string) => {
      const scores: any = {
        'video': { base: 85, potential: 95, reason: 'Video ads typically have higher engagement and storytelling potential' },
        'image': { base: 70, potential: 85, reason: 'Image ads are simple and clear but limited in storytelling' },
        'carousel': { base: 75, potential: 90, reason: 'Carousel ads allow multiple product showcases' },
        'story': { base: 80, potential: 92, reason: 'Story ads have full-screen attention and immersive experience' }
      }
      return scores[type] || scores.video
    }

    const getHookTypeScore = (type: string) => {
      const scores: any = {
        'shock': { base: 80, potential: 90, reason: 'Shock hooks grab immediate attention but may alienate some audiences' },
        'question': { base: 75, potential: 88, reason: 'Questions engage curiosity and are generally safe' },
        'problem': { base: 78, potential: 87, reason: 'Problem identification creates relevance and need' },
        'benefit': { base: 82, potential: 91, reason: 'Benefit-focused hooks communicate value immediately' },
        'story': { base: 85, potential: 93, reason: 'Story openings create emotional connections' },
        'curiosity': { base: 77, potential: 89, reason: 'Curiosity gaps drive engagement and completion' }
      }
      return scores[type] || scores.benefit
    }

    const adTypeScore = getAdTypeScore(adType)
    const hookTypeScore = getHookTypeScore(hookType)

    const calculateOverallScore = () => {
      const adTypeWeight = 0.4
      const hookTypeWeight = 0.6
      
      return Math.round((adTypeScore.base * adTypeWeight) + (hookTypeScore.base * hookTypeWeight))
    }

    const overallScore = calculateOverallScore()

    const getPerformanceLevel = (score: number) => {
      if (score >= 85) return { level: 'Excellent', color: 'text-green-400', icon: '🏆', message: 'Exceptional performance expected' }
      if (score >= 70) return { level: 'Good', color: 'text-yellow-400', icon: '⭐', message: 'Strong performance anticipated' }
      if (score >= 55) return { level: 'Average', color: 'text-orange-400', icon: '📊', message: 'Moderate performance expected' }
      return { level: 'Below Average', color: 'text-red-400', icon: '⚠️', message: 'Performance concerns identified' }
    }

    const performance = getPerformanceLevel(overallScore)

    return `🔮 **Creative Performance Prediction**

## 📊 **Performance Forecast**

### **Overall Prediction**
**Predicted Performance Score:** ${overallScore}/100
**Performance Level:** ${performance.icon} ${performance.level}
**Assessment:** ${performance.message}

<div style="background: linear-gradient(90deg, #10b981 0%, #10b981 ${overallScore}%, #374151 ${overallScore}%, #374151 100%); height: 20px; border-radius: 10px; margin: 10px 0;"></div>

## 🎯 **Factor Analysis**

### **1. Ad Type Impact**
**Selected:** ${adTypes.find(a => a.value === adType)?.label || 'Unknown'}
**Base Score:** ${adTypeScore.base}/100
**Potential Score:** ${adTypeScore.potential}/100

**Analysis:** ${adTypeScore.reason}

**Performance Characteristics:**
- **Engagement Potential:** ${adType === 'video' ? 'High - Video allows storytelling and emotional connection' : adType === 'image' ? 'Medium - Simple and clear but limited depth' : adType === 'carousel' ? 'High - Multiple products increase engagement' : 'High - Full-screen attention drives focus'}
- **Production Complexity:** ${adType === 'video' ? 'High - Requires more resources and expertise' : adType === 'image' ? 'Low - Easier to produce and test' : adType === 'carousel' ? 'Medium - Multiple images require coordination' : 'Medium - Vertical format needs specific optimization'}
- **Platform Fit:** ${adType === 'video' ? 'Excellent - Works well across all major platforms' : adType === 'image' ? 'Good - Universal compatibility' : adType === 'carousel' ? 'Very Good - Ideal for product showcases' : 'Excellent - Perfect for mobile-first platforms'}

### **2. Hook Type Impact**
**Selected:** ${hookTypes.find(h => h.value === hookType)?.label || 'Unknown'}
**Base Score:** ${hookTypeScore.base}/100
**Potential Score:** ${hookTypeScore.potential}/100

**Analysis:** ${hookTypeScore.reason}

**Performance Characteristics:**
- **Attention Capture:** ${hookType === 'shock' ? 'Very High - Immediate impact but risky' : hookType === 'question' ? 'High - Engages curiosity safely' : hookType === 'problem' ? 'High - Creates relevance and need' : hookType === 'benefit' ? 'High - Communicates value clearly' : hookType === 'story' ? 'Very High - Emotional connection' : 'High - Drives completion'}
- **Audience Resonance:** ${hookType === 'shock' ? 'Medium - May alienate some demographics' : hookType === 'question' ? 'High - Universally relatable' : hookType === 'problem' ? 'High - Strong for targeted audiences' : hookType === 'benefit' ? 'Very High - Clear value proposition' : hookType === 'story' ? 'Very High - Emotional broad appeal' : 'High - Curiosity is universal'}
- **Brand Safety:** ${hookType === 'shock' ? 'Low - Higher risk of negative association' : hookType === 'question' ? 'High - Generally safe and positive' : hookType === 'problem' ? 'Medium - Depends on problem framing' : hookType === 'benefit' ? 'Very High - Positive brand association' : hookType === 'story' ? 'High - Emotional but generally safe' : 'Medium - Depends on curiosity approach'}

## 📈 **Predicted Metrics**

Based on historical data and industry benchmarks, here are the predicted performance ranges:

| Metric | Conservative | Expected | Optimistic | Industry Average |
|--------|-------------|----------|------------|------------------|
| **CTR (%)** | ${Math.max(0.3, overallScore * 0.015).toFixed(2)} | ${Math.max(0.5, overallScore * 0.025).toFixed(2)} | ${Math.max(0.8, overallScore * 0.035).toFixed(2)} | 1.0% |
| **Conversion Rate (%)** | ${Math.max(0.5, overallScore * 0.08).toFixed(1)} | ${Math.max(1.0, overallScore * 0.12).toFixed(1)} | ${Math.max(2.0, overallScore * 0.18).toFixed(1)} | 2.0% |
| **Retention Rate (%)** | ${Math.max(40, overallScore * 0.6).toFixed(0)} | ${Math.max(55, overallScore * 0.75).toFixed(0)} | ${Math.max(70, overallScore * 0.9).toFixed(0)} | 60% |
| **CPM ($)** | ${Math.min(30, 50 - overallScore * 0.3).toFixed(2)} | ${Math.min(20, 35 - overallScore * 0.2).toFixed(2)} | ${Math.min(10, 25 - overallScore * 0.15).toFixed(2)} | $15.00 |

## 🎯 **Success Probability**

### **Likelihood of Success**
- **High Success (>80% score):** ${overallScore >= 80 ? '✅ Very Likely' : overallScore >= 70 ? '⚠️ Possible with optimization' : '❌ Unlikely without changes'}
- **Moderate Success (60-79% score):** ${overallScore >= 60 && overallScore < 80 ? '✅ Likely' : overallScore >= 50 && overallScore < 60 ? '⚠️ Possible with effort' : '❌ Challenging'}
- **Low Success (<60% score):** ${overallScore < 60 ? '⚠️ Requires significant changes' : '✅ Unlikely to need major changes'}

### **Key Success Factors**
${overallScore >= 80 ? 
  '🎉 **Strong position for success!**\\n• Excellent ad type and hook combination\\n• High engagement and conversion potential\\n• Competitive advantage in performance metrics\\n• Ready for scaling with confidence' :
  overallScore >= 60 ? 
  '⚠️ **Good foundation with optimization needed**\\n• Solid creative approach\\n• Some elements need refinement\\n• Potential for good performance with tweaks\\n• Recommend testing before full scale' :
  '❌ **Significant improvements required**\\n• Current combination underperforming\\n• Multiple elements need redesign\\n• High risk of poor performance\\n• Recommend creative overhaul before launch'
}

## 🛠️ **Optimization Recommendations**

### **High Impact (${overallScore >= 70 ? 'Optional' : 'Essential'})**
${overallScore >= 70 ? 
  '• Fine-tune hook execution for maximum impact\\n• Test different visual presentations\\n• Optimize CTA placement and clarity\\n• Consider minor messaging adjustments' :
  '• Reconsider hook type - test alternatives\\n• Evaluate ad type suitability for goals\\n• Redesign visual elements for better impact\\n• Completely rethink messaging approach'
}

### **Medium Impact (${overallScore >= 70 ? 'Recommended' : 'Critical'})**
• A/B test different creative variations
• Optimize for specific platform requirements
• Improve production quality and polish
• Enhance brand consistency and recognition

### **Testing Strategy**
1. **Phase 1:** Test 3-4 creative variations with different hooks
2. **Phase 2:** Optimize winning variation based on performance data
3. **Phase 3:** Scale successful creative to broader audiences
4. **Phase 4:** Continuously monitor and iterate based on results

## 📊 **Risk Assessment**

### **Low Risk Factors**
- **Ad Type Suitability:** ${adTypeScore.base >= 75 ? '✅ Well-suited for campaign goals' : '⚠️ May not be optimal choice'}
- **Hook Type Effectiveness:** ${hookTypeScore.base >= 75 ? '✅ Strong hook selection' : '⚠️ Hook may underperform'}

### **Medium Risk Factors**
- **Audience Alignment:** ${audience ? '✅ Target audience specified' : '⚠️ Audience not clearly defined'}
- **Product Fit:** ${product ? '✅ Product clearly identified' : '⚠️ Product definition unclear'}

### **High Risk Factors**
- **Creative Execution:** Quality of final creative not yet determined
- **Market Conditions:** External factors may impact performance
- **Competitive Landscape:** Competitor activity may affect results

## 🎯 **Final Recommendation**

**Overall Assessment:** ${performance.level} performance expected

**Launch Decision:** ${overallScore >= 70 ? '✅ **PROCEED** - Creative shows strong potential' : overallScore >= 55 ? '⚠️ **PROCEED WITH CAUTION** - Creative needs optimization first' : '❌ **STOP** - Creative requires significant redesign'}

**Immediate Next Steps:**
${overallScore >= 70 ? 
  '1. Finalize creative production with current direction\\n2. Prepare for launch with monitoring setup\\n3. Plan for scaling based on initial performance\\n4. Document learnings for future campaigns' :
  overallScore >= 55 ? 
  '1. Implement recommended optimizations\\n2. Test multiple creative variations\\n3. Validate performance with small budget test\\n4. Scale only if performance meets thresholds' :
  '1. Redesign creative elements\\n2. Reconsider ad type and hook combination\\n3. Test completely new creative approaches\\n4. Only launch when performance indicators improve'
}

---
*Performance prediction based on historical data, industry benchmarks, and creative best practices*`
  }

  const generateAnalysis = async () => {
    setIsGenerating(true)
    
    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tool: 'creative-optimization',
          formData,
          language: 'en',
          context: `Active tab: ${activeTab}, Tool: ${optimizationTools.find(t => t.id === activeTab)?.title}`
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate analysis')
      }

      const result = await response.json()
      
      setGeneratedAnalysis(result.content)
      setMetrics(result.metrics || [])
      setRecommendations(result.recommendations || [])
      setScore(result.score || 85)
      
      // Create results object for EnhancedResultsDisplay
      const newResults = {
        content: result.content,
        title: optimizationTools.find(t => t.id === activeTab)?.title || 'Creative Optimization',
        metrics: result.metrics || [],
        recommendations: result.recommendations || [],
        score: result.score || 85
      }
      setResults(newResults)
      
    } catch (error) {
      console.error('AI generation error:', error)
      // Fallback to original generation
      let analysis = ''
      
      switch (activeTab) {
        case 'hook-rate':
          analysis = generateHookRateAnalysis()
          break
        case 'creative-review':
          analysis = generateCreativeReview()
          break
        case 'performance-prediction':
          analysis = generatePerformancePrediction()
          break
        default:
          analysis = generateHookRateAnalysis()
      }
      
      setGeneratedAnalysis(analysis)
      
      // Create results object for fallback
      const fallbackResults = {
        content: analysis,
        title: optimizationTools.find(t => t.id === activeTab)?.title || 'Creative Optimization',
        metrics: [],
        recommendations: [],
        score: 75
      }
      setResults(fallbackResults)
    } finally {
      setIsGenerating(false)
    }
  }

  const resetForm = () => {
    setFormData({
      adType: 'video',
      hookType: 'shock',
      retentionRate: '',
      ctr: '',
      audience: '',
      product: '',
      tone: 'professional',
      cta: '',
      creativeElements: ''
    })
    setGeneratedAnalysis('')
    setResults(null)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedAnalysis)
      alert('Copied to clipboard!')
    } catch (err) {
      console.error('Failed to copy: ', err)
      alert('Failed to copy, please try again.')
    }
  }

  const downloadAsText = () => {
    const blob = new Blob([generatedAnalysis], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${activeTab}-analysis.txt`
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

      <Navigation currentPath="/creative-optimization-tool" />

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-20 relative">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center"
            >
              <motion.div 
                className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Palette className="w-4 h-4" />
                <span className="text-sm font-medium">Creative Optimization Suite</span>
              </motion.div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  Creative Optimization Tool
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                Measure hook rates, review creative elements, and predict performance. 
                Optimize your creatives based on data, not just gut feelings.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button 
                  onClick={() => document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                >
                  Explore Tools
                </button>
                <button 
                  onClick={() => document.getElementById('optimizer')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300"
                >
                  Start Optimizing
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Tools Section */}
        <section id="tools" className="py-20 bg-gradient-to-b from-black to-gray-900">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">Creative Optimization Tools</h2>
              <p className="text-xl text-gray-400">Choose the right tool for your creative needs</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {optimizationTools.map((tool, index) => (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => setActiveTab(tool.id)}
                  className={`bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border cursor-pointer transition-all duration-300 hover:scale-105 ${
                    activeTab === tool.id 
                      ? 'border-purple-500/50 shadow-lg shadow-purple-500/20' 
                      : 'border-white/10 hover:border-purple-500/30'
                  }`}
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${tool.color} rounded-2xl flex items-center justify-center mb-6`}>
                    <tool.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{tool.title}</h3>
                  <p className="text-gray-300 mb-4">{tool.description}</p>
                  <div className="flex items-center gap-2 text-purple-400">
                    <ArrowRight className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {activeTab === tool.id ? 'Selected' : 'Select tool'}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Optimizer Section */}
        <section id="optimizer" className="py-20 bg-gradient-to-b from-gray-900 to-black">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">Optimize Your Creative</h2>
              <p className="text-xl text-gray-400">Input your creative data for comprehensive analysis</p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Input Form */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Card className="bg-white/5 backdrop-blur-md border-white/10 shadow-2xl">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-2xl font-bold text-white flex items-center gap-3">
                      <Palette className="w-8 h-8 text-purple-400" />
                      Creative Data
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Ad Type
                        </label>
                        <select
                          value={formData.adType}
                          onChange={(e) => handleInputChange('adType', e.target.value)}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          {adTypes.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Hook Type
                        </label>
                        <select
                          value={formData.hookType}
                          onChange={(e) => handleInputChange('hookType', e.target.value)}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          {hookTypes.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          3-Sec Retention Rate (%)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          value={formData.retentionRate}
                          onChange={(e) => handleInputChange('retentionRate', e.target.value)}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="65.5"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          CTR (%)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={formData.ctr}
                          onChange={(e) => handleInputChange('ctr', e.target.value)}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="1.2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Target Audience
                        </label>
                        <input
                          type="text"
                          value={formData.audience}
                          onChange={(e) => handleInputChange('audience', e.target.value)}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Young professionals, 25-35"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Product/Service
                        </label>
                        <input
                          type="text"
                          value={formData.product}
                          onChange={(e) => handleInputChange('product', e.target.value)}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Fitness app subscription"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Creative Elements
                        </label>
                        <input
                          type="text"
                          value={formData.creativeElements}
                          onChange={(e) => handleInputChange('creativeElements', e.target.value)}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="visual, copy, cta"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Tone
                        </label>
                        <select
                          value={formData.tone}
                          onChange={(e) => handleInputChange('tone', e.target.value)}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          <option value="professional">Professional</option>
                          <option value="friendly">Friendly</option>
                          <option value="urgent">Urgent</option>
                          <option value="emotional">Emotional</option>
                          <option value="humorous">Humorous</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button
                        onClick={generateAnalysis}
                        disabled={isGenerating}
                        className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                      >
                        {isGenerating ? (
                          <>
                            <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Zap className="w-5 h-5 mr-2" />
                            Generate Analysis
                          </>
                        )}
                      </Button>
                      <Button
                        onClick={resetForm}
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        Reset
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Output */}
              {/* Results - Only show when results exist */}
              {results && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <EnhancedResultsDisplay
                    results={results}
                    onReset={() => {
                      setResults(null)
                      setFormData({
                        adType: 'video',
                        hookType: 'shock',
                        retentionRate: '',
                        ctr: '',
                        audience: '',
                        product: '',
                        tone: 'professional',
                        cta: '',
                        creativeElements: ''
                      })
                    }}
                    exportData={{
                      content: results.content,
                      format: 'txt',
                      filename: `${activeTab}-optimization.txt`
                    }}
                    language="en"
                  />
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gradient-to-b from-black to-gray-900">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">Why Creative Optimization?</h2>
              <p className="text-xl text-gray-400">Data-driven creative decisions for better performance</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-8 rounded-2xl border border-purple-500/20 backdrop-blur-sm"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Hook Rate Analysis</h3>
                <p className="text-gray-300">
                  Measure your ad's ability to capture attention in the critical first 3 seconds. Test different hook types and optimize for maximum retention.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 p-8 rounded-2xl border border-blue-500/20 backdrop-blur-sm"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6">
                  <Palette className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Creative Review</h3>
                <p className="text-gray-300">
                  Comprehensive evaluation of visual elements, copy, and CTAs. Get structured feedback and actionable recommendations for improvement.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-8 rounded-2xl border border-green-500/20 backdrop-blur-sm"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Performance Prediction</h3>
                <p className="text-gray-300">
                  Predict creative performance before launch. Get success probability, risk assessment, and data-backed launch recommendations.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}