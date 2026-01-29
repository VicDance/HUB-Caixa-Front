import { useEffect, useMemo, useRef, useState } from 'react';
import { Character } from '@/types/character';
import { getCharacters, getCharacterById } from '@/api/characterApi';
import {
  CharacterFilters,
} from '@/components/filter/FilterComponent';

const cache = new Map<string, Character[]>();

export const useCharacters = (filters: CharacterFilters = {}, id?: number) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const cacheKey = useMemo(
    () => JSON.stringify({ id, ...filters }),
    [id, filters],
  );

  const filtersRef = useRef(filters);
  const idRef = useRef(id);

  useEffect(() => {
    filtersRef.current = filters;
    idRef.current = id;
  }, [filters, id]);

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    const fetchData = async () => {
      if (cache.has(cacheKey)) {
        setCharacters(cache.get(cacheKey)!);
        setLoading(false)
      } else {
        setLoading(true);
      }
      setError(null);

      try {
        const data =
          idRef.current != null
            ? [await getCharacterById(idRef.current, controller.signal)]
            : await getCharacters(filtersRef.current, controller.signal);

        if (isMounted) {
          cache.set(cacheKey, data);
          setCharacters(data);
          setError(null);
        }
      } catch (err: unknown) {
        const error = err as Error;
        if (
          error.name === 'AbortError' ||
          error.message === 'The operation was aborted'
        ) {
          return;
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
      controller.abort();
    };
  }, [cacheKey]);

  return { characters, loading, error };
};
