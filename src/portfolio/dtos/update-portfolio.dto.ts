import { IsString, IsOptional, IsArray } from 'class-validator';

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
}
