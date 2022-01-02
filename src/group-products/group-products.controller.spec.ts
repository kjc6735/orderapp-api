import { Test, TestingModule } from '@nestjs/testing';
import { GroupProductsController } from './group-products.controller';

describe('GroupProductsController', () => {
  let controller: GroupProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupProductsController],
    }).compile();

    controller = module.get<GroupProductsController>(GroupProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
