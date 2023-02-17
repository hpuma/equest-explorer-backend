import { QueryFunctions } from './query-functions';
export class GetIntradayQueryDto {
  function: QueryFunctions;
  symbol: string;
  interval: string;
  outputsize: string;
}
