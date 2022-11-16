"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const cors = require('cors');
const cookieSession = require('cookie-session');
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cookieSession({
        keys: ['poiuytrewq'],
    }));
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
    }));
    app.use(cors());
    await app.listen(6789);
}
bootstrap();
//# sourceMappingURL=main.js.map