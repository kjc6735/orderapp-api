import { OrderDetail } from './../../entities/OrderDetail.entity';
import { CreateOrderRequestDto } from './dto/create-order-request.dto';
import { GroupProduct } from 'entities/GroupProduct.entity';
import { Group } from 'entities/Group.entity';
import { Category } from 'entities/Category.entity';
import { Product } from 'entities/Product.entity';
import { User } from 'entities/User.entity';
import {
  Injectable,
  ForbiddenException,
  Inject,
  All,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, QueryBuilder, Repository } from 'typeorm';
import { Order } from 'entities/Order.entity';
import { query } from 'express';
import { In } from 'typeorm';

const n = 5;
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
    @InjectRepository(User) private usersRepository: Repository<User>,
    private connection: Connection,
  ) {}
  async createOrder({ userid, groupid, data }) {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    const user = userid;
    const userGroup = groupid;

    const test = [
      { id: 1, count: 1 },
      { id: 2, count: 3 },
      { id: 7, count: 4 },
      { id: 7, count: 4 },

    ];

    const idCol = test.map((item) => item.id);

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const isItem = await this.groupProductRepository.find({
      where: {
        id: { ...idCol },
      },
    });
    console.log(isItem);

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

  // groupProductid or productid ... 흠...
  async createOrderTest({ userid, groupid, data }) {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const rand = randNumber(n);

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const orderNumber = `${year}${month}${day}${rand}`;
      const order = await queryRunner.manager.getRepository(Order).create();
      order.price = 10000;
      order.userId = userid;
      order.orderNumber = orderNumber;
      const orderInsertResult = await queryRunner.manager.save(order);
      console.log('data : ', data);
      data.map(async (i) => {
        const isProduct = await queryRunner.manager
          .getRepository(GroupProduct)
          .findOne({
            where: {
              productId: i.id,
              groupId: groupid,
            },
          });
        console.log(isProduct);
        const orderDetail = await queryRunner.manager
          .getRepository(OrderDetail)
          .create();
        orderDetail.orderId = orderInsertResult.id;
        orderDetail.productId = i.id;
        orderDetail.count = i.count;
        orderDetail.price = 1000;
        await queryRunner.manager.getRepository(OrderDetail).save(orderDetail);
      });
      await queryRunner.commitTransaction();
      return true;
    } catch (e) {
      queryRunner.rollbackTransaction();
      throw new BadRequestException('다시 시도해주세요!');
    }

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
