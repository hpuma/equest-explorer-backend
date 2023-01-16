import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
export class GetEverythingQueryDto {
  constructor(query: GetEverythingQueryDto) {
    if (query) Object.assign(this, query);
  }
  @IsNotEmpty()
  @IsString()
  q!: string;

  @IsOptional()
  @IsString()
  searchIn?: string;

  @IsOptional()
  @IsString()
  source?: string;

  @IsOptional()
  @IsString()
  from?: string;

  @IsOptional()
  @IsString()
  to?: string;

  @IsOptional()
  @IsString()
  sortBy?: string;

  @IsOptional()
  @IsString()
  language?: string;
}
