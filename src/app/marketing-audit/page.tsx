'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from '@/components/Navigation'
import { 
  BarChart3, 
  Target, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  Download,
  ArrowRight,
  ArrowLeft,
  Mail,
  Phone,
  Building,
  Globe,
  ShoppingCart,
  Zap,
  Award,
  FileText,
  Star,
  Eye,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize
} from 'lucide-react'

export default function MarketingAudit() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  const auditSlides = [
    {
      id: 1,
      title: "Marketing Performance Audit",
      subtitle: "Comprehensive Analysis Framework",
      content: {
        overview: "A complete marketing audit evaluates the effectiveness of your current marketing strategies and provides actionable insights for improvement.",
        keyPoints: [
          "ROI Analysis across all marketing channels",
          "Customer acquisition cost optimization",
          "Conversion rate improvement strategies",
          "Brand awareness and positioning assessment"
        ],
        metrics: [
          { label: "Average ROI Improvement", value: "45-65%" },
          { label: "Cost Reduction", value: "30-50%" },
          { label: "Conversion Rate Lift", value: "25-40%" },
          { label: "Customer Retention", value: "35-55%" }
        ],
        recommendations: [
          "Implement data-driven decision making",
          "Optimize marketing mix allocation",
          "Enhance customer journey mapping",
          "Leverage automation and AI tools"
        ]
      }
    },
    {
      id: 2,
      title: "Digital Marketing Analysis",
      subtitle: "Channel Performance Evaluation",
      content: {
        overview: "In-depth analysis of your digital marketing channels to identify strengths, weaknesses, and opportunities for growth.",
        keyPoints: [
          "Social media effectiveness across platforms",
          "Email marketing campaign performance",
          "SEO and content marketing impact",
          "Paid advertising ROI and optimization"
        ],
        metrics: [
          { label: "Social Media Engagement", value: "3.2-5.8%" },
          { label: "Email Open Rate", value: "22-35%" },
          { label: "SEO Visibility", value: "40-70%" },
          { label: "Ad Click-through Rate", value: "2.1-4.5%" }
        ],
        recommendations: [
          "Develop platform-specific content strategies",
          "Implement A/B testing for continuous improvement",
          "Focus on high-intent keyword targeting",
          "Optimize ad spend allocation based on performance"
        ]
      }
    },
    {
      id: 3,
      title: "Customer Journey Optimization",
      subtitle: "Touchpoint Analysis & Experience Design",
      content: {
        overview: "Mapping and optimizing every customer interaction point to create seamless experiences that drive conversions and loyalty.",
        keyPoints: [
          "Customer persona development and validation",
          "Touchpoint analysis across all channels",
          "User experience optimization",
          "Customer lifetime value maximization"
        ],
        metrics: [
          { label: "Customer Satisfaction", value: "4.2/5" },
          { label: "Net Promoter Score", value: "45-65" },
          { label: "Customer Lifetime Value", value: "EGP 2,500-4,500" },
          { label: "Churn Rate Reduction", value: "25-40%" }
        ],
        recommendations: [
          "Create detailed customer journey maps",
          "Implement personalization strategies",
          "Optimize mobile user experience",
          "Develop loyalty and retention programs"
        ]
      }
    },
    {
      id: 4,
      title: "Competitive Analysis",
      subtitle: "Market Position & Strategy Insights",
      content: {
        overview: "Comprehensive competitive analysis to understand your market position and identify strategic opportunities for growth.",
        keyPoints: [
          "Competitor strengths and weaknesses analysis",
          "Market share and positioning evaluation",
          "Pricing strategy comparison",
          "Unique value proposition development"
        ],
        metrics: [
          { label: "Market Share Growth", value: "15-25%" },
          { label: "Competitive Advantage", value: "3-5 areas" },
          { label: "Price Optimization", value: "10-20% margin" },
          { label: "Brand Awareness Lift", value: "30-50%" }
        ],
        recommendations: [
          "Conduct regular competitor monitoring",
          "Develop unique selling propositions",
          "Implement competitive pricing strategies",
          "Focus on underserved market segments"
        ]
      }
    },
    {
      id: 5,
      title: "Technology & Tools Assessment",
      subtitle: "Marketing Stack Optimization",
      content: {
        overview: "Evaluation of your marketing technology stack to ensure you have the right tools for maximum efficiency and effectiveness.",
        keyPoints: [
          "Marketing automation platform evaluation",
          "Analytics and reporting tools assessment",
          "CRM integration and optimization",
          "AI and machine learning implementation"
        ],
        metrics: [
          { label: "Automation Efficiency", value: "60-80%" },
          { label: "Data Accuracy", value: "85-95%" },
          { label: "Integration Success", value: "70-90%" },
          { label: "ROI on Tech Stack", value: "200-300%" }
        ],
        recommendations: [
          "Implement integrated marketing platforms",
          "Adopt AI-powered analytics tools",
          "Ensure seamless CRM integration",
          "Regular technology stack audits"
        ]
      }
    },
    {
      id: 6,
      title: "Action Plan & Implementation",
      subtitle: "Strategic Roadmap for Success",
      content: {
        overview: "A detailed implementation roadmap with specific actions, timelines, and success metrics to transform your marketing performance.",
        keyPoints: [
          "90-day quick wins implementation plan",
          "6-month strategic initiatives roadmap",
          "12-month transformation strategy",
          "Continuous improvement framework"
        ],
        metrics: [
          { label: "Implementation Timeline", value: "30-90 days" },
          { label: "Expected ROI", value: "200-400%" },
          { label: "Success Metrics", value: "8-12 KPIs" },
          { label: "Team Productivity", value: "40-60% improvement" }
        ],
        recommendations: [
          "Start with high-impact quick wins",
          "Build cross-functional implementation teams",
          "Establish clear success metrics and KPIs",
          "Create regular review and optimization cycles"
        ]
      }
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % auditSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + auditSlides.length) % auditSlides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  // Auto-play functionality
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % auditSlides.length)
      }, 5000)
    }
    return () => clearInterval(interval)
  }, [isPlaying])

  const downloadPDF = () => {
    setIsDownloading(true)
    
    // Simulate a brief delay for better UX
    setTimeout(() => {
      // Create a comprehensive marketing audit guide PDF content
      const pdfContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Complete Marketing Performance Audit Guide</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .page {
            background: white;
            margin: 20px 0;
            border-radius: 15px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 60px 40px;
            text-align: center;
        }
        
        .header h1 {
            font-size: 3em;
            font-weight: 800;
            margin-bottom: 20px;
        }
        
        .header p {
            font-size: 1.2em;
            opacity: 0.9;
        }
        
        .content-section {
            padding: 40px;
        }
        
        .section-title {
            font-size: 2em;
            font-weight: 700;
            color: #333;
            margin-bottom: 20px;
            border-left: 4px solid #667eea;
            padding-left: 20px;
        }
        
        .metrics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 30px 0;
        }
        
        .metric-card {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 25px;
            border-radius: 10px;
            text-align: center;
        }
        
        .metric-value {
            font-size: 2em;
            font-weight: 700;
            margin-bottom: 10px;
        }
        
        .points-list {
            list-style: none;
            margin: 20px 0;
        }
        
        .points-list li {
            padding: 10px 0;
            padding-left: 30px;
            position: relative;
        }
        
        .points-list li::before {
            content: '✓';
            position: absolute;
            left: 0;
            color: #667eea;
            font-weight: 700;
        }
        
        .footer {
            background: #333;
            color: white;
            padding: 40px;
            text-align: center;
        }
        
        .contact-info {
            margin-top: 20px;
        }
        
        @media print {
            .page {
                margin: 0;
                box-shadow: none;
                border-radius: 0;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="page">
            <div class="header">
                <h1>Complete Marketing Performance Audit Guide</h1>
                <p>Comprehensive Framework for Marketing Excellence</p>
            </div>
            
            <div class="content-section">
                ${auditSlides.map(slide => `
                <div style="margin-bottom: 60px;">
                    <h2 class="section-title">${slide.title}</h2>
                    <h3 style="color: #666; margin-bottom: 20px;">${slide.subtitle}</h3>
                    
                    <p style="margin-bottom: 30px; color: #555; line-height: 1.8;">${slide.content.overview}</p>
                    
                    <h4 style="color: #333; margin-bottom: 15px;">Key Focus Areas:</h4>
                    <ul class="points-list">
                        ${slide.content.keyPoints.map(point => `<li>${point}</li>`).join('')}
                    </ul>
                    
                    <div class="metrics-grid">
                        ${slide.content.metrics.map(metric => `
                        <div class="metric-card">
                            <div class="metric-value">${metric.value}</div>
                            <div>${metric.label}</div>
                        </div>
                        `).join('')}
                    </div>
                    
                    <h4 style="color: #333; margin: 30px 0 15px 0;">Key Recommendations:</h4>
                    <ul class="points-list">
                        ${slide.content.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                    </ul>
                </div>
                `).join('')}
            </div>
            
            <div class="footer">
                <h3>Michael Zahy - Performance Marketing Specialist</h3>
                <div class="contact-info">
                    <p>Email: Michaelzahy1@gmail.com</p>
                    <p>Website: Michaelzahy.site</p>
                    <p>Phone: +20 106 972 0311</p>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
    `
      
      // Create and download the file
      const blob = new Blob([pdfContent], { type: 'text/html' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'Complete-Marketing-Audit-Guide.html'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      
      setIsDownloading(false)
    }, 1000) // Brief delay for better UX
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

      <Navigation currentPath="/marketing-audit" />

      <div className="relative z-10 pt-25"> {/* Increased padding-top for fixed navbar */}
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center py-12"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 px-6 py-3 rounded-full mb-6 backdrop-blur-sm border border-purple-500/30">
            <BarChart3 className="w-5 h-5" />
            <span className="text-sm font-medium">Marketing Audit Guide</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Complete Marketing Performance Audit
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Navigate through our comprehensive marketing audit framework to discover strategies that will transform your business performance.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="container mx-auto px-6 pb-12">
          <div className="max-w-6xl mx-auto">
            {/* Carousel Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl overflow-hidden ${
                isFullscreen ? 'fixed inset-0 z-50 m-0 rounded-none' : ''
              }`}
            >
              {/* Carousel Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      {auditSlides[currentSlide].title}
                    </h2>
                    <p className="text-sm text-gray-400">
                      {auditSlides[currentSlide].subtitle}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleMute}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                    title={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  
                  <button
                    onClick={toggleFullscreen}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                    title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                  >
                    {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                  </button>
                  
                  <button
                    onClick={downloadPDF}
                    disabled={isDownloading}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isDownloading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Generating...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        <span>Download PDF</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Slide Content */}
              <div className="p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    className="grid lg:grid-cols-2 gap-8"
                  >
                    {/* Left Column - Content */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-4">Overview</h3>
                        <p className="text-gray-300 leading-relaxed">
                          {auditSlides[currentSlide].content.overview}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                          <Target className="w-5 h-5 text-purple-400" />
                          Key Focus Areas
                        </h3>
                        <ul className="space-y-3">
                          {auditSlides[currentSlide].content.keyPoints.map((point, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-start gap-3"
                            >
                              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-300">{point}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-purple-400" />
                          Key Recommendations
                        </h3>
                        <ul className="space-y-3">
                          {auditSlides[currentSlide].content.recommendations.map((rec, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 + 0.2 }}
                              className="flex items-start gap-3"
                            >
                              <Star className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-300">{rec}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Right Column - Metrics */}
                    <div>
                      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-purple-400" />
                        Expected Performance Metrics
                      </h3>
                      
                      <div className="grid grid-cols-2 gap-4">
                        {auditSlides[currentSlide].content.metrics.map((metric, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 + 0.4 }}
                            className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-6 rounded-2xl border border-purple-500/30"
                          >
                            <div className="text-2xl font-bold text-white mb-2">
                              {metric.value}
                            </div>
                            <div className="text-sm text-gray-300">
                              {metric.label}
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Visual Representation */}
                      <div className="mt-8 p-6 bg-white/5 rounded-2xl border border-white/10">
                        <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                              <Eye className="w-8 h-8 text-white" />
                            </div>
                            <p className="text-gray-300 mb-4">Interactive Analytics Dashboard</p>
                            <button className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-sm">
                              View Live Demo
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Carousel Controls */}
              <div className="border-t border-white/10 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={prevSlide}
                      className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                      title="Previous slide"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={togglePlay}
                      className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                      title={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    
                    <button
                      onClick={nextSlide}
                      className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                      title="Next slide"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Slide Indicators */}
                  <div className="flex items-center gap-2">
                    {auditSlides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentSlide
                            ? 'bg-purple-500 w-8'
                            : 'bg-white/30 hover:bg-white/50'
                        }`}
                        title={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>

                  <div className="text-sm text-gray-400">
                    {currentSlide + 1} of {auditSlides.length}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Additional Resources */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-12 grid md:grid-cols-3 gap-8"
            >
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-6 rounded-2xl border border-purple-500/30">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Expert Consultation</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Get personalized guidance from our marketing experts to implement these strategies.
                </p>
                <button className="text-purple-400 hover:text-purple-300 transition-colors text-sm font-medium flex items-center gap-2">
                  Book a Call
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-6 rounded-2xl border border-blue-500/30">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Free Tools & Resources</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Access our collection of free marketing tools and templates to get started immediately.
                </p>
                <button className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium flex items-center gap-2">
                  Explore Tools
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-6 rounded-2xl border border-green-500/30">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Case Studies</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Read success stories from businesses that have implemented these strategies.
                </p>
                <button className="text-green-400 hover:text-green-300 transition-colors text-sm font-medium flex items-center gap-2">
                  View Success Stories
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}