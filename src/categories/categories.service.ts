import { Category } from 'entities/Category.entity';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async createCategory(name) {
    const isDuplicateCategory = await this.categoryRepository.findOne({
      where: {
        name,
      },
    });
    if (isDuplicateCategory)
      throw new ForbiddenException('이미 존재하는 카테고리입니다.');
    const newCategory = new Category();
    newCategory.name = name;
    await this.categoryRepository.save(newCategory);
  }
  async getCategories() {
    return this.categoryRepository.find();
  }

  async updateCategory(id, name) {
    const category = await this.categoryRepository.findOne(id);
    if (!category)
      throw new ForbiddenException(
        '수정하려는 카테고리가 존재하지 않는 카테고리입니다.',
      );
    const isDuplicate = await this.categoryRepository.findOne({
      where: { name },
    });
    if (isDuplicate)
      throw new ForbiddenException('이미 존재하는 카테고리 입니다.');
    category.name = name;
    await this.categoryRepository.save(category);
  }

  async getCategory(id) {
    const category = await this.categoryRepository.findOne(id);
    if (!category)
      throw new ForbiddenException('존재하지 않는 카테고리입니다.');
    return category;
  }

  async deleteCategory(id) {
    return this.categoryRepository.delete(id);
  }
}
