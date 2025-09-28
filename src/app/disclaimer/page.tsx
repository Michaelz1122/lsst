'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, AlertTriangle, Info, Shield, Target, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default function Disclaimer() {
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
              <AlertTriangle className="w-12 h-12 text-purple-400" />
              <h1 className="text-4xl font-bold">Disclaimer</h1>
            </div>
            <p className="text-xl text-gray-400">Last updated: December 2024</p>
          </div>

          <div className="space-y-8">
            <section className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-white/10">
              <h2 className="text-2xl font-bold mb-4">General Disclaimer</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  The information provided on this website by Michael Zahy is for general informational purposes only. All information on the Site is provided in good faith, however I make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability or completeness of any information on the Site.
                </p>
                <p>
                  Under no circumstance shall I have any liability to you for any loss or damage of any kind incurred as a result of the use of the Site or reliance on any information provided on the Site. Your use of the Site and your reliance on any information on the Site is solely at your own risk.
                </p>
              </div>
            </section>

            <section className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-white/10">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Target className="w-6 h-6 text-purple-400" />
                Professional Services Disclaimer
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  The performance marketing and media buying services offered by Michael Zahy are provided on a professional basis. However, I cannot guarantee specific results or outcomes from marketing campaigns, as these depend on various factors including:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Market conditions and competition</li>
                  <li>Product or service quality and pricing</li>
                  <li>Target audience responsiveness</li>
                  <li>Budget constraints and timing</li>
                  <li>External factors beyond my control</li>
                </ul>
                <p>
                  All case studies, testimonials, and results displayed on this website are based on past performance and are not indicative of future results. Individual results may vary.
                </p>
              </div>
            </section>

            <section className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-white/10">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-purple-400" />
                Marketing Results Disclaimer
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Any statements regarding potential returns on investment (ROI), conversion rates, or other performance metrics are estimates based on historical data and industry standards. These are not guarantees of future performance.
                </p>
                <p>
                  Factors that may affect actual results include:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Changes in advertising platform algorithms and policies</li>
                  <li>Market saturation and competitive landscape</li>
                  <li>Economic conditions and consumer behavior</li>
                  <li>Product or service changes and pricing strategies</li>
                  <li>Seasonal fluctuations and trends</li>
                </ul>
                <p>
                  I recommend that all clients set realistic expectations and understand that digital marketing requires ongoing optimization and adaptation.
                </p>
              </div>
            </section>

            <section className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-white/10">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Info className="w-6 h-6 text-purple-400" />
                Third-Party Links and Content
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  My website may contain links to third-party websites, products, or services. These links are provided for your convenience and do not constitute my endorsement of or responsibility for the content, products, or services offered by third parties.
                </p>
                <p>
                  I am not responsible for the accuracy, reliability, or legality of any third-party websites or services. Your use of third-party websites is at your own risk and subject to their terms and conditions and privacy policies.
                </p>
              </div>
            </section>

            <section className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-white/10">
              <h2 className="text-2xl font-bold mb-4">Financial and Investment Disclaimer</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Any information provided regarding marketing budgets, advertising spend, or financial projections is for educational and informational purposes only. This information should not be considered financial advice.
                </p>
                <p>
                  I recommend that all clients consult with qualified financial advisors before making any investment decisions related to marketing budgets or advertising expenditures.
                </p>
              </div>
            </section>

            <section className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-white/10">
              <h2 className="text-2xl font-bold mb-4">Technical Disclaimer</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  I make every effort to ensure that this website is available and functioning properly. However, I cannot guarantee that the Site will be available at all times or that it will be free from errors, viruses, or other harmful components.
                </p>
                <p>
                  I reserve the right to modify, suspend, or discontinue the Site (or any part of it) at any time without notice. I shall not be liable to you or any third party for any modification, suspension, or discontinuation of the Site.
                </p>
              </div>
            </section>

            <section className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-white/10">
              <h2 className="text-2xl font-bold mb-4">Legal Compliance</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  I strive to ensure that all services provided comply with applicable laws and regulations, including but not limited to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Data protection and privacy laws</li>
                  <li>Advertising and marketing regulations</li>
                  <li>Consumer protection laws</li>
                  <li>Platform-specific policies (Facebook, Instagram, Google, etc.)</li>
                </ul>
                <p>
                  However, it is the responsibility of clients to ensure that their products, services, and marketing activities comply with all applicable laws and regulations in their jurisdiction.
                </p>
              </div>
            </section>

            <section className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-white/10">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-purple-400" />
                Limitation of Liability
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  In no event shall Michael Zahy be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of or related to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Your use of or inability to use the website</li>
                  <li>Any services provided or not provided</li>
                  <li>Unauthorized access to or use of our secure servers</li>
                  <li>Any interruption or cessation of transmission to or from the website</li>
                  <li>Any bugs, viruses, trojan horses, or the like that may be transmitted to or through the website</li>
                  <li>Any errors or omissions in any content or for any loss or damage incurred as a result of the use of any content posted, emailed, transmitted, or otherwise made available through the website</li>
                </ul>
              </div>
            </section>

            <section className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-white/10">
              <h2 className="text-2xl font-bold mb-4">Indemnification</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  You agree to indemnify and hold harmless Michael Zahy and my officers, directors, employees, and agents from and against any and all claims, damages, obligations, losses, liabilities, costs, or debt, and expenses (including but not limited to attorney's fees) arising from:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Your use of and access to the website</li>
                  <li>Violation of any term of these Terms of Service</li>
                  <li>Violation of any third-party right, including without limitation any copyright, property, or privacy right</li>
                  <li>Any claim that one of your User Submissions caused damage to a third party</li>
                </ul>
              </div>
            </section>

            <section className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-white/10">
              <h2 className="text-2xl font-bold mb-4">Changes to This Disclaimer</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  I reserve the right to amend this disclaimer at any time. Any changes will be immediately posted on the website and will be effective as soon as they are posted.
                </p>
                <p>
                  I encourage you to review this disclaimer frequently for any changes. Your continued use of the website constitutes acceptance of these changes.
                </p>
              </div>
            </section>

            <section className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-white/10">
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  If you have any questions about this Disclaimer, please contact me:
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