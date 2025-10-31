import axios from 'axios';

const API_BASE_URL = 'https://node-mailer-owuv.onrender.com/api';

export interface OAuthTokens {
  access_token: string;
  refresh_token?: string;
  scope: string;
  token_type: string;
  expiry_date?: number;
}

export interface UserInfo {
  email: string;
  name: string;
}

export interface OAuthResponse {
  success: boolean;
  authUrl?: string;
  tokens?: OAuthTokens;
  userInfo?: UserInfo;
  message?: string;
  error?: string;
}

export const oauthApi = {
  // Get OAuth authorization URL
  async getAuthUrl(): Promise<OAuthResponse> {
    try {
      const response = await axios.get<OAuthResponse>(`${API_BASE_URL}/oauth/auth-url`);
      return response.data;
    } catch (error) {
      console.error('Error getting auth URL:', error);
      throw error;
    }
  },

  // Test OAuth connection
  async testConnection(accessToken: string, email: string): Promise<OAuthResponse> {
    try {
      const response = await axios.post<OAuthResponse>(`${API_BASE_URL}/oauth/test-connection`, {
        accessToken,
        email
      });
      return response.data;
    } catch (error) {
      console.error('Error testing OAuth connection:', error);
      throw error;
    }
  },

  // Handle OAuth callback (this will be called by the backend)
  async handleCallback(code: string): Promise<OAuthResponse> {
    try {
      const response = await axios.get<OAuthResponse>(`${API_BASE_URL}/oauth/callback?code=${code}`);
      return response.data;
    } catch (error) {
      console.error('Error handling OAuth callback:', error);
      throw error;
    }
  }
};
