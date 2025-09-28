'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Cookie, Eye, Settings, Trash2, Shield } from 'lucide-react'
import Link from 'next/link'

export default function CookiePolicy() {
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
              <Cookie className="w-12 h-12 text-purple-400" />
              <h1 className="text-4xl font-bold">Cookie Policy</h1>
            </div>
            <p className="text-xl text-gray-400">Last updated: December 2024</p>
          </div>

          <div className="space-y-8">
            <section className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-white/10">
              <h2 className="text-2xl font-bold mb-4">What Are Cookies?</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the owners of the site.
                </p>
                <p>
                  This Cookie Policy explains how I, Michael Zahy, use cookies and similar technologies on my website.
                </p>
              </div>
            </section>

            <section className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-white/10">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Eye className="w-6 h-6 text-purple-400" />
                How I Use Cookies
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  I use cookies for the following purposes:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Essential Cookies:</strong> These cookies are necessary for the website to function and cannot be switched off in my systems.</li>
                  <li><strong>Analytics Cookies:</strong> These cookies help me understand how visitors interact with my website by providing anonymous information about usage patterns.</li>
                  <li><strong>Marketing Cookies:</strong> These cookies are used to track visitors across websites to display relevant advertisements based on their interests.</li>
                  <li><strong>Functional Cookies:</strong> These cookies enable enhanced functionality and personalization, such as remembering your preferences.</li>
                </ul>
              </div>
            </section>

            <section className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-white/10">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Settings className="w-6 h-6 text-purple-400" />
                Types of Cookies I Use
              </h2>
              <div className="space-y-6 text-gray-300">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Essential Cookies</h3>
                  <p>These cookies are required for the website to operate and include:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Session management cookies</li>
                    <li>Security cookies</li>
                    <li>Load balancing cookies</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Analytics Cookies</h3>
                  <p>I use Google Analytics to understand how visitors use my website:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Number of visitors and sessions</li>
                    <li>Pages visited and time spent on pages</li>
                    <li>Geographic location of visitors</li>
                    <li>Referring websites and traffic sources</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Marketing Cookies</h3>
                  <p>These cookies are used for advertising and marketing purposes:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Meta Pixel for Facebook advertising</li>
                    <li>Google Ads conversion tracking</li>
                    <li>Retargeting and remarketing cookies</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-white/10">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-purple-400" />
                Third-Party Cookies
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  I work with third-party service providers who may also set cookies on your device when you interact with my website. These third parties include:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Google LLC:</strong> For analytics and advertising services</li>
                  <li><strong>Meta Platforms, Inc.:</strong> For Facebook advertising and tracking</li>
                  <li><strong>Other advertising networks:</strong> For display advertising and retargeting</li>
                </ul>
                <p>
                  These third parties have their own privacy policies and cookie policies, and I encourage you to review them.
                </p>
              </div>
            </section>

            <section className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-white/10">
              <h2 className="text-2xl font-bold mb-4">Managing Cookies</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  You have the right to choose whether or not to accept cookies. You can manage your cookie preferences through your browser settings:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                  <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
                  <li><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
                  <li><strong>Edge:</strong> Settings → Privacy, search, and services → Cookies</li>
                </ul>
                <p>
                  Please note that blocking essential cookies may affect the functionality of the website.
                </p>
              </div>
            </section>

            <section className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-white/10">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Trash2 className="w-6 h-6 text-purple-400" />
                Cookie Duration
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  The duration that cookies remain on your device varies:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Session Cookies:</strong> These cookies expire when you close your browser</li>
                  <li><strong>Persistent Cookies:</strong> These cookies remain on your device for a set period or until you delete them</li>
                  <li><strong>Third-Party Cookies:</strong> Duration varies by third-party provider</li>
                </ul>
                <p>
                  You can delete cookies from your device at any time through your browser settings.
                </p>
              </div>
            </section>

            <section className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-white/10">
              <h2 className="text-2xl font-bold mb-4">Cookie Consent</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  When you first visit my website, you may see a cookie banner that allows you to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Accept all cookies</li>
                  <li>Reject non-essential cookies</li>
                  <li>Customize your cookie preferences</li>
                </ul>
                <p>
                  Your preferences will be saved, and you can change them at any time by clicking on the cookie settings link in the footer of the website.
                </p>
              </div>
            </section>

            <section className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-white/10">
              <h2 className="text-2xl font-bold mb-4">International Data Transfers</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Some of the third-party services I use may transfer and process your data outside of Egypt. These third parties are committed to protecting your personal information and comply with applicable data protection laws.
                </p>
                <p>
                  I ensure that all third-party processors provide an adequate level of protection for your personal information.
                </p>
              </div>
            </section>

            <section className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-white/10">
              <h2 className="text-2xl font-bold mb-4">Changes to This Cookie Policy</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  I may update this Cookie Policy from time to time to reflect changes in technology or legal requirements. The updated version will be indicated by an updated "Last updated" date.
                </p>
                <p>
                  I encourage you to review this Cookie Policy frequently for any changes.
                </p>
              </div>
            </section>

            <section className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-white/10">
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  If you have any questions about this Cookie Policy, please contact me:
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