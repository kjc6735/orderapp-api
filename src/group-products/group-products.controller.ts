import { GroupProductsService } from './group-products.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('group-products')
export class GroupProductsController {
  constructor(private groupProductsService: GroupProductsService) {}

  @Get()
  async getGroupProduct() {
    return this.groupProductsService.userProductList();
  }

  // @Post()
  // async createGrouProduct(@Body() groupProduct) {
  //   return this.groupProductsService.createGroupProducts(groupProduct);
  // }

  @Delete(':id')
  async deleteGroupProduct(@Param('id') id) {
    return this.groupProductsService.deleteGroupProduct(id);
  }

  @Put('id')
  async updateGroupProduct(@Param('id') id, @Body() data) {
    return this.groupProductsService.updateGroupProduct(id);
  }
}
