import { CreateOrderRequestDto } from './dto/create-order-request.dto';
import { OrdersService } from './orders.service';
import { LoggedInGuard } from './../auth/Login.guard';
import { Body, Controller, Post, Session, UseGuards } from '@nestjs/common';

//@UseGuards(LoggedInGuard)
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  // 세션을 세션을 넣어주는 경우 or middleware에서 넣어주는 경우ß
  @Post()
  async createOrder(@Session() session, @Body() data) {
    const userid = session.user.id;
    const groupid = session.user.groupId;
    console.log('controller : ', data);
    return this.ordersService.createOrderTest({ userid, groupid, data });
  }
}
