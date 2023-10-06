import { IsNotEmpty, IsNumber } from 'class-validator';

export class createEmailNumberDto {
  @IsNumber()
  @IsNotEmpty()
  number: number;
}
