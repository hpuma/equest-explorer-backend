import { IsNotEmpty, IsString } from 'class-validator';

export class NewsQueryDto {
  constructor(query: NewsQueryDto) {
    if (query) Object.assign(this, query);
  }

  @IsNotEmpty()
  @IsString()
  ticker!: string;
}
