import { Category } from 'entities/Category.entity';
import { Product } from 'entities/Product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category])],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
