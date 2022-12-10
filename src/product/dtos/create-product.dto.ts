import { Type } from 'class-transformer';
import {
    IsString,
    IsNumber,
    IsDate,
    IsArray,
    IsOptional,
  } from 'class-validator';
  export class CreateProductDto {  
    @IsString()
    name: string;  
    
    @IsString()
    description: string;
  
    @IsNumber()
    total: number;

    @IsNumber()
    price: number;

    @IsArray()
    images: Express.Multer.File

    @Type(() => Date)
    @IsDate()
    import_date: Date;

    @IsString()
    post_service: string;

    @IsOptional()
    @IsNumber()
    idSup: number;  

    @IsOptional()
    @IsArray()
    idListPortfolio:Array<number>;
  }
  