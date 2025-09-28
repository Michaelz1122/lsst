'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Navigation from '@/components/Navigation'
import Analytics from '@/components/Analytics'
import ConversionTracking from '@/components/ConversionTracking'
import { Button } from '@/components/ui/button'
import { 
  MessageSquare, 
  Users, 
  Mail, 
  ArrowRight,
  Clock,
  CheckCircle,
  Phone,
  Building,
  Target,
  TrendingUp,
  Award,
  Lightbulb,
  Shield,
  Send
} from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    budget: '',
    message: '',
    selectedService: ''
  })

  const services = [
    'Meta Ads Management',
    'Performance Marketing', 
    'Growth Hacking',
    'E-commerce Marketing',
    'Lead Generation',
    'Marketing Analytics'
  ]

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
        alert('There was an error sending your message. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('There was an error sending your message. Please try again.')
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
      </div>
      
      <div className="relative z-10 pt-25"> {/* Increased padding-top for fixed navbar */}
        <Analytics />
        <ConversionTracking />
        <Navigation currentPath="/contact" />

        {/* Hero Section */}
        <section className="py-20 lg:py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-purple-900/30 to-pink-900/40"></div>
          
          <div className="container mx-auto px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10 max-w-7xl">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full mb-6"
              >
                <MessageSquare className="w-4 h-4" />
                <span className="text-sm font-medium">Get In Touch</span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
              >
                Let's Connect
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-gray-300 max-w-3xl mx-auto"
              >
                Ready to take your business to the next level? Choose your preferred way to reach out and let's discuss how we can achieve your marketing goals together.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Main Contact Section */}
        <section className="pb-32">
          <div className="container mx-auto px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Contact Form (Wider) */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="lg:col-span-2 bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-2xl"
              >
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-white mb-4">Send Me a Message</h2>
                  <p className="text-gray-300">
                    Fill out the form below and I'll get back to you within 24 hours. I'm excited to learn about your project and discuss how we can work together.
                  </p>
                </div>
                
                <form onSubmit={handleFormSubmit} className="space-y-4" id="contact-form">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <Users className="w-4 h-4 text-purple-400" />
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white placeholder-gray-400"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <Mail className="w-4 h-4 text-purple-400" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white placeholder-gray-400"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <Phone className="w-4 h-4 text-purple-400" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white placeholder-gray-400"
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
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white placeholder-gray-400"
                        placeholder="Your company name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <Target className="w-4 h-4 text-purple-400" />
                        Service Interest
                      </label>
                      <select
                        value={formData.selectedService}
                        onChange={(e) => setFormData({...formData, selectedService: e.target.value})}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white"
                      >
                        <option value="">Select a service you're interested in</option>
                        {services.map((service) => (
                          <option key={service} value={service} className="bg-gray-800">
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-purple-400" />
                        Budget Range
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({...formData, budget: e.target.value})}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white"
                      >
                        <option value="">Select your budget range</option>
                        <option value="5000-10000">EGP 5,000 - 10,000</option>
                        <option value="10000-25000">EGP 10,000 - 25,000</option>
                        <option value="25000-50000">EGP 25,000 - 50,000</option>
                        <option value="50000+">EGP 50,000+</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-purple-400" />
                      Your Message
                    </label>
                    <textarea
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white placeholder-gray-400 resize-none"
                      placeholder="Tell me about your project, goals, and any specific requirements..."
                      required
                    ></textarea>
                  </div>
                  
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                  >
                    Send Message
                    <Send className="w-5 h-5 ml-2" />
                  </Button>
                </form>
              </motion.div>

              {/* Right Column - Get In Touch & Why Work With Me */}
              <div className="space-y-4">
                {/* Get In Touch Card */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10"
                >
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-2">Get In Touch</h3>
                    <p className="text-gray-300 text-sm">
                      Choose your preferred method to reach out.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {/* WhatsApp */}
                    <motion.a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        openWhatsAppChat()
                      }}
                      className="group block"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.9 }}
                    >
                      <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-4 hover:bg-green-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <MessageSquare className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-base font-semibold text-white mb-1">WhatsApp</h4>
                            <p className="text-gray-300 text-xs">Chat with me directly</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-green-400 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </motion.a>

                    {/* Facebook */}
                    <motion.a
                      href="https://www.facebook.com/MichaelzMediabuyer"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 1 }}
                    >
                      <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl p-4 hover:bg-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-lg font-bold" style={{ fontFamily: 'Arial, sans-serif' }}>f</span>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-base font-semibold text-white mb-1">Facebook</h4>
                            <p className="text-gray-300 text-xs">Follow my professional page</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </motion.a>

                    {/* LinkedIn */}
                    <motion.a
                      href="https://www.linkedin.com/in/michael-zahy/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 1.1 }}
                    >
                      <div className="bg-gradient-to-r from-sky-500/20 to-blue-500/20 border border-sky-500/30 rounded-xl p-4 hover:bg-sky-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/20">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-sky-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Users className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-base font-semibold text-white mb-1">LinkedIn</h4>
                            <p className="text-gray-300 text-xs">Connect professionally</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-sky-400 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </motion.a>

                    {/* Email */}
                    <motion.a
                      href="mailto:Michaelzahy1@gmail.com"
                      className="group block"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 1.2 }}
                    >
                      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-4 hover:bg-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Mail className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-base font-semibold text-white mb-1">Email</h4>
                            <p className="text-gray-300 text-xs">Send me a message anytime</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </motion.a>
                  </div>

                  {/* Response Time */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.3 }}
                    className="mt-4 text-center"
                  >
                    <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-300">Response within 24 hours</span>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Why Work With Me Card */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-3xl p-6 border border-purple-500/30"
                >
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-white mb-2">Why Work With Me?</h3>
                    <p className="text-gray-300 text-sm">
                      Key advantages of partnering with a performance marketing expert.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-white text-sm mb-1">Proven Expertise</h4>
                        <p className="text-xs text-gray-300">Specialized in Meta Ads with exceptional ROI track record.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-white text-sm mb-1">Results-Driven</h4>
                        <p className="text-xs text-gray-300">Data-focused approach with continuous optimization.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-white text-sm mb-1">True Partnership</h4>
                        <p className="text-xs text-gray-300">Work as extension of your team with transparent communication.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-white text-sm mb-1">Cutting-Edge Strategies</h4>
                        <p className="text-xs text-gray-300">Latest marketing approaches to stay ahead of competition.</p>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.4 }}
                    className="mt-6 text-center"
                  >
                    <Button
                      onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                      variant="outline"
                      size="sm"
                      className="bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-white/30 text-xs px-4 py-2"
                    >
                      Start Your Project Today
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}