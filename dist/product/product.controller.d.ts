import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { DeleteListIdDto } from 'src/supplier/dtos/delete-supplier.dto';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { ProductService } from './product.service';
export declare class ProductController {
    private productService;
    private cloudinary;
    constructor(productService: ProductService, cloudinary: CloudinaryService);
    getProducts(): Promise<import("./product.entity").Product[]>;
    getProduct(id: string): Promise<import("./product.entity").Product>;
    createProduct(body: CreateProductDto): Promise<import("./product.entity").Product>;
    updateProduct(body: UpdateProductDto): Promise<import("./product.entity").Product>;
    removePortfolio(id: string): Promise<import("./product.entity").Product>;
    removeSuppliers(body: DeleteListIdDto): Promise<import("./product.entity").Product[]>;
}
