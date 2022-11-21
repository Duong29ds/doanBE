/// <reference types="multer" />
export declare class CreateProductDto {
    name: string;
    description: string;
    total: number;
    price: number;
    images: Express.Multer.File;
    import_date: Date;
    post_service: string;
    idSup: number;
    idListPortfolio: Array<number>;
}
