export interface AIGenerationParams {
  tool: string
  formData: any
  language: 'en' | 'ar'
  context?: string
}

export interface AIGenerationResult {
  content: string
  metrics?: {
    label: string
    value: string
    trend?: 'up' | 'down' | 'stable'
    color?: string
  }[]
  recommendations?: string[]
  score?: number
}

export class AIService {
  private static instance: AIService

  private constructor() {}

  static async getInstance(): Promise<AIService> {
    if (!AIService.instance) {
      AIService.instance = new AIService()
    }
    return AIService.instance
  }

  async generateContent(params: AIGenerationParams): Promise<AIGenerationResult> {
    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      })

      if (!response.ok) {
        throw new Error('Failed to generate content')
      }

      const result = await response.json()
      return result
    } catch (error) {
      console.error('AI generation error:', error)
      // Fallback to template-based content
      return this.generateFallbackContent(params.tool, params.formData, params.language)
    }
  }

  private generateFallbackContent(tool: string, formData: any, language: 'en' | 'ar'): AIGenerationResult {
    // Fallback content generation
    const fallbackContent = language === 'ar' 
      ? `**محتوى احتياطي لـ ${formData.product || 'المنتج'}**

هذا محتوى احتياطي تم إنشاؤه تلقائياً. يرجى المحاولة مرة أخرى لاحقاً للحصول على محتوى AI عالي الجودة.

### المميزات:
- جودة عالية
- سعر تنافسي
- خدمة ممتازة

### للطلب:
راسلنا الآن للحصول على المزيد من المعلومات!`
      : `**Fallback content for ${formData.product || 'Product'}**

This is fallback content generated automatically. Please try again later for high-quality AI content.

### Features:
- High quality
- Competitive price
- Excellent service

### To Order:
Contact us now for more information!`

    return {
      content: fallbackContent,
      metrics: [
        {
          label: language === 'ar' ? 'الحالة' : 'Status',
          value: 'Fallback',
          trend: 'stable' as const,
          color: 'text-yellow-400'
        }
      ],
      recommendations: [
        language === 'ar' 
          ? 'يرجى المحاولة مرة أخرى لاحقاً'
          : 'Please try again later'
      ],
      score: 60
    }
  }
}