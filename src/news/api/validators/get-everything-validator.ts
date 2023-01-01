import { EverythingDto } from '../../dto/everything.dto';

export class GetEverythingValidator<MappedQuery> {
  constructor(query: EverythingDto) {
    const {
      ticker: q,
      contentSource: searchIn,
      newsSource: source,
      startDate: from,
      endDate: to,
      sortBy,
      language,
    } = query;

    const data = {
      q,
      searchIn,
      source,
      from,
      to,
      sortBy,
      language,
    } as MappedQuery;

    return data;
  }
}
