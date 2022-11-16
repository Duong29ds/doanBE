import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
const cors = require('cors');
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cookieSession({
      keys: ['poiuytrewq'],
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      //this property make sure body request do not have any extra properties not nesessary incoming request
      whitelist: true,
    }),
  );
  const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
  app.use(cors(corsOptions));
  await app.listen(6789);
}
bootstrap();
