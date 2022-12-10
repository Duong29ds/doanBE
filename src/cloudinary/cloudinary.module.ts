import { Module } from '@nestjs/common';
import { CloudinaryProvider } from './cloudinary.provider';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryController } from './cloudinary.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cloudinary } from './cloudinary.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cloudinary])],
  providers: [CloudinaryProvider, CloudinaryService],
  exports: [CloudinaryProvider, CloudinaryService],
  controllers: [CloudinaryController],
})
export class CloudinaryModule {}
