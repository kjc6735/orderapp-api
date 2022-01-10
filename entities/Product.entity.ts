import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GroupProduct } from './GroupProduct.entity';
import { OrderDetail } from './OrderDetail.entity';
import { Category } from './Category.entity';

@Index('IDX_22cc43e9a74d7498546e9a63e7', ['name'], { unique: true })
@Entity('product', { schema: 'api_server' })
export class Product {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', {
    name: 'name',
    unique: true,
    length: 50,
    nullable: false,
  })
  name: string;

  @Column('int', { name: 'categtoryId' })
  categoryId: number;

  @Column('varchar', { name: 'origin', length: 50, nullable: false })
  origin: string;

  @OneToMany(() => GroupProduct, (groupProduct) => groupProduct.product)
  groupProducts: GroupProduct[];

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
  orderDetails: OrderDetail[];

  @ManyToOne(() => Category, (category) => category.products, {
    nullable: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'categoryId', referencedColumnName: 'id' }])
  category: Category;
}
