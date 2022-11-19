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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const portfolio_entity_1 = require("../portfolio/portfolio.entity");
const supplier_entity_1 = require("../supplier/supplier.entity");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./product.entity");
let ProductService = class ProductService {
    constructor(repo, repoSup, repoPortf) {
        this.repo = repo;
        this.repoSup = repoSup;
        this.repoPortf = repoPortf;
    }
    async createProduct(productnew, idSup, idListPortfolio) {
        const product = await this.repo.create(productnew);
        const supplier = await this.repoSup.findOne(idSup);
        const portfolios = await this.repoPortf.findByIds(idListPortfolio);
        product.supplier = supplier;
        product.portfolios = portfolios;
        return this.repo.save(product);
    }
    async removeProduct(id) {
        const product = await this.repo.findOne(id);
        if (!product) {
            throw new common_1.NotFoundException('portfolio not found');
        }
        return this.repo.remove(product);
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(supplier_entity_1.Supplier)),
    __param(2, (0, typeorm_1.InjectRepository)(portfolio_entity_1.Portfolio)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map