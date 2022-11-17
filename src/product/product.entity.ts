import { Optional } from '@nestjs/common';
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

    @ManyToOne(() => Supplier, (supplier) => supplier.products)
    supplier: Supplier;

    @ManyToMany(() => Portfolio, (portfolio) => portfolio.products)
    @JoinTable({name:'portfolio_product'})
    portfolios: Portfolio[]
  }
  