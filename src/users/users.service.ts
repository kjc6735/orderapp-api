import { CreateUserDto } from './dto/create-user.dto';
import { Group } from './../../entities/Group.entity';
import { User } from 'entities/User.entity';
import { Connection, Repository } from 'typeorm';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private connection: Connection,
    @InjectRepository(Group) private groupRepository: Repository<Group>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async login(businessNumber, password) {
    console.log(businessNumber, password);
    const user = await this.userRepository.findOne({
      where: {
        businessNumber,
      },
    });
    if (!user) throw new ForbiddenException('아이디를 확인해주세요');
    if (!bcrypt.compare(password, user.password))
      throw new ForbiddenException('입력하신 정보를 다시 확인해주세요.');
    await delete user.password;
    return {
      id: user.id,
      groupId: user.groupId,
    };
  }

  async register(newUser: CreateUserDto): Promise<boolean | Error> {
    const isUser = await this.userRepository.findOne({
      where: {
        businessNumber: newUser.businessNumber,
      },
    });
    if (isUser) throw new ForbiddenException('이미 가입된 아이디입니다.');

    const group = await this.groupRepository.findOne({
      where: { id: newUser.groupId },
    });
    // const queryRunner = this.connection.createQueryRunner();
    // await queryRunner.connect();
    // await queryRunner.startTransaction();
    const user = new User();

    const password = await bcrypt.hash(newUser.password, 12);
    user.name = newUser.name;
    user.businessNumber = newUser.businessNumber;
    user.password = password;
    user.phone = newUser.phone;
    user.group = group;
    try {
      await this.userRepository.save(user);

      //레포지토리에 저장할때 트랜젝션 자동 적용됨
      //await queryRunner.commitTransaction();
      return true;
    } catch (e) {
      //await queryRunner.rollbackTransaction();

      throw new ForbiddenException('회원가입 실패');
    } finally {
      //await queryRunner.release();
    }
  }

  async getUser(id) {
    const { password, ...result } = await this.userRepository.findOne(id);
    return result;
  }
  deleteUser(id) {
    return this.userRepository.softDelete(id);
  }
}
