import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsAndConditions: React.FC = () => {
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
              <h1 className="text-2xl font-bold text-gray-900">Terms and Conditions</h1>
            </div>
            <div className="w-32"></div> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">

        <div className="p-6 space-y-6 text-gray-700">
          <div className="text-sm text-gray-500 mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </div>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
            <p className="leading-relaxed">
              By accessing and using Forou Mailer ("the Service"), you accept and agree to be bound by the terms
              and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Description of Service</h2>
            <p className="leading-relaxed">
              Forou Mailer is a web-based application that allows users to send HTML emails with attachments.
              The service is provided by Forou Tech and is intended for legitimate email communication purposes only.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. User Responsibilities</h2>
            <div className="space-y-2">
              <p className="leading-relaxed">
                By using Forou Mailer, you agree to:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Use the service only for lawful purposes</li>
                <li>Not send spam, unsolicited emails, or violate anti-spam laws</li>
                <li>Not send malicious content, viruses, or harmful attachments</li>
                <li>Respect the privacy and rights of email recipients</li>
                <li>Provide accurate sender information</li>
                <li>Not attempt to circumvent service limitations or security measures</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Service Limitations</h2>
            <div className="space-y-2">
              <p className="leading-relaxed">
                The service may have certain limitations including but not limited to:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Email sending rate limits</li>
                <li>Attachment size restrictions</li>
                <li>Service availability and uptime</li>
                <li>Technical support availability</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Privacy and Data Protection</h2>
            <p className="leading-relaxed">
              Your privacy is important to us. We collect and process personal information in accordance with our Privacy Policy.
              Email content and attachments are processed temporarily for delivery purposes and are not stored permanently on our servers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Prohibited Uses</h2>
            <div className="space-y-2">
              <p className="leading-relaxed">
                You may not use the service to:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Send spam or unsolicited commercial emails</li>
                <li>Send fraudulent, deceptive, or misleading content</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Harass, abuse, or harm others</li>
                <li>Send malicious software or viruses</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Intellectual Property</h2>
            <p className="leading-relaxed">
              The Forou Mailer service and its original content, features, and functionality are owned by Forou Tech
              and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Disclaimer of Warranties</h2>
            <p className="leading-relaxed">
              The service is provided on an "as is" and "as available" basis. Forou Tech makes no representations or warranties
              of any kind, express or implied, as to the operation of the service or the information, content, or materials included therein.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Limitation of Liability</h2>
            <p className="leading-relaxed">
              In no event shall Forou Tech be liable for any damages whatsoever arising out of the use of or inability to use the service,
              even if advised of the possibility of such damages.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Service Modifications</h2>
            <p className="leading-relaxed">
              Forou Tech reserves the right to modify or discontinue the service at any time without notice.
              We shall not be liable to you or any third party for any modification, suspension, or discontinuance of the service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Governing Law</h2>
            <p className="leading-relaxed">
              These terms and conditions are governed by and construed in accordance with applicable laws,
              and any disputes relating to these terms and conditions will be subject to the exclusive jurisdiction of the courts.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">12. Contact Information</h2>
            <p className="leading-relaxed">
              If you have any questions about these Terms and Conditions, please contact us through our website at{' '}
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

export default TermsAndConditions;
