import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Character } from '@/types/character';
import { getCharacters } from '@/api/characterApi';
import HomePage from '@/pages/HomePage';

vi.mock('@/api/characterApi', () => ({
  getCharacters: vi.fn(),
}));

vi.mock('@/hooks/useNearScreen', () => ({
  useNearScreen: () => ({
    isNear: true,
    elementRef: { current: null },
  }),
}));

describe('HomePage Integration', () => {
  const mockCharacters = [
    {
      id: 1,
      name: 'Rick Sanchez',
      species: 'Human',
      gender: 'Male',
      origin: { name: 'Earth' },
      image: 'rick.png',
    },
    {
      id: 2,
      name: 'Morty Smith',
      species: 'Human',
      gender: 'Male',
      origin: { name: 'Earth' },
      image: 'morty.png',
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderHomePage = (initialEntries = ['/']) => {
    return render(
      <MemoryRouter initialEntries={initialEntries}>
        <HomePage />
      </MemoryRouter>,
    );
  };

  it('should render the list of characters after fetching', async () => {
    vi.mocked(getCharacters).mockResolvedValue(
      mockCharacters as Character[],
    );

    renderHomePage();

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
      expect(screen.getByText('Morty Smith')).toBeInTheDocument();
    });

    expect(getCharacters).toHaveBeenCalledTimes(1);
  });

  it('should refetch characters when the URL search parameters change', async () => {
    vi.mocked(getCharacters).mockResolvedValue(
      mockCharacters as Character[],
    );

    renderHomePage(['/?name=Rick']);

    await waitFor(() => {
      expect(getCharacters).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'Rick' }),
        expect.any(AbortSignal),
      );
    });
  });
});
