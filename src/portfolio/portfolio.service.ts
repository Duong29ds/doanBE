import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/product.entity';
import { Repository } from 'typeorm';
import { Portfolio } from './portfolio.entity';

@Injectable()
export class PortfolioService {
    constructor(
        @InjectRepository(Portfolio) private repo: Repository<Portfolio>,
        @InjectRepository(Product) private repoProd: Repository<Product>) {}

    async addPortfolio(name: string, description: string){
        const portfolio = this.repo.create({ name, description });
        
        return this.repo.save(portfolio);
    }

    async updatePortfolio(id:number,attrs: Partial<Portfolio>, idListProduct:Array<number>){
        const portfolio = await this.repo.findOne(id);
        if (!portfolio) {
            throw new NotFoundException('portfolio not found');
        }
        const products= await this.repoProd.findByIds(idListProduct);
        portfolio.products=products;
        Object.assign(portfolio, attrs);
        return this.repo.save(portfolio);
    }

    async removePortfolio(id:number){
        const portfolio = await this.repo.findOne(id);
        if (!portfolio) {
          throw new NotFoundException('portfolio not found');
        }
        return this.repo.remove(portfolio);
    }
}
