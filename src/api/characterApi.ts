import { CharacterFilters } from '@/components/filter/FilterComponent';
import type { Character } from '@/types/character';

const BASE_URL = 'https://rickandmortyapi.com/api/character';
const characterByIdCache = new Map<number, Character>();

export const getCharacters = async (
  filters: CharacterFilters = {},
  signal?: AbortSignal,
) => {
  const params = new URLSearchParams();

  if (filters.name && filters.name.trim() !== '') {
    params.append('name', filters.name.trim());
  }

  if (filters.species && filters.species !== '') {
    params.append('species', filters.species);
  }

  const queryString = params.toString();
  const url = queryString ? `${BASE_URL}?${queryString}` : BASE_URL;

  try {
    const response = await fetch(url, { signal });
    if (!response.ok) {
      throw new Error('Error fetching characters');
    }
    const data = await response.json();
    const characters: Character[] = data.results || [];

    characters.forEach((character) => {
      characterByIdCache.set(character.id, character);
    });

    return characters;
  } catch (err: unknown) {
    const error = err as Error;
    if (error.name === 'AbortError') {
      throw error;
    }
    console.error('Error fetching characters:', error);
    throw error;
  }
};

export const getCharacterById = async (
  id: number,
  signal?: AbortSignal,
): Promise<Character> => {
  if (characterByIdCache.has(id)) {
    return characterByIdCache.get(id)!;
  }

  const response = await fetch(`${BASE_URL}/${id}`, { signal });

  if (!response.ok) {
    throw new Error('Failed to fetch character');
  }

  const character = await response.json();

  characterByIdCache.set(id, character);

  return character;
};
