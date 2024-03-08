export interface ICharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  created: string;
  episode: string[];
  image: string;
  location: ICharacteristicObject;
  origin: ICharacteristicObject;
  url: string;
}

export interface IPageInfo {
  count: number;
  pages: number;
  next: string;
  prev: string;
}

export interface ICharacterResponse {
  info: IPageInfo;
  results: ICharacter[];
}

export interface ICharacteristicObject {
  name: string;
  url: string;
}
