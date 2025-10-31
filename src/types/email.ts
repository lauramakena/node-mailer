export interface EmailCredentials {
  email: string;
  password?: string;
  accessToken?: string;
}

export interface EmailRequest {
  credentials: EmailCredentials;
  to: string | string[];
  subject: string;
  html: string;
  attachments?: EmailAttachment[];
}

export interface EmailAttachment {
  filename: string;
  content: Buffer;
  contentType?: string;
}

export interface EmailResponse {
  success: boolean;
  message: string;
  messageId?: string;
  error?: string;
}

export interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
} 