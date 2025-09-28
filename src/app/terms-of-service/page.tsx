'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, FileText, CheckCircle, AlertCircle, XCircle, Clock } from 'lucide-react'
import Link from 'next/link'

export default function TermsOfService() {
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
              <FileText className="w-12 h-12 text-purple-400" />
              <h1 className="text-4xl font-bold">Terms of Service</h1>
            </div>
            <p className="text-xl text-gray-400">Last updated: December 2024</p>
          </div>

          <div className="space-y-8">
            <section className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-white/10">
              <h2 className="text-2xl font-bold mb-4">Acceptance of Terms</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  By accessing and using this website and the services provided by Michael Zahy ("I", "me", or "my"), you accept and agree to be bound by the terms and provision of this agreement.
                </p>
                <p>
                  These Terms of Service govern your use of my website, services, and any content or features offered through them.
                </p>
              </div>
            </section>

            <section className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-white/10">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-purple-400" />
                Services Description
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  I provide performance marketing and media buying services, including but not limited to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Facebook and Instagram advertising management</li>
                  <li>Performance marketing strategy and implementation</li>
                  <li>Media buying and campaign optimization</li>
                  <li>Data analytics and conversion optimization</li>
                  <li>Growth hacking and digital marketing consulting</li>
                </ul>
                <p>
                  All services are provided on a professional basis and are subject to separate agreements and pricing structures.
                </p>
              </div>
            </section>

            <section className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-white/10">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-purple-400" />
                User Responsibilities
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  As a user of my website and services, you agree to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide accurate and complete information when submitting inquiries</li>
                  <li>Use the website and services for lawful purposes only</li>
                  <li>Not engage in any activity that interferes with or disrupts the website</li>
                  <li>Not attempt to gain unauthorized access to any portion of the website</li>
                  <li>Respect intellectual property rights and not reproduce content without permission</li>
                </ul>
              </div>
            </section>

            <section className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-white/10">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <XCircle className="w-6 h-6 text-purple-400" />
                Prohibited Activities
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  You are strictly prohibited from:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Using the website for any illegal or unauthorized purpose</li>
                  <li>Submitting false or misleading information</li>
                  <li>Harassing, abusing, or harming other users</li>
                  <li>Uploading or transmitting viruses or malicious code</li>
                  <li>Collecting or harvesting user information without consent</li>
                  <li>Impersonating me or any other person or entity</li>
                </ul>
              </div>
            </section>

            <section className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-white/10">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Clock className="w-6 h-6 text-purple-400" />
                Payment Terms
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  For paid services, the following terms apply:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>All fees and pricing will be clearly communicated before service commencement</li>
                  <li>Payment terms and schedules will be outlined in service agreements</li>
                  <li>Late payments may incur additional fees or service suspension</li>
                  <li>Refunds are subject to the specific terms of each service agreement</li>
                  <li>I reserve the right to modify pricing with reasonable notice</li>
                </ul>
              </div>
            </section>

            <section className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-white/10">
              <h2 className="text-2xl font-bold mb-4">Intellectual Property</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  All content on this website, including text, graphics, logos, images, and software, is the property of Michael Zahy or my content suppliers and is protected by intellectual property laws.
                </p>
                <p>
                  You may not reproduce, distribute, modify, create derivative works of, publicly display, or perform any content from this website without my prior written permission.
                </p>
              </div>
            </section>

            <section className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-white/10">
              <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  I shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the website or services.
                </p>
                <p>
                  My total liability for any claims arising from these Terms of Service shall not exceed the fees paid by you for the services in the six months preceding the claim.
                </p>
              </div>
            </section>

            <section className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-white/10">
              <h2 className="text-2xl font-bold mb-4">Termination</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  I reserve the right to terminate or suspend your access to the website and services immediately, without prior notice, for any reason whatsoever, including without limitation if you breach the Terms of Service.
                </p>
                <p>
                  Upon termination, your right to use the website and services will cease immediately.
                </p>
              </div>
            </section>

            <section className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-white/10">
              <h2 className="text-2xl font-bold mb-4">Governing Law</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  These Terms of Service shall be governed by and construed in accordance with the laws of Egypt, without regard to its conflict of law provisions.
                </p>
                <p>
                  Any disputes arising from these terms shall be resolved through arbitration in Cairo, Egypt.
                </p>
              </div>
            </section>

            <section className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-white/10">
              <h2 className="text-2xl font-bold mb-4">Changes to Terms</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  I reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting on the website.
                </p>
                <p>
                  Your continued use of the website after any changes constitutes acceptance of the new Terms of Service.
                </p>
              </div>
            </section>

            <section className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-white/10">
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  If you have any questions about these Terms of Service, please contact me:
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