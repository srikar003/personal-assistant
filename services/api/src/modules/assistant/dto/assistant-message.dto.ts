import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';

export class AssistantMessageDto {
  @ApiPropertyOptional({ example: 'c3b1f5a6-1d5c-4f86-9c8c-123456789abc' })
  @IsOptional()
  @IsString()
  conversationId?: string;

  @ApiProperty({ example: 'Schedule dentist next Friday at 3pm for 1 hour' })
  @IsString()
  text!: string;

  @ApiProperty({ enum: ['text', 'voice'], example: 'voice' })
  @IsIn(['text', 'voice'])
  mode!: 'text' | 'voice';

  @ApiPropertyOptional({
    example: { transcriptConfidence: 0.92 },
    description: 'Optional metadata such as voice transcript confidence',
  })
  @IsOptional()
  metadata?: Record<string, any>;
}
