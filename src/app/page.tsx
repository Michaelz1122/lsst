'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ConversionTracking from '@/components/ConversionTracking'
import Navigation from '@/components/Navigation'
import RTLWrapper from '@/components/RTLWrapper'
import { Button } from '@/components/ui/button'
import Logo from '@/components/Logo'
import { useContent } from '@/hooks/use-content'
import { 
  ArrowRight, 
  Target, 
  Users, 
  TrendingUp, 
  Award, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle, 
  Star,
  BarChart3,
  Zap,
  Rocket,
  Lightbulb,
  Shield,
  Globe,
  Eye,
  Calendar,
  MessageSquare,
  Download,
  Play,
  X,
  ChevronDown,
  Clock,
  DollarSign,
  UserCheck,
  ShoppingCart,
  Send,
  Building,
  Heart,
  Search
} from 'lucide-react'

// Custom hook for counting animation
const useCountUp = (target: string, duration = 2000) => {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    // Extract numeric value from string (handle 250K+, 48+, 4.2x, 20+)
    const numericMatch = target.match(/(\d+(?:\.\d+)?)/)
    if (!numericMatch) return
    
    const targetValue = parseFloat(numericMatch[1])
    const suffix = target.replace(numericMatch[1], '')
    
    let startTime: number
    let animationId: number
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      
      // Slower easing function for more visible counting
      const easeOutCubic = 1 - Math.pow(1 - progress, 3)
      const currentValue = targetValue * easeOutCubic
      
      // Format the number based on the target
      let displayValue: string
      if (target.includes('K')) {
        displayValue = Math.round(currentValue).toLocaleString()
      } else if (target.includes('.')) {
        displayValue = currentValue.toFixed(1)
      } else {
        displayValue = Math.round(currentValue).toString()
      }
      
      setCount(parseFloat(displayValue))
      
      if (progress < 1) {
        animationId = requestAnimationFrame(animate)
      }
    }
    
    animationId = requestAnimationFrame(animate)
    
    return () => cancelAnimationFrame(animationId)
  }, [target, duration])
  
  return count
}

