import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useCharacters } from '@/hooks/useCharacters';
import * as api from '@/api/characterApi';
import { Character } from '@/types/character';
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
};

const mockResident: Character = {
  ...mockCharacter,
  id: 2,
  name: 'Morty Smith',
};

vi.mock('@/api/characterApi', () => ({
  getCharacters: vi.fn(),
  getCharacterById: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
  vi.restoreAllMocks();
});

describe('useCharacters', async () => {
  it('fetches characters list when no id is provided', async () => {
    vi.spyOn(api, 'getCharacters').mockResolvedValue([mockCharacter]);

    const { result } = renderHook(() => useCharacters({ name: 'Rick' }));

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(api.getCharacters).toHaveBeenCalledOnce();
    expect(result.current.characters).toHaveLength(1);
    expect(result.current.characters[0].name).toBe('Rick Sanchez');
  });

  it('fetches a character by id when id is provided', async () => {
    vi.spyOn(api, 'getCharacterById').mockResolvedValue(mockCharacter);

    const { result } = renderHook(() => useCharacters({}, 1));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(api.getCharacterById).toHaveBeenCalledWith(
      1,
      expect.any(AbortSignal),
    );

    expect(result.current.characters[0].id).toBe(1);
  });

  it('sets error state when api throws error', async () => {
    vi.spyOn(api, 'getCharacters').mockRejectedValue(
      new Error('Network error'),
    );

    const { result } = renderHook(() => useCharacters());

    await waitFor(() => {
      expect(result.current.error).toBe('Network error');
    });

    expect(result.current.loading).toBe(false);
  });

  it('fetches residents when character has a valid location', async () => {
    vi.spyOn(api, 'getCharacterById').mockResolvedValue(mockCharacter);

    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: async () => ({
        residents: ['https://rickandmortyapi.com/api/character/2'],
      }),
    } as Response);

    vi.spyOn(api, 'getCharacterById')
      .mockResolvedValueOnce(mockCharacter)
      .mockResolvedValueOnce(mockResident);

    const { result } = renderHook(() => useCharacters({}, 1));

    await waitFor(() => {
      expect(result.current.loadingResidents).toBe(false);
    });

    await waitFor(() => {
      expect(result.current.residents).toHaveLength(1);
    });
    expect(result.current.residents[0].name).toBe('Morty Smith');
  });

  it('does not fetch residents if location is unknown', async () => {
    vi.spyOn(api, 'getCharacterById').mockResolvedValue({
      ...mockCharacter,
      location: { name: 'unknown', url: '' },
    });

    const { result } = renderHook(() => useCharacters({}, 1));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.residents).toHaveLength(0);
  });

  it('uses cache on second render with same params', async () => {
    const spy = vi
      .spyOn(api, 'getCharacters')
      .mockResolvedValue([mockCharacter]);

    const { rerender } = renderHook(({ name }) => useCharacters({ name }), {
      initialProps: { name: 'Rick' },
    });

    await waitFor(() => expect(spy).toHaveBeenCalledOnce());

    rerender({ name: 'Rick' });

    await waitFor(() => {
      expect(spy).toHaveBeenCalledOnce();
    });
  });
});
