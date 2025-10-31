import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser, SignInButton } from '@clerk/clerk-react';
import { Mail, Paperclip, Zap, Shield, Star, ArrowRight, CheckCircle, User } from 'lucide-react';
import { AdBanner } from './ads';

const LandingPage: React.FC = () => {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    // Handle hash navigation for tutorial section
    if (window.location.hash === '#gmail-tutorial') {
      setTimeout(() => {
        const element = document.getElementById('gmail-tutorial');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 lg:py-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Forou Mailer</h1>
              <p className="text-sm lg:text-base text-gray-600 mt-1">Send HTML emails with attachments</p>
            </div>
            <div className="flex items-center space-x-2 lg:space-x-4">
              {user ? (
                <Link
                  to="/app"
                  className="bg-blue-600 text-white px-4 lg:px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm lg:text-base inline-flex items-center"
                  title="Go to your dashboard"
                >
                  <User className="w-4 h-4 mr-2" />
                  Dashboard
                </Link>
              ) : (
                <SignInButton mode="modal">
                  <button className="bg-blue-600 text-white px-4 lg:px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm lg:text-base inline-flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Get Started
                  </button>
                </SignInButton>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4 lg:mb-6">
              Send Beautiful HTML Emails
              <span className="block text-blue-600">with Attachments</span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 mb-6 lg:mb-8 max-w-3xl mx-auto px-4">
              Forou Mailer makes it easy to send professional HTML emails with attachments.
              Convert plain text to HTML, customize your emails, and send them securely.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 px-4">
              {user ? (
                <Link
                  to="/app"
                  className="bg-blue-600 text-white px-6 lg:px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-base lg:text-lg inline-flex items-center justify-center"
                >
                  <User className="w-5 h-5 mr-2" />
                  Go to Dashboard
                  <ArrowRight className="inline-block ml-2" size={20} />
                </Link>
              ) : (
                <SignInButton mode="modal">
                  <button className="bg-blue-600 text-white px-6 lg:px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-base lg:text-lg inline-flex items-center justify-center">
                    <User className="w-5 h-5 mr-2" />
                    Get Started
                    <ArrowRight className="inline-block ml-2" size={20} />
                  </button>
                </SignInButton>
              )}
              <a
                href="#features"
                className="border border-gray-300 text-gray-700 px-6 lg:px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium text-base lg:text-lg inline-flex items-center justify-center"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Powerful Email Features</h2>
            <p className="text-base lg:text-lg text-gray-600">Everything you need to send professional emails</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="bg-gray-50 p-4 lg:p-6 rounded-lg">
              <div className="bg-blue-100 w-10 h-10 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center mb-3 lg:mb-4">
                <Mail className="text-blue-600" size={20} />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">HTML Email Support</h3>
              <p className="text-sm lg:text-base text-gray-600">
                Send rich HTML emails with custom styling, images, and formatting.
                Convert plain text to beautiful HTML automatically.
              </p>
            </div>

            <div className="bg-gray-50 p-4 lg:p-6 rounded-lg">
              <div className="bg-green-100 w-10 h-10 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center mb-3 lg:mb-4">
                <Paperclip className="text-green-600" size={20} />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">File Attachments</h3>
              <p className="text-sm lg:text-base text-gray-600">
                Attach multiple files to your emails. Support for various file types
                including documents, images, and archives.
              </p>
            </div>

            <div className="bg-gray-50 p-4 lg:p-6 rounded-lg">
              <div className="bg-purple-100 w-10 h-10 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center mb-3 lg:mb-4">
                <Zap className="text-purple-600" size={20} />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">AI-Powered Tools</h3>
              <p className="text-sm lg:text-base text-gray-600">
                Use AI to convert plain text to HTML and customize your email content
                with smart suggestions and improvements.
              </p>
            </div>

            <div className="bg-gray-50 p-4 lg:p-6 rounded-lg">
              <div className="bg-red-100 w-10 h-10 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center mb-3 lg:mb-4">
                <Shield className="text-red-600" size={20} />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">Secure & Private</h3>
              <p className="text-sm lg:text-base text-gray-600">
                Your emails are sent securely with industry-standard encryption.
                We respect your privacy and don't store your email content.
              </p>
            </div>

            <div className="bg-gray-50 p-4 lg:p-6 rounded-lg">
              <div className="bg-yellow-100 w-10 h-10 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center mb-3 lg:mb-4">
                <Star className="text-yellow-600" size={20} />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">Easy to Use</h3>
              <p className="text-sm lg:text-base text-gray-600">
                Simple, intuitive interface that works on all devices.
                No complex setup required - just enter your credentials and start sending.
              </p>
            </div>

            <div className="bg-gray-50 p-4 lg:p-6 rounded-lg">
              <div className="bg-indigo-100 w-10 h-10 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center mb-3 lg:mb-4">
                <CheckCircle className="text-indigo-600" size={20} />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">Gmail Integration</h3>
              <p className="text-sm lg:text-base text-gray-600">
                Full support for Gmail and other email providers.
                Use App Passwords for enhanced security with Gmail accounts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-base lg:text-lg text-gray-600">Get started in just three simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-lg lg:text-2xl font-bold">
                1
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">Enter Your Credentials</h3>
              <p className="text-sm lg:text-base text-gray-600">
                Connect your email account securely. We support Gmail, Outlook, and other providers.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-lg lg:text-2xl font-bold">
                2
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">Create Your Email</h3>
              <p className="text-sm lg:text-base text-gray-600">
                Write your message, convert to HTML, add attachments, and customize as needed.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-lg lg:text-2xl font-bold">
                3
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">Send with Confidence</h3>
              <p className="text-sm lg:text-base text-gray-600">
                Send your professional HTML emails securely with full delivery confirmation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gmail App Password Tutorial */}
      <section id="gmail-tutorial" className="py-12 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Gmail Setup Tutorial</h2>
            <p className="text-base lg:text-lg text-gray-600">
              Learn how to create an App Password for secure Gmail integration
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
                <iframe
                  src="https://www.youtube.com/embed/lSURGX0JHbA"
                  title="How to Get Gmail App Password"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full rounded-t-lg"
                ></iframe>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Why You Need an App Password</h3>
                <p className="text-gray-600 mb-4">
                  For Gmail users, Google requires App Passwords instead of regular passwords for third-party applications.
                  This video shows you exactly how to generate and use an App Password securely.
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                  <div className="flex">
                    <div className="ml-3">
                      <p className="text-sm text-blue-700">
                        <strong>Important:</strong> Never share your App Password with anyone.
                        Use it only for connecting Forou Mailer to your Gmail account.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 lg:py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">Ready to Send Better Emails?</h2>
          <p className="text-lg lg:text-xl text-blue-100 mb-6 lg:mb-8">
            Join thousands of users who trust Forou Mailer for their email needs.
          </p>
          {user ? (
            <Link
              to="/app"
              className="bg-white text-blue-600 px-6 lg:px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium text-base lg:text-lg inline-flex items-center"
            >
              <User className="w-5 h-5 mr-2" />
              Go to Dashboard
              <ArrowRight className="inline-block ml-2" size={20} />
            </Link>
          ) : (
            <SignInButton mode="modal">
              <button className="bg-white text-blue-600 px-6 lg:px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium text-base lg:text-lg inline-flex items-center">
                <User className="w-5 h-5 mr-2" />
                Get Started
                <ArrowRight className="inline-block ml-2" size={20} />
              </button>
            </SignInButton>
          )}
        </div>
      </section>

      {/* Header Banner Ad */}
      <div className="bg-gray-100 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <AdBanner
            slot={process.env.REACT_APP_ADSENSE_HEADER_SLOT || "1234567890"}
            format="horizontal"
            className="text-center"
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          <div className="text-center text-gray-500 text-xs lg:text-sm">
            <p>Forou Mailer Application - Built with React, TypeScript, and Node.js</p>
            <p className="mt-2">
              For Gmail users: Use an App Password instead of your regular password for better security.
            </p>
            <div className="mt-4 flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-6">
              <Link
                to="/terms"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Terms and Conditions
              </Link>
              <Link
                to="/privacy"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Privacy Policy
              </Link>
            </div>
            <div className="mt-4">
              <a href="https://forou.tech" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium">
                Powered by forou.tech
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
