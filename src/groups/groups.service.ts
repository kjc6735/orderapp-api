import { Group } from './../../entities/Group.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group) private groupRepository: Repository<Group>,
  ) {}

  async getGroups() {
    return this.groupRepository.find();
  }
}
