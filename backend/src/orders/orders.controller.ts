// src/orders/orders.controller.ts
import { Controller, Get, UseGuards, Post, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AzureADGuard } from 'src/auth/azure.strategy';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(new AzureADGuard())
  @Get()
  getOrders() {
    return this.ordersService.findOrders();
  }

  @UseGuards(new AzureADGuard())
  @Post('cart')
  addToCart(@Body() item: any) {
    return this.ordersService.addToCart(item);
  }
}
