import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class GetQueryDto {
  constructor(query: GetQueryDto) {
    if (query) Object.assign(this, query);
  }

  @IsString()
  @IsNotEmpty()
  q: string;

  @IsString()
  @IsOptional()
  freshness: string;
}