export default function Home() {
  const { getServicePrice } = useContent()
  const [activeSection, setActiveSection] = useState('home')
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    budget: '',
    message: '',
    selectedService: ''
  })

  // Initialize counting animations for each stat
  const adSpendCount = useCountUp('250K+', 5000)
  const roiCount = useCountUp('4.2x', 5500)
  const clientsCount = useCountUp('20+', 6000)
  const campaignsCount = useCountUp('48+', 6500)

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'work', 'about', 'services', 'contact']
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const stats = [
    { 
      value: '250K+', 
      label: 'Ad Spend Managed (EGP)', 
      icon: BarChart3,
      count: adSpendCount,
      suffix: 'K+'
    },
    { 
      value: '4.2x', 
      label: 'Average ROI', 
      icon: TrendingUp,
      count: roiCount,
      suffix: 'x'
    },
    { 
      value: '20+', 
      label: 'Happy Clients', 
      icon: Users,
      count: clientsCount,
      suffix: '+'
    },
    { 
      value: '48+', 
      label: 'Successful Campaigns', 
      icon: Rocket,
      count: campaignsCount,
      suffix: '+'
    }
  ]

  const services = [
    {
      icon: Target,
      title: 'Meta Ads Management',
      description: 'Strategic Facebook and Instagram advertising campaigns that deliver exceptional ROI through data-driven optimization and creative excellence.',
      features: ['Campaign Strategy & Planning', 'Ad Creative & Copywriting', 'Audience Research & Targeting', 'Performance Optimization', 'A/B Testing & Analysis'],
      price: getServicePrice('meta-ads'),
      budgetRange: '5000-10000',
      color: 'from-purple-500 to-pink-500',
      id: 'meta-ads'
    },
    {
      icon: Zap,
      title: 'Performance Marketing',
      description: 'Comprehensive digital marketing strategies focused on maximizing conversions, revenue, and ROI across multiple platforms and channels.',
      features: ['Conversion Rate Optimization', 'Multi-Channel Strategy', 'Data Analytics & Reporting', 'Funnel Optimization', 'ROI Maximization'],
      price: getServicePrice('performance-marketing'),
      budgetRange: '5000-10000',
      color: 'from-blue-500 to-cyan-500',
      id: 'performance-marketing'
    },
    {
      icon: Rocket,
      title: 'Growth Hacking',
      description: 'Innovative strategies and experiments to accelerate business growth through viral marketing, creative campaigns, and scalable acquisition tactics.',
      features: ['Viral Marketing Campaigns', 'Growth Strategy Development', 'Scalable Acquisition', 'Experimentation & Testing', 'Rapid Scaling'],
      price: getServicePrice('growth-hacking'),
      budgetRange: '10000-25000',
      color: 'from-green-500 to-emerald-500',
      id: 'growth-hacking'
    },
    {
      icon: ShoppingCart,
      title: 'E-commerce Marketing',
      description: 'Specialized marketing solutions for online stores focusing on product sales, customer retention, and revenue growth through targeted campaigns.',
      features: ['Product Catalog Management', 'Dynamic Product Ads', 'Shopping Campaigns', 'Retargeting Strategies', 'Revenue Optimization'],
      price: getServicePrice('ecommerce-marketing'),
      budgetRange: '5000-10000',
      color: 'from-orange-500 to-red-500',
      id: 'ecommerce-marketing'
    },
    {
      icon: UserCheck,
      title: 'Lead Generation',
      description: 'High-quality lead acquisition strategies for service-based businesses with focus on lead quality, cost efficiency, and conversion optimization.',
      features: ['Lead Magnet Creation', 'Landing Page Optimization', 'Lead Qualification', 'Nurturing Campaigns', 'Conversion Tracking'],
      price: getServicePrice('lead-generation'),
      budgetRange: '5000-10000',
      color: 'from-yellow-500 to-amber-500',
      id: 'lead-generation'
    },
    {
      icon: BarChart3,
      title: 'Marketing Analytics',
      description: 'In-depth data analysis and reporting to understand campaign performance, customer behavior, and opportunities for optimization and growth.',
      features: ['Custom Dashboard Setup', 'Performance Analysis', 'ROI Tracking', 'Customer Insights', 'Strategic Recommendations'],
      price: getServicePrice('marketing-analytics'),
      budgetRange: '5000-10000',
      color: 'from-indigo-500 to-purple-500',
      id: 'marketing-analytics'
    }
  ]

  const caseStudies = [
    {
      title: 'Pharmacy Weight Gain Products',
      client: 'Dr. Remon Moner Pharmacy',
      description: 'Complete campaign management for weight gain products through targeted social media advertising',
      results: '11.1x ROAS',
      timeline: '3 months',
      color: 'bg-gradient-to-br from-purple-600 to-pink-600'
    },
    {
      title: 'E-commerce Fashion Brand',
      client: 'Egypt Market Focus',
      description: 'Facebook advertising campaigns for fashion brand with focus on conversion optimization',
      results: '8.5x ROAS',
      timeline: '6 months',
      color: 'bg-gradient-to-br from-blue-600 to-cyan-600'
    },
    {
      title: 'Local Service Business',
      client: 'Lead Generation Campaign',
      description: 'Strategic Facebook advertising campaign that generated qualified leads at reduced cost',
      results: '60% Cost Reduction',
      timeline: '4 months',
      color: 'bg-gradient-to-br from-green-600 to-emerald-600'
    }
  ]

  const reviews = [
    {
      name: 'Ahmed Hassan',
      company: 'E-commerce Store Owner',
      text: 'Michael helped us achieve 11.1x ROAS in just 3 months. His specialist knowledge in Facebook ads is unmatched!',
      rating: 5
    },
    {
      name: 'Sara Mohamed',
      company: 'Marketing Director',
      text: 'Working with Michael transformed our digital marketing strategy. We saw a 300% increase in qualified leads.',
      rating: 5
    },
    {
      name: 'Karim Ali',
      company: 'Startup Founder',
      text: 'Michael\'s data-driven approach helped us scale from 0 to 6 figures in monthly revenue.',
      rating: 5
    }
  ]

  const leadMagnets = [
    {
      title: 'Marketing Audit',
      description: 'Get a comprehensive analysis of your current marketing performance',
      icon: BarChart3,
      cta: 'Request Audit',
      link: '/marketing-audit'
    },
    {
      title: 'ROI Calculator',
      description: 'Calculate your potential return on investment with marketing strategies',
      icon: DollarSign,
      cta: 'Calculate ROI',
      link: '/roi-calculator'
    },
    {
      title: 'Marketing Strategy Guide',
      description: 'Download our comprehensive guide to successful performance marketing',
      icon: Download,
      cta: 'Download Guide',
      link: '/marketing-strategy-guide'
    }
  ]

  const skills = [
    'Meta Ads', 'Performance Marketing', 
    'Media Buying', 'Growth Hacking', 'Data Analytics', 'Conversion Optimization'
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleServiceChange = (serviceName: string) => {
    let budgetRange = ''
    
    // Set budget range based on selected service
    switch (serviceName) {
      case 'Meta Ads Management':
      case 'Performance Marketing':
      case 'E-commerce Marketing':
      case 'Lead Generation':
      case 'Marketing Analytics':
        budgetRange = '5000-10000'
        break
      case 'Growth Hacking':
        budgetRange = '10000-25000'
        break
      case 'Facebook Ads Audit':
      case 'Marketing Strategy Session':
      case 'Ad Creative Package':
        budgetRange = '5000-10000'
        break
      default:
        budgetRange = ''
    }
    
    setFormData({
      ...formData,
      selectedService: serviceName,
      budget: budgetRange
    })
  }

  const generateWhatsAppMessage = () => {
    let message = 'Hi Michael, I\'m interested in your marketing services.\n\n'
    
    if (formData.selectedService) {
      message += `Service Required: ${formData.selectedService}\n`
    }
    
    if (formData.budget) {
      const budgetText = {
        '5000-10000': 'EGP 5,000 - 10,000',
        '10000-25000': 'EGP 10,000 - 25,000',
        '25000-50000': 'EGP 25,000 - 50,000',
        '50000+': 'EGP 50,000+'
      }[formData.budget] || formData.budget
      message += `Budget Range: ${budgetText}\n`
    }
    
    if (formData.name) {
      message += `Name: ${formData.name}\n`
    }
    
    if (formData.company) {
      message += `Company: ${formData.company}\n`
    }
    
    message += '\nPlease reply as soon as possible. Thank you!'
    
    return encodeURIComponent(message)
  }

  const openWhatsAppChat = () => {
    const message = generateWhatsAppMessage()
    window.open(`https://wa.me/201069720311?text=${message}`, '_blank')
  }

  const copyWhatsAppMessage = async () => {
    const message = generateWhatsAppMessage()
    const decodedMessage = decodeURIComponent(message)
    
    try {
      await navigator.clipboard.writeText(decodedMessage)
      alert('Message copied successfully! You can paste it in WhatsApp.')
    } catch (err) {
      console.error('Failed to copy message: ', err)
      alert('Failed to copy message. Please try again.')
    }
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        alert('Thank you for your inquiry! I will contact you within 24 hours.')
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          budget: '',
          message: '',
          selectedService: ''
        })
      } else {
        // Show specific error message from server
        alert(data.error || 'There was an error sending your message. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Network error. Please check your connection and try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-purple-900/10 to-transparent"></div>
      </div>
      
      <div className="relative z-10 pt-25"> {/* Increased padding-top for fixed navbar (h-20 = 5rem) */}
      <ConversionTracking />

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-black rounded-2xl p-8 max-w-2xl w-full border border-purple-500/20">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">How I Help Businesses Grow</h3>
              <button 
                onClick={() => setShowVideoModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Play className="w-16 h-16 mx-auto mb-4 text-purple-400" />
                <p className="text-gray-300">Video presentation coming soon</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <Navigation currentPath="/" />

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative">
        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="container mx-auto px-8 lg:px-12 xl:px-16 2xl:px-20 text-center relative z-10 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Award className="w-4 h-4" />
              <span className="text-sm font-medium">Performance Marketing Specialist</span>
            </motion.div>
            
            <motion.h1 
              className="text-5xl lg:text-7xl xl:text-8xl font-bold mb-8 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Michael Zahy
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl lg:text-2xl xl:text-3xl text-gray-300 mb-12 font-light leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              Media Buyer & Performance Marketing
            </motion.p>

            <motion.div 
              className="flex flex-wrap justify-center gap-4 mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              {skills.map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="px-5 py-3 bg-white/10 backdrop-blur-sm rounded-full text-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>

            <motion.p 
              className="text-xl lg:text-2xl text-gray-400 mb-16 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              Passionate media buyer dedicated to delivering measurable results through strategic digital advertising campaigns and data-driven performance marketing.
            </motion.p>

            <motion.div 
              className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2 + index * 0.5 }}
                  className="text-center p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <stat.icon className="w-8 h-8 mx-auto mb-3 text-purple-400" />
                  <div className="text-3xl font-bold text-white mb-2">
                    {stat.value.includes('K') ? stat.count.toLocaleString() : stat.value.includes('.') ? stat.count.toFixed(1) : Math.round(stat.count)}
                    {stat.suffix}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Button
                  onClick={() => scrollToSection('contact')}
                  size="lg"
                  data-conversion-type="cta_click"
                  data-conversion-value="2500"
                  className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 px-8 rounded-xl shadow-lg border-0 relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Get In Touch
                    <ArrowRight className="w-4 h-4" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 opacity-0"
                    initial={false}
                  />
                </Button>
              </motion.div>
              
              <motion.div
                className="w-full sm:w-auto"
              >
                <Button
                  onClick={() => window.location.href = '/case-studies'}
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto bg-transparent border-2 border-purple-500/50 text-purple-300 font-semibold py-4 px-8 rounded-xl backdrop-blur-sm"
                >
                  <span className="flex items-center gap-2">
                    View My Work
                    <Eye className="w-4 h-4" />
                  </span>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2 }}
              className="mt-12"
            >
              <motion.button
                onClick={() => scrollToSection('work')}
                className="text-purple-400 hover:text-purple-300 transition-all duration-300 group"
                whileHover={{ y: 5 }}
              >
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="flex flex-col items-center gap-2"
                >
                  <ChevronDown className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    View Work
                  </span>
                </motion.div>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Lead Magnets Section */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-gray-900 via-purple-900/10 to-gray-900 relative">
        {/* Section Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/15 via-transparent to-transparent"></div>
        
        <div className="container mx-auto px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Resources</h2>
            <p className="text-lg lg:text-xl text-gray-400">Access valuable marketing resources</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-10 lg:gap-12">
            {leadMagnets.map((magnet, index) => (
              <motion.div
                key={magnet.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-10 rounded-2xl border border-white/10"
              >
                <magnet.icon className="w-12 h-12 mb-4 text-purple-400" />
                <h3 className="text-xl font-bold text-white mb-3">{magnet.title}</h3>
                <p className="text-gray-300 mb-6">{magnet.description}</p>
                <button
                  onClick={() => window.location.href = magnet.link}
                  className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg"
                  data-lead-magnet={magnet.title.toLowerCase().replace(/\s+/g, '_')}
                  data-conversion-type="lead_magnet_download"
                  data-conversion-value="1000"
                >
                  {magnet.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="work" className="py-24 lg:py-32 bg-gradient-to-b from-gray-900 to-black relative">
        {/* Section Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent"></div>
        
        <div className="container mx-auto px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div 
              className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full mb-6"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Award className="w-4 h-4" />
              <span className="text-sm font-medium">Success Stories</span>
            </motion.div>
            
            <h2 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Case Studies
              </span>
            </h2>
            <p className="text-lg lg:text-xl text-gray-400 max-w-4xl mx-auto">Real results from real campaigns - Discover how we've transformed businesses through strategic performance marketing</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-gradient-to-br from-gray-800 via-gray-800/50 to-gray-900 rounded-2xl border border-white/10 hover:border-purple-500/30 transition-all duration-300 overflow-hidden h-full flex flex-col">
                  {/* Card Header with Gradient */}
                  <div className={`h-1.5 ${study.color}`}></div>
                  
                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    {/* Icon and Timeline */}
                    <div className="flex items-start justify-between mb-5">
                      <div className={`w-12 h-12 ${study.color} rounded-xl flex items-center justify-center shadow-lg`}>
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-xs text-gray-400 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                        {study.timeline}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-3">{study.title}</h3>
                      <p className="text-sm text-gray-400 mb-2">{study.client}</p>
                      <p className="text-gray-300 text-sm leading-relaxed mb-4">{study.description}</p>
                    </div>

                    {/* Results */}
                    <div className="mt-auto">
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${study.color} bg-opacity-20 border border-opacity-30`}>
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm font-semibold text-white">{study.results}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Section CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <button
              onClick={() => window.location.href = '/case-studies'}
              className="px-8 py-4 border border-purple-500/50 text-purple-300 font-semibold rounded-full hover:bg-purple-500/20 hover:text-white hover:border-purple-500 transition-all duration-300 flex items-center gap-2 mx-auto"
            >
              View All Case Studies
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-gray-900 via-blue-900/10 to-gray-900 relative">
        {/* Section Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/15 via-transparent to-transparent"></div>
        
        <div className="container mx-auto px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl lg:text-6xl font-bold mb-6">Client Reviews</h2>
            <p className="text-lg lg:text-xl text-gray-400">What my clients say about working with me</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-white/10 h-full flex flex-col"
              >
                <div className="flex items-center mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic text-sm leading-relaxed flex-1">"{review.text}"</p>
                <div className="mt-auto">
                  <p className="font-semibold text-white">{review.name}</p>
                  <p className="text-sm text-gray-400">{review.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 lg:py-32 bg-gradient-to-br from-gray-900 via-pink-900/10 to-gray-900 relative">
        {/* Section Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-900/15 via-transparent to-transparent"></div>
        
        <div className="container mx-auto px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl lg:text-6xl font-bold mb-8">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  About Me
                </span>
              </h2>
              <p className="text-lg lg:text-xl text-gray-300 mb-8 leading-relaxed">
                Strategic media buyer focused on delivering measurable results through data-driven performance marketing campaigns.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  'Facebook & Instagram Advertising',
                  'Performance Marketing Strategy',
                  'Data Analytics & Optimization',
                  'Conversion Rate Optimization'
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">{item}</span>
                  </motion.div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-6 rounded-2xl border border-purple-500/20">
                <div className="flex items-center gap-3 mb-3">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="font-semibold text-white">Client Testimonial</span>
                </div>
                <p className="text-gray-300 italic mb-3">
                  "Michael helped us achieve 11.1x ROAS in just 3 months. His specialist knowledge in Facebook ads is unmatched!"
                </p>
                <p className="text-purple-400 font-medium">- Dr. Remon Moner, Pharmacy Owner</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-8 rounded-2xl border border-purple-500/20">
                <h3 className="text-2xl font-bold text-white mb-6">Skills & Expertise</h3>
                <div className="space-y-4">
                  {[
                    { skill: 'Facebook & Instagram Advertising', level: 'Advanced', percentage: 95 },
                    { skill: 'Performance Marketing', level: 'Advanced', percentage: 90 },
                    { skill: 'Data Analytics & Optimization', level: 'Advanced', percentage: 88 },
                    { skill: 'Conversion Rate Optimization', level: 'Intermediate', percentage: 75 },
                    { skill: 'Google Ads', level: 'Intermediate', percentage: 70 },
                    { skill: 'Content Strategy', level: 'Intermediate', percentage: 65 },
                    { skill: 'SEO & SEM', level: 'Intermediate', percentage: 60 },
                    { skill: 'Email Marketing', level: 'Beginner', percentage: 45 }
                  ].map((item, index) => (
                    <div key={item.skill} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-white font-medium">{item.skill}</span>
                        <span className={`text-sm px-2 py-1 rounded-full ${
                          item.level === 'Advanced' ? 'bg-green-500/20 text-green-300' :
                          item.level === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-300' :
                          'bg-blue-500/20 text-blue-300'
                        }`}>
                          {item.level}
                        </span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            item.level === 'Advanced' ? 'bg-green-400' :
                            item.level === 'Intermediate' ? 'bg-yellow-400' :
                            'bg-blue-400'
                          }`}
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 lg:py-32 bg-gradient-to-br from-gray-900 via-green-900/10 to-gray-900 relative">
        {/* Section Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-900/15 via-transparent to-transparent"></div>
        
        <div className="container mx-auto px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl lg:text-6xl font-bold mb-6">My Services</h2>
            <p className="text-lg lg:text-xl text-gray-400">Comprehensive digital marketing solutions</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-white/10 hover:border-purple-500/30 transition-all duration-300 h-full flex flex-col"
              >
                <div className={`w-14 h-14 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center mb-5`}>
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-gray-300 mb-4 text-sm leading-relaxed">{service.description}</p>
                <p className="text-purple-400 font-semibold mb-6 text-sm">{service.price}</p>
                <div className="flex-1">
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button 
                  onClick={() => {
                    setFormData({
                      ...formData, 
                      selectedService: service.title,
                      budget: service.budgetRange
                    });
                    scrollToSection('contact');
                  }}
                  className="w-full px-5 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                >
                  Get Service
                  <ArrowRight className="w-4 h-4" />
                </button>
                
  
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="py-24 lg:py-32 bg-gradient-to-br from-gray-900 via-blue-900/10 to-gray-900 relative">
        {/* Section Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/15 via-transparent to-transparent"></div>
        
        <div className="container mx-auto px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Marketing Tools & Calculators
            </h2>
            <p className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Free tools to help you analyze, optimize, and improve your marketing performance. Make data-driven decisions with our comprehensive calculators and analysis tools.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 bg-blue-500/20 rounded-full px-4 py-2">
              <BarChart3 className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-300">Professional Marketing Analytics</span>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* English Tools */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 h-full">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">CAC Calculator</h3>
                    <p className="text-sm text-gray-400 mb-4">Calculate your Customer Acquisition Cost and optimize your marketing spend efficiency.</p>
                    <a href="/cac-calculator" className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      Calculate CAC
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-green-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 h-full">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">ROI Calculator</h3>
                    <p className="text-sm text-gray-400 mb-4">Measure your Return on Investment and evaluate the effectiveness of your marketing campaigns.</p>
                    <a href="/roi-calculator" className="text-green-400 hover:text-green-300 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      Calculate ROI
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 h-full">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">Break-Even Calculator</h3>
                    <p className="text-sm text-gray-400 mb-4">Determine your break-even point and understand when your business will become profitable.</p>
                    <a href="/break-even-calculator" className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      Calculate Break-Even
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-orange-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20 h-full">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <UserCheck className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">LTV Calculator</h3>
                    <p className="text-sm text-gray-400 mb-4">Calculate Customer Lifetime Value and understand the long-term value of your customers.</p>
                    <a href="/ltv-calculator" className="text-orange-400 hover:text-orange-300 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      Calculate LTV
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-yellow-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/20 h-full">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <ShoppingCart className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">Conversion Rate Calculator</h3>
                    <p className="text-sm text-gray-400 mb-4">Analyze and optimize your conversion rates to improve your marketing performance.</p>
                    <a href="/conversion-rate-calculator" className="text-yellow-400 hover:text-yellow-300 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      Calculate Conversion Rate
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-indigo-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20 h-full">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">A/B Test Calculator</h3>
                    <p className="text-sm text-gray-400 mb-4">Determine the statistical significance of your A/B test results and make data-driven decisions.</p>
                    <a href="/ab-test-calculator" className="text-indigo-400 hover:text-indigo-300 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      Calculate A/B Test
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 h-full">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">Ad Budget Calculator</h3>
                    <p className="text-sm text-gray-400 mb-4">Plan and optimize your advertising budget to maximize your marketing ROI.</p>
                    <a href="/ad-budget-calculator" className="text-cyan-400 hover:text-cyan-300 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      Calculate Ad Budget
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Arabic Tools */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
              className="group md:col-span-2 lg:col-span-3"
            >
              <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-md rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
                <RTLWrapper className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">الأدوات التسويقية باللغة العربية</h3>
                    <p className="text-gray-300">أدوات متخصصة باللغة العربية لمساعدتك في تحليل وتطوير استراتيجياتك التسويقية</p>
                  </div>
                </RTLWrapper>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <a href="/copywriting-tools-ar" className="bg-white/10 rounded-xl p-4 border border-white/20 hover:border-purple-500/40 transition-all duration-300 hover:bg-purple-500/10">
                    <RTLWrapper className="text-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <MessageSquare className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="text-sm font-bold text-white mb-1">أدوات الكتابة التسويقية</h4>
                      <p className="text-xs text-gray-400">إنشاء محتوى تسويقي احترافي</p>
                    </RTLWrapper>
                  </a>

                  <a href="/marketing-strategy-tool-ar" className="bg-white/10 rounded-xl p-4 border border-white/20 hover:border-blue-500/40 transition-all duration-300 hover:bg-blue-500/10">
                    <RTLWrapper className="text-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <Target className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="text-sm font-bold text-white mb-1">أداة استراتيجية التسويق</h4>
                      <p className="text-xs text-gray-400">تطوير خطط تسويقية متكاملة</p>
                    </RTLWrapper>
                  </a>

                  <a href="/media-buying-plan-tool-ar" className="bg-white/10 rounded-xl p-4 border border-white/20 hover:border-green-500/40 transition-all duration-300 hover:bg-green-500/10">
                    <RTLWrapper className="text-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <BarChart3 className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="text-sm font-bold text-white mb-1">أداة تخطيط شراء الإعلانات</h4>
                      <p className="text-xs text-gray-400">تخطيط إعلانات فعال</p>
                    </RTLWrapper>
                  </a>

                  <a href="/competitor-analysis-tool-ar" className="bg-white/10 rounded-xl p-4 border border-white/20 hover:border-orange-500/40 transition-all duration-300 hover:bg-orange-500/10">
                    <RTLWrapper className="text-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <Search className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="text-sm font-bold text-white mb-1">أداة تحليل المنافسين</h4>
                      <p className="text-xs text-gray-400">تحليل شامل للمنافسة</p>
                    </RTLWrapper>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-6 py-3">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="text-sm text-gray-300">All tools are free to use - No registration required</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 lg:py-32 bg-gradient-to-br from-gray-900 via-purple-900/20 to-pink-900/20 relative">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-pink-900/10 to-transparent"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>
        
        <div className="container mx-auto px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Let's Connect
            </h2>
            <p className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Choose your preferred method to reach out. I'm always excited to discuss new opportunities!
            </p>
            <div className="mt-4 inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
              <Clock className="w-4 h-4 text-green-400" />
              <span className="text-sm text-gray-300">I typically respond within 24 hours</span>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Left Column - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-2 bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-2xl"
            >
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-white mb-4">Send a Message</h3>
                <p className="text-gray-300 text-lg">
                  Fill out the form below and I'll get back to you within 24 hours. I'm excited to learn about your project and discuss how we can work together.
                </p>
              </div>
              
              <form 
                onSubmit={handleFormSubmit} 
                className="space-y-6"
                data-conversion-type="contact_form_submission"
                data-conversion-value="5000"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                      <Users className="w-4 h-4 text-purple-400" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white placeholder-gray-400"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-purple-400" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white placeholder-gray-400"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-purple-400" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white placeholder-gray-400"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+20 XXX XXX XXXX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                      <Building className="w-4 h-4 text-purple-400" />
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white placeholder-gray-400"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      placeholder="Your company name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                      <Target className="w-4 h-4 text-purple-400" />
                      Service Interest
                    </label>
                    <select
                      name="selectedService"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white appearance-none cursor-pointer"
                      value={formData.selectedService}
                      onChange={(e) => handleServiceChange(e.target.value)}
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23a78bfa' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: `right 0.5rem center`,
                        backgroundRepeat: `no-repeat`,
                        backgroundSize: `1.5em 1.5em`,
                        paddingRight: `2.5rem`
                      }}
                    >
                      <option value="" className="bg-gray-900 text-white">Select a service</option>
                      <option value="Meta Ads Management" className="bg-gray-900 text-white">Meta Ads Management</option>
                      <option value="Performance Marketing" className="bg-gray-900 text-white">Performance Marketing</option>
                      <option value="Growth Hacking" className="bg-gray-900 text-white">Growth Hacking</option>
                      <option value="E-commerce Marketing" className="bg-gray-900 text-white">E-commerce Marketing</option>
                      <option value="Lead Generation" className="bg-gray-900 text-white">Lead Generation</option>
                      <option value="Marketing Analytics" className="bg-gray-900 text-white">Marketing Analytics</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-purple-400" />
                      Budget Range
                    </label>
                    <select
                      name="budget"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white appearance-none cursor-pointer"
                      value={formData.budget}
                      onChange={(e) => setFormData({...formData, budget: e.target.value})}
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23a78bfa' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: `right 0.5rem center`,
                        backgroundRepeat: `no-repeat`,
                        backgroundSize: `1.5em 1.5em`,
                        paddingRight: `2.5rem`
                      }}
                    >
                      <option value="" className="bg-gray-900 text-white">Select budget range</option>
                      <option value="5000-10000" className="bg-gray-900 text-white">EGP 5,000 - 10,000</option>
                      <option value="10000-25000" className="bg-gray-900 text-white">EGP 10,000 - 25,000</option>
                      <option value="25000-50000" className="bg-gray-900 text-white">EGP 25,000 - 50,000</option>
                      <option value="50000+" className="bg-gray-900 text-white">EGP 50,000+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-purple-400" />
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    rows={6}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 resize-none text-white placeholder-gray-400"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Tell me about your project, goals, and any specific requirements..."
                    required
                  ></textarea>
                </div>
                
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/25 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </Button>
              </form>
              
              {/* WhatsApp Quick Contact */}
              <div className="mt-8 p-6 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl border border-green-500/30 backdrop-blur-sm">
                <div className="text-center">
                  <h4 className="text-xl font-semibold text-white mb-3 flex items-center justify-center gap-2">
                    <MessageSquare className="w-5 h-5 text-green-400" />
                    Quick WhatsApp Contact
                  </h4>
                  <p className="text-gray-300 text-base mb-4">
                    For quick response and direct inquiry, click the button below to contact via WhatsApp with a pre-filled message
                  </p>
                  <div className="text-sm text-gray-400 mb-4">
                    💡 Pro tip: For urgent inquiries, WhatsApp provides the fastest response time
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={openWhatsAppChat}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300"
                    >
                      <MessageSquare className="w-5 h-5" />
                      Open WhatsApp Chat
                    </button>
                    <button
                      onClick={copyWhatsAppMessage}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-green-500/30 text-white font-semibold rounded-lg hover:bg-green-500/20 transition-all duration-300"
                    >
                      Copy Message
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Contact Info & CTA */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Get In Touch Cards */}
              <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">Get In Touch</h3>
                
                <div className="space-y-4">
                  {/* Email Card */}
                  <a href="mailto:Michaelzahy1@gmail.com" className="group block">
                    <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl p-4 hover:bg-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Mail className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-white mb-1">Email</h4>
                          <p className="text-sm text-gray-300">Send message anytime</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </a>

                  {/* WhatsApp Card */}
                  <a 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault()
                      openWhatsAppChat()
                    }}
                    className="group block"
                  >
                    <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl p-4 hover:bg-green-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                          <MessageSquare className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-white mb-1">WhatsApp</h4>
                          <p className="text-sm text-gray-300">Chat with me directly</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-green-400 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </a>

                  {/* Facebook Card */}
                  <a href="https://www.facebook.com/MichaelzMediabuyer" target="_blank" rel="noopener noreferrer" className="group block">
                    <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-2xl p-4 hover:bg-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xl font-bold" style={{ fontFamily: 'Arial, sans-serif' }}>f</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-white mb-1">Facebook</h4>
                          <p className="text-sm text-gray-300">Follow my professional page</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </a>

                  {/* LinkedIn Card */}
                  <a href="https://www.linkedin.com/in/michael-zahy/" target="_blank" rel="noopener noreferrer" className="group block">
                    <div className="bg-gradient-to-r from-sky-500/20 to-blue-500/20 border border-sky-500/30 rounded-2xl p-4 hover:bg-sky-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/20">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-sky-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Users className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-white mb-1">LinkedIn</h4>
                          <p className="text-sm text-gray-300">Connect professionally</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-sky-400 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Why Work With Me */}
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-3xl p-6 border border-purple-500/30">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">Why Work With Me?</h3>
                
                <div className="space-y-4">
                  <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Target className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white mb-1">Proven Expertise</h4>
                        <p className="text-xs text-gray-400">Specialized in Meta Ads with exceptional ROI track record</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white mb-1">Results-Driven</h4>
                        <p className="text-xs text-gray-400">Data-focused approach with continuous optimization</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white mb-1">True Partnership</h4>
                        <p className="text-xs text-gray-400">Work as extension of your team</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Lightbulb className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white mb-1">Cutting-Edge</h4>
                        <p className="text-xs text-gray-400">Latest marketing strategies</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="mt-6 text-center">
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                  >
                    <Rocket className="w-4 h-4" />
                    Start Your Project Today
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 border-t border-white/10 py-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent"></div>
        
        <div className="container mx-auto px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10 max-w-7xl">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
            
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <Logo />
                <motion.span 
                  className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-[length:200%_100%] bg-clip-text text-transparent cursor-pointer"
                  animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                  onClick={() => window.location.href = '/'}
                  whileHover={{ scale: 1.02 }}
                >
                  Michael Zahy
                </motion.span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Strategic media buyer and performance marketing specialist dedicated to delivering exceptional ROI through data-driven digital advertising campaigns.
              </p>
              
              {/* Social Media Icons */}
              <div className="flex gap-4">
                <a href="https://www.linkedin.com/in/michael-zahy/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center border border-blue-500/30">
                  <Users className="w-6 h-6 text-white" />
                </a>
                
                <a href="https://www.facebook.com/MichaelzMediabuyer" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-500 rounded-2xl flex items-center justify-center border border-blue-600/30">
                  <span className="text-white text-xl font-bold" style={{ fontFamily: 'Arial, sans-serif' }}>f</span>
                </a>
                
                <a href="mailto:Michaelzahy1@gmail.com" className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center border border-green-500/30">
                  <Mail className="w-6 h-6 text-white" />
                </a>
                
                <a href="https://wa.me/201069720311" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-500 rounded-2xl flex items-center justify-center border border-green-600/30">
                  <MessageSquare className="w-6 h-6 text-white" />
                </a>
              </div>
            </div>
            
            {/* Services Column */}
            <div>
              <h3 className="text-lg font-bold text-white mb-6">Services</h3>
              <ul className="space-y-3">
                <li>
                  <a href="/services" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2 group">
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>Meta Ads Management</span>
                  </a>
                </li>
                <li>
                  <a href="/services" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2 group">
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>Performance Marketing</span>
                  </a>
                </li>
                <li>
                  <a href="/services" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2 group">
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>Growth Hacking</span>
                  </a>
                </li>
                <li>
                  <a href="/services" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2 group">
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>E-commerce Marketing</span>
                  </a>
                </li>
                <li>
                  <a href="/services" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2 group">
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>Lead Generation</span>
                  </a>
                </li>
                <li>
                  <a href="/services" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2 group">
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>Marketing Analytics</span>
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Resources Column */}
            <div>
              <h3 className="text-lg font-bold text-white mb-6">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <a href="/case-studies" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2 group">
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>Case Studies</span>
                  </a>
                </li>
                <li>
                  <a href="/marketing-audit" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2 group">
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>Marketing Audit</span>
                  </a>
                </li>
                <li>
                  <a href="/roi-calculator" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2 group">
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>ROI Calculator</span>
                  </a>
                </li>
                <li>
                  <a href="/marketing-strategy-guide" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2 group">
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>Strategy Guide</span>
                  </a>
                </li>
                <li>
                  <a href="/faq" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2 group">
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>FAQ</span>
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Company Column */}
            <div>
              <h3 className="text-lg font-bold text-white mb-6">Company</h3>
              <ul className="space-y-3">
                <li>
                  <a href="/about" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2 group">
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>About Me</span>
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2 group">
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>Contact</span>
                  </a>
                </li>
                <li>
                  <a href="/privacy-policy" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2 group">
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>Privacy Policy</span>
                  </a>
                </li>
                <li>
                  <a href="/terms-of-service" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2 group">
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>Terms of Service</span>
                  </a>
                </li>
                <li>
                  <a href="/cookie-policy" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2 group">
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>Cookie Policy</span>
                  </a>
                </li>
                <li>
                  <a href="/disclaimer" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2 group">
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>Disclaimer</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Bottom Footer */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-400 text-sm mb-4 md:mb-0">
                © 2024 Michael Zahy. All rights reserved.
              </div>
              <div className="flex items-center gap-6 text-sm">
                <span className="text-gray-400">Designed with</span>
                <Heart className="w-4 h-4 text-red-500" />
                <span className="text-gray-400">in Egypt</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </div>
  )
}