import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { DeleteListIdDto } from 'src/supplier/dtos/delete-supplier.dto';
import { CreatePortfolioDto } from './dtos/create-portfolio.dto';
import { UpdatePortfolioDto } from './dtos/update-portfolio.dto';
import { PortfolioService } from './portfolio.service';

@Controller('portfolio')
export class PortfolioController {
    constructor(
        private portfolioService: PortfolioService,
    ) {}

    @Get('/:id')
    async getPortfolio(@Param('id') id: string){ 
      return this.portfolioService.getItem(id)
    }
  
    @Get('')
    async getPortfolios(){
        return this.portfolioService.getList()
    }

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

    @Delete('/delete')
    removeSuppliers(@Body() body:DeleteListIdDto) {
      return this.portfolioService.removePortfolios(body.idlist);
    }
}
