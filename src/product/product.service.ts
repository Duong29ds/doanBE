import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Portfolio } from 'src/portfolio/portfolio.entity';
import { Supplier } from 'src/supplier/supplier.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
    constructor(
    @InjectRepository(Product) private repo: Repository<Product>,
    @InjectRepository(Supplier) private repoSup: Repository<Supplier>,
    @InjectRepository(Portfolio) private repoPortf: Repository<Portfolio>) {}
    
    async getList(){
        return this.repo.find();
    }

    async getItem(id:string){
        return this.repo.findOne(id,{
            relations: ["supplier"]
        });
    }

    async createProduct(productnew: CreateProductDto, idSup: number, idListPortfolio:Array<number>){
        const product =await this.repo.create(productnew);
        const supplier=await this.repoSup.findOne(idSup);

        const portfolios=await this.repoPortf.findByIds(idListPortfolio)

        product.supplier=supplier;
        product.portfolios=portfolios;

        return this.repo.save(product);
    }

    async updateProduct(productnew: UpdateProductDto, idSup: number){
        const product =await this.repo.findOne(productnew.id);
        if (!product) {
            throw new NotFoundException('product not found');
        }
        const supplier=await this.repoSup.findOne(idSup);

        product.supplier=supplier;
        Object.assign(product, productnew);

        console.log(product,'product updated');
        console.log(idSup,'idSup updated');

        return this.repo.save(product);
    }

    async removeProduct(id:number){
        const product = await this.repo.findOne(id);
        if (!product) {
          throw new NotFoundException('portfolio not found');
        }
        return this.repo.remove(product);
    }

    async removeProducts(idList:Array<number>){
        const products=await this.repo.findByIds(idList)
        if (!products) {
            throw new NotFoundException('products remove not found');
        }
        return this.repo.remove(products)
    }
}
