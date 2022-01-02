import { Category } from 'entities/Category.entity';
import { Product } from 'entities/Product.entity';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './products.controller';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async createProduct({ name, origin, category }: CreateProductDto) {
    const isDuplicate = await this.productRepository.findOne({
      where: {
        name,
        origin,
        category,
      },
    });

    if (isDuplicate) throw new ForbiddenException('이미 존재하는 상품입니다.');
    const isCategory = await this.categoryRepository.findOne(category);
    if (!isCategory)
      throw new ForbiddenException('존재하지 않는 카테고리 입니다.');
    const newProduct = new Product();
    newProduct.name = name;
    newProduct.origin = origin;
    newProduct.category = isCategory;
    await this.productRepository.save(newProduct);
    return true;
  }

  async getProducts() {
    return this.productRepository.find();
  }

  async getProduct(id) {
    const product = await this.productRepository.findOne(id);
    if (!product) throw new ForbiddenException('존재하지 않는 상품입니다.');
    return product;
  }

  async deleteProduct(id) {
    const product = await this.productRepository.findOne(id);
    if (!product) throw new ForbiddenException('존재하지 않는 상품입니다.');
    return this.productRepository.delete(id);
  }

  async updateProduct({ id, name, origin, category }) {
    const isDuplicate = await this.productRepository.findOne({
      where: {
        name,
        origin,
        category,
      },
    });
    if (isDuplicate) throw new ForbiddenException('이미 존재하는 상품입니다.');
    const isCategory = await this.categoryRepository.findOne(category);
    if (!isCategory)
      throw new ForbiddenException('존재하지 않는 카테고리 입니다.');
    const updateCategory = await this.productRepository.findOne(id);
    updateCategory.name = name;
    updateCategory.origin = origin;
    updateCategory.category = isCategory;

    await this.productRepository.save(updateCategory);
    return true;
  }
}
