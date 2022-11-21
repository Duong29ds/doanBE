"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const supplier_entity_1 = require("./supplier.entity");
let SupplierService = class SupplierService {
    constructor(repo) {
        this.repo = repo;
    }
    async getItem(id) {
        return this.repo.findOne(id);
    }
    async getList() {
        return this.repo.find();
    }
    async addSupplier(name, description) {
        const supplier = this.repo.create({ name, description });
        return this.repo.save(supplier);
    }
    async updateSupplier(id, attrs) {
        const supplier = await this.repo.findOne(id);
        if (!supplier) {
            throw new common_1.NotFoundException('supplier not found');
        }
        Object.assign(supplier, attrs);
        return this.repo.save(supplier);
    }
    async removeSupplier(id) {
        const supplier = await this.repo.findOne(id);
        if (!supplier) {
            throw new common_1.NotFoundException('supplier not found');
        }
        return this.repo.remove(supplier);
    }
    async removeSuppliers(idList) {
        const suppliers = await this.repo.findByIds(idList);
        if (!suppliers) {
            throw new common_1.NotFoundException('supplier remove not found');
        }
        return this.repo.remove(suppliers);
    }
};
SupplierService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(supplier_entity_1.Supplier)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SupplierService);
exports.SupplierService = SupplierService;
//# sourceMappingURL=supplier.service.js.map