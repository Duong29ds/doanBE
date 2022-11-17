import { CreateProductDto } from './dtos/create-product.dto';
import { ProductService } from './product.service';
export declare class ProductController {
    private productService;
    constructor(productService: ProductService);
    createSupplier(body: CreateProductDto): Promise<import("./product.entity").Product>;
    removePortfolio(id: string): Promise<import("./product.entity").Product>;
}
