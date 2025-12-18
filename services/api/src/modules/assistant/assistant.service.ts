import { Injectable } from '@nestjs/common';

@Injectable()
export class AssistantService {
  async handleMessage(dto: any) {
    return {
      replyText: 'Here’s what I can do. Please confirm.',
      requiresConfirmation: false,
      proposedActions: [],
    };
  }
}
