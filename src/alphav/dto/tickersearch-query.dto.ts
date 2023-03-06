import {IsString} from "class-validator";

export class TickerSearchQueryDto {
constructor(query: TickerSearchQueryDto) {
    if (query) Object.assign(this, query);
}
@IsString()
ticker!: string;
}