'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import { 
  Award, 
  TrendingUp, 
  Users, 
  Target, 
  CheckCircle, 
  Star,
  BarChart3,
  Zap,
  Rocket,
  Lightbulb,
  Shield,
  Globe,
  Calendar,
  Clock,
  DollarSign,
  MessageSquare,
  Download,
  Play,
  ArrowRight,
  Eye,
  ShoppingCart,
  Store,
  Building,
  Heart,
  TrendingUp as TrendingUpIcon,
  UserCheck,
  ArrowUpRight,
  ArrowDownRight,
  PieChart,
  Activity,
  Users2,
  Medal,
  Target as TargetIcon,
  Sparkles,
  TrendingUp as TrendIcon
} from 'lucide-react'

export default function CaseStudies() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const navigateToContact = () => {
    if (window.location.pathname === '/') {
      scrollToSection('contact')
    } else {
      window.location.href = '/#contact'
    }
  }

  const navigateToROI = () => {
    window.location.href = '/roi-calculator'
  }
  const caseStudies = [
    {
      id: 1,
      title: 'Pharmacy Weight Gain Products',
      client: 'Dr. Remon Moner Pharmacy',
      category: 'E-commerce',
      industry: 'Healthcare',
      duration: '3 months',
      budget: 'EGP 45,000',
      adSpend: 'EGP 45,000',
      results: {
        roas: '11.1x',
        revenue: 'EGP 500,000',
        leads: '1,200+',
        ctr: '4.2%',
        cpa: 'EGP 37.5',
        impressions: '2.4M',
        reach: '850K'
      },
      challenge: 'Dr. Remon Moner Pharmacy needed to increase sales of their weight gain products through Facebook advertising while maintaining a positive brand image in the healthcare sector. The client faced challenges with ad fatigue, high competition, and the need to educate customers about product benefits.',
      solution: 'Implemented a comprehensive Facebook Ads strategy focusing on educational content, customer testimonials, and targeted advertising to health-conscious audiences. The campaign used a multi-funnel approach with different ad objectives for each stage of the customer journey.',
      strategy: [
        'Created educational ad content about weight gain solutions',
        'Utilized customer testimonials for social proof',
        'Targeted health and fitness enthusiasts aged 25-45',
        'Implemented retargeting campaigns for website visitors',
        'A/B tested ad creatives and copy continuously',
        'Optimized for conversions and ROI',
        'Used lookalike audiences based on existing customers',
        'Implemented dynamic product ads for e-commerce integration'
      ],
      targetAudience: [
        'Age: 25-45 years old',
        'Gender: Male and Female',
        'Location: Major Egyptian cities',
        'Interests: Fitness, bodybuilding, health supplements',
        'Behavior: Engaged with fitness content, health-conscious',
        'Income: Middle to high income brackets'
      ],
      adCreatives: [
        'Video testimonials from satisfied customers',
        'Before/after transformation photos',
        'Educational content about weight gain',
        'Product showcase with benefits',
        'Limited-time offer promotions',
        'Carousel ads showcasing multiple products'
      ],
      resultsDetails: [
        'Achieved 11.1x ROAS within 3 months',
        'Generated EGP 500,000 in revenue',
        'Acquired 1,200+ qualified leads',
        'Maintained 4.2% average CTR',
        'Reduced cost per acquisition to EGP 37.5',
        'Increased brand awareness in healthcare sector',
        'Reached 2.4M impressions with 850K unique users',
        'Achieved 35% conversion rate from leads to customers'
      ],
      keyMetrics: [
        { metric: 'Total Ad Spend', value: 'EGP 45,000', change: '+0%', icon: DollarSign },
        { metric: 'Revenue Generated', value: 'EGP 500,000', change: '+850%', icon: TrendingUp },
        { metric: 'ROAS', value: '11.1x', change: '+120%', icon: TargetIcon },
        { metric: 'Cost Per Lead', value: 'EGP 37.5', change: '-45%', icon: ArrowDownRight },
        { metric: 'Conversion Rate', value: '35%', change: '+180%', icon: Activity },
        { metric: 'Return on Investment', value: '1011%', change: '+911%', icon: Medal }
      ],
      testimonial: {
        name: 'Dr. Remon Moner',
        position: 'Pharmacy Owner',
        text: 'Michael helped us achieve 11.1x ROAS in just 3 months. His expertise in Facebook ads is unmatched! The campaign completely transformed our online presence and sales.',
        rating: 5
      },
      lessonsLearned: [
        'Educational content performs better in healthcare sector',
        'Customer testimonials significantly increase conversion rates',
        'Retargeting is crucial for high-consideration products',
        'Lookalike audiences outperform interest-based targeting',
        'Video content has 3x higher engagement than static images'
      ],
      colorScheme: 'from-purple-500 to-pink-500'
    },
    {
      id: 2,
      title: 'E-commerce Fashion Brand',
      client: 'Egypt Market Focus',
      category: 'E-commerce',
      industry: 'Fashion & Apparel',
      duration: '6 months',
      budget: 'EGP 120,000',
      adSpend: 'EGP 120,000',
      results: {
        roas: '8.5x',
        revenue: 'EGP 1,020,000',
        orders: '3,400+',
        ctr: '3.8%',
        cpa: 'EGP 35.3',
        impressions: '5.2M',
        reach: '1.8M'
      },
      challenge: 'An emerging Egyptian fashion brand needed to establish its online presence and drive sales through Facebook and Instagram advertising in a competitive market. The client struggled with brand awareness, low website traffic, and poor conversion rates.',
      solution: 'Developed a multi-platform social media strategy focusing on brand building, influencer partnerships, and conversion-optimized advertising campaigns. The strategy included both brand awareness and direct response objectives.',
      strategy: [
        'Built brand awareness through Instagram Reels and Stories',
        'Partnered with 15+ micro-influencers in fashion niche',
        'Created lookbook-style ad creatives showcasing products',
        'Implemented dynamic product ads for catalog sales',
        'Optimized for mobile conversions with fast-loading pages',
        'Used advanced audience targeting including custom audiences',
        'Implemented UTM tracking for proper attribution',
        'Created seasonal campaigns for key shopping periods'
      ],
      targetAudience: [
        'Age: 18-35 years old',
        'Gender: Primarily female (75%)',
        'Location: Urban areas in Egypt',
        'Interests: Fashion, beauty, lifestyle, shopping',
        'Behavior: Active on Instagram, fashion-conscious',
        'Income: Middle to upper-middle class'
      ],
      adCreatives: [
        'Instagram Reels showing outfit styling',
        'Influencer collaboration content',
        'Product carousel ads with multiple items',
        'Seasonal collection showcases',
        'Limited-time discount promotions',
        'User-generated content featuring customers'
      ],
      resultsDetails: [
        'Achieved 8.5x ROAS over 6 months',
        'Generated EGP 1,020,000 in revenue',
        'Processed 3,400+ orders',
        'Maintained 3.8% average CTR',
        'Grew Instagram following by 15,000+',
        'Established strong brand presence in Egyptian market',
        'Achieved 4.2% average conversion rate',
        'Reduced cost per acquisition to EGP 35.3'
      ],
      keyMetrics: [
        { metric: 'Total Ad Spend', value: 'EGP 120,000', change: '+0%', icon: DollarSign },
        { metric: 'Revenue Generated', value: 'EGP 1,020,000', change: '+750%', icon: TrendingUp },
        { metric: 'ROAS', value: '8.5x', change: '+240%', icon: TargetIcon },
        { metric: 'Cost Per Acquisition', value: 'EGP 35.3', change: '-62%', icon: ArrowDownRight },
        { metric: 'Conversion Rate', value: '4.2%', change: '+320%', icon: Activity },
        { metric: 'Instagram Growth', value: '15K+', change: '+300%', icon: Users2 }
      ],
      testimonial: {
        name: 'Sara Ahmed',
        position: 'Marketing Director',
        text: 'Working with Michael transformed our digital marketing strategy. We saw a 300% increase in qualified leads and established our brand as a key player in the Egyptian fashion market.',
        rating: 5
      },
      lessonsLearned: [
        'Instagram Reels drive highest engagement for fashion',
        'Micro-influencers provide better ROI than macro-influencers',
        'User-generated content builds trust and authenticity',
        'Mobile optimization is critical for fashion e-commerce',
        'Seasonal campaigns significantly boost sales during peak periods'
      ],
      colorScheme: 'from-blue-500 to-cyan-500'
    },
    {
      id: 3,
      title: 'Local Service Business',
      client: 'Lead Generation Campaign',
      category: 'Lead Generation',
      industry: 'Home Services',
      duration: '4 months',
      budget: 'EGP 35,000',
      adSpend: 'EGP 35,000',
      results: {
        roas: 'N/A',
        leads: '450+',
        costPerLead: 'EGP 78',
        conversionRate: '22%',
        ctr: '5.1%',
        impressions: '1.8M',
        reach: '620K'
      },
      challenge: 'A local home service business struggled to generate quality leads at a reasonable cost, with previous campaigns resulting in high costs and low conversion rates. The client needed to increase their customer base while maintaining profitability in a competitive local market.',
      solution: 'Implemented a hyper-local Facebook advertising strategy focusing on specific service areas, compelling offers, and lead qualification processes. The campaign used geographic targeting and compelling lead magnets to attract high-quality leads.',
      strategy: [
        'Targeted specific geographic areas within service radius',
        'Created compelling lead generation offers and discounts',
        'Implemented multi-step lead qualification forms',
        'Used hyper-local audience targeting by neighborhood',
        'Optimized ad scheduling for peak business hours',
        'Implemented conversion tracking and lead scoring',
        'Used local landmarks and references in ad copy',
        'Created urgency with limited-time offers'
      ],
      targetAudience: [
        'Age: 28-65 years old',
        'Gender: Male and Female homeowners',
        'Location: Specific neighborhoods in Cairo',
        'Interests: Home improvement, property maintenance',
        'Behavior: Recently searched for home services',
        'Income: Homeowners with property value indicators'
      ],
      adCreatives: [
        'Before/after service transformation photos',
        'Local customer testimonial videos',
        'Limited-time discount promotions',
        'Service area maps highlighting coverage',
        'Professional team showcase',
        'Emergency service availability highlights'
      ],
      resultsDetails: [
        'Generated 450+ qualified leads',
        'Reduced cost per lead to EGP 78',
        'Achieved 22% lead-to-customer conversion rate',
        '60% reduction in lead generation costs',
        'Improved service area coverage by 40%',
        'Increased customer acquisition rate',
        'Achieved 5.1% CTR - above industry average',
        'Maintained consistent lead flow throughout campaign'
      ],
      keyMetrics: [
        { metric: 'Total Ad Spend', value: 'EGP 35,000', change: '+0%', icon: DollarSign },
        { metric: 'Leads Generated', value: '450+', change: '+280%', icon: Users },
        { metric: 'Cost Per Lead', value: 'EGP 78', change: '-60%', icon: ArrowDownRight },
        { metric: 'Conversion Rate', value: '22%', change: '+175%', icon: Activity },
        { metric: 'Customer Acquisition', value: '99', change: '+220%', icon: UserCheck },
        { metric: 'Service Area Growth', value: '40%', change: '+40%', icon: Building }
      ],
      testimonial: {
        name: 'Karim Ali',
        position: 'Business Owner',
        text: 'Michael\'s data-driven approach helped us scale our customer base significantly. The hyper-local targeting strategy was exactly what we needed to grow our home service business.',
        rating: 5
      },
      lessonsLearned: [
        'Hyper-local targeting significantly improves lead quality',
        'Lead qualification forms reduce wasted ad spend',
        'Customer testimonials build trust for local services',
        'Ad scheduling impacts lead quality and conversion rates',
        'Geographic targeting should align with service capabilities'
      ],
      colorScheme: 'from-green-500 to-emerald-500'
    }
  ]

  const categories = [
    { name: 'All Cases', count: 3, icon: Globe },
    { name: 'E-commerce', count: 2, icon: ShoppingCart },
    { name: 'Lead Generation', count: 1, icon: UserCheck },
    { name: 'Brand Building', count: 1, icon: Store }
  ]

  const stats = [
    { label: 'Total Revenue Generated', value: 'EGP 1.5M+', icon: DollarSign },
    { label: 'Happy Clients', value: '20+', icon: Users },
    { label: 'Successful Campaigns', value: '85+', icon: Award },
    { label: 'Average ROI', value: '4.2x', icon: TrendingUp }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <Navigation currentPath="/case-studies" />

      <div className="relative z-10">
      {/* Hero Section */}
      <section className="pt-25 pb-20 relative"> {/* Increased padding-top for fixed navbar */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
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
              <Award className="w-4 h-4" />
              <span className="text-sm font-medium">Success Stories</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Case Studies
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Real results from real campaigns. Discover how I've helped businesses achieve exceptional ROI through strategic digital marketing.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <stat.icon className="w-8 h-8 mx-auto mb-3 text-purple-400" />
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <motion.button
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-300 ${
                  index === 0 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25' 
                    : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20'
                }`}
              >
                <category.icon className="w-4 h-4" />
                <span>{category.name}</span>
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">{category.count}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-6">
          <div className="space-y-16">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-4">
                    <span className={`px-3 py-1 bg-gradient-to-r ${study.colorScheme} bg-opacity-20 text-white rounded-full text-sm border border-white/20`}>
                      {study.category}
                    </span>
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-500/20">
                      {study.industry}
                    </span>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-white mb-4">{study.title}</h3>
                  <p className="text-xl text-gray-300 mb-6">{study.client}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                      <p className="text-sm text-gray-400 mb-1">Duration</p>
                      <p className="text-lg font-semibold text-white flex items-center gap-2">
                        <Clock className="w-4 h-4 text-purple-400" />
                        {study.duration}
                      </p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                      <p className="text-sm text-gray-400 mb-1">Budget</p>
                      <p className="text-lg font-semibold text-white flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-green-400" />
                        {study.budget}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {Object.entries(study.results).slice(0, 4).map(([key, value]) => (
                      <div key={key} className={`bg-gradient-to-br ${study.colorScheme} bg-opacity-20 p-4 rounded-lg border border-white/20`}>
                        <p className="text-sm text-gray-300 mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                        <p className="text-xl font-bold text-white">{value}</p>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={(e) => {
                      e.preventDefault()
                      // Placeholder for future case study detail view
                    }}
                    className={`w-full px-6 py-3 bg-gradient-to-r ${study.colorScheme} text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center justify-center gap-2`}
                  >
                    View Full Case Study
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Visual Representation */}
                  <div className={`aspect-video bg-gradient-to-br ${study.colorScheme} bg-opacity-20 rounded-2xl overflow-hidden border border-white/20 p-8`}>
                    <div className="h-full flex flex-col items-center justify-center text-center">
                      <div className={`w-20 h-20 bg-gradient-to-r ${study.colorScheme} rounded-full flex items-center justify-center mb-4`}>
                        <BarChart3 className="w-10 h-10 text-white" />
                      </div>
                      <h4 className="text-2xl font-bold text-white mb-2">{study.results.roas}</h4>
                      <p className="text-gray-300">Return on Ad Spend</p>
                    </div>
                  </div>
                  
                  {/* Key Metrics Cards */}
                  <div className="grid grid-cols-3 gap-3">
                    {study.keyMetrics.slice(0, 3).map((metric, metricIndex) => (
                      <div key={metricIndex} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 border border-white/10 hover:border-white/20 transition-all duration-300">
                        <div className="flex items-center justify-between mb-2">
                          <metric.icon className="w-4 h-4 text-purple-400" />
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            metric.change.startsWith('+') ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                          }`}>
                            {metric.change}
                          </span>
                        </div>
                        <p className="text-lg font-bold text-white text-sm">{metric.value}</p>
                        <p className="text-xs text-gray-400">{metric.metric}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Case Study Example */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl border border-white/10 overflow-hidden">
              <div className="p-12">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full mb-4">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-sm font-medium">Featured Case Study</span>
                  </div>
                  <h2 className="text-4xl font-bold text-white mb-4">Deep Dive: Pharmacy Success Story</h2>
                  <p className="text-xl text-gray-300">Comprehensive analysis of our most successful campaign</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-12">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-purple-400 mb-2">11.1x</div>
                    <p className="text-gray-300">Return on Ad Spend</p>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-pink-400 mb-2">EGP 500K</div>
                    <p className="text-gray-300">Revenue Generated</p>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-blue-400 mb-2">3</div>
                    <p className="text-gray-300">Months Duration</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12 mb-12">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                      <Target className="w-6 h-6 text-red-400" />
                      The Challenge
                    </h3>
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
                      <p className="text-gray-300 leading-relaxed">
                        Dr. Remon Moner Pharmacy needed to increase sales of their weight gain products through Facebook advertising while maintaining a positive brand image in the healthcare sector. The competitive nature of the healthcare industry required a delicate balance between aggressive marketing and professional credibility.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                      <Lightbulb className="w-6 h-6 text-yellow-400" />
                      Our Solution
                    </h3>
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-6">
                      <p className="text-gray-300 leading-relaxed">
                        Implemented a comprehensive Facebook Ads strategy focusing on educational content, customer testimonials, and targeted advertising to health-conscious audiences. We created a multi-faceted approach that built trust while driving conversions.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    Strategy & Implementation
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      'Created educational ad content about weight gain solutions',
                      'Utilized customer testimonials for social proof',
                      'Targeted health and fitness enthusiasts',
                      'Implemented retargeting campaigns for website visitors',
                      'A/B tested ad creatives and copy',
                      'Optimized for conversions and ROI'
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-blue-400" />
                    Key Results & Impact
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-lg p-6 text-center">
                      <div className="text-3xl font-bold text-purple-400 mb-2">1,200+</div>
                      <p className="text-gray-300">Qualified Leads</p>
                    </div>
                    <div className="bg-gradient-to-br from-pink-500/20 to-pink-600/20 border border-pink-500/30 rounded-lg p-6 text-center">
                      <div className="text-3xl font-bold text-pink-400 mb-2">35%</div>
                      <p className="text-gray-300">Conversion Rate</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-lg p-6 text-center">
                      <div className="text-3xl font-bold text-blue-400 mb-2">2.4M</div>
                      <p className="text-gray-300">Total Impressions</p>
                    </div>
                  </div>
                </div>

                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Star className="w-6 h-6 text-yellow-400" />
                    Client Testimonial
                  </h3>
                  <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg p-8">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold">DR</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="text-lg font-bold text-white">Dr. Remon Moner</h4>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-300 mb-2">Pharmacy Owner</p>
                        <p className="text-gray-300 italic">
                          "Michael helped us achieve 11.1x ROAS in just 3 months. His expertise in Facebook ads is unmatched! The campaign completely transformed our online presence and sales."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center justify-center gap-2 mx-auto">
                    Download Full Case Study
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full mb-6">
              <Rocket className="w-4 h-4" />
              <span className="text-sm font-medium">Ready to Grow?</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Let's Create Your Success Story
            </h2>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Ready to achieve similar results for your business? Let's discuss how we can create a customized digital marketing strategy that drives real growth and exceptional ROI.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={navigateToContact}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Get Started Today
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button 
                onClick={navigateToROI}
                className="px-8 py-4 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2 border border-white/20"
              >
                Calculate Your ROI
                <TrendingUp className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>
      </div>
    </div>
  )
}