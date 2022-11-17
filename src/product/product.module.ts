import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Portfolio } from 'src/portfolio/portfolio.entity';
import { PortfolioModule } from 'src/portfolio/portfolio.module';
import { Supplier } from 'src/supplier/supplier.entity';
import { SupplierModule } from 'src/supplier/supplier.module';
import { ProductController } from './product.controller';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Module({
  imports:[TypeOrmModule.forFeature([Product,Supplier,Portfolio]), SupplierModule, PortfolioModule],
  controllers: [ProductController],
  providers: [ProductService],
  exports:[ProductModule]
})
export class ProductModule {}
