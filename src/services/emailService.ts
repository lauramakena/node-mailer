import nodemailer, { Transporter, SendMailOptions } from 'nodemailer';
import { google } from 'googleapis';
import { EmailRequest, EmailResponse, EmailConfig } from '../types/email';
import { OAuthService } from './oauthService';

export class EmailService {
  private transporter: Transporter | null = null;
  private oauthService: OAuthService;

  constructor() {
    this.oauthService = new OAuthService();
  }

  async createTransporterWithOAuth(accessToken: string, email: string): Promise<Transporter> {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: email,
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          refreshToken: accessToken, // We'll use access token for now
          accessToken: accessToken,
        },
      });

      // Verify connection configuration
      await transporter.verify();
      this.transporter = transporter;
      return transporter;
    } catch (error) {
      throw new Error(`Failed to create email transporter: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async createTransporter(credentials: { email: string; password: string }, config: EmailConfig): Promise<Transporter> {
    try {
      const transporter = nodemailer.createTransport({
        host: config.host,
        port: config.port,
        secure: config.secure,
        auth: {
          user: credentials.email,
          pass: credentials.password,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      // Verify connection configuration
      await transporter.verify();
      this.transporter = transporter;
      return transporter;
    } catch (error) {
      throw new Error(`Failed to create email transporter: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async sendEmail(emailRequest: EmailRequest): Promise<EmailResponse> {
    try {
      const { credentials, to, subject, html, attachments } = emailRequest;

      // Create transporter based on authentication method
      if (credentials.accessToken) {
        // Use OAuth
        await this.createTransporterWithOAuth(credentials.accessToken, credentials.email);
      } else if (credentials.password) {
        // Use password authentication
        if (!this.transporter) {
          await this.createTransporter({ email: credentials.email, password: credentials.password }, {
            host: process.env.EMAIL_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.EMAIL_PORT || '587'),
            secure: process.env.EMAIL_SECURE === 'true',
          });
        }
      } else {
        throw new Error('No authentication method provided');
      }

      const mailOptions: SendMailOptions = {
        from: credentials.email,
        to: Array.isArray(to) ? to.join(', ') : to,
        subject,
        html,
        attachments: attachments?.map(attachment => ({
          filename: attachment.filename,
          content: attachment.content,
          contentType: attachment.contentType,
        })),
      };

      if (!this.transporter) {
        throw new Error('Email transporter not initialized');
      }
      const result = await this.transporter.sendMail(mailOptions);

      return {
        success: true,
        message: 'Email sent successfully',
        messageId: result.messageId,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to send email',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async testConnection(credentials: { email: string; password?: string }): Promise<boolean> {
    try {
      if (!credentials.password) {
        throw new Error('Password is required for connection test');
      }

      const config: EmailConfig = {
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.EMAIL_PORT || '587'),
        secure: process.env.EMAIL_SECURE === 'true',
      };

      const transporter = await this.createTransporter({ email: credentials.email, password: credentials.password }, config);
      await transporter.verify();
      return true;
    } catch (error) {
      console.error('Connection test failed:', error);
      return false;
    }
  }

  async testOAuthConnection(accessToken: string, email: string): Promise<boolean> {
    try {
      const transporter = await this.createTransporterWithOAuth(accessToken, email);
      await transporter.verify();
      return true;
    } catch (error) {
      console.error('OAuth connection test failed:', error);
      return false;
    }
  }
} 