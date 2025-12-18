import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google } from 'googleapis';

@Injectable()
export class GoogleOAuthService {
  constructor(private readonly config: ConfigService) {}

  private get oauth2Client() {
    const clientId = this.config.get<string>('GOOGLE_CLIENT_ID');
    const clientSecret = this.config.get<string>('GOOGLE_CLIENT_SECRET');
    const redirectUri = this.config.get<string>('GOOGLE_REDIRECT_URI');

    if (!clientId || !clientSecret || !redirectUri) {
      throw new Error('Missing Google OAuth env vars (GOOGLE_CLIENT_ID/SECRET/REDIRECT_URI)');
    }

    return new google.auth.OAuth2(clientId, clientSecret, redirectUri);
  }

  getAuthUrl(): string {
    const scopesRaw = this.config.get<string>('GOOGLE_SCOPES') || 'https://www.googleapis.com/auth/calendar';
    const scopes = scopesRaw.split(',').map(s => s.trim());

    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent', // ensures refresh_token on first consent
      scope: scopes,
    });
  }

  async exchangeCodeForTokens(code: string) {
    const { tokens } = await this.oauth2Client.getToken(code);
    return tokens; // includes access_token, refresh_token (first time), expiry_date, scope
  }
}
