import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Character } from '@/types/character';
import * as nearScreenHook from '@/hooks/useNearScreen';
import CharacterComponent from '@/components/character/Character';

vi.mock('@/hooks/useNearScreen', () => ({
  useNearScreen: vi.fn(),
}));

describe('CharacterComponent', () => {
  const mockCharacter = {
    id: 1,
    name: 'Rick Sanchez',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    species: 'Human',
    gender: 'Male',
    origin: { name: 'Earth' },
  } as Character;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render character information correctly', () => {
    vi.mocked(nearScreenHook.useNearScreen).mockReturnValue({
      isNear: true,
      elementRef: {
        current: null,
      } as unknown as React.RefObject<HTMLDivElement>,
    });

    render(<CharacterComponent character={mockCharacter} />);

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText(/Human — Male/i)).toBeInTheDocument();
    expect(screen.getByText(/Earth/i)).toBeInTheDocument();
  });

  it('should not render the image if it is not near the screen and has no priority', () => {
    vi.mocked(nearScreenHook.useNearScreen).mockReturnValue({
      isNear: false,
      elementRef: {
        current: null,
      } as unknown as React.RefObject<HTMLDivElement>,
    });

    render(<CharacterComponent character={mockCharacter} priority={false} />);

    const img = screen.queryByRole('img');
    expect(img).not.toBeInTheDocument();
  });

  it('should render the image immediately if priority is true, even if not near screen', () => {
    vi.mocked(nearScreenHook.useNearScreen).mockReturnValue({
      isNear: false,
      elementRef: {
        current: null,
      } as unknown as React.RefObject<HTMLDivElement>,
    });

    render(<CharacterComponent character={mockCharacter} priority={true} />);

    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', mockCharacter.image);
  });

  it('should call onClick with the correct ID when clicked', () => {
    vi.mocked(nearScreenHook.useNearScreen).mockReturnValue({
      isNear: true,
      elementRef: {
        current: null,
      } as unknown as React.RefObject<HTMLDivElement>,
    });

    const handleClick = vi.fn();
    render(<CharacterComponent character={mockCharacter} onClick={handleClick} />);

    fireEvent.click(screen.getByText('Rick Sanchez'));

    expect(handleClick).toHaveBeenCalledWith(mockCharacter.id);
  });

  it('should show the skeleton loader while the image is not loaded', () => {
    vi.mocked(nearScreenHook.useNearScreen).mockReturnValue({
      isNear: true,
      elementRef: {
        current: null,
      } as unknown as React.RefObject<HTMLDivElement>,
    });

    const { container } = render(<CharacterComponent character={mockCharacter} />);
    
    const skeleton = container.querySelector('.animate-pulse');
    expect(skeleton).toBeInTheDocument();

    const img = screen.getByRole('img');
    fireEvent.load(img);

    expect(skeleton).not.toBeInTheDocument();
  });
});