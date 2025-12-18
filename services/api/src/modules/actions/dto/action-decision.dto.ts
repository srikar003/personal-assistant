import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ActionDecisionDto {
  @ApiPropertyOptional({ example: 'Looks good, apply it.' })
  @IsOptional()
  @IsString()
  note?: string;
}
