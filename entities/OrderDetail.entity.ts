import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Product } from './Product.entity';
import { Order } from './Order.entity';

@Index('orderNumber', ['orderNumber'], {})
@Index('productId', ['productId'], {})
@Entity('order_detail', { schema: 'api_server' })
export class OrderDetail {
  @PrimaryColumn()
  id: number;
  @Column('int', { name: 'count', nullable: false })
  count: number;

  @Column('int', { name: 'price', nullable: false })
  price: number;

  @Column('int', { name: 'productId', nullable: false })
  productId: number;

  @Column('varchar', { name: 'orderNumber', length: 13, nullable: false })
  orderNumber: string;

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
  @JoinColumn([{ name: 'orderNumber', referencedColumnName: 'orderNumber' }])
  orderNumber2: Order;
}
