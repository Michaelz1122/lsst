'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Shield, Lock, Eye, Database, Globe, Mail } from 'lucide-react'
import Link from 'next/link'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gradient-to-b from-gray-900 to-black border-b border-white/10">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">MZ</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Michael Zahy
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Shield className="w-12 h-12 text-purple-400" />
              <h1 className="text-4xl font-bold">Privacy Policy</h1>
            </div>
            <p className="text-xl text-gray-400">Last updated: December 2024</p>
          </div>

          <div className="space-y-8">
            <section className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-white/10">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Eye className="w-6 h-6 text-purple-400" />
                Information We Collect
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  I collect information to provide better services to all my clients. The types of information I collect include:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Contact Information:</strong> Name, email address, phone number, and company name when you submit the contact form</li>
                  <li><strong>Business Information:</strong> Company details and budget range for service inquiries</li>
                  <li><strong>Communication Data:</strong> Messages and correspondence through email, WhatsApp, or other contact methods</li>
                  <li><strong>Analytics Data:</strong> Website usage information through Google Analytics and other tracking tools</li>
                </ul>
              </div>
            </section>

            <section className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-white/10">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Lock className="w-6 h-6 text-purple-400" />
                How We Use Your Information
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  I use the information I collect for various purposes, including:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>To provide and maintain my services</li>
                  <li>To respond to your inquiries and service requests</li>
                  <li>To communicate with you about marketing services and campaigns</li>
                  <li>To improve my website and services</li>
                  <li>To send you updates and marketing communications (with your consent)</li>
                  <li>To monitor and analyze usage patterns and trends</li>
                </ul>
              </div>
            </section>

            <section className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-white/10">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Database className="w-6 h-6 text-purple-400" />
                Data Security
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  I take the security of your personal information seriously and implement appropriate technical and organizational measures to protect it against unauthorized access, alteration, disclosure, or destruction.
                </p>
                <p>
                  Your information is stored securely and is only accessible by me and authorized service providers who assist in operating my website and conducting my business.
                </p>
              </div>
            </section>

            <section className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-white/10">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Globe className="w-6 h-6 text-purple-400" />
                Third-Party Services
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  My website may contain links to third-party websites and services. I am not responsible for the privacy practices of these third parties. This Privacy Policy applies only to my website and services.
                </p>
                <p>
                  I use the following third-party services:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Google Analytics:</strong> For website analytics and usage tracking</li>
                  <li><strong>Meta Platforms:</strong> For advertising and marketing campaigns</li>
                  <li><strong>Email Service Providers:</strong> For communication and marketing purposes</li>
                </ul>
              </div>
            </section>

            <section className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-white/10">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Mail className="w-6 h-6 text-purple-400" />
                Your Rights
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  You have certain rights regarding your personal information, including:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>The right to access your personal information</li>
                  <li>The right to correct inaccurate information</li>
                  <li>The right to delete your personal information</li>
                  <li>The right to object to processing of your information</li>
                  <li>The right to data portability</li>
                </ul>
                <p>
                  To exercise these rights, please contact me at <a href="mailto:Michaelzahy1@gmail.com" className="text-purple-400 hover:text-purple-300">Michaelzahy1@gmail.com</a>
                </p>
              </div>
            </section>

            <section className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-white/10">
              <h2 className="text-2xl font-bold mb-4">Changes to This Privacy Policy</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  I may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Last updated" date and the updated version will be effective as soon as it is accessible.
                </p>
                <p>
                  I encourage you to review this Privacy Policy frequently for any changes.
                </p>
              </div>
            </section>

            <section className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-white/10">
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  If you have any questions about this Privacy Policy, please contact me:
                </p>
                <div className="space-y-2">
                  <p><strong>Email:</strong> <a href="mailto:Michaelzahy1@gmail.com" className="text-purple-400 hover:text-purple-300">Michaelzahy1@gmail.com</a></p>
                  <p><strong>WhatsApp:</strong> +20 1069720311</p>
                  <p><strong>Location:</strong> Cairo, Egypt</p>
                </div>
              </div>
            </section>
          </div>
        </motion.div>
      </main>
    </div>
  )
}