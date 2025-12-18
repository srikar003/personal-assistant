import { Controller, Get, Query, Req, UnauthorizedException } from '@nestjs/common';
import type { Request } from 'express';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { CalendarService } from './calendar.service';
import { getGoogleTokensFromCookie } from '../auth/google-tokens.util';

@ApiTags('calendar')
@Controller('calendar')
export class CalendarController {
  constructor(private readonly cal: CalendarService) {}

  @Get('events')
  @ApiOperation({ summary: 'List events from the primary Google Calendar (dev cookie auth)' })
  @ApiQuery({ name: 'from', required: true, example: '2025-01-01T00:00:00-06:00' })
  @ApiQuery({ name: 'to', required: true, example: '2026-12-31T23:59:59-06:00' })
  async events(@Req() req: Request, @Query('from') from: string, @Query('to') to: string) {
    const tokens = getGoogleTokensFromCookie(req);
    if (!tokens?.access_token) {
      throw new UnauthorizedException('Missing Google tokens. Visit /auth/google/start first.');
    }
    if (!from || !to) {
      throw new UnauthorizedException('Provide from and to query params (ISO date/time).');
    }
    return this.cal.listEvents(tokens, { from, to });
  }
}
