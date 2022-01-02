import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './Order.entity';
import { Group } from './Group.entity';
import { BaseEntity } from './BaseEntity.entity';

@Index('IDX_a1fd92bc8c0990984cc52d1dfd', ['businessNumber'], { unique: true })
@Entity('user', { schema: 'api_server' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', length: 20, nullable: false })
  name: string;

  @Column('varchar', { name: 'phone', length: 11, nullable: false })
  phone: string;

  @Column('varchar', {
    name: 'businessNumber',
    unique: true,
    length: 11,
    nullable: false,
  })
  businessNumber: string;

  @Column('varchar', { name: 'password', length: 200, nullable: false })
  password: string;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @ManyToOne(() => Group, (group) => group.users, {
    nullable: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'groupId', referencedColumnName: 'id' }])
  group: Group;
}
