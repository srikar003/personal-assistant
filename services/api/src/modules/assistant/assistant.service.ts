import { Injectable } from '@nestjs/common';

@Injectable()
export class AssistantService {
  async handleMessage(dto: any) {
    return {
      replyText: 'Hi Srikar, how are you doing',
      requiresConfirmation: false,
      proposedActions: [],
    };
  }
}
