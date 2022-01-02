import { CategoriesService } from './categories.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Put,
} from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  async getCategories() {
    return this.categoriesService.getCategories();
  }

  @Get(':id')
  async getCategory(@Param('id') id) {
    return this.categoriesService.getCategory(id);
  }

  @Put(':id')
  async updateCategory(@Param('id') id, @Body('name') name) {
    return this.categoriesService.updateCategory(id, name);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: number) {
    return this.categoriesService.deleteCategory(id);
  }
}
