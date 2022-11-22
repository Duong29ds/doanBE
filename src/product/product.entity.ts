import { Optional } from '@nestjs/common';
import { Cloudinary } from 'src/cloudinary/cloudinary.entity';
import { ProductToOrder } from 'src/order/product_order.entity';
import { Portfolio } from 'src/portfolio/portfolio.entity';
import { Supplier } from 'src/supplier/supplier.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    ManyToOne,
    ManyToMany,
    JoinTable,
  } from 'typeorm';
  
  @Entity()
  export class Product {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;  
    
    @Column()
    description: string;
  
    @Column()
    total: number;

    @Column()
    price: number;

    @Column()
    import_date: Date;

    @Column()
    post_service: string;

    @ManyToOne(() => Supplier, (supplier) => supplier.products,{onDelete:'SET NULL'})
    supplier: Supplier;

    @OneToMany(() => Cloudinary, (cloudinary) => cloudinary.product)
    cloudinarys: Cloudinary[];

    @ManyToMany(() => Portfolio, (portfolio) => portfolio.products)
    @JoinTable({name:'portfolio_product'})
    portfolios: Portfolio[]

    @OneToMany(() => ProductToOrder, productToOrder => productToOrder.product)
    public productToOrders!: ProductToOrder[];
}
  