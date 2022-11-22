import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrderDto } from './dtos/create-order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
    constructor(
        private orderService: OrderService,
    ) {}

    @Post('/new')
    async addOrder(@Body() body: CreateOrderDto){
        return this.orderService.createOrder(body)
    }
}
