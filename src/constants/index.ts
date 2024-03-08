import { IPageInfo } from '../types';

export const API_BASE_URL = 'https://rickandmortyapi.com/api';

export const CHARACTERS_LIMIT = 20;

export const INITIAL_PAGE_INFO: IPageInfo = {
  count: 0,
  next: '',
  prev: '',
  pages: 0,
};

export const CHARACTERISTICS = ['name','species','status','gender','origin','location'] as const;
