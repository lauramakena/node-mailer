import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

export interface OAuthTokens {
  access_token: string;
  refresh_token?: string;
  scope: string;
  token_type: string;
  expiry_date?: number;
}

export class OAuthService {
  private oauth2Client: OAuth2Client;

  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID!,
      process.env.GOOGLE_CLIENT_SECRET!,
      process.env.GOOGLE_REDIRECT_URI!
    );
  }

  generateAuthUrl(): string {
    const scopes = [
      'https://www.googleapis.com/auth/gmail.send',
      'https://www.googleapis.com/auth/gmail.compose',
      'https://www.googleapis.com/auth/userinfo.email'
    ];

    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      prompt: 'consent'
    });
  }

  async getTokensFromCode(code: string): Promise<OAuthTokens> {
    try {
      const { tokens } = await this.oauth2Client.getToken(code);
      return tokens as OAuthTokens;
    } catch (error) {
      throw new Error(`Failed to get tokens: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async refreshAccessToken(refreshToken: string): Promise<string> {
    try {
      this.oauth2Client.setCredentials({
        refresh_token: refreshToken
      });

      const { credentials } = await this.oauth2Client.refreshAccessToken();
      return credentials.access_token!;
    } catch (error) {
      throw new Error(`Failed to refresh token: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async getUserInfo(accessToken: string): Promise<{ email: string; name: string }> {
    try {
      this.oauth2Client.setCredentials({
        access_token: accessToken
      });

      const oauth2 = google.oauth2({ version: 'v2', auth: this.oauth2Client });
      const { data } = await oauth2.userinfo.get();

      return {
        email: data.email!,
        name: data.name || data.email!
      };
    } catch (error) {
      throw new Error(`Failed to get user info: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  createTransporterWithOAuth(accessToken: string) {
    this.oauth2Client.setCredentials({
      access_token: accessToken
    });

    return google.gmail({ version: 'v1', auth: this.oauth2Client });
  }
}
