import axios from 'axios';

export interface Template {
  _id?: string;
  userId: string;
  name: string;
  subject: string;
  htmlContent: string;
  plainText?: string;
  createdAt?: string;
  updatedAt?: string;
}

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://node-mailer-owuv.onrender.com/api';

const createApiInstance = (userId?: string) => {
  const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
  });

  // Add auth header interceptor with actual user ID
  api.interceptors.request.use((config) => {
    if (config.headers && userId) {
      config.headers['x-user-id'] = userId;
    }
    return config;
  });

  return api;
};

export const templateApi = {
  // Get all templates for the current user
  getTemplates: async (userId: string): Promise<Template[]> => {
    try {
      const api = createApiInstance(userId);
      const response = await api.get<Template[]>('/templates');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch templates:', error);
      throw error;
    }
  },

  // Get a specific template
  getTemplate: async (id: string, userId: string): Promise<Template> => {
    try {
      const api = createApiInstance(userId);
      const response = await api.get<Template>(`/templates/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch template:', error);
      throw error;
    }
  },

  // Create a new template
  createTemplate: async (template: Omit<Template, '_id' | 'userId' | 'createdAt' | 'updatedAt'>, userId: string): Promise<Template> => {
    try {
      const api = createApiInstance(userId);
      const response = await api.post<Template>('/templates', template);
      return response.data;
    } catch (error) {
      console.error('Failed to create template:', error);
      throw error;
    }
  },

  // Update a template
  updateTemplate: async (id: string, template: Partial<Template>, userId: string): Promise<Template> => {
    try {
      const api = createApiInstance(userId);
      const response = await api.put<Template>(`/templates/${id}`, template);
      return response.data;
    } catch (error) {
      console.error('Failed to update template:', error);
      throw error;
    }
  },

  // Delete a template
  deleteTemplate: async (id: string, userId: string): Promise<void> => {
    try {
      const api = createApiInstance(userId);
      await api.delete(`/templates/${id}`);
    } catch (error) {
      console.error('Failed to delete template:', error);
      throw error;
    }
  }
};
