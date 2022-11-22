import { Product } from "src/product/product.entity"
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Order } from "./order.entity"

@Entity({name: 'product_order'})
export class ProductToOrder {
    @PrimaryGeneratedColumn()
    public postToCategoryId!: number

    @Column()
    public total!: number

    @ManyToOne(() => Product, (product) => product.productToOrders)
    public product!: Product

    @ManyToOne(() => Order, (order) => order.productToOrders)
    public order!: Order
}