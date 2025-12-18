import { Injectable } from '@nestjs/common';

@Injectable()
export class ActionsService {
  async confirm(id: string, dto: any) {
    return { id, status: 'APPLIED' };
  }

  async reject(id: string, dto: any) {
    return { id, status: 'FAILED' };
  }

  async undo(id: string, dto: any) {
    return { id, status: 'REVERTED' };
  }
}
