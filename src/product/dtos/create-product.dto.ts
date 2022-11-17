import { Type } from 'class-transformer';
import {
    IsString,
    IsNumber,
    IsDate,
    IsArray,
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

    @Type(() => Date)
    @IsDate()
    import_date: Date;

    @IsString()
    post_service: string;

    @IsNumber()
    idSup: number;  

    @IsArray()
    idListPortfolio:Array<number>;
  }
  