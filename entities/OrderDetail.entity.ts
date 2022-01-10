import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './Product.entity';
import { Order } from './Order.entity';

@Index('orderId', ['orderId'], {})
@Index('productId', ['productId'], {})
@Entity('order_detail', { schema: 'api_server' })
export class OrderDetail {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;
  @Column('int', { name: 'count', nullable: false })
  count: number;

  @Column('int', { name: 'price', nullable: false })
  price: number;

  @Column('int', { name: 'productId', nullable: false })
  productId: number;

  @Column('int', { name: 'orderId', nullable: false })
  orderId: number;

  @ManyToOne(() => Product, (product) => product.orderDetails, {
    nullable: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'productId', referencedColumnName: 'id' }])
  product: Product;

  @ManyToOne(() => Order, (order) => order.orderDetails, {
    nullable: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'orderId', referencedColumnName: 'id' }])
  order: Order;
}
