import { GroupProduct } from 'entities/GroupProduct.entity';
import { Group } from 'entities/Group.entity';
import { Category } from 'entities/Category.entity';
import { Product } from 'entities/Product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { GroupProductsService } from './group-products.service';
import { GroupProductsController } from './group-products.controller';
import { User } from 'entities/User.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Product, Category, Group, GroupProduct]),
  ],
  providers: [GroupProductsService],
  controllers: [GroupProductsController],
})
export class GroupProductsModule {}
