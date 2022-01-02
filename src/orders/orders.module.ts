import { GroupProduct } from './../../entities/GroupProduct.entity';
import { Group } from './../../entities/Group.entity';
import { User } from 'entities/User.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from 'entities/Order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Order, Group, GroupProduct])],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
