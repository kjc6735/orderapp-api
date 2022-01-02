import { User } from 'entities/User.entity';
export class CreateUserDto {
  name: string;
  password: string;
  groupId: number;
  businessNumber: string;
  phone: string;
}
