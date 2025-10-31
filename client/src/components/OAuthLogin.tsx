import React, { useState } from 'react';
import { Mail, Shield, ExternalLink } from 'lucide-react';
import { oauthApi, OAuthTokens, UserInfo } from '../services/oauthApi';
import toast from 'react-hot-toast';

interface OAuthLoginProps {
  onAuthSuccess: (tokens: OAuthTokens, userInfo: UserInfo) => void;
}

const OAuthLogin: React.FC<OAuthLoginProps> = ({ onAuthSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [authUrl, setAuthUrl] = useState<string>('');

  const handleOAuthLogin = async () => {
    setIsLoading(true);
    try {
      const response = await oauthApi.getAuthUrl();
      if (response.success && response.authUrl) {
        setAuthUrl(response.authUrl);
        // Store current URL to return to after OAuth
        sessionStorage.setItem('oauth_return_url', window.location.href);
        // Redirect to OAuth URL
        window.location.href = response.authUrl;
      } else {
        toast.error('Failed to get OAuth URL');
      }
    } catch (error) {
      toast.error('OAuth login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card mb-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
        <Shield className="w-6 h-6 mr-2 text-primary-600" />
        Secure OAuth Authentication
      </h2>
      
      <div className="mb-4">
        <p className="text-gray-600 mb-4">
          Connect your Gmail account securely using OAuth 2.0. This method is more secure than using app passwords.
        </p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <h3 className="font-medium text-blue-900 mb-2">Benefits of OAuth:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• No need to generate app passwords</li>
            <li>• More secure authentication</li>
            <li>• Automatic token refresh</li>
            <li>• Better user experience</li>
          </ul>
        </div>
      </div>

      <button
        onClick={handleOAuthLogin}
        disabled={isLoading}
        className="btn-primary w-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Mail className="w-4 h-4 mr-2" />
        {isLoading ? 'Connecting...' : 'Connect with Google OAuth'}
      </button>

      {authUrl && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">
            If the popup didn't open, click the link below:
          </p>
          <a
            href={authUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:text-primary-700 text-sm flex items-center"
          >
            <ExternalLink className="w-3 h-3 mr-1" />
            Open Google OAuth
          </a>
        </div>
      )}
    </div>
  );
};

export default OAuthLogin;
