import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { connectDB } from './services/database';
import emailRoutes from './routes/emailRoutes';
import oauthRoutes from './routes/oauthRoutes';
import aiRoutes from './routes/aiRoutes';
import templateRoutes from './routes/templateRoutes';

// Load environment variables
if (process.env.NODE_ENV !== 'production') {
  const result = dotenv.config({ path: '.env' });
  console.log('Dotenv config result:', result);
} else {
  console.log('Production mode: Using environment variables from system');
}
console.log('GEMINI_API_KEY from process.env:', process.env.GEMINI_API_KEY);

const app = express();
const PORT = process.env.PORT || 5000;

// Trust proxy for production (needed for rate limiting behind reverse proxy)
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

// Security middleware
app.use(helmet());

// CORS configuration - Hard coded allowed origins
const corsOrigins = [
  'http://localhost:3000',      // Development
  'http://localhost:5000',      // Frontend running on same port as backend
  'https://mailer.forou.tech',   // Production frontend
  'https://node-mailer-owuv.onrender.com',  // Old backend domain (if needed for redirects)
  'http://localhost:3001',      // Alternative dev port
  'http://127.0.0.1:3000',      // Alternative localhost
  'http://127.0.0.1:3001'       // Alternative localhost port
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    // Allow all origins in development
    if (process.env.NODE_ENV !== 'production') {
      callback(null, true);
      return;
    }

    if (corsOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'), // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.',
  },
});
app.use('/api/email', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Email service is running',
    timestamp: new Date().toISOString(),
  });
});

// Test templates endpoint
app.get('/api/templates/test', (req, res) => {
  res.json({
    success: true,
    message: 'Templates API is working',
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use('/api/email', emailRoutes);
app.use('/api/oauth', oauthRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/templates', templateRoutes);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Connect to database and start server
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Email server running on port ${PORT}`);
      console.log(`📧 Email service available at http://localhost:${PORT}/api/email`);
      console.log(`📝 Template service available at http://localhost:${PORT}/api/templates`);
      console.log(`🏥 Health check available at http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app; 