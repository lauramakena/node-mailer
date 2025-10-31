import { Router, Request, Response } from 'express';
import { OAuthService } from '../services/oauthService';

const router = Router();
const oauthService = new OAuthService();

// Generate OAuth URL
router.get('/auth-url', (req: Request, res: Response) => {
  try {
    const authUrl = oauthService.generateAuthUrl();
    res.json({
      success: true,
      authUrl
    });
  } catch (error) {
    console.error('Error generating auth URL:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate auth URL',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// OAuth callback
router.get('/callback', async (req: Request, res: Response) => {
  try {
    const { code } = req.query;

    if (!code || typeof code !== 'string') {
      res.status(400).json({
        success: false,
        message: 'Authorization code is required'
      });
      return;
    }

    const tokens = await oauthService.getTokensFromCode(code);
    const userInfo = await oauthService.getUserInfo(tokens.access_token);

    // In a real application, you would store these tokens securely
    // For now, we'll return them to the frontend
    res.json({
      success: true,
      tokens,
      userInfo
    });
  } catch (error) {
    console.error('OAuth callback error:', error);
    res.status(500).json({
      success: false,
      message: 'OAuth authentication failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Test OAuth connection
router.post('/test-connection', async (req: Request, res: Response) => {
  try {
    const { accessToken, email } = req.body;

    if (!accessToken || !email) {
      res.status(400).json({
        success: false,
        message: 'Access token and email are required'
      });
      return;
    }

    const userInfo = await oauthService.getUserInfo(accessToken);
    
    res.json({
      success: true,
      message: 'OAuth connection successful',
      userInfo
    });
  } catch (error) {
    console.error('OAuth test connection error:', error);
    res.status(400).json({
      success: false,
      message: 'OAuth connection test failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;
