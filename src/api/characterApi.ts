import { Filters } from "@/hooks/useCharacters";
import type { Character } from "@/types/character";

const BASE_URL = 'https://rickandmortyapi.com/api';

export const getCharacters = async (filters?: Filters): Promise<Character[]> => {
  const params = new URLSearchParams(filters as Record<string, string>);
  const response = await fetch(`${BASE_URL}/character?${params}`);

  if (!response.ok) {
    throw new Error('Failed to fetch characters');
  }

  const data = await response.json();
  return data.results;
};

export const getCharacterById = async (id: number): Promise<Character> => {
  const response = await fetch(`${BASE_URL}/character/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch character');
  }

  return response.json();
};
