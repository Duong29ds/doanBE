import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateOrderDto } from './dtos/create-order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
    constructor(
        private orderService: OrderService,
    ) {}

    @Get('/list')
    async getOrders(){
        return this.orderService.getAll()
    }

    @Get('/:id')
    async getOrder(@Param('id') id: string){
        return this.orderService.getItem(id)
    }

    @Post('/new')
    async addOrder(@Body() body: CreateOrderDto){
        return this.orderService.createOrder(body)
    }
}
