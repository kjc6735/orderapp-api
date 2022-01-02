import { GroupProduct } from 'entities/GroupProduct.entity';
import { Group } from 'entities/Group.entity';
import { Category } from 'entities/Category.entity';
import { Product } from 'entities/Product.entity';
import { User } from 'entities/User.entity';
import { Injectable, ForbiddenException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, QueryBuilder, Repository } from 'typeorm';
import { Order } from 'entities/Order.entity';
import { query } from 'express';

function randNumber(n) {
  let randStr = '';
  for (let i = 0; i < n; i++) {
    randStr += Math.floor(Math.random() * 10);
  }
  return randStr;
}

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(GroupProduct)
    private groupProductRepository: Repository<GroupProduct>,
    private connection: Connection,
  ) {}
  async createOrder(userid, groupid, orderList) {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    const user = userid;
    const userGroup = groupid;

    const [orderProductId, count] = orderList.map((list) => [
      list.id,
      list.count,
    ]);
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    // try {
    //   const orderProduct: GroupProduct[] = this.groupProductRepository.find({
    //     where: {
    //       groupId: groupid,
    //       status: true,
    //       id: [...orderProductId],
    //     },
    //   });
    // } catch (e) {
    //   throw new Error(e);
    // }
  }
}
//order , order number 분ㄹ

// ordernumber : id, user, ordernumber, createAt,updatedAt,deletedAt
// orderlist: ordernumber, product[], count
