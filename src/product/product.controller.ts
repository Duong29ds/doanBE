import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) {}

    @Post('/new')
    async createSupplier(@Body() body: CreateProductDto) {
      return this.productService.createProduct(body, body.idSup, body.idListPortfolio);
    }

    @Delete('/delete/:id')
    removePortfolio(@Param('id') id: string) {
      return this.productService.removeProduct(parseInt(id));
    }
}
