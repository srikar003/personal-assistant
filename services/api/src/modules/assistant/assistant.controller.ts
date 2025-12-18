import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AssistantService } from './assistant.service';
import { AssistantMessageDto } from './dto/assistant-message.dto';

@ApiTags('assistant')
@Controller('assistant')
export class AssistantController {
  constructor(private readonly assistant: AssistantService) {}

  @Post('message')
  @ApiOperation({ summary: 'Send a message to the assistant (text or voice transcript)' })
  async message(@Body() dto: AssistantMessageDto) {
    return this.assistant.handleMessage(dto);
  }
}
