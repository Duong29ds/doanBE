import { Cloudinary } from 'src/cloudinary/cloudinary.entity';
import { Portfolio } from 'src/portfolio/portfolio.entity';
import { Supplier } from 'src/supplier/supplier.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { Product } from './product.entity';
export declare class ProductService {
    private cloudinaryRepo;
    private repo;
    private repoSup;
    private repoPortf;
    constructor(cloudinaryRepo: Repository<Cloudinary>, repo: Repository<Product>, repoSup: Repository<Supplier>, repoPortf: Repository<Portfolio>);
    getItem(id: string): Promise<Product>;
    getList(): Promise<Product[]>;
    createProduct(productnew: CreateProductDto, idSup: number, idListPortfolio: Array<number>): Promise<Product>;
    updateProduct(productnew: UpdateProductDto, idSup: number): Promise<Product>;
    removeProduct(id: number): Promise<Product>;
    removeProducts(idList: Array<number>): Promise<Product[]>;
}
