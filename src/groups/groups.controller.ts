import { GroupsService } from './groups.service';
import { Controller, Get } from '@nestjs/common';

@Controller('groups')
export class GroupsController {
  constructor(private groupsService: GroupsService) {}

  @Get()
  async getGroups() {
    return this.groupsService.getGroups();
  }
}
