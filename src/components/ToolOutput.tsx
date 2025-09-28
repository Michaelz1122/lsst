'use client'

import { ReactNode } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Copy, Download, Star, TrendingUp, Award, CheckCircle, FileText, BarChart3, Lightbulb } from 'lucide-react'

interface ToolOutputProps {
  title: string
  content: string
  metrics?: {
    label: string
    value: string
    trend?: 'up' | 'down' | 'stable'
    color?: string
    icon?: ReactNode
  }[]
  recommendations?: string[]
  score?: number
  isLoading?: boolean
  onCopy?: () => void
  onDownload?: () => void
  className?: string
  language?: 'ar' | 'en'
}

export default function ToolOutput({
  title,
  content,
  metrics,
  recommendations,
  score,
  isLoading = false,
  onCopy,
  onDownload,
  className = '',
  language = 'ar'
}: ToolOutputProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400 bg-green-500/20 border-green-500/50'
    if (score >= 60) return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/50'
    return 'text-red-400 bg-red-500/20 border-red-500/50'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return language === 'ar' ? 'ممتاز' : 'Excellent'
    if (score >= 60) return language === 'ar' ? 'جيد' : 'Good'
    if (score >= 40) return language === 'ar' ? 'مقبول' : 'Acceptable'
    return language === 'ar' ? 'ضعيف' : 'Poor'
  }

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <Star className="w-4 h-4" />
    if (score >= 60) return <Award className="w-4 h-4" />
    if (score >= 40) return <BarChart3 className="w-4 h-4" />
    return <Lightbulb className="w-4 h-4" />
  }

  if (isLoading) {
    return (
      <Card className={`bg-white/5 backdrop-blur-md border-white/10 ${className}`}>
        <CardContent className="p-8">
          <div className="flex items-center justify-center space-x-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
            <span className="text-gray-300">{language === 'ar' ? 'جاري إنشاء المحتوى...' : 'Generating content...'}</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header with Score */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex-1">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight">{title}</h3>
          {score !== undefined && (
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${getScoreColor(score)}`}>
              {getScoreIcon(score)}
              <span className="text-sm font-medium">{getScoreLabel(score)} ({score}/100)</span>
            </div>
          )}
        </div>
        <div className="flex gap-3 flex-shrink-0">
          {onCopy && (
            <Button
              variant="outline"
              size="sm"
              onClick={onCopy}
              className="border-white/20 bg-white/5 text-white font-medium px-4 py-2 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              <Copy className="w-4 h-4 ml-2" />
              {language === 'ar' ? 'نسخ' : 'Copy'}
            </Button>
          )}
          {onDownload && (
            <Button
              variant="outline"
              size="sm"
              onClick={onDownload}
              className="border-white/20 bg-white/5 text-white font-medium px-4 py-2 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              <Download className="w-4 h-4 ml-2" />
              {language === 'ar' ? 'تحميل' : 'Download'}
            </Button>
          )}
        </div>
      </div>

      {/* Metrics */}
      {metrics && metrics.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {metrics.map((metric, index) => (
            <Card key={index} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {metric.icon && <div className="text-purple-400">{metric.icon}</div>}
                      <p className="text-xs text-gray-400">{metric.label}</p>
                    </div>
                    <p className={`text-lg font-bold ${metric.color || 'text-white'}`}>
                      {metric.value}
                    </p>
                  </div>
                  {metric.trend && (
                    <div className="flex items-center gap-1">
                      {metric.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-400" />}
                      {metric.trend === 'down' && <TrendingUp className="w-4 h-4 text-red-400 rotate-180" />}
                      {metric.trend === 'stable' && <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Main Content */}
      <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:border-white/20 transition-colors">
        <CardContent className="p-4 md:p-6">
          <div className="prose prose-invert max-w-none">
            <div 
              className="text-gray-300 leading-relaxed max-h-96 overflow-y-auto custom-scrollbar"
              dangerouslySetInnerHTML={{ 
                __html: (content || '')
                  .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
                  .replace(/\*(.*?)\*/g, '<em class="text-purple-300">$1</em>')
                  .replace(/### (.*?)\n/g, '<h3 class="text-lg font-bold text-white mt-6 mb-3 border-b border-white/20 pb-2">$1</h3>')
                  .replace(/#### (.*?)\n/g, '<h4 class="text-md font-semibold text-white mt-4 mb-2 text-purple-300">$1</h4>')
                  .replace(/📊\*\*(.*?)\*\*/g, '<div class="bg-blue-500/20 border-l-4 border-blue-500 p-3 my-3"><strong class="text-blue-300">$1</strong></div>')
                  .replace(/💰\*\*(.*?)\*\*/g, '<div class="bg-green-500/20 border-l-4 border-green-500 p-3 my-3"><strong class="text-green-300">$1</strong></div>')
                  .replace(/🎯\*\*(.*?)\*\*/g, '<div class="bg-purple-500/20 border-l-4 border-purple-500 p-3 my-3"><strong class="text-purple-300">$1</strong></div>')
                  .replace(/📱\*\*(.*?)\*\*/g, '<div class="bg-cyan-500/20 border-l-4 border-cyan-500 p-3 my-3"><strong class="text-cyan-300">$1</strong></div>')
                  .replace(/📈\*\*(.*?)\*\*/g, '<div class="bg-yellow-500/20 border-l-4 border-yellow-500 p-3 my-3"><strong class="text-yellow-300">$1</strong></div>')
                  .replace(/🎪\*\*(.*?)\*\*/g, '<div class="bg-orange-500/20 border-l-4 border-orange-500 p-3 my-3"><strong class="text-orange-300">$1</strong></div>')
                  .replace(/⚙️\*\*(.*?)\*\*/g, '<div class="bg-gray-500/20 border-l-4 border-gray-500 p-3 my-3"><strong class="text-gray-300">$1</strong></div>')
                  .replace(/🔧\*\*(.*?)\*\*/g, '<div class="bg-indigo-500/20 border-l-4 border-indigo-500 p-3 my-3"><strong class="text-indigo-300">$1</strong></div>')
                  .replace(/📝\*\*(.*?)\*\*/g, '<div class="bg-pink-500/20 border-l-4 border-pink-500 p-3 my-3"><strong class="text-pink-300">$1</strong></div>')
                  .replace(/\n- (.*?)\n/g, '\n<li class="mb-2 flex items-start gap-2"><span class="text-purple-400 mt-1">•</span><span>$1</span></li>\n')
                  .replace(/\n• (.*?)\n/g, '\n<li class="mb-2 flex items-start gap-2"><span class="text-purple-400 mt-1">•</span><span>$1</span></li>\n')
                  .replace(/(<li.*?>.*?<\/li>)/s, '<ul class="list-none space-y-2 mb-4">$1</ul>')
                  .replace(/\n\n/g, '</p><p class="mb-3">')
                  .replace(/^(.*)$/gm, '<p class="mb-3">$1</p>')
                  .replace(/```([^`]+)```/g, '<pre class="bg-gray-900/50 border border-gray-700 rounded-lg p-3 my-3 overflow-x-auto"><code class="text-sm text-green-300">$1</code></pre>')
                  .replace(/`([^`]+)`/g, '<code class="bg-gray-800 text-purple-300 px-1 py-0.5 rounded text-sm">$1</code>')
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      {recommendations && recommendations.length > 0 && (
        <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20 hover:border-purple-500/30 transition-colors">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-white text-lg">
              <Award className="w-5 h-5 text-purple-400" />
              {language === 'ar' ? 'توصيات ذكية' : 'Smart Recommendations'}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-300 text-sm leading-relaxed">{recommendation}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}