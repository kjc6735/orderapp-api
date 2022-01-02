import { OrdersService } from './orders.service';
import { LoggedInGuard } from './../auth/Login.guard';
import { Controller, Post, UseGuards } from '@nestjs/common';

//@UseGuards(LoggedInGuard)
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}
  /*
  
  
  */
  // @Post()
  // async order(@User) {}
}
