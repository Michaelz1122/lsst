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

export default function MediaBuyingPlanTool() {
  const [activeTab, setActiveTab] = useState('campaign-overview')
  const [formData, setFormData] = useState({
    campaignName: '',
    industry: '',
    budget: '',
    duration: '',
    targetAudience: '',
    campaignGoal: '',
    geographicTarget: ''
  })
  const [generatedPlan, setGeneratedPlan] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const mediaBuyingSections = [
    {
      id: 'campaign-overview',
      title: 'Campaign Overview',
      description: 'Comprehensive campaign strategy and objectives',
      icon: Target,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'channel-selection',
      title: 'Channel Selection',
      description: 'Optimal media channels for your campaign',
      icon: Radio,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'budget-allocation',
      title: 'Budget Allocation',
      description: 'Strategic budget distribution across channels',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'targeting-strategy',
      title: 'Targeting Strategy',
      description: 'Detailed audience targeting parameters',
      icon: Users,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'ad-creative',
      title: 'Ad Creative Strategy',
      description: 'Creative requirements and specifications',
      icon: Monitor,
      color: 'from-yellow-500 to-amber-500'
    },
    {
      id: 'performance-tracking',
      title: 'Performance Tracking',
      description: 'KPIs, metrics, and optimization framework',
      icon: BarChart3,
      color: 'from-indigo-500 to-purple-500'
    }
  ]

  const industryOptions = [
    'E-commerce', 'SaaS', 'Healthcare', 'Real Estate', 'Education', 
    'Finance', 'Restaurant', 'Fitness', 'Beauty', 'Technology', 'Automotive', 'Travel', 'Other'
  ]

  const budgetOptions = [
    'Under 25,000 EGP', '25,000 - 75,000 EGP', '75,000 - 250,000 EGP',
    '250,000 - 500,000 EGP', '500,000 - 1,250,000 EGP', 'Over 1,250,000 EGP'
  ]

  const durationOptions = [
    '1 month', '3 months', '6 months', '12 months', 'Ongoing'
  ]

  const campaignGoals = [
    'Brand Awareness', 'Lead Generation', 'Sales Conversion', 
    'Website Traffic', 'App Installs', 'Brand Engagement', 'Customer Retention'
  ]

  const geographicTargets = [
    'Local (City-specific)', 'Regional (State/Province)', 'National', 'International', 'Global'
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const generatePlan = async () => {
    setIsGenerating(true)
    
    setTimeout(() => {
      let plan = ''
      
      switch (activeTab) {
        case 'campaign-overview':
          plan = generateCampaignOverview()
          break
        case 'channel-selection':
          plan = generateChannelSelection()
          break
        case 'budget-allocation':
          plan = generateBudgetAllocation()
          break
        case 'targeting-strategy':
          plan = generateTargetingStrategy()
          break
        case 'ad-creative':
          plan = generateAdCreativeStrategy()
          break
        case 'performance-tracking':
          plan = generatePerformanceTracking()
          break
        default:
          plan = generateCampaignOverview()
      }
      
      setGeneratedPlan(plan)
      setIsGenerating(false)
    }, 3000)
  }

  const generateCampaignOverview = () => {
    return `🎯 MEDIA BUYING CAMPAIGN OVERVIEW
Campaign: ${formData.campaignName}
Industry: ${formData.industry}
Duration: ${formData.duration}
Budget: ${formData.budget}

📋 EXECUTIVE SUMMARY
This media buying plan outlines a comprehensive strategy for ${formData.campaignName}, designed to maximize reach and ROI across optimal media channels. The campaign will run for ${formData.duration} with a total budget of ${formData.budget}.

🎯 PRIMARY OBJECTIVES
${formData.campaignGoal === 'Brand Awareness' ? '• Increase brand awareness by 45%\n• Achieve 2M+ impressions\n• Build brand recognition in target market\n• Establish market authority' : 
  formData.campaignGoal === 'Lead Generation' ? '• Generate 500+ qualified leads\n• Maintain cost per lead under 250 EGP\n• Achieve 15% conversion rate\n• Build lead nurturing pipeline' :
  formData.campaignGoal === 'Sales Conversion' ? '• Drive 500,000+ EGP in revenue\n• Achieve 3x ROAS\n• Maintain cost per acquisition under 375 EGP\n• Increase average order value by 20%' :
  formData.campaignGoal === 'Website Traffic' ? '• Drive 50,000+ website visits\n• Achieve 2.5% click-through rate\n• Reduce bounce rate under 40%\n• Increase average session duration to 3+ minutes' :
  formData.campaignGoal === 'App Installs' ? '• Generate 10,000+ app installs\n• Maintain cost per install under 25 EGP\n• Achieve 25% install-to-registration rate\n• Build 1,000+ active monthly users' :
  formData.campaignGoal === 'Brand Engagement' ? '• Achieve 5% engagement rate\n• Generate 10,000+ social interactions\n• Build 5,000+ new followers\n• Increase share of voice by 25%' :
  formData.campaignGoal === 'Customer Retention' ? '• Achieve 80% customer retention rate\n• Increase repeat purchases by 30%\n• Reduce churn rate by 15%\n• Increase customer lifetime value by 40%' : 
  '• Custom campaign objectives based on specific goals'}

🎯 TARGET MARKET
Geographic Focus: ${formData.geographicTarget}
Target Audience: ${formData.targetAudience}

📊 SUCCESS METRICS
• Reach and frequency targets
• Cost per thousand impressions (CPM)
• Click-through rate (CTR)
• Conversion rate
• Return on ad spend (ROAS)
• Brand lift and awareness

🚀 KEY INITIATIVES
1. Multi-channel media buying strategy
2. Data-driven audience targeting
3. Creative optimization and testing
4. Real-time performance monitoring
5. Continuous budget optimization

💡 COMPETITIVE ADVANTAGE
• Advanced targeting capabilities
• Real-time bidding optimization
• Cross-channel attribution modeling
• AI-powered budget allocation
• Comprehensive performance analytics`
  }

  const generateChannelSelection = () => {
    const channels = [
      {
        name: 'Social Media Advertising',
        platforms: ['Facebook', 'Instagram', 'LinkedIn', 'Twitter/X', 'TikTok'],
        suitability: 'High',
        budget: '35-40%',
        description: 'Advanced targeting, high engagement, visual content'
      },
      {
        name: 'Search Engine Marketing',
        platforms: ['Google Ads', 'Bing Ads'],
        suitability: 'High',
        budget: '25-30%',
        description: 'High intent users, direct response, measurable results'
      },
      {
        name: 'Programmatic Display',
        platforms: ['Display Networks', 'Native Ads', 'Video Ads'],
        suitability: 'Medium',
        budget: '15-20%',
        description: 'Broad reach, retargeting capabilities, brand awareness'
      },
      {
        name: 'Video Advertising',
        platforms: ['YouTube', 'Connected TV', 'OTT'],
        suitability: 'Medium',
        budget: '10-15%',
        description: 'High engagement, storytelling, brand building'
      },
      {
        name: 'Audio Advertising',
        platforms: ['Spotify', 'Podcasts', 'Radio'],
        suitability: 'Low',
        budget: '5-10%',
        description: 'Audio engagement, podcast targeting, local reach'
      },
      {
        name: 'Out-of-Home (OOH)',
        platforms: ['Digital Billboards', 'Transit Ads', 'Place-based Media'],
        suitability: 'Low',
        budget: '5%',
        description: 'Geographic targeting, brand awareness, local impact'
      }
    ]

    return `📺 CHANNEL SELECTION STRATEGY
Campaign: ${formData.campaignName}

🎯 RECOMMENDED MEDIA CHANNELS

${channels.map((channel, index) => `
${index + 1}. ${channel.name}
   Platforms: ${channel.platforms.join(', ')}
   Suitability: ${channel.suitability} ⭐⭐⭐${channel.suitability === 'High' ? '⭐⭐' : channel.suitability === 'Medium' ? '⭐' : ''}
   Recommended Budget: ${channel.budget}
   Description: ${channel.description}
`).join('')}

📊 CHANNEL PERFORMANCE PROJECTIONS

SOCIAL MEDIA ADVERTISING (35-40%)
• Estimated Reach: 500,000 - 1,000,000
• Average CPM: 40 - 75 EGP
• Expected CTR: 1.5% - 3.0%
• Best For: Brand awareness, lead generation, retargeting

SEARCH ENGINE MARKETING (25-30%)
• Estimated Reach: 100,000 - 250,000
• Average CPC: 10 - 40 EGP
• Expected CTR: 2.0% - 5.0%
• Best For: Direct response, high-intent audiences

PROGRAMMATIC DISPLAY (15-20%)
• Estimated Reach: 1,000,000 - 2,000,000
• Average CPM: 15 - 40 EGP
• Expected CTR: 0.3% - 0.8%
• Best For: Brand awareness, retargeting, broad reach

VIDEO ADVERTISING (10-15%)
• Estimated Reach: 300,000 - 600,000
• Average CPV: 0.50 - 1.50 EGP
• Completion Rate: 60% - 85%
• Best For: Brand storytelling, high engagement

🎯 CHANNEL SELECTION RATIONALE

PRIMARY CHANNELS (High Priority)
• Social Media: Best for audience targeting and engagement
• Search Marketing: Highest conversion potential and ROI

SECONDARY CHANNELS (Medium Priority)
• Programmatic Display: Excellent for retargeting and brand awareness
• Video Advertising: Strong for brand building and storytelling

SUPPORT CHANNELS (Low Priority)
• Audio Advertising: Niche audience targeting
• OOH: Geographic and local market reinforcement

🔄 CHANNEL INTEGRATION STRATEGY
• Cross-channel retargeting
• Unified messaging and creative
• Sequential messaging across touchpoints
• Attribution modeling across channels`
  }

  const generateBudgetAllocation = () => {
    return `💰 BUDGET ALLOCATION PLAN
Campaign: ${formData.campaignName}
Total Budget: ${formData.budget}
Duration: ${formData.duration}

📊 OPTIMAL BUDGET DISTRIBUTION

PHASED BUDGET ALLOCATION

PHASE 1: LAUNCH (First 30% of campaign duration)
• Budget Allocation: 40% of total budget
• Focus: Awareness and audience building
• Primary Channels: Social Media, Search Marketing
• Expected Results: Market penetration, initial conversions

PHASE 2: OPTIMIZATION (Middle 40% of campaign duration)
• Budget Allocation: 35% of total budget
• Focus: Conversion optimization and retargeting
• Primary Channels: Search, Programmatic Display
• Expected Results: Improved ROAS, lower acquisition costs

PHASE 3: SCALE (Final 30% of campaign duration)
• Budget Allocation: 25% of total budget
• Focus: Scaling successful initiatives
• Primary Channels: Top-performing channels from Phase 2
• Expected Results: Maximum ROI, sustained performance

🎯 CHANNEL-SPECIFIC BUDGET BREAKDOWN

SOCIAL MEDIA ADVERTISING: 35% ($${Math.round(parseInt(formData.budget.replace(/[^0-9]/g, '')) * 0.35)})
• Facebook/Instagram: 20%
• LinkedIn: 10%
• Twitter/X: 3%
• TikTok: 2%

SEARCH ENGINE MARKETING: 30% ($${Math.round(parseInt(formData.budget.replace(/[^0-9]/g, '')) * 0.30)})
• Google Search: 22%
• Google Display: 5%
• Bing Search: 3%

PROGRAMMATIC DISPLAY: 20% ($${Math.round(parseInt(formData.budget.replace(/[^0-9]/g, '')) * 0.20)})
• Standard Display: 12%
• Native Advertising: 5%
• Video Display: 3%

VIDEO ADVERTISING: 10% ($${Math.round(parseInt(formData.budget.replace(/[^0-9]/g, '')) * 0.10)})
• YouTube: 7%
• Connected TV: 3%

SUPPORTING CHANNELS: 5% ($${Math.round(parseInt(formData.budget.replace(/[^0-9]/g, '')) * 0.05)})
• Audio Advertising: 3%
• OOH: 2%

💡 BUDGET OPTIMIZATION STRATEGIES

PERFORMANCE-BASED ALLOCATION
• Weekly budget reviews and adjustments
• Reallocation based on ROAS performance
• Seasonal and trend-based adjustments
• Competitive landscape considerations

COST-EFFICIENCY MEASURES
• Dayparting optimization
• Geographic bid adjustments
• Audience segment performance tuning
• Creative performance-based budgeting

📈 ROI PROJECTIONS

CONSERVATIVE SCENARIO
• Overall ROAS: 2.5x - 3.0x
• Cost Per Acquisition: 300 - 400 EGP
• Conversion Rate: 2.0% - 2.5%
• Brand Lift: 15% - 20%

AGGRESSIVE SCENARIO
• Overall ROAS: 3.5x - 4.5x
• Cost Per Acquisition: 200 - 300 EGP
• Conversion Rate: 3.0% - 4.0%
• Brand Lift: 25% - 35%

🔧 BUDGET MANAGEMENT FRAMEWORK

DAILY MONITORING
• Spend pacing and tracking
• Performance metric monitoring
• Budget vs. actual variance analysis
• Alert system for budget anomalies

WEEKLY OPTIMIZATION
• Performance review meetings
• Budget reallocation decisions
• Creative performance analysis
• Competitive response adjustments

MONTHLY STRATEGIC REVIEWS
• Comprehensive ROI analysis
• Budget efficiency assessment
• Market condition evaluation
• Long-term strategy adjustments`
  }

  const generateTargetingStrategy = () => {
    return `🎯 TARGETING STRATEGY
Campaign: ${formData.campaignName}
Target Audience: ${formData.targetAudience}
Geographic Focus: ${formData.geographicTarget}

👥 AUDIENCE SEGMENTATION

PRIMARY TARGET SEGMENT (60% of budget)
• Demographics: Age 28-45, Urban professionals
• Income: 300,000+ EGP annually
• Education: Bachelor's degree or higher
• Behavior: Tech-savvy, research-driven purchases
• Interests: ${formData.industry.toLowerCase()}-related content, professional development
• Psychographics: Value-driven, quality-conscious, early adopters

SECONDARY TARGET SEGMENT (30% of budget)
• Demographics: Age 18-27, Students/early career
• Income: 150,000-300,000 EGP annually
• Behavior: Social media active, trend followers
• Interests: Innovation, lifestyle content
• Psychographics: Experience-focused, social proof influenced

TERTIARY TARGET SEGMENT (10% of budget)
• Demographics: Age 46-65, Established professionals
• Income: 400,000+ EGP annually
• Behavior: Traditional media consumers, brand loyal
• Interests: Professional services, luxury content
• Psychographics: Quality-focused, time-conscious

🎯 DETAILED TARGETING PARAMETERS

DEMOGRAPHIC TARGETING
• Age: 25-54 (primary focus 28-45)
• Gender: All (with creative variations)
• Income: 250,000+ EGP household income
• Education: Some college or higher
• Employment: Full-time employed, business owners
• Family Status: Single, married, no children/with children

GEOGRAPHIC TARGETING
• Primary: ${formData.geographicTarget === 'Local' ? 'City-specific targeting with 10-mile radius' : 
  formData.geographicTarget === 'Regional' ? 'State/province-level targeting' :
  formData.geographicTarget === 'National' ? 'Country-wide targeting' :
  formData.geographicTarget === 'International' ? 'Multi-country targeting' :
  'Global targeting'}
• Secondary: Lookalike audiences based on converters
• Exclusion: Competitor locations, low-performing areas

BEHAVIORAL TARGETING
• Purchase Behavior: High-intent buyers, past purchasers
• Device Usage: Mobile-first, multi-device users
• Content Consumption: Industry blog readers, video viewers
• Purchase History: Previous category buyers, cart abandoners
• Engagement Level: High-engagement users, frequent visitors

INTEREST-BASED TARGETING
• Professional Interests: ${formData.industry.toLowerCase()} trends, business development
• Personal Interests: Technology, innovation, professional growth
• Lifestyle Interests: Career advancement, productivity, efficiency
• Media Interests: Industry publications, business podcasts

🔍 ADVANCED TARGETING STRATEGIES

CUSTOM AUDIENCES
• Website Visitors: All visitors, past 30 days
• Email Lists: Customer database, newsletter subscribers
• App Users: Active app users, past installers
• Social Engagers: Page followers, post engagers

LOOKALIKE AUDIENCES
• Value-Based Lookalike: Based on high-value customers
• Converter Lookalike: Based on recent purchasers
• Engager Lookalike: Based on high-engagement users
• Similar Business Lookalike: Based on business page visitors

RETARGETING STRATEGIES
• Site Retargeting: All site visitors, past 30 days
• Cart Abandonment: Users who added to cart but didn't purchase
• Content Retargeting: Users who consumed specific content
• Cross-Device Retargeting: Multi-device user targeting

⚡ REAL-TIME OPTIMIZATION

AUTOMATIC BIDDING STRATEGIES
• Target CPA: Optimize for cost per acquisition
• Target ROAS: Optimize for return on ad spend
• Maximize Conversions: Optimize for conversion volume
• Maximize Clicks: Optimize for traffic volume

MANUAL OPTIMIZATION LEVERS
• Bid adjustments by demographic segments
• Dayparting based on performance data
• Geographic bid modifiers
• Device performance optimization

📊 TARGETING PERFORMANCE METRICS
• Audience Reach and Frequency
• Segment-Specific Conversion Rates
• Cost Per Acquisition by Segment
• Return on Ad Spend by Audience
• Audience Overlap and Duplication`
  }

  const generateAdCreativeStrategy = () => {
    return `🎨 AD CREATIVE STRATEGY
Campaign: ${formData.campaignName}

📋 CREATIVE REQUIREMENTS OVERVIEW

CREATIVE ASSETS NEEDED

SOCIAL MEDIA ADVERTISING
• Static Images (1080x1080, 1080x1350)
• Carousel Ads (1080x1080 per card)
• Video Ads (15-30 seconds, 9:16 aspect ratio)
• Stories Ads (1080x1920, 15 seconds max)
• LinkedIn Ads (1200x627, 1200x1200)

SEARCH ENGINE MARKETING
• Responsive Search Ads (15 headlines, 4 descriptions)
• Display Ads (300x250, 728x90, 160x600, 300x600)
• Responsive Display Ads
• Gmail Ads (300x250, 600x500)

PROGRAMMATIC DISPLAY
• Standard Display (300x250, 728x90, 160x600)
• Native Ads (1200x627, 1:1 aspect ratio)
• Video Ads (15-30 seconds, various sizes)
• Interactive HTML5 Ads

VIDEO ADVERTISING
• YouTube Skippable Ads (15-30 seconds)
• YouTube Non-Skippable Ads (15-20 seconds)
• Connected TV Ads (15-30 seconds)
• Pre-Roll Video Ads (15 seconds)

🎯 CREATIVE STRATEGY BY CHANNEL

SOCIAL MEDIA CREATIVE APPROACH
Primary Message: "Solutions designed for your success"
Visual Style: Modern, professional, clean
Color Palette: Brand colors with high contrast
Tone: Professional yet approachable
Call-to-Action: "Learn More", "Get Started", "Shop Now"

SEARCH ADVERTISING CREATIVE
Headline Strategy: Benefit-focused, keyword-rich
Description Approach: Feature-highlighting, urgency-creating
Display URL: Clean, brand-inclusive
Extensions: Sitelinks, callouts, structured snippets
Call-to-Action: Action-oriented, clear next steps

PROGRAMMATIC DISPLAY CREATIVE
Visual Style: Eye-catching, brand-consistent
Message Strategy: Awareness-driven, benefit-focused
Animation: Subtle motion, attention-grabbing
Responsive Design: Multi-size compatibility
Call-to-Action: Brand awareness, consideration focus

VIDEO CREATIVE STRATEGY
Storytelling: Problem-solution-benefit framework
Length: 15-30 seconds for optimal completion
Hook: First 3 seconds critical for attention
Audio: Professional voiceover, background music
Subtitles: Always included for sound-off viewing

🎨 CREATIVE GUIDELINES

BRAND CONSISTENCY
• Logo placement: Top-left or bottom-right
• Color Usage: 60% primary, 30% secondary, 10% accent
• Typography: Brand fonts with fallback options
• Imagery Style: Professional, authentic, diverse

MESSAGING FRAMEWORK
Primary Message: Clear value proposition
Secondary Message: Key benefits and features
Supporting Message: Social proof, credibility indicators
Call-to-Action: Clear, compelling, action-oriented

VISUAL HIERARCHY
• Headline: Largest, most prominent text
• Value Proposition: Secondary emphasis
• Supporting Details: Smaller, supporting text
• Call-to-Action: High contrast, button-style

📱 PLATFORM-SPECIFIC SPECIFICATIONS

FACEBOOK/INSTAGRAM
• Image Ads: 1080x1080 (1:1), 1080x1350 (4:5)
• Carousel: 1080x1080 per card, 2-10 cards
• Video: 4:5 or 1:1 aspect ratio, max 30 seconds
• Stories: 1080x1920, max 15 seconds
• Text Limit: 125 characters for primary text

LINKEDIN
• Single Image: 1200x627 (1.91:1)
• Carousel: 1080x1080 per card
• Video: 1:2.4 to 2.4:1 aspect ratio
• Text Limit: 600 characters for primary text
• Professional tone required

GOOGLE ADS
• Search Ads: 30 characters max headlines, 90 characters descriptions
• Display: Various sizes, responsive design preferred
• YouTube: 16:9, 1:1, or 4:5 aspect ratios
• Gmail: 300x250 or 600x500 sizes

PROGRAMMATIC
• Standard IAB sizes: 300x250, 728x90, 160x600, 300x600
• Native: 1200x627 or 1:1 aspect ratio
• Video: VAST compliant, multiple sizes
• File Size: Under 150KB for images, under 2MB for video

🔄 CREATIVE TESTING STRATEGY

A/B TESTING FRAMEWORK
• Test one variable at a time
• Minimum 1,000 impressions per variant
• Statistical significance: 95% confidence level
• Testing duration: Minimum 2 weeks

TESTING VARIABLES
• Visual Elements: Images, colors, layouts
• Messaging: Headlines, descriptions, CTAs
• Formats: Static vs. video, single vs. carousel
• Audience Segments: Different messaging for different groups

CREATIVE OPTIMIZATION
• Weekly performance reviews
• Budget reallocation to top performers
• Underperforming creative pause criteria
• Creative refresh schedule (every 4-6 weeks)

📊 CREATIVE PERFORMANCE METRICS
• Click-Through Rate (CTR)
• Conversion Rate
• Cost Per Acquisition (CPA)
• Engagement Rate
• View-Through Rate
• Brand Lift Metrics`
  }

  const generatePerformanceTracking = () => {
    return `📊 PERFORMANCE TRACKING & OPTIMIZATION
Campaign: ${formData.campaignName}
Duration: ${formData.duration}

🎯 KEY PERFORMANCE INDICATORS (KPIs)

AWARENESS METRICS
• Impressions: Target 10M+ total impressions
• Reach: Target 2M+ unique users
• Frequency: Target 3-5 average frequency
• Brand Lift: Target 20%+ increase in brand awareness
• Share of Voice: Target 15%+ market share

ENGAGEMENT METRICS
• Click-Through Rate (CTR): Target 1.5% - 3.0%
• Engagement Rate: Target 2.0% - 4.0%
• Video Completion Rate: Target 60% - 80%
• Time on Site: Target 2.5+ minutes
• Pages per Session: Target 2.5+ pages

CONVERSION METRICS
• Conversion Rate: Target 2.0% - 4.0%
• Cost Per Acquisition (CPA): Target 250 - 400 EGP
• Return on Ad Spend (ROAS): Target 3.0x - 4.0x
• Lead Quality Score: Target 7.5/10
• Customer Lifetime Value (CLV): Target 2,500+ EGP

📈 TRACKING IMPLEMENTATION

TRACKING TECHNOLOGIES
• Conversion Pixels: Facebook Pixel, LinkedIn Insight Tag
• Google Analytics 4: Enhanced measurement, conversion tracking
• UTM Parameters: Campaign, source, medium tracking
• CRM Integration: Lead source tracking, attribution modeling
• Call Tracking: Dynamic number insertion, call recording

ATTRIBUTION MODELS
• Last-Click Attribution: Direct response measurement
• First-Click Attribution: Top-of-funnel impact
• Linear Attribution: Equal credit across touchpoints
• Time-Decay Attribution: Recent touchpoints weighted more
• Data-Driven Attribution: Algorithmic multi-touch attribution

📊 DASHBOARD SETUP

REAL-TIME DASHBOARD
• Campaign Spend vs. Budget
• Impression and Click Performance
• Conversion Tracking
• Cost Per Acquisition Trends
• Return on Ad Spend Calculation

WEEKLY PERFORMANCE REPORT
• Campaign Summary (KPI overview)
• Channel Performance Comparison
• Audience Segment Analysis
• Creative Performance Metrics
• Budget Pacing and Efficiency

MONTHLY STRATEGIC REPORT
• Comprehensive ROI Analysis
• Competitive Landscape Review
• Market Trend Analysis
• Budget Optimization Recommendations
• Long-term Strategy Adjustments

🔧 OPTIMIZATION FRAMEWORK

DAILY OPTIMIZATION TASKS
• Budget Pacing Monitoring
• Bid Adjustment Based on Performance
• Underperforming Ad Pausing
• Audience Refinement
• Creative Performance Review

WEEKLY OPTIMIZATION ACTIVITIES
• Performance Analysis Meeting
• Budget Reallocation Decisions
• Creative Testing Analysis
• Audience Expansion/Contraction
• Competitive Response Planning

MONTHLY STRATEGIC REVIEWS
• Comprehensive ROI Analysis
• Market Condition Assessment
• Budget Efficiency Review
• Creative Strategy Refresh
• Long-term Planning Adjustments

⚡ AUTOMATED OPTIMIZATION RULES

BUDGET AUTOMATION
• Auto-pause campaigns exceeding budget by 10%
• Auto-reallocate budget from underperformers to top performers
• Dayparting based on historical performance
• Seasonal budget adjustments

BIDDING AUTOMATION
• Target CPA bidding for conversion campaigns
• Target ROAS bidding for performance campaigns
• Maximize conversions for awareness campaigns
• Enhanced CPC for manual bidding assistance

CREATIVE AUTOMATION
• Auto-pause ads with CTR below 0.5%
• Auto-boost ads with CTR above 3.0%
• Creative refresh based on fatigue metrics
• Automated A/B testing winner selection

📊 PERFORMANCE BENCHMARKS

INDUSTRY STANDARDS
• Average CTR by Industry: ${formData.industry === 'E-commerce' ? '1.5% - 2.5%' :
  formData.industry === 'SaaS' ? '2.0% - 3.5%' :
  formData.industry === 'Healthcare' ? '1.2% - 2.0%' :
  formData.industry === 'Finance' ? '1.8% - 3.0%' :
  formData.industry === 'Education' ? '1.5% - 2.8%' :
  '1.0% - 2.5%'}
• Average CPA by Industry: ${formData.industry === 'E-commerce' ? '200 - 400 EGP' :
  formData.industry === 'SaaS' ? '500 - 1,000 EGP' :
  formData.industry === 'Healthcare' ? '400 - 750 EGP' :
  formData.industry === 'Finance' ? '300 - 600 EGP' :
  formData.industry === 'Education' ? '250 - 500 EGP' :
  '250 - 750 EGP'}
• Average ROAS by Industry: ${formData.industry === 'E-commerce' ? '3.0x - 5.0x' :
  formData.industry === 'SaaS' ? '4.0x - 6.0x' :
  formData.industry === 'Healthcare' ? '2.5x - 4.0x' :
  formData.industry === 'Finance' ? '3.5x - 5.5x' :
  formData.industry === 'Education' ? '2.0x - 4.0x' :
  '2.5x - 4.5x'}

COMPETITIVE BENCHMARKS
• Market Share Analysis
• Competitive Spend Levels
• Share of Voice Metrics
• Creative Performance Comparison
• Audience Overlap Analysis

🎯 SUCCESS CRITERIA

CAMPAIGN SUCCESS METRICS
• ROAS above 3.0x
• CPA below budget threshold
• Conversion rate above industry average
• Brand lift above 15%
• Positive ROI within 90 days

OPTIMIZATION SUCCESS INDICATORS
• Week-over-week performance improvement
• Budget efficiency gains
• Creative performance increases
• Audience targeting refinement
• Cross-channel attribution improvement

📈 REPORTING CADENCE

STAKEHOLDER REPORTING
• Executive Summary: Monthly
• Detailed Performance: Weekly
• Real-time Dashboards: Daily
• Strategic Reviews: Quarterly
• Annual Performance: Yearly`

  }

  const downloadAsPDF = () => {
    const blob = new Blob([generatedPlan], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${activeTab}-media-plan.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const resetForm = () => {
    setFormData({
      campaignName: '',
      industry: '',
      budget: '',
      duration: '',
      targetAudience: '',
      campaignGoal: '',
      geographicTarget: ''
    })
    setGeneratedPlan('')
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

      <Navigation currentPath="/media-buying-plan-tool" />

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
                <Radio className="w-4 h-4" />
                <span className="text-sm font-medium">Media Buying Strategy</span>
              </motion.div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  Media Buying Plan Tool
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                Create comprehensive media buying plans with strategic channel selection, 
                budget allocation, and performance optimization. Maximize your advertising ROI.
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
              <h2 className="text-4xl font-bold mb-4">Media Buying Tools</h2>
              <p className="text-xl text-gray-400">Comprehensive planning for your advertising campaigns</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mediaBuyingSections.map((tool, index) => (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => setActiveTab(tool.id)}
                  className={"bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border cursor-pointer transition-all duration-300 hover:scale-105 " + (
                    activeTab === tool.id 
                      ? 'border-purple-500/50 shadow-lg shadow-purple-500/20' 
                      : 'border-white/10 hover:border-purple-500/30'
                  )}
                >
                  <div className={"w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-r " + tool.color}>
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
                {mediaBuyingSections.find(t => t.id === activeTab)?.title}
              </h2>
              <p className="text-xl text-gray-400">
                {mediaBuyingSections.find(t => t.id === activeTab)?.description}
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
                  Campaign Details
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Campaign Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white placeholder-gray-400"
                      value={formData.campaignName}
                      onChange={(e) => handleInputChange('campaignName', e.target.value)}
                      placeholder="Enter campaign name"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
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
                        Campaign Goal
                      </label>
                      <select
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white appearance-none cursor-pointer"
                        value={formData.campaignGoal}
                        onChange={(e) => handleInputChange('campaignGoal', e.target.value)}
                      >
                        <option value="" className="bg-gray-900">Select goal</option>
                        {campaignGoals.map(option => (
                          <option key={option} value={option} className="bg-gray-900">
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Budget
                      </label>
                      <select
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white appearance-none cursor-pointer"
                        value={formData.budget}
                        onChange={(e) => handleInputChange('budget', e.target.value)}
                      >
                        <option value="" className="bg-gray-900">Select budget</option>
                        {budgetOptions.map(option => (
                          <option key={option} value={option} className="bg-gray-900">
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Duration
                      </label>
                      <select
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white appearance-none cursor-pointer"
                        value={formData.duration}
                        onChange={(e) => handleInputChange('duration', e.target.value)}
                      >
                        <option value="" className="bg-gray-900">Select duration</option>
                        {durationOptions.map(option => (
                          <option key={option} value={option} className="bg-gray-900">
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
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

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Geographic Target
                    </label>
                    <select
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white appearance-none cursor-pointer"
                      value={formData.geographicTarget}
                      onChange={(e) => handleInputChange('geographicTarget', e.target.value)}
                    >
                      <option value="" className="bg-gray-900">Select geographic target</option>
                      {geographicTargets.map(option => (
                        <option key={option} value={option} className="bg-gray-900">
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      onClick={generatePlan}
                      disabled={isGenerating || !formData.campaignName}
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
                          Generate Plan
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
                  Generated Plan
                </h3>
                
                {generatedPlan ? (
                  <div className="space-y-6">
                    <div className="bg-white/10 rounded-lg p-6 border border-white/20 max-h-96 overflow-y-auto">
                      <div className="text-white whitespace-pre-wrap leading-relaxed font-mono text-sm">
                        {generatedPlan}
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
                    <p className="text-gray-400 mb-2">No plan generated yet</p>
                    <p className="text-sm text-gray-500">Fill in the form and click "Generate Plan" to get started</p>
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