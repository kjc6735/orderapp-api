import { GroupProduct } from 'entities/GroupProduct.entity';
import { Group } from 'entities/Group.entity';
import { Category } from 'entities/Category.entity';
import { Product } from 'entities/Product.entity';
import { User } from 'entities/User.entity';
import { Injectable, ForbiddenException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GroupProductsService {
  id = 1;
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Group) private groupRepository: Repository<Group>,
    @InjectRepository(GroupProduct)
    private groupProductRepository: Repository<GroupProduct>,
  ) {}

  async userProductList() {
    // param id
    //어차피 아이디는 로그인했을 때 그 정보로 넘겨주면서 사용할듯?

    const id = this.id;
    const user = await this.userRepository.findOne(id);
    if (!user) throw new ForbiddenException('로그인이 필요합니다.');
    //로그아웃 시켜버릴까..
    return await this.productRepository.find({
      where: {
        group: user.group,
      },
    });
  }

  async createGroupProducts(productId, groupId, price, tax, status) {
    const product = await this.productRepository.findOne(productId);
    const group = await this.groupRepository.findOne(groupId);

    const isProduct = await this.groupProductRepository.findOne({
      where: {
        group: group,
        product: product,
      },
    });
    if (isProduct) throw new ForbiddenException('이미 존재하는 상품입니다.');
    const newGroupProduct = new GroupProduct();
    newGroupProduct.price = price;
    newGroupProduct.tax = true;
    newGroupProduct.status = true;
    newGroupProduct.group = group;
    newGroupProduct.product = product;
    await this.groupProductRepository.save(newGroupProduct);
    return true;
  }

  //상품 추가 제거 삭제??

  //dto로 뺴야겠다 귀찮다 다 쓰기
  async updateGroupProduct({
    groupProductId,
    updateGroupId,
    tax,
    price,
    status,
  }) {
    const product = await this.groupProductRepository.findOne(groupProductId);
    if (!product) throw new ForbiddenException('존재하지 않는 상품입니다.');
    product.price = price;
    product.group = updateGroupId;
    product.tax = tax;
    product.status = status;
    await this.groupProductRepository.save(product);
    return true;
  }

  async deleteGroupProduct(groupProductId) {
    //const groupProduct = this.groupProductRepository.findOne(groupProductId);
    return this.groupProductRepository.delete(groupProductId);
  }
}
