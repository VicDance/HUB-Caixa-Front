import { useEffect, useState } from 'react';
import { Character } from '@/types/character';
import { getCharacters, getCharacterById } from '@/api/characterApi';

export interface Filters {
  name?: string;
  species?: string;
}

const cache: Record<string, Character[]> = {};

export const useCharacters = (filters: Filters = {}, id?: number) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const filterKey = JSON.stringify(id ? { id } : filters);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (cache[filterKey]) {
        setCharacters(cache[filterKey]);
      } else {
        setLoading(true);
      }
      setError(null);

      try {
        const data =
          id != null
            ? [await getCharacterById(id)]
            : await getCharacters(filters);

        if (isMounted) {
          cache[filterKey] = data;
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

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [filterKey, filters, id]);

  return { characters, loading, error };
};
