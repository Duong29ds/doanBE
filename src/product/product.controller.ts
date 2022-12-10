import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { DeleteListIdDto } from 'src/supplier/dtos/delete-supplier.dto';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService,private cloudinary: CloudinaryService) {}

    @Get('/list')
    async getProducts(){
        return this.productService.getList()
    }

    @Get('/:id')
    async getProduct(@Param('id') id: string){
        return this.productService.getItem(id)
    }

    @Post('/new')
    async createProduct(@Body() body: CreateProductDto) {
      return this.productService.createProduct(body, body.idSup, body.idListPortfolio);
    }

    @Patch('/update/:id')
    async updateProduct(@Body() body: UpdateProductDto) {
      return this.productService.updateProduct(body, body.idSup);
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
