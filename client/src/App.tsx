import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {
  useUser,
  SignIn,
  UserButton,
  RedirectToSignIn
} from '@clerk/clerk-react';
import { Toaster } from 'react-hot-toast';
import EmailForm from './components/EmailForm';
import { AdBanner, SidebarAd } from './components/ads';
import TermsAndConditions from './components/TermsAndConditions';
import PrivacyPolicy from './components/PrivacyPolicy';
import LandingPage from './components/LandingPage';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>; // Or a proper loading component
  }

  if (!user) {
    return <RedirectToSignIn />;
  }

  return <>{children}</>;
};

const MainPage: React.FC = () => (
  <div className="min-h-screen bg-gray-50">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />
      
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 lg:py-6">
            <div className="flex items-center space-x-2 lg:space-x-4">
              <Link
                to="/"
                className="text-gray-600 hover:text-gray-900 transition-colors text-xs lg:text-sm"
              >
                ← Back to Home
              </Link>
              <div>
                <h1 className="text-xl lg:text-3xl font-bold text-gray-900">LETTERLY</h1>
                <p className="text-sm lg:text-base text-gray-600 mt-1">Send HTML emails with attachments</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 lg:space-x-4">
              <div className="text-xs lg:text-sm text-gray-500 hidden sm:block">Powered by</div>
              <a href="https://forou.tech" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium text-xs lg:text-sm">forou.tech</a>
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </div>
      </header>

      {/* Header Banner Ad */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <AdBanner
            slot={process.env.REACT_APP_ADSENSE_HEADER_SLOT || "1234567890"}
            format="horizontal"
            className="text-center"
          />
        </div>
      </div>

      <main className="py-4 lg:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <EmailForm />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <SidebarAd
                slot={process.env.REACT_APP_ADSENSE_SIDEBAR_SLOT || "0987654321"}
                className="sticky top-8"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer Banner Ad */}
      <div className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <AdBanner
            slot={process.env.REACT_APP_ADSENSE_FOOTER_SLOT || "1122334455"}
            format="horizontal"
            className="text-center"
          />
        </div>
      </div>

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
          </div>
        </div>
      </footer>

  </div>
);

function App() {
  return (
    <Router>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sign-in/*" element={<SignIn routing="path" path="/sign-in" />} />
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          }
        />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
      </Routes>
    </Router>
  );
}

export default App; 