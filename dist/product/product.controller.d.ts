import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { DeleteListIdDto } from 'src/supplier/dtos/delete-supplier.dto';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductService } from './product.service';
export declare class ProductController {
    private productService;
    private cloudinary;
    constructor(productService: ProductService, cloudinary: CloudinaryService);
    getPortfolios(): Promise<import("./product.entity").Product[]>;
    getPortfolio(id: string): Promise<import("./product.entity").Product>;
    createSupplier(body: CreateProductDto): Promise<import("./product.entity").Product>;
    removePortfolio(id: string): Promise<import("./product.entity").Product>;
    removeSuppliers(body: DeleteListIdDto): Promise<import("./product.entity").Product[]>;
}
