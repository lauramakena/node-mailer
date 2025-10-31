import { GoogleGenAI } from "@google/genai";

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
  error?: string;
}

export class AIService {
  private ai: GoogleGenAI | null;

  constructor() {
    // Try multiple possible environment variable names
    const apiKey = process.env.GEMINI_API_KEY || 
                   process.env.GOOGLE_AI_API_KEY || 
                   process.env.API_KEY || '';
    
    console.log('AIService initialization:');
    console.log('- GEMINI_API_KEY exists:', !!process.env.GEMINI_API_KEY);
    console.log('- GOOGLE_AI_API_KEY exists:', !!process.env.GOOGLE_AI_API_KEY);
    console.log('- API_KEY exists:', !!process.env.API_KEY);
    console.log('- Selected API key length:', apiKey.length);
    console.log('- NODE_ENV:', process.env.NODE_ENV);
    
    if (!apiKey) {
      console.error('No AI API key found in environment variables');
      console.error('Available environment variables:', Object.keys(process.env).filter(key => 
        key.includes('GEMINI') || key.includes('API') || key.includes('GOOGLE')
      ));
      this.ai = null; // Don't throw error, just set to null
    } else {
      console.log('AI API key is configured successfully');
      this.ai = new GoogleGenAI({ apiKey });
    }
  }

  async convertToHtml(request: AIConversionRequest): Promise<AIConversionResponse> {
    try {
      if (!this.ai) {
        console.error('AI service is not configured - missing API key');
        return {
          success: false,
          error: 'AI service is not properly configured - missing API key'
        };
      }

      const prompt = `Convert the following plain text email content into a clean, professional HTML email template:

**DESIGN REQUIREMENTS:**
- Clean, professional layout with good typography
- Simple color scheme (2-3 colors maximum)
- Proper spacing and readability
- Professional header and footer
- Clear call-to-action if applicable

**EMAIL OPTIMIZATION:**
- Table-based layout for email client compatibility
- Inline CSS only (no external stylesheets)
- Email-safe fonts (Arial, Helvetica, sans-serif)
- Good contrast for accessibility
- Mobile-responsive design

**STYLE GUIDELINES:**
- Keep it simple and professional
- Avoid flashy animations or complex layouts
- Use subtle styling only
- Focus on readability and clarity
- Professional appearance suitable for business emails
- Dont add images, use images only if they are necessary or requested by the user

Plain text content to convert:
"${request.plainText}"

Return ONLY the complete HTML code without any markdown formatting, code blocks, or explanations. Make it clean, professional, and readable.`;

      console.log('Making request to Gemini API...');
      const response = await this.ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      console.log('Gemini API response received');
      
      const htmlContent = response.text;
      
      if (!htmlContent) {
        throw new Error('No content received from Gemini API');
      }

      // Clean up the response (remove markdown code blocks if present)
      const cleanHtml = htmlContent.replace(/```html\n?|\n?```/g, '').trim();

      return {
        success: true,
        htmlContent: cleanHtml
      };
    } catch (error) {
      console.error('AI conversion error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to convert text to HTML'
      };
    }
  }

  async tweakHtml(request: AITweakRequest): Promise<AIConversionResponse> {
    try {
      if (!this.ai) {
        console.error('AI service is not configured - missing API key');
        return {
          success: false,
          error: 'AI service is not properly configured - missing API key'
        };
      }

      const prompt = `You have this existing HTML email content:

${request.originalHtml}

The user wants to make these changes: "${request.tweakDescription}"

Please modify the HTML content according to the user's request. Keep the styling simple and professional - avoid flashy designs or excessive styling. Maintain the email-optimized structure with inline CSS and table layouts. Return ONLY the modified HTML content without any explanations or markdown formatting.

Focus on clean, readable, and professional modifications only.`;

      console.log('Making request to Gemini API for HTML tweak...');
      const response = await this.ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      console.log('Gemini API response received for tweak');
      
      const htmlContent = response.text;
      
      if (!htmlContent) {
        throw new Error('No content received from Gemini API');
      }

      // Clean up the response (remove markdown code blocks if present)
      const cleanHtml = htmlContent.replace(/```html\n?|\n?```/g, '').trim();

      return {
        success: true,
        htmlContent: cleanHtml
      };
    } catch (error) {
      console.error('AI tweak error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to tweak HTML'
      };
    }
  }
}
