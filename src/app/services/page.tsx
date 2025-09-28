'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import { 
  Target, 
  Users, 
  TrendingUp, 
  Award, 
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
  X,
  Check
} from 'lucide-react'

export default function Services() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const navigateToContact = (serviceTitle = '', budgetRange = '') => {
    // If we're on the main page, scroll to contact section
    if (window.location.pathname === '/') {
      scrollToSection('contact')
      // Store in localStorage for cross-page communication
      if (serviceTitle || budgetRange) {
        const formData = {
          selectedService: serviceTitle,
          budget: budgetRange
        }
        localStorage.setItem('preselectedServiceData', JSON.stringify(formData))
        // Dispatch event to notify the main page
        window.dispatchEvent(new CustomEvent('serviceSelected', { detail: formData }))
      }
    } else {
      // Navigate to main page with service data in URL parameters
      const params = new URLSearchParams()
      if (serviceTitle) params.append('service', serviceTitle)
      if (budgetRange) params.append('budget', budgetRange)
      const queryString = params.toString()
      window.location.href = `/#contact${queryString ? '?' + queryString : ''}`
    }
  }
  const services = [
    {
      id: 1,
      title: 'Meta Ads Management',
      description: 'Strategic Facebook and Instagram advertising campaigns that deliver exceptional ROI',
      icon: Target,
      color: 'from-purple-500 to-pink-500',
      price: 'Starting from EGP 5,000/month',
      budgetRange: '5000-10000',
      features: [
        'Campaign Strategy & Planning',
        'Ad Creative & Copywriting',
        'Audience Research & Targeting',
        'A/B Testing & Optimization',
        'Performance Analytics & Reporting',
        'Dedicated Account Manager'
      ],
      deliverables: [
        'Custom Campaign Strategy',
        'Ad Creative Assets',
        'Weekly Performance Reports',
        'Monthly Strategy Reviews',
        'ROI Analysis & Insights',
        'Competitor Analysis'
      ],
      idealFor: [
        'E-commerce Businesses',
        'Service-Based Companies',
        'Local Businesses',
        'Startups & Scale-ups'
      ]
    },
    {
      id: 2,
      title: 'Performance Marketing',
      description: 'Data-driven marketing strategies focused on maximizing conversions and revenue',
      icon: Zap,
      color: 'from-blue-500 to-cyan-500',
      price: 'Starting from EGP 7,500/month',
      budgetRange: '5000-10000',
      features: [
        'Conversion Rate Optimization',
        'A/B Testing & Analysis',
        'Performance Analytics',
        'Marketing Automation',
        'Customer Journey Mapping',
        'Multi-channel Strategy'
      ],
      deliverables: [
        'Conversion Audit & Strategy',
        'A/B Testing Framework',
        'Performance Dashboard',
        'Automation Setup',
        'Customer Journey Maps',
        'Growth Strategy Document'
      ],
      idealFor: [
        'Established E-commerce',
        'SaaS Companies',
        'Digital Products',
        'Subscription Businesses'
      ]
    },
    {
      id: 3,
      title: 'Growth Hacking',
      description: 'Innovative strategies to accelerate business growth through digital channels',
      icon: Rocket,
      color: 'from-green-500 to-emerald-500',
      price: 'Starting from EGP 10,000/month',
      budgetRange: '10000-25000',
      features: [
        'Viral Marketing Campaigns',
        'Growth Strategy Development',
        'Scalable Acquisition',
        'Product-Led Growth',
        'Referral Programs',
        'Community Building'
      ],
      deliverables: [
        'Growth Strategy Blueprint',
        'Viral Campaign Concepts',
        'Referral Program Design',
        'Community Strategy',
        'Growth Hacking Toolkit',
        'Scalability Framework'
      ],
      idealFor: [
        'Tech Startups',
        'Mobile Apps',
        'Platform Businesses',
        'High-Growth Companies'
      ]
    }
  ]

  const additionalServices = [
    {
      title: 'Facebook Ads Audit',
      description: 'Comprehensive analysis of your current Facebook ads performance',
      price: 'EGP 2,500',
      duration: '3-5 days',
      icon: BarChart3
    },
    {
      title: 'Marketing Strategy Session',
      description: '2-hour deep dive into your marketing challenges and opportunities',
      price: 'EGP 1,500',
      duration: '2 hours',
      icon: Lightbulb
    },
    {
      title: 'Ad Creative Package',
      description: 'Professional ad creatives for your campaigns',
      price: 'EGP 3,000',
      duration: '1 week',
      icon: Star
    }
  ]

  const process = [
    {
      step: 1,
      title: 'Discovery & Strategy',
      description: 'Understanding your business goals and developing a customized strategy',
      icon: Target
    },
    {
      step: 2,
      title: 'Campaign Setup',
      description: 'Creating and configuring your advertising campaigns',
      icon: Rocket
    },
    {
      step: 3,
      title: 'Optimization',
      description: 'Continuous monitoring and improvement of campaign performance',
      icon: Zap
    },
    {
      step: 4,
      title: 'Reporting & Analysis',
      description: 'Detailed performance reports and strategic insights',
      icon: BarChart3
    }
  ]

  const reviews = [
    {
      name: 'Ahmed Hassan',
      company: 'E-commerce Store Owner',
      text: 'Michael\'s Meta Ads management helped us achieve 11.1x ROAS in just 3 months. His strategic approach is unmatched!',
      rating: 5
    },
    {
      name: 'Sara Mohamed',
      company: 'Marketing Director',
      text: 'The performance marketing services transformed our digital strategy. We saw a 300% increase in qualified leads.',
      rating: 5
    },
    {
      name: 'Karim Ali',
      company: 'Startup Founder',
      text: 'Michael\'s growth hacking strategies helped us scale from 0 to 6 figures in monthly revenue.',
      rating: 5
    }
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

      <Navigation currentPath="/services" />

      <div className="relative z-10">
      {/* Hero Section */}
      <section className="pt-25 pb-20 relative"> {/* Increased padding-top for fixed navbar */}
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
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">Professional Services</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Marketing Services
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Comprehensive digital marketing solutions designed to deliver exceptional ROI and accelerate your business growth.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={() => navigateToContact()}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
              >
                Get Started
              </button>
              <button 
                onClick={() => navigateToContact()}
                className="px-8 py-4 border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300"
              >
                Schedule Consultation
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Services Section */}
      <section id="pricing" className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Core Services</h2>
            <p className="text-xl text-gray-400">Comprehensive solutions for your marketing needs</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-white/10 hover:border-purple-500/30 transition-all duration-300"
              >
                <div className="p-8">
                  <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-6`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-gray-300 mb-4">{service.description}</p>
                  <div className="text-purple-400 font-semibold mb-6">{service.price}</div>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Key Features</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Deliverables</h4>
                    <ul className="space-y-2">
                      {service.deliverables.map((deliverable, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-blue-400" />
                          <span className="text-gray-300 text-sm">{deliverable}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Ideal For</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.idealFor.map((item, idx) => (
                        <span key={idx} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button 
                    onClick={() => navigateToContact(service.title, service.budgetRange)}
                    className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                  >
                    Get Service
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Additional Services</h2>
            <p className="text-xl text-gray-400">Flexible solutions for specific needs</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {additionalServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-white/10 hover:border-purple-500/30 transition-all duration-300"
              >
                <service.icon className="w-12 h-12 mb-4 text-purple-400" />
                <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-gray-300 mb-4">{service.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-purple-400">{service.price}</span>
                  <span className="text-sm text-gray-400">{service.duration}</span>
                </div>
                <button 
                    onClick={() => navigateToContact()}
                    className="w-full px-4 py-2 bg-purple-500/20 text-purple-300 font-semibold rounded-lg hover:bg-purple-500/30 transition-all duration-300 border border-purple-500/20"
                  >
                    Get Quote
                  </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-400">Our proven process for success</p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <step.icon className="w-10 h-10 text-white" />
                </div>
                <div className="text-3xl font-bold text-purple-400 mb-2">{step.step}</div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Client Reviews</h2>
            <p className="text-xl text-gray-400">Results speak for themselves</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-white/10"
              >
                <div className="flex items-center mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">"{review.text}"</p>
                <div>
                  <p className="font-semibold text-white">{review.name}</p>
                  <p className="text-sm text-gray-400">{review.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Ready to Transform Your Marketing?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Let's discuss how our services can help you achieve exceptional results and grow your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={() => navigateToContact()}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
              >
                Book a Consultation
              </button>
              <button 
                onClick={() => scrollToSection('pricing')}
                className="px-8 py-4 border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300"
              >
                View Pricing
              </button>
            </div>
          </motion.div>
        </div>
      </section>
      </div>
    </div>
  )
}