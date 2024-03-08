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
  location: {
    name: string;
    url: string;
  };
  origin: {
    name: string;
    url: string;
  };
  url: string;
}

export interface ICharacterResponse {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };
  results: ICharacter[];
}
