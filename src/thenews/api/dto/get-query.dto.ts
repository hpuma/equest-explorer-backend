import { IsString, IsNotEmpty } from 'class-validator';

export class GetQueryDto {
  constructor(query: GetQueryDto) {
    if (query) Object.assign(this, query);
  }

  @IsString()
  @IsNotEmpty()
  search: string;
}
