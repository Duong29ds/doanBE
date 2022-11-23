import { User } from 'src/users/user.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    ManyToOne,
  } from 'typeorm';
import { ProductToOrder } from './product_order.entity';
  
  @Entity()
  export class Order {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    is_export: boolean;  
    
    @Column()
    value:number;

    @Column()
    order_date:Date;

    @Column()
    expire_date:Date;

    @Column()
    more_info: string;

    @OneToMany(() => ProductToOrder, productToOrder => productToOrder.order)
    public productToOrders!: ProductToOrder[];

    @ManyToOne(() => User, (user) => user.orders)
    user: User;
}
  