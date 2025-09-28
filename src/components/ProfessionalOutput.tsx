'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Copy, 
  Download, 
  Star, 
  TrendingUp, 
  Award, 
  CheckCircle, 
  FileText, 
  BarChart3, 
  Lightbulb,
  FileDown,
  File,
  Globe,
  Printer,
  Share2,
  Eye,
  RefreshCw
} from 'lucide-react'

interface ProfessionalOutputProps {
  title: string
  content: string
  metrics?: {
    label: string
    value: string
    trend?: 'up' | 'down' | 'stable'
    color?: string
    icon?: React.ReactNode
  }[]
  recommendations?: string[]
  score?: number
  isLoading?: boolean
  onCopy?: () => void
  onDownload?: () => void
  className?: string
  language?: 'ar' | 'en'
  toolType?: string
}

export default function ProfessionalOutput({
  title,
  content,
  metrics,
  recommendations,
  score,
  isLoading = false,
  onCopy,
  onDownload,
  className = '',
  language = 'ar',
  toolType = 'general'
}: ProfessionalOutputProps) {
  const [viewMode, setViewMode] = useState<'formatted' | 'raw'>('formatted')
  const [exportFormat, setExportFormat] = useState<'pdf' | 'word' | 'html'>('pdf')
  const [isExporting, setIsExporting] = useState(false)

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

  const formatContent = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="text-purple-300">$1</em>')
      .replace(/### (.*?)\n/g, '<h3 class="text-xl font-bold text-white mt-6 mb-4 pb-2 border-b border-white/20">$1</h3>')
      .replace(/#### (.*?)\n/g, '<h4 class="text-lg font-semibold text-white mt-5 mb-3 text-purple-300">$1</h4>')
      .replace(/##### (.*?)\n/g, '<h5 class="text-md font-medium text-white mt-4 mb-2 text-blue-300">$1</h5>')
      .replace(/📊\*\*(.*?)\*\*/g, '<div class="bg-blue-500/20 border-r-4 border-blue-500 p-4 my-4 rounded-r-lg"><strong class="text-blue-300 text-lg">$1</strong></div>')
      .replace(/💰\*\*(.*?)\*\*/g, '<div class="bg-green-500/20 border-r-4 border-green-500 p-4 my-4 rounded-r-lg"><strong class="text-green-300 text-lg">$1</strong></div>')
      .replace(/🎯\*\*(.*?)\*\*/g, '<div class="bg-purple-500/20 border-r-4 border-purple-500 p-4 my-4 rounded-r-lg"><strong class="text-purple-300 text-lg">$1</strong></div>')
      .replace(/📱\*\*(.*?)\*\*/g, '<div class="bg-cyan-500/20 border-r-4 border-cyan-500 p-4 my-4 rounded-r-lg"><strong class="text-cyan-300 text-lg">$1</strong></div>')
      .replace(/📈\*\*(.*?)\*\*/g, '<div class="bg-yellow-500/20 border-r-4 border-yellow-500 p-4 my-4 rounded-r-lg"><strong class="text-yellow-300 text-lg">$1</strong></div>')
      .replace(/🎪\*\*(.*?)\*\*/g, '<div class="bg-orange-500/20 border-r-4 border-orange-500 p-4 my-4 rounded-r-lg"><strong class="text-orange-300 text-lg">$1</strong></div>')
      .replace(/⚙️\*\*(.*?)\*\*/g, '<div class="bg-gray-500/20 border-r-4 border-gray-500 p-4 my-4 rounded-r-lg"><strong class="text-gray-300 text-lg">$1</strong></div>')
      .replace(/🔧\*\*(.*?)\*\*/g, '<div class="bg-indigo-500/20 border-r-4 border-indigo-500 p-4 my-4 rounded-r-lg"><strong class="text-indigo-300 text-lg">$1</strong></div>')
      .replace(/📝\*\*(.*?)\*\*/g, '<div class="bg-pink-500/20 border-r-4 border-pink-500 p-4 my-4 rounded-r-lg"><strong class="text-pink-300 text-lg">$1</strong></div>')
      .replace(/\n- (.*?)\n/g, '\n<li class="mb-3 flex items-start gap-3"><span class="text-purple-400 mt-1 text-lg">•</span><span class="flex-1">$1</span></li>\n')
      .replace(/\n• (.*?)\n/g, '\n<li class="mb-3 flex items-start gap-3"><span class="text-purple-400 mt-1 text-lg">•</span><span class="flex-1">$1</span></li>\n')
      .replace(/(<li.*?>.*?<\/li>)/s, '<ul class="list-none space-y-2 mb-6 pr-4">$1</ul>')
      .replace(/\n\n/g, '</p><p class="mb-4 text-gray-300 leading-relaxed">')
      .replace(/^(.*)$/gm, '<p class="mb-4 text-gray-300 leading-relaxed">$1</p>')
      .replace(/```([^`]+)```/g, '<pre class="bg-gray-900/70 border border-gray-600 rounded-xl p-4 my-4 overflow-x-auto"><code class="text-sm text-green-300 font-mono">$1</code></pre>')
      .replace(/`([^`]+)`/g, '<code class="bg-gray-800/70 text-purple-300 px-2 py-1 rounded text-sm font-mono">$1</code>')
      .replace(/---/g, '<hr class="border-white/20 my-6">')
      .replace(/#([^#\s]+)/g, '<span class="text-blue-400 hover:text-blue-300 cursor-pointer">#$1</span>')
  }

  const generateHTMLContent = () => {
    const formattedContent = formatContent(content)
    return `
<!DOCTYPE html>
<html lang="${language}" dir="${language === 'ar' ? 'rtl' : 'ltr'}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        body {
            font-family: 'Noto Sans Arabic', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.8;
            margin: 0;
            padding: 40px;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
            color: #e2e8f0;
            direction: ${language === 'ar' ? 'rtl' : 'ltr'};
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 40px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        .header {
            text-align: center;
            margin-bottom: 40px;
            border-bottom: 2px solid rgba(147, 51, 234, 0.3);
            padding-bottom: 20px;
        }
        .title {
            font-size: 2.5em;
            font-weight: bold;
            background: linear-gradient(45deg, #a855f7, #3b82f6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 10px;
        }
        .score {
            display: inline-block;
            padding: 8px 16px;
            border-radius: 20px;
            font-weight: bold;
            margin-top: 10px;
        }
        .score.excellent { background: rgba(34, 197, 94, 0.2); color: #22c55e; border: 1px solid rgba(34, 197, 94, 0.3); }
        .score.good { background: rgba(234, 179, 8, 0.2); color: #eab308; border: 1px solid rgba(234, 179, 8, 0.3); }
        .score.acceptable { background: rgba(249, 115, 22, 0.2); color: #f97316; border: 1px solid rgba(249, 115, 22, 0.3); }
        .score.poor { background: rgba(239, 68, 68, 0.2); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.3); }
        .content {
            line-height: 1.8;
        }
        .metrics {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 30px 0;
        }
        .metric {
            background: rgba(255, 255, 255, 0.05);
            padding: 20px;
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .metric-label {
            font-size: 0.9em;
            color: #94a3b8;
            margin-bottom: 8px;
        }
        .metric-value {
            font-size: 1.4em;
            font-weight: bold;
            color: #ffffff;
        }
        .recommendations {
            background: linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(59, 130, 246, 0.1));
            border-radius: 12px;
            padding: 25px;
            margin-top: 30px;
            border: 1px solid rgba(168, 85, 247, 0.2);
        }
        .recommendations h3 {
            color: #a855f7;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .recommendation-item {
            display: flex;
            align-items: flex-start;
            gap: 10px;
            margin-bottom: 12px;
            padding: 12px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 8px;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            color: #64748b;
            font-size: 0.9em;
        }
        h3 { color: #ffffff; font-size: 1.5em; margin-bottom: 15px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); padding-bottom: 8px; }
        h4 { color: #a855f7; font-size: 1.3em; margin-bottom: 12px; }
        h5 { color: #3b82f6; font-size: 1.1em; margin-bottom: 10px; }
        ul { list-style: none; padding-right: 20px; }
        li { margin-bottom: 8px; position: relative; }
        li::before { content: "•"; color: #a855f7; font-weight: bold; position: absolute; right: -15px; }
        strong { color: #ffffff; font-weight: 600; }
        em { color: #a855f7; font-style: italic; }
        .highlight-box {
            margin: 15px 0;
            padding: 15px;
            border-radius: 8px;
            border-right: 4px solid;
        }
        .highlight-box.blue { border-right-color: #3b82f6; background: rgba(59, 130, 246, 0.1); }
        .highlight-box.green { border-right-color: #22c55e; background: rgba(34, 197, 94, 0.1); }
        .highlight-box.purple { border-right-color: #a855f7; background: rgba(168, 85, 247, 0.1); }
        .highlight-box.cyan { border-right-color: #06b6d4; background: rgba(6, 182, 212, 0.1); }
        .highlight-box.yellow { border-right-color: #eab308; background: rgba(234, 179, 8, 0.1); }
        .highlight-box.orange { border-right-color: #f97316; background: rgba(249, 115, 22, 0.1); }
        .highlight-box.gray { border-right-color: #6b7280; background: rgba(107, 114, 128, 0.1); }
        .highlight-box.indigo { border-right-color: #6366f1; background: rgba(99, 102, 241, 0.1); }
        .highlight-box.pink { border-right-color: #ec4899; background: rgba(236, 72, 153, 0.1); }
        pre {
            background: rgba(31, 41, 55, 0.8);
            border: 1px solid rgba(75, 85, 99, 0.3);
            border-radius: 8px;
            padding: 15px;
            overflow-x: auto;
        }
        code {
            background: rgba(31, 41, 55, 0.6);
            color: #34d399;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
            font-size: 0.9em;
        }
        hr {
            border: none;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            margin: 20px 0;
        }
        @media print {
            body { background: white; color: black; }
            .container { background: white; box-shadow: none; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 class="title">${title}</h1>
            ${score !== undefined ? `<div class="score ${score >= 80 ? 'excellent' : score >= 60 ? 'good' : score >= 40 ? 'acceptable' : 'poor'}">${getScoreLabel(score)} (${score}/100)</div>` : ''}
            <div style="color: #94a3b8; font-size: 0.9em; margin-top: 10px;">
                ${language === 'ar' ? 'تم إنشاؤه بواسطة أدوات التسويق الذكية' : 'Generated by Smart Marketing Tools'}
            </div>
        </div>
        
        ${metrics && metrics.length > 0 ? `
        <div class="metrics">
            ${metrics.map(metric => `
            <div class="metric">
                <div class="metric-label">${metric.label}</div>
                <div class="metric-value" style="${metric.color ? `color: ${metric.color}` : ''}">${metric.value}</div>
            </div>
            `).join('')}
        </div>
        ` : ''}
        
        <div class="content">
            ${formattedContent}
        </div>
        
        ${recommendations && recommendations.length > 0 ? `
        <div class="recommendations">
            <h3>${language === 'ar' ? '🏆 توصيات ذكية' : '🏆 Smart Recommendations'}</h3>
            ${recommendations.map(rec => `
            <div class="recommendation-item">
                <span>✓</span>
                <span>${rec}</span>
            </div>
            `).join('')}
        </div>
        ` : ''}
        
        <div class="footer">
            ${language === 'ar' ? 'تم إنشاؤه في ' + new Date().toLocaleDateString('ar-SA') : 'Generated on ' + new Date().toLocaleDateString()}
        </div>
    </div>
</body>
</html>`
  }

  const exportAsFile = async (format: 'pdf' | 'word' | 'html') => {
    setIsExporting(true)
    
    try {
      if (format === 'html') {
        const htmlContent = generateHTMLContent()
        const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${title.replace(/[^a-zA-Z0-9\u0600-\u06FF]/g, '_')}.html`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      } else if (format === 'word') {
        // For Word, we'll create HTML that Word can open
        const htmlContent = generateHTMLContent()
        const wordContent = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head><meta charset='utf-8'><title>${title}</title></head>
        <body>${htmlContent.replace(/<style>[\s\S]*?<\/style>/g, '')}</body></html>`
        const blob = new Blob([wordContent], { type: 'application/msword' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${title.replace(/[^a-zA-Z0-9\u0600-\u06FF]/g, '_')}.doc`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      } else if (format === 'pdf') {
        // For PDF, we'll use the browser's print functionality
        const htmlContent = generateHTMLContent()
        const printWindow = window.open('', '_blank')
        if (printWindow) {
          printWindow.document.write(htmlContent)
          printWindow.document.close()
          setTimeout(() => {
            printWindow.print()
          }, 1000)
        }
      }
    } catch (error) {
      console.error('Export error:', error)
      alert(language === 'ar' ? 'فشل التصدير، يرجى المحاولة مرة أخرى' : 'Export failed, please try again')
    } finally {
      setIsExporting(false)
    }
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
      {/* Header with Score and Actions */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
        <div className="flex-1">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">{title}</h3>
          {score !== undefined && (
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${getScoreColor(score)}`}>
              {getScoreIcon(score)}
              <span className="text-sm font-medium">{getScoreLabel(score)} ({score}/100)</span>
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-3 flex-shrink-0">
          {/* View Mode Toggle */}
          <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
            <button
              onClick={() => setViewMode('formatted')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                viewMode === 'formatted' 
                  ? 'bg-purple-500 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Eye className="w-4 h-4 inline ml-1" />
              {language === 'ar' ? 'منسق' : 'Formatted'}
            </button>
            <button
              onClick={() => setViewMode('raw')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                viewMode === 'raw' 
                  ? 'bg-purple-500 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4 inline ml-1" />
              {language === 'ar' ? 'نصي' : 'Raw'}
            </button>
          </div>
          
          {/* Export Options */}
          <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
            <select
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value as 'pdf' | 'word' | 'html')}
              className="bg-transparent border-none text-white text-sm font-medium px-2 py-1 focus:outline-none"
            >
              <option value="pdf" className="bg-gray-900">PDF</option>
              <option value="word" className="bg-gray-900">Word</option>
              <option value="html" className="bg-gray-900">HTML</option>
            </select>
            <button
              onClick={() => exportAsFile(exportFormat)}
              disabled={isExporting}
              className="px-3 py-2 rounded-md text-sm font-medium bg-purple-500 text-white hover:bg-purple-600 disabled:opacity-50 transition-all"
            >
              {isExporting ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
            </button>
          </div>
          
          {/* Copy and Download */}
          {onCopy && (
            <Button
              variant="outline"
              size="sm"
              onClick={onCopy}
              className="border-white/20 bg-white/5 text-white font-medium px-4 py-2 transition-all duration-200 hover:bg-white/10"
            >
              <Copy className="w-4 h-4 ml-2" />
              {language === 'ar' ? 'نسخ' : 'Copy'}
            </Button>
          )}
        </div>
      </div>

      {/* Metrics */}
      {metrics && metrics.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {metrics.map((metric, index) => (
            <Card key={index} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {metric.icon && <div className="text-purple-400">{metric.icon}</div>}
                      <p className="text-sm text-gray-400">{metric.label}</p>
                    </div>
                    <p className={`text-xl font-bold ${metric.color || 'text-white'}`}>
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
      <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:border-white/20 transition-all duration-300">
        <CardContent className="p-6">
          <div className="prose prose-invert max-w-none">
            {viewMode === 'formatted' ? (
              <div 
                className="text-gray-300 leading-relaxed max-h-96 overflow-y-auto custom-scrollbar"
                dangerouslySetInnerHTML={{ 
                  __html: formatContent(content || '')
                }}
              />
            ) : (
              <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
                <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono">
                  {content}
                </pre>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      {recommendations && recommendations.length > 0 && (
        <Card className="bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10 border-purple-500/20 hover:border-purple-500/30 transition-all duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-white text-xl">
              <Award className="w-6 h-6 text-purple-400" />
              {language === 'ar' ? '🏆 توصيات ذكية' : '🏆 Smart Recommendations'}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              {recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-300 text-sm leading-relaxed flex-1">{recommendation}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}