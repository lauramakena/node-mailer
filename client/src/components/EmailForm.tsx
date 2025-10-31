import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Paperclip, Send, TestTube, Trash2, Eye, EyeOff, HelpCircle, Wand2, Palette, Sparkles, Shield } from 'lucide-react';
import { useAuth } from '@clerk/clerk-react';
import { emailApi } from '../services/emailApi';
import { aiApi } from '../services/aiApi';
import { templateApi } from '../services/templateApi';
import { EmailCredentials, EmailData } from '../types/email';
import TemplateManager from './TemplateManager';
import toast from 'react-hot-toast';

const EmailForm: React.FC = () => {
  const { userId } = useAuth();
  const [credentials, setCredentials] = useState<EmailCredentials>({
    email: '',
    password: '',
  });
  const [emailData, setEmailData] = useState<EmailData>({
    to: '',
    subject: '',
    html: '',
    attachments: [],
  });
  const [plainText, setPlainText] = useState('');
  const [tweakDescription, setTweakDescription] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [isTweaking, setIsTweaking] = useState(false);
  const [showSaveTemplateModal, setShowSaveTemplateModal] = useState(false);
  const [pendingEmailData, setPendingEmailData] = useState<any>(null);
  const [templateNameInput, setTemplateNameInput] = useState('');
  const [loadingStartTime, setLoadingStartTime] = useState<number | null>(null);
  const [_, forceUpdate] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Track loading time for dynamic message
  const isAnyLoading = isTestingConnection || isConverting || isTweaking || isLoading;
  const loadingElapsed = loadingStartTime ? Date.now() - loadingStartTime : 0;
  const showExtendedMessage = loadingElapsed > 10000; // Show extended message after 10 seconds

  useEffect(() => {
    if (isAnyLoading && !loadingStartTime) {
      setLoadingStartTime(Date.now());
    } else if (!isAnyLoading && loadingStartTime) {
      setLoadingStartTime(null);
    }
  }, [isAnyLoading, loadingStartTime]);

  // Force re-render every second while loading to update the message
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAnyLoading) {
      interval = setInterval(() => {
        forceUpdate(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAnyLoading]);

  const handleCredentialChange = (field: keyof EmailCredentials, value: string) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
  };

  const handleEmailDataChange = (field: keyof Omit<EmailData, 'attachments'>, value: string) => {
    setEmailData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setEmailData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files],
    }));
  };

  const removeAttachment = (index: number) => {
    setEmailData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  };

  const convertToHtml = async () => {
    if (!plainText.trim()) {
      toast.error('Please enter some text to convert');
      return;
    }

    setIsConverting(true);
    try {
      const result = await aiApi.convertToHtml({ plainText: plainText.trim() });

      if (result.success && result.htmlContent) {
        setEmailData(prev => ({ ...prev, html: result.htmlContent! }));
        toast.success('Text converted to HTML successfully!');
      } else {
        toast.error(result.message || 'Failed to convert text to HTML');
      }
    } catch (error) {
      toast.error('Failed to convert text to HTML');
    } finally {
      setIsConverting(false);
    }
  };

  const tweakHtml = async () => {
    if (!tweakDescription.trim()) {
      toast.error('Please describe what changes you want to make');
      return;
    }

    if (!emailData.html) {
      toast.error('Please generate HTML content first');
      return;
    }

    setIsTweaking(true);
    try {
      const result = await aiApi.tweakHtml({
        originalHtml: emailData.html,
        tweakDescription: tweakDescription.trim()
      });

      if (result.success && result.htmlContent) {
        setEmailData(prev => ({ ...prev, html: result.htmlContent! }));
        toast.success('Email tweaked successfully!');
        setTweakDescription('');
      } else {
        toast.error(result.message || 'Failed to tweak HTML');
      }
    } catch (error) {
      toast.error('Failed to tweak HTML');
    } finally {
      setIsTweaking(false);
    }
  };

  const testConnection = async () => {
    if (!credentials.email || !credentials.password) {
      toast.error('Please enter both email and password');
      return;
    }

    setIsTestingConnection(true);
    try {
      const result = await emailApi.testConnection(credentials);
      if (result.success) {
        toast.success('Connection test successful!');
      } else {
        toast.error(result.message || 'Connection test failed');
      }
    } catch (error) {
      toast.error('Connection test failed');
    } finally {
      setIsTestingConnection(false);
    }
  };

  const sendEmail = async () => {
    if (!credentials.email || !credentials.password) {
      toast.error('Please enter your email credentials');
      return;
    }

    if (!emailData.to || !emailData.subject || (!emailData.html && !plainText.trim())) {
      toast.error('Please fill in all required fields and either write plain text or provide HTML content');
      return;
    }

    // Show save template modal instead of prompt
    setPendingEmailData({ credentials, emailData, plainText });
    setShowSaveTemplateModal(true);
  };

  const handleSendEmail = async (saveAsTemplate: boolean, templateName?: string) => {
    if (!pendingEmailData) return;

    const { credentials, emailData, plainText } = pendingEmailData;

    // Save as template if requested
    if (saveAsTemplate && templateName && templateName.trim() && userId) {
      try {
        await templateApi.createTemplate({
          name: templateName.trim(),
          subject: emailData.subject,
          htmlContent: emailData.html,
          plainText: plainText
        }, userId);
        toast.success('Template saved successfully!');
      } catch (error) {
        toast.error('Failed to save template, but email will still be sent');
        console.error('Template save error:', error);
      }
    }

    setIsLoading(true);

    try {
      const result = await emailApi.sendEmail(credentials, emailData);
      if (result.success) {
        toast.success('Email sent successfully!');

        // Reset form
        setEmailData({
          to: '',
          subject: '',
          html: '',
          attachments: [],
        });
        setPlainText('');
        setTweakDescription('');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        toast.error(result.message || 'Failed to send email');
      }
    } catch (error) {
      toast.error('Failed to send email');
    } finally {
      setIsLoading(false);
      setShowSaveTemplateModal(false);
      setPendingEmailData(null);
      setTemplateNameInput('');
    }
  };



  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Email Credentials Section */}
      <div className="card mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
          <Mail className="w-6 h-6 mr-2 text-primary-600" />
          Email Credentials
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={credentials.email}
              onChange={(e) => handleCredentialChange('email', e.target.value)}
              placeholder="your-email@gmail.com"
              className="input-field"
            />
          </div>

          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Password / App Password
              </label>
              <Link
                to="/#gmail-tutorial"
                className="text-xs text-blue-600 hover:text-blue-800 flex items-center transition-colors"
                title="Watch tutorial: How to get Gmail App Password"
              >
                <HelpCircle className="w-3 h-3 mr-1" />
                How to get App Password
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={credentials.password}
                onChange={(e) => handleCredentialChange('password', e.target.value)}
                placeholder="Enter your password or app password"
                className="input-field pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="flex items-center text-sm text-green-700 bg-green-50 p-3 rounded-lg border border-green-200">
          <Shield className="w-4 h-4 mr-2 text-green-600" />
          <span>
            <strong>Secure:</strong> App passwords are not saved or stored. Used only temporarily for sending emails.
          </span>
        </div>

        <button
          onClick={testConnection}
          disabled={isTestingConnection || !credentials.email || !credentials.password}
          className="btn-secondary flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <TestTube className="w-4 h-4 mr-2" />
          {isTestingConnection ? 'Testing...' : 'Test Connection'}
        </button>
      </div>

      {/* Template Manager */}
      <TemplateManager
        currentSubject={emailData.subject}
        currentHtml={emailData.html}
        currentPlainText={plainText}
        onLoadTemplate={(template) => {
          setEmailData(prev => ({
            ...prev,
            subject: template.subject,
            html: template.htmlContent
          }));
          setPlainText(template.plainText || '');
        }}
      />

      <div className="card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
          <Send className="w-6 h-6 mr-2 text-primary-600" />
          Compose Email
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              To (Recipients)
            </label>
            <input
              type="text"
              value={emailData.to}
              onChange={(e) => handleEmailDataChange('to', e.target.value)}
              placeholder="recipient@example.com (multiple emails separated by commas)"
              className="input-field"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject
            </label>
            <input
              type="text"
              value={emailData.subject}
              onChange={(e) => handleEmailDataChange('subject', e.target.value)}
              placeholder="Email subject"
              className="input-field"
            />
          </div>
          
          {/* AI Email Content Section */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Plain Text Content
              </label>
              <textarea
                value={plainText}
                onChange={(e) => setPlainText(e.target.value)}
                placeholder="Write your email content here. The AI will convert it to beautiful HTML..."
                rows={8}
                className="input-field resize-vertical"
              />
            </div>

            <div className="flex justify-center">
              <button
                onClick={convertToHtml}
                disabled={isConverting || !plainText.trim()}
                className="btn-primary flex items-center disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3 text-lg"
              >
                <Wand2 className="w-5 h-5 mr-3" />
                {isConverting ? '✨ Converting with AI...' : '🚀 Convert to HTML with AI'}
              </button>
            </div>

            {/* AI Tweak Section */}
            {emailData.html && (
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                <h3 className="text-lg font-semibold text-purple-900 mb-3 flex items-center">
                  <Palette className="w-5 h-5 mr-2" />
                  🎨 Tweak Your Email with AI
                </h3>
                <p className="text-sm text-purple-700 mb-4">
                  Describe any style changes, layout modifications, or additional content you want to add
                </p>

                <div className="space-y-3">
                  <textarea
                    value={tweakDescription}
                    onChange={(e) => setTweakDescription(e.target.value)}
                    placeholder="e.g., 'Make the heading bigger and red', 'Add a blue button', 'Change background to light gray', 'Add a signature at the bottom'..."
                    rows={3}
                    className="input-field resize-vertical"
                    maxLength={500}
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      {tweakDescription.length}/500 characters
                    </span>
                    <button
                      onClick={tweakHtml}
                      disabled={isTweaking || !tweakDescription.trim()}
                      className="btn-secondary flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      {isTweaking ? '✨ Tweaking...' : '🔧 Apply Changes'}
                    </button>
                  </div>
                </div>

                <div className="mt-3 text-xs text-purple-600 bg-purple-100 p-2 rounded">
                  💡 <strong>Tips:</strong> Be specific about colors, sizes, positions. The AI will modify your existing email while keeping it professional!
                </div>
              </div>
            )}

            {/* Side-by-Side Layout */}
            {emailData.html && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                {/* HTML Editor */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Generated HTML Content
                  </label>
                  <textarea
                    value={emailData.html}
                    onChange={(e) => handleEmailDataChange('html', e.target.value)}
                    placeholder="AI-generated HTML will appear here..."
                    rows={12}
                    className="input-field font-mono text-sm resize-vertical"
                  />
                </div>

                {/* Live Preview */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    📧 Live Email Preview
                  </label>
                  <div className="border-2 rounded-lg p-4 bg-gradient-to-br from-gray-50 to-white shadow-lg">
                    <div
                      className="max-h-96 overflow-y-auto bg-white rounded border"
                      style={{
                        transform: 'scale(0.85)',
                        transformOrigin: 'top left',
                        width: '117%',
                        height: '117%'
                      }}
                      dangerouslySetInnerHTML={{ __html: emailData.html }}
                    />
                  </div>
                  <p className="text-xs text-blue-600 mt-2 flex items-center">
                    <span className="mr-1">👁️</span>
                    Real-time preview - This is exactly how recipients will see your email!
                  </p>
                </div>
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Attachments
            </label>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileChange}
              className="input-field"
              accept="image/*,.pdf,.txt,.doc,.docx,.xls,.xlsx"
            />
            <p className="text-sm text-gray-500 mt-1">
              Supported formats: Images, PDF, Text, Word, Excel (Max 10MB per file)
            </p>
          </div>
          
          {emailData.attachments.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Selected Files:</h3>
              <div className="space-y-2">
                {emailData.attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center">
                      <Paperclip className="w-4 h-4 text-gray-500 mr-2" />
                      <span className="text-sm font-medium">{file.name}</span>
                      <span className="text-xs text-gray-500 ml-2">
                        ({formatFileSize(file.size)})
                      </span>
                    </div>
                    <button
                      onClick={() => removeAttachment(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <button
            onClick={sendEmail}
            disabled={isLoading}
            className="btn-primary w-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4 mr-2" />
            {isLoading ? 'Sending...' : 'Send Email'}
          </button>
        </div>
      </div>

      {/* Loading Spinner Modal */}
      {(isTestingConnection || isConverting || isTweaking || isLoading) && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 text-center">
            <div className="mb-6">
              <div className="relative w-16 h-16 mx-auto">
                <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                <div className="absolute inset-2 bg-blue-600 rounded-full animate-pulse"></div>
                <div className="absolute inset-4 bg-white rounded-full"></div>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Working on it...</h3>
            <p className="text-gray-600 mb-4">
              {showExtendedMessage
                ? "or maybe two... leave everything to us! ✨"
                : "This may take a minute..."
              }
            </p>
            <div className="flex justify-center space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
            </div>
          </div>
        </div>
      )}

      {/* Save Template Modal */}
      {showSaveTemplateModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                <Send className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Save as Template</h3>
            </div>

            <p className="text-gray-600 mb-4">
                Would you like to save this email as a template for future use? This will help you quickly create similar emails.
              </p>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Template Name (optional)
                </label>
                <input
                  type="text"
                  value={templateNameInput}
                  onChange={(e) => setTemplateNameInput(e.target.value)}
                  placeholder="Enter a name for your template"
                  className="input-field"
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => handleSendEmail(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Skip & Send
                </button>
                <button
                  onClick={() => {
                    if (templateNameInput.trim()) {
                      handleSendEmail(true, templateNameInput);
                    } else {
                      handleSendEmail(false);
                    }
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  {templateNameInput.trim() ? 'Save & Send' : 'Send Without Saving'}
                </button>
              </div>
          </div>
        </div>
      </div>
    )}
    </div>
  );
};

export default EmailForm; 
