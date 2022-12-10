import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cloudinary } from 'src/cloudinary/cloudinary.entity';
import { Portfolio } from 'src/portfolio/portfolio.entity';
import { Supplier } from 'src/supplier/supplier.entity';
import { In, Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create-product.dto';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Cloudinary)
    private cloudinaryRepo: Repository<Cloudinary>,
    @InjectRepository(Product) private repo: Repository<Product>,
    @InjectRepository(Supplier) private repoSup: Repository<Supplier>,
    @InjectRepository(Portfolio) private repoPortf: Repository<Portfolio>,
  ) {}

  async getList() {
    return this.repo.find();
  }

  async getItem(id: string) {
    return this.repo.findOne(id);
  }

  async createProduct(
    productnew: CreateProductDto,
    idSup: number,
    idListPortfolio: Array<number>,
  ) {
    const { images, ...rest } = productnew;
    const cloudinary = await this.cloudinaryRepo.find({
      where: { id: In(images) },
    });
    const product = await this.repo.create(rest);
    product.cloudinarys = cloudinary;
    const supplier = await this.repoSup.findOne(idSup);

    const portfolios = await this.repoPortf.findByIds(idListPortfolio);

    product.supplier = supplier;
    product.portfolios = portfolios;

    return this.repo.save(product);
  }

  async removeProduct(id: number) {
    const product = await this.repo.findOne(id);
    if (!product) {
      throw new NotFoundException('portfolio not found');
    }
    return this.repo.remove(product);
  }

  async removeProducts(idList: Array<number>) {
    const products = await this.repo.findByIds(idList);
    if (!products) {
      throw new NotFoundException('products remove not found');
    }
    return this.repo.remove(products);
  }
}
