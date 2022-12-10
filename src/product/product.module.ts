import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cloudinary } from 'src/cloudinary/cloudinary.entity';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { Portfolio } from 'src/portfolio/portfolio.entity';
import { PortfolioModule } from 'src/portfolio/portfolio.module';
import { Supplier } from 'src/supplier/supplier.entity';
import { SupplierModule } from 'src/supplier/supplier.module';
import { ProductController } from './product.controller';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Supplier, Portfolio, Cloudinary]),
    SupplierModule,
    PortfolioModule,
    CloudinaryModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductModule],
})
export class ProductModule {}
