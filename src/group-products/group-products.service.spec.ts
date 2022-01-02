import { Test, TestingModule } from '@nestjs/testing';
import { GroupProductsService } from './group-products.service';

describe('GroupProductsService', () => {
  let service: GroupProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupProductsService],
    }).compile();

    service = module.get<GroupProductsService>(GroupProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
