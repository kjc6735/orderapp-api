import { OrderDetail } from './../entities/OrderDetail.entity';
import { Order } from 'entities/Order.entity';
import { GroupProduct } from 'entities/GroupProduct.entity';
import { Category } from 'entities/Category.entity';
import { Product } from 'entities/Product.entity';
import { Group } from 'entities/Group.entity';
import { User } from 'entities/User.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();
export const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: 3306,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE,
  entities: [User, Group, Product, Category, GroupProduct, Order, OrderDetail], // 설정 부분
  synchronize: true,
  logging: true,
  autoLoadEntities: true,
  charset: 'utf8mb4',
  keepConnectionAlive: true,
};
