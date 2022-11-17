import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { CreateSupplierDto } from './dtos/create-supplier.dto';
import { UpdateSupplierDto } from './dtos/update-supplier.dto';
import { SupplierService } from './supplier.service';

@Controller('supplier')
export class SupplierController {
    constructor(
        private supplierService: SupplierService,
      ) {}
    @Post('/new')
    async createSupplier(@Body() body: CreateSupplierDto) {
      return this.supplierService.addSupplier(body.name, body.description);
    }

    @Patch('/update/:id')
    async updateSupplier(@Param('id') id: string, @Body() body: UpdateSupplierDto){
      return this.supplierService.updateSupplier(parseInt(id), body);
    }

    @Delete('/delete/:id')
    removeSupplier(@Param('id') id: string) {
      return this.supplierService.removeSupplier(parseInt(id));
    }
}
