import { DeleteListIdDto } from 'src/supplier/dtos/delete-supplier.dto';
import { CreatePortfolioDto } from './dtos/create-portfolio.dto';
import { UpdatePortfolioDto } from './dtos/update-portfolio.dto';
import { PortfolioService } from './portfolio.service';
export declare class PortfolioController {
    private portfolioService;
    constructor(portfolioService: PortfolioService);
    getPortfolio(id: string): Promise<{
        products: import("../product/product.entity").Product[];
        id: number;
        name: string;
        description: string;
    }>;
    getPortfolios(): Promise<import("./portfolio.entity").Portfolio[]>;
    createPortfolio(body: CreatePortfolioDto): Promise<import("./portfolio.entity").Portfolio>;
    updatePortfolio(id: string, body: UpdatePortfolioDto): Promise<import("./portfolio.entity").Portfolio>;
    removePortfolio(id: string): Promise<import("./portfolio.entity").Portfolio>;
    removeSuppliers(body: DeleteListIdDto): Promise<import("./portfolio.entity").Portfolio[]>;
}
