import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Portfolio } from 'src/portfolio/portfolio.entity';
import { Supplier } from 'src/supplier/supplier.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create-product.dto';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product) private repo: Repository<Product>,
        @InjectRepository(Supplier) private repoSup: Repository<Supplier>,
        @InjectRepository(Portfolio) private repoPortf: Repository<Portfolio>) {}
    

    async createProduct(productnew: CreateProductDto, idSup: number, idListPortfolio:Array<number>){
        const product =await this.repo.create(productnew);
        const supplier=await this.repoSup.findOne(idSup);

        const portfolios=await this.repoPortf.findByIds(idListPortfolio)

        product.supplier=supplier;
        product.portfolios=portfolios;

        return this.repo.save(product);
    }

    async removeProduct(id:number){
        const product = await this.repo.findOne(id);
        if (!product) {
          throw new NotFoundException('portfolio not found');
        }
        return this.repo.remove(product);
    }
}
