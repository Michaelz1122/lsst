'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  CheckCircle, 
  AlertTriangle, 
  Copy, 
  Download, 
  TrendingUp,
  BarChart3,
  Target,
  DollarSign,
  Star
} from 'lucide-react'

interface EnhancedResultsDisplayProps {
  title: string
  subtitle: string
  results: any
  metrics: any[]
  recommendations: string[]
  onCopy: (text: string) => void
  onDownload: () => void
  onReset?: () => void
  score?: number
  scoreColor?: string
  generatedContent?: string
}

export default function EnhancedResultsDisplay({
  title,
  subtitle,
  results,
  metrics,
  recommendations,
  onCopy,
  onDownload,
  onReset,
  score,
  scoreColor = 'text-green-400',
  generatedContent
}: EnhancedResultsDisplayProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (generatedContent) {
      onCopy(generatedContent)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const getMetricIcon = (metricName: string) => {
    if (metricName.toLowerCase().includes('cpm') || metricName.toLowerCase().includes('cost')) {
      return DollarSign
    }
    if (metricName.toLowerCase().includes('ctr') || metricName.toLowerCase().includes('click')) {
      return Target
    }
    if (metricName.toLowerCase().includes('conversion') || metricName.toLowerCase().includes('rate')) {
      return TrendingUp
    }
    return BarChart3
  }

  const getMetricStatus = (status: string) => {
    switch (status) {
      case 'good':
        return { color: 'text-green-400', icon: CheckCircle, label: 'جيد' }
      case 'warning':
        return { color: 'text-yellow-400', icon: AlertTriangle, label: 'تحذير' }
      default:
        return { color: 'text-red-400', icon: AlertTriangle, label: 'يحتاج تحسين' }
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h2>
        <p className="text-xl text-gray-300">{subtitle}</p>
      </div>

      {/* Score Card */}
      {score !== undefined && (
        <Card className="bg-white/5 backdrop-blur-md border-white/10 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              Overall Performance Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className={`text-6xl font-bold mb-2 ${scoreColor}`}>
                {score}/100
              </div>
              <div className="text-gray-300">
                {score >= 80 ? 'Excellent Performance' : score >= 60 ? 'Good Performance' : 'Needs Improvement'}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Metrics Grid */}
      {metrics.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.map((metric, index) => {
            const MetricIcon = getMetricIcon(metric.name)
            const status = getMetricStatus(metric.status || 'good')
            const StatusIcon = status.icon
            
            return (
              <Card key={index} className="bg-white/5 backdrop-blur-md border-white/10 shadow-2xl hover:shadow-purple-500/10 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                        <MetricIcon className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{metric.name}</h3>
                        <p className="text-sm text-gray-400">{metric.unit}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <StatusIcon className={`w-4 h-4 ${status.color}`} />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-2">
                    {metric.value}
                  </div>
                  <Badge variant="outline" className={`${status.color} border-current text-xs`}>
                    {status.label}
                  </Badge>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {/* Generated Content */}
      {generatedContent && (
        <Card className="bg-white/5 backdrop-blur-md border-white/10 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
              <Copy className="w-5 h-5 text-blue-400" />
              Generated Content
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900/50 rounded-lg p-6 mb-6">
              <pre className="text-gray-300 whitespace-pre-wrap font-mono text-sm leading-relaxed">
                {generatedContent}
              </pre>
            </div>
            <div className="flex gap-4">
              <Button
                onClick={handleCopy}
                disabled={copied}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
              >
                {copied ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy to Clipboard
                  </>
                )}
              </Button>
              <Button
                onClick={onDownload}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              {onReset && (
                <Button
                  onClick={onReset}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                >
                  Calculate Again
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <Card className="bg-white/5 backdrop-blur-md border-white/10 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-white/5 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-300">{recommendation}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Summary */}
      {results && (
        <Card className="bg-white/5 backdrop-blur-md border-white/10 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-400" />
              Analysis Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  {results.totalScore || score || 'N/A'}
                </div>
                <p className="text-gray-300">Total Score</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  {results.metricsCount || metrics.length}
                </div>
                <p className="text-gray-300">Metrics Analyzed</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">
                  {results.recommendationsCount || recommendations.length}
                </div>
                <p className="text-gray-300">Recommendations</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}