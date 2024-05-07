// src/orders/orders.controller.ts
import { Controller, Get, UseGuards, Post, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(AuthGuard('oauth-bearer'))
  @Get()
  getOrders() {
    return this.ordersService.findOrders();
  }

  @UseGuards(AuthGuard('oauth-bearer'))
  @Post('cart')
  addToCart(@Body() item: any) {
    return this.ordersService.addToCart(item);
  }
}
