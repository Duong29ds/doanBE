import { Cloudinary } from 'src/cloudinary/cloudinary.entity';
import { ProductToOrder } from 'src/order/product_order.entity';
import { Portfolio } from 'src/portfolio/portfolio.entity';
import { Supplier } from 'src/supplier/supplier.entity';
export declare class Product {
    id: number;
    name: string;
    description: string;
    total: number;
    price: number;
    import_date: Date;
    post_service: string;
    supplier: Supplier;
    cloudinarys: Cloudinary[];
    portfolios: Portfolio[];
    productToOrders: ProductToOrder[];
}
