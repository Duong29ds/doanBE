"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PortfolioModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortfolioModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("../product/product.entity");
const portfolio_controller_1 = require("./portfolio.controller");
const portfolio_entity_1 = require("./portfolio.entity");
const portfolio_service_1 = require("./portfolio.service");
let PortfolioModule = PortfolioModule_1 = class PortfolioModule {
};
PortfolioModule = PortfolioModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([portfolio_entity_1.Portfolio, product_entity_1.Product])],
        controllers: [portfolio_controller_1.PortfolioController],
        providers: [portfolio_service_1.PortfolioService],
        exports: [PortfolioModule_1]
    })
], PortfolioModule);
exports.PortfolioModule = PortfolioModule;
//# sourceMappingURL=portfolio.module.js.map