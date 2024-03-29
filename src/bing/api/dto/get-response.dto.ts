import {
  IsOptional,
  IsString,
  IsBoolean,
  IsArray,
  ValidateNested,
  IsNumber,
  ValidateIf,
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
  about?: any[];

  @IsString()
  @IsOptional()
  category: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NewsArticle)
  clusteredArticles?: NewsArticle[];

  @IsOptional()
  contractualRules?: any[];

  @IsString()
  datePublished: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  id?: string;

  @Type(() => Image)
  image: Image;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Thing)
  mentions: Thing[];

  @IsString()
  name: string;

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
export class GetResponseDto {
  constructor(data: GetResponseDto) {
    if (data) Object.assign(this, data);
  }

  @IsOptional()
  @IsString()
  _type?: string;

  @IsOptional()
  @IsString()
  readLink?: string;

  @IsOptional()
  @Type(() => QueryContext)
  queryContext?: QueryContext;

  @IsOptional()
  @Type(() => RelatedTopic)
  relatedTopics?: RelatedTopic;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Sort)
  sort?: Sort[];

  @IsNumber()
  totalEstimatedMatches? = 0;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => NewsArticle)
  value?: NewsArticle[];

  @IsOptional()
  @IsString()
  webSearchUrl?: string;
}
