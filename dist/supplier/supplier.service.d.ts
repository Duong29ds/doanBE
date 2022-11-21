import { Repository } from 'typeorm';
import { Supplier } from './supplier.entity';
export declare class SupplierService {
    private repo;
    constructor(repo: Repository<Supplier>);
    getItem(id: string): Promise<Supplier>;
    getList(): Promise<Supplier[]>;
    addSupplier(name: string, description: string): Promise<Supplier>;
    updateSupplier(id: number, attrs: Partial<Supplier>): Promise<Supplier>;
    removeSupplier(id: number): Promise<Supplier>;
    removeSuppliers(idList: Array<number>): Promise<Supplier[]>;
}
