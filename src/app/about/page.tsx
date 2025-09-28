'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import { 
  Award, 
  CheckCircle, 
  Star, 
  Target, 
  Users, 
  TrendingUp, 
  BarChart3,
  Zap,
  Rocket,
  Lightbulb,
  Shield,
  Globe,
  Calendar,
  MapPin,
  Mail,
  Phone,
  MessageSquare,
  Download,
  Play,
  UserCheck,
  Briefcase,
  GraduationCap,
  Heart,
  Eye
} from 'lucide-react'

export default function About() {
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

  const navigateToCaseStudies = () => {
    window.location.href = '/case-studies'
  }
  const timeline = [
    {
      year: '2023',
      title: 'Performance Marketing Specialist',
      description: 'Specialized in Meta Ads and performance marketing, achieving exceptional ROI for clients',
      icon: Target
    },
    {
      year: '2022',
      title: 'Media Buyer Specialist',
      description: 'Focused on strategic media buying and campaign optimization across multiple platforms',
      icon: BarChart3
    },
    {
      year: '2021',
      title: 'Digital Marketing Consultant',
      description: 'Started consulting for businesses on digital marketing strategies and implementation',
      icon: Lightbulb
    },
    {
      year: '2020',
      title: 'Marketing Career Begin',
      description: 'Began journey in digital marketing with focus on social media advertising',
      icon: Rocket
    }
  ]

  const skills = [
    { category: 'Advertising Platforms', items: ['Meta Ads', 'Google Ads', 'TikTok Ads'] },
    { category: 'Analytics & Tracking', items: ['Google Analytics', 'Facebook Pixel', 'Conversion Tracking', 'ROI Analysis'] },
    { category: 'Strategy & Planning', items: ['Campaign Strategy', 'Audience Research', 'A/B Testing', 'Budget Optimization'] },
    { category: 'Creative & Content', items: ['Ad Creative', 'Copywriting', 'Visual Design', 'Video Production'] }
  ]

  const achievements = [
    { title: '200K+ EGP', description: 'Ad Spend Managed', icon: BarChart3 },
    { title: '4.2x', description: 'Average ROI', icon: TrendingUp },
    { title: '20+', description: 'Happy Clients', icon: Users },
    { title: '85+', description: 'Successful Campaigns', icon: Award }
  ]

  const values = [
    {
      title: 'Results-Driven',
      description: 'Focused on delivering measurable results and maximizing ROI for every campaign',
      icon: Target
    },
    {
      title: 'Data-Backed',
      description: 'All decisions are based on thorough data analysis and performance metrics',
      icon: BarChart3
    },
    {
      title: 'Client-Centric',
      description: 'Building long-term partnerships through transparency and exceptional service',
      icon: Heart
    },
    {
      title: 'Innovative',
      description: 'Continuously exploring new strategies and technologies to stay ahead of the curve',
      icon: Lightbulb
    }
  ]

  const reviews = [
    {
      name: 'Ahmed Hassan',
      company: 'E-commerce Store Owner',
      text: 'Michael helped us achieve 11.1x ROAS in just 3 months. His expertise in Facebook ads is unmatched!',
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <Navigation currentPath="/about" />

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
              <UserCheck className="w-4 h-4" />
              <span className="text-sm font-medium">About Michael Zahy</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Passionate About Growth
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Strategic media buyer and performance marketing expert dedicated to helping businesses achieve exceptional results through data-driven digital advertising campaigns.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
                >
                  <achievement.icon className="w-8 h-8 mx-auto mb-3 text-purple-400" />
                  <div className="text-2xl font-bold text-white mb-1">{achievement.title}</div>
                  <div className="text-sm text-gray-400">{achievement.description}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* My Story Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  My Story
                </span>
              </h2>
              <div className="space-y-4 text-gray-300">
                <p className="text-lg leading-relaxed">
                  My journey in digital marketing began with a simple realization: businesses need more than just advertising—they need strategic, data-driven marketing that delivers measurable results.
                </p>
                <p className="text-lg leading-relaxed">
                  Starting in 2020, I immersed myself in the world of performance marketing, quickly discovering my passion for Facebook advertising and media buying. What started as curiosity soon became a expertise as I helped businesses transform their digital presence.
                </p>
                <p className="text-lg leading-relaxed">
                  Today, I specialize in creating high-converting Facebook and Instagram campaigns that consistently deliver exceptional ROI. My approach combines creative thinking with analytical rigor, ensuring every advertising dollar is maximized for optimal performance.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center">
                <div className="text-center p-8">
                  <Briefcase className="w-24 h-24 mx-auto mb-4 text-purple-400" />
                  <p className="text-gray-300">Professional workspace</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Professional Journey</h2>
            <p className="text-xl text-gray-400">Key milestones in my marketing career</p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className="flex-1">
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-white/10">
                    <div className="flex items-center gap-3 mb-3">
                      <item.icon className="w-6 h-6 text-purple-400" />
                      <span className="text-purple-400 font-semibold">{item.year}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-300">{item.description}</p>
                  </div>
                </div>
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-8">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Core Competencies</h2>
            <p className="text-xl text-gray-400">Specialized skills and expertise</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {skills.map((skillGroup, index) => (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-white/10"
              >
                <h3 className="text-xl font-bold text-white mb-6">{skillGroup.category}</h3>
                <div className="space-y-3">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <div key={skill} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">{skill}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">My Values</h2>
            <p className="text-xl text-gray-400">Principles that guide my work</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-white/10"
              >
                <value.icon className="w-12 h-12 mb-4 text-purple-400" />
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-gray-300">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Client Reviews</h2>
            <p className="text-xl text-gray-400">What businesses say about working with me</p>
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
                Ready to Grow Your Business?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Let's discuss how my performance marketing expertise can help you achieve exceptional results and scale your business to new heights.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={navigateToContact}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
              >
                Get Started
              </button>
              <button 
                onClick={navigateToCaseStudies}
                className="px-8 py-4 border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300"
              >
                View Case Studies
              </button>
            </div>
          </motion.div>
        </div>
      </section>
      </div>
    </div>
  )
}