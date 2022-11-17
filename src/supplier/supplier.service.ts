import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supplier } from './supplier.entity';

@Injectable()
export class SupplierService {
    constructor(@InjectRepository(Supplier) private repo: Repository<Supplier>) {}

    async addSupplier(name: string, description: string){
        const supplier = this.repo.create({ name, description });
        
        return this.repo.save(supplier);
    }

    async updateSupplier(id:number,attrs: Partial<Supplier>){
        const supplier = await this.repo.findOne(id);
        if (!supplier) {
            throw new NotFoundException('supplier not found');
          }
          Object.assign(supplier, attrs);
        return this.repo.save(supplier);
    }

    async removeSupplier(id:number){
        const supplier = await this.repo.findOne(id);
        if (!supplier) {
          throw new NotFoundException('supplier not found');
        }
        return this.repo.remove(supplier);
    }
}
