import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/product/product.entity';
import { OrderController } from './order.controller';
import { Order } from './order.entity';
import { OrderService } from './order.service';
import { ProductToOrder } from './product_order.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Order, ProductToOrder,Product])],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
