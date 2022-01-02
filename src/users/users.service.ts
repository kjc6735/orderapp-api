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
    const user = await this.userRepository.findOne({
      where: {
        businessNumber,
      },
    });
    if (!user) throw new ForbiddenException('아이디를 확인해주세요');
    if (!bcrypt.compare(password, user.password))
      throw new ForbiddenException('입력하신 정보를 다시 확인해주세요.');
    await delete user.password;
    return { id: user.id };
  }

  async register(newUser: CreateUserDto): Promise<boolean | Error> {
    const group = await this.groupRepository.findOne({ where: { id: 1 } });
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const user = new User();

    const password = await bcrypt.hash('1234', 12);
    user.name = 'jaechan';
    user.businessNumber = '123456789';
    user.password = password;
    user.group = group;
    try {
      await this.userRepository.save(user);
      await queryRunner.commitTransaction();
      return true;
    } catch (e) {
      await queryRunner.rollbackTransaction();

      throw new ForbiddenException('회원가입 실패');
    } finally {
      await queryRunner.release();
    }
  }

  // async register1() {
  //   const group = await this.groupRepository.findOne({ where: { id: 1 } });
  //   const user = new User();
  //   user.email = 'jaechan@wocks.me';
  //   user.name = 'jaechan';
  //   user.businessNumber = '123456789';
  //   user.password = '1234';
  //   user.group = group;
  //   try {
  //     await this.userRepository.save(user);
  //     return true;
  //   } catch (e) {
  //     throw new ForbiddenException('저장에 실패했습니다');
  //   }
  // }
  async getUser(id) {
    const { password, ...result } = await this.userRepository.findOne(id);
    return result;
  }
  deleteUser(id) {
    return this.userRepository.softDelete(id);
  }
}
