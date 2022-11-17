import { IsEmail, IsString } from 'class-validator';

export class CreatePortfolioDto {
  @IsString()
  name: string;

  @IsString()
  description: string;
}
