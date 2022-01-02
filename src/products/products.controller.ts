import { Product } from 'entities/Product.entity';
import { ProductsService } from './products.service';
import { Body, Controller, Post } from '@nestjs/common';

export class CreateProductDto extends Product {}

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }
}
