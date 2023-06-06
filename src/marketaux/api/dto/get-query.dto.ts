import { IsString, IsBoolean } from 'class-validator';

export class GetQueryDto {
  constructor(query: GetQueryDto) {
    if (query) Object.assign(this, query);
  }

  @IsString()
  symbols: string;

  @IsString()
  entity_types: string;

  @IsBoolean()
  filter_entities: boolean;
}
