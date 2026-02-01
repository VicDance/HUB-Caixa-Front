import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Character } from '@/types/character';
import { getCharacterById } from '@/api/characterApi';
import DetailsPage from '@/pages/DetailsPage';

vi.mock('@/api/characterApi', () => ({
  getCharacterById: vi.fn(),
}));

describe('CharacterDetailPage Integration', () => {
  it('should fetch and display character details based on URL ID', async () => {
    const mockCharacter = {
      id: 1,
      name: 'Rick Sanchez',
      image: 'image.png',
      status: 'Alive',
      species: 'Human',
      origin: { name: 'Earth' },
      location: { name: 'Citadel' },
    };

    vi.mocked(getCharacterById).mockResolvedValue(
      mockCharacter as Character,
    );

    render(
      <MemoryRouter initialEntries={['/character/1']}>
        <Routes>
          <Route path='/character/:id' element={<DetailsPage />} />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
      expect(screen.getByText('Alive')).toBeInTheDocument();
    });
  });
});
