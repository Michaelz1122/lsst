'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import FlexibleInput from '@/components/ui/FlexibleInput'
import EnhancedResultsDisplay from '@/components/ui/EnhancedResultsDisplay'
import { Button } from '@/components/ui/button'
import { 
  PenTool, 
  FileText, 
  MessageSquare, 
  Hash, 
  Target, 
  Users, 
  TrendingUp, 
  Lightbulb,
  Copy,
  Download,
  RefreshCw,
  CheckCircle,
  Zap,
  Star,
  ArrowRight
} from 'lucide-react'

export default function CopywritingTools() {
  const [activeTab, setActiveTab] = useState('ad-copy')
  const [formData, setFormData] = useState({
    product: '',
    audience: '',
    tone: 'professional',
    length: 'medium',
    keyPoints: '',
    cta: ''
  })
  const [generatedCopy, setGeneratedCopy] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [results, setResults] = useState<any>(null)

  const copywritingTools = [
    {
      id: 'ad-copy',
      title: 'Ad Copy Generator',
      description: 'Create compelling ad copy for social media and search campaigns',
      icon: PenTool,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'headlines',
      title: 'Headline Generator',
      description: 'Generate attention-grabbing headlines for your content',
      icon: FileText,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'social-media',
      title: 'Social Media Posts',
      description: 'Create engaging social media content for different platforms',
      icon: MessageSquare,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'hashtags',
      title: 'Hashtag Generator',
      description: 'Generate relevant hashtags to increase content reach',
      icon: Hash,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'email-subjects',
      title: 'Email Subject Lines',
      description: 'Craft compelling email subject lines to improve open rates',
      icon: Target,
      color: 'from-yellow-500 to-amber-500'
    },
    {
      id: 'product-descriptions',
      title: 'Product Descriptions',
      description: 'Write persuasive product descriptions that convert',
      icon: Users,
      color: 'from-indigo-500 to-purple-500'
    }
  ]

  const toneOptions = [
    { value: 'professional', label: 'Professional' },
    { value: 'friendly', label: 'Friendly' },
    { value: 'urgent', label: 'Urgent' },
    { value: 'emotional', label: 'Emotional' },
    { value: 'humorous', label: 'Humorous' },
    { value: 'authoritative', label: 'Authoritative' }
  ]

  const lengthOptions = [
    { value: 'short', label: 'Short (50-100 words)' },
    { value: 'medium', label: 'Medium (100-200 words)' },
    { value: 'long', label: 'Long (200+ words)' }
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const generateCopy = async () => {
    setIsGenerating(true)
    
    // Simulate AI generation with timeout
    setTimeout(() => {
      let copy = ''
      
      switch (activeTab) {
        case 'ad-copy':
          copy = generateAdCopy()
          break
        case 'headlines':
          copy = generateHeadlines()
          break
        case 'social-media':
          copy = generateSocialMediaPost()
          break
        case 'hashtags':
          copy = generateHashtags()
          break
        case 'email-subjects':
          copy = generateEmailSubjects()
          break
        case 'product-descriptions':
          copy = generateProductDescription()
          break
        default:
          copy = generateAdCopy()
      }
      
      setGeneratedCopy(copy)
      
      // Create results object for EnhancedResultsDisplay
      const newResults = {
        content: copy,
        title: copywritingTools.find(t => t.id === activeTab)?.title || 'Copywriting Tool',
        metrics: [],
        recommendations: [],
        score: 85
      }
      setResults(newResults)
      
      setIsGenerating(false)
    }, 2000)
  }

  const generateAdCopy = () => {
    const tones = {
      professional: 'Transform your business with our cutting-edge solution. Designed for professionals who demand excellence.',
      friendly: 'Hey there! Ready to take your [product] to the next level? We\'ve got just what you need!',
      urgent: 'Limited time offer! Don\'t miss out on this game-changing [product]. Act now before it\'s too late!',
      emotional: 'Imagine a world where [product] solves all your problems. That future is closer than you think.',
      humorous: 'Tired of [problem]? Our [product] is like having a superhero sidekick, minus the cape!',
      authoritative: 'Industry experts agree: our [product] sets the standard for excellence in [industry].'
    }

    return `${tones[formData.tone as keyof typeof tones]}

🎯 Key Benefits:
${formData.keyPoints || '• Increased efficiency\n• Cost-effective solution\n• Proven results'}

${formData.cta ? `📞 Call to Action: ${formData.cta}` : '📞 Call to Action: Get started today and transform your business!'}`
  }

  const generateHeadlines = () => {
    const headlines = [
      `🚀 The Ultimate [Product] Solution You've Been Waiting For`,
      `⭐ Transform Your [Industry] Game with This Revolutionary [Product]`,
      `🔥 Why [Target Audience] Can't Stop Talking About This [Product]`,
      `💡 The Secret Weapon [Industry] Professionals Don't Want You to Know`,
      `🎯 Unlock Your [Goal] Potential with This Game-Changing [Product]`,
      `⚡ How [Product] is Revolutionizing the [Industry] Landscape`,
      `🏆 The #1 [Product] Choice for [Target Audience] in 2024`,
      `📈 Skyrocket Your [Metric] with This Powerful [Product] Solution`
    ]

    return `📝 Powerful Headlines for Your ${formData.product}:\n\n${headlines.slice(0, 5).map((h, i) => `${i + 1}. ${h}`).join('\n\n')}`
  }

  const generateSocialMediaPost = () => {
    const posts = {
      professional: `Excited to share our latest innovation in [industry]! Our [product] is designed to help [target audience] achieve [goal] with unprecedented efficiency. 

With features like [key points], we're setting new standards for excellence. 

Ready to elevate your [industry] game? Let's connect! 🚀

#[industry] #[product] #[goal] #[innovation]`,

      friendly: `Hey everyone! 👋 Just had to share something awesome...

Our new [product] is a total game-changer for anyone in [industry]! Whether you're struggling with [problem] or just want to [goal], this is for you.

The best part? [Key benefit]! 🎉

Who's ready to try it out? Drop a comment below! 👇

#[product] #[industry] #[gamechanger] #[innovation]`,

      urgent: `🚨 BREAKING: Limited spots available for our revolutionary [product]!

[Target audience] - this is your chance to [achieve goal] before prices go up!

With [key benefits], you'll see results in [timeframe]. 

Don't wait - secure your spot now! ⏰

#[product] #[limitedoffer] #[urgency] #[industry]`
    }

    return posts[formData.tone as keyof typeof posts] || posts.professional
  }

  const generateHashtags = () => {
    const baseTags = [
      `#${formData.product.replace(/\s+/g, '')}`,
      `#${formData.audience.replace(/\s+/g, '')}`,
      '#DigitalMarketing',
      '#MarketingStrategy',
      '#BusinessGrowth',
      '#Innovation',
      '#Success',
      '#Results'
    ]

    const industryTags = [
      '#Ecommerce', '#Startups', '#SmallBusiness', '#Entrepreneur', 
      '#MarketingTips', '#BusinessTips', '#GrowthHacking'
    ]

    return `📱 Recommended Hashtags for ${formData.product}:\n\n🔥 High-impact tags:\n${baseTags.slice(0, 4).map(tag => `${tag}`).join(' ')}\n\n📈 Industry-specific tags:\n${industryTags.slice(0, 4).map(tag => `${tag}`).join(' ')}\n\n🎯 Niche tags:\n${[...baseTags.slice(4), ...industryTags.slice(4)].slice(0, 4).map(tag => `${tag}`).join(' ')}`
  }

  const generateEmailSubjects = () => {
    const subjects = [
      `🚀 Transform Your [Industry] Strategy with [Product]`,
      `⭐ Exclusive: The [Product] Solution [Target Audience] Can't Ignore`,
      `🔥 Last Chance: [Product] Offer Ends Soon`,
      `💡 How [Product] is Helping [Audience] Achieve [Goal]`,
      `🎯 Your Personal [Product] Invitation Inside`,
      `⚡ Breaking: [Product] Just Got Even Better`,
      `🏆 Why [Industry] Leaders Choose [Product]`,
      `📈 Your [Metric] Could Improve with [Product]`
    ]

    return `📧 High-Performing Email Subject Lines:\n\n${subjects.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\n💡 Pro Tip: Personalize with recipient's name or company for higher open rates!`
  }

  const generateProductDescription = () => {
    return `✨ Introducing ${formData.product}: The Ultimate Solution for ${formData.audience}

🎯 Designed specifically for ${formData.audience} who demand excellence, ${formData.product} delivers unmatched performance and reliability.

🚀 Key Features:
${formData.keyPoints || '• Advanced technology integration\n• User-friendly interface\n• Scalable solution for growing businesses\n• 24/7 support and maintenance'}

💪 Benefits You'll Love:
• Increased efficiency and productivity
• Cost-effective solution with measurable ROI
• Easy integration with existing systems
• Comprehensive training and support

🏆 Why Choose Us?
With years of industry expertise and countless success stories, we understand what ${formData.audience} truly need. ${formData.product} isn't just a tool – it's your competitive advantage.

${formData.cta ? `📞 ${formData.cta}` : '📞 Ready to transform your business? Get started today!'}

#Product #Innovation #${formData.audience.replace(/\s+/g, '')} #BusinessSolution`
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedCopy)
      alert('Copied to clipboard!')
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const downloadAsText = () => {
    const blob = new Blob([generatedCopy], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${activeTab}-copy.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const resetForm = () => {
    setFormData({
      product: '',
      audience: '',
      tone: 'professional',
      length: 'medium',
      keyPoints: '',
      cta: ''
    })
    setGeneratedCopy('')
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

      <Navigation currentPath="/copywriting-tools" />

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
                <PenTool className="w-4 h-4" />
                <span className="text-sm font-medium">AI-Powered Copywriting</span>
              </motion.div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  Copywriting Tools
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                Create compelling, conversion-focused copy for all your marketing needs. 
                From ad copy to social media posts, generate professional content in seconds.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button 
                  onClick={() => document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                >
                  Explore Tools
                </button>
                <button 
                  onClick={() => document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300"
                >
                  Start Creating
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
              <h2 className="text-4xl font-bold mb-4">Powerful Copywriting Tools</h2>
              <p className="text-xl text-gray-400">Choose the right tool for your copywriting needs</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {copywritingTools.map((tool, index) => (
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

        {/* Generator Section */}
        <section id="generator" className="py-20 bg-gradient-to-b from-gray-900 to-black">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">
                {copywritingTools.find(t => t.id === activeTab)?.title}
              </h2>
              <p className="text-xl text-gray-400">
                {copywritingTools.find(t => t.id === activeTab)?.description}
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Input Form */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10"
              >
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Lightbulb className="w-6 h-6 text-purple-400" />
                  Project Details
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Product/Service Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white placeholder-gray-400"
                      value={formData.product}
                      onChange={(e) => handleInputChange('product', e.target.value)}
                      placeholder="Enter your product or service name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Target Audience
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white placeholder-gray-400"
                      value={formData.audience}
                      onChange={(e) => handleInputChange('audience', e.target.value)}
                      placeholder="Who are you targeting?"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Tone
                      </label>
                      <select
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white appearance-none cursor-pointer"
                        value={formData.tone}
                        onChange={(e) => handleInputChange('tone', e.target.value)}
                      >
                        {toneOptions.map(option => (
                          <option key={option.value} value={option.value} className="bg-gray-900">
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Length
                      </label>
                      <select
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white appearance-none cursor-pointer"
                        value={formData.length}
                        onChange={(e) => handleInputChange('length', e.target.value)}
                      >
                        {lengthOptions.map(option => (
                          <option key={option.value} value={option.value} className="bg-gray-900">
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Key Points (Optional)
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 resize-none text-white placeholder-gray-400"
                      value={formData.keyPoints}
                      onChange={(e) => handleInputChange('keyPoints', e.target.value)}
                      placeholder="List key features or benefits (one per line)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Call to Action (Optional)
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white placeholder-gray-400"
                      value={formData.cta}
                      onChange={(e) => handleInputChange('cta', e.target.value)}
                      placeholder="e.g., Shop now, Learn more, Get started"
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button
                      onClick={generateCopy}
                      disabled={isGenerating || !formData.product}
                      className="flex-1"
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw className="w-5 h-5 animate-spin mr-2" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Zap className="w-5 h-5 mr-2" />
                          Generate Copy
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={resetForm}
                      variant="outline"
                    >
                      <RefreshCw className="w-5 h-5 mr-2" />
                      Reset
                    </Button>
                  </div>
                </div>
              </motion.div>

              {/* Output */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10"
              >
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <FileText className="w-6 h-6 text-purple-400" />
                  Generated Copy
                </h3>
                
                {results ? (
                  <EnhancedResultsDisplay
                    results={results}
                    onReset={() => {
                      setResults(null)
                      setFormData({
                        product: '',
                        audience: '',
                        tone: 'professional',
                        length: 'medium',
                        keyPoints: '',
                        cta: ''
                      })
                    }}
                    exportData={{
                      content: results.content,
                      format: 'txt',
                      filename: `${activeTab}-copy.txt`
                    }}
                    language="en"
                  />
                ) : (
                  <div className="text-center py-12">
                    <Star className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-400 mb-2">No copy generated yet</p>
                    <p className="text-sm text-gray-500">Fill in the form and click "Generate Copy" to get started</p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}