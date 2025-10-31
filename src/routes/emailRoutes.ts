import { Router, Request, Response } from 'express';
import multer from 'multer';
import { EmailService } from '../services/emailService';
import { EmailRequest, EmailResponse } from '../types/email';

const router = Router();
const emailService = new EmailService();

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    // Allow common file types
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'application/pdf',
      'text/plain',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  },
});

// Test email connection
router.post('/test-connection', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
      return;
    }

    const isConnected = await emailService.testConnection({ email, password });

    if (isConnected) {
      res.json({
        success: true,
        message: 'Connection test successful',
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Connection test failed. Please check your credentials.',
      });
    }
  } catch (error) {
    console.error('Test connection error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Send email with attachments
router.post('/send', upload.array('attachments', 10), async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, accessToken, to, subject, html } = req.body;
    const files = req.files as Express.Multer.File[];

    // Validate required fields - support both password and OAuth
    if (!email || (!password && !accessToken) || !to || !subject || !html) {
      res.status(400).json({
        success: false,
        message: 'Email, authentication (password or access token), recipient, subject, and HTML content are required',
      });
      return;
    }

    // Parse recipients (support multiple emails separated by comma)
    const recipients = to.split(',').map((email: string) => email.trim());

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!recipients.every((email: string) => emailRegex.test(email))) {
      res.status(400).json({
        success: false,
        message: 'Invalid email format',
      });
      return;
    }

    // Prepare attachments
    const attachments = files?.map(file => ({
      filename: file.originalname,
      content: file.buffer,
      contentType: file.mimetype,
    })) || [];

    const emailRequest: EmailRequest = {
      credentials: accessToken ? { email, accessToken } : { email, password },
      to: recipients.length === 1 ? recipients[0] : recipients,
      subject,
      html,
      attachments,
    };

    const result: EmailResponse = await emailService.sendEmail(emailRequest);

    if (result.success) {
      res.json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    console.error('Send email error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Get email configuration
router.get('/config', (req: Request, res: Response) => {
  res.json({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: process.env.EMAIL_SECURE === 'true',
  });
});

export default router; 