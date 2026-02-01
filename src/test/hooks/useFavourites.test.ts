import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { Character } from '@/types/character';
import { useFavourites } from '@/hooks/useFavourites';

const mockCharacter: Character = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: { name: 'Earth', url: '' },
  location: {
    name: 'Citadel of Ricks',
    url: 'https://rickandmortyapi.com/api/location/3',
  },
  image: 'rick.png',
} as Character;

describe('useFavourites', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should set an empty array if no localStorage', () => {
    const { result } = renderHook(() => useFavourites());
    expect(result.current.favourites).toEqual([]);
  });

  it('should initialite wiht localStorage data ', () => {
    localStorage.setItem('rm-favorites', JSON.stringify([mockCharacter]));
    const { result } = renderHook(() => useFavourites());

    expect(result.current.favourites).toHaveLength(1);
    expect(result.current.favourites[0].name).toBe('Rick Sanchez');
  });

  it('should add character to favourites', () => {
    const { result } = renderHook(() => useFavourites());

    act(() => {
      result.current.toggleFavourite(mockCharacter);
    });

    expect(result.current.favourites).toContainEqual(mockCharacter);
    expect(result.current.isFavourite(mockCharacter.id)).toBe(true);
    expect(localStorage.getItem('rm-favorites')).toContain('Rick Sanchez');
  });

  it('should delete character from favourites', () => {
    localStorage.setItem('rm-favorites', JSON.stringify([mockCharacter]));
    const { result } = renderHook(() => useFavourites());

    act(() => {
      result.current.toggleFavourite(mockCharacter);
    });

    expect(result.current.favourites).toHaveLength(0);
    expect(result.current.isFavourite(mockCharacter.id)).toBe(false);
  });
});
