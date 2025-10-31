import axios from 'axios';

export interface AIConversionRequest {
  plainText: string;
  emailType?: string;
}

export interface AITweakRequest {
  originalHtml: string;
  tweakDescription: string;
}

export interface AIConversionResponse {
  success: boolean;
  htmlContent?: string;
  message?: string;
}

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL?.replace('/api', '') || 'https://node-mailer-owuv.onrender.com',
  timeout: 30000, // 30 seconds timeout for AI requests
});



export const aiApi = {
  convertToHtml: async (request: AIConversionRequest): Promise<AIConversionResponse> => {
    try {
      const response = await api.post<AIConversionResponse>('/api/ai/convert-to-html', request);
      return response.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return {
          success: false,
          message: error.response.data.message || 'Failed to convert text to HTML'
        };
      }
      return {
        success: false,
        message: 'An unexpected error occurred'
      };
    }
  },

  tweakHtml: async (request: AITweakRequest): Promise<AIConversionResponse> => {
    try {
      const response = await api.post<AIConversionResponse>('/api/ai/tweak-html', request);
      return response.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return {
          success: false,
          message: error.response.data.message || 'Failed to tweak HTML'
        };
      }
      return {
        success: false,
        message: 'An unexpected error occurred'
      };
    }
  }
};
