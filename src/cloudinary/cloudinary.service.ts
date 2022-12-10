import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cloudinary } from './cloudinary.entity';
@Injectable()
export class CloudinaryService {
  constructor(
    @InjectRepository(Cloudinary)
    private cloudinaryRepo: Repository<Cloudinary>,
  ) {}
  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
      toStream(file.buffer).pipe(upload);
    });
  }
  async uploadMultipleFiles(files: Express.Multer.File[]) {
    const res = files.map((file) => {
      return this.uploadImage(file);
    });
    const images = await Promise.all(res);
    const cloudinary = images.map((image) => {
      return this.cloudinaryRepo.save({
        url: image.url,
      });
    });
    return Promise.all(cloudinary);
  }
}
