import { IsString, IsOptional, IsArray } from 'class-validator';
import { Product } from 'src/product/product.entity';

export class UpdatePortfolioDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsArray()
  @IsOptional()
  idListProduct: Array<number>

  // @IsArray()
  // @IsOptional()
  // products: Array<Product>
}
