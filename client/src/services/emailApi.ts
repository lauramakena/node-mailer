import axios from 'axios';
import { EmailCredentials, EmailData, EmailResponse, ConnectionTestResponse } from '../types/email';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://node-mailer-owuv.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds timeout for file uploads
});

export const emailApi = {
  // Test email connection
  testConnection: async (credentials: EmailCredentials): Promise<ConnectionTestResponse> => {
    try {
      const response = await api.post<ConnectionTestResponse>('/email/test-connection', credentials);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Connection test failed',
        error: error.response?.data?.error || error.message,
      };
    }
  },

  // Send email with attachments
  sendEmail: async (credentials: EmailCredentials, emailData: EmailData): Promise<EmailResponse> => {
    try {
      const formData = new FormData();
      formData.append('email', credentials.email);
      
      // Add authentication method
      if (credentials.accessToken) {
        formData.append('accessToken', credentials.accessToken);
      } else if (credentials.password) {
        formData.append('password', credentials.password);
      }
      
      formData.append('to', emailData.to);
      formData.append('subject', emailData.subject);
      formData.append('html', emailData.html);

      // Add attachments
      emailData.attachments.forEach((file) => {
        formData.append('attachments', file);
      });

      const response = await api.post<EmailResponse>('/email/send', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to send email',
        error: error.response?.data?.error || error.message,
      };
    }
  },

  // Get email configuration
  getConfig: async () => {
    try {
      const response = await api.get('/email/config');
      return response.data;
    } catch (error: any) {
      console.error('Failed to get email config:', error);
      return null;
    }
  },
}; 