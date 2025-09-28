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
  Search,
  BarChart3,
  Eye,
  Share2,
  Award,
  Shield,
  Zap as Bolt,
  Globe,
  MessageSquare,
  ThumbsUp,
  TrendingDown
} from 'lucide-react'

export default function ExternalFactorsEvaluationTool() {
  const [activeTab, setActiveTab] = useState('competitor-overview')
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    mainCompetitors: '',
    targetMarket: '',
    businessGoals: '',
    timeFrame: ''
  })
  const [generatedAnalysis, setGeneratedAnalysis] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [results, setResults] = useState<any>(null)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const analysisSections = [
    {
      id: 'competitor-overview',
      title: 'Competitor Overview',
      description: 'Comprehensive analysis of key competitors in the market',
      icon: Search,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'swot-analysis',
      title: 'SWOT Analysis',
      description: 'Strengths, Weaknesses, Opportunities, and Threats assessment',
      icon: Shield,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'market-positioning',
      title: 'Market Positioning',
      description: 'Analyze your position versus competitors',
      icon: Target,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'competitive-advantage',
      title: 'Competitive Advantage',
      description: 'Identify and develop your competitive edge',
      icon: Award,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'strategic-recommendations',
      title: 'Strategic Recommendations',
      description: 'Strategies to overcome competition',
      icon: Lightbulb,
      color: 'from-yellow-500 to-amber-500'
    },
    {
      id: 'action-plan',
      title: 'Action Plan',
      description: 'Practical steps to achieve competitive advantage',
      icon: Bolt,
      color: 'from-indigo-500 to-purple-500'
    }
  ]

  const industryOptions = [
    { value: 'technology', label: 'Technology' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'retail', label: 'Retail' },
    { value: 'food-beverage', label: 'Food & Beverage' },
    { value: 'real-estate', label: 'Real Estate' },
    { value: 'automotive', label: 'Automotive' },
    { value: 'fashion', label: 'Fashion' },
    { value: 'finance', label: 'Finance' },
    { value: 'travel-tourism', label: 'Travel & Tourism' },
    { value: 'beauty-cosmetics', label: 'Beauty & Cosmetics' },
    { value: 'fitness-wellness', label: 'Fitness & Wellness' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'professional-services', label: 'Professional Services' },
    { value: 'manufacturing', label: 'Manufacturing' }
  ]

  const timeFrameOptions = [
    { value: '3-months', label: '3 Months' },
    { value: '6-months', label: '6 Months' },
    { value: '1-year', label: '1 Year' },
    { value: '2-years', label: '2 Years' },
    { value: '5-years', label: '5 Years' }
  ]

  const generateCompetitorOverview = () => {
    const industryText = industryOptions.find(opt => opt.value === formData.industry)?.label || formData.industry
    
    return `🔍 **Competitor Analysis Overview**

### 📊 **Company Information:**
**Company Name:** ${formData.companyName}
**Industry:** ${industryText}
**Target Market:** ${formData.targetMarket}
**Main Competitors:** ${formData.mainCompetitors}
**Time Frame:** ${formData.timeFrame}

---

### 🎯 **Analysis Objectives:**
**Primary Goal:** ${formData.businessGoals}

**Secondary Objectives:**
• Understand current competitive landscape
• Identify competitor strengths and weaknesses
• Discover market opportunities
• Develop effective competitive strategy
• Achieve sustainable competitive advantage

---

### 📈 **Market Analysis:**

#### **Market Size and Growth:**
• Current Market Size: Medium to Large
• Annual Growth Rate: 10-15%
• Key Trends: Digital, Sustainability, Personalization
• Future Outlook: Continued growth with increased competition

#### **Customer Segments:**
**Primary Segment (60%):**
• Age: 25-45 years
• Income: Medium to High
• Interests: Quality, Innovation, Service
• Behavior: Seeking value for money

**Secondary Segment (30%):**
• Age: 18-24 and 46-60 years
• Income: Varied
• Interests: Price, Convenience, Brand
• Behavior: Price-sensitive and offer-responsive

**Experimental Segment (10%):**
• All ages and income levels
• Interests: Varied
• Behavior: Seeking new experiences

---

### 🏢 **Key Competitors:**

#### **Competitor 1: Market Leader**
**Market Share:** 35-40%
**Strengths:**
• Strong, well-known brand
• Wide distribution network
• Significant financial resources
• Continuous innovation

**Weaknesses:**
• Slow to adapt to changes
• Relatively high prices
• Inconsistent customer service
• Complex bureaucracy

#### **Competitor 2: Emerging Player**
**Market Share:** 20-25%
**Strengths:**
• Competitive pricing
• Flexibility in adaptation
• Customer-focused approach
• Modern technology usage

**Weaknesses:**
• Limited brand awareness
• Limited financial resources
• Less market experience
• Narrow distribution network

#### **Competitor 3: Specialist Competitor**
**Market Share:** 15-20%
**Strengths:**
• High specialization in specific area
• High product quality
• Strong customer loyalty
• Advanced technical expertise

**Weaknesses:**
• Limited product/service range
• High prices
• Limited geographic coverage
• Limited expansion capability

---

### 💡 **Initial Insights:**
1. **Market is growing positively** with opportunities for new entry
2. **Competition is intense** but there are market gaps
3. **Customers value quality** but are price-sensitive
4. **Technology plays an increasing role** in competitive differentiation
5. **Personalized service** can be a competitive advantage

---

#competitor_analysis #strategy #market`
  }

  const generateSWOTAnalysis = () => {
    const industryText = industryOptions.find(opt => opt.value === formData.industry)?.label || formData.industry
    
    return `🛡️ **SWOT Analysis**

### 📊 **Company Information:**
**Company:** ${formData.companyName}
**Industry:** ${industryText}

---

### 💪 **Strengths:**

#### **1. Specialized and Committed Team**
• Extensive experience in ${industryText}
• Passion for innovation and development
• Ability to adapt to changes
• Team spirit and collaboration

#### **2. High-Quality Products/Services**
• Focus on quality and details
• Innovative solutions meeting customer needs
• Unique competitive capabilities
• Flexibility in customization

#### **3. Strong Customer Relationships**
• Excellent customer service
• High customer loyalty
• Effective communication network
• Continuous positive feedback

#### **4. Flexible Organizational Structure**
• Quick decision-making
• Flexibility in adaptation
• Operational efficiency
• Reasonable operating costs

---

### 🔍 **Weaknesses:**

#### **1. Limited Financial Resources**
• Limited capital compared to competitors
• Limited ability for large investments
• Difficulty in rapid expansion
• Dependence on external funding

#### **2. Limited Geographic Reach**
• Focus on specific areas
• Limited distribution network
• Limited brand awareness
• Difficulty reaching new markets

#### **3. Limited Marketing Experience**
• Small marketing team
• Limited marketing budget
• Limited digital marketing experience
• Difficulty building strong brand

#### **4. Dependence on Limited Customers**
• Focus on specific customer segments
• Risk of losing key customers
• Difficulty in customer diversification
• Dependence on specific seasons

---

### 🚀 **Opportunities:**

#### **1. Market Growth**
• Market growing at 10-15% annually
• Increasing demand for ${industryText}
• Emergence of new customer segments
• Potential geographic expansion

#### **2. Technological Development**
• Use of modern technology
• Process automation to reduce costs
• Improved digital customer experience
• Development of innovative products

#### **3. Changes in Consumer Behavior**
• Preference for quality over price
• Increased awareness of ${industryText} importance
• Demand for personalized solutions
• Increased interest in sustainability

#### **4. Strategic Partnerships**
• Collaboration with complementary companies
• Entry into new markets through partnerships
• Leveraging partner expertise
• Risk reduction through partnerships

#### **5. Government Support**
• Incentives for startups
• Support for innovation and development
• Facilitation of government procedures
• Training and technical support programs

---

### ⚠️ **Threats:**

#### **1. Intense Competition**
• Presence of major competitors in market
• Entry of new competitors
• Potential price wars
• Product/service imitation

#### **2. Economic Changes**
• Fluctuations in local economy
• Impact on purchasing power
• Increased operating costs
• Difficulty in financing

#### **3. Rapid Technological Changes**
• Difficulty keeping up with developments
• Costs of technological updating
• Potential technological obsolescence
• Need for continuous training

#### **4. Regulatory Changes**
• New regulations increasing costs
• New licensing requirements
• Operational restrictions
• Complex procedures

#### **5. Changes in Customer Preferences**
• Changes in consumer tastes
• Emergence of new trends
• Increased customer expectations
• Increased price sensitivity

---

### 📈 **Priority Analysis:**

#### **High Priority (Immediate Action Required):**
• Develop effective marketing strategy
• Build relationships with new customers
• Improve operational efficiency

#### **Medium Priority (Within 3-6 Months):**
• Gradual geographic expansion
• Develop new products/services
• Build strategic partnerships

#### **Long-term Priority (Within 1 Year):**
• Increase financial resources
• Large-scale market expansion
• Build strong brand

---

#SWOT_analysis #strengths #weaknesses`
  }

  const generateMarketPositioning = () => {
    const industryText = industryOptions.find(opt => opt.value === formData.industry)?.label || formData.industry
    
    return `🎯 **Market Positioning**

### 📊 **Company Information:**
**Company:** ${formData.companyName}
**Industry:** ${industryText}

---

### 🗺️ **Current Positioning Map:**

#### **Main Positioning Axes:**
**Vertical Axis: Quality vs Price**
**Horizontal Axis: Specialization vs Comprehensiveness**

#### **Current Positioning:**
• **Quality:** Medium to High
• **Price:** Competitive to Average
• **Specialization:** Specialized in specific area
• **Comprehensiveness:** Focused services

---

### 🏢 **Competitor Positioning:**

#### **Competitor 1 (Leader):**
• **Quality:** Very High
• **Price:** Very High
• **Specialization:** Comprehensive
• **Comprehensiveness:** Very High
• **Positioning:** Premium Quality at Premium Price

#### **Competitor 2 (Emerging):**
• **Quality:** Medium
• **Price:** Very Low
• **Specialization:** Specialized
• **Comprehensiveness:** Limited
• **Positioning:** Best Value for Money

#### **Competitor 3 (Specialist):**
• **Quality:** Very High
• **Price:** High
• **Specialization:** Very Specialized
• **Comprehensiveness:** Very Limited
• **Positioning:** Absolute Expertise and Quality

---

### 🎯 **Market Gap Analysis:**

#### **Gap 1: High Quality at Reasonable Price**
• **Size:** Large
• **Target Segments:** Middle Segment
• **Opportunity:** Offer high quality at competitive prices
• **Challenge:** Maintain quality while reducing costs

#### **Gap 2: Personalized Service**
• **Size:** Medium
• **Target Segments:** Premium Segment
• **Opportunity:** Offer fully customized solutions
• **Challenge:** Build specialized customization team

#### **Gap 3: Modern Technology**
• **Size:** Medium to Large
• **Target Segments:** Youth and Companies
• **Opportunity:** Use latest technologies
• **Challenge:** Invest in technical infrastructure

---

### 📈 **Proposed Positioning Strategies:**

#### **Strategy 1: Quality-Based Positioning (Recommended)**
**Slogan:** "The Quality You Deserve at a Price You Can Afford"

**Key Elements:**
• Focus on high quality
• Competitive prices
• Excellent customer service
• Continuous innovation

**Target Audience:**
• Customers who value quality
• Medium to High segments
• Those seeking value for money

**Competitive Advantage:**
• Balance between quality and price
• Exceptional customer service
• Flexibility in customization

#### **Strategy 2: Specialization-Based Positioning**
**Slogan:** "Experts in ${industryText}"

**Key Elements:**
• Deep specialization in the field
• Innovative solutions
• Expert team
• Guaranteed results

**Target Audience:**
• Customers seeking expertise
• Specialized companies
• Those seeking complex solutions

**Competitive Advantage:**
• Unique market expertise
• Highly customized solutions
• Team of specialists

#### **Strategy 3: Technology-Based Positioning**
**Slogan:** "${industryText} with Technical Intelligence"

**Key Elements:**
• Use of latest technologies
• Process automation
• Data analytics
• Excellent digital experience

**Target Audience:**
• Youth and tech companies
• Those seeking modern solutions
• Innovation enthusiasts

**Competitive Advantage:**
• Technical lead over competitors
• High operational efficiency
• Unique customer experience

---

### 🎨 **Proposed Brand Identity:**

#### **Suggested Slogan:**
"${formData.companyName} - Quality That Makes a Difference"

#### **Core Values:**
• Quality: Dedication to offering the best
• Innovation: Continuous search for new solutions
• Customer: Focus on customer satisfaction
• Integrity: Transparency and credibility
• Excellence: Striving for excellence in everything

#### **Brand Personality:**
• Professional but friendly
• Innovative but reliable
• Specialized but flexible
• High quality but reasonable

---

### 📊 **Positioning Success Indicators:**

#### **Awareness Indicators:**
• Brand awareness: 60%+
• Brand recall: 40%+
• Brand-quality association: 70%+

#### **Preference Indicators:**
• Brand preference over competitors: 30%+
• Purchase intent: 25%+
• Brand loyalty: 20%+

#### **Performance Indicators:**
• Market share: 15%+
• Growth rate: 20%+
• Customer satisfaction: 85%+

---

#market_positioning #strategy #branding`
  }

  const generateCompetitiveAdvantage = () => {
    const industryText = industryOptions.find(opt => opt.value === formData.industry)?.label || formData.industry
    
    return `🏆 **Competitive Advantage**

### 📊 **Company Information:**
**Company:** ${formData.companyName}
**Industry:** ${industryText}

---

### 🔍 **Current Competitive Advantage Analysis:**

#### **Current Competitive Features:**
• High product quality
• Competitive prices
• Excellent customer service
• Specialized team
• Flexibility in customization

#### **Current Features Assessment:**
• **Quality:** Strong but can be improved
• **Price:** Good but room for improvement
• **Service:** Excellent and considered a key feature
• **Team:** Strong but needs expansion
• **Flexibility:** Good but can be enhanced

---

### 🎯 **Identifying Sustainable Competitive Advantage:**

#### **Proposed Competitive Advantage: "Innovative Quality with Personal Service"**

#### **Core Elements:**

**1. Innovative Quality (50%):**
• Innovative and unique products/services
• Use of latest technologies
• Continuous research and development
• Customized solutions for each customer

**2. Personal Service (30%):**
• Exceptional customer service
• Personal communication with each customer
• Specially designed solutions
• Continuous follow-up after sale

**3. Value for Money (20%):**
• Competitive prices
• Added value for customers
• Special offers and discounts
• Quality and satisfaction guarantee

---

### 🛠️ **Developing Competitive Advantage:**

#### **Phase 1: Building Foundation (3 Months)**

**Developing Innovative Quality:**
• Invest in research and development
• Hire innovation team
• Develop new products/services
• Improve current quality

**Developing Personal Service:**
• Train service team
• Develop customer service system
• Create multiple communication channels
• Develop loyalty programs

**Developing Value for Money:**
• Analyze operational costs
• Improve operational efficiency
• Develop competitive offers
• Create discount programs

#### **Phase 2: Enhancing Advantage (6 Months)**

**Enhancing Innovative Quality:**
• Launch new products/services
• Obtain quality certifications
• Build technical partnerships
• Develop patents

**Enhancing Personal Service:**
• Expand service team
• Develop follow-up systems
• Create training programs
• Develop performance metrics

**Enhancing Value for Money:**
• Improve profit margins
• Develop special offers
• Create advanced loyalty programs
• Improve marketing efficiency

#### **Phase 3: Maintaining Advantage (Ongoing)**

**Maintaining Innovative Quality:**
• Continuous research and development
• Monitor technological developments
• Continuously improve products/services
• Sense customer needs

**Maintaining Personal Service:**
• Continuous team training
• Update service systems
• Monitor customer satisfaction
• Develop new solutions

**Maintaining Value for Money:**
• Continuous price monitoring
• Improve operational efficiency
• Develop new offers
• Analyze competition

---

### 🛡️ **Protecting Competitive Advantage:**

#### **Legal Protection:**
• Patent registration
• Brand protection
• Confidentiality agreements
• Intellectual property protection

#### **Operational Protection:**
• Build strong customer relationships
• Develop innovative company culture
• Invest in research and development
• Build strong distribution network

#### **Marketing Protection:**
• Build strong brand
• Develop effective public relations
• Create distinctive marketing content
• Build excellent reputation

---

### 📊 **Measuring Competitive Advantage:**

#### **Quality Indicators:**
• Customer satisfaction with quality: 90%+
• Return rate: 5%-
• Complaint rate: 1%-
• Product ratings: 4.5/5+

#### **Service Indicators:**
• Customer satisfaction with service: 95%+
• Response time: Less than hour
• First-time problem resolution: 80%+
• Service rating: 4.8/5+

#### **Value Indicators:**
• Customer acquisition cost: $50-150
• Customer value: $300-900
• Customer retention rate: 40-60%
• Return on investment: 200-400%

---

#competitive_advantage #strategy #innovation`
  }

  const generateStrategicRecommendations = () => {
    const industryText = industryOptions.find(opt => opt.value === formData.industry)?.label || formData.industry
    
    return `💡 **Strategic Recommendations**

### 📊 **Company Information:**
**Company:** ${formData.companyName}
**Industry:** ${industryText}

---

### 🎯 **Core Strategic Recommendations:**

#### **1. Market Differentiation Strategy**
**Objective:** Establish unique market position
**Actions:**
• Develop unique value proposition
• Focus on quality and innovation
• Build strong brand identity
• Create distinctive customer experience

**Expected Results:**
• Increased brand awareness by 40%
• Improved customer loyalty by 30%
• Higher profit margins by 15%
• Sustainable competitive advantage

#### **2. Digital Transformation Strategy**
**Objective:** Leverage technology for competitive advantage
**Actions:**
• Implement modern technology solutions
• Develop digital customer experience
• Automate business processes
• Use data analytics for decision making

**Expected Results:**
• Operational efficiency improvement by 25%
• Customer satisfaction increase by 35%
• Cost reduction by 20%
• Faster decision making

#### **3. Customer-Centric Strategy**
**Objective:** Build long-term customer relationships
**Actions:**
• Implement customer relationship management
• Develop personalized services
• Create loyalty programs
• Focus on customer experience

**Expected Results:**
• Customer retention rate increase by 40%
• Customer lifetime value growth by 50%
• Referral business increase by 25%
• Brand advocacy improvement

---

### 🚀 **Growth Strategy Recommendations:**

#### **Market Penetration**
**Objective:** Increase market share in existing markets
**Tactics:**
• Aggressive marketing campaigns
• Competitive pricing strategies
• Improve product quality
• Enhance customer service

**Timeline:** 6-12 months
**Investment:** Medium-High
**Expected ROI:** 150-200%

#### **Market Development**
**Objective:** Enter new geographic or demographic markets
**Tactics:**
• Market research and analysis
• Adapt products for new markets
• Develop distribution channels
• Localized marketing strategies

**Timeline:** 12-18 months
**Investment:** High
**Expected ROI:** 200-300%

#### **Product Development**
**Objective:** Introduce new products/services
**Tactics:**
• Research and development investment
• Customer needs analysis
• Prototype testing
• Phased product launch

**Timeline:** 12-24 months
**Investment:** Very High
**Expected ROI:** 250-400%

#### **Diversification**
**Objective:** Enter new markets with new products
**Tactics:**
• Strategic partnerships
• Acquisitions or mergers
• Joint ventures
• Organic growth initiatives

**Timeline:** 24-36 months
**Investment:** Very High
**Expected ROI:** 300-500%

---

### 🛡️ **Risk Management Recommendations:**

#### **Competitive Risk Management**
**Strategies:**
• Continuous competitor monitoring
• Innovation pipeline development
• Brand strength building
• Customer loyalty programs

**Monitoring Metrics:**
• Market share changes
• Competitor activities
• Customer satisfaction
• Brand health metrics

#### **Market Risk Management**
**Strategies:**
• Market diversification
• Flexible business model
• Scenario planning
• Early warning systems

**Monitoring Metrics:**
• Market growth rates
• Customer behavior changes
• Economic indicators
• Industry trends

#### **Operational Risk Management**
**Strategies:**
• Process optimization
• Quality control systems
• Supply chain resilience
• Talent retention programs

**Monitoring Metrics:**
• Operational efficiency
• Quality metrics
• Employee satisfaction
• Supply chain performance

---

### 📈 **Implementation Roadmap:**

#### **Phase 1: Foundation Building (Months 1-3)**
**Key Activities:**
• Strategic planning finalization
• Team structure optimization
• Technology infrastructure setup
• Initial market research

**Milestones:**
• Completed strategic plan
• Optimized team structure
• Technology systems operational
• Market research report

#### **Phase 2: Strategy Implementation (Months 4-9)**
**Key Activities:**
• Marketing campaign launch
• Product/service improvements
• Customer experience enhancement
• Process optimization

**Milestones:**
• 20% market share increase
• Customer satisfaction 85%+
• Operational efficiency 25% improvement
• Brand awareness 40% increase

#### **Phase 3: Growth Acceleration (Months 10-18)**
**Key Activities:**
• New market entry
• Product launches
• Strategic partnerships
• Scale operations

**Milestones:**
• Market entry in 2 new regions
• 2 new product launches
• 3 strategic partnerships
• 50% revenue growth

#### **Phase 4: Optimization & Expansion (Months 19-36)**
**Key Activities:**
• Performance optimization
• Further market expansion
• Diversification initiatives
• Sustained innovation

**Milestones:**
• Market leadership position
• 100% revenue growth
• Diversified revenue streams
• Industry recognition

---

### 💰 **Resource Allocation Recommendations:**

#### **Financial Resources**
**Marketing & Sales:** 35%
• Digital marketing campaigns
• Sales team expansion
• Brand building activities
• Customer acquisition

**Product Development:** 25%
• Research & development
• Product innovation
• Quality improvement
• Technology upgrades

**Operations:** 20%
• Process optimization
• Quality control
• Supply chain management
• Operational efficiency

**Human Resources:** 15%
• Talent acquisition
• Training & development
• Employee retention
• Organizational development

**Strategic Initiatives:** 5%
• Market research
• Strategic consulting
• Partnerships development
• Risk management

#### **Human Resources**
**Key Hires:**
• Marketing Director
• Product Development Manager
• Customer Experience Manager
• Data Analyst
• Business Development Manager

**Training Focus:**
• Digital marketing skills
• Customer service excellence
• Product knowledge
• Data analysis
• Strategic thinking

---

### 📊 **Success Metrics & KPIs:**

#### **Financial Metrics**
• Revenue Growth: 25% annually
• Profit Margin: 20%+
• Customer Acquisition Cost: < $100
• Customer Lifetime Value: > $500
• Return on Investment: 200%+

#### **Customer Metrics**
• Customer Satisfaction: 90%+
• Net Promoter Score: 50+
• Customer Retention Rate: 80%+
• Customer Lifetime Value: $500+
• Brand Awareness: 60%+

#### **Operational Metrics**
• Operational Efficiency: 30% improvement
• Quality Metrics: 95%+
• Employee Satisfaction: 85%+
• Innovation Rate: 4 new products/year
• Market Share: 25%+

#### **Strategic Metrics**
• Competitive Position: Top 3
• Brand Strength: Strong
• Market Growth: 20%+
• Innovation Index: High
• Sustainability Score: Excellent

---

#strategic_recommendations #growth_strategy #competitive_advantage`
  }

  const generateActionPlan = () => {
    const industryText = industryOptions.find(opt => opt.value === formData.industry)?.label || formData.industry
    const timeFrameText = timeFrameOptions.find(opt => opt.value === formData.timeFrame)?.label || formData.timeFrame
    
    return `⚡ **Action Plan**

### 📊 **Company Information:**
**Company:** ${formData.companyName}
**Industry:** ${industryText}
**Time Frame:** ${timeFrameText}

---

### 🎯 **90-Day Immediate Action Plan**

#### **Month 1: Foundation & Assessment**
**Week 1-2: Strategic Assessment**
• Conduct comprehensive market analysis
• Evaluate current competitive position
• Identify key strengths and weaknesses
• Set specific, measurable objectives

**Deliverables:**
• Market analysis report
• Competitive position assessment
• SWOT analysis document
• Objective setting framework

**Week 3-4: Team & Resource Planning**
• Assess current team capabilities
• Identify skill gaps and hiring needs
• Allocate budget and resources
• Establish project management framework

**Deliverables:**
• Team capability assessment
• Hiring plan and job descriptions
• Budget allocation document
• Project management system setup

#### **Month 2: Strategy Development**
**Week 5-6: Core Strategy Development**
• Develop unique value proposition
• Create positioning strategy
• Design customer experience blueprint
• Establish brand identity guidelines

**Deliverables:**
• Value proposition statement
• Positioning strategy document
• Customer experience map
• Brand identity guidelines

**Week 7-8: Tactical Planning**
• Develop marketing and sales tactics
• Create product development roadmap
• Design operational improvement plans
• Establish risk management framework

**Deliverables:**
• Marketing tactical plan
• Product development roadmap
• Operational improvement plan
• Risk management framework

#### **Month 3: Implementation Launch**
**Week 9-10: Initial Implementation**
• Launch initial marketing campaigns
• Begin product improvements
• Implement customer experience enhancements
• Start process optimization initiatives

**Deliverables:**
• Marketing campaign performance report
• Product improvement status report
• Customer experience enhancement report
• Process optimization metrics

**Week 11-12: Review & Adjustment**
• Measure initial results and KPIs
• Gather stakeholder feedback
• Adjust strategies based on results
• Plan for next 90 days

**Deliverables:**
• Performance measurement report
• Stakeholder feedback summary
• Strategy adjustment document
• Next 90-day plan

---

### 📈 **6-Month Strategic Implementation Plan**

#### **Months 1-2: Market Positioning**
**Key Initiatives:**
• Establish brand positioning
• Launch awareness campaigns
• Develop initial customer base
• Set up operational foundation

**Success Metrics:**
• Brand awareness: 25%+
• Customer acquisition: 50+ customers
• Operational setup: 100% complete
• Market feedback: Positive

#### **Months 3-4: Growth Acceleration**
**Key Initiatives:**
• Scale marketing efforts
• Expand product offerings
• Improve customer experience
• Optimize operational efficiency

**Success Metrics:**
• Revenue growth: 40%+
• Customer satisfaction: 80%+
• Operational efficiency: 20% improvement
• Product expansion: 2+ new offerings

#### **Months 5-6: Market Expansion**
**Key Initiatives:**
• Enter new market segments
• Develop strategic partnerships
• Enhance competitive advantages
• Build sustainable growth model

**Success Metrics:**
• Market expansion: 2+ new segments
• Strategic partnerships: 3+ agreements
• Competitive position: Top 5
• Sustainable growth: 30%+ CAGR

---

### 🚀 **12-Month Comprehensive Growth Plan**

#### **Quarter 1: Foundation Building**
**Focus Areas:**
• Market research and analysis
• Team development and training
• Technology infrastructure setup
• Initial brand building

**Key Activities:**
• Complete market analysis
• Hire key team members
• Implement core systems
• Launch brand awareness campaign

**Expected Outcomes:**
• Clear market understanding
• Strong team foundation
• Efficient operational systems
• Initial brand recognition

#### **Quarter 2: Market Penetration**
**Focus Areas:**
• Aggressive customer acquisition
• Product/service optimization
• Customer experience enhancement
• Operational efficiency improvement

**Key Activities:**
• Scale marketing campaigns
• Refine product offerings
• Implement customer feedback systems
• Optimize business processes

**Expected Outcomes:**
• Significant customer growth
• Improved product-market fit
• High customer satisfaction
• Efficient operations

#### **Quarter 3: Growth Acceleration**
**Focus Areas:**
• Market expansion
• Product development
• Strategic partnerships
• Brand strengthening

**Key Activities:**
• Enter new geographic markets
• Launch new products/services
• Form strategic alliances
• Enhance brand positioning

**Expected Outcomes:**
• Expanded market presence
• Diversified revenue streams
• Strong partnership network
• Enhanced brand equity

#### **Quarter 4: Optimization & Scaling**
**Focus Areas:**
• Performance optimization
• Scalable growth model
• Sustainable competitive advantage
• Long-term strategic planning

**Key Activities:**
• Optimize all business areas
• Develop scalable processes
• Strengthen competitive advantages
• Plan long-term strategy

**Expected Outcomes:**
• Optimized business performance
• Scalable growth model
• Sustainable competitive position
• Clear long-term vision

---

### 🎯 **Specific Action Items by Department**

#### **Marketing & Sales**
**Month 1:**
• Develop marketing strategy
• Create brand assets
• Set up analytics tools
• Plan launch campaign

**Month 2-3:**
• Execute launch campaign
• Generate initial leads
• Build sales pipeline
• Establish customer acquisition process

**Month 4-6:**
• Scale marketing efforts
• Optimize conversion rates
• Expand sales channels
• Build customer retention program

**Month 7-12:**
• Diversify marketing channels
• Develop strategic partnerships
• Enhance brand positioning
• Build sustainable growth model

#### **Product Development**
**Month 1:**
• Assess current products
• Identify improvement opportunities
• Plan development roadmap
• Set up quality systems

**Month 2-3:**
• Implement product improvements
• Develop new features
• Test with customer feedback
• Launch product updates

**Month 4-6:**
• Develop new products
• Conduct market testing
• Refine based on feedback
• Prepare for launch

**Month 7-12:**
• Launch new products
• Continuously improve offerings
• Innovate based on market needs
• Establish product leadership

#### **Operations**
**Month 1:**
• Assess current processes
• Identify efficiency opportunities
• Plan process improvements
• Set up monitoring systems

**Month 2-3:**
• Implement process improvements
• Optimize resource allocation
• Establish quality controls
• Improve operational efficiency

**Month 4-6:**
• Scale operations efficiently
• Implement automation
• Enhance supply chain
• Optimize cost structure

**Month 7-12:**
• Achieve operational excellence
• Implement advanced automation
• Build resilient operations
• Optimize for scalability

#### **Human Resources**
**Month 1:**
• Assess team capabilities
• Identify hiring needs
• Develop job descriptions
• Plan training programs

**Month 2-3:**
• Hire key personnel
• Implement training programs
• Establish performance metrics
• Build team culture

**Month 4-6:**
• Expand team as needed
• Enhance skills development
• Improve retention programs
• Strengthen leadership

**Month 7-12:**
• Optimize team structure
• Develop leadership pipeline
• Enhance organizational culture
• Build long-term capabilities

---

### 📊 **Monitoring & Evaluation Framework**

#### **Weekly Monitoring**
**Key Metrics:**
• Lead generation and conversion
• Customer acquisition cost
• Website traffic and engagement
• Social media performance
• Sales pipeline health

**Review Meetings:**
• Weekly team stand-ups
• Marketing performance review
• Sales pipeline review
• Operational efficiency check

#### **Monthly Evaluation**
**Key Metrics:**
• Revenue and profit growth
• Customer satisfaction scores
• Market share changes
• Operational efficiency
• Team performance

**Review Activities:**
• Monthly business review
• Financial performance analysis
• Customer feedback analysis
• Strategic progress assessment

#### **Quarterly Strategic Review**
**Key Metrics:**
• Strategic objective achievement
• Competitive position changes
• Market growth and expansion
• Team and organizational development
• Risk and opportunity assessment

**Review Activities:**
• Quarterly strategic planning
• Competitive analysis update
• Market trend assessment
• Resource allocation review
• Strategy adjustment planning

---

### 💰 **Investment & Resource Requirements**

#### **Financial Investment**
**Phase 1 (Months 1-3):** $50,000-100,000
• Market research and analysis
• Team hiring and training
• Technology infrastructure
• Initial marketing campaigns

**Phase 2 (Months 4-6):** $100,000-200,000
• Marketing and sales expansion
• Product development
• Operational improvements
• Customer experience enhancement

**Phase 3 (Months 7-12):** $200,000-500,000
• Market expansion
• Strategic partnerships
• Advanced technology implementation
• Team and capability building

#### **Human Resources**
**Key Hires by Phase:**
**Phase 1:** Marketing Manager, Operations Manager
**Phase 2:** Sales Manager, Product Developer
**Phase 3:** Business Development Manager, Customer Experience Manager

**Team Growth:**
• Start: 3-5 core team members
• Month 3: 8-10 team members
• Month 6: 15-20 team members
• Month 12: 25-30 team members

---

### 🎯 **Success Criteria & Milestones**

#### **Success Criteria**
**Financial Success:**
• Achieve profitability within 12 months
• Maintain 20%+ profit margins
• Achieve 200%+ ROI on investments

**Market Success:**
• Establish top 5 market position
• Achieve 25%+ market share
• Build strong brand recognition

**Customer Success:**
• Maintain 90%+ customer satisfaction
• Achieve 80%+ customer retention
• Build strong customer advocacy

**Operational Success:**
• Achieve 30%+ operational efficiency
• Build scalable business processes
• Develop strong organizational capabilities

#### **Key Milestones**
**Month 3:**
• Complete foundation setup
• Acquire first 50 customers
• Achieve initial revenue targets
• Establish market presence

**Month 6:**
• Achieve break-even point
• Establish strong market position
• Build efficient operations
• Develop growth momentum

**Month 9:**
• Achieve profitability
• Expand market presence
• Build strong team
• Establish competitive advantages

**Month 12:**
• Achieve market leadership position
• Build sustainable growth model
• Establish strong brand
• Develop long-term strategy

---

#action_plan #implementation #strategy_execution`
  }

  const handleGenerateAnalysis = () => {
    setIsGenerating(true)
    setGeneratedAnalysis('')

    setTimeout(() => {
      let analysis = ''
      
      switch (activeTab) {
        case 'competitor-overview':
          analysis = generateCompetitorOverview()
          break
        case 'swot-analysis':
          analysis = generateSWOTAnalysis()
          break
        case 'market-positioning':
          analysis = generateMarketPositioning()
          break
        case 'competitive-advantage':
          analysis = generateCompetitiveAdvantage()
          break
        case 'strategic-recommendations':
          analysis = generateStrategicRecommendations()
          break
        case 'action-plan':
          analysis = generateActionPlan()
          break
        default:
          analysis = 'Please select a valid analysis section.'
      }

      setGeneratedAnalysis(analysis)
      
      // Create results object for EnhancedResultsDisplay
      const newResults = {
        content: analysis,
        title: analysisSections.find(s => s.id === activeTab)?.title || 'External Factors Analysis',
        metrics: [],
        recommendations: [],
        score: 85
      }
      setResults(newResults)
      
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <Navigation currentPath="/external-factors-evaluation-tool" />
      
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              External Factors Evaluation Tools
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive analysis of external factors affecting your business including competitors, 
              market conditions, and strategic positioning to develop effective competitive strategies.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Input Form */}
          <div className="lg:col-span-1">
            <Card className="bg-black/50 border-purple-500/20 backdrop-blur-lg">
              <CardHeader>
                <CardTitle className="text-purple-400 flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Business Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <FlexibleInput
                  label="Company Name"
                  type="text"
                  value={formData.companyName}
                  onChange={(value) => handleInputChange('companyName', value)}
                  options={['Acme Corp', 'Tech Solutions', 'Global Industries', 'Innovation Labs', 'Future Systems']}
                  placeholder="Enter your company name"
                  language="en"
                  required={true}
                />

                <FlexibleInput
                  label="Industry"
                  type="select"
                  value={formData.industry}
                  onChange={(value) => handleInputChange('industry', value)}
                  options={industryOptions.map(opt => opt.value)}
                  placeholder="Select Industry"
                  language="en"
                  required={true}
                />

                <FlexibleInput
                  label="Main Competitors"
                  type="text"
                  value={formData.mainCompetitors}
                  onChange={(value) => handleInputChange('mainCompetitors', value)}
                  options={['Competitor A, Competitor B', 'Market Leader, Challenger', 'Direct, Indirect competitors']}
                  placeholder="List your main competitors"
                  language="en"
                />

                <FlexibleInput
                  label="Target Market"
                  type="text"
                  value={formData.targetMarket}
                  onChange={(value) => handleInputChange('targetMarket', value)}
                  options={['Young professionals', 'Businesses, B2B', 'Local customers, National reach']}
                  placeholder="Describe your target market"
                  language="en"
                />

                <FlexibleInput
                  label="Business Goals"
                  type="textarea"
                  value={formData.businessGoals}
                  onChange={(value) => handleInputChange('businessGoals', value)}
                  options={['Increase market share', 'Improve profitability', 'Expand to new markets']}
                  placeholder="Describe your primary business goals"
                  language="en"
                />

                <FlexibleInput
                  label="Time Frame"
                  type="select"
                  value={formData.timeFrame}
                  onChange={(value) => handleInputChange('timeFrame', value)}
                  options={timeFrameOptions.map(opt => opt.value)}
                  placeholder="Select Time Frame"
                  language="en"
                />

                <Button
                  onClick={handleGenerateAnalysis}
                  disabled={isGenerating || !formData.companyName || !formData.industry}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-3"
                >
                  {isGenerating ? (
                    <div className="flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Generating Analysis...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      Generate Analysis
                    </div>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Analysis Sections and Output */}
          <div className="lg:col-span-2 space-y-6">
            {/* Analysis Sections */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {analysisSections.map((section) => (
                <Card
                  key={section.id}
                  className={`bg-black/50 border backdrop-blur-lg cursor-pointer transition-all duration-300 ${
                    activeTab === section.id
                      ? 'border-purple-500/50 shadow-lg shadow-purple-500/20'
                      : 'border-purple-500/20 hover:border-purple-500/30'
                  }`}
                  onClick={() => setActiveTab(section.id)}
                >
                  <CardContent className="p-4 text-center">
                    <div className={`w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-r ${section.color} flex items-center justify-center`}>
                      <section.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-white mb-1">{section.title}</h3>
                    <p className="text-xs text-gray-400">{section.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Output - Only show when results exist */}
            {results && (
              <EnhancedResultsDisplay
                results={results}
                onReset={() => {
                  setResults(null)
                  setFormData({
                    companyName: '',
                    industry: '',
                    mainCompetitors: '',
                    targetMarket: '',
                    businessGoals: '',
                    timeFrame: ''
                  })
                }}
                exportData={{
                  content: results.content,
                  format: 'txt',
                  filename: `${activeTab}-analysis.txt`
                }}
                language="en"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}