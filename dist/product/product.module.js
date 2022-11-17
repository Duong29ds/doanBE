"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ProductModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const portfolio_entity_1 = require("../portfolio/portfolio.entity");
const portfolio_module_1 = require("../portfolio/portfolio.module");
const supplier_entity_1 = require("../supplier/supplier.entity");
const supplier_module_1 = require("../supplier/supplier.module");
const product_controller_1 = require("./product.controller");
const product_entity_1 = require("./product.entity");
const product_service_1 = require("./product.service");
let ProductModule = ProductModule_1 = class ProductModule {
};
ProductModule = ProductModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([product_entity_1.Product, supplier_entity_1.Supplier, portfolio_entity_1.Portfolio]), supplier_module_1.SupplierModule, portfolio_module_1.PortfolioModule],
        controllers: [product_controller_1.ProductController],
        providers: [product_service_1.ProductService],
        exports: [ProductModule_1]
    })
], ProductModule);
exports.ProductModule = ProductModule;
//# sourceMappingURL=product.module.js.map