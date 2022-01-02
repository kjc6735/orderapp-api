import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GroupProduct } from './GroupProduct.entity';
import { User } from './User.entity';

@Index('IDX_8a45300fd825918f3b40195fbd', ['name'], { unique: true })
@Entity('group', { schema: 'api_server' })
export class Group {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', {
    name: 'name',
    unique: true,
    length: 255,
    nullable: false,
  })
  name: string;

  @OneToMany(() => GroupProduct, (groupProduct) => groupProduct.group)
  groupProducts: GroupProduct[];

  @OneToMany(() => User, (user) => user.group)
  users: User[];
}
