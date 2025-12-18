import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ActionsService } from './actions.service';
import { ActionDecisionDto } from './dto/action-decision.dto';

@ApiTags('actions')
@Controller('actions')
export class ActionsController {
  constructor(private readonly actions: ActionsService) {}

  @Post(':id/confirm')
  @ApiOperation({ summary: 'Confirm a proposed action and apply it' })
  confirm(@Param('id') id: string, @Body() dto: ActionDecisionDto) {
    return this.actions.confirm(id, dto);
  }

  @Post(':id/reject')
  @ApiOperation({ summary: 'Reject a proposed action' })
  reject(@Param('id') id: string, @Body() dto: ActionDecisionDto) {
    return this.actions.reject(id, dto);
  }

  @Post(':id/undo')
  @ApiOperation({ summary: 'Undo an applied action (best-effort)' })
  undo(@Param('id') id: string, @Body() dto: ActionDecisionDto) {
    return this.actions.undo(id, dto);
  }
}
