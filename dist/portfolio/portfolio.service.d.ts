import { Product } from 'src/product/product.entity';
import { Repository } from 'typeorm';
import { Portfolio } from './portfolio.entity';
export declare class PortfolioService {
    private repo;
    private repoProd;
    constructor(repo: Repository<Portfolio>, repoProd: Repository<Product>);
    addPortfolio(name: string, description: string): Promise<Portfolio>;
    updatePortfolio(id: number, attrs: Partial<Portfolio>, idListProduct: Array<number>): Promise<Portfolio>;
    removePortfolio(id: number): Promise<Portfolio>;
}
