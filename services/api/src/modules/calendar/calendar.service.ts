import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google } from 'googleapis';
import type { GoogleTokens } from '../auth/google-tokens.util';

@Injectable()
export class CalendarService {
  constructor(private readonly config: ConfigService) {}

  private makeClient(tokens: GoogleTokens) {
    const clientId = this.config.get<string>('GOOGLE_CLIENT_ID');
    const clientSecret = this.config.get<string>('GOOGLE_CLIENT_SECRET');
    const redirectUri = this.config.get<string>('GOOGLE_REDIRECT_URI');

    const oauth2 = new google.auth.OAuth2(clientId, clientSecret, redirectUri);
    oauth2.setCredentials(tokens);
    return oauth2;
  }

  async listEvents(tokens: GoogleTokens, args: { from: string; to: string }) {
    const auth = this.makeClient(tokens);
    const calendar = google.calendar({ version: 'v3', auth });

    const res = await calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date(args.from).toISOString(),
      timeMax: new Date(args.to).toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
      maxResults: 20,
    });

    return res.data.items ?? [];
  }
}
