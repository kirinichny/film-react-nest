import { Body, Controller, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import {
  CreateOrderRequestDto,
  OrderConfirmationResponseDto,
} from './dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(
    @Body() createOrderDto: CreateOrderRequestDto,
  ): Promise<OrderConfirmationResponseDto> {
    return this.orderService.createOrder(createOrderDto);
  }
}
