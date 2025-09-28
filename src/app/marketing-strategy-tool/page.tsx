'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import { Button } from '@/components/ui/button'
import { 
  Target, 
  Users, 
  TrendingUp, 
  Lightbulb, 
  FileText, 
  Download, 
  RefreshCw,
  CheckCircle,
  Zap,
  Star,
  ArrowRight,
  Calendar,
  DollarSign,
  BarChart3,
  MessageSquare,
  Eye,
  Share2,
  Heart,
  Award
} from 'lucide-react'

export default function MarketingStrategyTool() {
  const [activeTab, setActiveTab] = useState('overview')
  const [formData, setFormData] = useState({
    businessName: '',
    industry: '',
    targetAudience: '',
    budget: '',
    timeline: '',
    goals: '',
    challenges: ''
  })
  const [generatedStrategy, setGeneratedStrategy] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const strategySections = [
    {
      id: 'overview',
      title: 'Strategy Overview',
      description: 'Get a comprehensive marketing strategy overview',
      icon: Target,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'target-audience',
      title: 'Target Audience Analysis',
      description: 'Deep dive into your ideal customer profile',
      icon: Users,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'campaign-plan',
      title: 'Campaign Planning',
      description: 'Detailed campaign execution plan',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'content-strategy',
      title: 'Content Strategy',
      description: 'Content creation and distribution plan',
      icon: FileText,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'budget-allocation',
      title: 'Budget Allocation',
      description: 'Optimize your marketing budget across channels',
      icon: DollarSign,
      color: 'from-yellow-500 to-amber-500'
    },
    {
      id: 'kpi-tracking',
      title: 'KPI & Metrics',
      description: 'Key performance indicators and tracking plan',
      icon: BarChart3,
      color: 'from-indigo-500 to-purple-500'
    }
  ]

  const industryOptions = [
    'E-commerce', 'SaaS', 'Healthcare', 'Real Estate', 'Education', 
    'Finance', 'Restaurant', 'Fitness', 'Beauty', 'Technology', 'Other'
  ]

  const budgetOptions = [
    'Under 5,000 EGP/month', '5,000 - 25,000 EGP/month', '25,000 - 50,000 EGP/month',
    '50,000 - 100,000 EGP/month', '100,000 - 250,000 EGP/month', 'Over 250,000 EGP/month'
  ]

  const timelineOptions = [
    '1-3 months', '3-6 months', '6-12 months', '1-2 years', '2+ years'
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const generateStrategy = async () => {
    setIsGenerating(true)
    
    setTimeout(() => {
      let strategy = ''
      
      switch (activeTab) {
        case 'overview':
          strategy = generateStrategyOverview()
          break
        case 'target-audience':
          strategy = generateTargetAudienceAnalysis()
          break
        case 'campaign-plan':
          strategy = generateCampaignPlan()
          break
        case 'content-strategy':
          strategy = generateContentStrategy()
          break
        case 'budget-allocation':
          strategy = generateBudgetAllocation()
          break
        case 'kpi-tracking':
          strategy = generateKPITracking()
          break
        default:
          strategy = generateStrategyOverview()
      }
      
      setGeneratedStrategy(strategy)
      setIsGenerating(false)
    }, 3000)
  }

  const generateStrategyOverview = () => {
    return `🎯 MARKETING STRATEGY OVERVIEW
Business: ${formData.businessName}
Industry: ${formData.industry}
Timeline: ${formData.timeline}

📋 EXECUTIVE SUMMARY
This comprehensive marketing strategy is designed to position ${formData.businessName} as a leader in the ${formData.industry} industry. Our approach focuses on data-driven decision making, customer-centric campaigns, and measurable ROI.

🎯 PRIMARY OBJECTIVES
${formData.goals || '• Increase brand awareness by 40%\n• Generate 50+ qualified leads per month\n• Achieve 3x ROI on marketing spend\n• Establish thought leadership in industry'}

🚀 KEY INITIATIVES
1. Brand Development & Positioning
2. Digital Marketing Transformation
3. Customer Acquisition Strategy
4. Retention & Loyalty Programs
5. Analytics & Performance Optimization

💡 COMPETITIVE ADVANTAGE
• Data-driven approach with continuous optimization
• Multi-channel integration for maximum reach
• Customer journey mapping and personalization
• Agile methodology for rapid iteration

📊 SUCCESS METRICS
• Brand awareness and sentiment analysis
• Lead generation and conversion rates
• Customer acquisition cost (CAC)
• Customer lifetime value (CLV)
• Marketing ROI and attribution

Next Steps: Proceed with detailed audience analysis and campaign planning.`
  }

  const generateTargetAudienceAnalysis = () => {
    return `👥 TARGET AUDIENCE ANALYSIS
Business: ${formData.businessName}

🎯 PRIMARY AUDIENCE SEGMENTS

1. CORE CUSTOMERS
• Demographics: Age 25-45, urban professionals
• Income: 150,000+ EGP annually
• Education: College educated
• Behavior: Tech-savvy, value-driven decision makers
• Pain Points: ${formData.challenges || 'Time constraints, need for efficiency, quality concerns'}

2. SECONDARY AUDIENCE
• Demographics: Age 18-24, students/early career
• Income: 75,000-150,000 EGP annually
• Behavior: Social media active, trend followers
• Motivations: Value, convenience, social proof

🔍 PSYCHOGRAPHIC PROFILE
Values: Innovation, reliability, efficiency
Lifestyle: Busy professionals seeking quality solutions
Media Consumption: LinkedIn, industry publications, podcasts
Purchase Behavior: Research-driven, value-conscious

📱 DIGITAL BEHAVIOR
• Mobile-first users (85%+)
• Social media engagement: 2-3 hours daily
• Content preferences: Video, infographics, case studies
• Purchase journey: 6-8 touchpoints before conversion

💡 MESSAGING STRATEGY
Primary Message: "Solutions tailored for your success"
Tone: Professional yet approachable
Key Differentiators: Quality, innovation, customer service

🎯 PERSONALIZATION OPPORTUNITIES
• Behavioral targeting based on engagement
• Content customization by industry vertical
• Lifecycle stage-specific messaging
• Geographic and demographic personalization`
  }

  const generateCampaignPlan = () => {
    return `🚀 CAMPAIGN EXECUTION PLAN
Business: ${formData.businessName}
Timeline: ${formData.timeline}

📅 PHASED APPROACH

PHASE 1: FOUNDATION (Month 1-2)
• Brand audit and competitive analysis
• Platform setup and optimization
• Content calendar development
• Initial audience building

PHASE 2: LAUNCH (Month 3-4)
• Multi-channel campaign launch
• Paid advertising activation
• Influencer partnerships
• PR and media outreach

PHASE 3: OPTIMIZATION (Month 5-8)
• Performance analysis and refinement
• A/B testing and optimization
• Retargeting campaigns
• Email marketing automation

PHASE 4: SCALE (Month 9-12)
• Budget scaling based on performance
• New market expansion
• Product launch campaigns
• Loyalty program implementation

🎯 CAMPAIGN TYPES

1. AWARENESS CAMPAIGNS
• Social media advertising
• Content marketing
• Influencer collaborations
• PR and media outreach

2. CONVERSION CAMPAIGNS
• Search engine marketing
• Retargeting ads
• Email marketing sequences
• Landing page optimization

3. RETENTION CAMPAIGNS
• Customer loyalty programs
• Email newsletters
• Social media community building
• Referral programs

📊 CHANNEL ALLOCATION
• Social Media: 35%
• Search Marketing: 25%
• Content Marketing: 20%
• Email Marketing: 15%
• Other: 5%

🎯 KEY PERFORMANCE INDICATORS
• Reach and impressions
• Engagement rate
• Click-through rate
• Conversion rate
• Cost per acquisition
• Return on ad spend`
  }

  const generateContentStrategy = () => {
    return `📝 CONTENT STRATEGY & CALENDAR
Business: ${formData.businessName}

🎯 CONTENT PILLARS

1. EDUCATIONAL CONTENT (40%)
• How-to guides and tutorials
• Industry insights and trends
• Best practices and tips
• Case studies and success stories

2. PROMOTIONAL CONTENT (30%)
• Product features and benefits
• Special offers and promotions
• Customer testimonials
• Comparison content

3. ENGAGEMENT CONTENT (20%)
• Polls and surveys
• User-generated content
• Behind-the-scenes content
• Interactive content

4. THOUGHT LEADERSHIP (10%)
• Industry commentary
• Original research and data
• Expert interviews
• Future trends analysis

📅 CONTENT CALENDAR STRUCTURE

WEEKLY CONTENT
• Monday: Educational blog post
• Tuesday: Social media tips
• Wednesday: Video content
• Thursday: Industry news
• Friday: Engagement post
• Saturday: User-generated content
• Sunday: Inspirational content

MONTHLY FEATURES
• Monthly webinar/workshop
• Newsletter edition
• Case study release
• Expert interview
• Content performance review

🎯 PLATFORM-SPECIFIC STRATEGY

LINKEDIN
• Professional tone
• Industry insights
• Company updates
• Employee spotlights

INSTAGRAM
• Visual content focus
• Stories and reels
• User-generated content
• Behind-the-scenes

FACEBOOK
• Community building
• Live videos
• Group engagement
• Event promotion

BLOG/WEBSITE
• Long-form content
• SEO optimization
• Lead generation
• Resource center

📊 CONTENT METRICS
• Engagement rate
• Share rate
• Time on page
• Lead generation
• Social shares
• Comment quality

🔄 CONTENT REPURPOSING STRATEGY
• Blog to social media snippets
• Video to multiple platforms
• Data to infographics
• Case studies to presentations`
  }

  const generateBudgetAllocation = () => {
    return `💰 BUDGET ALLOCATION STRATEGY
Business: ${formData.businessName}
Total Budget: ${formData.budget}

📊 OPTIMAL BUDGET DISTRIBUTION

DIGITAL MARKETING (70%)
• Social Media Advertising: 25%
  - Facebook/Instagram: 15%
  - LinkedIn: 7%
  - Twitter/X: 3%

• Search Engine Marketing: 20%
  - Google Ads: 15%
  - Bing Ads: 5%

• Content Marketing: 15%
  - Content creation: 10%
  - Content promotion: 5%

• Email Marketing: 10%
  - Platform costs: 5%
  - Automation tools: 5%

TRADITIONAL MARKETING (20%)
• Print Advertising: 8%
• Radio/Podcast: 7%
• Outdoor Advertising: 5%

TOOLS & TECHNOLOGY (10%)
• Analytics platforms: 4%
• Marketing automation: 3%
• Creative tools: 3%

🎯 BUDGET OPTIMIZATION STRATEGY

PERFORMANCE-BASED ALLOCATION
• Monthly performance reviews
• Budget reallocation based on ROI
• Seasonal adjustments
• Test and learn approach

COST-SAVING MEASURES
• In-house content creation
• Organic social media growth
• Email marketing automation
• Long-term contracts for better rates

💡 ROI PROJECTIONS

CONSERVATIVE ESTIMATE
• 2x ROI within 6 months
• 3x ROI within 12 months
• 15% month-over-month growth

AGGRESSIVE ESTIMATE
• 3x ROI within 6 months
• 5x ROI within 12 months
• 25% month-over-month growth

📈 BUDGET SCALING PLAN

PHASE 1 (Months 1-3): Initial Investment
• Focus: Brand awareness and audience building
• Budget: 100% of allocated amount

PHASE 2 (Months 4-6): Performance Optimization
• Focus: Conversion optimization
• Budget: 120% of initial (based on performance)

PHASE 3 (Months 7-12): Growth Acceleration
• Focus: Scaling successful campaigns
• Budget: 150% of initial (ROI-driven)

🔧 COST MANAGEMENT
• Daily budget monitoring
• Weekly performance reviews
• Monthly budget optimization
• Quarterly strategy adjustments`
  }

  const generateKPITracking = () => {
    return `📊 KPI & PERFORMANCE TRACKING
Business: ${formData.businessName}

🎯 KEY PERFORMANCE INDICATORS

AWARENESS METRICS
• Brand Awareness: Target 40% increase
• Reach: 100,000+ monthly impressions
• Social Media Following: 10,000+ followers
• Website Traffic: 5,000+ monthly visitors
• Share of Voice: 15% market share

ENGAGEMENT METRICS
• Engagement Rate: Target 3-5%
• Click-Through Rate: Target 2-3%
• Time on Site: Target 3+ minutes
• Pages per Session: Target 2.5+ pages
• Social Media Interactions: 1,000+ monthly

CONVERSION METRICS
• Lead Generation: 50+ qualified leads monthly
• Conversion Rate: Target 2-3%
• Cost Per Acquisition: Target under 250 EGP
• Sales Revenue: Track monthly growth
• Customer Lifetime Value: Target 2,500+ EGP

RETENTION METRICS
• Customer Retention Rate: Target 80%+
• Repeat Purchase Rate: Target 30%+
• Customer Satisfaction Score: Target 4.5/5
• Net Promoter Score: Target 50+
• Churn Rate: Target under 5%

📈 TRACKING TOOLS & METHODS

ANALYTICS PLATFORMS
• Google Analytics 4
• Facebook Business Suite
• LinkedIn Analytics
• Email Marketing Platform
• CRM System

DASHBOARDS & REPORTING
• Real-time performance dashboard
• Weekly performance summaries
• Monthly detailed reports
• Quarterly strategy reviews
• Annual performance analysis

🎯 REPORTING CADENCE

DAILY TRACKING
• Ad performance metrics
• Website traffic
• Social media engagement
• Email campaign performance

WEEKLY REVIEWS
• Campaign performance analysis
• Budget vs actual spend
• Lead quality assessment
• Content performance metrics

MONTHLY REPORTS
• Comprehensive KPI analysis
• ROI calculations
• Competitive analysis
• Strategic recommendations

QUARTERLY REVIEWS
• Strategy effectiveness evaluation
• Budget optimization
• Market trend analysis
• Long-term planning adjustments

🔧 OPTIMIZATION FRAMEWORK

DATA-DECISION MAKING
• Weekly performance reviews
• A/B testing results analysis
• Customer feedback integration
• Market trend monitoring

CONTINUOUS IMPROVEMENT
• Monthly strategy adjustments
• Budget reallocation based on performance
• Content optimization based on engagement
• Campaign refinement based on conversion data

📊 SUCCESS BENCHMARKS
• Industry standards comparison
• Competitor performance analysis
• Historical performance trends
• Best practice implementation`
  }

  const downloadAsPDF = () => {
    const blob = new Blob([generatedStrategy], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${activeTab}-strategy.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const resetForm = () => {
    setFormData({
      businessName: '',
      industry: '',
      targetAudience: '',
      budget: '',
      timeline: '',
      goals: '',
      challenges: ''
    })
    setGeneratedStrategy('')
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

      <Navigation currentPath="/marketing-strategy-tool" />

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
                <Target className="w-4 h-4" />
                <span className="text-sm font-medium">Strategic Marketing Planning</span>
              </motion.div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  Marketing Strategy Tool
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                Develop comprehensive marketing strategies with data-driven insights. 
                From audience analysis to campaign execution, build your roadmap to success.
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
                  Start Planning
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
              <h2 className="text-4xl font-bold mb-4">Strategic Planning Tools</h2>
              <p className="text-xl text-gray-400">Build your comprehensive marketing strategy</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {strategySections.map((tool, index) => (
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
                {strategySections.find(t => t.id === activeTab)?.title}
              </h2>
              <p className="text-xl text-gray-400">
                {strategySections.find(t => t.id === activeTab)?.description}
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
                  Business Information
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Business Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white placeholder-gray-400"
                      value={formData.businessName}
                      onChange={(e) => handleInputChange('businessName', e.target.value)}
                      placeholder="Enter your business name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Industry
                    </label>
                    <select
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white appearance-none cursor-pointer"
                      value={formData.industry}
                      onChange={(e) => handleInputChange('industry', e.target.value)}
                    >
                      <option value="" className="bg-gray-900">Select industry</option>
                      {industryOptions.map(option => (
                        <option key={option} value={option} className="bg-gray-900">
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Target Audience
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white placeholder-gray-400"
                      value={formData.targetAudience}
                      onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                      placeholder="Describe your target audience"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Marketing Budget
                      </label>
                      <select
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white appearance-none cursor-pointer"
                        value={formData.budget}
                        onChange={(e) => handleInputChange('budget', e.target.value)}
                      >
                        <option value="" className="bg-gray-900">Select budget range</option>
                        {budgetOptions.map(option => (
                          <option key={option} value={option} className="bg-gray-900">
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Timeline
                      </label>
                      <select
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white appearance-none cursor-pointer"
                        value={formData.timeline}
                        onChange={(e) => handleInputChange('timeline', e.target.value)}
                      >
                        <option value="" className="bg-gray-900">Select timeline</option>
                        {timelineOptions.map(option => (
                          <option key={option} value={option} className="bg-gray-900">
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Marketing Goals
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 resize-none text-white placeholder-gray-400"
                      value={formData.goals}
                      onChange={(e) => handleInputChange('goals', e.target.value)}
                      placeholder="List your key marketing goals (one per line)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Current Challenges
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 resize-none text-white placeholder-gray-400"
                      value={formData.challenges}
                      onChange={(e) => handleInputChange('challenges', e.target.value)}
                      placeholder="Describe current marketing challenges"
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button
                      onClick={generateStrategy}
                      disabled={isGenerating || !formData.businessName}
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
                          Generate Strategy
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
                  Generated Strategy
                </h3>
                
                {generatedStrategy ? (
                  <div className="space-y-6">
                    <div className="bg-white/10 rounded-lg p-6 border border-white/20 max-h-96 overflow-y-auto">
                      <div className="text-white whitespace-pre-wrap leading-relaxed font-mono text-sm">
                        {generatedStrategy}
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <Button
                        onClick={downloadAsPDF}
                        variant="outline"
                      >
                        <Download className="w-5 h-5 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Star className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-400 mb-2">No strategy generated yet</p>
                    <p className="text-sm text-gray-500">Fill in the form and click "Generate Strategy" to get started</p>
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