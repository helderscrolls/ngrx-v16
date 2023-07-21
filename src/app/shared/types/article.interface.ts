import { PopularTagType } from './popularTag.type';
import { ProfileInterface } from './profile.interface';

export interface ArticleInterface {
  body: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: PopularTagType[];
  title: string;
  createdAt: string;
  updatedAt: string;
  author: ProfileInterface;
}
