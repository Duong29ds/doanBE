import { CreateSupplierDto } from './dtos/create-supplier.dto';
import { UpdateSupplierDto } from './dtos/update-supplier.dto';
import { SupplierService } from './supplier.service';
export declare class SupplierController {
    private supplierService;
    constructor(supplierService: SupplierService);
    createSupplier(body: CreateSupplierDto): Promise<import("./supplier.entity").Supplier>;
    updateSupplier(id: string, body: UpdateSupplierDto): Promise<import("./supplier.entity").Supplier>;
    removeSupplier(id: string): Promise<import("./supplier.entity").Supplier>;
}
