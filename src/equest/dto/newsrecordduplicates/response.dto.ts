import { IsArray, IsNumber } from 'class-validator';

export class NewsRecordDuplicatesResponseDto {
  @IsArray()
  duplicates: string[];

  @IsNumber()
  count: number;
}
