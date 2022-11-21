import { BadRequestException, Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { DeleteListIdDto } from 'src/supplier/dtos/delete-supplier.dto';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService,private cloudinary: CloudinaryService) {}

    @Get('/list')
    async getPortfolios(){
        return this.productService.getList()
    }

    @Get('/:id')
    async getPortfolio(@Param('id') id: string){
        return this.productService.getItem(id)
    }

    @Post('/new')
    async createSupplier(@Body() body: CreateProductDto) {
      console.log(body,'body');
      return this.productService.createProduct(body, body.idSup, body.idListPortfolio);
    }

    @Delete('/delete/:id')
    removePortfolio(@Param('id') id: string) {
      return this.productService.removeProduct(parseInt(id));
    }

    @Delete('/delete')
    removeSuppliers(@Body() body:DeleteListIdDto) {
      return this.productService.removeProducts(body.idlist);
    }
}
