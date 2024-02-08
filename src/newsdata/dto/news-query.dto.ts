import { IsString } from 'class-validator';

export class NewsQueryDto {
  @IsString()
  ticker: string;
}
