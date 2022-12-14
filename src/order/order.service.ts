import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/product.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dtos/create-order.dto';
import { Order } from './order.entity';
import { ProductToOrder } from './product_order.entity';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order) private repo: Repository<Order>,
        @InjectRepository(Product) private repoProd: Repository<Product>,
        @InjectRepository(ProductToOrder) private repoProdOrder: Repository<ProductToOrder>,
    ) {}

    async getAll(){
        return this.repo.find()
    }

    async getItem(id: string){
        const products =await this.repoProd
        .createQueryBuilder('product')
        .innerJoin('product.productToOrders', 'product_order')
        .getMany();

        const product_orders =await this.repoProdOrder
        .createQueryBuilder('product_order')
        .innerJoin('product_order.product', 'product')
        .getMany();

        const productsRes=products.map((item,index)=>{
            return {...item,total:product_orders[index].total}
        })

        const orderTemp=await this.repo.findOne(id)
        
        return {...orderTemp, products:productsRes}
    }

    async createOrder(orderData: CreateOrderDto){
        const idProductList = orderData.ProductList.map(item=>item.id);
        const order = await this.repo.create(orderData)
        const products= await this.repoProd.findByIds(idProductList);

        products.map(async(item,index)=>{
            const product_order= await this.repoProdOrder.create();
            product_order.order = order;
            product_order.product=item;
            product_order.total=orderData.ProductList[index].total;
            this.repoProdOrder.save(product_order);
            return product_order
        })
        
        return this.repo.save(order)
    }
}
