'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import { 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  MessageSquare, 
  Phone, 
  Mail, 
  Clock,
  CheckCircle,
  Star,
  Award,
  Target,
  Users,
  TrendingUp,
  BarChart3,
  Lightbulb,
  Zap,
  ArrowRight,
  Search
} from 'lucide-react'

export default function FAQ() {
  const [openCategory, setOpenCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const navigateToContact = () => {
    if (window.location.pathname === '/') {
      const element = document.getElementById('contact')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      window.location.href = '/#contact'
    }
  }

  const navigateToServices = () => {
    window.location.href = '/services'
  }

  const faqCategories = [
    {
      id: 'general',
      title: 'General Questions',
      icon: HelpCircle,
      color: 'from-purple-500 to-pink-500',
      faqs: [
        {
          question: 'What services do you offer?',
          answer: 'I offer comprehensive digital marketing services including Meta Ads Management, Performance Marketing, and Growth Hacking. Each service is tailored to your specific business needs and goals.'
        },
        {
          question: 'How long have you been in the marketing industry?',
          answer: 'I have been working in digital marketing since 2020, specializing in Facebook advertising and performance marketing. Over the years, I\'ve helped numerous businesses achieve exceptional results.'
        },
        {
          question: 'What makes your approach different from other marketers?',
          answer: 'My approach combines data-driven strategies with creative thinking. I focus on delivering measurable ROI rather than just vanity metrics, and I believe in transparent communication and long-term partnerships.'
        },
        {
          question: 'Do you work with businesses of all sizes?',
          answer: 'Yes, I work with businesses of all sizes - from startups to established companies. I customize my approach based on your specific needs, budget, and goals.'
        }
      ]
    },
    {
      id: 'services',
      title: 'Services & Pricing',
      icon: Target,
      color: 'from-blue-500 to-cyan-500',
      faqs: [
        {
          question: 'What is included in your Meta Ads Management service?',
          answer: 'My Meta Ads Management service includes campaign strategy & planning, ad creative & copywriting, audience research & targeting, A/B testing & optimization, performance analytics & reporting, and dedicated account management.'
        },
        {
          question: 'How much do your services cost?',
          answer: 'My services start from EGP 5,000/month for Meta Ads Management, EGP 7,500/month for Performance Marketing, and EGP 10,000/month for Growth Hacking. I also offer one-time services like Facebook Ads Audit (EGP 2,500) and Marketing Strategy Sessions (EGP 1,500).'
        },
        {
          question: 'Do you require long-term contracts?',
          answer: 'I typically work on a monthly basis with a 3-month minimum commitment to ensure we have enough time to see meaningful results. However, I also offer one-time services like audits and consultations.'
        },
        {
          question: 'What industries do you specialize in?',
          answer: 'I have experience working across various industries including e-commerce, healthcare, local services, SaaS, and startups. My data-driven approach can be adapted to any industry that can benefit from digital marketing.'
        }
      ]
    },
    {
      id: 'results',
      title: 'Results & Performance',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
      faqs: [
        {
          question: 'What kind of results can I expect?',
          answer: 'Results vary based on your industry, budget, and goals, but my clients typically see 4-11x ROAS, significant increases in qualified leads, and improved brand awareness. I provide specific projections during our initial consultation.'
        },
        {
          question: 'How long does it take to see results?',
          answer: 'While some improvements can be seen within the first few weeks, significant results typically take 3-6 months. This allows time for optimization, testing, and building momentum with your campaigns.'
        },
        {
          question: 'How do you measure success?',
          answer: 'I measure success based on your specific business goals, whether that\'s ROI, lead generation, brand awareness, or customer acquisition. I provide detailed weekly and monthly reports showing key metrics and progress toward your goals.'
        },
        {
          question: 'Can you guarantee specific results?',
          answer: 'While I can\'t guarantee specific results (as marketing involves many variables), I can guarantee that I\'ll use proven strategies, provide transparent reporting, and work diligently to achieve the best possible results for your business.'
        }
      ]
    },
    {
      id: 'process',
      title: 'Working Process',
      icon: BarChart3,
      color: 'from-orange-500 to-red-500',
      faqs: [
        {
          question: 'How does the onboarding process work?',
          answer: 'The onboarding process starts with a discovery call to understand your business and goals, followed by a strategy session where I present my recommendations. Once we agree on the approach, I set up campaigns and begin optimization.'
        },
        {
          question: 'How often will we communicate?',
          answer: 'I provide weekly performance reports and am available for regular check-ins. I also offer monthly strategy reviews to discuss progress and adjust our approach as needed. I\'m always available for urgent matters.'
        },
        {
          question: 'What do you need from me to get started?',
          answer: 'To get started, I\'ll need access to your ad accounts, understanding of your business goals, target audience information, and any existing marketing materials. I\'ll guide you through exactly what\'s needed during our initial consultation.'
        },
        {
          question: 'Can I make changes to the campaigns?',
          answer: 'While I manage the day-to-day optimization, I welcome your input and feedback. I believe in collaboration and will keep you informed about all major decisions. You\'ll have full visibility into all campaigns and performance.'
        }
      ]
    },
    {
      id: 'technical',
      title: 'Technical Questions',
      icon: Lightbulb,
      color: 'from-indigo-500 to-purple-500',
      faqs: [
        {
          question: 'What platforms do you work with?',
          answer: 'I primarily work with Facebook and Instagram ads, but I also have experience with Google Ads, TikTok Ads, and LinkedIn Ads. I can help you determine which platforms are best for your business goals.'
        },
        {
          question: 'Do you handle ad creative and copywriting?',
          answer: 'Yes, I provide complete ad creative services including image design, video production, and copywriting. I believe that compelling creative is essential for campaign success.'
        },
        {
          question: 'How do you handle tracking and analytics?',
          answer: 'I set up comprehensive tracking including Facebook Pixel, conversion tracking, and Google Analytics integration. This allows us to measure performance accurately and make data-driven decisions.'
        },
        {
          question: 'What tools and software do you use?',
          answer: 'I use industry-standard tools including Facebook Ads Manager, Google Analytics, various A/B testing platforms, and custom reporting dashboards. I leverage technology to maximize campaign performance.'
        }
      ]
    }
  ]

  const toggleCategory = (categoryId: string) => {
    setOpenCategory(openCategory === categoryId ? null : categoryId)
  }

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0)

  const stats = [
    { label: 'Questions Answered', value: '500+', icon: HelpCircle },
    { label: 'Happy Clients', value: '20+', icon: Users },
    { label: 'Years Experience', value: '4+', icon: Award },
    { label: 'Success Rate', value: '98%', icon: TrendingUp }
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

      <Navigation currentPath="/faq" />

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
              <HelpCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Frequently Asked Questions</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Got Questions?
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Find answers to common questions about my services, process, and how I can help your business grow.
            </p>

            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for answers..."
                  className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-full focus:outline-none focus:border-purple-500 transition-colors pl-12"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
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

      {/* FAQ Categories */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {filteredCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-white/10 p-6 hover:border-purple-500/30 transition-all duration-300 text-left"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center`}>
                        <category.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{category.title}</h3>
                        <p className="text-gray-400">{category.faqs.length} questions</p>
                      </div>
                    </div>
                    <div className="text-purple-400">
                      {openCategory === category.id ? (
                        <ChevronUp className="w-6 h-6" />
                      ) : (
                        <ChevronDown className="w-6 h-6" />
                      )}
                    </div>
                  </div>
                </button>

                {openCategory === category.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 space-y-4"
                  >
                    {category.faqs.map((faq, faqIndex) => (
                      <div
                        key={faqIndex}
                        className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-white/10 p-6"
                      >
                        <h4 className="text-lg font-semibold text-white mb-3">{faq.question}</h4>
                        <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                      </div>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Still Have Questions?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Can\'t find the answer you\'re looking for? I\'m here to help! Get in touch and I\'ll be happy to answer any questions you have about my services.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl border border-purple-500/20 p-8">
                <MessageSquare className="w-12 h-12 mb-4 text-purple-400 mx-auto" />
                <h3 className="text-xl font-bold text-white mb-3">Live Chat</h3>
                <p className="text-gray-300 mb-4">Chat with me directly for quick answers to your questions.</p>
                <button className="px-6 py-2 bg-purple-500/20 text-purple-300 rounded-lg hover:bg-purple-500/30 transition-all duration-300 border border-purple-500/20">
                  Start Chat
                </button>
              </div>

              <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl border border-blue-500/20 p-8">
                <Mail className="w-12 h-12 mb-4 text-blue-400 mx-auto" />
                <h3 className="text-xl font-bold text-white mb-3">Email Support</h3>
                <p className="text-gray-300 mb-4">Send me an email and I\'ll respond within 24 hours.</p>
                <button className="px-6 py-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-all duration-300 border border-blue-500/20">
                  Send Email
                </button>
              </div>

              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl border border-green-500/20 p-8">
                <Phone className="w-12 h-12 mb-4 text-green-400 mx-auto" />
                <h3 className="text-xl font-bold text-white mb-3">Schedule Call</h3>
                <p className="text-gray-300 mb-4">Book a free 30-minute consultation call.</p>
                <button className="px-6 py-2 bg-green-500/20 text-green-300 rounded-lg hover:bg-green-500/30 transition-all duration-300 border border-green-500/20">
                  Book Now
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-white/10 p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Response Times</h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <Clock className="w-8 h-8 mb-2 text-purple-400 mx-auto" />
                  <p className="font-semibold text-white">Email</p>
                  <p className="text-gray-400">Within 24 hours</p>
                </div>
                <div>
                  <Clock className="w-8 h-8 mb-2 text-blue-400 mx-auto" />
                  <p className="font-semibold text-white">Live Chat</p>
                  <p className="text-gray-400">Within 1 hour</p>
                </div>
                <div>
                  <Clock className="w-8 h-8 mb-2 text-green-400 mx-auto" />
                  <p className="font-semibold text-white">Calls</p>
                  <p className="text-gray-400">Scheduled within 48 hours</p>
                </div>
              </div>
            </div>
          </motion.div>
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
                Ready to Get Started?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Take the first step toward growing your business with expert digital marketing services.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={navigateToContact}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
              >
                Get Started
              </button>
              <button 
                onClick={navigateToServices}
                className="px-8 py-4 border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300"
              >
                View Services
              </button>
            </div>
          </motion.div>
        </div>
      </section>
      </div>
    </div>
  )
}