export interface Character {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
  image: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
}
