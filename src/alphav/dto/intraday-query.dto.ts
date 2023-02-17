import { IsString, IsOptional } from 'class-validator';
export class IntradayQueryDto {
  constructor(query: IntradayQueryDto) {
    if (query) Object.assign(this, query);
  }
  @IsString()
  ticker!: string;

  @IsOptional()
  @IsString()
  interval?: string;

  @IsOptional()
  @IsString()
  datasize?: string;
}
