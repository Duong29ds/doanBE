import { CreatePortfolioDto } from './dtos/create-portfolio.dto';
import { UpdatePortfolioDto } from './dtos/update-portfolio.dto';
import { PortfolioService } from './portfolio.service';
export declare class PortfolioController {
    private portfolioService;
    constructor(portfolioService: PortfolioService);
    createPortfolio(body: CreatePortfolioDto): Promise<import("./portfolio.entity").Portfolio>;
    updatePortfolio(id: string, body: UpdatePortfolioDto): Promise<import("./portfolio.entity").Portfolio>;
    removePortfolio(id: string): Promise<import("./portfolio.entity").Portfolio>;
}
