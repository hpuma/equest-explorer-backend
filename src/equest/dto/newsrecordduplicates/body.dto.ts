import { IsArray } from 'class-validator';

export class NewsRecordDuplicatesBodyDto {
  @IsArray()
  hashes: string[];
}
