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
exports.PortfolioService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("../product/product.entity");
const typeorm_2 = require("typeorm");
const portfolio_entity_1 = require("./portfolio.entity");
let PortfolioService = class PortfolioService {
    constructor(repo, repoProd) {
        this.repo = repo;
        this.repoProd = repoProd;
    }
    async addPortfolio(name, description) {
        const portfolio = this.repo.create({ name, description });
        return this.repo.save(portfolio);
    }
    async updatePortfolio(id, attrs, idListProduct) {
        const portfolio = await this.repo.findOne(id);
        if (!portfolio) {
            throw new common_1.NotFoundException('portfolio not found');
        }
        const products = await this.repoProd.findByIds(idListProduct);
        portfolio.products = products;
        Object.assign(portfolio, attrs);
        return this.repo.save(portfolio);
    }
    async removePortfolio(id) {
        const portfolio = await this.repo.findOne(id);
        if (!portfolio) {
            throw new common_1.NotFoundException('portfolio not found');
        }
        return this.repo.remove(portfolio);
    }
};
PortfolioService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(portfolio_entity_1.Portfolio)),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PortfolioService);
exports.PortfolioService = PortfolioService;
//# sourceMappingURL=portfolio.service.js.map