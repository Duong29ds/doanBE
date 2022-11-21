import { IsString, IsOptional, IsArray } from 'class-validator';

export class DeleteListIdDto {
  @IsArray()
  idlist: Array<number>;
}
