import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { CreatePortfolioDto } from './dtos/create-portfolio.dto';
import { UpdatePortfolioDto } from './dtos/update-portfolio.dto';
import { PortfolioService } from './portfolio.service';

@Controller('portfolio')
export class PortfolioController {
    constructor(
        private portfolioService: PortfolioService,
      ) {}
    @Post('/new')
    async createPortfolio(@Body() body: CreatePortfolioDto) {
      return this.portfolioService.addPortfolio(body.name, body.description);
    }

    @Patch('/update/:id')
    async updatePortfolio(@Param('id') id: string, @Body() body: UpdatePortfolioDto){
      return this.portfolioService.updatePortfolio(parseInt(id), body, body.idListProduct);
    }
    

    @Delete('/delete/:id')
    removePortfolio(@Param('id') id: string) {
      return this.portfolioService.removePortfolio(parseInt(id));
    }
}
