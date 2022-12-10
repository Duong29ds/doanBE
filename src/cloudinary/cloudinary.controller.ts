import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';

@Controller('cloudinary')
export class CloudinaryController {
  constructor(private cloudinary: CloudinaryService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log('uploadFile', file);
    return await this.cloudinary.uploadImage(file).catch((e) => {
      console.log(e);
      throw new BadRequestException('Invalid file type.');
    });
  }

  @Post('/multiple')
  @UseInterceptors(AnyFilesInterceptor())
  async uploadMultipleFile(@UploadedFiles() file: Array<Express.Multer.File>) {
    console.log('uploadFile', file);
    return await this.cloudinary.uploadMultipleFiles(file).catch((e) => {
      console.log(e);
      throw new BadRequestException('Invalid file type.');
    });
  }
}
