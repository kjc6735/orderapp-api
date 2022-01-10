import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User.entity';
import { OrderDetail } from './OrderDetail.entity';
import { BaseEntity } from './BaseEntity.entity';

@Index('IDX_4e9f8dd16ec084bca97b3262ed', ['orderNumber'], { unique: true })
@Entity('order', { schema: 'api_server' })
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'price', nullable: false })
  price: number;

  @Column('int', { name: 'userId', nullable: false })
  userId: number;

  @Column('varchar', {
    name: 'orderNumber',
    unique: true,
    length: 13,
    nullable: false,
  })
  orderNumber: string;

  @ManyToOne(() => User, (user) => user.orders, {
    nullable: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  user: User;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
  orderDetails: OrderDetail[];
}
