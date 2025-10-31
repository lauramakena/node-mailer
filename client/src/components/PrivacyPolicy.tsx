import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft size={20} className="mr-2" />
                Back to Forou Mailer
              </Link>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Privacy Policy</h1>
            </div>
            <div className="w-32"></div> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="prose prose-gray max-w-none">
            <div className="text-sm text-gray-500 mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </div>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Information We Collect</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Forou Mailer collects the following types of information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li><strong>Email credentials:</strong> Your email address and authentication details for sending emails</li>
                <li><strong>Email content:</strong> The HTML content and subject lines you create</li>
                <li><strong>Attachment information:</strong> File names and metadata of attachments you upload</li>
                <li><strong>Usage data:</strong> How you interact with our service (for analytics and improvement)</li>
                <li><strong>Technical data:</strong> IP addresses, browser information, and device details</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">2. How We Use Your Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use the collected information to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Process and send your emails as requested</li>
                <li>Provide customer support and technical assistance</li>
                <li>Improve our service and develop new features</li>
                <li>Ensure security and prevent abuse of our service</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Data Storage and Security</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>Temporary Processing:</strong> Email content and attachments are processed temporarily
                  during the sending process and are not permanently stored on our servers.
                </p>
                <p>
                  <strong>Security Measures:</strong> We implement appropriate technical and organizational
                  measures to protect your personal information against unauthorized access, alteration,
                  disclosure, or destruction.
                </p>
                <p>
                  <strong>Data Retention:</strong> We retain your email credentials and usage data only as
                  long as necessary for the purposes outlined in this policy.
                </p>
                <p>
                  <strong>App Password Security:</strong> We do not save or store any app passwords or
                  authentication tokens. These credentials are used only temporarily during the email sending
                  process and are immediately discarded after use.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Information Sharing</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties, except in the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>When required by law or to protect our rights</li>
                <li>With service providers who assist in operating our service (under strict confidentiality agreements)</li>
                <li>In connection with a business transfer or acquisition</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Cookies and Tracking</h2>
              <p className="text-gray-700 leading-relaxed">
                We may use cookies and similar technologies to enhance your experience with our service.
                You can control cookie settings through your browser preferences. Some features may not
                function properly without certain cookies enabled.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Third-Party Services</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our service integrates with third-party email providers (such as Gmail, Outlook) and uses
                Google AdSense for advertising. These third parties have their own privacy policies:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">Google Privacy Policy</a></li>
                <li><a href="https://privacy.microsoft.com/en-us/privacystatement" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">Microsoft Privacy Policy</a></li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Your Rights</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Access the personal information we hold about you</li>
                <li>Correct inaccurate or incomplete information</li>
                <li>Request deletion of your personal information</li>
                <li>Object to or restrict certain types of processing</li>
                <li>Data portability (receive your data in a structured format)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Children's Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                Our service is not intended for children under 13 years of age. We do not knowingly
                collect personal information from children under 13. If you become aware that a child
                has provided us with personal information, please contact us immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Changes to This Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes
                by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us through our website at{' '}
                <a href="https://forou.tech" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                  forou.tech
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
