import { Product } from 'src/product/product.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
  } from 'typeorm';
  
  @Entity()
  export class Supplier {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    description: string;

    @OneToMany(() => Product, (product) => product.supplier)
    products: Product[];
}
  