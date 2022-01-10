import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './Product.entity';
import { Group } from './Group.entity';

@Entity('group_product', { schema: 'api_server' })
export class GroupProduct {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'price', unsigned: true, nullable: false })
  price: number;

  @Column({ type: 'boolean', name: 'tax', nullable: false })
  tax: boolean;

  @Column({ type: 'boolean', name: 'status', nullable: false })
  status: boolean;

  @Column('int', { name: 'productId', nullable: false })
  productId: number;

  @Column('int', { name: 'groupId', nullable: false })
  groupId: number;

  @ManyToOne(() => Product, (product) => product.groupProducts, {
    nullable: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'productId', referencedColumnName: 'id' }])
  product: Product;

  @ManyToOne(() => Group, (group) => group.groupProducts, {
    nullable: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'groupId', referencedColumnName: 'id' }])
  group: Group;
}
