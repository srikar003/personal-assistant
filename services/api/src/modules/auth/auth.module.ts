import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { GoogleOAuthService } from './google-oauth.service';

@Module({
  controllers: [AuthController],
  providers: [GoogleOAuthService],
  exports: [GoogleOAuthService],
})
export class AuthModule {}
