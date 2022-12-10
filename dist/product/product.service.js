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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cloudinary_entity_1 = require("../cloudinary/cloudinary.entity");
const portfolio_entity_1 = require("../portfolio/portfolio.entity");
const supplier_entity_1 = require("../supplier/supplier.entity");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./product.entity");
let ProductService = class ProductService {
    constructor(cloudinaryRepo, repo, repoSup, repoPortf) {
        this.cloudinaryRepo = cloudinaryRepo;
        this.repo = repo;
        this.repoSup = repoSup;
        this.repoPortf = repoPortf;
    }
    async getItem(id) {
        return this.repo.findOne(id, {
            relations: ['supplier'],
        });
    }
    async getList() {
        return this.repo.find();
    }
    async createProduct(productnew, idSup, idListPortfolio) {
        const { images } = productnew, rest = __rest(productnew, ["images"]);
        const cloudinary = await this.cloudinaryRepo.find({
            where: { id: (0, typeorm_2.In)(images) },
        });
        const product = await this.repo.create(rest);
        product.cloudinarys = cloudinary;
        const supplier = await this.repoSup.findOne(idSup);
        const portfolios = await this.repoPortf.findByIds(idListPortfolio);
        product.supplier = supplier;
        product.portfolios = portfolios;
        return this.repo.save(product);
    }
    async updateProduct(productnew, idSup) {
        const product = await this.repo.findOne(productnew.id);
        if (!product) {
            throw new common_1.NotFoundException('product not found');
        }
        const supplier = await this.repoSup.findOne(idSup);
        product.supplier = supplier;
        Object.assign(product, productnew);
        console.log(product, 'product updated');
        console.log(idSup, 'idSup updated');
        return this.repo.save(product);
    }
    async removeProduct(id) {
        const product = await this.repo.findOne(id);
        if (!product) {
            throw new common_1.NotFoundException('portfolio not found');
        }
        return this.repo.remove(product);
    }
    async removeProducts(idList) {
        const products = await this.repo.findByIds(idList);
        if (!products) {
            throw new common_1.NotFoundException('products remove not found');
        }
        return this.repo.remove(products);
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cloudinary_entity_1.Cloudinary)),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(2, (0, typeorm_1.InjectRepository)(supplier_entity_1.Supplier)),
    __param(3, (0, typeorm_1.InjectRepository)(portfolio_entity_1.Portfolio)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map