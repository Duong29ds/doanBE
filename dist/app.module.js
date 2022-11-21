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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const reports_module_1 = require("./reports/reports.module");
const user_entity_1 = require("./users/user.entity");
const report_entity_1 = require("./reports/report.entity");
const core_1 = require("@nestjs/core");
const auth_module_1 = require("./auth/auth.module");
const ability_module_1 = require("./ability/ability.module");
const supplier_module_1 = require("./supplier/supplier.module");
const supplier_entity_1 = require("./supplier/supplier.entity");
const product_module_1 = require("./product/product.module");
const product_entity_1 = require("./product/product.entity");
const portfolio_module_1 = require("./portfolio/portfolio.module");
const portfolio_entity_1 = require("./portfolio/portfolio.entity");
const cloudinary_module_1 = require("./cloudinary/cloudinary.module");
const cookieSession = require('cookie-session');
let AppModule = class AppModule {
    constructor(configService) {
        this.configService = configService;
    }
    configure(consumer) {
        consumer
            .apply(cookieSession({
            keys: [this.configService.get('COOKIE_KEY')],
        }))
            .forRoutes('*');
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: `.env.${process.env.NODE_ENV}`,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (config) => {
                    return {
                        type: 'postgres',
                        host: 'localhost',
                        database: config.get('DB_NAME'),
                        port: config.get('DB_PORT'),
                        username: config.get('DB_USERNAME'),
                        password: config.get('DB_PASSWORD'),
                        synchronize: true,
                        entities: [user_entity_1.User, report_entity_1.Report, supplier_entity_1.Supplier, product_entity_1.Product, portfolio_entity_1.Portfolio],
                    };
                },
            }),
            users_module_1.UsersModule,
            reports_module_1.ReportsModule,
            auth_module_1.AuthModule,
            ability_module_1.AbilityModule,
            supplier_module_1.SupplierModule,
            product_module_1.ProductModule,
            portfolio_module_1.PortfolioModule,
            cloudinary_module_1.CloudinaryModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_PIPE,
                useValue: new common_1.ValidationPipe({
                    whitelist: true,
                }),
            },
        ],
    }),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map