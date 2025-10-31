export interface EmailCredentials {
  email: string;
  password?: string;
  accessToken?: string;
}

export interface EmailData {
  to: string;
  subject: string;
  html: string;
  attachments: File[];
}

export interface EmailResponse {
  success: boolean;
  message: string;
  messageId?: string;
  error?: string;
}

export interface ConnectionTestResponse {
  success: boolean;
  message: string;
  error?: string;
} 