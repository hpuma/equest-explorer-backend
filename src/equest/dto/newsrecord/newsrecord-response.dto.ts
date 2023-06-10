import { NewsResource } from '@global/newsresource.class';

export class NewsRecordResponseDto extends NewsResource {
  constructor(data: NewsRecordResponseDto) {
    super(data);
    if (data) Object.assign(this, data);
  }
}
