// ============================================
// WESPA Website - Privacy Policy Page
// ============================================

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'WESPA Privacy Policy - How we collect, use, and protect your personal information.',
}

export default function PrivacyPage() {
  return (
    <div className="py-20 lg:py-32">
      <div className="container-wespa">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold text-stone-900 mb-8">
            Privacy Policy
          </h1>
          <p className="text-stone-500 mb-12">Last updated: December 2024</p>

          <div className="prose prose-stone prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-stone-900 mb-4">1. Introduction</h2>
              <p className="text-stone-600 mb-4">
                WESPA ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-stone-900 mb-4">2. Information We Collect</h2>
              <p className="text-stone-600 mb-4">We may collect information about you in various ways:</p>
              <ul className="list-disc pl-6 text-stone-600 space-y-2">
                <li><strong>Personal Data:</strong> Name, email address, phone number, company name, and billing information</li>
                <li><strong>Usage Data:</strong> Information about how you use our website and services</li>
                <li><strong>Device Data:</strong> Browser type, operating system, IP address</li>
                <li><strong>Location Data:</strong> General location based on IP address</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-stone-900 mb-4">3. How We Use Your Information</h2>
              <p className="text-stone-600 mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 text-stone-600 space-y-2">
                <li>Provide and maintain our services</li>
                <li>Process transactions and send related information</li>
                <li>Send administrative information and updates</li>
                <li>Respond to inquiries and offer support</li>
                <li>Analyze usage to improve our services</li>
                <li>Send marketing communications (with your consent)</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-stone-900 mb-4">4. Information Sharing</h2>
              <p className="text-stone-600 mb-4">
                We do not sell your personal information. We may share your information with:
              </p>
              <ul className="list-disc pl-6 text-stone-600 space-y-2">
                <li>Service providers who assist in our operations</li>
                <li>Professional advisors (lawyers, accountants)</li>
                <li>Law enforcement when required by law</li>
                <li>Business partners with your consent</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-stone-900 mb-4">5. Data Security</h2>
              <p className="text-stone-600 mb-4">
                We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-stone-900 mb-4">6. Your Rights</h2>
              <p className="text-stone-600 mb-4">Under GDPR and applicable laws, you have the right to:</p>
              <ul className="list-disc pl-6 text-stone-600 space-y-2">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing</li>
                <li>Data portability</li>
                <li>Withdraw consent</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-stone-900 mb-4">7. Contact Us</h2>
              <p className="text-stone-600 mb-4">
                If you have questions about this Privacy Policy, please contact us at:
              </p>
              <p className="text-stone-600">
                <strong>WESPA</strong><br />
                Radnička cesta 52<br />
                10000 Zagreb, Croatia<br />
                Email: privacy@wespa.hr<br />
                Phone: +385 1 234 5678
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
