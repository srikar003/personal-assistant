import type { Request } from 'express';

export type GoogleTokens = {
  access_token?: string;
  refresh_token?: string;
  scope?: string;
  token_type?: string;
  expiry_date?: number;
};

export function getGoogleTokensFromCookie(req: Request): GoogleTokens | null {
  const raw = (req as any).cookies?.google_tokens;
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
