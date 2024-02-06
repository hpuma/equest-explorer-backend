import {
  IsOptional,
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsArray,
  ValidateNested,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

class QueryContext {
  @IsString()
  originalQuery: string;

  @IsBoolean()
  adultIntent: boolean;
}

class Sort {
  @IsString()
  id: string;

  @IsBoolean()
  isSelected: boolean;

  @IsString()
  name: string;

  @IsString()
  url: string;
}

class Organization {
  @IsString()
  _type: string;

  @IsString()
  name: string;
}

class Thumbnail {
  @IsOptional()
  @IsString()
  contentUrl: string;

  @IsNumber()
  height: number;

  @IsNumber()
  width: number;
}

class Image {
  @Type(() => Organization)
  provider: Organization;

  @Type(() => Thumbnail)
  thumbnail: Thumbnail;

  @IsString()
  url: string;
}

class Thing {
  @IsString()
  name: string;
}

class MediaSize {
  @IsNumber()
  height: number;

  @IsNumber()
  width: number;
}

class Video {
  @IsBoolean()
  allowHttpsEmbed: boolean;

  @IsString()
  embedHtml: string;

  @IsString()
  motionThumbnailUrl: string;

  @IsString()
  name: string;

  @Type(() => MediaSize)
  thumbnail: MediaSize;

  @IsString()
  thumbnailUrl: string;
}

export class NewsArticle {
  @IsOptional()
  about: any[];

  @IsString()
  category: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NewsArticle)
  clusteredArticles: NewsArticle[];

  @IsOptional()
  contractualRules: any[];

  @IsString()
  datePublished: string;

  @IsString()
  description: string;

  @IsBoolean()
  headline: boolean;

  @IsString()
  id: string;

  @Type(() => Image)
  image: Image;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Thing)
  mentions: Thing[];

  @IsString()
  name: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Organization)
  provider: Organization[];

  @IsString()
  url: string;

  @Type(() => Video)
  video: Video;
}
class RelatedTopic {
  @Type(() => NewsArticle)
  relatedNews: NewsArticle;

  @IsString()
  name: string;

  @IsString()
  webSearchUrl: string;
}
export class GetBingResponseDto {
  constructor(data: GetBingResponseDto) {
    if (data) Object.assign(this, data);
  }

  @IsOptional()
  @IsString()
  _type: string;

  @IsOptional()
  @IsString()
  readLink: string;

  @IsOptional()
  @Type(() => QueryContext)
  queryContext: QueryContext;

  @IsOptional()
  @Type(() => RelatedTopic)
  relatedTopics: RelatedTopic;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Sort)
  sort: Sort[];

  @IsOptional()
  @IsNumber()
  totalEstimatedMatches: number;

  @IsNotEmpty()
  value: NewsArticle[];

  @IsOptional()
  @IsString()
  webSearchUrl: string;
}
