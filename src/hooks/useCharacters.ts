import { useEffect, useState } from 'react';
import { Character } from '@/types/character';
import { getCharacters, getCharacterById } from '@/api/characterApi';

export interface Filters {
  name?: string;
  species?: string;
}

export const useCharacters = (filters: Filters = {}, id?: number) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      let data: Character[] = [];

      try {
        if (id != null) {
          const character = await getCharacterById(id);
          data = [character]; 
        } else {
          data = await getCharacters(filters);
        }
        if (isMounted) setCharacters(data);
      } catch {
        if (isMounted) setError('Error loading characters');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [filters, id]);

  return { characters, loading, error };
};
