import { Controller, Get, Query, Res } from '@nestjs/common';
import type { Response } from 'express';
import { GoogleOAuthService } from './google-oauth.service';

@Controller('auth/google')
export class AuthController {
  constructor(private readonly googleOAuth: GoogleOAuthService) {}

  @Get('start')
  start(@Res() res: Response) {
    const url = this.googleOAuth.getAuthUrl();
    return res.redirect(url);
  }

@Get('callback')
async callback(
  @Query('code') code: string | undefined,
  @Query('error') error: string | undefined,
  @Query() allQuery: any,
  @Res() res: Response
) {
  if (error) {
    return res.status(400).send(`Google returned error: ${error}\n\nFull query:\n${JSON.stringify(allQuery, null, 2)}`);
  }

  if (!code) {
    return res.status(400).send(`Missing code.\n\nFull query:\n${JSON.stringify(allQuery, null, 2)}`);
  }

  const tokens = await this.googleOAuth.exchangeCodeForTokens(code);

  res.cookie('google_tokens', JSON.stringify(tokens), {
    httpOnly: true,
    sameSite: 'lax',
  });

  return res.send('Google OAuth success. Tokens stored (dev cookie). You can close this tab.');
}
}
