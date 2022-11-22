import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsDate, IsEmail, IsNumber, IsString } from 'class-validator';

export type IProduct={
    id:number;
    total:number
}

export class CreateOrderDto {
    @IsBoolean()
    is_export: boolean;  
    
    @IsNumber()
    value:number;

    @Type(() => Date)
    @IsDate()
    order_date:Date;

    @Type(() => Date)
    @IsDate()
    expire_date:Date;

    @IsString()
    more_info: string;

    @IsArray()
    ProductList: IProduct[];
}
