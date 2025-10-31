import { Router, Request, Response } from 'express';
import { AIService, AIConversionRequest, AITweakRequest } from '../services/aiService';

const router = Router();
let aiService: AIService | null = null;

// Lazy initialization of AIService
const getAIService = () => {
  if (!aiService) {
    aiService = new AIService();
  }
  return aiService;
};

// Health check for AI service
router.get('/health', (req: Request, res: Response) => {
  const geminiKey = !!process.env.GEMINI_API_KEY;
  const googleKey = !!process.env.GOOGLE_AI_API_KEY;
  const apiKey = !!process.env.API_KEY;
  const selectedKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY || process.env.API_KEY || '';
  
  res.json({
    success: true,
    message: 'AI service health check',
    timestamp: new Date().toISOString(),
    configuration: {
      geminiApiKey: geminiKey,
      googleAiApiKey: googleKey,
      apiKey: apiKey,
      selectedKeyLength: selectedKey.length,
      nodeEnv: process.env.NODE_ENV,
      availableEnvVars: Object.keys(process.env).filter(key => 
        key.includes('GEMINI') || key.includes('API') || key.includes('GOOGLE') || key.includes('NODE')
      )
    }
  });
});

// Convert plain text to HTML using AI
router.post('/convert-to-html', async (req: Request, res: Response) => {
  try {
    const { plainText, emailType }: AIConversionRequest = req.body;

    if (!plainText || plainText.trim().length === 0) {
      res.status(400).json({
        success: false,
        message: 'Plain text content is required'
      });
      return;
    }

    if (plainText.length > 5000) {
      res.status(400).json({
        success: false,
        message: 'Text content is too long (max 5000 characters)'
      });
      return;
    }

    const result = await getAIService().convertToHtml({ plainText, emailType });

    if (result.success && result.htmlContent) {
      res.json({
        success: true,
        htmlContent: result.htmlContent
      });
    } else {
      res.status(500).json({
        success: false,
        message: result.error || 'Failed to convert text to HTML'
      });
    }
  } catch (error) {
    console.error('AI conversion route error:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      requestBody: req.body
    });
    res.status(500).json({
      success: false,
      message: 'Internal server error during AI conversion',
      error: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : 'Unknown error') : 'AI service temporarily unavailable'
    });
  }
});

// Tweak existing HTML content using AI
router.post('/tweak-html', async (req: Request, res: Response) => {
  try {
    const { originalHtml, tweakDescription }: AITweakRequest = req.body;

    if (!originalHtml || !tweakDescription) {
      res.status(400).json({
        success: false,
        message: 'Both original HTML and tweak description are required'
      });
      return;
    }

    if (tweakDescription.length > 500) {
      res.status(400).json({
        success: false,
        message: 'Tweak description is too long (max 500 characters)'
      });
      return;
    }

    const result = await getAIService().tweakHtml({ originalHtml, tweakDescription });

    if (result.success && result.htmlContent) {
      res.json({
        success: true,
        htmlContent: result.htmlContent
      });
    } else {
      res.status(500).json({
        success: false,
        message: result.error || 'Failed to tweak HTML'
      });
    }
  } catch (error) {
    console.error('AI tweak route error:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      requestBody: req.body
    });
    res.status(500).json({
      success: false,
      message: 'Internal server error during AI tweak',
      error: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : 'Unknown error') : 'AI service temporarily unavailable'
    });
  }
});

export default router;
