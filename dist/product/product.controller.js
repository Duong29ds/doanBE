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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
const delete_supplier_dto_1 = require("../supplier/dtos/delete-supplier.dto");
const create_product_dto_1 = require("./dtos/create-product.dto");
const update_product_dto_1 = require("./dtos/update-product.dto");
const product_service_1 = require("./product.service");
let ProductController = class ProductController {
    constructor(productService, cloudinary) {
        this.productService = productService;
        this.cloudinary = cloudinary;
    }
    async getProducts() {
        return this.productService.getList();
    }
    async getProduct(id) {
        return this.productService.getItem(id);
    }
    async createProduct(body) {
        return this.productService.createProduct(body, body.idSup, body.idListPortfolio);
    }
    async updateProduct(body) {
        return this.productService.updateProduct(body, body.idSup);
    }
    removePortfolio(id) {
        return this.productService.removeProduct(parseInt(id));
    }
    removeSuppliers(body) {
        return this.productService.removeProducts(body.idlist);
    }
};
__decorate([
    (0, common_1.Get)('/list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProducts", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProduct", null);
__decorate([
    (0, common_1.Post)('/new'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createProduct", null);
__decorate([
    (0, common_1.Patch)('/update/:id'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_product_dto_1.UpdateProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateProduct", null);
__decorate([
    (0, common_1.Delete)('/delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "removePortfolio", null);
__decorate([
    (0, common_1.Delete)('/delete'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_supplier_dto_1.DeleteListIdDto]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "removeSuppliers", null);
ProductController = __decorate([
    (0, common_1.Controller)('product'),
    __metadata("design:paramtypes", [product_service_1.ProductService, cloudinary_service_1.CloudinaryService])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map