import { useEffect, useState } from 'react';
import { Character } from '@/types/character';
import { getCharacters } from '@/api/characterApi';

export const useCharacters = (filters: { name?: string; species?: string }) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchCharacters = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getCharacters(filters);
        if (isMounted) {
          setCharacters(data);
        }
      } catch {
        if (isMounted) {
          setError('Error loading characters');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCharacters();

    return () => {
      isMounted = false;
    };
  }, [filters]);

  return { characters, loading, error };
};
