// ============================================
// WESPA Website - Terms of Service Page
// ============================================

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'WESPA Terms of Service - The rules and guidelines for using our workspace and services.',
}

export default function TermsPage() {
  return (
    <div className="py-20 lg:py-32">
      <div className="container-wespa">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold text-stone-900 mb-8">
            Terms of Service
          </h1>
          <p className="text-stone-500 mb-12">Last updated: December 2024</p>

          <div className="prose prose-stone prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-stone-900 mb-4">1. Agreement to Terms</h2>
              <p className="text-stone-600 mb-4">
                By accessing or using WESPA's services, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-stone-900 mb-4">2. Services Description</h2>
              <p className="text-stone-600 mb-4">
                WESPA provides flexible workspace solutions including:
              </p>
              <ul className="list-disc pl-6 text-stone-600 space-y-2">
                <li>Coworking spaces and hot desks</li>
                <li>Dedicated desks and private offices</li>
                <li>Meeting rooms and event spaces</li>
                <li>Hospitality services (restaurants and lounges)</li>
                <li>Business support services</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-stone-900 mb-4">3. Membership and Access</h2>
              <p className="text-stone-600 mb-4">
                Members must be at least 18 years old. Access to our spaces requires a valid membership or booking. Members are responsible for maintaining the confidentiality of their account credentials.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-stone-900 mb-4">4. Payment Terms</h2>
              <p className="text-stone-600 mb-4">
                Membership fees are billed monthly or annually as per your chosen plan. Payments are due in advance. We reserve the right to modify pricing with 30 days' notice.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-stone-900 mb-4">5. Cancellation Policy</h2>
              <p className="text-stone-600 mb-4">
                Monthly memberships require 30 days' written notice for cancellation. Annual memberships are non-refundable but may be transferred. Meeting room and event bookings may be cancelled up to 48 hours in advance for a full refund.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-stone-900 mb-4">6. Code of Conduct</h2>
              <p className="text-stone-600 mb-4">Members agree to:</p>
              <ul className="list-disc pl-6 text-stone-600 space-y-2">
                <li>Treat staff and other members with respect</li>
                <li>Maintain a professional environment</li>
                <li>Keep noise levels appropriate</li>
                <li>Not conduct illegal activities</li>
                <li>Follow our House Rules</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-stone-900 mb-4">7. Liability</h2>
              <p className="text-stone-600 mb-4">
                WESPA is not liable for any loss or damage to personal belongings. Members are responsible for their own insurance. Our liability is limited to the amount paid for services.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-stone-900 mb-4">8. Intellectual Property</h2>
              <p className="text-stone-600 mb-4">
                All content on our website and in our spaces, including logos, text, and images, is the property of WESPA and protected by copyright laws.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-stone-900 mb-4">9. Termination</h2>
              <p className="text-stone-600 mb-4">
                We reserve the right to terminate or suspend access to our services immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-stone-900 mb-4">10. Contact</h2>
              <p className="text-stone-600 mb-4">
                For questions about these Terms, contact us at:
              </p>
              <p className="text-stone-600">
                <strong>WESPA</strong><br />
                Radnička cesta 52<br />
                10000 Zagreb, Croatia<br />
                Email: legal@wespa.hr<br />
                Phone: +385 1 234 5678
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
