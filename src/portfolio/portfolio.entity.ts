import { Product } from 'src/product/product.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToMany,
  } from 'typeorm';
  
  @Entity()
  export class Portfolio {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    description: string;

    @ManyToMany(() => Product, (product) => product.portfolios)
    products: Product[]
}
  