import { Product } from './../../entities/Product.entity';
import { GroupProduct } from './../../entities/GroupProduct.entity';
import { Group } from './../../entities/Group.entity';
import { User } from 'entities/User.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Order } from 'entities/Order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Group, Order, GroupProduct, Product]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
