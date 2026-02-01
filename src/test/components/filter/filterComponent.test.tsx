import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import FilterComponent from '@/components/filter/FilterComponent';

describe('FilterComponent', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const renderWithRouter = (initialEntries = ['/']) => {
    return render(
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route path="/" element={<FilterComponent />} />
        </Routes>
      </MemoryRouter>
    );
  };

  it('should render initial values from search parameters', () => {
    renderWithRouter(['/?name=Rick&species=human']);

    const nameInput = screen.getByPlaceholderText(/search by name/i) as HTMLInputElement;
    const speciesSelect = screen.getByRole('combobox') as HTMLSelectElement;

    expect(nameInput.value).toBe('Rick');
    expect(speciesSelect.value).toBe('human');
  });

  it('should update search parameters after debounce delay when typing', () => {
    renderWithRouter();

    const nameInput = screen.getByPlaceholderText(/search by name/i);
    
    fireEvent.change(nameInput, { target: { value: 'Morty' } });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect((nameInput as HTMLInputElement).value).toBe('Morty');
  });

  it('should update species immediately in the state and debounce the URL update', () => {
    renderWithRouter();

    const speciesSelect = screen.getByRole('combobox');
    
    fireEvent.change(speciesSelect, { target: { value: 'alien' } });

    expect((speciesSelect as HTMLSelectElement).value).toBe('alien');

    act(() => {
      vi.advanceTimersByTime(500);
    });
  });

  it('should clear existing parameters if inputs are emptied', () => {
    renderWithRouter(['/?name=Rick']);

    const nameInput = screen.getByPlaceholderText(/search by name/i);
    
    fireEvent.change(nameInput, { target: { value: '' } });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect((nameInput as HTMLInputElement).value).toBe('');
  });
});