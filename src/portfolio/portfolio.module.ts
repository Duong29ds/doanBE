import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/product/product.entity';
import { PortfolioController } from './portfolio.controller';
import { Portfolio } from './portfolio.entity';
import { PortfolioService } from './portfolio.service';

@Module({
  imports:[TypeOrmModule.forFeature([Portfolio, Product])],
  controllers: [PortfolioController],
  providers: [PortfolioService],
  exports:[PortfolioModule]
})
export class PortfolioModule {}
