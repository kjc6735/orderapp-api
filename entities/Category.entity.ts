import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './Product.entity';

@Index('IDX_23c05c292c439d77b0de816b50', ['name'], { unique: true })
@Entity('category', { schema: 'api_server' })
export class Category {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', {
    name: 'name',
    unique: true,
    length: 255,
    nullable: false,
  })
  name: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
